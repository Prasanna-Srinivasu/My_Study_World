import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { codingProblems } from "../../data/codingProblems";
import axios from "axios";

import "./CodingPage.css";

function CodingPage() {
    const { courseId, topicId, problemId } = useParams();
    const navigate = useNavigate();

    const problems = codingProblems[topicId] || [];

    const problem = problems.find(
        (item) => String(item.id) === String(problemId)
    );

    const [code, setCode] = useState(
        `public class Main {

    public static void main(String[] args) {

        // Write your solution here

    }
}`
    );

    const [input, setInput] = useState("");

    const [output, setOutput] = useState("");

    const [isRunning, setIsRunning] = useState(false);

    const [submitted, setSubmitted] = useState(false);

    const [score, setScore] = useState(null);
    const [testResults, setTestResults] = useState([]);

    // Problem not found
    if (!problem) {
        return (
            <div className="coding-page">
                <div className="coding-error">
                    <h1>Problem Not Found</h1>

                    <p>
                        The requested coding problem does not exist.
                    </p>

                    <button
                        className="coding-start-btn"
                        onClick={() =>
                            navigate(
                                `/coding/${courseId}/${topicId}/${problem.id}`
                            )
                        }
                    >
                        ← Back to Topic
                    </button>
                </div>
            </div>
        );
    }

    const handleRun = async () => {
        setIsRunning(true);
        setOutput("Running your Java code...");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/code/run",
                {
                    code: code,
                    input: input,
                }
            );

            const result = response.data;

            if (result.success) {
                setOutput(result.output || "Program executed successfully.");
            } else {
                setOutput(
                    result.error ||
                    result.output ||
                    "Program execution failed."
                );
            }
        } catch (error) {
            console.error("Code execution error:", error);

            setOutput(
                "Could not connect to the Study World backend.\n\n" +
                "Make sure Spring Boot is running on port 8080."
            );
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        if (!problem.testCases?.length) {
            setSubmitted(true);
            setOutput(
                "Test cases are not available for this problem yet."
            );
            return;
        }

        setIsRunning(true);
        setSubmitted(false);
        setScore(null);
        setOutput("Running all test cases...");

        try {
            let passed = 0;
            const results = [];

            for (const testCase of problem.testCases) {
                const response = await axios.post(
                    "http://localhost:8080/api/code/run",
                    {
                        code: code,
                        input: testCase.input,
                    }
                );

                const result = response.data;

                const actualOutput = (result.output || "")
                    .trim()
                    .replace(/\r\n/g, "\n");

                const expectedOutput = (testCase.expectedOutput || "")
                    .trim()
                    .replace(/\r\n/g, "\n");

                const passedTest = result.success &&
                    actualOutput === expectedOutput;

                if (passedTest) {
                    passed++;
                }

                results.push({
                    input: testCase.input,
                    expected: expectedOutput,
                    actual: actualOutput,
                    passed: passedTest,
                    error: result.error || "",
                });
            }

            const calculatedScore = Math.round(
                (passed / problem.testCases.length) * 100
            );

            setTestResults(results);
            setScore(calculatedScore);
            setSubmitted(true);

            if (calculatedScore === 100) {
                const codingProgress = JSON.parse(
                    localStorage.getItem("codingProgress") || "{}"
                );

                if (!codingProgress[courseId]) {
                    codingProgress[courseId] = {};
                }

                if (!codingProgress[courseId][topicId]) {
                    codingProgress[courseId][topicId] = [];
                }

                if (!codingProgress[courseId][topicId].includes(problemId)) {
                    codingProgress[courseId][topicId].push(problemId);
                }

                localStorage.setItem(
                    "codingProgress",
                    JSON.stringify(codingProgress)
                );
            }

            setOutput(
                results
                    .map(
                        (result, index) =>
                            `Test Case ${index + 1}: ${result.passed ? "✓ PASSED" : "✗ FAILED"
                            }\n` +
                            `Expected: ${result.expected}\n` +
                            `Actual: ${result.actual}` +
                            (result.error
                                ? `\nError: ${result.error}`
                                : "")
                    )
                    .join("\n\n") +
                `\n\nScore: ${calculatedScore}%`
            );
        } catch (error) {
            console.error("Submission error:", error);

            setOutput(
                "Could not connect to the Study World backend.\n\n" +
                "Make sure Spring Boot is running on port 8080."
            );
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="coding-page">

            {/* =========================
          HEADER
      ========================= */}

            <div className="coding-header">

                <div>

                    <button
                        className="coding-back-btn"
                        onClick={() =>
                            navigate(`/topic/${courseId}/${topicId}`)
                        }
                    >
                        ← Back to Topic
                    </button>

                    <div className="coding-label">
                        CODING CHALLENGE
                    </div>

                    <h1>{problem.title}</h1>

                    <p>
                        Practice your programming skills by solving
                        this problem.
                    </p>

                </div>

                <div className="coding-difficulty">
                    {problem.difficulty}
                </div>

            </div>

            {/* =========================
          MAIN IDE
      ========================= */}

            <div className="coding-workspace">

                {/* =========================
            LEFT - PROBLEM
        ========================= */}

                <section className="coding-problem-panel">

                    <div className="panel-title">
                        Problem
                    </div>

                    <div className="problem-content">

                        <h2>
                            {problem.title}
                        </h2>

                        <p>
                            {problem.description}
                        </p>

                        <div className="problem-block">
                            <h3>Input</h3>
                            <p>{problem.input}</p>
                        </div>

                        <div className="problem-block">
                            <h3>Output</h3>
                            <p>{problem.output}</p>
                        </div>

                        <div className="problem-block">
                            <h3>Example Input</h3>
                            <pre>{problem.exampleInput}</pre>
                        </div>

                        <div className="problem-block">
                            <h3>Example Output</h3>
                            <pre>{problem.exampleOutput}</pre>
                        </div>

                        <div className="problem-block">
                            <h3>Constraints</h3>
                            <ul>
                                {problem.constraints?.map((constraint, index) => (
                                    <li key={index}>{constraint}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="problem-block">
                            <h3>Complexity</h3>
                            <p>
                                Time: {problem.complexity?.time}
                                <br />
                                Space: {problem.complexity?.space}
                            </p>
                        </div>

                        <div className="problem-block">

                            <h3>Input</h3>

                            <p>
                                Enter the required input according
                                to the problem.
                            </p>

                        </div>

                        <div className="problem-block">

                            <h3>Output</h3>

                            <p>
                                Print the required result.
                            </p>

                        </div>

                        <div className="problem-block">

                            <h3>Language</h3>

                            <span className="language-badge">
                                Java
                            </span>

                        </div>

                    </div>

                </section>

                {/* =========================
            RIGHT - EDITOR
        ========================= */}

                <section className="coding-editor-panel">

                    <div className="editor-header">

                        <span>
                            Java
                        </span>

                        <span className="editor-file">
                            Main.java
                        </span>

                    </div>

                    <textarea
                        className="code-editor"
                        value={code}
                        onChange={(event) =>
                            setCode(event.target.value)
                        }
                        spellCheck="false"
                    />

                    <div className="editor-actions">

                        <button
                            className="run-code-btn"
                            onClick={handleRun}
                            disabled={isRunning}
                        >
                            {isRunning ? "Running..." : "▶ Run Code"}
                        </button>

                        <button
                            className="submit-code-btn"
                            onClick={handleSubmit}
                        >
                            ✓ Submit
                        </button>

                    </div>

                </section>

            </div>

            {/* =========================
          INPUT / OUTPUT
      ========================= */}

            <div className="io-section">

                <div className="io-panel">

                    <div className="io-title">
                        Custom Input
                    </div>

                    <textarea
                        className="input-editor"
                        value={input}
                        onChange={(event) =>
                            setInput(event.target.value)
                        }
                        placeholder="Enter input here..."
                        spellCheck="false"
                    />

                </div>

                <div className="io-panel">

                    <div className="io-title">
                        Output
                    </div>

                    <div className="output-panel">
                        {output || "Output will appear here..."}
                    </div>

                </div>

            </div>

            {/* =========================
          TEST CASES
      ========================= */}

            <section className="test-case-section">

                <div className="test-case-list">

                    {problem.testCases?.map((testCase, index) => (
                        <div className="test-case-card" key={index}>

                            <div className="test-case-number">
                                Test Case {index + 1}
                            </div>

                            <div className="test-case-input">
                                <strong>Input:</strong>
                                <pre>{testCase.input}</pre>
                            </div>

                            <div className="test-case-output">
                                <strong>Expected Output:</strong>
                                <pre>{testCase.expectedOutput}</pre>
                            </div>

                            <div
                                className={`test-case-status ${testResults[index]
                                    ? testResults[index].passed
                                        ? "passed"
                                        : "failed"
                                    : "locked"
                                    }`}
                            >
                                {testResults[index]
                                    ? testResults[index].passed
                                        ? "✓ Test Case Passed"
                                        : "✗ Test Case Failed"
                                    : "Waiting for submission"}
                            </div>

                        </div>
                    ))}

                </div>

            </section>

            {/* =========================
          SUBMISSION STATUS
      ========================= */}

            {submitted && (
                <section className="submission-status">

                    <div className="submission-icon">
                        ⏳
                    </div>

                    <div>

                        <h3>
                            Submission received
                        </h3>

                        <p>
                            Real test-case execution will be
                            connected in the next step.
                        </p>

                    </div>

                </section>
            )}

        </div>
    );
}

export default CodingPage;