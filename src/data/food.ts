export type FoodBuy = {
  who: string;
  role: string;
  item: string;
  buff: string;
  href: string;
};

export const foodBuys: FoodBuy[] = [
  {
    who: "Lvx",
    role: "hunter",
    item: "Redridge Goulash",
    buff: "+6 stamina, +6 spirit for 15 min. Eat from 14. Cooking 100. The pet does not get this.",
    href: "https://www.wowhead.com/forever/item=1082/redridge-goulash",
  },
  {
    who: "Dvx",
    role: "rogue",
    item: "Redridge Goulash",
    buff: "Same stamina food as Lvx.",
    href: "https://www.wowhead.com/forever/item=1082/redridge-goulash",
  },
  {
    who: "Dorpan",
    role: "warrior",
    item: "Redridge Goulash",
    buff: "Same stamina food. No strength food exists at cooking 125.",
    href: "https://www.wowhead.com/forever/item=1082/redridge-goulash",
  },
  {
    who: "Chorrengodx",
    role: "shaman",
    item: "Smoked Sagefish",
    buff: "3 mana every 5 sec for 15 min. Eat from 14. Cooking 80. Take the goulash when the hits hurt more than the mana.",
    href: "https://www.wowhead.com/forever/item=21072/smoked-sagefish",
  },
  {
    who: "Whilind",
    role: "priest",
    item: "Smoked Sagefish",
    buff: "Same mana food. It keeps ticking while she casts.",
    href: "https://www.wowhead.com/forever/item=21072/smoked-sagefish",
  },
];
