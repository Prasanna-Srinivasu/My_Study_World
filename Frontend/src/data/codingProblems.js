export const codingProblems = {
  // =========================
  // JAVA VARIABLES
  // =========================
"java-variables": [
  {
    id: "var-code-1",
    title: "Swap Two Variables",
    difficulty: "Easy",
    language: "java",
    topic: "Java Variables",

    description:
      "Write a Java program to swap the values of two integer variables.",

    input:
      "Two integers a and b.",

    output:
      "Print the values after swapping.",

    exampleInput:
      "10 20",

    exampleOutput:
      "20 10",

    constraints: [
      "a and b are integers.",
      "Use variables to store the values."
    ],

    testCases: [
      {
        input: "10 20",
        expectedOutput: "20 10"
      },
      {
        input: "5 8",
        expectedOutput: "8 5"
      },
      {
        input: "-3 7",
        expectedOutput: "7 -3"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests basic understanding of variables and value manipulation."
  },

  {
    id: "var-code-2",
    title: "Calculate Simple Interest",
    difficulty: "Easy",
    language: "java",
    topic: "Java Variables",

    description:
      "Write a Java program to calculate simple interest using principal, rate and time.",

    input:
      "Three values: principal, rate and time.",

    output:
      "Print the calculated simple interest.",

    exampleInput:
      "1000 5 2",

    exampleOutput:
      "100",

    constraints: [
      "Principal, rate and time are non-negative values.",
      "Use the formula: SI = (P × R × T) / 100."
    ],

    testCases: [
      {
        input: "1000 5 2",
        expectedOutput: "100"
      },
      {
        input: "5000 10 3",
        expectedOutput: "1500"
      },
      {
        input: "2000 7 1",
        expectedOutput: "140"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests basic variables, arithmetic operators and formula implementation."
  }
],
  // =========================
// JAVA OPERATORS
// =========================

"java-operators": [
  {
    id: "op-code-1",
    title: "Basic Calculator",
    difficulty: "Easy",
    description:
      "Write a Java program that performs addition, subtraction, multiplication and integer division on two integers.",
    language: "java",

    input:
      "Two integers a and b.",

    output:
      "Print addition, subtraction, multiplication and integer division results on separate lines.",

    exampleInput:
      "10 5",

    exampleOutput:
      "15\n5\n50\n2",

    constraints: [
      "a and b are integers.",
      "b will not be zero.",
      "Use arithmetic operators."
    ],

    testCases: [
      {
        input: "10 5",
        expectedOutput: "15\n5\n50\n2"
      },
      {
        input: "20 4",
        expectedOutput: "24\n16\n80\n5"
      },
      {
        input: "7 2",
        expectedOutput: "9\n5\n14\n3"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests understanding of arithmetic operators."
  },

  {
    id: "op-code-2",
    title: "Check Even or Odd",
    difficulty: "Easy",
    description:
      "Write a Java program to check whether a number is even or odd.",
    language: "java",

    input:
      "One integer n.",

    output:
      "Print Even if the number is even, otherwise print Odd.",

    exampleInput:
      "8",

    exampleOutput:
      "Even",

    constraints: [
      "n is an integer.",
      "Use the modulo (%) operator."
    ],

    testCases: [
      {
        input: "8",
        expectedOutput: "Even"
      },
      {
        input: "7",
        expectedOutput: "Odd"
      },
      {
        input: "0",
        expectedOutput: "Even"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests understanding of the modulo operator."
  }
],

 // =========================
// JAVA CONDITIONS
// =========================

"java-conditions": [
  {
    id: "cond-code-1",
    title: "Check Positive or Negative",
    difficulty: "Easy",
    description:
      "Write a Java program to check whether a number is positive, negative or zero.",
    language: "java",

    input:
      "One integer n.",

    output:
      "Print Positive, Negative or Zero.",

    exampleInput:
      "-5",

    exampleOutput:
      "Negative",

    constraints: [
      "n is an integer.",
      "Use if-else conditions."
    ],

    testCases: [
      {
        input: "10",
        expectedOutput: "Positive"
      },
      {
        input: "-5",
        expectedOutput: "Negative"
      },
      {
        input: "0",
        expectedOutput: "Zero"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests basic understanding of if-else conditions."
  },

  {
    id: "cond-code-2",
    title: "Find Largest of Two Numbers",
    difficulty: "Easy",
    description:
      "Write a Java program to find the largest of two numbers.",
    language: "java",

    input:
      "Two integers a and b.",

    output:
      "Print the larger number.",

    exampleInput:
      "10 20",

    exampleOutput:
      "20",

    constraints: [
      "a and b are integers.",
      "Use conditional logic."
    ],

    testCases: [
      {
        input: "10 20",
        expectedOutput: "20"
      },
      {
        input: "50 30",
        expectedOutput: "50"
      },
      {
        input: "7 7",
        expectedOutput: "7"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests comparison and conditional statements."
  },

  {
    id: "cond-code-3",
    title: "Find Largest of Three Numbers",
    difficulty: "Easy",
    description:
      "Write a Java program to find the largest among three numbers.",
    language: "java",

    input:
      "Three integers a, b and c.",

    output:
      "Print the largest number.",

    exampleInput:
      "10 25 15",

    exampleOutput:
      "25",

    constraints: [
      "a, b and c are integers.",
      "Use conditional logic."
    ],

    testCases: [
      {
        input: "10 25 15",
        expectedOutput: "25"
      },
      {
        input: "50 30 20",
        expectedOutput: "50"
      },
      {
        input: "5 8 12",
        expectedOutput: "12"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests multiple conditions and comparisons."
  },

  {
    id: "cond-code-4",
    title: "Check Leap Year",
    difficulty: "Medium",
    description:
      "Write a Java program to check whether a given year is a leap year.",
    language: "java",

    input:
      "One integer representing a year.",

    output:
      "Print Leap Year if the year is a leap year, otherwise print Not a Leap Year.",

    exampleInput:
      "2024",

    exampleOutput:
      "Leap Year",

    constraints: [
      "The year is a positive integer.",
      "A year divisible by 400 is a leap year.",
      "A year divisible by 4 but not by 100 is a leap year."
    ],

    testCases: [
      {
        input: "2024",
        expectedOutput: "Leap Year"
      },
      {
        input: "1900",
        expectedOutput: "Not a Leap Year"
      },
      {
        input: "2000",
        expectedOutput: "Leap Year"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests compound conditions and logical operators."
  }
],

  // =========================
// JAVA LOOPS
// =========================

"java-loops": [
  {
    id: "loop-code-1",
    title: "Print Numbers 1 to N",
    difficulty: "Easy",
    description:
      "Write a Java program to print numbers from 1 to N using a loop.",
    language: "java",

    input:
      "One integer N.",

    output:
      "Print numbers from 1 to N, separated by spaces.",

    exampleInput:
      "5",

    exampleOutput:
      "1 2 3 4 5",

    constraints: [
      "N is a positive integer.",
      "Use a loop."
    ],

    testCases: [
      {
        input: "5",
        expectedOutput: "1 2 3 4 5"
      },
      {
        input: "3",
        expectedOutput: "1 2 3"
      },
      {
        input: "1",
        expectedOutput: "1"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests basic loop control and iteration."
  },

  {
    id: "loop-code-2",
    title: "Print Even Numbers",
    difficulty: "Easy",
    description:
      "Print all even numbers between 1 and N.",
    language: "java",

    input:
      "One integer N.",

    output:
      "Print all even numbers from 1 to N, separated by spaces.",

    exampleInput:
      "10",

    exampleOutput:
      "2 4 6 8 10",

    constraints: [
      "N is a positive integer.",
      "Use a loop and a condition."
    ],

    testCases: [
      {
        input: "10",
        expectedOutput: "2 4 6 8 10"
      },
      {
        input: "7",
        expectedOutput: "2 4 6"
      },
      {
        input: "2",
        expectedOutput: "2"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests loops, conditions and the modulo operator."
  },

  {
    id: "loop-code-3",
    title: "Sum of Numbers",
    difficulty: "Easy",
    description:
      "Find the sum of numbers from 1 to N.",
    language: "java",

    input:
      "One integer N.",

    output:
      "Print the sum of numbers from 1 to N.",

    exampleInput:
      "5",

    exampleOutput:
      "15",

    constraints: [
      "N is a positive integer.",
      "Use a loop to calculate the sum."
    ],

    testCases: [
      {
        input: "5",
        expectedOutput: "15"
      },
      {
        input: "10",
        expectedOutput: "55"
      },
      {
        input: "1",
        expectedOutput: "1"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests accumulator variables and loops."
  },

  {
    id: "loop-code-4",
    title: "Multiplication Table",
    difficulty: "Easy",
    description:
      "Print the multiplication table of a given number from 1 to 10.",
    language: "java",

    input:
      "One integer N.",

    output:
      "Print N multiplied by numbers 1 through 10, one result per line.",

    exampleInput:
      "5",

    exampleOutput:
      "5\n10\n15\n20\n25\n30\n35\n40\n45\n50",

    constraints: [
      "N is an integer.",
      "Use a loop."
    ],

    testCases: [
      {
        input: "5",
        expectedOutput:
          "5\n10\n15\n20\n25\n30\n35\n40\n45\n50"
      },
      {
        input: "2",
        expectedOutput:
          "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
      },
      {
        input: "10",
        expectedOutput:
          "10\n20\n30\n40\n50\n60\n70\n80\n90\n100"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests loop repetition and arithmetic operations."
  },

  {
    id: "loop-code-5",
    title: "Factorial",
    difficulty: "Easy",
    description:
      "Find the factorial of a given number using a loop.",
    language: "java",

    input:
      "One non-negative integer N.",

    output:
      "Print N factorial.",

    exampleInput:
      "5",

    exampleOutput:
      "120",

    constraints: [
      "N is between 0 and 12.",
      "Use a loop."
    ],

    testCases: [
      {
        input: "5",
        expectedOutput: "120"
      },
      {
        input: "4",
        expectedOutput: "24"
      },
      {
        input: "0",
        expectedOutput: "1"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests loops and multiplication-based accumulation."
  },

  {
    id: "loop-code-6",
    title: "Reverse a Number",
    difficulty: "Medium",
    description:
      "Write a Java program to reverse the digits of a number.",
    language: "java",

    input:
      "One positive integer N.",

    output:
      "Print the reversed number.",

    exampleInput:
      "12345",

    exampleOutput:
      "54321",

    constraints: [
      "N is a positive integer.",
      "Use a loop."
    ],

    testCases: [
      {
        input: "12345",
        expectedOutput: "54321"
      },
      {
        input: "120",
        expectedOutput: "21"
      },
      {
        input: "987",
        expectedOutput: "789"
      }
    ],

    complexity: {
      time: "O(D)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests digit extraction using division and modulo."
  },

  {
    id: "loop-code-7",
    title: "Palindrome Number",
    difficulty: "Medium",
    description:
      "Check whether a number is a palindrome.",
    language: "java",

    input:
      "One positive integer N.",

    output:
      "Print Palindrome if the number reads the same forward and backward, otherwise print Not Palindrome.",

    exampleInput:
      "121",

    exampleOutput:
      "Palindrome",

    constraints: [
      "N is a positive integer.",
      "Use a loop to reverse the number."
    ],

    testCases: [
      {
        input: "121",
        expectedOutput: "Palindrome"
      },
      {
        input: "123",
        expectedOutput: "Not Palindrome"
      },
      {
        input: "1221",
        expectedOutput: "Palindrome"
      }
    ],

    complexity: {
      time: "O(D)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests loops, digit manipulation and comparison."
  },

  {
    id: "loop-code-8",
    title: "Count Digits",
    difficulty: "Easy",
    description:
      "Count the number of digits in a given number.",
    language: "java",

    input:
      "One positive integer N.",

    output:
      "Print the number of digits.",

    exampleInput:
      "12345",

    exampleOutput:
      "5",

    constraints: [
      "N is a positive integer.",
      "Use a loop."
    ],

    testCases: [
      {
        input: "12345",
        expectedOutput: "5"
      },
      {
        input: "7",
        expectedOutput: "1"
      },
      {
        input: "1000",
        expectedOutput: "4"
      }
    ],

    complexity: {
      time: "O(D)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests repeated division and loop termination."
  },

  {
    id: "loop-code-9",
    title: "Sum of Digits",
    difficulty: "Easy",
    description:
      "Find the sum of all digits in a number.",
    language: "java",

    input:
      "One positive integer N.",

    output:
      "Print the sum of its digits.",

    exampleInput:
      "1234",

    exampleOutput:
      "10",

    constraints: [
      "N is a positive integer.",
      "Use a loop."
    ],

    testCases: [
      {
        input: "1234",
        expectedOutput: "10"
      },
      {
        input: "555",
        expectedOutput: "15"
      },
      {
        input: "100",
        expectedOutput: "1"
      }
    ],

    complexity: {
      time: "O(D)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests digit extraction and accumulator variables."
  },

  {
    id: "loop-code-10",
    title: "Prime Number",
    difficulty: "Medium",
    description:
      "Check whether a given number is prime.",
    language: "java",

    input:
      "One integer N.",

    output:
      "Print Prime if N is prime, otherwise print Not Prime.",

    exampleInput:
      "7",

    exampleOutput:
      "Prime",

    constraints: [
      "N is a positive integer.",
      "A prime number has exactly two positive divisors."
    ],

    testCases: [
      {
        input: "7",
        expectedOutput: "Prime"
      },
      {
        input: "10",
        expectedOutput: "Not Prime"
      },
      {
        input: "2",
        expectedOutput: "Prime"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests loops, conditions and divisibility."
  }
],
// =========================
// JAVA ARRAYS
// =========================

"java-arrays": [
  {
    id: "array-code-1",
    title: "Print Array Elements",
    difficulty: "Easy",
    description:
      "Write a Java program to print all elements of an integer array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print all array elements separated by spaces.",

    exampleInput:
      "5\n10 20 30 40 50",

    exampleOutput:
      "10 20 30 40 50",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n10 20 30 40 50",
        expectedOutput: "10 20 30 40 50"
      },
      {
        input: "3\n1 2 3",
        expectedOutput: "1 2 3"
      },
      {
        input: "4\n7 5 9 2",
        expectedOutput: "7 5 9 2"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests basic array declaration, input and traversal."
  },

  {
    id: "array-code-2",
    title: "Find Array Sum",
    difficulty: "Easy",
    description:
      "Calculate the sum of all elements in an array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print the sum of all array elements.",

    exampleInput:
      "5\n1 2 3 4 5",

    exampleOutput:
      "15",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "15"
      },
      {
        input: "3\n10 20 30",
        expectedOutput: "60"
      },
      {
        input: "4\n5 5 5 5",
        expectedOutput: "20"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests array traversal and accumulator variables."
  },

  {
    id: "array-code-3",
    title: "Find Maximum Element",
    difficulty: "Easy",
    description:
      "Find the largest element in an integer array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print the largest element.",

    exampleInput:
      "5\n10 25 7 40 15",

    exampleOutput:
      "40",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n10 25 7 40 15",
        expectedOutput: "40"
      },
      {
        input: "3\n5 2 9",
        expectedOutput: "9"
      },
      {
        input: "4\n-10 -5 -20 -3",
        expectedOutput: "-3"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests array traversal and comparison."
  },

  {
    id: "array-code-4",
    title: "Find Minimum Element",
    difficulty: "Easy",
    description:
      "Find the smallest element in an integer array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print the smallest element.",

    exampleInput:
      "5\n10 25 7 40 15",

    exampleOutput:
      "7",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n10 25 7 40 15",
        expectedOutput: "7"
      },
      {
        input: "3\n5 2 9",
        expectedOutput: "2"
      },
      {
        input: "4\n-10 -5 -20 -3",
        expectedOutput: "-20"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests array traversal and minimum-value tracking."
  },

  {
    id: "array-code-5",
    title: "Reverse an Array",
    difficulty: "Medium",
    description:
      "Reverse the elements of an integer array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print the array elements in reverse order.",

    exampleInput:
      "5\n1 2 3 4 5",

    exampleOutput:
      "5 4 3 2 1",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "5 4 3 2 1"
      },
      {
        input: "3\n10 20 30",
        expectedOutput: "30 20 10"
      },
      {
        input: "1\n99",
        expectedOutput: "99"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests array indexing and reverse traversal."
  },

  {
    id: "array-code-6",
    title: "Search an Element",
    difficulty: "Easy",
    description:
      "Search for a given element inside an integer array.",
    language: "java",

    input:
      "First enter N, followed by N integers, then the value to search.",

    output:
      "Print Found if the value exists, otherwise print Not Found.",

    exampleInput:
      "5\n10 20 30 40 50\n30",

    exampleOutput:
      "Found",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n10 20 30 40 50\n30",
        expectedOutput: "Found"
      },
      {
        input: "4\n1 2 3 4\n9",
        expectedOutput: "Not Found"
      },
      {
        input: "3\n5 8 12\n5",
        expectedOutput: "Found"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests linear search and array traversal."
  },

  {
    id: "array-code-7",
    title: "Count Even and Odd",
    difficulty: "Easy",
    description:
      "Count the number of even and odd elements in an array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print the count of even numbers and odd numbers on separate lines.",

    exampleInput:
      "5\n1 2 3 4 5",

    exampleOutput:
      "Even: 2\nOdd: 3",

    constraints: [
      "N is a positive integer.",
      "The array contains N integers."
    ],

    testCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "Even: 2\nOdd: 3"
      },
      {
        input: "4\n2 4 6 8",
        expectedOutput: "Even: 4\nOdd: 0"
      },
      {
        input: "3\n1 3 5",
        expectedOutput: "Even: 0\nOdd: 3"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests array traversal, conditions and modulo."
  },

  {
    id: "array-code-8",
    title: "Find Duplicate Elements",
    difficulty: "Medium",
    description:
      "Find duplicate values present in an integer array.",
    language: "java",

    input:
      "First enter the size N, followed by N integers.",

    output:
      "Print duplicate values separated by spaces. Print None if there are no duplicates.",

    exampleInput:
      "6\n1 2 3 2 4 1",

    exampleOutput:
      "1 2",

    constraints: [
      "N is a positive integer.",
      "The array contains integers.",
      "Print each duplicate value only once."
    ],

    testCases: [
      {
        input: "6\n1 2 3 2 4 1",
        expectedOutput: "1 2"
      },
      {
        input: "5\n5 5 5 2 3",
        expectedOutput: "5"
      },
      {
        input: "4\n1 2 3 4",
        expectedOutput: "None"
      }
    ],

    complexity: {
      time: "O(N²)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests nested loops, comparison and duplicate detection."
  }
],

 // =========================
// JAVA STRINGS
// =========================

"java-strings": [
  {
    id: "string-code-1",
    title: "Reverse a String",
    difficulty: "Easy",
    description:
      "Write a Java program to reverse a given String.",
    language: "java",

    input:
      "One String.",

    output:
      "Print the String in reverse order.",

    exampleInput:
      "hello",

    exampleOutput:
      "olleh",

    constraints: [
      "The String contains letters.",
      "Use String operations or a loop."
    ],

    testCases: [
      {
        input: "hello",
        expectedOutput: "olleh"
      },
      {
        input: "Java",
        expectedOutput: "avaJ"
      },
      {
        input: "world",
        expectedOutput: "dlrow"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests String traversal and manipulation."
  },

  {
    id: "string-code-2",
    title: "Check String Palindrome",
    difficulty: "Easy",
    description:
      "Check whether a String reads the same forward and backward.",
    language: "java",

    input:
      "One String.",

    output:
      "Print Palindrome if the String is a palindrome, otherwise print Not Palindrome.",

    exampleInput:
      "madam",

    exampleOutput:
      "Palindrome",

    constraints: [
      "The String contains letters.",
      "Comparison is case-sensitive."
    ],

    testCases: [
      {
        input: "madam",
        expectedOutput: "Palindrome"
      },
      {
        input: "hello",
        expectedOutput: "Not Palindrome"
      },
      {
        input: "level",
        expectedOutput: "Palindrome"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests String comparison and reverse logic."
  },

  {
    id: "string-code-3",
    title: "Count Characters",
    difficulty: "Easy",
    description:
      "Count the number of characters in a String.",
    language: "java",

    input:
      "One String without spaces.",

    output:
      "Print the number of characters.",

    exampleInput:
      "hello",

    exampleOutput:
      "5",

    constraints: [
      "The String contains letters.",
      "Do not count spaces if they are present."
    ],

    testCases: [
      {
        input: "hello",
        expectedOutput: "5"
      },
      {
        input: "Java",
        expectedOutput: "4"
      },
      {
        input: "programming",
        expectedOutput: "11"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests String length and character handling."
  },

  {
    id: "string-code-4",
    title: "Count Vowels",
    difficulty: "Easy",
    description:
      "Count the number of vowels in a String.",
    language: "java",

    input:
      "One String.",

    output:
      "Print the number of vowels in the String.",

    exampleInput:
      "hello",

    exampleOutput:
      "2",

    constraints: [
      "Consider a, e, i, o and u as vowels.",
      "Comparison is case-insensitive."
    ],

    testCases: [
      {
        input: "hello",
        expectedOutput: "2"
      },
      {
        input: "education",
        expectedOutput: "5"
      },
      {
        input: "JAVA",
        expectedOutput: "2"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests character traversal and conditional checking."
  },

  {
    id: "string-code-5",
    title: "Remove Spaces",
    difficulty: "Easy",
    description:
      "Remove all spaces from a given String.",
    language: "java",

    input:
      "One String containing words and spaces.",

    output:
      "Print the String after removing all spaces.",

    exampleInput:
      "hello world",

    exampleOutput:
      "helloworld",

    constraints: [
      "Remove every space character.",
      "Keep all other characters unchanged."
    ],

    testCases: [
      {
        input: "hello world",
        expectedOutput: "helloworld"
      },
      {
        input: "Java programming",
        expectedOutput: "Javaprogramming"
      },
      {
        input: "a b c",
        expectedOutput: "abc"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests String replacement and character processing."
  },

  {
    id: "string-code-6",
    title: "Count Words",
    difficulty: "Medium",
    description:
      "Count the number of words in a sentence.",
    language: "java",

    input:
      "One sentence containing words separated by spaces.",

    output:
      "Print the number of words.",

    exampleInput:
      "Java is easy",

    exampleOutput:
      "3",

    constraints: [
      "Words are separated by spaces.",
      "Ignore leading and trailing spaces."
    ],

    testCases: [
      {
        input: "Java is easy",
        expectedOutput: "3"
      },
      {
        input: "I love programming",
        expectedOutput: "3"
      },
      {
        input: "Hello World",
        expectedOutput: "2"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(N)"
    },

    interviewRelevance:
      "Tests String splitting, trimming and word processing."
  }
],
// =========================
// JAVA METHODS
// =========================

"java-methods": [
  {
    id: "method-code-1",
    title: "Create an Addition Method",
    difficulty: "Easy",
    language: "java",

    description:
      "Create a Java method that accepts two integers and returns their sum.",

    input:
      "Two integers a and b.",

    output:
      "Print the value returned by the addition method.",

    exampleInput:
      "10 20",

    exampleOutput:
      "30",

    constraints: [
      "a and b are integers.",
      "Create a method that accepts two parameters.",
      "The method must return the sum."
    ],

    testCases: [
      {
        input: "10 20",
        expectedOutput: "30"
      },
      {
        input: "5 8",
        expectedOutput: "13"
      },
      {
        input: "-3 7",
        expectedOutput: "4"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests understanding of method parameters, return values and method calls."
  },

  {
    id: "method-code-2",
    title: "Check Prime Using Method",
    difficulty: "Medium",
    language: "java",

    description:
      "Create a Java method that checks whether a given number is prime.",

    input:
      "One integer n.",

    output:
      "Print Prime if the number is prime, otherwise print Not Prime.",

    exampleInput:
      "7",

    exampleOutput:
      "Prime",

    constraints: [
      "n is a positive integer.",
      "Create a method that returns whether the number is prime.",
      "A prime number has exactly two positive divisors."
    ],

    testCases: [
      {
        input: "7",
        expectedOutput: "Prime"
      },
      {
        input: "10",
        expectedOutput: "Not Prime"
      },
      {
        input: "2",
        expectedOutput: "Prime"
      }
    ],

    complexity: {
      time: "O(N)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests methods, conditions, loops and divisibility logic."
  },

  {
    id: "method-code-3",
    title: "Find Maximum Using Method",
    difficulty: "Easy",
    language: "java",

    description:
      "Create a Java method that accepts three integers and returns the largest value.",

    input:
      "Three integers a, b and c.",

    output:
      "Print the value returned by the maximum method.",

    exampleInput:
      "10 25 15",

    exampleOutput:
      "25",

    constraints: [
      "a, b and c are integers.",
      "Create a method that accepts three parameters.",
      "The method must return the largest value."
    ],

    testCases: [
      {
        input: "10 25 15",
        expectedOutput: "25"
      },
      {
        input: "50 30 20",
        expectedOutput: "50"
      },
      {
        input: "5 8 12",
        expectedOutput: "12"
      }
    ],

    complexity: {
      time: "O(1)",
      space: "O(1)"
    },

    interviewRelevance:
      "Tests method parameters, return values and conditional comparison."
  }
],
};