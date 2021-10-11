const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let teammembers = [];

const questions = [
    {
        type: 'input',
        message: 'What is the team manager’s name?',
        name: 'membername',
    },
    {
        type: 'input',
        message: 'What is the team manager’s id?',
        name: 'memberid',
    },
    {
        type: 'input',
        message: 'What is the team manager’s email?',
        name: 'memberemail',
    },
    {
        type: 'input',
        message: 'What is the team manager’s office number?',
        name: 'memberdet',
    },
    {
        type: 'list',
        name: 'membertype',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'I am done'],
        default: 'Engineer'
    }
];

function writeHtmlFile(filename) {
    fs.writeFile(`./output/${filename}`, generateHTML(), (err) =>
        err ? console.error(err) : console.log('HTML file created!')
    );
}

function writeStyleToFile(filename) {
    fs.writeFile(`./output/css/${filename}`, generateCSS(), (err) =>
        err ? console.error(err) : console.log('CSS file created!')
    );
}

function produceDocs() {
    if (!fs.existsSync('./output')) {
        fs.mkdirSync('./output');
    }
    if (!fs.existsSync('./output/css')) {
        fs.mkdirSync('./output/css');
    }
    writeStyleToFile("style.css");
    writeHtmlFile("index.html");
}

function addTeamMember(type, answer) {
    if (type==="Team manager"){
        let newMember = new Manager(answer.membername, answer.memberid, answer.memberemail, answer.memberdet);
        teammembers.push(newMember);
    } else if (type==="Engineer"){
        let newMember = new Engineer(answer.membername, answer.memberid, answer.memberemail, answer.memberdet);
        teammembers.push(newMember);
    } else {
        let newMember = new Intern(answer.membername, answer.memberid, answer.memberemail, answer.memberdet);
        teammembers.push(newMember);
    }
    if (answer.membertype === "I am done") {
        produceDocs();
    }
}

function getHtmlBlock(member) {
    let detail;
    let icontxt = "<i class='fas fa-users'></i>";
    if (member.getRole() === "Engineer") {
        detail = "GitHub: "+member.getGithub();
        icontxt = "<i class='fas fa-user-clock'></i>";
    } else if (member.getRole() === "Intern") {
        detail = "School: "+member.getSchool();
        icontxt = "<i class='fas fa-user-edit'></i>";
    } else {
        detail = "Office: "+member.getOfficeNumber();
    }
    
    let htmlBlock = `<div class="col-12 col-md-3 col-xl-3 box_item">
    <div class='box_header'>
    <p class="body_text">${member.getName()}</p>
    <p class="body_text">${icontxt} ${member.getRole()}</p>
    </div>
    <p class="body_text">Id: ${member.getId()}</p>
    <p class="body_text">Email: ${member.getEmail()}</p>
    <p class="body_text">${detail}</p>
    </div>`;
    return htmlBlock;
};

function generateHTML() {
    let retStr = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="Description" content="Enter your description here" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed&display=swap" rel="stylesheet">
      <script src="https://kit.fontawesome.com/525618399c.js" crossorigin="anonymous"></script>      <link rel="stylesheet" type="text/css" href="./css/style.css" />
      <link rel="stylesheet" type="text/css" href="./css/style.css" />
      <title>My Team</title>
    </head>
    
    <body>
    <h1>My Team</h1>
 
    <section class="container my-5">
    <div class="row justify-content-around">
   `;

    for (const teammember of teammembers) {
        retStr = retStr + getHtmlBlock(teammember);
    }

    retStr = retStr + `
    </div>
  </body>

    </html>    
  `;
    return retStr;
}

function generateCSS() {
    return `h1 {
    background-color: red;
    color: white;
    text-align: center;
    padding:10px;
    font-family: 'Barlow Semi Condensed', sans-serif;
}
body {
    background-color: white;
    color: black;
    font-family: 'Barlow Semi Condensed', sans-serif;
}
    
.body_text {
    font-size: 24px;
}

.box_header{
    background-color: blue;
    padding-left: 5px;
    color: white;
}

.box_item {  
    border: solid 2px blue; 
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
}
`;
}


function getAnswers(type) {
    return inquirer.prompt(questions).then((answers) => {
        if (answers.membertype === "I am done") {
            addTeamMember(type, answers);
            return answers;
        } else {
            addTeamMember(type, answers);
            if (answers.membertype==="Engineer"){
                questions[0].message = `What is the ${answers.membertype}'s name?`
                questions[1].message = `What is the ${answers.membertype}'s id?`
                questions[2].message = `What is the ${answers.membertype}'s email?`
                questions[3].message = `What is the ${answers.membertype}'s GitHub username?`    
            } else {
                questions[0].message = `What is the ${answers.membertype}'s name?`
                questions[1].message = `What is the ${answers.membertype}'s id?`
                questions[2].message = `What is the ${answers.membertype}'s email?`
                questions[3].message = `What is the ${answers.membertype}'s school?`  
            }
            return getAnswers(answers.membertype);
        }
    });
}

function main() {
    getAnswers("Team manager")
        .then(console.log)
        .catch((error) => { });
}

main();