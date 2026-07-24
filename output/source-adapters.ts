/**
 * Example Source Adapters — for drift detection in the shared toolkit.
 *
 * These are template implementations for common open data sources.
 * Each adapter implements the SourceAdapter interface and can be
 * registered with the drift detection module.
 *
 * To add a new source:
 *   1. Identify the source's API endpoint (or webpage listing).
 *   2. Implement getCurrentVersion() and getLatestDate().
 *   3. Register the adapter in the drift detector registry.
 *   4. Test with a real explainer-metadata.json.
 *
 * License: MIT (compatible with toolkit-002)
 */

import type { SourceAdapter } from "./drift-detection";

/**
 * BLS CPI (Bureau of Labor Statistics Consumer Price Index)
 * Source: https://www.bls.gov/developers/
 */
export const BlsCpiAdapter: SourceAdapter = {
  sourcePatterns: [/api\.bls\.gov/],

  async getCurrentVersion(sourceUrl: string, apiKey?: string): Promise<string> {
    if (!apiKey) {
      throw new Error(
        "BLS CPI adapter requires a registration key. See https://www.bls.gov/developers/."
      );
    }

    const response = await fetch("https://api.bls.gov/publicAPI/v2/timeseries/CUUR0000SA0/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registrationKey: apiKey,
        startyear: new Date().getFullYear(),
        endyear: new Date().getFullYear(),
      }),
    });

    if (!response.ok) {
      throw new Error(`BLS API error: ${response.status}`);
    }

    const data = await response.json();
    const latestData = data.Results?.series?.[0]?.data?.[0];
    if (!latestData) {
      throw new Error("BLS API returned unexpected structure");
    }

    // Construct version string: "BLS CPI <year>-<month>"
    const year = latestData.year;
    const month = String(latestData.period).replace("M", "").padStart(2, "0");
    return `BLS CPI ${year}-${month}`;
  },

  async getLatestDate(sourceUrl: string, apiKey?: string): Promise<string> {
    const version = await this.getCurrentVersion(sourceUrl, apiKey);
    // Parse YYYY-MM from the version string and return as ISO date (first of month).
    const [, yearMonth] = version.match(/(\d{4})-(\d{2})/) || [];
    if (!yearMonth) {
      throw new Error("Could not parse date from BLS CPI version");
    }
    return `${yearMonth}-01`;
  },
};

/**
 * USDA NASS Quick Stats (National Agricultural Statistics Service)
 * Source: https://quickstats.nass.usda.gov/api/
 */
export const UsdaNassAdapter: SourceAdapter = {
  sourcePatterns: [/quickstats\.nass\.usda\.gov/],

  async getCurrentVersion(sourceUrl: string, apiKey?: string): Promise<string> {
    if (!apiKey) {
      throw new Error(
        "USDA NASS adapter requires an API key. See https://quickstats.nass.usda.gov/api/."
      );
    }

    const response = await fetch(
      `https://quickstats.nass.usda.gov/api/get_param_values?key=${apiKey}&param=year`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`NASS API error: ${response.status}`);
    }

    const data = await response.json();
    const latestYear = data.results?.[0]?.value;
    if (!latestYear) {
      throw new Error("NASS API returned unexpected structure");
    }

    return `USDA NASS Quick Stats, ${latestYear} Survey Year`;
  },

  async getLatestDate(sourceUrl: string, apiKey?: string): Promise<string> {
    const version = await this.getCurrentVersion(sourceUrl, apiKey);
    const match = version.match(/(\d{4}) Survey/);
    const year = match ? match[1] : new Date().getFullYear();
    return `${year}-01-01`;
  },
};

/**
 * GTFS (General Transit Feed Specification)
 * Many agencies publish GTFS feeds at predictable URLs with version metadata.
 */
