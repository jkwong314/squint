import { CATEGORIES } from '../data/categories.js';
import { scenariosByCategory } from '../data/scenarios.js';

export default function Home({ onPickCategory, progress }) {
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">Squint at the page. The hierarchy reveals itself.</h1>
        <p className="home-lede">
          A training ground for visual hierarchy. We show a mockup, you rank its
          elements in order of importance. Then a senior designer tells you why.
        </p>
      </div>

      <p className="eyebrow">Pick a category</p>
      <div className="category-grid">
        {CATEGORIES.map((cat, i) => {
          const count = scenariosByCategory(cat.id).length;
          const done = progress.categoryCompleted(cat.id);
          const best = progress.categoryBest(cat.id);
          return (
            <button
              key={cat.id}
              className="category-tile"
              onClick={() => onPickCategory(cat.id)}
            >
              <div className="category-tile-num">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="category-tile-name">{cat.name}</div>
              <div className="category-tile-meta">
                <span>
                  {done} / {count} done
                </span>
                <span className="category-tile-score">
                  {best !== null ? `${best} avg` : '—'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="footer-note">
        Squint is a visual hierarchy trainer. No accounts, no tracking, no AI.
        All mockups and rationales are hand-authored. Best used on a laptop.
      </p>
    </div>
  );
}
