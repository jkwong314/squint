import { describe, it, expect } from 'vitest';
import { score, inversions } from './score.js';

const expert = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('score', () => {
  it('perfect match → 100', () => {
    expect(score(['a', 'b', 'c', 'd', 'e', 'f'], expert)).toBe(100);
  });

  it('full reverse → 0', () => {
    expect(score(['f', 'e', 'd', 'c', 'b', 'a'], expert)).toBe(0);
  });

  it('single top swap costs more than single bottom swap', () => {
    const topSwap = score(['b', 'a', 'c', 'd', 'e', 'f'], expert);
    const bottomSwap = score(['a', 'b', 'c', 'd', 'f', 'e'], expert);
    expect(topSwap).toBeLessThan(bottomSwap);
  });

  it('2-element edge case', () => {
    expect(score(['a', 'b'], ['a', 'b'])).toBe(100);
    expect(score(['b', 'a'], ['a', 'b'])).toBe(0);
  });

  it('1-element edge case → 100', () => {
    expect(score(['a'], ['a'])).toBe(100);
  });

  it('throws on length mismatch', () => {
    expect(() => score(['a', 'b'], ['a', 'b', 'c'])).toThrow(/length mismatch/);
  });

  it('throws on duplicate id in user order', () => {
    expect(() => score(['a', 'a'], ['a', 'b'])).toThrow(/duplicate/);
  });

  it('throws on unknown id in user order', () => {
    expect(() => score(['x', 'y'], ['a', 'b'])).toThrow(/unknown id/);
  });

  it('top-3 pair misplaced weighs double', () => {
    // Swap a and d: a moves from 0 to 3. Affects pairs (a,b), (a,c), (a,d).
    // (a,b): both in top-3 → weight 2
    // (a,c): both in top-3 → weight 2
    // (a,d): one in top-3 → weight 2
    const s1 = score(['d', 'b', 'c', 'a', 'e', 'f'], expert);
    // Swap e and f only: pair (e,f) has both outside top-3 → weight 1.
    const s2 = score(['a', 'b', 'c', 'd', 'f', 'e'], expert);
    expect(s1).toBeLessThan(s2);
  });
});

describe('inversions', () => {
  it('empty for perfect match', () => {
    expect(inversions(expert, expert)).toEqual([]);
  });

  it('lists heaviest swaps first', () => {
    const result = inversions(['b', 'a', 'c', 'd', 'f', 'e'], expert);
    expect(result[0].weight).toBeGreaterThanOrEqual(result[result.length - 1].weight);
  });

  it('identifies the inverted pair', () => {
    const result = inversions(['a', 'b', 'c', 'd', 'f', 'e'], expert);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ expertBefore: 'e', expertAfter: 'f', weight: 1 });
  });
});
