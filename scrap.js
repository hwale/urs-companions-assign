const fs = require("fs");

const getDronesFileList = () => {
    return new Promise((resolve, reject) => {
        fs.readdir("./test_pup", (err, files) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
        
            return resolve(files);
        })

    })
}

const go = async () => {
    const list = await getDronesFileList();

    const available = [];
    const missing = [];

    list.forEach(file => {
        available.push(parseInt(file.split("_")[0]));
    })

    console.log(available)

    for (let i = 0; i < 3585; i++) {
        if (!available.includes(i)) {
            missing.push(i);
        }
    }

    fs.writeFile("missing-pets.json", JSON.stringify(missing), "utf8", (err) => {
        if (err) console.log(err);
    })

}

go();


// fs.readFile("./stats/drones-stats.json", "utf8", (err, data) => {
//     if (err) console.log(err);
//     const getsDrone = JSON.parse(data);

//     const { companions } = getsDrone;

//     const fucked = [];

//     companions.forEach(companion => {
//         if (companion.liquid === "L04" && companion.bg === "BG02") {
//             fucked.push("L04 + BG2: " + companion.id)
//         }
//         if (companion.liquid === "L05" && companion.bg === "BG02") {
//             fucked.push("L05 + BG2: " + companion.id)
//         }
//     })

//     fs.writeFile("fack.json", JSON.stringify(fucked), "utf8", (err) => {
//         if (err) console.log(err);
//     })

//     // console.log(getsDrone.length)
// })

// fs.readFile("./os/os-transport.json", "utf8", (err, data) => {
//     if (err) console.log(err);
//     const pets = JSON.parse(data);

//     console.log(pets.length)

//     // companions.forEach(companion => {
//     //     if (companion.liquid === "L04" && companion.bg === "BG02") {
//     //         fucked.push("L04 + BG2: " + companion.id)
//     //     }
//     //     if (companion.liquid === "L05" && companion.bg === "BG02") {
//     //         fucked.push("L05 + BG2: " + companion.id)
//     //     }
//     // })

//     // fs.writeFile("fack.json", JSON.stringify(fucked), "utf8", (err) => {
//     //     if (err) console.log(err);
//     // })

//     // console.log(getsDrone.length)
// })