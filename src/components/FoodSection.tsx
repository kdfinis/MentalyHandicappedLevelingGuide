import { foodBuys } from "../data/food";

export function FoodSection() {
  return (
    <section className="mx-auto mb-2 max-w-7xl px-4 sm:px-6" aria-labelledby="if-food-title">
      <h2 id="if-food-title" className="font-display text-2xl tracking-tight">
        Ironforge food, 14–15
      </h2>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
        Auction House in Ironforge. About 3 hours into beta, so cooking 125 is the top of the board. The leveling buff is
        +5% experience from kills. Every meal below that says so is the same 5%. A bigger stat is not more XP. Sit 10
        seconds. One Well Fed. 15 min. It falls off on death. Quest turn-ins are not in the tooltip.
      </p>
      <ul className="mt-3 grid gap-2 lg:grid-cols-2">
        {foodBuys.map((buy) => (
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
        Hot Lion Chops and Seasoned Wolf Kabob are the same +5 agility, and they need cooking 135. Goblin Deviled Clams
        is +6 stamina and spirit, and its tooltip does not list the kill XP.
      </p>
    </section>
  );
}
