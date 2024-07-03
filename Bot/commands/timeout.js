const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: "timeout",
    type: 1,
    description:
      "⏱ Timeout a user from sending messages, react or join voice channels.",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to timeout",
        required: true,
      },
      {
        type: 3,
        name: "time",
        description: "The duration of timeout",
      },
      {
        type: 3,
        name: "reason",
        description: "The reason of timeout.",
      },
    ],
  },
  async execute(interaction) {
    const lang = await interaction.client.getLanguage(interaction.guild.id);
    const i18n = interaction.client.i18n[lang].timeout;

    const member = interaction.options.getMember("user");
    let time = interaction.options.getString("time") || "2h";
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (!member) {
      return interaction.reply({
        content: i18n["invalidMember"],
      });
    }

    if (
      member.user.id === interaction.client.user.id ||
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    ) {
      return interaction.reply({
        content: i18n["noPermission"].replace("{user}", member.user.username),
      });
    }

    const timeInMs = parseDuration(time);
    if (!timeInMs) {
      return interaction.reply({
        content: i18n["invalidDuration"],
      });
    }

    // 28 days in milliseconds
    if (timeInMs > 28 * 24 * 60 * 60 * 1000) {
      return interaction.reply({
        content: i18n["max"],
      });
    }

    const endDate = new Date(Date.now() + timeInMs);
    const formattedEndDate = endDate.toLocaleString("en-US", {
      timeZone: "UTC", // Adjust to your preferred timezone
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const initiator = interaction.user.tag;
    const finalReason = `By: ${initiator}, REASON: ${reason}, ENDS ON: ${formattedEndDate}`;

    try {
      await member.timeout(timeInMs, finalReason);

      await interaction.reply({
        content: i18n["timeoutSuccess"].replace("{user}", member.user.username),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["timeoutError"],
        ephemeral: true,
      });
    }
  },
};

function parseDuration(duration) {
  const match = duration.match(/^(\d+)([smhdwmoY])$/i);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 1000 * 60;
    case "h":
      return value * 1000 * 60 * 60;
    case "d":
      return value * 1000 * 60 * 60 * 24;
    case "w":
      return value * 1000 * 60 * 60 * 24 * 7;
    case "mo":
      return value * 1000 * 60 * 60 * 24 * 30;
    case "y":
      return value * 1000 * 60 * 60 * 24 * 365;
    default:
      return null;
  }
}
