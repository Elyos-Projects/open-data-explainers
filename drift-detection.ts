/**
 * Drift Detection Module — for integration into the shared toolkit (toolkit-002).
 *
 * This module provides the core logic for detecting when upstream data sources
 * have been updated (drifted) and need refresh tasks opened.
 *
 * Integration points:
 *   1. Load explainer-metadata.json for each explainer.
 *   2. Call detectDrift() with the metadata and a source adapter.
 *   3. Log or report drift reports; create refresh tasks if needed.
 *   4. Integrate into CI/CD via scheduled jobs or on-demand CLI.
 *
 * License: MIT (compatible with toolkit-002)
 */

/**
 * Explainer metadata structure (from explainer-metadata.json).
 * See REFRESH.md § 1.3 for the full schema.
 */
export interface ExplainerMetadata {
  id: string;
  title: string;
  dataVintage: {
    retrievalDate: string; // ISO 8601
    datasetVersion: string;
    sourceUrl: string;
    sourcePublisher: string;
    sourceSnapshot: {
      sha256: string;
      waybackUrl: string;
      committedPath: string;
    };
    license: string;
    licenseUrl: string;
    attribution: string;
  };
  refreshCadence: "annual" | "quarterly" | "monthly" | "on-demand" | "as-needed";
  nextCheckDate: string; // ISO 8601
  lastRefreshedDate: string; // ISO 8601
}

/**
 * Result of a drift detection check.
 */
export interface DriftReport {
  explainerId: string;
  hasDrift: boolean;
  reason?: string;
  currentVersion?: string;
  recordedVersion?: string;
  checkDate: string; // ISO 8601
}

/**
 * Interface for source adapters (implementations per data source type).
 * Each adapter knows how to check its particular source for updates.
 */
export interface SourceAdapter {
  /**
   * The source hostname(s) this adapter handles (e.g., "quickstats.nass.usda.gov").
   */
  sourcePatterns: RegExp[];

  /**
   * Check the source API/metadata for the current version.
   * @param sourceUrl The URL of the data source.
   * @param apiKey Optional API key for authenticated requests.
   * @returns The current version/release identifier.
   */
  getCurrentVersion(sourceUrl: string, apiKey?: string): Promise<string>;

  /**
   * Check the source API/metadata for the latest data date.
   * @param sourceUrl The URL of the data source.
   * @param apiKey Optional API key for authenticated requests.
   * @returns ISO 8601 date of the latest available data.
   */
  getLatestDate(sourceUrl: string, apiKey?: string): Promise<string>;
}

/**
 * Core drift detection logic.
 * @param metadata Explainer metadata (from explainer-metadata.json).
 * @param adapter Source adapter for the specific data source.
 * @returns A DriftReport indicating whether drift was detected.
 */
export async function detectDrift(
  metadata: ExplainerMetadata,
  adapter: SourceAdapter,
  apiKey?: string
): Promise<DriftReport> {
  const { id, dataVintage, refreshCadence } = metadata;
  const checkDate = new Date().toISOString();

  try {
    // Step 1: Check if the current version differs from the recorded version.
    const currentVersion = await adapter.getCurrentVersion(
      dataVintage.sourceUrl,
      apiKey
    );
    const recordedVersion = dataVintage.datasetVersion;

    if (currentVersion !== recordedVersion) {
      return {
        explainerId: id,
        hasDrift: true,
        reason: "version mismatch",
        currentVersion,
        recordedVersion,
        checkDate,
      };
    }

    // Step 2: Check if the refresh cadence interval has been exceeded.
    const recordedDate = new Date(dataVintage.retrievalDate);
    const now = new Date();
    const daysSinceRefresh = Math.floor(
      (now.getTime() - recordedDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const cadenceInDays = getCadenceInDays(refreshCadence);

    if (daysSinceRefresh > cadenceInDays) {
      // Cadence exceeded; manual check or automated source polling is advised.
      return {
        explainerId: id,
        hasDrift: true,
        reason: "refresh cadence exceeded",
        checkDate,
      };
    }

    // No drift detected.
    return {
      explainerId: id,
      hasDrift: false,
      checkDate,
    };
  } catch (error) {
    // If the adapter fails, report it as potential drift (safer to flag for manual review).
    return {
      explainerId: id,
      hasDrift: true,
      reason: `drift check failed: ${error instanceof Error ? error.message : String(error)}`,
      checkDate,
    };
  }
}

/**
 * Batch drift detection for multiple explainers.
 * @param metadataList Array of explainer metadata objects.
 * @param adapterRegistry Map of source patterns to adapters.
 * @returns Array of DriftReports.
 */
export async function detectDriftBatch(
  metadataList: ExplainerMetadata[],
  adapterRegistry: SourceAdapter[]
): Promise<DriftReport[]> {
  return Promise.all(
    metadataList.map(async (metadata) => {
      const adapter = findAdapter(metadata.dataVintage.sourceUrl, adapterRegistry);
      if (!adapter) {
        return {
          explainerId: metadata.id,
          hasDrift: true,
          reason: `no adapter found for ${metadata.dataVintage.sourceUrl}`,
          checkDate: new Date().toISOString(),
        };
      }
      return detectDrift(metadata, adapter);
    })
  );
}

/**
 * Find the appropriate adapter for a given source URL.
 */
function findAdapter(
  sourceUrl: string,
  adapters: SourceAdapter[]
): SourceAdapter | undefined {
  const url = new URL(sourceUrl);
  return adapters.find((adapter) =>
    adapter.sourcePatterns.some((pattern) => pattern.test(url.hostname))
  );
}

/**
 * Convert a refresh cadence to days (for comparison).
 */
function getCadenceInDays(cadence: string): number {
  const cadenceMap: Record<string, number> = {
    annual: 365,
    quarterly: 91,
    monthly: 30,
    "on-demand": Number.MAX_SAFE_INTEGER, // No automatic check
    "as-needed": Number.MAX_SAFE_INTEGER, // No automatic check
  };
  return cadenceMap[cadence.toLowerCase()] ?? 365;
}

/**
 * Create a refresh task object from a drift report.
 * This can be written to a JSON file or submitted to a task tracker.
 */
export function createRefreshTask(
  driftReport: DriftReport,
  metadata: ExplainerMetadata
): Record<string, unknown> {
  return {
    id: `${metadata.id}-refresh-${Date.now()}`,
    title: `Refresh: ${metadata.title} (${driftReport.reason})`,
    type: "maintenance",
    priority: "medium",
    linkedTasks: [metadata.id],
    status: "open",
    context: `Drift detected in upstream source. Reason: ${driftReport.reason}. Current version: ${driftReport.currentVersion || "unknown"}.`,
    refreshMetadata: {
      originalExplainerId: metadata.id,
      driftReason: driftReport.reason,
      driftDetectionDate: driftReport.checkDate,
      currentVersion: driftReport.currentVersion,
      recordedVersion: driftReport.recordedVersion,
    },
  };
}
