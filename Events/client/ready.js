const color = require('colors-cli/toxic')
const connection = require('../../database/database.js')
module.exports = {
    name: "ready",
    async execute(client) {
        connection.connect(function (err) {
            if (err)
              return console.log(
                "There was an error connecting to the database. " + err
              );
              console.log( `${client.user.username} 💫 działa!`.x195.underline );
          });
       

    }
}
