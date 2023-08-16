const Kenon = require("./src/util/client");
const ChalkAdvanced = require("chalk-advanced");

const client = new Kenon();

client.loginBot().then(() => {
  console.log(
    `${ChalkAdvanced.white("KΞNON")} ${ChalkAdvanced.gray(
      ">"
    )} ${ChalkAdvanced.green("Bot online. ")}`
  );
});
