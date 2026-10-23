import { materialDefs } from "@/lib/materials.generated";

/** The shared vinyl lighting filters (design/assets/_materials.svg), available to any live SVG on the page. */
export function VinylDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs dangerouslySetInnerHTML={{ __html: materialDefs }} />
    </svg>
  );
}
