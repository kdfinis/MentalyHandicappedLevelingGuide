const item = (id: number, slug: string) => `https://www.wowhead.com/forever/item=${id}/${slug}`;

const rows: { who: string; role: string; bits: { item: string; href: string }[]; note: string }[] = [
  {
    who: "Lvx",
    role: "hunter",
    bits: [
      { item: "Lizard Tail", href: item(5479, "crispy-lizard-tail") },
      { item: "Gumbo", href: item(3664, "crocolisk-gumbo") },
      { item: "Catfish", href: item(4593, "bristle-whisker-catfish") },
      { item: "Agility scroll", href: item(3012, "scroll-of-agility") },
    ],
    note: "14, then agility food at 15. Catfish while fishing.",
  },
  {
    who: "Dvx",
    role: "rogue",
    bits: [
      { item: "Lizard Tail", href: item(5479, "crispy-lizard-tail") },
      { item: "Gumbo", href: item(3664, "crocolisk-gumbo") },
      { item: "Agility scroll", href: item(3012, "scroll-of-agility") },
      { item: "Strength scroll", href: item(954, "scroll-of-strength") },
      { item: "Sharpening stone", href: item(2863, "coarse-sharpening-stone") },
    ],
    note: "Stone +3, then +4 at 15.",
  },
  {
    who: "Dorpan",
    role: "warrior",
    bits: [
      { item: "Lizard Tail", href: item(5479, "crispy-lizard-tail") },
      { item: "Lean Venison", href: item(5480, "lean-venison") },
      { item: "Strength scroll", href: item(954, "scroll-of-strength") },
      { item: "Rage Potion", href: item(5631, "rage-potion") },
      { item: "Sharpening stone", href: item(2863, "coarse-sharpening-stone") },
    ],
    note: "Venison at 15. Weightstone if the weapon is a mace.",
  },
  {
    who: "Chorrengodx",
    role: "shaman",
    bits: [
      { item: "Lean Venison", href: item(5480, "lean-venison") },
      { item: "Goulash", href: item(1082, "redridge-goulash") },
      { item: "Strength scroll", href: item(954, "scroll-of-strength") },
    ],
    note: "Goulash if he is casting. No stone on Rockbiter.",
  },
  {
    who: "Whilind",
    role: "priest",
    bits: [
      { item: "Goulash", href: item(1082, "redridge-goulash") },
      { item: "Wisdom", href: item(3383, "elixir-of-wisdom") },
      { item: "Wizard oil", href: item(20744, "minor-wizard-oil") },
    ],
    note: "Goulash is the kill XP. Oil does not buff the wand.",
  },
];

export function ConsumeSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6" aria-label="Consume">
      <p className="text-sm text-muted-foreground">
        14–15, Auction House. Food is +5% kill XP. Sit 10 seconds. One Well Fed. One scroll per stat. One coating on the weapon.
      </p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {rows.map((row) => (
          <li key={row.who}>
            <span className="text-primary">{row.who}</span> <span className="text-muted-foreground">{row.role}.</span>{" "}
            {row.bits.map((bit, index) => (
              <span key={bit.item}>
                {index > 0 ? <span className="text-muted-foreground"> · </span> : null}
                <a
                  href={bit.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-primary/50 underline-offset-2 hover:decoration-primary"
                >
                  {bit.item}
                </a>
              </span>
            ))}
            <span className="text-muted-foreground">. {row.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
