import { CATEGORIES } from '../data/categories.js';
import { scenariosByCategory } from '../data/scenarios.js';

export default function CategoryView({ categoryId, onBack, onPick, progress }) {
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

      <p className="eyebrow">
        {scenarios.length} scenario{scenarios.length === 1 ? '' : 's'}
      </p>
      <div className="category-grid">
        {scenarios.map((s, i) => {
          const best = progress.getBest(s.id);
          return (
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
                <span>{s.rankedElements.length} elements</span>
                <span className="category-tile-score">
                  {best !== null ? `${best}` : '→'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 'var(--s-5)' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to categories
        </button>
      </div>
    </div>
  );
}
