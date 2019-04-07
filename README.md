# aklscout

# JavaScript Style Guide

Keep JavaScript in external files
Acknowledge all third party scripts using comments
Minify all Javascript for production
Add seperate class with “js” prefix to html classes / IDs when targeting DOM elements
Always use a linting tool to clean up the javascript : https://jshint.com/
Put all declarations at the top and initialise all variables
Use === over == where possible
Comment every function, statement, method on the line above
Use camelCase
Start variable names with a letter
Don’t name variables and functions too specific
Always put spaces around operators ( = + - * / ), and after commas
Always use 2 spaces for indentation
Single quotes for JavaScript, double quotes for CSS
Don’t use var anymore, use const by default and let if the variable needs to change
ES6 Arrow functions are preferred
Write short, modular functions
Use a $(document).ready to wrap around all the script or equivalent without jQuery. jQuery detects this state of readiness for you. Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
Use vanilla Javascript over jQuery (unless it makes sense, like Ajax requests)

Simple statements:
Always end a simple statement with a semicolon

General rules for complex (compound) statements:
Put the opening bracket at the end of the first line.
Use one space before the opening bracket.
Put the closing bracket on a new line, without leading spaces.
Do not end a complex statement with a semicolon.

General rules for object definitions:
Place the opening bracket on the same line as the object name.
Use colon plus one space between each property and its value.
Use quotes around string values, not around numeric values.
Do not add a comma after the last property-value pair.
Place the closing bracket on a new line, without leading spaces.
Always end an object definition with a semicolon.

Resources:
https://www.w3schools.com/js/js_best_practices.asp
https://www.w3schools.com/JS/js_conventions.asp
https://medium.freecodecamp.org/google-publishes-a-javascript-style-guide-here-are-some-key-lessons-1810b8ad050b
https://jstherightway.org/#js-code-style
https://code.tutsplus.com/tutorials/24-javascript-best-practices-for-beginners--net-5399
https://google.github.io/styleguide/jsguide.html






