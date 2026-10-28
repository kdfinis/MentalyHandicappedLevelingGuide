export type Bonus = {
  id: string;
  name: string;
  pct: string;
  note: string;
  href?: string;
};

export const bonuses: Bonus[] = [
  {
    id: "catfish",
    name: "Bristle Whisker Catfish",
    pct: "+5% kill XP",
    note: "Level 15. Same +5% kill XP as the other meals. Also +8 fishing. Eat 10 sec. 15 min.",
    href: "https://www.wowhead.com/forever/item=4593/bristle-whisker-catfish",
  },
  {
    id: "food",
    name: "Cooked food",
    pct: "+5% kill XP",
    note: "Any meal whose tooltip says it. Kills only. Sit 10 sec. 15 min. Drops on death.",
  },
  {
    id: "rested",
    name: "Rested",
    pct: "Kill XP doubled",
    note: "Inn or capital. 5% of a level per 8 hours. Cap 150%.",
  },
  {
    id: "bag",
    name: "Cozy Sleeping Bag",
    pct: "+3% XP",
    note: "1% a minute. 3 min. 2 hours. Level 14. Also builds rested.",
    href: "https://www.wowhead.com/forever/item=211527/cozy-sleeping-bag",
  },
  {
    id: "tent",
    name: "Camp Tent",
    pct: "Rested, 5% of a level",
    note: "Sit by a leatherworker tent. Stops at 5% of a level.",
  },
];
