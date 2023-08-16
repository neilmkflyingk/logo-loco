const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Square, Circle } = require("./lib/shapes");

// Writes the SVG file with prompt response
function writeToFile(fileName, answers) {
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;

  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// Uses inquirer .prompt to prompt the user to answer questions in the command line and saves the user input
function promptUser() {
  inquirer
    .prompt([
      // Text
      {
        type: "input",
        message:
          "What text would you like in your logo? (Enter up to 3 characters)",
        name: "text",
      },
      // Text color
      {
        type: "input",
        message:
          "Choose the color of your text. (Use color keyword OR a hexadecimal code)",
        name: "textColor",
      },
      // Shape
      {
        type: "list",
        message: "What shape would you like your logo to be? (Use the arrow and return keys to select shape)",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      // Shape color
      {
        type: "input",
        message:
          "Choose the color of the shape.",
        name: "shapeBackgroundColor",
      },
    ])

    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Must enter 3 characters maximum.");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}

promptUser();