// commands/role.js

module.exports = {
  data: {
    name: "role",
    type: 1,
    description: "Add/remove a role(s) for a user.",
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
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};
