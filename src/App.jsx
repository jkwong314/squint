import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';

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
      <header className="top-bar">
        <div>
          <span className="brand">Squint</span>
          <span className="brand-sub">Visual hierarchy trainer</span>
        </div>
        <div className="top-bar-right">v0.1</div>
      </header>

      {view.name === 'home' && (
        <Home onPickCategory={(id) => setView({ name: 'category', categoryId: id })} />
      )}

      {view.name === 'category' && (
        <div className="home">
          <p className="eyebrow">Category: {view.categoryId}</p>
          <p className="home-lede">
            Scenarios land in Phase 4. This screen gets wired up in Phase 6.
          </p>
          <p>
            <button onClick={() => setView({ name: 'home' })}>← back</button>
          </p>
        </div>
      )}
    </div>
  );
}
