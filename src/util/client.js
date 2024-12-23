// Main Bot Library's
const {
  Client,
  GatewayIntentBits,
  Options,
  Collection,
} = require("discord.js");

require("dotenv").config();

const EventHandler = require("./eventLoader");

module.exports = class Kenon extends Client {
  constructor(customCacheOptions = {}) {
    super({
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
      ],
      makeCache: Options.cacheWithLimits({
        BaseGuildEmojiManager: 0,
        GuildBanManager: 0,
        GuildInviteManager: 0,
        GuildStickerManager: 0,
        PresenceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        CategoryChannelChildManager: 0,
        MessageManager: 20000,
        ReactionUserManager: {
          maxSize: 1000000,
          sweepFilter: () => userFilter,
          sweepInterval: 5 * 60 * 1000,
        },
        UserManager: {
          maxSize: 1000000,
          sweepFilter: () => userFilter,
          sweepInterval: 5 * 60 * 1000,
        },
        GuildMemberManager: {
          maxSize: 1000000,
          sweepFilter: () => userFilter,
          sweepInterval: 5 * 60 * 1000,
        },
        ...customCacheOptions,
      }),
    });

    this.commands = new Collection();

    this.eventHandler = new EventHandler(this);
    this.eventHandler.load();
  }

  loginBot() {
    return this.login(process.env.TOKEN);
  }
};
