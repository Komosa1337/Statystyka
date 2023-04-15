const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require("discord.js");
  const connection = require('../database/database');
  
  module.exports = {
    name: "dane",
    description: "xxxx",
    permissions: "ManageMessages",
  
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(message, args, client) {
      const embed = new EmbedBuilder().setColor("#086880").setTitle("Zamówienia");
      let prevMessage = null;
  
      function sendUsers() {
        let users = "";
        connection.query(`SELECT * FROM users`, (err, result) => {
          if (err) throw err;
         if(result?.length){
           
          const name = result.map((a) => `${a.name}`)
          const ph = result.map((a) => `${a.phone}`)
          const bk = result.map((a) => `${a.bank}`)
          
          const newEmbed = new EmbedBuilder()
            .setColor('#6a1bab')
            .setAuthor({ name: 'Dane kontaktowe pracowników CARSONLAB', iconURL: 'https://imgur.com/EvFne3O.png', url: 'https://discord.js.org' })
            .addFields(
              { name: 'Imie nazwisko', value: name.join("\n"), inline: true },
              { name: 'Telefon', value: ph.join("\n"), inline: true },
              { name: 'Numer konta', value: bk.join("\n"), inline: true }
            )
            .addFields({name: 'Wzór', value: 'Imię i nazwisko; \nNumer telefonu; \nNumer konta bankowego;' })
            .setTimestamp()
            
          if (prevMessage) {
            prevMessage.delete();
          }
          message.channel.send({ embeds: [newEmbed] }).then((msg) => {
            prevMessage = msg;
          });
         } else {
          return message.channel.send({content: "Brak danych"})
         }
        });
      }
      
      
  
      sendUsers();
  
      setInterval(() => {
        sendUsers();
      }, 43200000);
    },
  };