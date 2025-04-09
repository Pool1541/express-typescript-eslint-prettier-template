import { sum } from "@/utils/sum";
import { describe, expect, it } from "vitest";

describe("sum function", () => {
  it("should add two positive numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