export const GtfsAdapter: SourceAdapter = {
  sourcePatterns: [/gtfs|transit|feed/i],

  async getCurrentVersion(sourceUrl: string, _apiKey?: string): Promise<string> {
    // Attempt to fetch the GTFS feed and extract feed_version from feed_info.txt
    try {
      const feedResponse = await fetch(sourceUrl, { method: "HEAD" });
      const lastModified = feedResponse.headers.get("last-modified");
      if (lastModified) {
        return `GTFS ${new Date(lastModified).toISOString().split("T")[0]}`;
      }

      // Fallback: assume version is encoded in URL or fetch the ZIP directly (expensive).
      return "GTFS (version unknown; check manually)";
    } catch (error) {
      throw new Error(`GTFS feed unreachable: ${sourceUrl}`);
    }
  },

  async getLatestDate(sourceUrl: string, _apiKey?: string): Promise<string> {
    const feedResponse = await fetch(sourceUrl, { method: "HEAD" });
    const lastModified = feedResponse.headers.get("last-modified");
    return lastModified
      ? new Date(lastModified).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
  },
};

/**
 * College Scorecard (U.S. Department of Education)
 * Published annually; check the API for the latest data year.
 */
export const CollegeScorecardAdapter: SourceAdapter = {
  sourcePatterns: [/collegescorecard\.ed\.gov/],

  async getCurrentVersion(_sourceUrl: string, apiKey?: string): Promise<string> {
    // The College Scorecard API endpoint: /data?_fields=...
    // Query the API to determine the latest available year.
    try {
      const response = await fetch(
        "https://api.data.gov/ed/collegescorecard/v1/schools.json?_fields=id&_per_page=1" +
          (apiKey ? `&api_key=${apiKey}` : ""),
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`College Scorecard API error: ${response.status}`);
      }

      // Assume the latest year is the current year (or retrieved from metadata).
      const currentYear = new Date().getFullYear();
      return `College Scorecard ${currentYear}`;
    } catch (error) {
      throw new Error(`College Scorecard adapter failed: ${error}`);
    }
  },

  async getLatestDate(_sourceUrl: string, _apiKey?: string): Promise<string> {
    // College Scorecard is typically published once per year (June).
    const currentYear = new Date().getFullYear();
    return `${currentYear}-06-01`;
  },
};

/**
 * OpenStreetMap Planet Files
 * Planet dumps are published on a fixed schedule; check the directory listing.
 */
export const OsmPlanetAdapter: SourceAdapter = {
  sourcePatterns: [/planet\.openstreetmap\.org/],

  async getCurrentVersion(_sourceUrl: string, _apiKey?: string): Promise<string> {
    // OSM publishes planet-latest.osm.pbf; check its metadata.
    try {
      const response = await fetch("https://planet.openstreetmap.org/planet/full-history/", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`OSM directory error: ${response.status}`);
      }

      const html = await response.text();
      // Extract the latest date from the HTML listing (e.g., osm-20260715.osm.pbf).
      const dateMatch = html.match(/osm-(\d{8})/);
      const date = dateMatch ? dateMatch[1] : null;

      if (!date) {
        throw new Error("Could not parse OSM planet file date");
      }

      return `OSM Planet ${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`;
    } catch (error) {
      throw new Error(`OSM Planet adapter failed: ${error}`);
    }
  },

  async getLatestDate(_sourceUrl: string, _apiKey?: string): Promise<string> {
    const version = await this.getCurrentVersion(_sourceUrl, _apiKey);
    const dateMatch = version.match(/(\d{4})-(\d{2})-(\d{2})/);
    return dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : new Date().toISOString().split("T")[0];
  },
};

/**
 * STATS19 (UK Department for Transport — Road Accidents)
 * Annual extracts published at a known URL with dated filenames.
 */
export const Stats19Adapter: SourceAdapter = {
  sourcePatterns: [/data\.dft\.gov\.uk.*stats19/],

  async getCurrentVersion(_sourceUrl: string, _apiKey?: string): Promise<string> {
    // STATS19 publishes annual extracts; the version is typically the year.
    const currentYear = new Date().getFullYear();
    return `STATS19 ${currentYear} Extract`;
  },

  async getLatestDate(_sourceUrl: string, _apiKey?: string): Promise<string> {
    // Typically published in the first half of the year.
    const currentYear = new Date().getFullYear();
    return `${currentYear}-06-01`;
  },
};

/**
 * Registry of all available source adapters.
 * Register new adapters here so drift detection can find them.
 */
export const DEFAULT_ADAPTERS: SourceAdapter[] = [
  BlsCpiAdapter,
  UsdaNassAdapter,
  GtfsAdapter,
  CollegeScorecardAdapter,
  OsmPlanetAdapter,
  Stats19Adapter,
];
