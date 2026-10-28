import { foodBuys } from "../data/food";

export function FoodSection() {
  return (
    <section className="mx-auto mb-2 max-w-7xl px-4 sm:px-6" aria-labelledby="if-food-title">
      <h2 id="if-food-title" className="font-display text-2xl tracking-tight">
        Ironforge food, 14–15
      </h2>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
        Auction House in Ironforge. About 3 hours into beta, so cooking 125 is the top of the board. Buy it cooked. Sit 10
        seconds. One Well Fed. It falls off on death. No agility food yet.
      </p>
      <ul className="mt-3 grid gap-2 lg:grid-cols-2">
        {foodBuys.map((buy) => (
          <li key={buy.who} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <p>
              <span className="text-primary">{buy.who}</span> <span className="text-muted-foreground">{buy.role}</span>
            </p>
            <p className="mt-1">
              <a
                href={buy.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-primary/50 underline-offset-2 hover:decoration-primary"
              >
                {buy.item}
              </a>
            </p>
            <p className="mt-1 text-muted-foreground">{buy.buff}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Same +6 if the goulash is gone: Crispy Lizard Tail, eat from 12, cooking 100. At 15 these are the same buff, not
        better: Goblin Deviled Clams, Hot Lion Chops, Seasoned Wolf Kabob, Lean Wolf Steak. Bristle Whisker Catfish stays
        the XP food in Bonuses.
      </p>
    </section>
  );
}
