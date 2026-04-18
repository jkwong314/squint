// Scenarios populate in Phase 4+. Empty for Phase 1.
export const SCENARIOS = [];

export function scenariosByCategory(categoryId) {
  return SCENARIOS.filter((s) => s.category === categoryId);
}

export function scenarioById(id) {
  return SCENARIOS.find((s) => s.id === id) || null;
}
