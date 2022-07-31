
const fs = require('fs');


const writeFile = fileContent => new Promise((resolve, reject) => {
    fs.writeFile('./dist/index.html', pageHTML, err => {
        if (err){
            reject(err);
            return;
        }

        resolve({
            ok: true,
            message: 'Portfolio complete! Check out index.html to see the output!'
        });
    });
});


const copyFile = fileContent => new Promise((resolve, reject) => {
    fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err){
            reject(err);
            return;
        }

        resolve({
            ok: true,
            message: 'Style sheet copied successfully!'
        });
    });
});

module.exports = {writeFile, copyFile};