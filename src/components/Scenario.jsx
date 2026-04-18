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
  const { order } = useRanking();
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    if (submitted && !recorded && order.length === scenario.expertOrder.length) {
      const s = score(order, scenario.expertOrder);
      onRecordScore?.(scenario.id, s);
      setRecorded(true);
    }
  }, [submitted, recorded, order, scenario, onRecordScore]);

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
