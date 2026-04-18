import { CATEGORIES } from '../data/categories.js';
import { scenariosByCategory } from '../data/scenarios.js';

export default function CategoryComplete({ categoryId, progress, onBackHome, onPickCategory }) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const scenarios = scenariosByCategory(categoryId);
  const best = progress.categoryBest(categoryId);
  const others = CATEGORIES.filter((c) => c.id !== categoryId);

  if (!category) return null;

  return (
    <div className="home">
      <p className="eyebrow">{category.name} · complete</p>
      <div className="home-hero">
        <h1 className="home-title">You finished {category.name}.</h1>
        <p className="home-lede">
          Category average: <strong>{best !== null ? `${best} / 100` : '—'}</strong>.
          Scores improve on replay. The rationales stay the same on purpose — they're not a guessing game.
        </p>
      </div>

      <p className="eyebrow">Per-scenario best</p>
      <ol className="review-delta-list" style={{ marginBottom: 'var(--s-6)' }}>
        {scenarios.map((s, i) => {
          const score = progress.getBest(s.id);
          return (
            <li key={s.id} className="review-delta">
              <span className="review-delta-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="review-delta-label">{s.title}</span>
              <span className="review-delta-change flat">{score !== null ? score : '—'}</span>
            </li>
          );
        })}
      </ol>

      <p className="eyebrow">Try another category</p>
      <div className="category-grid">
        {others.map((c, i) => (
          <button
            key={c.id}
            className="category-tile"
            onClick={() => onPickCategory(c.id)}
          >
            <div className="category-tile-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="category-tile-name">{c.name}</div>
            <div className="category-tile-meta">
              <span>{progress.categoryCompleted(c.id)} / {scenariosByCategory(c.id).length} done</span>
              <span className="category-tile-score">
                {progress.categoryBest(c.id) !== null ? `${progress.categoryBest(c.id)}` : '—'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'var(--s-5)' }}>
        <button className="btn btn-secondary" onClick={onBackHome}>
          ← Back to categories
        </button>
      </div>
    </div>
  );
}
