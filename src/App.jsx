import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import Scenario from './components/Scenario.jsx';
import { scenarioById, scenariosByCategory } from './data/scenarios.js';
import { CATEGORIES } from './data/categories.js';

export default function App() {
  const [view, setView] = useState({ name: 'home' });
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

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

  return (
    <div className="app">
      {view.name !== 'scenario' && (
        <header className="top-bar">
          <div>
            <button
              className="brand"
              onClick={() => setView({ name: 'home' })}
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
        <Home onPickCategory={(id) => setView({ name: 'category', categoryId: id })} />
      )}

      {view.name === 'category' && (
        <CategoryView
          categoryId={view.categoryId}
          onBack={() => setView({ name: 'home' })}
          onPick={(scenarioId) => setView({ name: 'scenario', scenarioId })}
        />
      )}

      {view.name === 'scenario' && (() => {
        const scenario = scenarioById(view.scenarioId);
        if (!scenario) {
          return (
            <div className="home">
              <p>Scenario not found. <button onClick={() => setView({ name: 'home' })}>Go home</button></p>
            </div>
          );
        }
        return (
          <Scenario
            scenario={scenario}
            onBack={() => setView({ name: 'category', categoryId: scenario.category })}
            onComplete={() => setView({ name: 'category', categoryId: scenario.category })}
          />
        );
      })()}
    </div>
  );
}

function CategoryView({ categoryId, onBack, onPick }) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const scenarios = scenariosByCategory(categoryId);
  if (!category) return null;

  return (
    <div className="home">
      <p className="eyebrow">Category</p>
      <div className="home-hero">
        <h1 className="home-title">{category.name}</h1>
        <p className="home-lede">{category.description}</p>
      </div>

      {scenarios.length === 0 ? (
        <div>
          <p className="panel-hint" style={{ marginBottom: '24px' }}>
            No scenarios in this category yet. Check back as the library grows.
          </p>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to categories
          </button>
        </div>
      ) : (
        <>
          <p className="eyebrow">{scenarios.length} scenario{scenarios.length === 1 ? '' : 's'}</p>
          <div className="category-grid">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                className="category-tile"
                onClick={() => onPick(s.id)}
                style={{ gridColumn: 'span 2' }}
              >
                <div className="category-tile-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="category-tile-name" style={{ fontSize: 'var(--fs-h2)' }}>
                  {s.title}
                </div>
                <div className="category-tile-meta">
                  <span>{s.rankedElements.length} elements to rank</span>
                  <span className="category-tile-score">→</span>
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 'var(--s-5)' }}>
            <button className="btn btn-secondary" onClick={onBack}>
              ← Back to categories
            </button>
          </div>
        </>
      )}
    </div>
  );
}
