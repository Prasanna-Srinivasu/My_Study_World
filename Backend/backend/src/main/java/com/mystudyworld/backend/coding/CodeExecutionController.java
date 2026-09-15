package com.mystudyworld.backend.coding;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/code")
public class CodeExecutionController {

    @PostMapping("/run")
    public ResponseEntity<?> runCode(
            @RequestBody CodeExecutionRequest request) {

        if (request.code() == null || request.code().isBlank()) {
            return ResponseEntity.badRequest().body(
                    new ExecutionResponse(
                            false,
                            "",
                            "Code cannot be empty.",
                            0
                    )
            );
        }

        Path tempDirectory = null;

        try {
            tempDirectory = Files.createTempDirectory("study-world-code-");

            Path javaFile = tempDirectory.resolve("Main.java");

            Files.writeString(
                    javaFile,
                    request.code(),
                    StandardCharsets.UTF_8
            );

            // Compile
            Process compileProcess = new ProcessBuilder(
                    "javac",
                    "Main.java"
            )
                    .directory(tempDirectory.toFile())
                    .redirectErrorStream(true)
                    .start();

            String compileOutput = readProcessOutput(compileProcess);

            boolean compiled = compileProcess.waitFor(
                    5,
                    TimeUnit.SECONDS
            );

            if (!compiled) {
                compileProcess.destroyForcibly();

                return ResponseEntity.ok(
                        new ExecutionResponse(
                                false,
                                "",
                                "Compilation timed out.",
                                0
                        )
                );
            }

            if (compileProcess.exitValue() != 0) {
                return ResponseEntity.ok(
                        new ExecutionResponse(
                                false,
                                "",
                                compileOutput,
                                0
                        )
                );
            }

            // Run
            Process runProcess = new ProcessBuilder(
                    "java",
                    "Main"
            )
                    .directory(tempDirectory.toFile())
                    .redirectErrorStream(true)
                    .start();

            // Send input
            if (request.input() != null && !request.input().isEmpty()) {

                try (BufferedWriter writer =
                             new BufferedWriter(
                                     new OutputStreamWriter(
                                             runProcess.getOutputStream(),
                                             StandardCharsets.UTF_8
                                     ))) {

                    writer.write(request.input());
                    writer.newLine();
                    writer.flush();
                }
            } else {
                runProcess.getOutputStream().close();
            }

            String output = readProcessOutput(runProcess);

            boolean finished = runProcess.waitFor(
                    5,
                    TimeUnit.SECONDS
            );

            if (!finished) {
                runProcess.destroyForcibly();

                return ResponseEntity.ok(
                        new ExecutionResponse(
                                false,
                                output,
                                "Execution timed out. Maximum allowed time is 5 seconds.",
                                0
                        )
                );
            }

            if (runProcess.exitValue() != 0) {
                return ResponseEntity.ok(
                        new ExecutionResponse(
                                false,
                                output,
                                "Program exited with an error.",
                                0
                        )
                );
            }

            return ResponseEntity.ok(
                    new ExecutionResponse(
                            true,
                            output,
                            "",
                            0
                    )
            );

        } catch (IOException e) {

            return ResponseEntity.internalServerError().body(
                    new ExecutionResponse(
                            false,
                            "",
                            "Java execution is unavailable. Make sure JDK is installed and javac/java are available in PATH.\n\n"
                                    + e.getMessage(),
                            0
                    )
            );

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            return ResponseEntity.internalServerError().body(
                    new ExecutionResponse(
                            false,
                            "",
                            "Execution was interrupted.",
                            0
                    )
            );

        } finally {

            if (tempDirectory != null) {
                deleteDirectory(tempDirectory);
            }
        }
    }

    private String readProcessOutput(Process process)
            throws IOException {

        return new String(
                process.getInputStream().readAllBytes(),
                StandardCharsets.UTF_8
        );
    }

    private void deleteDirectory(Path directory) {

        try {
            Files.walk(directory)
                    .sorted((a, b) -> b.compareTo(a))
                    .forEach(path -> {
                        try {
                            Files.deleteIfExists(path);
                        } catch (IOException ignored) {
                        }
                    });

        } catch (IOException ignored) {
        }
    }

    public record ExecutionResponse(
            boolean success,
            String output,
            String error,
            int score
    ) {
    }
}