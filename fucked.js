const fs = require("fs");

const { getEligibleList, getFolderList, getStats, createCompanionJSON, renameFile } = require("./helper");

const getJSON = (id) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./final-json/${id}`, "utf8", (err, data) => {
            if (err) {
                reject(err);
            }

            return resolve(JSON.parse(data));
        })
    })
}

const createJSON = (data, id) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./final-braincell/${id}`, JSON.stringify(data), "utf8", (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        })
    })
}

const someDrone = trait => trait.value === "Search" || trait.value === "Detect" || trait.value === "Biohazardous Spill" || trait.value === "White Spirit" || trait.value === "Water Dance";
const someTransport = trait => trait.value === "Twist King" || trait.value === "I'm Ready" || trait.value === "Crypto Force Movement" || trait.value === "Hero in the Black Fog";
const somePet = trait => trait.value === "Look At Me" || trait.value === "Dance With Me" || trait.value === "Dance of Nanoparticles" || trait.value === "Best Photogenic";


const go = async () => {
    const files = await getFolderList("./final-json");

    for (const file of files) {
        const json = await getJSON(file);
        const { attributes } = json;
        const id = json.name.split("URS Companion #")[1];
        
        if (attributes.some(someDrone)) {
            const newMeta = {
                ...json,
                attributes: [
                    { trait_type: "Type", value: "Hover Bowl"},
                    ...attributes
                ],
                image: `https://ipfs.io/ipfs/Qmc7rpVx3dCLbaoQB9fSJk6cFTXSC3dMo6cMkk1u5eJ9SU/${id}.mp4`
            }

            await createJSON(newMeta, id);
        } else if (attributes.some(someTransport)) {
            let newMeta;
            if (attributes.some(trait => !trait.value)) {
                console.log("kitty")
                const index = attributes.findIndex(trait => !trait.value);
                const newAttributes = [
                    ...attributes.slice(0, index),
                    ...attributes.slice(index + 1)
                ]
                console.log(newAttributes)
                newMeta = {
                    ...json,
                    attributes: [
                        { trait_type: "Type", value: "Bob Carrier"},
                        ...newAttributes,
                        { trait_type: "Stomach", value: "Kitty"}
                    ],
                    image: `https://ipfs.io/ipfs/Qmc7rpVx3dCLbaoQB9fSJk6cFTXSC3dMo6cMkk1u5eJ9SU/${id}.mp4`
                }
            } else {
                newMeta = {
                    ...json,
                    attributes: [
                        { trait_type: "Type", value: "Bob Carrier"},
                        ...attributes
                    ],
                    image: `https://ipfs.io/ipfs/Qmc7rpVx3dCLbaoQB9fSJk6cFTXSC3dMo6cMkk1u5eJ9SU/${id}.mp4`
                }
            }


            await createJSON(newMeta, id);
        } else if (attributes.some(somePet)) {
            const newMeta = {
                ...json,
                attributes: [
                    { trait_type: "Type", value: "Meta Pup"},
                    ...attributes
                ],
                image: `https://ipfs.io/ipfs/Qmc7rpVx3dCLbaoQB9fSJk6cFTXSC3dMo6cMkk1u5eJ9SU/${id}.mp4`
            }

            await createJSON(newMeta, id);
        } else {
            console.log("this one broken", file)
        }
        // console.log(json);2889 2718
    }
}

go();