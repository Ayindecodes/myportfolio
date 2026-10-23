// GitHub contribution calendar (task 84). Read on the server from GitHub's public contribution graph (no token
// needed) and cached: a good result for a day, a failure only briefly, so a hiccup never sticks for long.
// Returns null on any failure; the calendar then simply isn't shown.

import { cacheLife } from "next/cache";

export type ContributionDay = { date: string; level: number; count: number };
export type ContributionCalendar = { total: number; weeks: ContributionDay[][] };

const attribute = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

function parse(html: string): ContributionCalendar | null {
  // Each day's tooltip says "3 contributions on May 2nd." or "No contributions on May 2nd."
  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    counts.set(id, Number.parseInt(text, 10) || 0);
  }

  const weeks: ContributionDay[][] = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*\bContributionCalendar-day\b[^>]*>/g)) {
    const date = attribute(tag, "data-date");
    const id = attribute(tag, "id");
    const position = id?.match(/-(\d+)-(\d+)$/); // contribution-day-component-<weekday>-<week>
    if (!date || !id || !position) continue;
    const [weekday, week] = [Number(position[1]), Number(position[2])];
    (weeks[week] ??= [])[weekday] = { date, level: Number(attribute(tag, "data-level") ?? 0), count: counts.get(id) ?? 0 };
  }

  const days = weeks.flat().filter(Boolean);
  const total = Number.parseInt(html.match(/id="js-contribution-activity-description"[^>]*>\s*([\d,]+)/)?.[1]?.replace(/,/g, "") ?? "", 10);
  if (days.length < 300 || Number.isNaN(total)) return null; // the page changed shape: show nothing rather than nonsense
  return { total, weeks: weeks.map((week) => week.filter(Boolean)) };
}

export async function getContributions(user: string): Promise<ContributionCalendar | null> {
  "use cache";
  try {
    const response = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, {
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
    });
    const calendar = response.ok ? parse(await response.text()) : null;
    if (calendar) cacheLife("days");
    else cacheLife("minutes");
    return calendar;
  } catch {
    cacheLife("minutes");
    return null;
  }
}
