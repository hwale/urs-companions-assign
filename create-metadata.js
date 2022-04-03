const fs = require("fs");
const { getFolderList } = require("./helper");
const { drone, transport, pet } = require("./stat-codes");

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./companions-json/${file}`, "utf8", (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            return resolve(JSON.parse(data));
        })
    })
}

const createJSON = (data, id) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./final-json/${id}`, JSON.stringify(data), "utf8", (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        })
    })
}

const createMetadata = async (data) => {
    switch(data.type) {
        case "drone": {
            const traitTypes = ["Background", "Animation", "Skin", "Eyes", "Arms", "Liquid", "Head", "Bottom"];
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: traitTypes.map(trait => {
                    let value;
                    if (trait === "Background") {
                        value = drone[trait][data["bg"]];
                    } else {
                        value = drone[trait][data[trait.toLowerCase()]]
                    }
                    
                    return {
                        trait_type: trait,
                        value
                    }
                })
            }

            await createJSON(companion, data.id);

            break;
        }
        case "transport": {
            const traitTypes = ["Background", "Animation", "Skin", "Head", "Face", "Right Arm", "Stomach", "Bottom"];
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: traitTypes.map(trait => {
                    let value;
                    if (trait === "Background") {
                        value = transport[trait][data["bg"]];
                    } else if (trait === "Right Arm") {
                        value = transport[trait][data["arms"]];
                    } else if (trait === "Stomach" && !value) {
                        value = "Kitty"
                    } else {
                        value = transport[trait][data[trait.toLowerCase()]]
                    }
                    return {
                        trait_type: trait,
                        value
                    }
                })
            }

            await createJSON(companion, data.id);

            break;
        }
        case "pet": {
            const traitTypes = ["Background", "Animation", "Skin", "Head", "Eyes", "Necklace", "Back", "Tail"];
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: traitTypes.map(trait => {
                    let value;
                    if (trait === "Background") {
                        value = pet[trait][data["bg"]];
                    } else {
                        value = pet[trait][data[trait.toLowerCase()]]
                    }
                    return {
                        trait_type: trait,
                        value
                    }
                })
            }

            await createJSON(companion, data.id);

            break;
        }
        case "SP01": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "Biohazardous Spill"
                    },
                    {
                        trait_type: "Body",
                        value: "Biohazard"
                    },
                    {
                        trait_type: "Eyes",
                        value: "Eye of Beholder"
                    },
                    {
                        trait_type: "Arms",
                        value: "Black Death"
                    },
                    {
                        trait_type: "Liquid",
                        value: "Plague Liquid"
                    },
                    {
                        trait_type: "Head",
                        value: "Toxic Cloud"
                    },
                    {
                        trait_type: "Bottom",
                        value: "Herald of Doom"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }
        case "SP02": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "White Spirit"
                    },
                    {
                        trait_type: "Body",
                        value: "Polar Jet"
                    },
                    {
                        trait_type: "Eyes",
                        value: "Cold Gaze"
                    },
                    {
                        trait_type: "Arms",
                        value: "Call to Arms"
                    },
                    {
                        trait_type: "Liquid",
                        value: "Midnight Sun"
                    },
                    {
                        trait_type: "Head",
                        value: "Jet Stream"
                    },
                    {
                        trait_type: "Bottom",
                        value: "Jack Frost Cape"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }
        case "SP03": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "Water Dance"
                    },
                    {
                        trait_type: "Body",
                        value: "Pacific"
                    },
                    {
                        trait_type: "Eyes",
                        value: "Deep Sea Light"
                    },
                    {
                        trait_type: "Arms",
                        value: "Tsunami"
                    },
                    {
                        trait_type: "Liquid",
                        value: "Pacific Water"
                    },
                    {
                        trait_type: "Head",
                        value: "Jelly Fish"
                    },
                    {
                        trait_type: "Bottom",
                        value: "Energy of Ocean"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }
        case "SP04": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "Crypto Force Movement"
                    },
                    {
                        trait_type: "Body",
                        value: "Crypto Knight"
                    },
                    {
                        trait_type: "Head",
                        value: "Knight Helmet"
                    },
                    {
                        trait_type: "Face",
                        value: "Resolute Face"
                    },
                    {
                        trait_type: "Right Arm",
                        value: "Jewelry Punch"
                    },
                    {
                        trait_type: "Stomach",
                        value: "Ethereum 7.0"
                    },
                    {
                        trait_type: "Bottom",
                        value: "Get the Feeling"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }        
        case "SP05": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "Hero in the Black Fog"
                    },
                    {
                        trait_type: "Body",
                        value: "Heavy Smoker"
                    },
                    {
                        trait_type: "Head",
                        value: "Swirl"
                    },
                    {
                        trait_type: "Face",
                        value: "Eagle Eyes"
                    },
                    {
                        trait_type: "Right Arm",
                        value: "Transparency Function"
                    },
                    {
                        trait_type: "Stomach",
                        value: "Unknown"
                    },
                    {
                        trait_type: "Bottom",
                        value: "Dark Spider"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }
        case "SP06": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "Dance of Nanoparticles"
                    },
                    {
                        trait_type: "Body",
                        value: "Dark Matter"
                    },
                    {
                        trait_type: "Head",
                        value: "Higgs Boson"
                    },
                    {
                        trait_type: "Eyes",
                        value: "Cosmic Eyes"
                    },
                    {
                        trait_type: "Necklace",
                        value: "Schrödinger's Nametag"
                    },
                    {
                        trait_type: "Back",
                        value: "Event Horizon"
                    },
                    {
                        trait_type: "Tail",
                        value: "Fade Away"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }
        case "SP07": {
            const companion = {
                name: `URS Companion #${data.id}`,
                image: `https://ipfs.io/ipfs/QmQetCrY7f44BFSxz5y23tJb85UdXGhKvDS9m61cJkH431/${data.id}.mp4`,
                attributes: [
                    {
                        trait_type: "Animation",
                        value: "Best Photogenic"
                    },
                    {
                        trait_type: "Body",
                        value: "Definitely Not Metapup"
                    },
                    {
                        trait_type: "Head",
                        value: "Cotton Candy"
                    },
                    {
                        trait_type: "Eyes",
                        value: "Stolen Blue Eyes"
                    },
                    {
                        trait_type: "Necklace",
                        value: "Hidden Gem"
                    },
                    {
                        trait_type: "Back",
                        value: "Baby Fluff"
                    },
                    {
                        trait_type: "Tail",
                        value: "Soft but Strong"
                    },
                ]
            }

            await createJSON(companion, data.id);

            break;
        }
        default:
            console.log("No matching cases")
    }
}


const go = async () => {
    const companionsFiles = await getFolderList("./companions-json");

    for (const file of companionsFiles) {
        const contents = await readFile(file);

        await createMetadata(contents);
    }
}

go();