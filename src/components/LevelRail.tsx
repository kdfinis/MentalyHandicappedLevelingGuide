import { useEffect, useRef } from "react";
import type { Stage } from "../data/route";
import { cn } from "../lib/cn";

const ROW = 36;
const GAP = 4;

type LevelRailProps = {
  stages: Stage[];
  openId: string;
  onOpen: (id: string) => void;
  axis?: "x" | "y";
};

export function LevelRail({ stages, openId, onOpen, axis = "y" }: LevelRailProps) {
  const index = Math.max(0, stages.findIndex((stage) => stage.id === openId));
  const current = useRef<HTMLButtonElement>(null);
  const horizontal = axis === "x";

  useEffect(() => {
    current.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [openId, stages]);

  return (
    <nav aria-label="Levels" className={cn(horizontal ? "flex items-center gap-2" : "sticky top-4")}>
      <p className={cn("text-xs tracking-wide text-muted-foreground", horizontal ? "shrink-0" : "px-1 pb-1")}>Lvl</p>
      <div className={cn(horizontal ? "min-w-0 flex-1 overflow-x-auto" : "max-h-[calc(100vh-2rem)] overflow-y-auto")}>
        <ol className={cn("relative", horizontal ? "flex w-max gap-1 py-1" : "flex flex-col gap-1")}>
        <li
          aria-hidden="true"
          className="rail-mark pointer-events-none absolute rounded-md bg-primary shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          style={
            horizontal
              ? { width: ROW, height: ROW, transform: `translateX(${index * (ROW + GAP)}px)` }
              : { left: 0, right: 4, height: ROW, transform: `translateY(${index * (ROW + GAP)}px)` }
          }
        >
          <span key={openId} className="rail-pulse absolute inset-0 rounded-md" />
        </li>
        {stages.map((stage) => {
          const open = stage.id === openId;
          return (
            <li key={stage.id}>
              <button
                ref={open ? current : undefined}
                type="button"
                aria-label={`Level ${stage.level}`}
                aria-current={open ? "true" : undefined}
                onClick={() => onOpen(stage.id)}
                className={cn(
                  "relative z-10 flex items-center justify-center rounded-md font-display tabular-nums",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  horizontal ? "h-9 w-9" : "h-9 w-full",
                  open ? "text-lg text-primary-foreground" : "text-sm text-muted-foreground hover:text-foreground",
                )}
              >
                {stage.level}
                {stage.dungeon ? <span className="absolute right-0.5 bottom-0.5 h-1.5 w-1.5 rounded-full bg-primary" /> : null}
              </button>
            </li>
          );
        })}
        </ol>
      </div>
    </nav>
  );
}
