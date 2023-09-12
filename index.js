const BoilerplateClient = require("./src/util/client");
const ChalkAdvanced = require("chalk-advanced");

const client = new BoilerplateClient();

client.loginBot().then(() => {
  console.log(
    `${ChalkAdvanced.white("KΞNON")} ${ChalkAdvanced.gray(
      ">"
    )} ${ChalkAdvanced.green("Bot online. ")}`
  );
});
