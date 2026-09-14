import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { fallbackInterviewQuestions } from "../../data/interviewQuestions";
import "./Interview.css";

/* =========================================================
   INTERVIEW MODES
========================================================= */

const interviewModes = [
  {
    id: "beginner",
    title: "Beginner",
    icon: "🌱",
    description: "Simple questions with patient explanations.",
  },
  {
    id: "practice",
    title: "Practice",
    icon: "🎯",
    description: "Practice like a real technical interview.",
  },
  {
    id: "real",
    title: "Real Interview",
    icon: "💼",
    description: "More realistic interview pressure.",
  },
];

/* =========================================================
   TOPICS
========================================================= */

const interviewTopics = [
  "All Topics",
  "Java",
  "DSA",
  "AWS",
  "React",
  "SQL",
  "HR",
];

/* =========================================================
   LANGUAGES
========================================================= */

const interviewLanguages = [
  {
    id: "english",
    label: "English",
  },
  {
    id: "telugu",
    label: "తెలుగు",
  },
  {
    id: "telugu-english",
    label: "Telugu + English",
  },
];

/* =========================================================
   ROAST LEVELS
========================================================= */

const roastLevels = [
  {
    id: "gentle",
    label: "Gentle",
    icon: "🙂",
  },
  {
    id: "funny",
    label: "Funny",
    icon: "😂",
  },
  {
    id: "savage",
    label: "Savage but friendly",
    icon: "🔥",
  },
];

/* =========================================================
   KEYWORDS FOR FRONTEND FALLBACK EVALUATION

   Later the real AI backend will replace this logic.
========================================================= */

const keywordMap = {
  Java: {
    "What is the JVM and what is its main purpose?": [
      "jvm",
      "java virtual machine",
      "bytecode",
      "execute",
      "run",
      "java",
    ],

    "What is the difference between JDK, JRE and JVM?": [
      "jdk",
      "jre",
      "jvm",
      "development",
      "runtime",
      "execute",
    ],

    "Explain the difference between HashMap and ConcurrentHashMap and when you would use each.": [
      "hashmap",
      "concurrenthashmap",
      "thread",
      "concurrent",
      "synchronization",
      "multiple",
    ],
  },

  React: {
    "What is a React component?": [
      "component",
      "reusable",
      "ui",
      "user interface",
      "props",
      "state",
    ],

    "What is JSX in React?": [
      "jsx",
      "javascript",
      "xml",
      "syntax",
      "component",
      "ui",
    ],

    "How does React decide when a component should re-render?": [
      "state",
      "props",
      "render",
      "rerender",
      "re-render",
      "update",
    ],
  },

  DSA: {
    "What is the difference between an array and a linked list?": [
      "array",
      "linked list",
      "memory",
      "index",
      "node",
      "insertion",
      "deletion",
    ],

    "How would you determine the time complexity of a binary search algorithm?": [
      "binary search",
      "log",
      "logarithmic",
      "o(log",
      "sorted",
      "time complexity",
    ],
  },

  AWS: {
    "What is AWS and why do companies use cloud services?": [
      "aws",
      "amazon web services",
      "cloud",
      "server",
      "scalability",
      "storage",
      "compute",
    ],
  },

  SQL: {
    "What is SQL and why is it used?": [
      "sql",
      "structured query language",
      "database",
      "query",
      "relational",
      "data",
    ],

    "What is the difference between WHERE and HAVING in SQL?": [
      "where",
      "having",
      "filter",
      "rows",
      "group",
      "aggregate",
    ],

    "What is a primary key in SQL?": [
      "primary key",
      "unique",
      "identify",
      "row",
      "null",
      "record",
    ],

    "What is the difference between DELETE, DROP and TRUNCATE?": [
      "delete",
      "drop",
      "truncate",
      "rows",
      "table",
      "structure",
    ],

    "What is the difference between INNER JOIN and LEFT JOIN?": [
      "inner join",
      "left join",
      "matching",
      "rows",
      "table",
      "join",
    ],

    "What is normalization in SQL and why is it used?": [
      "normalization",
      "redundancy",
      "duplicate",
      "data",
      "tables",
      "normal forms",
    ],

    "What is the difference between GROUP BY and ORDER BY?": [
      "group by",
      "order by",
      "group",
      "sort",
      "aggregate",
    ],

    "What is a database index and how does it improve query performance?": [
      "index",
      "search",
      "query",
      "performance",
      "faster",
      "lookup",
    ],
  },

  HR: {
    "Tell me about yourself.": [
      "experience",
      "skills",
      "developer",
      "project",
      "education",
      "goal",
    ],

    "Tell me about a difficult problem you solved.": [
      "problem",
      "situation",
      "action",
      "solution",
      "result",
      "learned",
    ],
  },
};

/* =========================================================
   TOPIC-SPECIFIC MEMORY TIPS
========================================================= */

