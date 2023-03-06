const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const promptQuestions = [
  {
    type: "input",
    message: "Please enter the Team Manager's name:",
    name: "manName",
  },
  {
    type: "input",
    message: "please enter the Team Manager's Employee ID:",
    name: "manId",
  },
  {
    type: "input",
    message: "please enter the Team Manager's email:",
    name: "manEmail",
  },
  {
    type: "input",
    message: "please enter the Team Manager's office number:",
    name: "officeNo",
  },
];

const menu = [
  {
    type: "list",
    message: "Select an option:",
    name: "option",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "Please enter the Engineer's name:",
    name: "enName",
  },
  {
    type: "input",
    message: "please enter the Engineer's Employee ID:",
    name: "enId",
  },
  {
    type: "input",
    message: "please enter the Engineer's email:",
    name: "enEmail",
  },
  {
    type: "input",
    message: "please enter the Engineer's GitHub username:",
    name: "enGithub",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "Please enter the Intern's name:",
    name: "internName",
  },
  {
    type: "input",
    message: "please enter the Intern's Employee ID:",
    name: "internId",
  },
  {
    type: "input",
    message: "please enter the Intern's email:",
    name: "internEmail",
  },
  {
    type: "input",
    message: "please enter the Intern's school:",
    name: "internSchool",
  },
];

inquirer
  .prompt(promptQuestions)
  .then((response) => {
    console.log(response);

    const managerName = response.manName;
    const managerId = response.manId;
    const managerEmail = response.manEmail;
    const managerOffice = response.officeNo;

    const manager = new Manager(
      managerName,
      managerId,
      managerEmail,
      managerOffice,

      let licenseBadge;
      switch (response.license) {
        case "MIT":
          licenseBadge =
            "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
          break;
        case "Apache":
          licenseBadge =
            "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
          break;
        case "BSD 3-Clause":
          licenseBadge =
            "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
          break;
        case "GNU GPL v3":
          licenseBadge =
            "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
          break;
        default:
          licenseBadge = "";
      }
    );

    //module.exports = newEmployee;
    console.log(manager);
  })
  .catch((err) => console.log(err));
