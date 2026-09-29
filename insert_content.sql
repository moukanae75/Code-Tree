USE codetree_content;

INSERT IGNORE INTO Courses (Id, Title, Description, Language, CreatedAt) VALUES 
(1, 'C Language Pathway', 'Master memory management and basics with C', 'C', NOW()),
(2, 'Python Pathway', 'Speed and patterns with Python', 'Python', NOW());

INSERT IGNORE INTO Lessons (Id, Title, Content, `Order`, CourseId) VALUES 
(1, 'Exercise 1: Hello CodeTree', 'Write a program that prints "Welcome to CodeTree!" followed by a new line. \nInput: none\nOutput: Welcome to CodeTree!', 1, 1),
(2, 'Exercise 2: Sum & Average', 'Write a program that receives 3 integers and prints their sum and average. \nInput: 10 20 30\nOutput: Sum: 60 | Avg: 20.00', 2, 1),
(3, 'Exercise 3: Prime Checker', 'Write a function that receives an integer and determines if it is prime. \nInput: 17\nOutput: 1', 3, 1),
(4, 'Exercise 4: String Reverse', 'Write a program that reverses a string using pointers only. \nInput: CodeTree\nOutput: eerTedoC', 4, 1),
(5, 'Exercise 5: Memory Leak Prevention', 'Allocate a dynamic array, read, and print it, but you must free the memory completely. \nInput: size 3 | elements 1 2 3\nOutput: Array: 1 2 3 | Memory freed.', 5, 1);

INSERT IGNORE INTO Lessons (Id, Title, Content, `Order`, CourseId) VALUES 
(6, 'Exercise 1: Word Counter', 'Write a program that counts the number of words and characters without spaces in a sentence. \nInput: Python is awesome\nOutput: Words: 3 | Chars: 15', 1, 2),
(7, 'Exercise 2: Unique Elements', 'Receive a list of numbers and return a list containing unique elements in original order. \nInput: [1, 2, 2, 3, 4, 4, 5]\nOutput: [1, 2, 3, 4, 5]', 2, 2),
(8, 'Exercise 3: Log Parser', 'Parse a log string and extract the count of each error type. \nInput: INFO: ok ERROR: failed INFO: init ERROR: crash\nOutput: {"INFO": 2, "ERROR": 2}', 3, 2),
(9, 'Exercise 4: Bank Simulator', 'Design BankAccount class with deposit and withdraw methods. \nInput: deposit(100) -> withdraw(30) -> withdraw(100)\nOutput: Balance: 70 | Error: Insufficient funds', 4, 2),
(10, 'Exercise 5: Mini Linter', 'Write a script that receives Python code and checks if all variables use snake_case. \nInput: my_var = 10 \n myVar = 20\nOutput: Line 2: myVar is not snake_case', 5, 2);
