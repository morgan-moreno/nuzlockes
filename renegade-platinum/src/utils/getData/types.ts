export class DocumentationSection<T> {
  title: string;
  private notes: string[];
  private changes: T[];

  constructor(title: string) {
    this.title = title.trim();
    this.notes = [];
    this.changes = new Array<T>();
  }

  addNote(note: string) {
    this.notes.push(note.trim());
  }
  getNotes() {
    return this.notes;
  }

  addChange(change: any) {
    if (typeof change === "string") {
      // @ts-ignore
      this.changes.push(change.trim());
    } else {
      this.changes.push(change);
    }
  }
  getChanges() {
    return this.changes;
  }
}

// =========================== MOVE CHANGES =========================== //
export interface CreateMoveChange {
  move: string;
  type: MoveChangeType;
}

export enum MoveChangeType {
  CHANGE = "General Changes",
  REPLACE = "Move Replacements",
  MODIFY = "Move Modifications",
}

export class MoveChange {
  public move: string;
  public type: MoveChangeType;

  constructor({ move, type }: CreateMoveChange) {
    this.move = move.trim();
    this.type = type;
  }
}

export interface CreateGeneralMoveChange extends Omit<MoveChange, "type"> {
  change: string;
}

export class GeneralMoveChange extends MoveChange {
  public change: string;

  constructor({ move, change }: CreateGeneralMoveChange) {
    super({ move, type: MoveChangeType.CHANGE });
    this.change = change.trim();
  }
}

export interface CreateMoveReplacement extends Omit<MoveChange, "type"> {
  newMove: string;
}

export class MoveReplacement extends MoveChange {
  public newMove: string;

  constructor({ move, newMove }: CreateMoveReplacement) {
    super({ move, type: MoveChangeType.REPLACE });
    this.newMove = newMove.trim();
  }
}

export interface CreateMoveModification extends Omit<MoveChange, "type"> {
  modifications?: Modification;
}

export class MoveModification extends MoveChange {
  public modifications: Modification;

  constructor({ move, modifications }: CreateMoveModification) {
    super({ move, type: MoveChangeType.MODIFY });
    this.modifications = modifications ?? {};
  }

  setModification(key: keyof Modification, value: string) {
    this.modifications[key] = value.trim();
  }
}

export class Modification {
  power?: string;
  pp?: string;
  accuracy?: string;
  type?: string;
  effect?: string;
  recovery?: string;
}

// =========================== ITEM CHANGES =========================== //
export interface CreateItemChange {
  item: string;
  change: string;
}

export class ItemChange {
  public item: string;
  public change: string;

  constructor({ item, change }: ItemChange) {
    this.item = item;
    this.change = change;
  }
}

export interface CreateItemLocationChange {
  item: string;
  locations: string[];
  obtained?: string;
}

export class ItemLocationChange extends ItemChange {
  public locations: string[];
  public obtained: string;

  constructor({ item, locations, obtained }: CreateItemLocationChange) {
    super({ item, change: "Location has changed" });
    this.locations = locations;
    this.obtained = obtained ?? "";
  }
}

export interface CreateReplacedItemChange {
  item: string;
  oldItem: string;
  newItem: string;
}

export class ReplacedItemChange extends ItemChange {
  public oldItem: string;
  public newItem: string;

  constructor({ item, oldItem, newItem }: CreateReplacedItemChange) {
    super({
      item,
      change: "Item has been replaced with items from other games.",
    });
    this.oldItem = oldItem;
    this.newItem = newItem;
  }
}

// =========================== EVOLUTION CHANGES =========================== //
export enum EvolutionChangeType {
  ITEM = "Item Interaction Changes",
  LEVEL = "Level Changes",
  METHOD = "Method Changes",
}

export interface CreateEvolutionChange {
  changeType: EvolutionChangeType;
  preEvolutionMon: string;
  postEvolutionMon: string;
  change: string;
}

export class EvolutionChange {
  public changeType: EvolutionChangeType;
  public preEvolutionMon: string;
  public postEvolutionMon: string;
  public change: string;

