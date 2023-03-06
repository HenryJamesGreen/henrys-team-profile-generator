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
    name: "name",
  },
  {
    type: "input",
    message: "please enter the Team Manager's Employee ID:",
    name: "id",
  },
  {
    type: "input",
    message: "please enter the Team Manager's email:",
    name: "email",
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
    name: "name",
  },
  {
    type: "input",
    message: "please enter the Engineer's Employee ID:",
    name: "id",
  },
  {
    type: "input",
    message: "please enter the Engineer's email:",
    name: "email",
  },
  {
    type: "input",
    message: "please enter the Engineer's GitHub username:",
    name: "github",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "Please enter the Intern's name:",
    name: "name",
  },
  {
    type: "input",
    message: "please enter the Intern's Employee ID:",
    name: "id",
  },
  {
    type: "input",
    message: "please enter the Intern's email:",
    name: "email",
  },
  {
    type: "input",
    message: "please enter the Intern's school:",
    name: "github",
  },
];

inquirer
  .prompt(promptQuestions)
  .then((response) => {
    console.log(response);

    const managerName = response.name;
    const managerId = response.id;
    const managerEmail = response.email;
    const managerOffice = response.officeNo;

    const manager = new Manager(
      managerName,
      managerId,
      managerEmail,
      managerOffice
    );

    //module.exports = newEmployee;
    console.log(manager);
  })
  .catch((err) => console.log(err));
