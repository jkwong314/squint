import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import CategoryView from './components/CategoryView.jsx';
import Scenario from './components/Scenario.jsx';
import CategoryComplete from './components/CategoryComplete.jsx';
import { scenarioById, scenariosByCategory } from './data/scenarios.js';
import { useProgress } from './state/useProgress.js';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 10A6 6 0 0 1 6 2.5a.5.5 0 0 0-.6-.6A6.5 6.5 0 1 0 14.1 10.6a.5.5 0 0 0-.6-.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState({ name: 'home' });
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('squint-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const progress = useProgress();

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('squint-theme', dark ? 'dark' : 'light');
  }, [dark]);

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
          <div className="top-bar-right">
            <button
              className="theme-toggle"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <span>v0.1</span>
          </div>
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
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
          />
        );
      })()}
    </div>
  );
}
