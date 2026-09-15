export const lessons = {
  "java-programming": {
    title: "What is Programming?",

    introduction:
      "Programming is the process of designing and writing instructions that tell a computer how to perform a task or solve a problem. These instructions are written using programming languages such as Java, Python, JavaScript, C++ and many others.",

    definition:
      "Programming means creating a sequence of clear instructions that a computer can follow to produce a desired result.",

    detailedExplanation:
      "A computer does not automatically know what we want it to do. It needs precise instructions. Programming is the process of thinking about a problem, deciding how to solve it, and expressing that solution in a programming language that a computer system can process.",

    whyProgramming:
      "Almost every application we use depends on programming. Websites, mobile applications, banking systems, online shopping, games, business software and many other digital systems are built from programs. Programming allows us to turn an idea or problem into a working software solution.",

    howProgrammingWorks: [
      {
        title: "1. Understand the Problem",
        explanation:
          "First, identify what needs to be solved. A programmer should understand the required input, the expected result and any rules that must be followed."
      },
      {
        title: "2. Plan the Solution",
        explanation:
          "Next, decide the steps needed to solve the problem. This may involve an algorithm, a flowchart, or simply writing down the logic before coding."
      },
      {
        title: "3. Write the Code",
        explanation:
          "The planned solution is converted into instructions using a programming language such as Java, Python or JavaScript."
      },
      {
        title: "4. Run and Test",
        explanation:
          "The program is executed with different inputs to check whether it produces the expected result."
      },
      {
        title: "5. Find and Fix Problems",
        explanation:
          "If the program produces an incorrect result or an error, the programmer investigates the problem, changes the code and tests it again."
      }
    ],

    realLifeExample: {
      title: "Real-Life Example: Online Food Ordering",

      situation:
        "Imagine that you order food using a food-delivery application. You select a restaurant, choose your food, enter your delivery address and make a payment.",

      connection:
        "Behind the application, many programmed instructions are working together. The program needs to display restaurants, store your selected items, calculate the total price, process the payment, send the order to the restaurant and help the delivery system determine where the food should be delivered.",

      lesson:
        "The important idea is that the application does not make these decisions by itself. Programmers create the instructions that tell the software what to do when the user performs each action."
    },

    programmingExample: {
      title: "A Simple Programming Example",
      language: "java",

      code: `public class Main {
    public static void main(String[] args) {

        int price = 100;
        int quantity = 3;

        int total = price * quantity;

        System.out.println(total);
    }
}`,

      explanation:
        "This program calculates the total price of three items when each item costs 100. The variables store the information, the multiplication operation calculates the total, and System.out.println displays the result."
    },

    codeExplanation: [
      {
        code: "int price = 100;",
        explanation:
          "This creates a variable named price and stores the value 100 in it."
      },
      {
        code: "int quantity = 3;",
        explanation:
          "This creates another variable named quantity and stores the number of items."
      },
      {
        code: "int total = price * quantity;",
        explanation:
          "The program multiplies the price by the quantity and stores the calculated result in total."
      },
      {
        code: "System.out.println(total);",
        explanation:
          "This displays the calculated total on the screen."
      }
    ],

    inputProcessOutput: {
      input:
        "The values provided to a program. In this example, the price is 100 and the quantity is 3.",

      process:
        "The program multiplies the price by the quantity.",

      output:
        "The program displays 300."
    },

    visualLearning: {
      title: "How a Program Solves a Problem",

      diagram: [
        "Problem",
        "↓",
        "Plan the Solution",
        "↓",
        "Write Code",
        "↓",
        "Run the Program",
        "↓",
        "Check the Result"
      ],

      explanation:
        "Programming connects a problem to a result through a sequence of instructions. The programmer first understands the problem, creates a solution, writes that solution as code, runs it and checks whether the result is correct."
    },

    whenToUse: [
      "Use programming when a computer needs to perform a task automatically.",
      "Use programming when a problem can be solved through a defined sequence of instructions.",
      "Use programming to build software, websites, applications, automation systems and many other digital products."
    ],

    whenNotToUse: [
      "Do not start coding when you do not yet understand the problem.",
      "Do not choose programming unnecessarily when a simple manual task is faster and more practical.",
      "Do not write code only for memorization; understand the problem and the required solution first."
    ],

    commonMistakes: [
      "Trying to write code before understanding the problem.",
      "Writing instructions that are unclear or incomplete.",
      "Ignoring errors instead of understanding why they occurred.",
      "Testing a program with only one input.",
      "Memorizing code without understanding what the code is doing."
    ],

    keyPoints: [
      "Programming is about giving computers precise instructions.",
      "A program is a collection of instructions that performs a task.",
      "Programming languages provide a way to express those instructions.",
      "Good programming starts with understanding the problem.",
      "Writing code is only one part of programming; testing and debugging are also important."
    ],

    learningOutcome:
      "After completing this lesson, you should be able to explain what programming is, why programming is needed, how a basic program solves a problem, and how a simple Java program converts instructions into a result.",

    quickAnswer:
      "Programming is writing clear instructions that tell a computer what to do.",

    cheatCode: {
      title: "Programming — Cheat Code",

      remember:
        "Problem → Plan → Code → Run → Test → Fix",

      keyPoints: [
        "Program = set of instructions",
        "Programming = creating instructions to solve problems",
        "Programming language = way to write those instructions",
        "Input → Process → Output",
        "Write code → Run → Test → Debug"
      ],

      interviewAnswer:
        "Programming is the process of creating instructions that tell a computer how to perform a task or solve a problem.",

      keywords: [
        "Problem",
        "Algorithm",
        "Code",
        "Input",
        "Process",
        "Output",
        "Testing",
        "Debugging"
      ]
    }
  },

  "java-introduction": {
    title: "Introduction to Java",

    introduction:
      "Java is a popular programming language used to build web applications, backend systems, Android applications and enterprise software.",

    keyPoints: [
      "Java is object-oriented.",
      "Java is platform independent through the JVM.",
      "Java is widely used for backend development."
    ],

    example: {
      title: "First Java Program",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`
    }
  },

  "java-jdk-jre-jvm": {
    title: "JDK, JRE & JVM",

    introduction:
      "JDK, JRE and JVM are important parts of the Java platform and each has a different responsibility.",

    keyPoints: [
      "JDK is used to develop Java applications.",
      "JRE provides the environment required to run Java applications.",
      "JVM executes Java bytecode."
    ],

    example: {
      title: "Java Execution Flow",
      language: "text",
      code: "Java Source Code → Compiler → Bytecode → JVM → Output"
    }
  },

  "java-variables": {
    title: "Variables",

    introduction:
      "A variable is a named memory location used to store a value that a program can work with.",

    keyPoints: [
      "Every variable has a data type.",
      "A variable can store a value.",
      "Variables can be changed during program execution."
    ],

    example: {
      title: "Variable Example",
      language: "java",
      code: `int age = 24;
String name = "Student";`
    }
  },

  "java-data-types": {
    title: "Data Types",

    introduction:
      "Data types define what kind of value a variable can store.",

    keyPoints: [
      "Java has primitive data types.",
      "Java also supports reference types.",
      "Choosing the correct type helps represent data properly."
    ],

    example: {
      title: "Data Type Example",
      language: "java",
      code: `int age = 24;
double salary = 35000.50;
char grade = 'A';
boolean active = true;`
    }
  },

  "java-operators": {
    title: "Operators",

    introduction:
      "Operators are symbols used to perform operations on values and variables.",

    keyPoints: [
      "Arithmetic operators perform calculations.",
      "Relational operators compare values.",
      "Logical operators combine conditions."
    ],

    example: {
      title: "Operator Example",
      language: "java",
      code: `int a = 10;
int b = 5;

int sum = a + b;
boolean result = a > b;`
    }
  },

  "java-conditions": {
    title: "Conditional Statements",

    introduction:
      "Conditional statements allow a program to make decisions based on conditions.",

    keyPoints: [
      "if executes code when a condition is true.",
      "else executes when the condition is false.",
      "else-if allows multiple conditions to be checked."
    ],

    example: {
      title: "Conditional Example",
      language: "java",
      code: `int age = 20;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`
    }
  },

  "java-loops": {
    title: "Loops",

    introduction:
      "Loops allow us to execute a block of code repeatedly while a condition is satisfied.",

    keyPoints: [
      "for loop is useful when the number of iterations is known.",
      "while loop checks its condition before execution.",
      "do-while executes the block at least once."
    ],

    example: {
      title: "Loop Example",
      language: "java",
      code: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`
    }
  },

  "java-arrays": {
    title: "Arrays",

    introduction:
      "An array stores multiple values of the same type under one variable name.",

    keyPoints: [
      "Array elements are accessed using indexes.",
      "Array indexing starts from 0.",
      "An array has a fixed length after creation."
    ],

    example: {
      title: "Array Example",
      language: "java",
      code: `int[] numbers = {10, 20, 30, 40};

System.out.println(numbers[0]);`
    }
  },

  "java-strings": {
    title: "Strings",

    introduction:
      "A String represents a sequence of characters and is commonly used to work with text.",

    keyPoints: [
      "String is a class in Java.",
      "Strings provide many useful methods.",
      "String objects are immutable."
    ],

    example: {
      title: "String Example",
      language: "java",
      code: `String name = "Java";

System.out.println(name.length());
System.out.println(name.toUpperCase());`
    }
  },

  "java-methods": {
    title: "Methods",

    introduction:
      "A method is a reusable block of code that performs a specific task.",

    keyPoints: [
      "Methods reduce repeated code.",
      "A method can accept parameters.",
      "A method can return a value."
    ],

    example: {
      title: "Method Example",
      language: "java",
      code: `static int add(int a, int b) {
    return a + b;
}`
    }
  },

  "java-oops": {
    title: "Object-Oriented Programming",

    introduction:
      "Object-oriented programming organizes software around objects and the data and behavior associated with them.",

    keyPoints: [
      "Classes define the structure of objects.",
      "Objects represent instances of classes.",
      "Important OOP concepts include inheritance, polymorphism, abstraction and encapsulation."
    ],

    example: {
      title: "Class and Object",
      language: "java",
      code: `class Student {
    String name;
}

Student student = new Student();`
    }
  }
};