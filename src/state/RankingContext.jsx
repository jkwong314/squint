import { createContext, useContext, useMemo, useState, useCallback } from 'react';

/**
 * RankingContext holds the current in-progress ranking for a scenario.
 *
 * Shape:
 *   mode: 'ranking' | 'review'
 *   order: string[]         // element ids in user-assigned order
 *   assign(id)              // adds id to the end; no-op if already present
 *   unassign(id)            // removes id; higher ranks shift down
 *   clear()                 // reset to empty
 *   rankOf(id)              // 1-based rank, or null
 *   expertOrder: string[]   // set by scenario; used only in review mode
 */
const RankingContext = createContext(null);

export function RankingProvider({ children, expertOrder = [], mode = 'ranking' }) {
  const [order, setOrder] = useState([]);

  const assign = useCallback((id) => {
    setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unassign = useCallback((id) => {
    setOrder((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setOrder([]), []);

  const rankOf = useCallback(
    (id) => {
      const i = order.indexOf(id);
      return i === -1 ? null : i + 1;
    },
    [order]
  );

  const expertRankOf = useCallback(
    (id) => {
      const i = expertOrder.indexOf(id);
      return i === -1 ? null : i + 1;
    },
    [expertOrder]
  );

  const value = useMemo(
    () => ({
      mode,
      order,
      assign,
      unassign,
      clear,
      rankOf,
      expertOrder,
      expertRankOf,
    }),
    [mode, order, assign, unassign, clear, rankOf, expertOrder, expertRankOf]
  );

  return <RankingContext.Provider value={value}>{children}</RankingContext.Provider>;
}

export function useRanking() {
  const ctx = useContext(RankingContext);
  if (!ctx) throw new Error('useRanking must be used inside a RankingProvider');
  return ctx;
}
