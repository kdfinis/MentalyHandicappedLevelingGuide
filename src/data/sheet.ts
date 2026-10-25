import { bonuses } from "./bonuses";
import { stages, type Line } from "./route";

export type RouteRow = {
  level: number;
  where: string;
  who: string;
  step: string;
  way: string;
  href?: string;
  link?: string;
};

export type BonusRow = {
  name: string;
  effect: string;
  note: string;
  href?: string;
};

function pushLines(rows: RouteRow[], level: number, road: string, place: string, lines: Line[]) {
  for (const line of lines) {
    const where = road.toLowerCase() === place.toLowerCase() ? place : `${road}, ${place}`;
    rows.push({
      level,
      where,
      who: line.who,
      step: line.text,
      way: line.way ? `/way ${line.way}` : "",
      href: line.href,
      link: line.link,
    });
  }
}

export function routeRows(): RouteRow[] {
  const rows: RouteRow[] = [];
  for (const stage of stages) {
    if (stage.level >= 13) {
      pushLines(rows, stage.level, "Together", stage.elwynn.title, stage.elwynn.lines);
      continue;
    }
    pushLines(rows, stage.level, "Elwynn", stage.elwynn.title, stage.elwynn.lines);
    pushLines(rows, stage.level, "Coldridge", stage.coldridge.title, stage.coldridge.lines);
  }
  return rows;
}

export function bonusRows(): BonusRow[] {
  return bonuses.map((bonus) => ({
    name: bonus.name,
    effect: bonus.pct,
    note: bonus.note,
    href: bonus.href,
  }));
}
