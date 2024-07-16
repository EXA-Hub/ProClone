/**
 *
 * To get an emoji id
 * type \ before inputing the emoji in discord
 *
 * عشان تجيب ايدي الايموجي
 * اكتب \ قبل ما تحط الايموجي في ديسكورد
 *
 * مثال:
 *
 * \🥵
 * \<:oldexa:820366824533262346>
 *
 * طبعا الطريقة دي هتخلي شكل البوت احلى (:)
 *
 *
 */

const emojis = {
  rolling_eyes: "🙄",
  white_check_mark: "✅",
  x: "❌",
  stop_watch: "⏱️",
  bank: "🏦",
  credit_card: "💳",
  interrobang: "⁉️",
  thinking: "🤔",
  atm: "🏧",
  money_bag: "💰",
  airplane: "✈️",
  calendar: "📅",
  crown: "👑",
  busts_in_silhouette: "👥",
  speech_balloon: "💬",
  earth_africa: "🌍",
  lock: "🔒",
  closed_lock_with_key: "🔐",
  unlock: "🔓",
  id: "🆔",
  sparkles: "✨",
  check: "✔️",
  information_source: "ℹ️",
  mag: "🔍",
  robot: "🤖",
  partying_face: "🥳",
};

export { emojis };

export default {
  setlvl: {
    bot: `${emojis.robot} This action cannot be taken against bots.`,
    done: `**${emojis.white_check_mark} @{user}**'s Level has been updated`,
  },
  setxp: {
    bot: `${emojis.robot} This action cannot be taken against bots.`,
    done: `**${emojis.white_check_mark} @{user}**'s XP has been updated`,
  },
  congrats: `${emojis.partying_face} **Congratulations**, {type.user}!\nYou climbed from level **{oldLevel}** to **{level}**. Keep it up!`,
  botRanks: `${emojis.robot}  **| {user}**, bots do not have ranks!`,
  warnings: {
    warningsTitle: "Warnings",
    requestedBy: "Requested by",
    warnID: "Warn ID",
    by: "By",
    user: "User",
  },
  warn_remove: {
    warnsRemoved: `${emojis.white_check_mark} **{size} warnings have been removed.**`,
    invalid: `${emojis.mag} **I can't find the warning that you're looking for.**`,
  },
  warn: {
    warned: `${emojis.white_check_mark} **@{user} warned! **`,
    noreason: `${emojis.rolling_eyes} - **Please specify a reason.**`,
  },
  points: {
    invalidUser: `${emojis.rolling_eyes} - **I can't find this member**`,
    noPoints: `**No points have been recorded yet**\nuse \`/help points\` for more info!`,
    page: `Points `,
    nan: `${emojis.rolling_eyes} - **Please Enter a Valid Number.**`,
    resetSuccess: `${emojis.sparkles} **All points have been successfully reset.**`,
    pointsSuccess: `${emojis.sparkles}  **{user}** new points is **{points}**.`,
    userPoints: `${emojis.sparkles}  **{user}**'s points is **{points}**`,
  },
  move: {
    noVC: `${emojis.rolling_eyes} -  **You are not connected to a voice channel!**`,
    noVCM: `${emojis.rolling_eyes} -  **The member is not connected to a voice channel!**`,
    error: `${emojis.rolling_eyes} -  ** Insufficient Permission **`,
    confirm: `${emojis.information_source} Are you sure that you want to move all users? type **(y)** to confirm`,
    Aborted: `${emojis.x} ** Aborted **`,
    move: `${emojis.white_check_mark} ** All members are being moved!**`,
    noMember: `${emojis.rolling_eyes} - **I can't find this member**`,
    already: `${emojis.white_check_mark} ** {user} already in the voice channel!**`,
    notFound: `${emojis.rolling_eyes} - **I can't find target channel**`,
    moved: `${emojis.white_check_mark} ** {user} moved to {channel}!**`,
  },
  unmute: {
    success: `**${emojis.white_check_mark} {members} have been unmuted from {type} channels!**`,
    failed: `${emojis.rolling_eyes} - I couldn't unmute the members from {type} channels. Please check my permissions and role position.`,
    no_mute_role: `Muted role not found.`,
    no_members: `Please specify a valid member to unmute.`,
  },
  mute: {
    success: `Successfully {action}d members in {type} channels: {members}.`,
    failed: `Failed to {action} members in {type} channels.`,
    no_members: `No valid members specified.`,
    no_mute_role: `No 'Muted' role found. Please create one.`,
  },
  role: {
    success: `${emojis.white_check_mark} Changing roles for {count} members, {action}{roles}`,
    failed: `${emojis.rolling_eyes} - I couldn't change the user's roles. Please double-check my permissions and role position.`,
    no_members: `${emojis.rolling_eyes} - **Please specify a member**`,
    no_members_or_roles: `No valid members or roles specified.`,
    no_required_role: `${emojis.rolling_eyes} - **Please specify a role**`,
    ownerOnly: `This command can only be executed by the server \`owner\`.`,
  },
  unban: {
    success: `${emojis.white_check_mark} **{user} unbanned!**`,
    failed: `${emojis.rolling_eyes} - I couldn't unban that user. Please check my permissions.`,
    invalid_input: `No valid input provided for unban.`,
    not_found: `${emojis.rolling_eyes} - **I can't find {user} in the ban list**`,
  },
  ban: {
    success_single: `${emojis.white_check_mark} **{user} banned from the server! ${emojis.airplane}**`,
    failed: `${emojis.rolling_eyes} - I couldn't ban that user. Please double-check my permissions and role position.`,
    no_member: `No valid member or bulk users specified for ban.`,
    non: `${emojis.rolling_eyes} - ** You can't ban @{user}. **`,
  },
  vkick: {
    invalidMember: `Please mention a valid member or provide a valid member ID.`,
    vkickSuccess: `${emojis.white_check_mark} **@{user} kicked from the voice! **`,
    vkickError: `${emojis.rolling_eyes} - I couldn't kick that user. Please double-check my permissions.`,
    uNonMember: `${emojis.rolling_eyes} - ** You can't kick {username}. **`,
    notVC: `${emojis.rolling_eyes} -  **The member is not connected to a voice channel!**`,
  },
  kick: {
    invalidMember: `Please mention a valid member or provide a valid member ID.`,
    kickSuccess: `Successfully kicked {user}.`,
    kickError: `${emojis.rolling_eyes} - I couldn't kick that user. Please double-check my permissions.`,
    uNonMember: `${emojis.rolling_eyes} - ** You can't kick {username}. **`,
  },
  clear: {
    success: `\`\`\`javascript\n{number} message has been deleted.\`\`\``,
    noMessages: `No messages found matching the filters.`,
    failure: `Failed to delete messages.`,
  },
  setcolor: {
    invalid_input: `${emojis.rolling_eyes} - Hex color length must equal 6 or 3`,
    invalid_role: `${emojis.rolling_eyes} ** I couldn't find that role :confused:**`,
    embed: {
      desc: `${emojis.white_check_mark} **  {role}'s color has been changed successfully.**`,
      foot: `Requested by {user}`,
    },
    error: `${emojis.rolling_eyes} -  I couldn't change that role. Please double-check my permissions and role position.`,
  },
  slowMode: {
    max_time_exceeded: `${emojis.x} Time should be less than or equal to **6 hours**.`,
    invalid: `${emojis.stop_watch} This channel's Slowmode has been disabled.`,
    slowMode: `${emojis.stop_watch} This channel slowmode is **{seconds} seconds**.`,
    success: `${emojis.stop_watch} This channel slowmode has been set to **{seconds} seconds**.`,
    error: `${emojis.x} DiscordRESTError [50013]: Missing Permissions`,
  },
  title: {
    true: `${emojis.white_check_mark}`,
    long: `${emojis.rolling_eyes} - **title too long.**`,
  },
  avatar: `Requested by `,
  color: {
    invalidColorNumber: `Wrong color number`,
    success: `Color has been changed successfully.`,
    requested: `Requested by {member}`,
  },
  userPermissionRequired: `${emojis.x} This command requires \`{permission}\` permission.`,
  moveme: {
    userNotInVoice: `{target} is not in a voice channel.`,
    moveChannelSuccess: `${emojis.white_check_mark} **{member} moved to {channel}!**`,
    notVoiceChannel: `${emojis.rolling_eyes} - **I can't find this member**`,
    notFound: `${emojis.rolling_eyes} - **I can't find this member**`,
    alreadyInVoiceChannel: `${emojis.white_check_mark} **{member} already in the voice channel!**`,
  },
  disabled: {
    module: `${emojis.x} The module of the command is not enabled`,
    command: `${emojis.x} This command is not enabled`,
    channel: `${emojis.x} This command is not enabled on `,
    role: `${emojis.x} You are not allowed to use this command.`,
    serverOnly: `${emojis.x} Slash commands only work on servers`,
  },
  credits: {
    balance: `${emojis.bank} | **{username}, your account balance is \`\${balance}\`.**`,
    otherBalance: `** {username} ${emojis.credit_card} balance is \`\${balance}\`.**`,
    noBots: `${emojis.thinking} | **{username}**, bots do not have credits!`,
    transfer: `${emojis.atm} | Transfer Receipt \`\`\`You have received \${credits} from user {senderName} (ID: {senderID})\nReason: {reason} \n\`\`\``,
    transferSuccess: `**${emojis.money_bag} | {senderName}, has transferred \`\${credits}\` to <@!{ID}> **`,
    insufficientBalance: `** ${emojis.interrobang} | {username}, type the credit you need to transfer!**`,
    lessMoney: `** ${emojis.thinking} | {username}, Your balance is not enough for that!**`,
  },
  setLang: [
    `${emojis.white_check_mark} The Language has been changed successfully`,
    `${emojis.rolling_eyes} - Supported languages are `,
  ],
  server: {
    fields: [
      {
        name: `${emojis.id} Server ID:`,
        value: `{guildId}`,
        inline: true,
      },
      {
        name: `${emojis.calendar} Created On`,
        value: `**<t:{createdTimestamp}:R>**`,
        inline: true,
      },
      {
        name: `${emojis.crown} Owned by`,
        value: `<@!{ownerId}>`,
        inline: true,
      },
      {
        name: `${emojis.busts_in_silhouette}  Members ({memberCount})`,
        value: `**{onlineMemberCount}** Online\n**{boostCount}** Boosts ${emojis.sparkles}`,
        inline: true,
      },
      {
        name: `${emojis.speech_balloon} Channels ({channelCount})`,
        value: `**{textChannelCount}** Text | **{voiceChannelCount}** Voice`,
        inline: true,
      },
      {
        name: `${emojis.earth_africa} Others`,
        value: `**Verification Level: **{verificationLevel}`,
        inline: true,
      },
      {
        name: `${emojis.closed_lock_with_key}  Roles ({roleCount})`,
        value: `To see a list with all roles use **/roles**`,
        inline: true,
      },
    ],
  },
  roll: `${emojis.rolling_eyes} - \`{option}\` is not a valid input string for #roll.`,
  help: [
    `**${emojis.rolling_eyes}  - I can't find this command.**`,
    `Examples:`,
    `Usage:`,
  ],
  user: [`Joined Discord :`, `Joined Server :`],
  lock: {
    lockSuccess: `${emojis.lock} {channel} **has been locked.**`,
    lockError: `There was an error trying to lock the channel.`,
    unlockSuccess: `${emojis.unlock} {channel} **has been unlocked.**`,
    invalidChannel: `Please specify a valid channel to lock.`,
  },
  setnick: {
    noPermission: `${emojis.rolling_eyes} - I couldn't update that user. Please double-check my permissions and role position.`,
    invalidMember: `Please specify a valid member.`,
    nickSuccess: `${emojis.white_check_mark} **{user}**'s nick has been changed to {newNick}!`,
    nickSuccessR: `${emojis.white_check_mark} **{user}**'s nick has been reset.`,
    nickError: `There was an error changing the nickname. Please try again later.`,
  },
  timeout: {
    max: `${emojis.x} Timeout duration must be lower or equal to 28 days.`,
    notTimedOut: `${emojis.x} The member is not timed out.`,
    uNonMember: `${emojis.rolling_eyes} - ** You can't timeout @{username}. **`,
    invalidMember: `Please specify a valid member.`,
    invalidDuration: `**${emojis.rolling_eyes} - The time limit must be equal to one of the following: (m, h, d, w, mo, y)**`,
    timeoutSuccess: `**${emojis.white_check_mark} @{user} has been timed out!**`,
    untimeoutSuccess: `**${emojis.white_check_mark} @{user} has been untimeouted!**`,
    timeoutError: `${emojis.rolling_eyes} - I couldn't timeout that user. Please double-check my permissions and role position.`,
    untimeoutError: `${emojis.rolling_eyes} - I couldn't untimeout that user. Please double-check my permissions and role position.`,
  },
  rolekick: {
    kickSuccess: `${emojis.white_check_mark} Kicked {count} members with the role \`{role}\`.`,
    kickError: `${emojis.x} There was an error kicking members with the role.`,
    invalidRole: `Invalid role specified.`,
    roleNotFound: `The specified role was not found.`,
    noMembers: `No members found with the specified role.`,
    kickReason: `Kicked for having the role: {role}`,
    ownerOnly: `This command can only be executed by the server owner.`,
  },
};
