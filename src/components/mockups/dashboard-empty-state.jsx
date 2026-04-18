import RankableElement from '../RankableElement.jsx';
import './dashboard-empty-state.css';

export default function DashboardEmptyState() {
  return (
    <div className="dash-empty">
      <aside className="dash-empty__sidebar" aria-hidden="true">
        <div className="dash-empty__sidebar-brand">Fernway</div>
        <div className="dash-empty__nav-item dash-empty__nav-item--active">Overview</div>
        <div className="dash-empty__nav-item">Projects</div>
        <div className="dash-empty__nav-item">Integrations</div>
        <div className="dash-empty__nav-item">Settings</div>
      </aside>

      <main className="dash-empty__main">
        <h1 className="dash-empty__title">Overview</h1>

        <div className="dash-empty__card">
          <RankableElement
            id="empty-illustration"
            label="Illustration"
            rationale="Carries tone but not information. In an empty state, the illustration is mood-setting; it should never outrank the instruction."
            className="dash-empty__art"
          >
            <svg viewBox="0 0 120 90" aria-hidden="true">
              <rect x="20" y="20" width="80" height="60" fill="none" stroke="#111" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="60" cy="50" r="10" fill="#d7263d" />
            </svg>
          </RankableElement>

          <RankableElement
            id="empty-headline"
            label="Empty-state headline"
            rationale="The job of an empty state is to answer 'what now?' — in one line. Largest type in the card, reads first."
            as="h2"
            className="dash-empty__h"
          >
            Connect your first project.
          </RankableElement>

          <RankableElement
            id="empty-body"
            label="Supporting copy"
            rationale="Explains the 'why' behind the primary action. Smaller than the headline, but larger than docs links — it's the bridge to the click."
            as="p"
            className="dash-empty__body"
          >
            We'll watch your deploys, flag risky migrations, and keep a rollback plan ready.
            Takes about 90 seconds.
          </RankableElement>

          <RankableElement
            id="empty-primary"
            label="'Connect project' button"
            rationale="The only way forward on an empty state. The CTA is why this page exists — it must win. Solid fill, accent color, centered."
            as="button"
            className="dash-empty__cta"
          >
            Connect a project →
          </RankableElement>

          <RankableElement
            id="empty-docs"
            label="'Read the docs' link"
            rationale="An escape hatch for the curious. Secondary by intention — most users should take the primary path."
            as="a"
            className="dash-empty__docs"
            href="#"
          >
            Or read the docs first
          </RankableElement>
        </div>
      </main>
    </div>
  );
}
