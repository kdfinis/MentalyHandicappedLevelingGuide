import type { MapId } from "../data/route";

const SCALE = 2.4;

export function MapSpot({ map, x, y, label }: { map: MapId; x: number; y: number; label: string }) {
  return (
    <figure className="relative aspect-[5/4] overflow-hidden rounded-md border border-border bg-black">
      <img
        src={`${import.meta.env.BASE_URL}maps/${map}.jpg`}
        alt=""
        className="absolute max-w-none"
        style={{
          width: `${SCALE * 100}%`,
          height: `${SCALE * 100}%`,
          left: `${50 - x * SCALE}%`,
          top: `${50 - y * SCALE}%`,
        }}
      />
      <span aria-hidden="true" className="map-pin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <figcaption className="absolute right-1 bottom-1 left-1 truncate rounded bg-background/85 px-1.5 py-0.5 text-xs text-foreground">
        {label}
      </figcaption>
    </figure>
  );
}
