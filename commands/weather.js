const config = require("../config.json");
const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get the weather status of a location")
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("Enter a location")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let location = interaction.options.getString("location");
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=${process.env.api_key}&contentType=json`;

    axios
      .get(url)
      .then(async (res) => {
        const weatherEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setTitle(`Weather of ${res.data.resolvedAddress}`)
          .setDescription(
            `Timezone: ${res.data.timezone}\nLatitude: ${res.data.latitude}\nLongitude: ${res.data.longitude}`
          )
          .addFields(
            {
              name: "Temperature",
              value: `${res.data.currentConditions.temp} °C`,
              inline: true,
            },
            {
              name: "Feels like",
              value: `${res.data.currentConditions.feelslike}`,
              inline: true,
            },
            {
              name: "Humidity",
              value: `${res.data.currentConditions.humidity}%`,
              inline: true,
            },
            {
              name: "Wind Speed",
              value: `${res.data.currentConditions.windspeed} km/h`,
              inline: true,
            },
            {
              name: "Wind Direction",
              value: `${res.data.currentConditions.winddir}°`,
              inline: true,
            },
            {
              name: "Visibility",
              value: `${res.data.currentConditions.visibility} km`,
              inline: true,
            },
            {
              name: "Conditions",
              value: `${res.data.currentConditions.conditions}`,
              inline: true,
            },
            {
              name: "Sunrise Time",
              value: `${res.data.currentConditions.sunrise}`,
              inline: true,
            },
            {
              name: "Sunset Time",
              value: `${res.data.currentConditions.sunset}`,
              inline: true,
            }
          )
          .setTimestamp();

        await interaction.reply({
          embeds: [weatherEmbed],
        });
      })
      .catch(async (err) => {
        await interaction.reply({
          content: "Data not available at the moment...",
        });
      });
  },
};
