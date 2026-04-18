import { useRanking } from '../state/RankingContext.jsx';

export default function RankingPanel({ rankedElements, onSubmit, title }) {
  const { order, unassign, clear } = useRanking();
  const total = rankedElements.length;
  const isFull = order.length === total;

  const labelFor = (id) => rankedElements.find((e) => e.id === id)?.label || id;

  return (
    <aside className="panel">
      <div className="panel-head">
        <p className="eyebrow">Your ranking</p>
        <h2 className="panel-title">{title}</h2>
        <p className="panel-hint">
          Click elements in the mockup in order of visual importance.
          Click an assigned element again to remove it.
        </p>
      </div>

      <ol className="slot-list">
        {Array.from({ length: total }).map((_, i) => {
          const id = order[i];
          return (
            <li key={i} className={'slot' + (id ? ' slot--filled' : '')}>
              <span className="slot-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="slot-label">
                {id ? labelFor(id) : <em className="slot-empty">—</em>}
              </span>
              {id && (
                <button
                  className="slot-remove"
                  onClick={() => unassign(id)}
                  aria-label={`Remove ${labelFor(id)} from ranking`}
                  title="Remove"
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
      </ol>

      <div className="panel-actions">
        <button
          className="btn btn-secondary"
          onClick={clear}
          disabled={order.length === 0}
        >
          Clear
        </button>
        <button
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={!isFull}
        >
          {isFull ? 'Submit ranking' : `${order.length} / ${total} ranked`}
        </button>
      </div>
    </aside>
  );
}
