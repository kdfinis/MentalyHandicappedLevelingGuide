import { useMemo, useState } from "react";
import { FoodSection } from "./components/FoodSection";
import { LevelRail } from "./components/LevelRail";
import { StageCard } from "./components/StageCard";
import { bonuses } from "./data/bonuses";
import { bandForLevel, filters, matches, parties, stages, type FilterId, type StartId } from "./data/route";
import { cn } from "./lib/cn";

function initialStage() {
  const hash = window.location.hash.replace("#", "");
  return stages.some((stage) => stage.id === hash) ? hash : "l01";
}

function initialFilter(): FilterId {
  const hash = window.location.hash.replace("#", "");
  const stage = stages.find((item) => item.id === hash);
  return stage ? bandForLevel(stage.level) : "to10";
}

export default function App() {
  const [start, setStart] = useState<StartId>("elwynn");
  const [currentId, setCurrentId] = useState(initialStage);
  const [filter, setFilter] = useState<FilterId>(initialFilter);
  const [bonusId, setBonusId] = useState(bonuses[0].id);
  const bonus = bonuses.find((item) => item.id === bonusId) ?? bonuses[0];
  const visible = useMemo(() => stages.filter((stage) => matches(stage, filter)), [filter]);

  function showStage(id: string) {
    const stage = stages.find((item) => item.id === id);
    if (stage && !matches(stage, filter)) setFilter(bandForLevel(stage.level));
    setCurrentId(id);
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-6 sm:px-6">
        <h1 className="font-display text-3xl tracking-tight">Swedish Team Level Guide</h1>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Start">
          <StartButton active={start === "elwynn"} onClick={() => setStart("elwynn")}>
            Elwynn
          </StartButton>
          <StartButton active={start === "coldridge"} onClick={() => setStart("coldridge")}>
            Coldridge Valley
          </StartButton>
        </div>
        <ul className="flex flex-col gap-1">
          {parties[start].map((person) => (
            <li key={person.name} className="text-sm">
              <span className="text-primary">{person.name}</span> {person.role}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end gap-2">
          <label className="flex min-w-56 flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Bonuses</span>
            <select
              value={bonus.id}
              onChange={(event) => setBonusId(event.target.value)}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {bonuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}. {item.pct}
                </option>
              ))}
            </select>
          </label>
          <p className="max-w-xl pb-1.5 text-sm">
            <span className="text-primary">{bonus.pct}.</span> {bonus.note}
            {bonus.href ? (
              <>
                {" "}
                <a
                  href={bonus.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-primary/50 underline-offset-2 hover:decoration-primary"
                >
                  {bonus.name}
                </a>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                filter === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
      <div className="pt-4">
        <FoodSection />
      </div>
      <div className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-2 backdrop-blur lg:hidden">
        <LevelRail stages={visible} openId={currentId} onOpen={showStage} axis="x" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[4.5rem_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <LevelRail stages={visible} openId={currentId} onOpen={showStage} />
        </div>
        <main className="flex min-w-0 flex-col gap-3" aria-label="Route">
          {visible.map((stage) => (
            <StageCard key={`${stage.id}-${start}`} stage={stage} start={start} />
          ))}
        </main>
      </div>
      <footer className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground sm:px-6">
        Together from Hall of Thanes. Stops at 40. Quest xp from Forever Companion, 24 Oct 2026, 20:03 Europe/Warsaw.
      </footer>
    </div>
  );
}

function StartButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-md px-4 py-2 font-display text-2xl tracking-tight",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "transition-colors duration-200",
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
