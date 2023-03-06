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
      managerOffice
    );

    //module.exports = newEmployee;
    console.log(manager);

    const menuFunc = function () {
      inquirer
        .prompt(menu)
        .then((response) => {
          let menuOptions = response.option;
          switch (menuOptions) {
            case "Add an engineer":
              inquirer.prompt(engineerQuestions).then((response) => {
                console.log(response);

                const engineerName = response.enName;
                const engineerId = response.enId;
                const engineerEmail = response.enEmail;
                const engineerGitHub = response.enGithub;

                const engineer = new Engineer(
                  engineerName,
                  engineerId,
                  engineerEmail,
                  engineerGitHub
                );

                menuFunc();
              });
              break;

            case "Add an intern":
              inquirer.prompt(internQuestions).then((response) => {
                console.log(response);

                const internName = response.internName;
                const internId = response.internId;
                const internEmail = response.internEmail;
                const internSchool = response.internSchool;

                const intern = new Intern(
                  internName,
                  internId,
                  internEmail,
                  internSchool
                );

                menuFunc();
              });
              break;

            case "Finish building the team":
              console.log("You have finished building your team!");

              break;

            default:
              console.log("try again");
              break;
          }
        })
        .catch((err) => console.log(err));
    };
    menuFunc();
  })
  .catch((err) => console.log(err));
