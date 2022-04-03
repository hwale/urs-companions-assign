const fs = require("fs");
const {
    getEligibleList,
    getFolderList,
    getStats,
    createCompanionJSON,
    renameFile
} = require("./helper");

const go = async () => {
    const eligibleList = await getEligibleList("./os/os-pet.json");
    const dronesList = await getFolderList("./pets");
    const dronesStats = await getStats("./stats/pets-stats.json");

    console.log(eligibleList.length)
    // console.log();

    const exchangeList = {};

    for (let i = 0; i < eligibleList.length; i++) {
        const droneId = eligibleList[i];
        const filename = dronesList[i];
        const baseId = filename.split("_")[0];
        const droneStats = dronesStats.find(stat => stat.id === `000${baseId}`.slice(-4));

        try {
            await createCompanionJSON(droneId, droneStats, "pet");
            // await renameFile(droneId, filename, "pets");
            exchangeList[baseId] = droneId;
            // console.log(i + " finished.")
        }
        catch(e) {
            console.log(e)
        }    
    }

    fs.writeFile("./exchange/pets-exchange.json", JSON.stringify(exchangeList), "utf8", (err) => {
        if (err) console.log(err);
    })
}

go();