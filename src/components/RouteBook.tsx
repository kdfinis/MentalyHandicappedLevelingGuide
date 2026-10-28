import { useState, type ReactNode } from "react";
import { foodBuys, type FoodBuy } from "../data/food";
import { bonusRows, routeRows, type BonusRow, type RouteRow } from "../data/sheet";
import { downloadWorkbook } from "../lib/excel";
import { cn } from "../lib/cn";

type SheetId = "route" | "bonuses" | "food";

const route = routeRows();
const bonuses = bonusRows();
const food = foodBuys;

export function RouteBook() {
  const [sheet, setSheet] = useState<SheetId>("route");

  return (
    <section className="workbook mx-4 mb-8 sm:mx-6" aria-label="Excel sheet">
      <div className="flex items-center justify-between gap-3 border-b border-[#d4d4d4] bg-[#f3f3f3] px-3 py-2 text-[13px] text-[#333]">
        <p>Swedish Team Level Guide.xls</p>
        <button
          type="button"
          onClick={downloadWorkbook}
          className="rounded-sm bg-[#217346] px-2.5 py-1 text-white hover:bg-[#1b5c38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217346]"
        >
          Download Excel
        </button>
      </div>
      <div className="max-h-[calc(100vh-11rem)] overflow-auto" role="tabpanel" id={`sheet-panel-${sheet}`} aria-labelledby={`sheet-${sheet}`}>
        <SheetPanel sheet={sheet} />
      </div>
      <div className="flex gap-1 border-t border-[#d4d4d4] bg-[#f3f3f3] px-2 py-1" role="tablist" aria-label="Sheets">
        <SheetTab id="route" active={sheet === "route"} onSelect={setSheet}>
          Route
        </SheetTab>
        <SheetTab id="bonuses" active={sheet === "bonuses"} onSelect={setSheet}>
          Bonuses
        </SheetTab>
        <SheetTab id="food" active={sheet === "food"} onSelect={setSheet}>
          Food
        </SheetTab>
      </div>
    </section>
  );
}

