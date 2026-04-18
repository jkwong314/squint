import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import CategoryView from './components/CategoryView.jsx';
import Scenario from './components/Scenario.jsx';
import CategoryComplete from './components/CategoryComplete.jsx';
import { scenarioById, scenariosByCategory } from './data/scenarios.js';
import { useProgress } from './state/useProgress.js';

export default function App() {
  const [view, setView] = useState({ name: 'home' });
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const progress = useProgress();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isMobile) {
    return (
      <div className="viewport-warn">
        <div className="viewport-warn-card">
          <h1>Open this on a larger screen.</h1>
          <p>Squint is desktop-first. Hierarchy on a phone is a different lesson.</p>
        </div>
      </div>
    );
  }

  const goHome = () => setView({ name: 'home' });
  const goCategory = (id) => setView({ name: 'category', categoryId: id });
  const goScenario = (id) => setView({ name: 'scenario', scenarioId: id });

  const afterScenarioComplete = (scenario) => {
    const inCategory = scenariosByCategory(scenario.category);
    const allDone = inCategory.every((s) => progress.getBest(s.id) !== null);
    if (allDone) {
      setView({ name: 'categoryComplete', categoryId: scenario.category });
    } else {
      setView({ name: 'category', categoryId: scenario.category });
    }
  };

  return (
    <div className="app">
      {view.name !== 'scenario' && (
        <header className="top-bar">
          <div>
            <button
              className="brand"
              onClick={goHome}
              style={{ cursor: view.name === 'home' ? 'default' : 'pointer' }}
            >
              Squint
            </button>
            <span className="brand-sub">Visual hierarchy trainer</span>
          </div>
          <div className="top-bar-right">v0.1</div>
        </header>
      )}

      {view.name === 'home' && (
        <Home onPickCategory={goCategory} progress={progress} />
      )}

      {view.name === 'category' && (
        <CategoryView
          categoryId={view.categoryId}
          onBack={goHome}
          onPick={goScenario}
          progress={progress}
        />
      )}

      {view.name === 'categoryComplete' && (
        <CategoryComplete
          categoryId={view.categoryId}
          progress={progress}
          onBackHome={goHome}
          onPickCategory={goCategory}
        />
      )}

      {view.name === 'scenario' && (() => {
        const scenario = scenarioById(view.scenarioId);
        if (!scenario) {
          return (
            <div className="home">
              <p>
                Scenario not found.{' '}
                <button onClick={goHome}>Go home</button>
              </p>
            </div>
          );
        }
        return (
          <Scenario
            scenario={scenario}
            onBack={() => goCategory(scenario.category)}
            onComplete={() => afterScenarioComplete(scenario)}
            onRecordScore={progress.record}
          />
        );
      })()}
    </div>
  );
}
