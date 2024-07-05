const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the response time and uptime"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const pingEmbed = new discord.EmbedBuilder()
      .setColor("Blurple")
      .setDescription(
        `Websocket: **${client.ws.ping}ms**\nUptime: **${ms(client.uptime)}**`
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [pingEmbed],
    });
  },
};
