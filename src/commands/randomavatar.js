const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

// Map to store the cooldowns of each user
const cooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animeavatar")
    .setDescription("Gives you an Anime Avatar.")
    .setDMPermission(false),

  async execute(interaction, client) {
    const userId = interaction.user.id;

    if (cooldowns.has(userId)) {
      const remainingCooldown = getRemainingCooldown(userId);

      const cooldownEmbed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("<:ktime:1135000938021658826> 〢 Cooldown")
        .setDescription(
          `> You are on cooldown! Please wait **${remainingCooldown}** before using again.`,
        );

      await interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
      return;
    }

    // Generate a random avatar URL (you can add more URLs to choose from)
    const avatars = [
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230449765191680/IMG_20230901_200230.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230450213990470/IMG_20230901_200208.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230450587275284/IMG_20230901_200148.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230450956382299/IMG_20230901_200017.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230451283529799/IMG_20230901_200043.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230451623276584/IMG_20230901_200057.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230452151746671/IMG_20230901_195926.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230452436963439/IMG_20230901_195951.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230452671852695/IMG_20230901_145112_218.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230452936102019/IMG_20230901_144349_214.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230505662693546/c2f01745-0aa2-4b25-ace0-05a3ce356280.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230505960493056/IMG_20230901_144351_831.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147230506312794263/Screenshot_2023-09-01-15-12-43-03_99c04817c0de5652397fc8b56c3b3817.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1146940330848038993/0d00d25c-d940-4da8-8abf-ac20d59e5666.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147231620626141224/00608937-1e5b-4c08-8b98-7f202919b8ca.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147231624593944607/2bd78bb3-ef1f-477e-854f-1fbdefb1258b.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147231645846470736/59350c71-69fc-4d78-a49e-d3c72f2b8fd8.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147231650367934614/fb270841-9045-4d7f-8272-e587e02879fe.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147232227621609472/efb2884a-fc54-4e88-8fb1-8af5eeaf1a43.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147232230788309002/b2495d83-0f37-438d-aad5-0e1928d68ab1.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147232234911305909/729d39f3-9ea6-423f-9994-402e25f538e1.jpg",
      "https://cdn.discordapp.com/attachments/1146059682604122264/1147232237855715448/6843e2de-1489-48ec-82dd-d920309f55cd.jpg",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147278675851624508/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147280767819464815/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147280768171782174/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147280768649936966/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281065627635843/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281066139324569/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281066575548597/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281067070459914/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281385602695210/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281386013728818/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281386454143037/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281386718380072/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281683217911938/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281683633148055/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281683926745088/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147281684279070821/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147282336543670433/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147282336870846464/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147282337181216900/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147282337575469066/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147283314986729532/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147283316152733746/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147283320628068413/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147283321089429524/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284734565695620/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284734884450304/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284735207407697/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284735568134235/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284974211444906/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284974500855982/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284974823821433/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147284975121608746/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285263341584558/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285263681343488/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285263987511326/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285264356626614/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285732587741285/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285733195927593/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285733686648973/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147285734152224898/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286135505162360/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286135891046511/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286136213999677/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286136482451536/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286573822517319/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286574107742328/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286574409715914/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286574770442270/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286716856676362/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286717158662246/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286717448065064/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286717762654298/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286962802270269/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286963129434203/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286963540471910/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147286964039590009/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147287826178785311/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147287826510127144/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147287826812121188/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147287827147669654/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147288125014540288/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147288125324922880/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147288125652086844/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147288125966647467/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289365089898627/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289365421228062/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289365744201768/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289366113308692/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289630757101709/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289631092650104/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289631424008294/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147289631889563811/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290068105576468/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290068399165460/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290068688584704/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290069019922593/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290654892883988/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290655278776432/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290655677239356/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147290656100843631/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291197442895922/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291197883289600/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291198210453584/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291198504046592/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291477064552468/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291477433659442/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291477853093949/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147291478146682992/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282108595834970/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282109015273532/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282109464051814/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282775368536204/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282775741837312/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282776110927933/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147282776912048311/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147283591445872640/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147283591823380500/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147283592255373443/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147283592628686968/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287245288636486/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287245716467742/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287246307856564/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287246622425098/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287507575259298/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287507944341544/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287508313448528/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147287508678344714/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147288628582678640/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147288629018894416/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147288629614477392/image.png",
      "https://cdn.discordapp.com/attachments/1147281766722326678/1147288629941641416/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147296819366330381/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147296819764809788/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147296820070981632/image.png",
      "https://cdn.discordapp.com/attachments/1005237608051380224/1147296820351991900/image.png",
      "https://media.discordapp.net/attachments/1005237632227352636/1148614953012559943/IMG_20230905_191237_374.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147297899420581928/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147297899907141632/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147297900339150989/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147297900691456050/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298234906198108/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298235220762824/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298235547930645/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298235854110842/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298624154378394/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298624154378394/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298624821276704/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298625186177086/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298870884307074/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298871307948042/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298871723167784/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147298872096469012/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299160081575966/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299160421302293/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299160756858880/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299161264357396/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299453452177428/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299453796106290/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299454093889566/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147299454442029157/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147313599983931422/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147313600340430968/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147313600713732117/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147313601053458472/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314300092944464/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314300743073792/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314301103771718/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314490464022660/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314490791165962/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314491088978010/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147314491466448977/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147315387361402900/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147315387629842432/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147315387952795659/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147315388238012516/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316077806764043/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316078159069357/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316078444298312/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316078788235395/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316649276477470/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316649540714616/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316649947574292/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316650341826651/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316935365763072/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316935743254539/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316936045240330/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147316936364011580/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317165108768808/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317166333501570/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317166643884072/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317167109443744/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317379374792725/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317379785822360/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317380150738944/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317380503048324/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317696724217877/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317697013620887/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317697344983181/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147317697651159100/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318050090143834/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318050572472371/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318050970947724/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318051314864188/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318656225775697/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318656620048455/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318656225775697/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318656620048455/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318656947212341/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318657291137034/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318956768632893/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318957154512926/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318957544575027/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147318957817213028/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147319217859874906/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147319218228957364/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147319218568704131/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147319218921033849/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320012319764591/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320012655317062/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320012978262136/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320013313814588/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320251097288814/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320251495755866/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320251990675467/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320252456251454/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320610704334878/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320611073441812/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320611681611967/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147320612335919144/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147321149835976824/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147321150326722580/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147321150830018660/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147321151241080852/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147321945654829216/image.png",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147494416496463985/ideogram_3.jpg",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147494416811040768/ideogram_2.jpg",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147494417129803822/ideogram_1.jpg",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1147494417641513113/ideogram.jpg",
      "https://cdn.discordapp.com/attachments/1147922249240817735/1148615835678687273/IMG_20230905_000207_014.jpg",
      "https://cdn.discordapp.com/attachments/1147922249240817735/1148615836026802298/IMG_20230905_000211_317.jpg",
      "https://cdn.discordapp.com/attachments/1147922249240817735/1148615836391714828/IMG_20230904_232646_560.jpg",
      "https://cdn.discordapp.com/attachments/1147922249240817735/1148615836689502299/IMG_20230904_220756_477.jpg",
      "https://cdn.discordapp.com/attachments/1147922249240817735/1148614706836287619/IMG_20230905_191237_374.png",
      "https://cdn.discordapp.com/attachments/1147922249240817735/1147936512172904538/IMG_20230903_214111_394.jpg",
      "https://cdn.discordapp.com/attachments/1147297664153686046/1148699826339446794/image.png",
    ];

    const randomavatarURL = avatars[Math.floor(Math.random() * avatars.length)];

    // Get the current count of avatars
    const avatarCount = avatars.length;

    const avatarEmbed = new EmbedBuilder()
      .setColor("#35393e")
      .setTitle("<:khuman:1135001368185286726>  〢 Random Anime Avatar")
      .setDescription(
        `>>> There are currently **${avatarCount}** avatars in my Database.`,
      )
      .setImage(randomavatarURL);

    await interaction.reply({
      embeds: [avatarEmbed],
    });
    // Apply cooldown to the user
    setCooldown(userId);

    setTimeout(() => {
      removeCooldown(userId);
    }, 10000); // 10 seconds cooldown
  },
};

function getRemainingCooldown(userId) {
  const cooldownEnd = cooldowns.get(userId);
  const remainingTime = cooldownEnd - Date.now();
  const minutes = Math.ceil(remainingTime / 1000);
  return `${minutes} second(s)`;
}

function setCooldown(userId) {
  const cooldownEnd = Date.now() + 10000; // 10 seconds cooldown
  cooldowns.set(userId, cooldownEnd);
}

function removeCooldown(userId) {
  cooldowns.delete(userId);
}
