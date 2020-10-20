const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployees = [];

// Inquirer gathers information about the development team members...
// First, the manager:
inquirer.prompt([
  {
    type: "input",
    name: "managerName",
    message: "Let's start with the manager of your team! What is their name?"
  },
  {
    type: "input",
    name: "managerId",
    message: "What is the manager's employee ID number?"
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is the manager's email?"
  },
  {
    type: "input",
    name: "managerOffice",
    message: "What is the manager's office number?"
  }
]).then(function (data) {
  // Create an object for the new manager, and push it to the array of allEmployees
  const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
  allEmployees.push(manager);
  nextEmployee();
})

// Inquirer here figures out whether we're adding another employee (and which type), or we're done
function nextEmployee() {
  inquirer.prompt(
    {
      type: "list",
      name: "chooseType",
      message: "Awesome! Which type of employee would you like to add next?",
      choices: ["Engineer", "Intern", "That's all!"]
    }
  ).then(function (data) {
    // Then we call the appropriate function
    if (data.chooseType === "Engineer") {
      getEngineerDetails();
    } else if (data.chooseType === "Intern") {
      getInternDetails();
    } else {
      createFile();
    }
  })
}

// Inquirer gathers information about the engineers...
function getEngineerDetails() {
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: `What is the name of the engineer?`
    },
    {
      type: "input",
      name: "engineerId",
      message: `What is the engineer's ID number?`
    },
    {
      type: "input",
      name: "engineerEmail",
      message: `What is the engineer's email?`
    },
    {
      type: "input",
      name: "engineerGithub",
      message: `What is the engineer's Github username?`
    },
  ]).then(function (data) {
    // Create an object for the new engineer, and push it to the array of allEmployees
    const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
    allEmployees.push(engineer);
    nextEmployee();
  });
}

// Inquirer gathers information about the interns...
function getInternDetails() {
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: `What is the name of the intern?`
    },
    {
      type: "input",
      name: "internId",
      message: `What is the intern's ID number?`
    },
    {
      type: "input",
      name: "internEmail",
      message: `What is the intern's email?`
    },
    {
      type: "input",
      name: "internSchool",
      message: `What is the intern's school?`
    },
  ]).then(function (data) {
    // Create an object for the new intern, and push it to the array of allEmployees
    const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
    allEmployees.push(intern);
    nextEmployee();
  });
}

// Create an "output" directory if it doesn't exist, then write the HTML file to be saved in output.
function createFile() {
  fs.existsSync("output") || fs.mkdirSync("output");
  fs.writeFile(outputPath, render(allEmployees), function (err) {
    if (err) { console.log(err) } else { console.log("Success! Check out your new file in the \"output\" directory!") };
  });
}