function RouteTable({ rows }: { rows: RouteRow[] }) {
  return (
    <table className="w-full min-w-[760px] border-collapse text-left text-[13px] leading-5">
      <caption className="sr-only">Leveling route, one step per row</caption>
      <thead className="sticky top-0 z-10">
        <tr className="bg-[#217346] text-white">
          <th className="w-10 border border-[#1b5c38] px-2 py-1 text-center font-normal" scope="col">
            <span className="sr-only">Row</span>
          </th>
          <th className="w-14 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Level
          </th>
          <th className="w-52 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Where
          </th>
          <th className="w-36 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Who
          </th>
          <th className="border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Do
          </th>
          <th className="w-36 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Way
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const groupStart = index === 0 || rows[index - 1]?.level !== row.level || rows[index - 1]?.where !== row.where;
          return (
            <tr key={`${row.level}-${row.where}-${row.who}-${row.step}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-[#f5faf7]"}>
              <th
                className={cn(
                  "border border-[#e6e6e6] bg-[#f3f3f3] px-2 py-1 text-center font-normal text-[#666]",
                  groupStart && "border-t-[#217346]",
                )}
                scope="row"
              >
                {index + 1}
              </th>
              <Cell groupStart={groupStart} className="text-center tabular-nums">
                {row.level}
              </Cell>
              <Cell groupStart={groupStart}>{row.where}</Cell>
              <Cell groupStart={groupStart}>{row.who}</Cell>
              <Cell groupStart={groupStart}>
                {row.step}
                {row.href && row.link ? (
                  <>
                    {" "}
                    <a href={row.href} target="_blank" rel="noreferrer" className="text-[#0b5cab] underline">
                      {row.link}
                    </a>
                  </>
                ) : null}
              </Cell>
              <Cell groupStart={groupStart} className="font-mono text-[12px]">
                {row.way}
              </Cell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function BonusTable({ rows }: { rows: BonusRow[] }) {
  return (
    <table className="w-full min-w-[640px] border-collapse text-left text-[13px] leading-5">
      <caption className="sr-only">Experience bonuses</caption>
      <thead className="sticky top-0 z-10">
        <tr className="bg-[#217346] text-white">
          <th className="w-10 border border-[#1b5c38] px-2 py-1" scope="col">
            <span className="sr-only">Row</span>
          </th>
          <th className="w-56 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Bonus
          </th>
          <th className="w-40 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Effect
          </th>
          <th className="border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.name} className={index % 2 === 0 ? "bg-white" : "bg-[#f5faf7]"}>
            <th className="border border-[#e6e6e6] bg-[#f3f3f3] px-2 py-1 text-center font-normal text-[#666]" scope="row">
              {index + 1}
            </th>
            <td className="border border-[#e6e6e6] px-2 py-1 align-top">
              {row.href ? (
                <a href={row.href} target="_blank" rel="noreferrer" className="text-[#0b5cab] underline">
                  {row.name}
                </a>
              ) : (
                row.name
              )}
            </td>
            <td className="border border-[#e6e6e6] px-2 py-1 align-top">{row.effect}</td>
            <td className="border border-[#e6e6e6] px-2 py-1 align-top">{row.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FoodTable({ rows }: { rows: FoodBuy[] }) {
  return (
    <table className="w-full min-w-[640px] border-collapse text-left text-[13px] leading-5">
      <caption className="sr-only">Ironforge auction food at level 14 to 15</caption>
      <thead className="sticky top-0 z-10">
        <tr className="bg-[#217346] text-white">
          <th className="w-10 border border-[#1b5c38] px-2 py-1" scope="col">
            <span className="sr-only">Row</span>
          </th>
          <th className="w-36 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Who
          </th>
          <th className="w-48 border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Buy
          </th>
          <th className="border border-[#1b5c38] px-2 py-1 font-semibold" scope="col">
            Buff
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.who} className={index % 2 === 0 ? "bg-white" : "bg-[#f5faf7]"}>
            <th className="border border-[#e6e6e6] bg-[#f3f3f3] px-2 py-1 text-center font-normal text-[#666]" scope="row">
              {index + 1}
            </th>
            <td className="border border-[#e6e6e6] px-2 py-1 align-top">
              {row.who} {row.role}
            </td>
            <td className="border border-[#e6e6e6] px-2 py-1 align-top">
              <a href={row.href} target="_blank" rel="noreferrer" className="text-[#0b5cab] underline">
                {row.item}
              </a>
            </td>
            <td className="border border-[#e6e6e6] px-2 py-1 align-top">{row.buff}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SheetPanel({ sheet }: { sheet: SheetId }) {
  switch (sheet) {
    case "route":
      return <RouteTable rows={route} />;
    case "bonuses":
      return <BonusTable rows={bonuses} />;
    case "food":
      return <FoodTable rows={food} />;
    default: {
      const neverSheet: never = sheet;
      return neverSheet;
    }
  }
}

function Cell({ groupStart, className, children }: { groupStart: boolean; className?: string; children: ReactNode }) {
  return <td className={cn("border border-[#e6e6e6] px-2 py-1 align-top", groupStart && "border-t-[#217346]", className)}>{children}</td>;
}

function SheetTab({
  id,
  active,
  onSelect,
  children,
}: {
  id: SheetId;
  active: boolean;
  onSelect: (id: SheetId) => void;
  children: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`sheet-${id}`}
      aria-selected={active}
      aria-controls={`sheet-panel-${id}`}
      onClick={() => onSelect(id)}
      className={cn(
        "rounded-t-sm px-3 py-1 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217346]",
        active ? "bg-white font-semibold text-[#217346]" : "text-[#333] hover:bg-white/70",
      )}
    >
      {children}
    </button>
  );
}
