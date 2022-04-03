const fs = require("fs");

const getEligibleList = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                console.log(err);                
                return reject(err);
            }

            return resolve(JSON.parse(data).map(x => x.token_id));
        })
    })
}

const getFolderList = (folder) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
        
            return resolve(files);
        })

    })
}

const getStats = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                console.log(err);                
                return reject(err);
            }
        
            return resolve(JSON.parse(data).companions);
        })
    })
}

const createCompanionJSON = (droneId, traits, type) => {
    return new Promise((resolve, reject) => {
        const json = JSON.stringify({
            ...traits,
            id: droneId,
            type
        });

        fs.writeFile(`./companions-json/${droneId}.json`, json, "utf8", err => {
            if (err) {
                console.log("err", err)
                reject(err);
            }

            // console.log(`successfully created companion JSON for id: ${droneId}`)
            resolve();
        })
    })
    
}

const renameFile = (id, file, type) => {
    return new Promise((resolve, reject) => {
        const oldPath = `./${type}/${file}`;
        const newPath = `./companions/${id}.mp4`;

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            // console.log(`successfully renamed file from ${oldPath} to ${newPath}`)

            resolve();
        })
    })
}

module.exports = { getEligibleList, getFolderList, getStats, createCompanionJSON, renameFile };
