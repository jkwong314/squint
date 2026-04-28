import { useEffect, useState } from 'react';
import { RankingProvider, useRanking } from '../state/RankingContext.jsx';
import MockupFrame from './MockupFrame.jsx';
import RankingPanel from './RankingPanel.jsx';
import Review from './Review.jsx';
import { score } from '../scoring/score.js';

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2.93" y1="2.93" x2="4" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13.07" y1="2.93" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="12" x2="2.93" y2="13.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 10A6 6 0 0 1 6 2.5a.5.5 0 0 0-.6-.6A6.5 6.5 0 1 0 14.1 10.6a.5.5 0 0 0-.6-.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Scenario({ scenario, onBack, onComplete, onRecordScore, dark, onToggleDark }) {
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
        dark={dark}
        onToggleDark={onToggleDark}
      />
    </RankingProvider>
  );
}

function ScenarioInner({ scenario, submitted, onSubmit, onBack, onComplete, onRecordScore, dark, onToggleDark }) {
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
        <div style={{
          position: 'absolute',
          top: 'var(--s-4)',
          left: 'var(--s-6)',
          right: 'var(--s-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}>
          <button
            className="scenario-back"
            onClick={onBack}
            style={{ pointerEvents: 'auto', position: 'static' }}
          >
            ← Back
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
            style={{ pointerEvents: 'auto' }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
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
