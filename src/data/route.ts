export type StartId = "elwynn" | "coldridge";

export type MapId =
  | "elwynn"
  | "dunmorogh"
  | "westfall"
  | "loch"
  | "wetlands"
  | "ironforge"
  | "stormwind"
  | "duskwood"
  | "redridge"
  | "hillsbrad"
  | "stv"
  | "tirisfal";

export type Line = {
  who: string;
  text: string;
  way?: string;
  map?: MapId;
  link?: string;
  href?: string;
};

export type Block = { title: string; lines: Line[] };

export type Stage = {
  id: string;
  level: number;
  dungeon?: boolean;
  elwynn: Block;
  coldridge: Block;
};

const q = (id: number, slug: string) => `https://www.wowhead.com/forever/quest=${id}/${slug}`;
const item = (id: number, slug: string) => `https://www.wowhead.com/forever/item=${id}/${slug}`;
const spell = (id: number, slug: string) => `https://www.wowhead.com/forever/spell=${id}/${slug}`;

function L(who: string, text: string, way?: string, map?: MapId, link?: string, href?: string): Line {
  return { who, text, way, map, link, href };
}

function pack(
  level: number,
  elwynnTitle: string,
  elwynn: Line[],
  coldridgeTitle: string,
  coldridge: Line[],
  dungeon?: boolean,
): Stage {
  return {
    id: `l${String(level).padStart(2, "0")}`,
    level,
    dungeon,
    elwynn: { title: elwynnTitle, lines: elwynn },
    coldridge: { title: coldridgeTitle, lines: coldridge },
  };
}

function same(level: number, title: string, lines: Line[], dungeon?: boolean): Stage {
  return pack(level, title, lines, title, lines, dungeon);
}

export const parties: Record<StartId, { name: string; role: string }[]> = {
  elwynn: [
    { name: "Lvx", role: "human hunter. Tailor, herb." },
    { name: "Dvx", role: "human rogue. Mine, enchant." },
  ],
  coldridge: [
    { name: "Chorrengodx", role: "dwarf shaman." },
    { name: "Dorpan", role: "gnome warrior. Mine, smith." },
    { name: "Whilind", role: "gnome priest." },
  ],
};

