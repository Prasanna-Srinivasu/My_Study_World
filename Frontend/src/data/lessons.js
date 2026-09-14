export const lessons = {
  "java-programming": {
    title: "What is Programming?",
    introduction:
      "Programming is the process of giving instructions to a computer to solve a problem or perform a task.",

    keyPoints: [
      "A program is a set of instructions.",
      "Programming languages help us communicate with computers.",
      "Programs are created to solve specific problems.",
    ],

    example: {
      title: "Simple Example",
      language: "text",
      code: "Input → Process → Output",
    },
  },

  "java-introduction": {
    title: "Introduction to Java",
    introduction:
      "Java is a popular programming language used to build web applications, backend systems, Android applications and enterprise software.",

    keyPoints: [
      "Java is object-oriented.",
      "Java is platform independent through the JVM.",
      "Java is widely used for backend development.",
    ],

    example: {
      title: "First Java Program",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    },
  },

  "java-jdk-jre-jvm": {
    title: "JDK, JRE & JVM",
    introduction:
      "JDK, JRE and JVM are important parts of the Java platform and each has a different responsibility.",

    keyPoints: [
      "JDK is used to develop Java applications.",
      "JRE provides the environment required to run Java applications.",
      "JVM executes Java bytecode.",
    ],

    example: {
      title: "Java Execution Flow",
      language: "text",
      code: "Java Source Code → Compiler → Bytecode → JVM → Output",
    },
  },

  "java-variables": {
    title: "Variables",
    introduction:
      "A variable is a named memory location used to store a value that a program can work with.",

    keyPoints: [
      "Every variable has a data type.",
      "A variable can store a value.",
      "Variables can be changed during program execution.",
    ],

    example: {
      title: "Variable Example",
      language: "java",
      code: `int age = 24;
String name = "Student";`,
    },
  },

  "java-data-types": {
    title: "Data Types",
    introduction:
      "Data types define what kind of value a variable can store.",

    keyPoints: [
      "Java has primitive data types.",
      "Java also supports reference types.",
      "Choosing the correct type helps represent data properly.",
    ],

    example: {
      title: "Data Type Example",
      language: "java",
      code: `int age = 24;
double salary = 35000.50;
char grade = 'A';
boolean active = true;`,
    },
  },

  "java-operators": {
    title: "Operators",
    introduction:
      "Operators are symbols used to perform operations on values and variables.",

    keyPoints: [
      "Arithmetic operators perform calculations.",
      "Relational operators compare values.",
      "Logical operators combine conditions.",
    ],

    example: {
      title: "Operator Example",
      language: "java",
      code: `int a = 10;
int b = 5;

int sum = a + b;
boolean result = a > b;`,
    },
  },

  "java-conditions": {
    title: "Conditional Statements",
    introduction:
      "Conditional statements allow a program to make decisions based on conditions.",

    keyPoints: [
      "if executes code when a condition is true.",
      "else executes when the condition is false.",
      "else-if allows multiple conditions to be checked.",
    ],

    example: {
      title: "Conditional Example",
      language: "java",
      code: `int age = 20;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`,
    },
  },

  "java-loops": {
    title: "Loops",
    introduction:
      "Loops allow us to execute a block of code repeatedly while a condition is satisfied.",

    keyPoints: [
      "for loop is useful when the number of iterations is known.",
      "while loop checks its condition before execution.",
      "do-while executes the block at least once.",
    ],

    example: {
      title: "Loop Example",
      language: "java",
      code: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,
    },
  },

  "java-arrays": {
    title: "Arrays",
    introduction:
      "An array stores multiple values of the same type under one variable name.",

    keyPoints: [
      "Array elements are accessed using indexes.",
      "Array indexing starts from 0.",
      "An array has a fixed length after creation.",
    ],

    example: {
      title: "Array Example",
      language: "java",
      code: `int[] numbers = {10, 20, 30, 40};

System.out.println(numbers[0]);`,
    },
  },

  "java-strings": {
    title: "Strings",
    introduction:
      "A String represents a sequence of characters and is commonly used to work with text.",

    keyPoints: [
      "String is a class in Java.",
      "Strings provide many useful methods.",
      "String objects are immutable.",
    ],

    example: {
      title: "String Example",
      language: "java",
      code: `String name = "Java";

System.out.println(name.length());
System.out.println(name.toUpperCase());`,
    },
  },

  "java-methods": {
    title: "Methods",
    introduction:
      "A method is a reusable block of code that performs a specific task.",

    keyPoints: [
      "Methods reduce repeated code.",
      "A method can accept parameters.",
      "A method can return a value.",
    ],

    example: {
      title: "Method Example",
      language: "java",
      code: `static int add(int a, int b) {
    return a + b;
}`,
    },
  },

  "java-oops": {
    title: "Object-Oriented Programming",
    introduction:
      "Object-oriented programming organizes software around objects and the data and behavior associated with them.",

    keyPoints: [
      "Classes define the structure of objects.",
      "Objects represent instances of classes.",
      "Important OOP concepts include inheritance, polymorphism, abstraction and encapsulation.",
    ],

    example: {
      title: "Class and Object",
      language: "java",
      code: `class Student {
    String name;
}

Student student = new Student();`,
    },
  },
};