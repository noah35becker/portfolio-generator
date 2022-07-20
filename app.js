
const fs = require('fs');
const generatePage = require('./src/page-template');

const profileDataArgs = process.argv.slice(2, process.argv.length);
const [theirName, theirGithub] = profileDataArgs;


fs.writeFile('index.html', generatePage(theirName, theirGithub), err => {
    if (err)
        throw err;
    
    console.log('Portfolio complete! Check out index.html to see the output!');
});