export type FoodLine = {
  item: string;
  href: string;
  note: string;
};

export type FoodBuy = {
  who: string;
  role: string;
  lines: FoodLine[];
};

const lizard: FoodLine = {
  item: "Crispy Lizard Tail",
  href: "https://www.wowhead.com/forever/item=5479/crispy-lizard-tail",
  note: "From 14. +3 stamina and +5% kill XP for 15 min. Cooking 100.",
};

const goulash: FoodLine = {
  item: "Redridge Goulash",
  href: "https://www.wowhead.com/forever/item=1082/redridge-goulash",
  note: "+3 intellect and +5% kill XP for 15 min. Cooking 125.",
};

const gumbo: FoodLine = {
  item: "Crocolisk Gumbo",
  href: "https://www.wowhead.com/forever/item=3664/crocolisk-gumbo",
  note: "From 15. +5 agility and the same +5% kill XP. Cooking 120.",
};

const wolf: FoodLine = {
  item: "Lean Wolf Steak",
  href: "https://www.wowhead.com/forever/item=12209/lean-wolf-steak",
  note: "From 15. Same +5 agility and the same +5% kill XP as the gumbo. Cooking 125.",
};

const venison: FoodLine = {
  item: "Lean Venison",
  href: "https://www.wowhead.com/forever/item=5480/lean-venison",
  note: "From 15. +5 strength and the same +5% kill XP. Cooking 110.",
};

export const foodBuys: FoodBuy[] = [
  {
    who: "Lvx",
    role: "hunter",
    lines: [
      { ...lizard, note: "From 14. +3 stamina and +5% kill XP for 15 min. The pet does not get it." },
      gumbo,
      wolf,
      {
        item: "Bristle Whisker Catfish",
        href: "https://www.wowhead.com/forever/item=4593/bristle-whisker-catfish",
        note: "From 15. Same +5% kill XP, plus 8 fishing. Eat this one while fishing.",
      },
    ],
  },
  {
    who: "Dvx",
    role: "rogue",
    lines: [lizard, gumbo, wolf],
  },
  {
    who: "Dorpan",
    role: "warrior",
    lines: [lizard, venison],
  },
  {
    who: "Chorrengodx",
    role: "shaman",
    lines: [
      lizard,
      { ...goulash, note: "From 14, while he is casting. +3 intellect and the same +5% kill XP." },
      venison,
    ],
  },
  {
    who: "Whilind",
    role: "priest",
    lines: [
      { ...goulash, note: "From 14. +3 intellect and +5% kill XP for 15 min. This is her leveling meal." },
      {
        item: "Smoked Sagefish",
        href: "https://www.wowhead.com/forever/item=21072/smoked-sagefish",
        note: "+4 spell damage for 15 min. Cooking 80. The tooltip does not list the kill XP.",
      },
    ],
  },
];
