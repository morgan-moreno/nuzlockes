class Nature {
  name;
  increased;
  decreased;

  constructor(name, increased, decreased) {
    this.name = name;
    this.increased = increased;
    this.decreased = decreased;
  }

  toString() {
    if (this.increased && this.decreased) {
      return `${this.name}: +1 ${this.increased} / -1 ${this.decreased}`;
    } else {
      return `${this.name}: NEUTRAL`;
    }
  }
}

const natures = [
  new Nature("Hardy", "", ""),
  new Nature("Lonely", "Atk", "Def"),
  new Nature("Brave", "Atk", "Spe"),
  new Nature("Adamant", "Atk", "SpA"),
  new Nature("Naughty", "Atk", "SpD"),
  new Nature("Bold", "Def", "Atk"),
  new Nature("Docile", "", ""),
  new Nature("Relaxed", "Def", "Spe"),
  new Nature("Impish", "Def", "SpA"),
  new Nature("Lax", "Def", "SpD"),
  new Nature("Timid", "Spe", "Atk"),
  new Nature("Hasty", "Spe", "Def"),
  new Nature("Serious", "", ""),
  new Nature("Jolly", "Spe", "SpA"),
  new Nature("Naive", "Spe", "SpD"),
  new Nature("Modest", "SpA", "Atk"),
  new Nature("Mild", "SpA", "Def"),
  new Nature("Quiet", "SpA", "Spe"),
  new Nature("Bashful", "", ""),
  new Nature("Rash", "SpA", "SpD"),
  new Nature("Calm", "SpD", "Atk"),
  new Nature("Gentle", "SpD", "Def"),
  new Nature("Sassy", "SpD", "Spe"),
  new Nature("Careful", "SpD", "SpA"),
  new Nature("Quirky", "", ""),
];

const args = process.argv.slice(2);

if (args.length > 0) {
  const natureName = args[0];

  const nature = natures.find((n) => n.name === natureName);

  console.log("Nature: ", nature.toString());
} else {
  console.error("[ERROR] Args: Nature name is required");
}
