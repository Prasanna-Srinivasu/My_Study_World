export const practice = {
  // =========================
  // JAVA FULL-STACK
  // =========================

  "java-programming": [
    {
      id: "jp-1",
      question: "What is programming?",
      options: [
        "Giving instructions to a computer",
        "Designing a computer",
        "Installing software",
        "Creating hardware",
      ],
      answer: "Giving instructions to a computer",
      explanation:
        "Programming means writing instructions that tell a computer what to do.",
    },
    {
      id: "jp-2",
      question: "What is a program?",
      options: [
        "A set of instructions",
        "A computer",
        "A database",
        "A programming language",
      ],
      answer: "A set of instructions",
      explanation:
        "A program is a collection of instructions used to perform a task.",
    },
  ],

  "java-introduction": [
    {
      id: "ji-1",
      question: "Which type of programming language is Java?",
      options: [
        "Object-oriented",
        "Markup language",
        "Query language",
        "Assembly language",
      ],
      answer: "Object-oriented",
      explanation:
        "Java is primarily an object-oriented programming language.",
    },
    {
      id: "ji-2",
      question: "Which component executes Java bytecode?",
      options: ["JVM", "JDK", "JRE", "JAR"],
      answer: "JVM",
      explanation:
        "The Java Virtual Machine executes Java bytecode.",
    },
  ],

  "java-jdk-jre-jvm": [
    {
      id: "jj-1",
      question: "Which is used to develop Java applications?",
      options: ["JDK", "JVM", "JRE", "JAR"],
      answer: "JDK",
      explanation:
        "JDK contains the tools required to develop Java applications.",
    },
    {
      id: "jj-2",
      question: "What executes Java bytecode?",
      options: ["JVM", "JDK", "JRE", "Compiler"],
      answer: "JVM",
      explanation:
        "JVM executes the compiled Java bytecode.",
    },
  ],

  "java-variables": [
    {
      id: "jv-1",
      question: "What is a variable?",
      options: [
        "A named storage location",
        "A method",
        "A class",
        "A package",
      ],
      answer: "A named storage location",
      explanation:
        "A variable stores a value that can be used by a program.",
    },
    {
      id: "jv-2",
      question: "Which is a valid Java variable declaration?",
      options: [
        "int age = 24;",
        "age int = 24;",
        "variable age 24;",
        "int = age 24;",
      ],
      answer: "int age = 24;",
      explanation:
        "The declaration contains the data type, variable name and value.",
    },
  ],

  "java-data-types": [
    {
      id: "jdt-1",
      question: "Which is a primitive data type?",
      options: ["int", "String", "ArrayList", "Scanner"],
      answer: "int",
      explanation:
        "int is one of Java's primitive data types.",
    },
    {
      id: "jdt-2",
      question: "Which data type stores true or false?",
      options: ["boolean", "int", "char", "double"],
      answer: "boolean",
      explanation:
        "The boolean type stores either true or false.",
    },
  ],

  "java-operators": [
    {
      id: "jo-1",
      question: "Which operator is used for addition?",
      options: ["+", "-", "*", "/"],
      answer: "+",
      explanation:
        "The + operator performs addition.",
    },
    {
      id: "jo-2",
      question: "Which operator checks equality?",
      options: ["==", "=", "!=", "=>"],
      answer: "==",
      explanation:
        "The == operator compares two values for equality.",
    },
  ],

  "java-conditions": [
    {
      id: "jc-1",
      question: "Which statement is used to check a condition?",
      options: ["if", "for", "class", "import"],
      answer: "if",
      explanation:
        "The if statement executes code when its condition is true.",
    },
    {
      id: "jc-2",
      question: "Which block runs when an if condition is false?",
      options: ["else", "for", "while", "switch"],
      answer: "else",
      explanation:
        "The else block executes when the if condition is false.",
    },
  ],

  "java-loops": [
    {
      id: "jl-1",
      question: "Which loop is commonly used when the number of iterations is known?",
      options: ["for", "if", "switch", "try"],
      answer: "for",
      explanation:
        "A for loop is commonly used when the number of iterations is known.",
    },
    {
      id: "jl-2",
      question: "Which loop executes at least once?",
      options: ["do-while", "while", "for", "if"],
      answer: "do-while",
      explanation:
        "A do-while loop executes its body before checking the condition.",
    },
  ],

  "java-arrays": [
    {
      id: "ja-1",
      question: "What is the first index of a Java array?",
      options: ["0", "1", "-1", "2"],
      answer: "0",
      explanation:
        "Java arrays use zero-based indexing.",
    },
    {
      id: "ja-2",
      question: "Can a Java array change its length after creation?",
      options: ["No", "Yes", "Only with int", "Only with String"],
      answer: "No",
      explanation:
        "A Java array has a fixed length after it is created.",
    },
  ],

  "java-strings": [
    {
      id: "js-1",
      question: "Which class represents text in Java?",
      options: ["String", "Text", "Character", "Sentence"],
      answer: "String",
      explanation:
        "String is the standard Java class used to represent text.",
    },
    {
      id: "js-2",
      question: "Which method returns the length of a String?",
      options: ["length()", "size()", "count()", "getLength()"],
      answer: "length()",
      explanation:
        "The length() method returns the number of characters in a String.",
    },
  ],

  "java-methods": [
    {
      id: "jm-1",
      question: "What is a method?",
      options: [
        "A reusable block of code",
        "A variable",
        "A package",
        "A data type",
      ],
      answer: "A reusable block of code",
      explanation:
        "Methods allow us to organize reusable functionality.",
    },
    {
      id: "jm-2",
      question: "What can a method receive as input?",
      options: ["Parameters", "Packages", "Classes only", "Objects only"],
      answer: "Parameters",
      explanation:
        "Parameters allow values to be passed into a method.",
    },
  ],

  "java-oops": [
    {
      id: "joops-1",
      question: "What does OOP stand for?",
      options: [
        "Object-Oriented Programming",
        "Object Operation Process",
        "Open Object Programming",
        "Object Output Program",
      ],
      answer: "Object-Oriented Programming",
      explanation:
        "OOP stands for Object-Oriented Programming.",
    },
    {
      id: "joops-2",
      question: "Which is an OOP concept?",
      options: [
        "Inheritance",
        "Compilation",
        "Execution",
        "Installation",
      ],
      answer: "Inheritance",
      explanation:
        "Inheritance is one of the major object-oriented programming concepts.",
    },
  ],
};