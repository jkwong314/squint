import { useCallback, useEffect, useState } from 'react';
import { SCENARIOS } from '../data/scenarios.js';

const STORAGE_KEY = 'squint:progress:v1';

function loadProgress() {
  if (typeof window === 'undefined') return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.scenarios) return emptyProgress();
    return parsed;
  } catch {
    return emptyProgress();
  }
}

function saveProgress(p) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* noop */
  }
}

function emptyProgress() {
  return { scenarios: {}, lastVisited: null };
}

/**
 * Hook managing per-scenario best scores in localStorage.
 *
 * Returns:
 *   getBest(scenarioId): number | null
 *   record(scenarioId, score): void  (keeps the max)
 *   categoryBest(categoryId): number | null  (average of best scores in category)
 *   categoryCompleted(categoryId): number    (count of scenarios with a best score)
 *   clearAll(): void
 */
export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getBest = useCallback(
    (id) => progress.scenarios[id]?.bestScore ?? null,
    [progress]
  );

  const record = useCallback((id, score) => {
    setProgress((prev) => {
      const current = prev.scenarios[id];
      const nextBest = current ? Math.max(current.bestScore, score) : score;
      const nextAttempts = (current?.attempts ?? 0) + 1;
      return {
        ...prev,
        lastVisited: id,
        scenarios: {
          ...prev.scenarios,
          [id]: { bestScore: nextBest, attempts: nextAttempts },
        },
      };
    });
  }, []);

  const categoryBest = useCallback(
    (categoryId) => {
      const ids = SCENARIOS.filter((s) => s.category === categoryId).map((s) => s.id);
      const scores = ids
        .map((id) => progress.scenarios[id]?.bestScore)
        .filter((s) => typeof s === 'number');
      if (scores.length === 0) return null;
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    },
    [progress]
  );

  const categoryCompleted = useCallback(
    (categoryId) => {
      const ids = SCENARIOS.filter((s) => s.category === categoryId).map((s) => s.id);
      return ids.filter((id) => progress.scenarios[id]?.bestScore != null).length;
    },
    [progress]
  );

  const clearAll = useCallback(() => setProgress(emptyProgress()), []);

  return { getBest, record, categoryBest, categoryCompleted, clearAll, progress };
}
