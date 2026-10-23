// GitHub contribution calendar (task 84), rendered on the server from cached data (src/lib/github.ts).
// If GitHub can't be reached it renders nothing. On narrow screens it scrolls sideways and opens on the latest
// weeks (the scroller is right-to-left; the grid inside stays left-to-right).

import { github } from "@/content/site";
import { getContributions } from "@/lib/github";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const monthName = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleString("en", { month: "short", timeZone: "UTC" });

export async function GitHubCalendar() {
  const calendar = await getContributions(github.user);
  if (!calendar) return null;
  const { total, weeks } = calendar;

  // A month label sits over the first week that starts in that month.
  const months = weeks.map((week, i) => {
    const month = monthName(week[0].date);
    return i > 0 && month !== monthName(weeks[i - 1][0].date) ? month : null;
  });

  return (
    <figure className="gh-calendar">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="type-meta">GitHub</p>
        <a href={`https://github.com/${github.user}`} {...external} className="project-link">
          @{github.user}
          <span className="sr-only"> on GitHub (opens in a new tab)</span>
          <span aria-hidden="true" className="nudge-ur">
            ↗
          </span>
        </a>
      </div>

      <div className="gh-scroll">
        <div className="gh-grid" role="img" aria-label={`${total.toLocaleString("en")} contributions on GitHub in the last year`}>
          {months.map(
            (label, i) =>
              label && (
                <span key={`m${i}`} className="gh-month" style={{ gridColumn: i + 1 }}>
                  {label}
                </span>
              ),
          )}
          {weeks.flatMap((week, i) =>
            week.map((day) => (
              <span
                key={day.date}
                className="gh-day"
                data-level={day.level}
                style={{ gridColumn: i + 1, gridRow: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 2 }}
              />
            )),
          )}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="type-body">
          <strong className="font-semibold text-ink">{total.toLocaleString("en")}</strong> contributions in the last year
        </span>
        <span className="gh-legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="gh-day" data-level={level} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
