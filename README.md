# Kenon v1
> [!WARNING]
> 
> May be outdated
> ---
> 
> The bot's hasn't been updated since a year and the code is a really mess, so don't expect that it's working, I haven't tested it.

Kenon is a gaming bot with economy. The main key is the "Guess the Picture" part, where players have to guess what's in the image.

How to install:
- run pnpm install
- create a .env
- paste and fill out:
  ```bash
TOKEN= <Your bots token ofc>
GUILD_ID= <The guild id to load slash commands on>
STATUS=DEVELOPMENT <Change to PRODUCTION to load commands on every guild>
STATUSBOT= <The status for your bot>
DISCORDSTATUS=dnd <Change to whatever you want>
```
You'll need a MongoDB in order to run this bot. Paste it into every file that needs the connection.
