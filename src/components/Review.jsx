import { useMemo } from 'react';
import { score, inversions } from '../scoring/score.js';

export default function Review({ scenario, userOrder, onContinue }) {
  const userScore = useMemo(
    () => score(userOrder, scenario.expertOrder),
    [userOrder, scenario.expertOrder]
  );

  const deltas = useMemo(() => {
    return scenario.expertOrder.map((id, expertIdx) => {
      const label = scenario.rankedElements.find((e) => e.id === id)?.label || id;
      const userIdx = userOrder.indexOf(id);
      const diff = userIdx - expertIdx;
      return { id, label, expertPos: expertIdx + 1, userPos: userIdx + 1, diff };
    });
  }, [scenario, userOrder]);

  const topMisses = useMemo(() => {
    const inv = inversions(userOrder, scenario.expertOrder);
    const labelFor = (id) =>
      scenario.rankedElements.find((e) => e.id === id)?.label || id;
    return inv.slice(0, 2).map(({ expertBefore, expertAfter }) => ({
      before: labelFor(expertBefore),
      after: labelFor(expertAfter),
    }));
  }, [userOrder, scenario]);

  const scoreVerdict = verdictFor(userScore);

  return (
    <aside className="panel">
      <div className="panel-head">
        <p className="eyebrow">{scoreVerdict.label}</p>
        <h2 className="review-score">
          {userScore}
          <span className="review-score-out-of"> / 100</span>
        </h2>
        <p className="panel-hint" style={{ marginTop: '8px' }}>
          {scoreVerdict.note}
        </p>
      </div>

      <div>
        <p className="eyebrow">Expert order</p>
        <ol className="review-delta-list">
          {deltas.map(({ id, label, expertPos, diff }) => (
            <li key={id} className="review-delta">
              <span className="review-delta-num">
                {String(expertPos).padStart(2, '0')}
              </span>
              <span className="review-delta-label">{label}</span>
              <span className={'review-delta-change ' + deltaClass(diff)}>
                {deltaText(diff)}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {topMisses.length > 0 && (
        <div className="review-misses">
          <p><strong>Biggest misses:</strong></p>
          {topMisses.map((m, i) => (
            <p key={i}>
              You placed <strong>{m.after}</strong> above <strong>{m.before}</strong>.
            </p>
          ))}
          <p style={{ color: 'var(--ink-60)', marginTop: '8px' }}>
            Hover any element in the mockup to read why it sits where it does.
          </p>
        </div>
      )}

      <div className="panel-actions">
        <button className="btn btn-primary" onClick={onContinue}>
          Done
        </button>
      </div>
    </aside>
  );
}

function deltaClass(diff) {
  if (diff === 0) return 'flat';
  return diff < 0 ? 'up' : 'down';
}

function deltaText(diff) {
  if (diff === 0) return 'EXACT';
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff}`;
}

function verdictFor(s) {
  if (s >= 95) return { label: 'Designer-grade', note: 'Exceptional read on this page. A senior designer would nod and move on.' };
  if (s >= 80) return { label: 'Confident read', note: 'Strong instincts. The critical hierarchy is in place — minor misses in the mid-tier.' };
  if (s >= 60) return { label: 'Close, not quite', note: 'You saw most of it. Worth revisiting how the top three elements carry their weight.' };
  if (s >= 40) return { label: 'Drifting', note: "The heavyweight elements aren't landing where the page wants them. Squint at it again before the next one." };
  return { label: 'Inverted', note: "You flipped the hierarchy. Happens — usually when decoration outranks action in your eye. Recalibrate." };
}