export const stages: Stage[] = [
  pack(
    1,
    "Northshire",
    [
      L("Lvx", "Nancy Songflower, Herbalism Trainer", "52.4 43.8", "elwynn"),
      L("Dvx", "Kelsey Fargo, Mining Trainer", "47.2 32.3", "elwynn"),
      L("Lvx", "Pick up from Deputy Willem. Share the quest.", "48.2 43.0", "elwynn"),
      L("Lvx", "Turn in to Marshal McBride. Both of you.", "48.9 41.6", "elwynn"),
      L("Lvx", "wolves. Eagan Peltskinner. Share the quest.", "48.9 40.2", "elwynn"),
      L("Dvx", "same wolves"),
    ],
    "Coldridge",
    [
      L("Chorrengodx", "dwarf shaman. Ask a guard. Gnome cannot be shaman."),
      L("all", "spawn", "29.9 72.0", "dunmorogh"),
      L("Dorpan", "Pick up from Sten Stoutarm. Share the quest.", "29.9 71.3", "dunmorogh"),
      L("all", "Emrys Flintbeard, Herbalism Trainer", "28.8 66.6", "dunmorogh"),
      L("Dorpan", "Sally Swiftwrench, Mining Trainer", "28.9 67.8", "dunmorogh"),
      L("Chorrengodx", "water. Adlin Pridedrift", "30.0 71.6", "dunmorogh", "Refreshing Spring Water", item(159, "refreshing-spring-water")),
      L("Whilind", "same water"),
    ],
  ),
  pack(
    2,
    "Kobolds",
    [
      L("Lvx", "kobolds. Marshal McBride. Share the quest.", "48.9 41.6", "elwynn"),
      L("Lvx", "books. Brother Paxton. Share the quest.", "49.6 40.4", "elwynn"),
      L("Dvx", "same camps"),
    ],
    "Troll cave",
    [
      L("Dorpan", "Pick up from Grelin Whitebeard. Share the quest.", "25.0 75.6", "dunmorogh"),
      L("all", "stay on the boss"),
    ],
  ),
  pack(
    3,
    "Echo Ridge",
    [
      L("Dvx", "Turn in to Kelsey Fargo. Mining Consultant", "47.2 32.3", "elwynn"),
      L("Dvx", "Pick up from Brother Paxton. Share the quest.", "49.6 40.4", "elwynn"),
      L("Lvx", "Big Picture. Turn in to Marshal McBride", "48.9 41.6", "elwynn"),
    ],
    "Cave",
    [L("all", "same boss")],
  ),
  pack(
    4,
    "Books, or the dock",
    [
      L("Lvx", "kobold books. Brother Paxton", "49.6 40.4", "elwynn"),
      L("Lvx", "Tordrin Sternblade, Hunter Trainer", "51.2 40.9", "elwynn"),
      L("Dvx", "Jorik Kerridan, Rogue Trainer", "50.5 40.0", "elwynn"),
      L("Dvx", "dock. Jerod's Landing. No pin."),
    ],
    "Out of the cave",
    [L("all", "Turn in to Mountaineer Thalos", "33.4 71.9", "dunmorogh")],
  ),
  pack(
    5,
    "Farms, cook, camp",
    [
      L("Lvx", "farm pigs. Stonefield. No pin."),
      L("Dvx", "same pigs"),
      L("Lvx", "Eldrin, Tailoring Trainer", "79.3 69.1", "elwynn"),
      L("Lvx", "Tomas, Cooking Trainer", "44.3 66.0", "elwynn"),
      L("Lvx", "camp. Sam Sarsaparilla. Sit.", "44.8 63.2", "elwynn"),
      L("Lvx", "herb camp at 20. Herbalist Pomeroy", "39.8 48.4", "elwynn"),
      L("Lvx", "Incense Candle. Int. No stack with Arcane Intellect."),
      L("Lvx", "Faction Banner at tailor 20. Spirit. No stack with Divine Spirit."),
      L("all", "hearth. Innkeeper Farley", "43.8 65.9", "elwynn"),
      L("all", "Rested is kill xp. Log out here."),
    ],
    "Kharanos",
    [
      L("Dorpan", "Tognus Flintfire, Blacksmithing Trainer", "45.3 52.0", "dunmorogh"),
      L("Dorpan", "Rough Weightstone. Blunt. +2. 30 min. 1 Rough Stone.", undefined, undefined, "Rough Weightstone", spell(3115, "rough-weightstone")),
      L("Dorpan", "Rough Sharpening Stone. Blades."),
      L("Dorpan", "Sharpening Wheel at smith 20. Strength. No stack with Strength of Earth."),
      L("all", "hearth. Tannok Frosthammer, Innkeeper Assistant", "47.2 52.1", "dunmorogh"),
      L("all", "Gremlock Pilsnor, Cooking Trainer", "47.6 52.4", "dunmorogh"),
      L("Whilind", "Ice Cold Milk. Innkeeper Belm", "47.4 52.6", "dunmorogh", "Ice Cold Milk", item(1179, "ice-cold-milk")),
      L("Chorrengodx", "same milk"),
      L("Whilind", "Maxan Anvol, Priest Trainer", "47.3 52.3", "dunmorogh"),
      L("all", "camp. Eric Brighthammer", "46.6 53.8", "dunmorogh"),
      L("all", "Rested is kill xp. Log out here."),
    ],
  ),
  pack(
    6,
    "Fish",
    [
      L("Lvx", "Lee Brown, Fishing Trainer. Crystal Lake. No pin."),
      L("Lvx", "Tailor and herb stay the two professions."),
      L("Dvx", "stay with Lvx"),
    ],
    "Earth",
    [L("Chorrengodx", "earth quest. It will not share. Each person picks it up. No pin. Not Earthseer Farsen."), L("Dorpan", "with him"), L("Whilind", "with him")],
  ),
  pack(
    7,
    "Pigs, Rare Books",
    [
      L("Lvx", "Pick up from Marshal Dughan. Share the quest.", "42.2 65.8", "elwynn", "Rare Books", q(91777, "rare-books")),
      L("Lvx", "Turn in to Brother Paxton. Take the bow.", "49.6 40.4", "elwynn"),
      L("Dvx", "Same turn in. Take the sword."),
      L("Lvx", "farm pigs again"),
      L("Lvx", "Peacebloom. Silverleaf."),
    ],
    "Kharanos road",
    [L("all", "stay together")],
  ),
  pack(
    8,
    "Dock",
    [
      L("Lvx", "dock. Linen."),
      L("Dvx", "same dock"),
      L("Lvx", "bolt it. Push tailor to 20."),
    ],
    "Frostmane Hold",
    [L("Dorpan", "Pick up from Senir Whitebeard. Share the quest.", "46.7 53.7", "dunmorogh")],
  ),
  pack(
    9,
    "Dock",
    [L("Lvx", "dock"), L("Dvx", "dock")],
    "Hold",
    [L("all", "stay in Dun Morogh. Hall chain is next.")],
  ),
  pack(
    10,
    "Train",
    [
      L("Lvx", "Tordrin Sternblade, Hunter Trainer. Tame Beast.", "51.2 40.9", "elwynn"),
      L("Dvx", "Keryn Sylvius, Rogue Trainer", "43.8 65.9", "elwynn"),
    ],
    "Beldin",
    [
      L("Dorpan", "Pick up from Beldin Steelgrill. Share the quest.", "50.4 49.0", "dunmorogh"),
      L("all", "Turn in to Earthseer Farsen.", "64.8 58.4", "dunmorogh"),
      L("Dorpan", "Share the next quest."),
      L("Chorrengodx", "class quest. It will not share. Each person picks it up. Needs the three."),
      L("Dorpan", "warrior trainer. Ask a guard."),
    ],
  ),
  pack(
    11,
    "Dock, wolf",
    [
      L("Lvx", "dock"),
      L("Lvx", "tame a level 11 Coyote Packleader. Skip the 12s. Furious Howl. Melee for the group.", "47.2 18.8", "westfall"),
      L("Dvx", "dock"),
    ],
    "Stonesplinter",
    [
      L("all", "troggs. No pin."),
      L("Whilind", "Maxan Anvol, Priest Trainer", "47.3 52.3", "dunmorogh"),
      L("Dorpan", "class quest. It will not share. Each person picks it up."),
    ],
  ),
  pack(
    12,
    "Hogger, Sentinel Hill",
    [
      L("Lvx", "poster. Share the quest with Dvx."),
      L("Lvx, Dvx", "Hogger", "26.4 93.6", "elwynn"),
      L("Lvx, Dvx", "Turn in to Marshal Dughan. Goldshire", "42.2 65.8", "elwynn"),
      L("Lvx", "FP. Gryan Stoutmantle", "56.3 47.5", "westfall"),
      L("Lvx, Dvx", "hearth. Innkeeper Allison", "60.5 75.3", "stormwind"),
      L("Dvx", "Betty Quin, Enchanting Trainer", "43.2 63.8", "stormwind"),
      L("Lvx, Dvx", "tram. Herb and mine already trained."),
      L("Dvx", "Lodestone at mining 20. After Strength of Earth is down."),
    ],
    "Wait in Loch",
    [L("all", "troggs. Chain already on Dorpan.")],
  ),
  same(
    13,
    "Hall of Thanes",
    [

      L("all", "FP", "55.9 47.9", "ironforge"),
      L("all", "spies. Everyone loots a map.", "76.7 60.7", "dunmorogh"),
      L("Dorpan", "Pick up from Earthseer Farsen. Share the quest after the maps. 3190 xp.", "64.8 58.4", "dunmorogh", "Old Ironforge Incursion", q(96393, "old-ironforge-incursion")),
      L("all", "door. Left of the High Seat.", "43.5 52.0", "ironforge"),
      L("all", "portal", "27.8 47.9", "ironforge"),
      L("Whilind", "Pick up from Afadra Dunwall, Lorekeeper. Share the quest.", "33.0 48.0", "ironforge", "The Restless Dead", q(96394, "the-restless-dead")),
      L("Lvx", "Pick up from Thom Filch. Share the quest.", "32.4 44.8", "ironforge", "Important Heirlooms", q(96403, "important-heirlooms")),
      L("Dorpan", "Pick up from Ghostly Attendant. Share the quest.", undefined, undefined, "An Ancient Grudge", q(96395, "an-ancient-grudge")),
      L("all", "tablet. Everyone. It will not share. Each person picks it up.", "39.4 55.8", "ironforge", "The Treaty of Understanding", q(98423, "the-treaty-of-understanding")),
      L("all", "Clear Faldrim, Magmatus, Plunder, Durgen. Kegs first. Pull Plunder back."),
      L("all", "All five turn in to King Magni Bronzebeard before anyone leaves."),
      L("Lvx", "Blunderbuss", undefined, undefined, "Calibrated Blunderbuss", item(279894, "calibrated-blunderbuss")),
      L("Chorrengodx", "Greathammer", undefined, undefined, "Ironforge Greathammer", item(279895, "ironforge-greathammer")),
      L("Dorpan", "Greathammer"),
      L("Whilind", "Deepblaze", undefined, undefined, "Deepblaze", item(279896, "deepblaze")),
    ],
    true,
  ),
  same(14, "Stonesplinter", [
    L("all", "five down from Ironforge"),
    L("Dvx, Dorpan", "Brock Stoneseeker, Mining Trainer. Skill 50.", "37.2 46.8", "loch"),
    L("Lvx", "Kali Healtouch, Herbalism Trainer. Skill 50.", "36.6 48.4", "loch"),
    L("all", "Thelsamar FP together"),
  ]),
  same(15, "One road", [
    L("Full group", "troggs"),
    L("Whilind", "Melon Juice. Thelsamar."),
    L("Chorrengodx", "same juice"),
    L("Dorpan", "fresh weightstones and sharpening stones"),
    L("Full group", "Log out in Thelsamar."),
  ]),
  same(16, "Troggs done", [L("Full group", "finish the yellow camps. Then Westfall.")]),
  same(17, "Sentinel Hill", [
    L("Dvx", "Pick up from Gryan Stoutmantle. Share the quest. Turn it in here later.", "56.3 47.5", "westfall", "The Defias Brotherhood", q(166, "the-defias-brotherhood")),
    L("Full group", "crabs and gnolls while the log fills"),
  ]),
  same(18, "Wells, Lakeshire", [
    L("Lvx", "Pick up from Alba Fairmoon. Share the quest.", "52.4 53.0", "westfall", "Destruction in Deadmines", q(92753, "destruction-in-deadmines")),
    L("Dorpan", "Pick up from Wiley the Black. Share the quest. Turn it in here later.", "21.4 45.4", "redridge"),
    L("Dorpan", "Guard Berton at 22. Dorin Songblade at 24. Share those quests when they are available."),
  ]),
  same(19, "Moonbrook", [
    L("Full group", "door. Do not zone in.", "42 72", "westfall"),
    L("Dvx", "crates, Master Mathias Shaw, dynamite. Share the quest. Turn it in here later. Follow the quest text.", "78.3 70.7", "stormwind"),
    L("Full group", "messenger, then the escort"),
  ]),
  same(
    20,
    "Deadmines",
    [
      L("Dvx", "Pick up from Wilder Thistlenettle. Share the quest. Turn it in here later.", "65 21", "stormwind", "Collecting Memories", q(168, "collecting-memories")),
      L("Dvx", "Pick up the next from the same Wilder Thistlenettle. Share the quest.", "65 21", "stormwind", "Oh Brother", q(167, "oh-brother")),
      L("Dvx", "Pick up from Shoni the Shilent. Share the quest. If share fails, each person picks it up.", "55 13", "stormwind", "Underground Assault", q(2040, "underground-assault")),
      L("Whilind", "Pick up from Scout Riell. Share the quest.", "56.7 47.4", "westfall", "Red Silk Bandanas", q(214, "red-silk-bandanas")),
      L("Full group", "door", "42 72", "westfall"),
      L("Full group", "Clear the dungeon once. Do not reset."),
      L("Full group", "Everyone loots the letter. It will not share."),
      L("Full group", "Turn in to Gryan Stoutmantle", "56.3 47.5", "westfall", "The Defias Brotherhood", q(166, "the-defias-brotherhood")),
      L("Full group", "Turn in to Scout Riell", "56.7 47.4", "westfall"),
      L("Full group", "Turn in to Wilder Thistlenettle", "65 21", "stormwind"),
      L("Full group", "Turn in to Shoni the Shilent", "55 13", "stormwind"),
      L("Full group", "Finish the objective at this pin, then turn in to Alba Fairmoon.", "38.4 83.4", "westfall", "Destruction in Deadmines", q(92753, "destruction-in-deadmines")),
      L("Full group", "letter. Everyone. Baror Alexston.", "57.6 47.8", "stormwind"),
      L("Dvx", "Poisons. Master Mathias Shaw. Old Town. Then Agent Kearnen, Westfall.", "78.3 70.7", "stormwind"),
      L("Dorpan", "Yorus Barleybrew. Lakeshire inn."),
      L("Chorrengodx", "Call of Water. Eldrun Stormbreaker", "47.4 13.6", "ironforge", "Call of Water", q(94494, "call-of-water")),
      L("Chorrengodx", "Turn in to Norric Lochthane. Loch", "41.8 19.0", "loch"),
      L("Chorrengodx", "Water chain on the road. Leave Ashenvale."),
      L("Lvx", "Bags, or sleep. Optional."),
      L("Whilind", "Same. More rested."),
    ],
    true,
  ),
  same(21, "Wetlands",[
    L("Full group", "Dun Algaz into Menethil"),
    L("Full group", "hearth in Menethil"),
    L("Dvx", "Poisons still open if the tower is left."),
    L("Dorpan", "Yorus still open."),
    L("Chorrengodx", "Water chain still open."),
    L("Lvx", "Sleep if they are still out."),
    L("Whilind", "Same."),
  ]),
  same(22, "Gnolls", [
    L("Full group", "Menethil road"),
    L("Dorpan", "Pick up from Guard Berton. Share the quest. Turn it in here later.", "21.2 46.6", "redridge", "What Comes Around", q(386, "what-comes-around")),
  ]),
  same(23, "Dun Modr", [
    L("Full group", "orcs"),
    L("Dorpan", "Pick up from Motley Garmason. Share the quest. May still be grey.", "49.7 18.2", "wetlands", "The Fury Runs Deep", q(378, "the-fury-runs-deep")),
  ]),
  same(24, "Orcs", [L("Full group", "Wetlands orcs")]),
  same(25, "Raptors", [
    L("Whilind", "Sweet Nectar. Menethil."),
    L("Chorrengodx", "same nectar"),
    L("Dvx", "Pick up from James Halloran. Share the quest. Hides on the way.", "8.6 55.7", "wetlands", "Highland Hides", q(98815, "highland-hides")),
  ]),
  same(
    26,
    "Stockade",
    [
      L("Dorpan", "Pick up from Guard Berton. Share the quest. Turn it in here later.", "21.2 46.6", "redridge", "What Comes Around", q(386, "what-comes-around")),
      L("Whilind", "Pick up from Councilman Millstipe. Share the quest. Turn it in here later.", "71.9 47.8", "duskwood", "Crime and Punishment", q(377, "crime-and-punishment")),
      L("Dorpan", "Pick up from Motley Garmason. Share the quest. Dun Modr.", "49.7 18.2", "wetlands", "The Fury Runs Deep", q(378, "the-fury-runs-deep")),
      L("Dvx", "Pick up from Nikova Raskol. Share the quest. Turn it in here later.", "73.8 54.6", "stormwind", "The Color of Blood", q(388, "the-color-of-blood")),
      L("Lvx", "Pick up from Warden Thelwater. Share the quest.", "51.5 69.4", "stormwind", "Quell The Uprising", q(387, "quell-the-uprising")),
      L("Lvx", "Riots. Share the quest after every letter. If share fails, each person picks it up.", "51.5 69.4", "stormwind", "The Stockade Riots", q(391, "the-stockade-riots")),
      L("Full group", "Mage Quarter canal. One clear."),
    ],
    true,
  ),
  same(27, "Darkshire", [
    L("Full group", "FP. Ghouls."),
    L("Whilind", "Pick up from Councilman Millstipe. Share the quest if it is available.", "71.9 47.8", "duskwood", "Crime and Punishment", q(377, "crime-and-punishment")),
  ]),
  same(28, "Raven Hill", [L("Full group", "ghouls")]),
  same(29, "Ghouls", [
    L("Full group", "finish, then the dig"),
    L("Lvx", "Pick up from Dorin Songblade. Share the quest. Turn it in here later.", "25.6 46.6", "redridge", "Songblade Search", q(95772, "songblade-search")),
  ]),
  same(
    30,
    "Excavation",
    [
      L("Lvx", "Pick up from Dorin Songblade. Share the quest. Turn it in here later.", "25.6 46.6", "redridge", "Songblade Search", q(95772, "songblade-search")),
      L("Lvx", "Pick up from Rethiel the Greenwarden. Share the quest.", "56.3 40.3", "wetlands", "Horrors in the Highland", q(95646, "horrors-in-the-highland")),
      L("Whilind", "Pick up from Caitlin Grassman. Share the quest. Menethil.", "11.9 58.8", "wetlands", "Lost in the Thicker Things", q(95647, "lost-in-the-thicket-things")),
      L("Full group", "Skip Ashenvale.", undefined, undefined, "Seeking Caitlin", q(95737, "seeking-caitlin")),
      L("Full group", "above Whelgar. One clear."),
      L("Full group", "relic. Whoever loots. It will not share. Each person picks it up.", undefined, undefined, "Lost Relic Carry", q(95810, "lost-relic-carry")),
      L("Dorpan", "Pick up from Daewwn Songblade. Share the quest.", undefined, undefined, "Fallen in the Fen", q(95795, "fallen-in-the-fen")),
      L("Full group", "Turn in to Dorin Songblade.", "25.6 46.6", "redridge"),
    ],
    true,
  ),
  same(
    31,
    "Dalaran",
    [
      L("Lvx", "Pick up from High Sorcerer Andromath. Share the quest. Turn it in here later.", "37.6 81.6", "stormwind", "Power Overwhelming", q(92489, "power-overwhelming")),
      L("Dvx", "Pick up from Archmage Modera. Share the quest. If Heart will not share, each person picks it up.", undefined, undefined, "Heart of Disruption", q(92458, "heart-of-disruption")),
      L("Dvx", "Pick up the next from the same Archmage Modera. Share the quest.", undefined, undefined, "Starving Arcane", q(92457, "starving-arcane")),
      L("Dvx", "Pick up from Shylamiir. Share the quest.", undefined, undefined, "A Green Sample", q(92456, "a-green-sample")),
      L("Whilind", "Pick up from Magus Olvek. Share the quest.", undefined, undefined, "Past Due", q(96800, "past-due")),
      L("Full group", "Door pin 44.0 30.1 is not confirmed. One clear. Beta-locked in the 24 Oct set."),
    ],
    true,
  ),
  same(
    32,
    "Graveyard, Library",
    [
      L("Whilind", "Pick up from Raleigh the Devout. Share the quest. Turn it in here later.", "51.4 58.4", "hillsbrad", "In the Name of the Light", q(1053, "in-the-name-of-the-light")),
      L("Dorpan", "Pick up from Librarian Mae Paledust. Share the quest. Turn it in here later.", "74.6 12.6", "ironforge", "Mythology of the Titans", q(1050, "mythology-of-the-titans")),
      L("Full group", "Graveyard first. No separate Alliance quest."),
      L("Full group", "Magus Olvek's book is in here", undefined, undefined, "Past Due", q(96800, "past-due")),
    ],
    true,
  ),
  same(33, "Armory", [
    L("Full group", "Herod. One clear. On Raleigh the Devout."),
  ], true),
  same(34, "Southshore", [
    L("Full group", "hearth. FP."),
    L("Whilind", "Moonberry Juice at 35."),
    L("Chorrengodx", "same juice"),
    L("Full group", "Log out here."),
  ]),
  same(
    35,
    "Cathedral",
    [
      L("Full group", "this wing only. One clear."),
      L("Full group", "Turn in to Raleigh the Devout. Southshore.", "51.4 58.4", "hillsbrad", "In the Name of the Light", q(1053, "in-the-name-of-the-light")),
    ],
    true,
  ),
  same(36, "Refuge Pointe", [L("Full group", "FP from Southshore. Farm the road.")]),
  same(37, "Out of Arathi", [L("Full group", "when quests go green, south to Stranglethorn")]),
  same(38, "Rebel Camp", [L("Full group", "FP. Nesingwary, then the north camps.")]),
  same(
    39,
    "Drowned City",
    [
      L("Full group", "one swim. West of Grom'gol. No confirmed pin."),
      L("Full group", "No Alliance quest.", undefined, undefined, "Ancient Gurubashi Idol", q(96774, "ancient-gurubashi-idol")),
      L("Full group", "back to Rebel Camp"),
    ],
    true,
  ),
  same(40, "Booty Bay", [
    L("Full group", "FP. Hand in. Stop."),
    L("Full group", "Next door is Riverglades and Krol'dok."),
  ]),
];

export type FilterId = "to10" | "to20" | "to30" | "to40";

export const filters: { id: FilterId; label: string }[] = [
  { id: "to10", label: "1–10" },
  { id: "to20", label: "11–20" },
  { id: "to30", label: "21–30" },
  { id: "to40", label: "31–40" },
];

export function bandForLevel(level: number): FilterId {
  if (level <= 10) return "to10";
  if (level <= 20) return "to20";
  if (level <= 30) return "to30";
  return "to40";
}

export function matches(stage: Stage, filter: FilterId) {
  switch (filter) {
    case "to10":
      return stage.level <= 10;
    case "to20":
      return stage.level >= 11 && stage.level <= 20;
    case "to30":
      return stage.level >= 21 && stage.level <= 30;
    case "to40":
      return stage.level >= 31;
    default: {
      const neverFilter: never = filter;
      return neverFilter;
    }
  }
}

export function blockFor(stage: Stage, start: StartId) {
  return stage.level >= 13 ? stage.elwynn : stage[start];
}
