import { useState } from "react";
import { blockFor, type Line, type Stage, type StartId } from "../data/route";
import { cn } from "../lib/cn";
import { MapSpot } from "./MapSpot";

type StageCardProps = {
  stage: Stage;
  start: StartId;
  open: boolean;
  onToggle: () => void;
};

export function StageCard({ stage, start, open, onToggle }: StageCardProps) {
  const block = blockFor(stage, start);
  const panelId = `${stage.id}-panel`;
  const photoIndexes = block.lines.flatMap((line, index) => (line.way && line.map ? [index] : []));
  const [photos, setPhotos] = useState<Set<number>>(() => new Set());
  const previewOpen = photoIndexes.length > 0 && photoIndexes.every((index) => photos.has(index));
  const macro = block.lines
    .filter((line) => line.way)
    .map((line) => `/way ${line.way}`)
    .join("\n");

  function togglePhoto(index: number) {
    setPhotos((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function togglePreview() {
    setPhotos(previewOpen ? new Set() : new Set(photoIndexes));
  }

  return (
    <article id={stage.id} className="sheet scroll-mt-28 rounded-lg border border-border bg-card" data-open={open}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full items-baseline gap-3 rounded-lg px-3 py-3 text-left sm:px-4",
          "transition-colors duration-200 hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <span className="flex items-baseline gap-1.5">
          <span className="text-xs tracking-wide text-muted-foreground">Lvl</span>
          <span className="font-display text-3xl leading-none text-primary tabular-nums">{stage.level}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-xl tracking-tight">{block.title}</span>
          <span className="mt-0.5 block text-sm text-muted-foreground">
            {stage.level >= 15 ? "Full group" : stage.dungeon ? "Dungeon" : start === "elwynn" ? "Lvx, Dvx" : "Chorrengodx, Dorpan, Whilind"}
          </span>
        </span>
      </button>
      {open ? (
        <div id={panelId} className="sheet-body border-t border-border px-3 py-4 sm:px-4">
          {stage.dungeon && photoIndexes.length > 0 ? (
            <div className="mb-3">
              <button
                type="button"
                aria-expanded={previewOpen}
                onClick={togglePreview}
                className={cn(
                  "rounded-md border border-border bg-secondary px-3 py-1.5 text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  previewOpen && "border-primary text-primary",
                )}
              >
                {previewOpen ? "Hide preview" : "Preview"}
              </button>
            </div>
          ) : null}
          <ul className="flex flex-col gap-3">
            {block.lines.map((line, index) => (
              <Tip
                key={`${line.who}-${line.text}-${index}`}
                n={index + 1}
                line={line}
                photoOpen={photos.has(index)}
                onPhoto={() => togglePhoto(index)}
              />
            ))}
          </ul>
          {macro ? (
            <div className="mt-3">
              <Copy text={macro} mark="all" />
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function Tip({ n, line, photoOpen, onPhoto }: { n: number; line: Line; photoOpen: boolean; onPhoto: () => void }) {
  const group = line.who === "all" || line.who === "Full group";
  const spot = line.way && line.map ? line.way.split(" ").map(Number) : null;
  return (
    <li className="flex flex-col gap-2 text-sm">
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-2">
        <span className="text-xs tracking-wide text-muted-foreground tabular-nums">Step {n}</span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={group ? "text-primary" : "text-foreground"}>{line.who}</span>
          <span>{line.text}</span>
          {line.href && line.link ? (
            <a
              href={line.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-primary/50 underline-offset-2 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {line.link}
            </a>
          ) : null}
          {line.way ? <Copy text={`/way ${line.way}`} /> : null}
          {spot ? (
            <button
              type="button"
              aria-expanded={photoOpen}
              onClick={onPhoto}
              className={cn(
                "rounded-md border border-border bg-secondary px-2.5 py-1 text-xs",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                photoOpen && "border-primary text-primary",
              )}
            >
              {photoOpen ? "Hide photo" : "Photo"}
            </button>
          ) : null}
        </span>
      </div>
      {photoOpen && spot && line.map ? (
        <MapSpot map={line.map} x={spot[0]} y={spot[1]} label={`${line.who} ${line.text}`} />
      ) : null}
    </li>
  );
}

function Copy({ text, mark }: { text: string; mark?: "all" }) {
  const [done, setDone] = useState(false);
  const shown = mark === "all" ? "/way" : text;

  return (
    <button
      type="button"
      aria-label={text}
      onClick={() => {
        const finish = () => {
          setDone(true);
          window.setTimeout(() => setDone(false), 900);
        };
        const fallback = () => {
          const area = document.createElement("textarea");
          area.value = text;
          document.body.appendChild(area);
          area.select();
          document.execCommand("copy");
          area.remove();
          finish();
        };
        if (!navigator.clipboard?.writeText) {
          fallback();
          return;
        }
        navigator.clipboard.writeText(text).then(finish, fallback);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 font-mono text-xs text-primary-foreground",
        "transition-opacity duration-200 hover:opacity-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <span>{shown}</span>
      {done ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
      <rect x="4" y="2.5" width="8" height="11" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 2.5h4v1.6H6z" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8.2 6.4 11.5 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
