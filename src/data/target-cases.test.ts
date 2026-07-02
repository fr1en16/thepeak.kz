import { describe, expect, it } from "vitest";
import { targetCases } from "./target-cases";

describe("targetCases", () => {
  it("contains complete data for every generated route", () => {
    for (const [slug, caseData] of Object.entries(targetCases)) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
      expect(caseData.title).toBeTruthy();
      expect(caseData.year).toMatch(/^20\d{2}$/);
      expect(caseData.service).toBeTruthy();
      expect(caseData.industry).toBeTruthy();
      expect(caseData.hero_desc).toBeTruthy();
      expect(caseData.metrics.length).toBeGreaterThanOrEqual(3);
      expect(caseData.contentBlocks.length).toBeGreaterThan(0);
    }
  });
});
