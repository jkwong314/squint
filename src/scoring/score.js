/**
 * Weighted Kendall tau scoring, normalized 0-100.
 *
 * For every pair (i, j) in the expert order where i < j, we check
 * whether the user also has them in that order. Inverted pairs add
 * a penalty. Pairs involving the expert top 3 (index < 3) count double.
 *
 * @param {string[]} userOrder   user's ranking, element ids
 * @param {string[]} expertOrder expert's ranking, same ids
 * @returns {number} score 0-100 (integer)
 */
export function score(userOrder, expertOrder) {
  validate(userOrder, expertOrder);
  const n = expertOrder.length;
  if (n < 2) return 100;

  let penalty = 0;
  let maxPenalty = 0;
  const userIndex = indexMap(userOrder);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const weight = i < 3 || j < 3 ? 2 : 1;
      maxPenalty += weight;
      const a = expertOrder[i];
      const b = expertOrder[j];
      if (userIndex[a] > userIndex[b]) penalty += weight;
    }
  }

  return Math.round(100 * (1 - penalty / maxPenalty));
}

/**
 * Returns the pairs (a, b) where the user inverted the expert order,
 * sorted by penalty contribution (heaviest first). Used for the
 * "Biggest misses" callouts on the review screen.
 *
 * @param {string[]} userOrder
 * @param {string[]} expertOrder
 * @returns {Array<{ expertBefore: string, expertAfter: string, weight: number }>}
 */
export function inversions(userOrder, expertOrder) {
  validate(userOrder, expertOrder);
  const n = expertOrder.length;
  const userIndex = indexMap(userOrder);
  const out = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = expertOrder[i];
      const b = expertOrder[j];
      if (userIndex[a] > userIndex[b]) {
        out.push({
          expertBefore: a,
          expertAfter: b,
          weight: i < 3 || j < 3 ? 2 : 1,
        });
      }
    }
  }
  out.sort((x, y) => y.weight - x.weight);
  return out;
}

function indexMap(order) {
  const m = Object.create(null);
  for (let i = 0; i < order.length; i++) m[order[i]] = i;
  return m;
}

function validate(userOrder, expertOrder) {
  if (!Array.isArray(userOrder) || !Array.isArray(expertOrder)) {
    throw new TypeError('score: both arguments must be arrays');
  }
  if (userOrder.length !== expertOrder.length) {
    throw new Error(
      `score: length mismatch (user=${userOrder.length}, expert=${expertOrder.length})`
    );
  }
  const seen = new Set();
  for (const id of userOrder) {
    if (seen.has(id)) throw new Error(`score: duplicate id in userOrder: ${id}`);
    seen.add(id);
  }
  const expertSet = new Set(expertOrder);
  if (expertSet.size !== expertOrder.length) {
    throw new Error('score: duplicate id in expertOrder');
  }
  for (const id of userOrder) {
    if (!expertSet.has(id)) {
      throw new Error(`score: unknown id in userOrder: ${id}`);
    }
  }
}