const memoryTips = {
  Java:
    "Remember: JVM runs bytecode. javac compiles Java source code into bytecode.",

  React:
    "Remember: Components are reusable UI building blocks. Props bring data in; state manages changing data.",

  DSA:
    "Remember: Always explain the data structure, approach, complexity, and why your approach works.",

  AWS:
    "Remember: Think in terms of compute, storage, networking, scalability and managed cloud services.",

  SQL:
    "Remember: SQL is about working with data. Think SELECT, filtering, grouping, joining and indexing.",

  HR:
    "Remember STAR: Situation → Task → Action → Result.",
};

/* =========================================================
   SCORE BAR
========================================================= */

function ScoreBar({ label, score }) {
  return (
    <div className="score-bar-wrapper">
      <div className="score-bar-header">
        <span>{label}</span>
        <strong>{score}/10</strong>
      </div>

      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{
            width: `${Math.max(0, Math.min(score * 10, 100))}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   INTERVIEW COMPONENT
========================================================= */

function Interview() {
  const [mode, setMode] = useState("beginner");
  const [language, setLanguage] = useState("english");
  const [topic, setTopic] = useState("All Topics");

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [answerHistory, setAnswerHistory] = useState([]);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [roastMode, setRoastMode] = useState(false);
  const [roastLevel, setRoastLevel] = useState("funny");

  const [questionChanging, setQuestionChanging] = useState(false);

  const recognitionRef = useRef(null);
  const answerRef = useRef("");
  const questionTimerRef = useRef(null);

  /* =======================================================
     FILTER QUESTIONS
  ======================================================= */

  const questions = fallbackInterviewQuestions.filter((question) => {
    if (topic === "All Topics") {
      return true;
    }

    return question.topic === topic;
  });

  /* =======================================================
     CURRENT QUESTION - SAFE
  ======================================================= */

  const currentQuestion =
    questions.length > 0
      ? questions[questionIndex] || questions[0]
      : null;

  /* =======================================================
     SPEAK TEXT
  ======================================================= */

  const speakText = useCallback(
    (text) => {
      if (!text || !("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      if (language === "telugu") {
        utterance.lang = "te-IN";
      } else if (language === "telugu-english") {
        utterance.lang = "en-IN";
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = 0.95;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  /* =======================================================
     STOP SPEAKING
  ======================================================= */

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }, []);

  /* =======================================================
     SPEAK CURRENT QUESTION
  ======================================================= */

  const speakCurrentQuestion = useCallback(() => {
    if (!currentQuestion) {
      return;
    }

    speakText(currentQuestion.question);
  }, [currentQuestion, speakText]);

  /* =======================================================
     AUTO SPEAK QUESTION

     Question is spoken when session starts or question changes.
  ======================================================= */

  useEffect(() => {
    if (!sessionStarted || sessionFinished || !currentQuestion) {
      return;
    }

    if (questionTimerRef.current) {
      clearTimeout(questionTimerRef.current);
    }

    questionTimerRef.current = setTimeout(() => {
      speakCurrentQuestion();
    }, 450);

    return () => {
      if (questionTimerRef.current) {
        clearTimeout(questionTimerRef.current);
      }
    };
  }, [
    sessionStarted,
    sessionFinished,
    questionIndex,
    currentQuestion,
    speakCurrentQuestion,
  ]);

  /* =======================================================
     SPEECH RECOGNITION
  ======================================================= */

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    if (language === "telugu") {
      recognition.lang = "te-IN";
    } else if (language === "telugu-english") {
      recognition.lang = "en-IN";
    } else {
      recognition.lang = "en-US";
    }

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i += 1
      ) {
        const transcript =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript;
        } else {
          interimText += transcript;
        }
      }

      const existing = answerRef.current;

      const combinedFinal = finalText
        ? `${existing} ${finalText}`.trim()
        : existing;

      const displayText = interimText
        ? `${combinedFinal} ${interimText}`.trim()
        : combinedFinal;

      answerRef.current = combinedFinal;
      setAnswer(displayText);
    };

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }
    };
  }, [language]);

  /* =======================================================
     START RECORDING
  ======================================================= */

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    stopSpeaking();

    answerRef.current = answer;

    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch {
      // Browser can throw if recognition is already running.
    }
  };

  /* =======================================================
     STOP RECORDING
  ======================================================= */

  const stopRecording = () => {
    if (!recognitionRef.current) {
      return;
    }

    try {
      recognitionRef.current.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsRecording(false);
  };

  /* =======================================================
     TOGGLE RECORDING
  ======================================================= */

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  /* =======================================================
     ANSWER QUALITY CALCULATION
  ======================================================= */

  const calculateBaseScore = (
    question,
    userAnswer
  ) => {
    if (!userAnswer || !userAnswer.trim()) {
      return 0;
    }

    const normalizedAnswer =
      userAnswer.toLowerCase();

    const topicKeywords =
      keywordMap[question.topic] || {};

    const keywords =
      topicKeywords[question.question] || [];

    let matchedKeywords = 0;

    keywords.forEach((keyword) => {
      if (normalizedAnswer.includes(keyword.toLowerCase())) {
        matchedKeywords += 1;
      }
    });

    const keywordScore =
      keywords.length > 0
        ? (matchedKeywords / keywords.length) * 6
        : 3;

    const lengthScore =
      userAnswer.trim().split(/\s+/).length >= 20
        ? 2
        : userAnswer.trim().split(/\s+/).length >= 8
          ? 1.5
          : 0.5;

    const explanationScore =
      normalizedAnswer.includes("because") ||
      normalizedAnswer.includes("for example") ||
      normalizedAnswer.includes("example") ||
      normalizedAnswer.includes("when")
        ? 1
        : 0.5;

    const confidenceScore =
      userAnswer.trim().length >= 60
        ? 1
        : 0.5;

    const total =
      keywordScore +
      lengthScore +
      explanationScore +
      confidenceScore;

    return Math.max(
      1,
      Math.min(10, Math.round(total))
    );
  };

  /* =======================================================
     GENERATE EVALUATION

     Frontend fallback evaluator.
     Real AI API will replace this later.
  ======================================================= */

  const generateEvaluation = (
    question,
    userAnswer
  ) => {
    const cleanAnswer = userAnswer.trim();

    const score = calculateBaseScore(
      question,
      cleanAnswer
    );

    const normalizedAnswer =
      cleanAnswer.toLowerCase();

    const topicKeywords =
      keywordMap[question.topic] || {};

    const expectedKeywords =
      topicKeywords[question.question] || [];

    const matchedKeywords =
      expectedKeywords.filter((keyword) =>
        normalizedAnswer.includes(keyword.toLowerCase())
      );

    const missingKeywords =
      expectedKeywords.filter(
        (keyword) =>
          !normalizedAnswer.includes(
            keyword.toLowerCase()
          )
      );

    let technicalScore = score;
    let explanationScore =
      cleanAnswer.length >= 80 ? 8 : 6;
    let exampleScore =
      normalizedAnswer.includes("example") ||
      normalizedAnswer.includes("for example")
        ? 8
        : 5;

    let confidenceScore =
      cleanAnswer.length >= 60 ? 8 : 6;

    let communicationScore =
      cleanAnswer.split(/\s+/).length >= 15
        ? 8
        : 6;

    /* -------------------------------------------------------
       BEHAVIORAL / HR
    ------------------------------------------------------- */

    if (question.type === "behavioral") {
      const starKeywords = [
        "situation",
        "task",
        "action",
        "result",
      ];

      const starCount = starKeywords.filter(
        (item) =>
          normalizedAnswer.includes(item)
      ).length;

      technicalScore = Math.max(
        1,
        Math.min(10, 5 + starCount)
      );

      explanationScore =
        starCount >= 2 ? 8 : 6;

      exampleScore =
        starCount >= 3 ? 9 : 5;

      confidenceScore =
        cleanAnswer.length >= 80 ? 8 : 6;

      communicationScore =
        cleanAnswer.length >= 80 ? 8 : 6;
    }

    /* -------------------------------------------------------
       SQL-SPECIFIC EVALUATION
    ------------------------------------------------------- */

    if (question.topic === "SQL") {
      technicalScore = score;

      explanationScore =
        normalizedAnswer.includes("because") ||
        normalizedAnswer.includes("used") ||
        normalizedAnswer.includes("purpose")
          ? 8
          : 6;

      exampleScore =
        normalizedAnswer.includes("example") ||
        normalizedAnswer.includes("for example") ||
        normalizedAnswer.includes("query")
          ? 8
          : 5;

      communicationScore =
        cleanAnswer.length >= 60 ? 8 : 6;
    }

    /* -------------------------------------------------------
       DETERMINE FEEDBACK
    ------------------------------------------------------- */

    let technicalFeedback;

    if (score >= 8) {
      technicalFeedback =
        "Strong answer. You covered most of the important technical points.";
    } else if (score >= 6) {
      technicalFeedback =
        "Good start. Your answer has the main idea, but a few important points are missing.";
    } else if (score >= 4) {
      technicalFeedback =
        "You understand part of the concept, but the explanation needs more technical detail.";
    } else {
      technicalFeedback =
        "Your answer needs more technical accuracy. Let's break the concept down simply.";
    }

    /* -------------------------------------------------------
       IMPORTANT POINTS
    ------------------------------------------------------- */

    const importantPoints =
      expectedKeywords.length > 0
        ? expectedKeywords.slice(0, 5)
        : [
            "Define the concept clearly",
            "Explain how it works",
            "Give a practical example",
          ];

    /* -------------------------------------------------------
       IMPROVED ANSWER
    ------------------------------------------------------- */

    let improvedAnswer;

    if (question.topic === "Java") {
      if (
        question.question.includes(
          "JVM and what is its main purpose"
        )
      ) {
        improvedAnswer =
          "JVM stands for Java Virtual Machine. It runs Java bytecode and provides the runtime environment for Java applications. Java source code is compiled by javac into bytecode, and the JVM executes that bytecode. This helps Java achieve platform independence because the same bytecode can run on different systems that have a compatible JVM.";
      } else if (
        question.question.includes(
          "JDK, JRE and JVM"
        )
      ) {
        improvedAnswer =
          "JDK is the Java Development Kit and is used to develop Java applications. JRE is the Java Runtime Environment and provides the libraries and runtime needed to run Java applications. JVM is the Java Virtual Machine that actually executes Java bytecode. In simple terms, JDK is for development, JRE is for running applications, and JVM executes the bytecode.";
      } else {
        improvedAnswer =
          "Start with a clear definition, explain the important difference, and then give a practical example of when you would use each concept.";
      }
    } else if (question.topic === "React") {
      if (
        question.question.includes(
          "React component"
        )
      ) {
        improvedAnswer =
          "A React component is a reusable building block of a user interface. It can accept data through props and manage changing data through state. Components can be combined together to build complete React applications.";
      } else if (
        question.question.includes("JSX")
      ) {
        improvedAnswer =
          "JSX is a syntax extension for JavaScript used in React. It allows us to write UI-like markup inside JavaScript code. JSX is transformed into JavaScript that React can use to create and update the user interface.";
      } else {
        improvedAnswer =
          "React generally re-renders when relevant state or props change. React then determines what needs to be updated in the UI.";
      }
    } else if (question.topic === "DSA") {
      if (
        question.question.includes(
          "array and a linked list"
        )
      ) {
        improvedAnswer =
          "An array stores elements in contiguous memory and provides fast index-based access, usually O(1). A linked list stores elements as nodes connected using references. Linked lists can make insertion and deletion easier when the position is known, while accessing an element by position generally takes O(n).";
      } else {
        improvedAnswer =
          "Binary search works on sorted data by repeatedly dividing the search space in half. Because the search space is halved at every step, its time complexity is O(log n).";
      }
    } else if (question.topic === "AWS") {
      improvedAnswer =
        "AWS stands for Amazon Web Services. It provides cloud services such as compute, storage, databases and networking. Companies use AWS because they can scale resources based on demand without managing all physical infrastructure themselves.";
    } else if (question.topic === "SQL") {
      if (
        question.question.includes(
          "What is SQL and why is it used"
        )
      ) {
        improvedAnswer =
          "SQL stands for Structured Query Language. It is used to communicate with relational databases. We use SQL to create, read, update and delete data, as well as filter, sort, group and join data from tables.";
      } else if (
        question.question.includes(
          "WHERE and HAVING"
        )
      ) {
        improvedAnswer =
          "WHERE filters individual rows before grouping, while HAVING filters groups after GROUP BY has been applied. WHERE is commonly used for row-level conditions, whereas HAVING is useful with aggregate functions such as COUNT, SUM or AVG.";
      } else if (
        question.question.includes(
          "primary key"
        )
      ) {
        improvedAnswer =
          "A primary key is a column or combination of columns that uniquely identifies each row in a table. A primary key cannot contain duplicate values, and it cannot contain NULL values.";
      } else if (
        question.question.includes(
          "DELETE, DROP and TRUNCATE"
        )
      ) {
        improvedAnswer =
          "DELETE removes selected rows and can use a WHERE condition. TRUNCATE removes all rows from a table while keeping the table structure. DROP removes the table itself, including its structure and data.";
      } else if (
        question.question.includes(
          "INNER JOIN and LEFT JOIN"
        )
      ) {
        improvedAnswer =
          "INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN returns all rows from the left table and the matching rows from the right table. If there is no match, the right-side columns contain NULL.";
      } else if (
        question.question.includes(
          "normalization"
        )
      ) {
        improvedAnswer =
          "Normalization is the process of organizing database tables to reduce data redundancy and improve data consistency. It usually involves splitting data into related tables and defining appropriate relationships between them.";
      } else if (
        question.question.includes(
          "GROUP BY and ORDER BY"
        )
      ) {
        improvedAnswer =
          "GROUP BY combines rows with the same values so aggregate functions such as COUNT or SUM can be applied to each group. ORDER BY sorts the result based on one or more columns.";
      } else if (
        question.question.includes(
          "database index"
        )
      ) {
        improvedAnswer =
          "A database index is a data structure that helps the database find rows faster without scanning the entire table. It can significantly improve read and search performance, although indexes also require storage and can add overhead to insert and update operations.";
      } else {
        improvedAnswer =
          "Give a clear definition, explain why the SQL concept is used, and finish with a small query or practical database example.";
      }
    } else if (question.type === "behavioral") {
      improvedAnswer =
        "A strong behavioral answer should follow STAR: first explain the Situation, then the Task you had, the Action you personally took, and finally the Result. Finish with what you learned if appropriate.";
    } else {
      improvedAnswer =
        "A strong interview answer should start with a clear definition, explain the concept simply, provide an example, and mention a practical use case.";
    }

    /* -------------------------------------------------------
       TEACHER FEEDBACK
    ------------------------------------------------------- */

    const teacherFeedback =
      score >= 8
        ? "Excellent work! You already have a strong foundation. Now focus on making your answer more structured and interview-ready."
        : score >= 6
          ? "Good attempt! You know the core idea. Add the missing technical points and one practical example to make the answer stronger."
          : "No problem — this is practice. Let's make it simple: first understand the definition, then understand how it works, and finally remember one real-world example.";

    /* -------------------------------------------------------
       ROAST
    ------------------------------------------------------- */

    let roast = "";

    if (roastMode) {
      if (score >= 8) {
        roast =
          roastLevel === "savage"
            ? "🔥 Okay okay, this answer actually came prepared. I was ready to roast you and now I have to update my own resume."
            : roastLevel === "funny"
              ? "😂 Bro actually came prepared. The roast department is currently unemployed."
              : "🙂 Nice answer! Just polish the structure a little more.";
      } else if (question.topic === "Java" &&
        question.question.includes("JVM")) {
        roast =
          roastLevel === "savage"
            ? "🔥 Bro, JVM just got assigned three jobs. Compiler, runtime and bytecode execution all in one sentence!"
            : roastLevel === "funny"
              ? "😂 Bro, JVM just got blamed for a job it doesn't do. javac is looking at this like: 'Excuse me?'"
              : "🙂 Small correction: javac compiles the source code; JVM runs the bytecode.";
      } else if (question.topic === "SQL") {
        roast =
          roastLevel === "savage"
            ? "🔥 SQL interviewer asked one question and your answer executed a full SELECT * FROM confusion."
            : roastLevel === "funny"
              ? "😂 The database heard that answer and is considering a rollback."
              : "🙂 You're close. Let's clean up the SQL concept and make the answer more precise.";
      } else {
        roast =
          roastLevel === "savage"
            ? "🔥 That answer needs a little debugging before production."
            : roastLevel === "funny"
              ? "😂 The answer started running... but somewhere around the middle it forgot where it was going."
              : "🙂 You're on the right track. Let's strengthen the missing points.";
      }
    }

    return {
      score,
      technicalScore,
      explanationScore,
      exampleScore,
      confidenceScore,
      communicationScore,
      technicalFeedback,
      importantPoints,
      missingKeywords,
      matchedKeywords,
      improvedAnswer,
      teacherFeedback,
      roast,
    };
  };

  /* =======================================================
     START INTERVIEW
  ======================================================= */

  const startInterview = () => {
    if (questions.length === 0) {
      alert(
        "No fallback questions are available for this topic yet."
      );
      return;
    }

    stopSpeaking();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped.
      }
    }

    setSessionStarted(true);
    setSessionFinished(false);
    setQuestionIndex(0);
    setAnswerHistory([]);
    setAnswer("");
    answerRef.current = "";
    setEvaluation(null);
    setQuestionChanging(false);
  };

  /* =======================================================
     MODE CHANGE
  ======================================================= */

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  /* =======================================================
     TOPIC CHANGE
  ======================================================= */

  const handleTopicChange = (newTopic) => {
    stopSpeaking();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped.
      }
    }

    setTopic(newTopic);
    setSessionStarted(false);
    setSessionFinished(false);
    setQuestionIndex(0);
    setAnswer("");
    answerRef.current = "";
    setAnswerHistory([]);
    setEvaluation(null);
    setQuestionChanging(false);
  };

  /* =======================================================
     LANGUAGE CHANGE
  ======================================================= */

  const handleLanguageChange = (newLanguage) => {
    stopSpeaking();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped.
      }
    }

    setLanguage(newLanguage);
    setIsRecording(false);
  };

  /* =======================================================
     SUBMIT ANSWER
  ======================================================= */

  const handleSubmit = () => {
    if (!currentQuestion) {
      return;
    }

    if (!answer.trim()) {
      alert(
        "Please type an answer or use the microphone first."
      );
      return;
    }

    stopRecording();
    stopSpeaking();

    const result = generateEvaluation(
      currentQuestion,
      answer
    );

    const historyItem = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      topic: currentQuestion.topic,
      answer: answer.trim(),
      evaluation: result,
    };

    setEvaluation(result);
    setAnswerHistory((previous) => [
      ...previous,
      historyItem,
    ]);
  };

  /* =======================================================
     NEXT QUESTION
  ======================================================= */

  const handleNextQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    stopRecording();
    stopSpeaking();

    if (
      questionIndex >= questions.length - 1
    ) {
      const updatedHistory =
        answerHistory.length === questions.length
          ? answerHistory
          : answerHistory;

      if (updatedHistory.length > 0) {
        setSessionFinished(true);
        setSessionStarted(false);
      } else {
        setSessionFinished(true);
        setSessionStarted(false);
      }

      return;
    }

    setQuestionChanging(true);

    setTimeout(() => {
      setQuestionIndex((previous) => previous + 1);
      setAnswer("");
      answerRef.current = "";
      setEvaluation(null);

      setTimeout(() => {
        setQuestionChanging(false);
      }, 80);
    }, 350);
  };

  /* =======================================================
     FINAL SUMMARY
  ======================================================= */

  const calculateSummary = () => {
    if (answerHistory.length === 0) {
      return {
        overall: 0,
        technical: 0,
        communication: 0,
        problemSolving: 0,
        confidence: 0,
      };
    }

    const average = (items) => {
      if (items.length === 0) {
        return 0;
      }

      return Math.round(
        items.reduce(
          (sum, value) => sum + value,
          0
        ) / items.length
      );
    };

    const technicalScores =
      answerHistory.map(
        (item) =>
          item.evaluation.technicalScore
      );

    const communicationScores =
      answerHistory.map(
        (item) =>
          item.evaluation.communicationScore
      );

    const confidenceScores =
      answerHistory.map(
        (item) =>
          item.evaluation.confidenceScore
      );

    const problemSolvingScores =
      answerHistory.map(
        (item) =>
          item.evaluation.exampleScore
      );

    const overall = average(
      answerHistory.map(
        (item) => item.evaluation.score
      )
    );

    return {
      overall,
      technical: average(technicalScores),
      communication: average(
        communicationScores
      ),
      problemSolving: average(
        problemSolvingScores
      ),
      confidence: average(
        confidenceScores
      ),
    };
  };

  const summary = calculateSummary();

  /* =======================================================
     RESTART SESSION
  ======================================================= */

  const restartInterview = () => {
    stopSpeaking();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped.
      }
    }

    setSessionStarted(false);
    setSessionFinished(false);
    setQuestionIndex(0);
    setAnswerHistory([]);
    setAnswer("");
    answerRef.current = "";
    setEvaluation(null);
    setQuestionChanging(false);
    setIsRecording(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="interview-page page-container">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="interview-header">
        <div>
          <span className="interview-label">
            AI INTERVIEW COACH
          </span>

          <h1 className="page-title">
            Practice. Speak. Improve. 🚀
          </h1>

          <p className="page-subtitle">
            Your personal interviewer, teacher,
            mentor and well-wisher — helping you
            become interview ready.
          </p>
        </div>

        <div className="interview-voice-status surface-3d">
          <div
            className={`voice-status-orb ${
              isSpeaking ? "speaking" : ""
            }`}
          >
            {isSpeaking ? "🔊" : "🤖"}
          </div>

          <div>
            <strong>
              {isSpeaking
                ? "AI is speaking..."
                : "AI Interview Coach"}
            </strong>

            <span>
              {isSpeaking
                ? "Listen carefully"
                : "Ready when you are"}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      {!sessionStarted && !sessionFinished && (
        <section className="interview-controls surface-3d">
          <div className="interview-control-group">
            <label>Interview language</label>

            <div className="language-selector">
              {interviewLanguages.map(
                (item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      language === item.id
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleLanguageChange(
                        item.id
                      )
                    }
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="interview-control-group">
            <label>Choose topic</label>

            <select
              value={topic}
              onChange={(event) =>
                handleTopicChange(
                  event.target.value
                )
              }
            >
              {interviewTopics.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="interview-control-group">
            <label>Interview mode</label>

            <div className="interview-modes">
              {interviewModes.map(
                (item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`interview-mode-card ${
                      mode === item.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleModeChange(
                        item.id
                      )
                    }
                  >
                    <span className="mode-icon">
                      {item.icon}
                    </span>

                    <span className="mode-content">
                      <strong>
                        {item.title}
                      </strong>

                      <small>
                        {item.description}
                      </small>
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* =================================================
              ROAST MODE
          ================================================= */}

          <div className="interview-control-group roast-settings">
            <label>Roast Level</label>

            <div className="roast-options">
              {roastLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  className={`roast-option ${
                    roastLevel === level.id ? "active" : ""
                  }`}
                  onClick={() => setRoastLevel(level.id)}
                >
                  <span className="roast-option-icon">{level.icon}</span>
                  <span className="roast-option-text">
                    <strong>{level.label}</strong>
                    <small>{level.description}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="roast-toggle-row">
              <p>Roast the answer, never the student.</p>

              <button
                type="button"
                className={`roast-toggle ${roastMode ? "active" : ""}`}
                onClick={() => setRoastMode((previous) => !previous)}
              >
                <span>{roastMode ? "ON" : "OFF"}</span>
              </button>
            </div>

            {roastMode && (
              <div className="roast-levels">
                {roastLevels.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={roastLevel === item.id ? "active" : ""}
                    onClick={() => setRoastLevel(item.id)}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          START PANEL
      ===================================================== */}

      {!sessionStarted && !sessionFinished && (
        <section className="interview-start-panel surface-3d">
          <div className="start-panel-icon">
            🎤
          </div>

          <div className="start-panel-content">
            <span className="start-panel-label">
              READY TO PRACTICE?
            </span>

            <h2>
              Let's start your interview
            </h2>

            <p>
              The interviewer will ask one
              question at a time. You can type
              your answer or speak using your
              microphone.
            </p>

            <div className="interview-flow">
              <span>🤖 Question</span>
              <span>→</span>
              <span>🎤 Answer</span>
              <span>→</span>
              <span>🧠 Review</span>
              <span>→</span>
              <span>🚀 Improve</span>
            </div>

            {questions.length === 0 && (
              <div className="no-question-message">
                No fallback questions are
                available for this topic yet.
              </div>
            )}

            <button
              type="button"
              className="start-interview-button"
              onClick={startInterview}
              disabled={questions.length === 0}
            >
              Start Interview →
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          INTERVIEW SESSION
      ===================================================== */}

      {sessionStarted && currentQuestion && (
        <section className="interview-session">
          {/* ===============================================
              PROGRESS
          =============================================== */}

          <div className="interview-progress surface-3d">
            <div>
              <span>
                Question{" "}
                {questionIndex + 1} of{" "}
                {questions.length}
              </span>

              <strong>
                {Math.round(
                  ((questionIndex + 1) /
                    questions.length) *
                    100
                )}
                %
              </strong>
            </div>

            <div className="interview-progress-track">
              <div
                className="interview-progress-fill"
                style={{
                  width: `${
                    ((questionIndex + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* ===============================================
              QUESTION
          =============================================== */}

          <div
            className={`interview-question-panel surface-3d ${
              questionChanging
                ? "question-changing"
                : ""
            }`}
          >
            <div className="question-top-row">
              <span className="question-type">
                {currentQuestion.type ===
                "behavioral"
                  ? "BEHAVIORAL"
                  : "TECHNICAL"}
              </span>

              <span className="question-topic">
                {currentQuestion.topic}
              </span>

              <span className="question-difficulty">
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="question-main">
              <div className="question-number">
                {String(
                  questionIndex + 1
                ).padStart(2, "0")}
              </div>

              <div className="question-content">
                <h2>
                  {currentQuestion.question}
                </h2>

                <p>
                  Think first. Then explain it
                  naturally, just like you would
                  to an interviewer.
                </p>
              </div>

              <button
                type="button"
                className={`speak-question-button ${
                  isSpeaking
                    ? "active"
                    : ""
                }`}
                onClick={
                  isSpeaking
                    ? stopSpeaking
                    : speakCurrentQuestion
                }
              >
                <span>
                  {isSpeaking
                    ? "🔇"
                    : "🔊"}
                </span>

                <small>
                  {isSpeaking
                    ? "Stop"
                    : "Listen"}
                </small>
              </button>
            </div>
          </div>

          {/* ===============================================
              ANSWER PANEL
          =============================================== */}

          <div className="interview-answer-panel surface-3d">
            <div className="answer-header">
              <div>
                <span>
                  YOUR ANSWER
                </span>

                <h3>
                  Speak naturally 🎤
                </h3>
              </div>

              <div
                className={`recording-indicator ${
                  isRecording
                    ? "active"
                    : ""
                }`}
              >
                <span className="recording-dot" />

                {isRecording
                  ? "Listening..."
                  : "Mic ready"}
              </div>
            </div>

            <textarea
              value={answer}
              onChange={(event) => {
                setAnswer(
                  event.target.value
                );

                answerRef.current =
                  event.target.value;
              }}
              placeholder="Type your answer here, or use the microphone..."
              rows={7}
            />

            <div className="answer-actions">
              <button
                type="button"
                className={`microphone-button ${
                  isRecording
                    ? "recording"
                    : ""
                }`}
                onClick={
                  toggleRecording
                }
              >
                <span>
                  {isRecording
                    ? "⏹"
                    : "🎙️"}
                </span>

                {isRecording
                  ? "Stop Recording"
                  : "Answer with Mic"}
              </button>

              <button
                type="button"
                className="submit-answer-button"
                onClick={handleSubmit}
              >
                Review My Answer →
              </button>
            </div>
          </div>

          {/* ===============================================
              EVALUATION
          =============================================== */}

          {evaluation && (
            <div className="interview-evaluation">
              <div className="evaluation-header">
                <div>
                  <span>
                    AI REVIEW
                  </span>

                  <h2>
                    Here's how you did
                  </h2>
                </div>

                <div className="overall-score">
                  <strong>
                    {evaluation.score}
                  </strong>

                  <span>
                    / 10
                  </span>
                </div>
              </div>

              {/* =========================================
                  SCORE COLUMNS
              ========================================= */}

              <div className="evaluation-score-grid">
                <div className="evaluation-score-card surface-3d">
                  <ScoreBar
                    label="Technical Knowledge"
                    score={
                      evaluation.technicalScore
                    }
                  />

                  <ScoreBar
                    label="Explanation"
                    score={
                      evaluation.explanationScore
                    }
                  />
                </div>

                <div className="evaluation-score-card surface-3d">
                  <ScoreBar
                    label="Example / Use Case"
                    score={
                      evaluation.exampleScore
                    }
                  />

                  <ScoreBar
                    label="Confidence"
                    score={
                      evaluation.confidenceScore
                    }
                  />
                </div>

                <div className="evaluation-score-card surface-3d">
                  <ScoreBar
                    label="Communication"
                    score={
                      evaluation.communicationScore
                    }
                  />

                  <div className="evaluation-mini-message">
                    {evaluation.score >= 8
                      ? "🔥 Strong answer"
                      : evaluation.score >=
                          6
                        ? "👍 Good progress"
                        : "💪 Keep practicing"}
                  </div>
                </div>
              </div>

              {/* =========================================
                  TECHNICAL FEEDBACK
              ========================================= */}

              <div className="evaluation-columns">
                <div className="evaluation-card surface-3d">
                  <span className="evaluation-card-label">
                    TECHNICAL FEEDBACK
                  </span>

                  <h3>
                    What the interviewer noticed
                  </h3>

                  <p>
                    {
                      evaluation.technicalFeedback
                    }
                  </p>

                  {evaluation.matchedKeywords
                    .length > 0 && (
                    <div className="keyword-section">
                      <strong>
                        You mentioned:
                      </strong>

                      <div className="keyword-list">
                        {evaluation.matchedKeywords.map(
                          (keyword) => (
                            <span
                              key={keyword}
                              className="keyword matched"
                            >
                              ✓ {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {evaluation.missingKeywords
                    .length > 0 && (
                    <div className="keyword-section">
                      <strong>
                        Important points to add:
                      </strong>

                      <div className="keyword-list">
                        {evaluation.missingKeywords
                          .slice(0, 5)
                          .map(
                            (keyword) => (
                              <span
                                key={
                                  keyword
                                }
                                className="keyword missing"
                              >
                                + {keyword}
                              </span>
                            )
                          )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="evaluation-card surface-3d">
                  <span className="evaluation-card-label">
                    IMPORTANT POINTS
                  </span>

                  <h3>
                    Don't forget these
                  </h3>

                  <ul className="important-points">
                    {evaluation.importantPoints.map(
                      (point) => (
                        <li key={point}>
                          <span>✓</span>
                          {point}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* =========================================
                  IMPROVED ANSWER
              ========================================= */}

              <div className="improved-answer-card surface-3d">
                <div className="improved-answer-header">
                  <div>
                    <span>
                      INTERVIEW-READY ANSWER
                    </span>

                    <h3>
                      How you can answer it better
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      speakText(
                        evaluation.improvedAnswer
                      )
                    }
                  >
                    🔊 Listen
                  </button>
                </div>

                <p>
                  {evaluation.improvedAnswer}
                </p>
              </div>

              {/* =========================================
                  TEACHER
              ========================================= */}

              <div className="teacher-card surface-3d">
                <div className="teacher-icon">
                  🧑‍🏫
                </div>

                <div>
                  <span>
                    YOUR TEACHER SAYS
                  </span>

                  <p>
                    {evaluation.teacherFeedback}
                  </p>

                  {currentQuestion.topic &&
                    memoryTips[
                      currentQuestion.topic
                    ] && (
                      <div className="memory-tip">
                        💡{" "}
                        {
                          memoryTips[
                            currentQuestion.topic
                          ]
                        }
                      </div>
                    )}
                </div>
              </div>

              {/* =========================================
                  ROAST
              ========================================= */}

              {roastMode &&
                evaluation.roast && (
                  <div className="roast-card surface-3d">
                    <div className="roast-icon">
                      🔥
                    </div>

                    <div>
                      <span>
                        HONEST ROAST
                      </span>

                      <p>
                        {evaluation.roast}
                      </p>

                      <small>
                        Roast the answer.
                        Improve the student.
                      </small>
                    </div>
                  </div>
                )}

              {/* =========================================
                  NEXT QUESTION
              ========================================= */}

              <div className="next-question-area">
                <button
                  type="button"
                  className="next-question-button"
                  onClick={
                    handleNextQuestion
                  }
                >
                  {questionIndex <
                  questions.length - 1
                    ? "Next Question →"
                    : "Finish Interview →"}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =====================================================
          FINAL SUMMARY
      ===================================================== */}

      {sessionFinished && (
        <section className="interview-summary surface-3d">
          <div className="summary-hero">
            <div className="summary-icon">
              🏆
            </div>

            <span>
              INTERVIEW COMPLETE
            </span>

            <h2>
              Great job finishing the session!
            </h2>

            <p>
              Here's your performance snapshot.
            </p>
          </div>

          <div className="summary-overall">
            <div className="summary-score-circle">
              <strong>
                {summary.overall}
              </strong>

              <span>
                / 10
              </span>
            </div>

            <div>
              <span>
                Overall Interview Score
              </span>

              <h3>
                {summary.overall >= 8
                  ? "Interview Ready 🚀"
                  : summary.overall >= 6
                    ? "Good Progress 👍"
                    : "Keep Practicing 💪"}
              </h3>
            </div>
          </div>

          <div className="summary-score-grid">
            <div className="summary-score-card">
              <span>🧠</span>
              <strong>
                {summary.technical}
              </strong>
              <small>
                Technical Knowledge
              </small>
            </div>

            <div className="summary-score-card">
              <span>💬</span>
              <strong>
                {summary.communication}
              </strong>
              <small>
                Communication
              </small>
            </div>

            <div className="summary-score-card">
              <span>🧩</span>
              <strong>
                {summary.problemSolving}
              </strong>
              <small>
                Problem Solving
              </small>
            </div>

            <div className="summary-score-card">
              <span>🎤</span>
              <strong>
                {summary.confidence}
              </strong>
              <small>
                Confidence
              </small>
            </div>
          </div>

          <div className="summary-recommendation">
            <span>
              🎯 NEXT STEP
            </span>

            <h3>
              Keep practicing your weak areas
            </h3>

            <p>
              Review the questions where you
              missed important points, then try
              answering them again without
              looking at the improved answer.
            </p>
          </div>

          <div className="summary-actions">
            <button
              type="button"
              className="restart-interview-button"
              onClick={
                restartInterview
              }
            >
              Practice Again →
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Interview;