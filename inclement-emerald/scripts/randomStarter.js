var args = process.argv.slice(2);

if (args.length > 0) {
  // console.debug("[DEBUG] Args: ", args);

  const region = args[0];

  const starters = {
    Alola: ["Rowlet", "Litten", "Popplio"],
    Kalos: ["Chespin", "Fennekin", "Froakie"],
    Unova: ["Snivy", "Tepig", "Oshawott"],
    Sinnoh: ["Turtwig", "Chimchar", "Piplup"],
    Hoenn: ["Treecko", "Torchic", "Mudkip"],
    Johto: ["Chikorita", "Cyndiquil", "Totodile"],
    Kanto: ["Bulbasaur", "Charmander", "Squirtle"],
  };

  const starterOptions = starters[region];

  const index = Math.floor(Math.random() * starterOptions.length);

  const starter = starterOptions[index];

  console.log("Starter: ", starter);
} else {
  console.error("[ERROR] Args: region name is required");
}
