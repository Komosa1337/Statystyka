const fs = require('fs');
module.exports = async (client) => {
    const featureFolders = fs.readdirSync('./features');

    for (const folder of featureFolders) {
        const featureFiles = fs.readdirSync(`./features/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of featureFiles) {
            const feature = require(`../features/${folder}/${file}`);

            await feature.run(client);
        }
    }
}