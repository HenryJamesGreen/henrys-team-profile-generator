const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// Questions for manager.

const promptQuestions = [
  {
    type: "input",
    message: "Please enter the Team Manager's name:",
    name: "manName",
    validate: function (manInput) {
      const name = manInput.trim();

      if (/^[A-Za-z\s]+$/.test(name)) {
        return true;
      } else {
        return "Please enter a valid name (letters and spaces only)";
      }
    },
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
    validate: function (manEmInput) {
      const emailInputVal = /\S+@\S+\.\S+/;
      if (emailInputVal.test(manEmInput)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
  {
    type: "input",
    message: "please enter the Team Manager's office number:",
    name: "officeNo",
    validate: function (officeNoInput) {
      if (!isNaN(officeNoInput)) {
        return true;
      } else {
        return "Please enter a valid office number.";
      }
    },
  },
];

//menu select.

const menu = [
  {
    type: "list",
    message: "Select an option:",
    name: "option",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },
];

//Engineer questions

const engineerQuestions = [
  {
    type: "input",
    message: "Please enter the Engineer's name:",
    name: "enName",
    validate: function (EnInput) {
      const name = EnInput.trim();

      if (/^[A-Za-z\s]+$/.test(name)) {
        return true;
      } else {
        return "Please enter a valid name (letters and spaces only)";
      }
    },
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
    validate: function (enEmInput) {
      const enEmailInputVal = /\S+@\S+\.\S+/;
      if (enEmailInputVal.test(enEmInput)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
  {
    type: "input",
    message: "please enter the Engineer's GitHub username:",
    name: "enGithub",
    validate: function (gitInput) {
      if (gitInput.trim() === "") {
        return "Please enter a GitHub username.";
      }
      return true;
    },
  },
];

//Intern questions.

const internQuestions = [
  {
    type: "input",
    message: "Please enter the Intern's name:",
    name: "internName",
    validate: function (InInput) {
      const name = InInput.trim();

      if (/^[A-Za-z\s]+$/.test(name)) {
        return true;
      } else {
        return "Please enter a valid name (letters and spaces only)";
      }
    },
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
    validate: function (inEmInput) {
      const inEmailInputVal = /\S+@\S+\.\S+/;
      if (inEmailInputVal.test(inEmInput)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
  {
    type: "input",
    message: "please enter the Intern's school:",
    name: "internSchool",
  },
];

//call inquirer to identify and store user-inputted responses and push the responses to 'teamMembers' array.

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

    console.log(manager);
    teamMembers.push(manager);

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
                teamMembers.push(engineer);
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
                teamMembers.push(intern);

                menuFunc();
              });
              break;

            case "Finish building the team":
              console.log("You have finished building your team!");
              const html = render(teamMembers);
              fs.writeFile(outputPath, html, (err) => {
                if (err) throw err;
                console.log(
                  `Team profile has now been created. Please see ${outputPath}`
                );
              });

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
