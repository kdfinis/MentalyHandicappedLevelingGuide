export type DamageLine = {
  item: string;
  href: string;
  note: string;
};

export type DamageBuy = {
  who: string;
  role: string;
  lines: DamageLine[];
};

const agilityScroll: DamageLine = {
  item: "Scroll of Agility",
  href: "https://www.wowhead.com/forever/item=3012/scroll-of-agility",
  note: "+5 agility for 30 min.",
};

const strengthScroll: DamageLine = {
  item: "Scroll of Strength",
  href: "https://www.wowhead.com/forever/item=954/scroll-of-strength",
  note: "+5 strength for 30 min.",
};

const giant: DamageLine = {
  item: "Elixir of Giant Growth",
  href: "https://www.wowhead.com/forever/item=6662/elixir-of-giant-growth",
  note: "+8 strength for 2 min. Drink it on a hard pull. If the strength scroll drops off, use the scroll again after.",
};

const coarseSharp: DamageLine = {
  item: "Coarse Sharpening Stone",
  href: "https://www.wowhead.com/forever/item=2863/coarse-sharpening-stone",
  note: "+3 weapon damage for 30 min. Swords, axes, daggers. Until 15.",
};

const heavySharp: DamageLine = {
  item: "Heavy Sharpening Stone",
  href: "https://www.wowhead.com/forever/item=2871/heavy-sharpening-stone",
  note: "+4 weapon damage for 30 min. From 15. Replaces the coarse stone.",
};

const coarseWeight: DamageLine = {
  item: "Coarse Weightstone",
  href: "https://www.wowhead.com/forever/item=3240/coarse-weightstone",
  note: "+3 weapon damage for 30 min. Maces and staves. Until 15.",
};

const heavyWeight: DamageLine = {
  item: "Heavy Weightstone",
  href: "https://www.wowhead.com/forever/item=3241/heavy-weightstone",
  note: "+4 weapon damage for 30 min. From 15. Replaces the coarse weightstone.",
};

const wisdom: DamageLine = {
  item: "Elixir of Wisdom",
  href: "https://www.wowhead.com/forever/item=3383/elixir-of-wisdom",
  note: "+6 intellect for 1 hour. Spell crit.",
};

const oil: DamageLine = {
  item: "Minor Wizard Oil",
  href: "https://www.wowhead.com/forever/item=20744/minor-wizard-oil",
  note: "+8 spell damage for 30 min. The bottle has 5 uses.",
};

export const damageBuys: DamageBuy[] = [
  {
    who: "Lvx",
    role: "hunter",
    lines: [
      {
        ...agilityScroll,
        note: "+5 agility for 30 min. This is the shot damage. The pet does not get it.",
      },
      {
        item: "Elixir of Minor Agility",
        href: "https://www.wowhead.com/forever/item=2457/elixir-of-minor-agility",
        note: "+4 agility for 1 hour, if the scroll is missing. Agility only. Strength does not raise her shots.",
      },
    ],
  },
  {
    who: "Dvx",
    role: "rogue",
    lines: [
      { ...agilityScroll, note: "+5 agility for 30 min. Attack power and crit." },
      { ...strengthScroll, note: "+5 strength for 30 min. More attack power. Stays up with the agility scroll." },
      giant,
      coarseSharp,
      heavySharp,
    ],
  },
  {
    who: "Dorpan",
    role: "warrior",
    lines: [
      { ...strengthScroll, note: "+5 strength for 30 min. Two attack power per point." },
      { ...agilityScroll, note: "+5 agility for 30 min. Crit." },
      giant,
      {
        item: "Rage Potion",
        href: "https://www.wowhead.com/forever/item=5631/rage-potion",
        note: "20 to 40 rage. 2 min cooldown. Warrior only.",
      },
      coarseSharp,
      heavySharp,
      coarseWeight,
      heavyWeight,
    ],
  },
  {
    who: "Chorrengodx",
    role: "shaman",
    lines: [
      { ...strengthScroll, note: "+5 strength for 30 min. Two attack power per point on melee." },
      { ...agilityScroll, note: "+5 agility for 30 min. Crit." },
      giant,
      wisdom,
      {
        ...oil,
        note: "+8 spell damage for 30 min. Only while Rockbiter and Flametongue are off. One coating on the weapon.",
      },
      {
        ...coarseSharp,
        note: "+3 on a sharp weapon until 15. Skip it while Rockbiter or Flametongue is on.",
      },
      {
        ...heavySharp,
        note: "+4 from 15. Skip it while an imbue is on.",
      },
      {
        ...coarseWeight,
        note: "+3 on a mace until 15. Same rule: no imbue on that weapon.",
      },
      {
        ...heavyWeight,
        note: "+4 from 15. Replaces the coarse weightstone.",
      },
    ],
  },
  {
    who: "Whilind",
    role: "priest",
    lines: [
      wisdom,
      { ...oil, note: "+8 spell damage for 30 min. The wand does not get this." },
      {
        item: "Scroll of Intellect",
        href: "https://www.wowhead.com/forever/item=955/scroll-of-intellect",
        note: "+4 intellect for 30 min, if the elixir is missing.",
      },
    ],
  },
];
