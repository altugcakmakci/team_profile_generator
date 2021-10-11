const fs = require('fs');
const inquirer = require('inquirer');

function Teammember(mname, mid, memail, mdet, mtype) {
    this.mname = mname;
    this.mid = mid;
    this.memail = memail;
    this.mdet = mdet;
    this.mtype = mtype;
}

Teammember.prototype.getHtmlBlock = function () {
    let detail = "Office number";
    if (this.mtype !== "Team manager") {
        detail = "GitHub";
    }
    let icontxt = "<i class='fas fa-users'></i>";
    if (this.mtype === "Engineer") {
        icontxt = "<i class='fas fa-user-clock'></i>";
    } else if (this.mtype === "Intern") {
        icontxt = "<i class='fas fa-user-edit'></i>";
    } 
    let htmlBlock = `<div class="col-12 col-md-3 col-xl-3 box_item">
    <div class='box_header'>
    <p class="body_text">${this.mname}</p>
    <p class="body_text">${icontxt} ${this.mtype}</p>
    </div>
    <p class="body_text">Id: ${this.mid}</p>
    <p class="body_text">Email: ${this.memail}</p>
    <p class="body_text">${detail}: ${this.mdet}</p>
    </div>`;
    return htmlBlock;
};

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
    fs.writeFile(`./${filename}`, generateHTML(), (err) =>
        err ? console.error(err) : console.log('HTML file created!')
    );
}

function writeStyleToFile(filename) {
    if (!fs.existsSync('./css')) {
        fs.mkdirSync('./css');
    }
    fs.writeFile(`./css/${filename}`, generateCSS(), (err) =>
        err ? console.error(err) : console.log('CSS file created!')
    );
}

function produceDocs() {
    console.log("Produce docs");
    writeStyleToFile("style.css");
    writeHtmlFile("index.html");
}

function addTeamMember(type, answer) {
    let newmember = new Teammember(answer.membername, answer.memberid, answer.memberemail, answer.memberdet, type);
    teammembers.push(newmember);
    if (answer.membertype === "I am done") {
        produceDocs();
    }
}


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
        retStr = retStr + teammember.getHtmlBlock();
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
    console.log("Here3");
    return inquirer.prompt(questions).then((answers) => {
        console.log(answers.membertype);
        if (answers.membertype === "I am done") {
            console.log("Here5");
            addTeamMember(type, answers);
            return answers;
        } else {
            console.log("Here");
            addTeamMember(type, answers);
            questions[0].message = `What is the ${answers.membertype}'s name?`
            questions[1].message = `What is the ${answers.membertype}'s id?`
            questions[2].message = `What is the ${answers.membertype}'s email?`
            questions[3].message = `What is the ${answers.membertype}'s GitHub username?`
            console.log("Here2");
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