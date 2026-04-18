import { useState } from 'react';
import { RankingProvider, useRanking } from '../state/RankingContext.jsx';
import MockupFrame from './MockupFrame.jsx';
import RankingPanel from './RankingPanel.jsx';
import Review from './Review.jsx';

export default function Scenario({ scenario, onBack, onComplete }) {
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
      />
    </RankingProvider>
  );
}

function ScenarioInner({ scenario, submitted, onSubmit, onBack, onComplete }) {
  const { order } = useRanking();

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
