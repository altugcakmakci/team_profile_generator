const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        message: 'What is your name?',
        name: 'username',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'Where are you from?',
        name: 'place',
    },
    {
        type: 'input',
        message: 'Please write a short bio: ',
        name: 'shortbio',
    },
    {
        type: 'checkbox',
        name: 'technologies',
        message: 'Plese select the technologies you are familar with:',
        choices: ['HTML', 'CSS', 'Javascript','JQuery','Node',"Express"]
    },
    {
        type: 'input',
        message: 'What is your linked in URL?',
        name: 'linkedin'
    },
    {
        type: 'input',
        message: 'What is your Github URL?',
        name: 'github'
    },
    {
        type: 'list',
        name: 'hbackcolor',
        message: 'Plese choose a background color for header:',
        choices: ['black', 'darkblue', 'brown','darkgreen','yellow',"cyan"],
        default: 'darkblue'
    },
    {
        type: 'list',
        name: 'hfontcolor',
        message: 'Plese choose a font color for header:',
        choices: ['white', 'yellow', 'cyan','lightgreen','blue',"black"],
        default: 'white'
    },
    {
        type: 'list',
        name: 'bbackcolor',
        message: 'Plese choose a background color for body:',
        choices: ['black', 'darkblue', 'brown','darkgreen','yellow',"cyan","white"],
        default: 'darkblue'
    },
    {
        type: 'list',
        name: 'bfontcolor',
        message: 'Plese choose a font color for body:',
        choices: ['white', 'yellow', 'cyan','lightgreen','blue',"darkblue","black"],
        default: 'white'
    }
];

// Create a function to write README file
function writeHtmlFile(filename, data) {
    fs.writeFile(`./${filename}`, generateHTML(data), (err) =>
        err ? console.error(err) : console.log('HTML file created!')
    );
}

function writeStyleToFile(filename, data) {
    if (!fs.existsSync('./css')) {
        fs.mkdirSync('./css');
    }
    fs.writeFile(`./css/${filename}`, generateCSS(data), (err) =>
        err ? console.error(err) : console.log('CSS file created!')
    );
}

function produceDocs(data){
    writeStyleToFile("style.css",data);
    writeHtmlFile("index.html",data);
}

// Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((response) =>
            produceDocs(response)
        );
}

function generateHTML(data) {
    let retStr= `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="Description" content="Enter your description here" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed&display=swap" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="./css/style.css" />
      <title>Personal Portfolio</title>
    </head>
    
    <body>
    <h1>My personal portfolio!</h1>
    <p class="body_text text-center">My name is ${data.username}, and I am from ${data.place}.</p>

    <section class="container my-5">
    <div class="row">
      <div class="col-12 col-md-5 col-xl-5 box_item">
        <p class="body_text text-center">${data.shortbio}</p>
        </div>
        <div class="col-12 col-md-6 col-xl-6 box_item">
    <h2>Here is a list of technologies that I am familiar with<h2>
    <ul>`;
    console.log(data);

    for (const i of data.technologies) {
        retStr = retStr+`<li class="list-group-item">${i}</li>`;
    }

    retStr = retStr+`
    </ul>
    </div>
    </div>
    <hr>
    <a href="${data.github}">You can view my work in Github</a>
    <hr>

    <div class="footer">
    <h2>Contact</h2>
    <p class="body_text">Email: ${data.email}</p>
    <p class="body_text">Linkedin: ${data.linkedin}</p>
    </div>
    </body>

    </html>    
  `;
    return retStr;
  }

  function generateCSS (data){
      return `h1 {
        background-color: ${data.hbackcolor};
        color: ${data.hfontcolor};
        text-align: center;
        padding:10px;
        font-family: 'Barlow Semi Condensed', sans-serif;
    }
    body {
        background-color: ${data.bbackcolor};
        color: ${data.bfontcolor};
        font-family: 'Barlow Semi Condensed', sans-serif;
    }
    
    .body_text {
        font-size: 24px;
    }
    .box_item {  
        border: solid 2px ${data.bfontcolor}; 
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
    }
    .footer {
        background-color: ${data.hbackcolor};
        color: ${data.hfontcolor};
        text-align: center;
        padding:10px;
        font-family: 'Barlow Semi Condensed', sans-serif;
    }
    `;
  }

// Function call to initialize app
init();