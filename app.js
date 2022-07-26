
const {writeFile, copyFile} = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');


const promptUser = () => 
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: input => {
                if (input)
                    return true;
                console.log('Please enter your name!');
                return false;
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:',
            validate: input => {
                if (input)
                    return true;
                console.log('Please enter your Github username!');
                return false;
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some info about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout)
                    return true;
                return false;
            }
        }
    ])
;


const promptProject = portfolioData => {
    if (!portfolioData.projects){
        portfolioData.projects = [];
    }
    
    console.log(`

=================
Add a new project
=================
`   );
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project (Required)?',
            validate: input => {
                if (input)
                    return true;
                console.log('Please enter a name for this project!');
                return false;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required):',
            validate: input => {
                if (input)
                    return true;
                console.log('Please enter a description for this project!');
                return false;
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project (Required):',
            validate: input => {
                if (input)
                    return true;
                console.log('Please enter a Github link for this project!');
                return false;
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);

            if (projectData.confirmAddProject)
                return promptProject(portfolioData);
            else
                return portfolioData;
        })
    ;
};


promptUser()
    .then(promptProject)
    .then(portfolioData => generatePage(portfolioData))
    .then(pageHTML => writeFile(pageHTML))
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => console.log(copyFileResponse))
    .catch(err => console.log(err));