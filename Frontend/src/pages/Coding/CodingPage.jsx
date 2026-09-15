import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { codingProblems } from "../../data/codingProblems";

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

  if (!problem) {
    return (
      <main className="coding-page">
        <div className="coding-error">
          <span className="coding-label">CODING CHALLENGE</span>

          <h1>Problem Not Found</h1>

          <p>
            The requested coding problem does not exist.
          </p>

          <button
            type="button"
            className="coding-back-btn"
            onClick={() =>
              navigate(`/topic/${courseId}/${topicId}`)
            }
          >
            ← Back to Topic
          </button>
        </div>
      </main>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setSubmitted(false);
    setScore(null);
    setOutput("Running your Java code...");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/code/run",
        {
          code,
          input,
        }
      );

      const result = response.data;

      if (result.success) {
        setOutput(
          result.output ||
            "Program executed successfully."
        );
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
      setScore(null);
      setTestResults([]);
      setOutput(
        "Test cases are not available for this problem yet."
      );
      return;
    }

    setIsRunning(true);
    setSubmitted(false);
    setScore(null);
    setTestResults([]);
    setOutput("Running all test cases...");

    try {
      let passed = 0;
      const results = [];

      for (const testCase of problem.testCases) {
        const response = await axios.post(
          "http://localhost:8080/api/code/run",
          {
            code,
            input: testCase.input,
          }
        );

        const result = response.data;

        const actualOutput = (result.output || "")
          .trim()
          .replace(/\r\n/g, "\n");

        const expectedOutput = (
          testCase.expectedOutput || ""
        )
          .trim()
          .replace(/\r\n/g, "\n");

        const passedTest =
          result.success &&
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
        const savedProgress = JSON.parse(
          localStorage.getItem("codingProgress") || "{}"
        );

        if (!savedProgress[courseId]) {
          savedProgress[courseId] = {};
        }

        if (!savedProgress[courseId][topicId]) {
          savedProgress[courseId][topicId] = [];
        }

        if (
          !savedProgress[courseId][topicId].includes(
            problemId
          )
        ) {
          savedProgress[courseId][topicId].push(problemId);
        }

        localStorage.setItem(
          "codingProgress",
          JSON.stringify(savedProgress)
        );
      }

      const formattedResults = results
        .map(
          (result, index) =>
            `Test Case ${index + 1}: ${
              result.passed
                ? "✓ PASSED"
                : "✗ FAILED"
            }\n` +
            `Expected: ${result.expected}\n` +
            `Actual: ${result.actual}` +
            (result.error
              ? `\nError: ${result.error}`
              : "")
        )
        .join("\n\n");

      setOutput(
        `${formattedResults}\n\nScore: ${calculatedScore}%`
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

  const passedCount = testResults.filter(
    (result) => result.passed
  ).length;

  return (
    <main className="coding-page">
      <header className="coding-header">
        <div className="coding-header-content">
          <button
            type="button"
            className="coding-back-btn"
            onClick={() =>
              navigate(`/topic/${courseId}/${topicId}`)
            }
          >
            ← Back to Topic
          </button>

          <span className="coding-label">
            CODING CHALLENGE
          </span>

          <h1>{problem.title}</h1>

          <p>
            Practice your programming skills by solving
            this problem.
          </p>
        </div>

        <span className="coding-difficulty">
          {problem.difficulty}
        </span>
      </header>

      <section className="coding-workspace">
        <section className="coding-problem-panel">
          <div className="panel-title">
            Problem
          </div>

          <div className="problem-content">
            <h2>{problem.title}</h2>

            <p>{problem.description}</p>

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

            {problem.constraints?.length > 0 && (
              <div className="problem-block">
                <h3>Constraints</h3>

                <ul>
                  {problem.constraints.map(
                    (constraint, index) => (
                      <li key={index}>
                        {constraint}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {problem.complexity && (
              <div className="problem-block">
                <h3>Complexity</h3>

                <p>
                  Time:{" "}
                  {problem.complexity.time}
                  <br />
                  Space:{" "}
                  {problem.complexity.space}
                </p>
              </div>
            )}

            <div className="problem-block">
              <h3>Language</h3>

              <span className="language-badge">
                Java
              </span>
            </div>
          </div>
        </section>

        <section className="coding-editor-panel">
          <div className="editor-header">
            <span>Java</span>

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
            aria-label="Java code editor"
          />

          <div className="editor-actions">
            <button
              type="button"
              className="run-code-btn"
              onClick={handleRun}
              disabled={isRunning}
            >
              {isRunning
                ? "Running..."
                : "▶ Run Code"}
            </button>

            <button
              type="button"
              className="submit-code-btn"
              onClick={handleSubmit}
              disabled={isRunning}
            >
              {isRunning
                ? "Checking..."
                : "✓ Submit"}
            </button>
          </div>
        </section>
      </section>

      <section className="io-section">
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
            aria-label="Custom input"
          />
        </div>

        <div className="io-panel">
          <div className="io-title">
            Output
          </div>

          <pre className="output-panel">
            {output ||
              "Output will appear here..."}
          </pre>
        </div>
      </section>

      {problem.testCases?.length > 0 && (
        <section className="test-case-section">
          <div className="test-case-heading">
            <div>
              <span className="coding-label">
                VALIDATION
              </span>

              <h2>Test Cases</h2>
            </div>

            {score !== null && (
              <div
                className={`test-score ${
                  score === 100
                    ? "score-perfect"
                    : "score-partial"
                }`}
              >
                {score}%
              </div>
            )}
          </div>

          <div className="test-case-summary">
            {testResults.length > 0
              ? `${passedCount} of ${problem.testCases.length} test cases passed`
              : "Submit your solution to check all test cases."}
          </div>

          <div className="test-case-list">
            {problem.testCases.map(
              (testCase, index) => {
                const result =
                  testResults[index];

                return (
                  <div
                    className="test-case-card"
                    key={index}
                  >
                    <div className="test-case-number">
                      Test Case {index + 1}
                    </div>

                    <div className="test-case-input">
                      <strong>Input</strong>
                      <pre>
                        {testCase.input}
                      </pre>
                    </div>

                    <div className="test-case-output">
                      <strong>
                        Expected Output
                      </strong>
                      <pre>
                        {testCase.expectedOutput}
                      </pre>
                    </div>

                    <div
                      className={`test-case-status ${
                        result
                          ? result.passed
                            ? "passed"
                            : "failed"
                          : "locked"
                      }`}
                    >
                      {result
                        ? result.passed
                          ? "✓ Passed"
                          : "✗ Failed"
                        : "Waiting"}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}

      {submitted && (
        <section
          className={`submission-status ${
            score === 100
              ? "submission-success"
              : "submission-review"
          }`}
        >
          <div className="submission-icon">
            {score === 100 ? "✓" : "!"}
          </div>

          <div>
            <h3>
              {score === 100
                ? "Excellent — solution accepted"
                : "Submission checked"}
            </h3>

            <p>
              {score === 100
                ? "All test cases passed. This coding problem is now marked complete."
                : `${passedCount} of ${
                    problem.testCases?.length || 0
                  } test cases passed. Review the failed cases and try again.`}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

export default CodingPage;