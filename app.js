const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { createInflate } = require("zlib");

const allEmployees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


inquirer.prompt([
  {
    type: "input",
    name: "managerName",
    message: "Let's start with the manager of your team! What is their name?",
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
  const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
  allEmployees.push(manager);
  nextEmployee();
})

function nextEmployee() {
  inquirer.prompt(
    {
      type: "list",
      name: "chooseType",
      message: "Awesome! Which type of employee would you like to add next?",
      choices: ["Engineer", "Intern", "That's all!"]
    }
  ).then(function (data) {
    if (data.chooseType === "Engineer") {
      getEngineerDetails();
    } else if (data.chooseType === "Intern") {
      getInternDetails();
    } else {
      createFile();
    }
  })
}

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
    const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
    allEmployees.push(engineer);
    nextEmployee();
  });
}

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
    const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
    allEmployees.push(intern);
    nextEmployee();
  });
}

function createFile() {
  fs.existsSync("output") || fs.mkdirSync("output");
  fs.writeFile(outputPath, render(allEmployees), function (err) {
    if (err) { console.log(err) } else { console.log("Success! Check out your new file in the \"output\" directory!") };
  });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