  constructor({
    changeType,
    preEvolutionMon,
    postEvolutionMon,
    change,
  }: CreateEvolutionChange) {
    this.changeType = changeType;
    this.preEvolutionMon = preEvolutionMon.trim();
    this.postEvolutionMon = postEvolutionMon.trim();
    this.change = change.trim();
  }
}

// =========================== NPC CHANGES =========================== //
export interface CreateNPCChange {
  name: string;
  location: string;
  changes: string[];
}

export class NPCChange {
  public name: string;
  public location: string;
  public changes: string[];

  constructor({ name, location, changes }: CreateNPCChange) {
    this.name = name;
    this.location = location;
    this.changes = changes;
  }
}

// =========================== POKEMON CHANGES =========================== //

export class PokemonChange {
  public change: string;

  constructor(change: string) {
    this.change = change.trim();
  }
}

export interface CreateSpecificPokemonChange {
  id: string;
  pokemon: string;
  levelUpMoves: Move[];
  oldAbility?: string;
  newAbility?: string;
  oldType?: string;
  newType?: string;
  moves?: string[];
  oldBaseStats?: IVs;
  newBaseStats?: IVs;
  evolution?: string[];
}
export interface Move {
  level: number;
  move: string;
}

export class SpecificPokemonChange {
  public id: string;
  public pokemon: string;
  public oldAbility?: string;
  public newAbility?: string;
  public newType?: string;
  public oldType?: string;
  public moves?: string[];
  public oldBaseStats?: IVs;
  public newBaseStats?: IVs;
  public levelUpMoves: Move[];
  public evolution?: string[];

  constructor({
    id,
    pokemon,
    levelUpMoves,
    oldAbility,
    newAbility,
    oldBaseStats,
    newBaseStats,
    newType,
    oldType,
    moves,
    evolution,
  }: CreateSpecificPokemonChange) {
    this.id = id;
    this.pokemon = pokemon;
    this.levelUpMoves = levelUpMoves;
    this.oldAbility = oldAbility;
    this.newAbility = newAbility;
    this.oldBaseStats = oldBaseStats;
    this.newBaseStats = newBaseStats;
    this.newType = newType;
    this.oldType = oldType;
    this.moves = moves;
    this.evolution = evolution;
  }
}

// =========================== TRADE CHANGES =========================== //
export interface CreateTradeChange {
  location: string;
  description: string;
  receive: TradeChangeRecieve;
}

export interface TradeChangeRecieve {
  name: string;
  pokemon: string;
  item: string;
  ivs: IVs;
  nature: string;
}

export class TradeChange {
  location: string;
  description: string;
  receive: TradeChangeRecieve;
  constructor({ location, description, receive }: CreateTradeChange) {
    this.location = location.trim();
    this.description = description.trim();
    this.receive = receive;
  }
}

// =========================== TRAINER POKEMON =========================== //
export interface CreateTrainer {
  name: string;
}
export class Trainer<T> {
  name: string;
  pokemon: T[];

  constructor({ name }: CreateTrainer) {
    this.name = name.trim().replace("(!)", "");
    this.pokemon = [];
  }

  addPokemon(pokemon: T) {
    this.pokemon.push(pokemon);
  }
}
export class Rematch extends Trainer<PokemonSet> {
  rematchCriteria: string;
  constructor(name: string) {
    super({ name: name.replace(/\(\d*\w*\)/, "") });
    this.rematchCriteria = name.split("(")[1][0];
  }
}

export type RegularTrainer = Trainer<PokemonSet>;
export type Boss = Trainer<BossPokemonSet>;

export class TrainerPokemonAreaChange {
  location: string;
  trainers: RegularTrainer[];
  blockedTrainers: RegularTrainer[];
  bosses: Boss[];
  rematches: RegularTrainer[];

  constructor(location: string) {
    this.location = location.trim();
    this.trainers = [];
    this.blockedTrainers = [];
    this.bosses = [];
    this.rematches = [];
  }

  addTrainer(trainer: RegularTrainer) {
    this.trainers.push(trainer);
  }

