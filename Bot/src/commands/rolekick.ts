// commands/rolekick.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
module.exports = {
  data: {
    name: "rolekick",
    type: 1,
    description: "Kicks all members with a specific role",

    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 8,
        name: "role",
        description: "Specify the role to kick all members who have it.",
        required: true,
      },
      {
        type: 8,
        name: "exclude",
        description: "Exclude members with this role from being kicked",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].rolekick;
  },
};
