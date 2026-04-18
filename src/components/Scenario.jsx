import { useEffect, useState } from 'react';
import { RankingProvider, useRanking } from '../state/RankingContext.jsx';
import MockupFrame from './MockupFrame.jsx';
import RankingPanel from './RankingPanel.jsx';
import Review from './Review.jsx';
import { score } from '../scoring/score.js';

export default function Scenario({ scenario, onBack, onComplete, onRecordScore }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <RankingProvider
      expertOrder={scenario.expertOrder}
      mode={submitted ? 'review' : 'ranking'}
    >
      <ScenarioInner
        scenario={scenario}
        submitted={submitted}
        onSubmit={() => setSubmitted(true)}
        onBack={onBack}
        onComplete={onComplete}
        onRecordScore={onRecordScore}
      />
    </RankingProvider>
  );
}

function ScenarioInner({ scenario, submitted, onSubmit, onBack, onComplete, onRecordScore }) {
  const { order, unassign, assign, rankOf } = useRanking();
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    if (submitted && !recorded && order.length === scenario.expertOrder.length) {
      const s = score(order, scenario.expertOrder);
      onRecordScore?.(scenario.id, s);
      setRecorded(true);
    }
  }, [submitted, recorded, order, scenario, onRecordScore]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        onBack();
        return;
      }
      if (submitted) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onComplete();
        }
        return;
      }

      if (e.key === 'Enter') {
        if (order.length === scenario.expertOrder.length) {
          e.preventDefault();
          onSubmit();
        }
        return;
      }

      if (e.key === 'Backspace' && order.length > 0) {
        e.preventDefault();
        unassign(order[order.length - 1]);
        return;
      }

      // 1-9: assign the hovered element
      if (/^[1-9]$/.test(e.key)) {
        const target = document.querySelector('.rankable:hover');
        if (!target) return;
        const id = target.getAttribute('data-rankable-id');
        if (!id) return;
        e.preventDefault();
        if (rankOf(id) === null) assign(id);
        else unassign(id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [submitted, order, scenario, onBack, onComplete, onSubmit, unassign, assign, rankOf]);

  return (
    <div className="scenario">
      <div className="scenario-stage">
        <button className="scenario-back" onClick={onBack}>
          ← Back
        </button>
        <MockupFrame scenarioId={scenario.id} />
      </div>
      {submitted ? (
        <Review
          scenario={scenario}
          userOrder={order}
          onContinue={onComplete}
        />
      ) : (
        <RankingPanel
          rankedElements={scenario.rankedElements}
          title={scenario.title}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
