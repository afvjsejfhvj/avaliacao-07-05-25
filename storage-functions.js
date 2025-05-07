const fs = require('fs')
const { v4: uuidv4 } = require('uuid');




function writeFile(arquivo, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(arquivo, data, 'utf-8', (err) => {
            if (err) return reject(err);
            resolve(null);
        })
    })

}

const myReadFile = (arquivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(arquivo, 'utf-8', (err, data) => {
            if (err) return reject(err); 
            console.log(data);
            resolve(data);
        })
    })
}

async function newLog(arquivo, name) {
    const uuid = uuidv4();
    const date = new Date();
    console.log(date);
    const log = `${uuid} - ${date} - ${name}`;
    console.log(log);

    const allLogs = await myReadFile(arquivo);
    await writeFile(arquivo, allLogs + "\n" + log);
    return log;
}


function getLog(arquivo, id) {
    return new Promise((resolve, reject) => {
        myReadFile(arquivo).then(data => {
            let log = undefined;

            String(data).split('\n').forEach(line => {
                if (line.startsWith(id)) {
                    log = line;
                }
            });

            if (log) {
                resolve(log);
            } else {
                reject(new Error("No log found with specified ID"));
            }
        }).catch(err => reject(err));
    });
}

module.exports = { myReadFile, getLog, newLog }