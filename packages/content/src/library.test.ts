import { describe, expect, it } from "vitest";
import { createBookmark, getFeaturedWorks, getLibrary, getWorkBySlug, validateLibrary } from "./library";

describe("seed library", () => {
  it("has valid launch metadata and source provenance", () => {
    expect(validateLibrary(getLibrary())).toEqual([]);
  });

  it("returns featured works for the home experience", () => {
    expect(getFeaturedWorks().map((work) => work.slug)).toContain("apology");
  });

  it("creates stable bookmark ids and labels", () => {
    const work = getWorkBySlug("apology");
    expect(work).toBeDefined();
    const chapter = work!.chapters[0]!;
    const bookmark = createBookmark({
      work: work!,
      chapter,
      sectionId: chapter.sections[0]!.id,
      now: new Date("2026-07-03T00:00:00.000Z")
    });

    expect(bookmark.id).toBe(`${work!.id}-${chapter.id}-${chapter.sections[0]!.id}`);
    expect(bookmark.label).toContain("Apology");
  });
});
