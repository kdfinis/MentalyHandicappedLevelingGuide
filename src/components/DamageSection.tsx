import { damageBuys } from "../data/damage";

export function DamageSection() {
  return (
    <section className="mx-auto mb-2 max-w-7xl px-4 sm:px-6" aria-labelledby="if-damage-title">
      <h2 id="if-damage-title" className="font-display text-2xl tracking-tight">
        Ironforge damage, 14–15
      </h2>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
        Same Auction House trip. Alchemy, enchanting, and blacksmithing 125 are the top of the board. One buff per stat.
        The scroll is the stronger one and replaces its elixir. Food, two different scrolls, and one weapon coating stay up
        together. A stone, an oil, or a shaman imbue: only one of those on the weapon.
      </p>
      <ul className="mt-3 grid gap-2 lg:grid-cols-2">
        {damageBuys.map((buy) => (
          <li key={buy.who} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <p>
              <span className="text-primary">{buy.who}</span> <span className="text-muted-foreground">{buy.role}</span>
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {buy.lines.map((line) => (
                <li key={line.item}>
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-primary/50 underline-offset-2 hover:decoration-primary"
                  >
                    {line.item}
                  </a>
                  <p className="text-muted-foreground">{line.note}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        If the scroll is missing:{" "}
        <a
          href="https://www.wowhead.com/forever/item=2454/elixir-of-lions-strength"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-primary/50 underline-offset-2 hover:decoration-primary"
        >
          Elixir of Lion&apos;s Strength
        </a>{" "}
        is +4 strength for 1 hour. Past this window: Elixir of
        Lesser Agility and Elixir of Firepower need level 18 and alchemy 140. Elixir of Ogre&apos;s Strength needs level
        20. Lesser Wizard Oil needs enchanting 200. Shadow Oil needs alchemy 165.
      </p>
    </section>
  );
}
