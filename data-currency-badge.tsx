/**
 * DataCurrencyBadge — a reusable React component for displaying data vintage and staleness status.
 * Suitable for integration into the shared toolkit (toolkit-002).
 *
 * Usage:
 *   <DataCurrencyBadge
 *     retrievalDate="2026-06-15"
 *     refreshCadence="annual"
 *     nextCheckDate="2027-06-15"
 *     methodologyUrl="/methodology"
 *     sourcesLimitsUrl="/sources"
 *   />
 *
 * License: MIT (compatible with toolkit-002)
 */

interface DataCurrencyBadgeProps {
  /**
   * ISO 8601 date when the source data was retrieved.
   */
  retrievalDate: string;

  /**
   * Refresh cadence: "annual" | "quarterly" | "monthly" | "on-demand" | "as-needed"
   */
  refreshCadence: string;

  /**
   * ISO 8601 date when the next refresh check is due.
   * If today > nextCheckDate, the badge shows "Stale" status.
   */
  nextCheckDate: string;

  /**
   * URL to the Methodology Card (for this explainer).
   */
  methodologyUrl: string;

  /**
   * URL to the Sources & Limits documentation.
   */
  sourcesLimitsUrl: string;

  /**
   * Optional: explicitly set stale status. Defaults to comparing today vs. nextCheckDate.
   */
  isStale?: boolean;
}

export function DataCurrencyBadge({
  retrievalDate,
  refreshCadence,
  nextCheckDate,
  methodologyUrl,
  sourcesLimitsUrl,
  isStale: explicitStale,
}: DataCurrencyBadgeProps) {
  const today = new Date();
  const nextCheck = new Date(nextCheckDate);
  const isStale = explicitStale ?? today > nextCheck;

  const displayDate = new Date(retrievalDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const nextCheckMonth = new Date(nextCheckDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const cadenceLabel = refreshCadence.charAt(0).toUpperCase() + refreshCadence.slice(1);
  const statusIcon = isStale ? "⚠️" : "✓";
  const statusText = isStale
    ? `Stale (refresh needed)`
    : `Current (next check: ${nextCheckMonth})`;

  return (
    <aside
      className="data-currency-badge"
      role="complementary"
      aria-label="Data currency information"
    >
      <div className="data-currency-badge__header">
        <h3 className="data-currency-badge__title">📅 Data Vintage</h3>
      </div>

      <div className="data-currency-badge__content">
        <p className="data-currency-badge__vintage">
          Data as of <strong>{displayDate}</strong>
        </p>

        <p className="data-currency-badge__cadence">
          Refresh cadence: <strong>{cadenceLabel}</strong>
        </p>

        <p className={`data-currency-badge__status ${isStale ? "data-currency-badge__status--stale" : "data-currency-badge__status--current"}`}>
          <span className="data-currency-badge__icon">{statusIcon}</span>
          <span className="data-currency-badge__text">{statusText}</span>
        </p>
      </div>

      <div className="data-currency-badge__links">
        <a href={methodologyUrl} className="data-currency-badge__link">
          View Methodology
        </a>
        <a href={sourcesLimitsUrl} className="data-currency-badge__link">
          Sources & Limits
        </a>
      </div>
    </aside>
  );
}

export default DataCurrencyBadge;
