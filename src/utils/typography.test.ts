import { describe, expect, it } from "vitest";
import { formatTypography } from "./typography";

describe("formatTypography", () => {
  it("binds short Russian words to the following word", () => {
    expect(formatTypography("Проект в Алматы и в Астане"))
      .toBe("Проект в\u00a0Алматы и\u00a0в\u00a0Астане");
  });

  it("binds configured multi-letter prepositions", () => {
    expect(formatTypography("Контент для бренда через видео"))
      .toBe("Контент для\u00a0бренда через\u00a0видео");
  });

  it("preserves empty input and existing non-breaking spaces", () => {
    expect(formatTypography("")).toBe("");
    expect(formatTypography("мы\u00a0работаем")).toBe("мы\u00a0работаем");
  });
});
