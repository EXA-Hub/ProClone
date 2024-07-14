// commands/role.js

import { CustomClient } from "../types";

import {
  MessageReplyOptions,
  PermissionFlagsBits,
  ReplyOptions,
  Role,
} from "discord.js";
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "role",
    type: 1,
    description: "Add/remove a role(s) for a user.",
    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 1,
        name: "give",
        description: "Gives a role to a user.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to give role for.",
            required: true,
          },
          {
            type: 8,
            name: "role",
            description: "The role to give.",
            required: true,
          },
          {
            type: 3,
            name: "bulk",
            description: "User to give role for.",
          },
        ],
      },
      {
        type: 1,
        name: "remove",
        description: "Removes a role from a user.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to remove role from.",
            required: true,
          },
          {
            type: 8,
            name: "role",
            description: "The role to remove.",
            required: true,
          },
          {
            type: 3,
            name: "bulk",
            description: "User to remove role from.",
          },
        ],
      },
      {
        type: 1,
        name: "multiple",
        description: "Give / remove multiple users from a role.",
        options: [
          {
            type: 3,
            name: "give_or_remove",
            description: "Pick a type",
            required: true,
            choices: [
              {
                name: "Give",
                value: "give",
              },
              {
                name: "Remove",
                value: "remove",
              },
            ],
          },
          {
            type: 8,
            name: "role",
            description: "The role to give / remove.",
            required: true,
          },
          {
            type: 3,
            name: "pick_type",
            description: "Pick a type",
            required: true,
            choices: [
              {
                name: "All",
                value: "all",
              },
              {
                name: "Bots",
                value: "bots",
              },
              {
                name: "Humans",
                value: "humans",
              },
              {
                name: "All With Role",
                value: "role",
              },
            ],
          },
          {
            type: 8,
            name: "required_role",
            description: "The role to give / remove.",
          },
        ],
      },
    ],
  },
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel,
    args: string[]
  ) => {
    async function name(): Promise<string> {
      const i18 = client.i18n[await client.getLanguage(guild.id)].role;

      if (guild.ownerId !== user.id) return i18.ownerOnly;

      const handleRoles = async (
        action: "add" | "remove",
        members: GuildMember[],
        roles: Role[]
      ) => {
        try {
          for (const member of members) {
            for (const role of roles) {
              if (action === "add") await member.roles.add(role);
              else await member.roles.remove(role);
            }
          }

          return i18.success
            .replace("{count}", members.length.toString())
            .replace("{action}", action === "add" ? "+" : "-")
            .replace("{roles}", roles.map((r) => r.name).join(","));
        } catch (error) {
          console.error(`Failed to ${action} roles:`, error);
          return i18.failed;
        }
      };

      if (interaction) {
        const subCommand = interaction.options.data[0].name;
        if (["give", "remove"].includes(subCommand)) {
          const targetUser = interaction.options.get("user")?.user;
          const targetRole = interaction.options.get("role")?.role as Role;
          const bulkUsers = interaction.options.get("bulk")?.value?.toString();

          let members: GuildMember[] = [
            guild.members.cache.get(targetUser!.id)!,
          ];
          if (bulkUsers)
            members = [
              ...members,
              ...bulkUsers
                .match(/<@!?(\d+)>/g)!
                .map((mention) => mention.match(/\d+/)?.[0])
                .filter((id) => id !== null)
                .map((id) => guild.members.cache.get(id!))
                .filter((mem) => mem !== undefined),
            ];

          if (!members.length) return i18.no_members;
          const roles = [targetRole];
          return handleRoles(
            subCommand === "give" ? "add" : "remove",
            members,
            roles
          );
        } else {
          const action = interaction.options.get("give_or_remove")?.value as
            | "give"
            | "remove";
          const targetRole = interaction.options.get("role")?.role as Role;
          const pickType = interaction.options.get("pick_type")
            ?.value as string;
          const requiredRole = interaction.options.get("required_role")
            ?.role as Role;

          let members: GuildMember[] = [];
          switch (pickType) {
            case "all":
              members = guild.members.cache.toJSON();
              break;
            case "bots":
              members = guild.members.cache.filter((m) => m.user.bot).toJSON();
              break;
            case "humans":
              members = guild.members.cache.filter((m) => !m.user.bot).toJSON();
              break;
            case "role":
              if (!requiredRole) return i18.no_required_role;
              members = guild.members.cache
                .filter((m) => m.roles.cache.has(requiredRole.id))
                .toJSON();
              break;
          }

          if (!members.length) return i18.no_members;
          const roles = [targetRole];
          return handleRoles(
            action === "give" ? "add" : "remove",
            members,
            roles
          );
        }
      } else {
        args.shift();
        const target = args.shift();
        const action = args[0].startsWith("+") ? "add" : "remove";
        const roles = args
          .join(" ")
          .substring(args[0].startsWith("+") || args[0].startsWith("-") ? 1 : 0)
          .split(",")
          .map((roleName) =>
            guild.roles.cache.find((r) => r.name === roleName.trim())
          )
          .filter((role): role is Role => role !== undefined);

        let members: GuildMember[];

        if (target!.toLowerCase() === "all")
          members = guild.members.cache.toJSON();
        else {
          const targetMember =
            guild.members.cache.get(target!) ||
            message.mentions.members?.first();
          if (!targetMember) return i18.no_members;
          members = [targetMember];
        }

        if (!members.length || !roles.length) return i18.no_members_or_roles;

        return handleRoles(action, members, roles);
      }
    }

    return {
      embeds: [{ description: await name(), color: 14423100 }],
    };
  },
};