  addBlockedTrainer(trainer: RegularTrainer) {
    this.blockedTrainers.push(trainer);
  }

  addBoss(boss: Boss) {
    this.bosses.push(boss);
  }

  addRematch(trainer: RegularTrainer) {
    this.rematches.push(trainer);
  }
}
export interface CreatePokemonSet {
  name: string;
  level: number;
  moveset?: string[];
  ivs?: IVs;
  ability?: string;
  item?: string;
  nature?: string;
}
export class PokemonSet {
  name: string;
  level: number;
  constructor({ name, level }: CreatePokemonSet) {
    this.name = name;
    this.level = level;
  }
}
export class BossPokemonSet extends PokemonSet {
  ivs: IVs;
  moveset: string[];
  ability?: string;
  item?: string;
  nature?: string;

  constructor({
    name,
    level,
    ivs,
    moveset,
    ability,
    item,
    nature,
  }: CreatePokemonSet) {
    super({ name, level });
    this.ivs = ivs ?? {
      hp: 31,
      atk: 31,
      def: 31,
      spa: 31,
      spd: 31,
      spe: 31,
    };
    this.moveset = moveset || new Array<string>();
    this.ability = ability ?? "";
    this.item = item ?? "";
    this.nature = nature ?? "";
  }
}

// =========================== TYPE CHANGES =========================== //

export interface CreateTypeChange {
  pokemon: {
    id: string;
    name: string;
  };
  oldType: string;
  newType: string;
  justification: string;
}

export class TypeChange {
  pokemon: {
    id: string;
    name: string;
  };
  oldType: string;
  newType: string;
  justification: string;
  constructor({ pokemon, oldType, newType, justification }: CreateTypeChange) {
    this.pokemon = {
      id: pokemon.id.trim(),
      name: pokemon.name.trim(),
    };
    this.oldType = oldType.trim();
    this.newType = newType.trim();
    this.justification = justification.trim();
  }
}

// =========================== WILD POKEMON =========================== //

export type EncounterType =
  | "Surf"
  | "Old Rod"
  | "Good Rod"
  | "Super Rod"
  | "Morning"
  | "Day"
  | "Night"
  | "Poké Radar"
  | "Honey Tree";

export class Encounter {
  type: EncounterType;
  odds: EncounterOdds[];

  constructor(type: EncounterType, odds?: EncounterOdds[]) {
    this.type = type;
    this.odds = odds ?? [];
  }

  addOdds(odds: EncounterOdds) {
    this.odds.push(odds);
  }
}

export class EncounterOdds {
  pokemon: string;
  change: string;

  constructor(pokemon: string, change?: string) {
    this.pokemon = pokemon;
    this.change = this.formatChangeString(change);
  }

  private formatChangeString(change?: string) {
    return change?.replace("(", "").replace(")", "").trim() ?? "NO_CHANGE";
  }
}

export class WildPokemonAreaChange {
  location: string;
  encounters: Encounter[];

  constructor(location: string) {
    this.location = location.trim();
    this.encounters = [];
  }

  addEncounter(encounter: Encounter) {
    this.encounters.push(encounter);
  }
}

export enum Nature {
  ADAMANT = "Adamant",
  BASHFUL = "Bashful",
  BOLD = "Bold",
  BRAVE = "Brave",
  CALM = "Calm",
  CAREFUL = "Careful",
  DOCILE = "Docile",
  GENTLE = "Gentle",
  HARDY = "Hardy",
  HASTY = "Hasty",
  IMPISH = "Impish",
  JOLLY = "Jolly",
  LAX = "Lax",
  LONELY = "Lonely",
  MILD = "Mild",
  MODEST = "Modest",
  NAIVE = "Naive",
  NAUGHTY = "Naughty",
  QUIET = "Quiet",
  QUIRKY = "Quirky",
  RASH = "Rash",
  RELAXED = "Relaxed",
  SASSY = "Sassy",
  SERIOUS = "Serious",
  TIMID = "Timid",
}

export interface IVs {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}
