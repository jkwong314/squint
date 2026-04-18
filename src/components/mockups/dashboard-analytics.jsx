import RankableElement from '../RankableElement.jsx';
import './dashboard-analytics.css';

export default function DashboardAnalytics() {
  return (
    <div className="dash-an">
      <div className="dash-an__head">
        <div>
          <RankableElement
            id="dash-title"
            label="Page title"
            rationale="Locates you in the product. Readers already know they're in the dashboard — titles on dashboards do quiet, orienting work."
            as="h1"
            className="dash-an__title"
          >
            Overview
          </RankableElement>
          <p className="dash-an__subtitle">Last 30 days</p>
        </div>
        <RankableElement
          id="dash-date-picker"
          label="Date range picker"
          rationale="Control. Users reach for it only when the default is wrong. Low hierarchy, but always in the same spot."
          as="button"
          className="dash-an__date"
        >
          Last 30 days ▾
        </RankableElement>
      </div>

      <div className="dash-an__kpis">
        <RankableElement
          id="kpi-primary"
          label="Primary KPI: Revenue"
          rationale="The number the business runs on. Largest type on the dashboard. On a dashboard, the KPI is the headline."
          className="dash-an__kpi dash-an__kpi--primary"
        >
          <span className="dash-an__kpi-label">REVENUE</span>
          <span className="dash-an__kpi-value">$128,430</span>
          <span className="dash-an__kpi-delta dash-an__kpi-delta--up">+12.4% vs. prior</span>
        </RankableElement>

        <RankableElement
          id="kpi-secondary"
          label="Secondary KPI: Active users"
          rationale="Adjacent to primary. Matters, but a B-side. Weight is deliberately one step down — same card, smaller number."
          className="dash-an__kpi"
        >
          <span className="dash-an__kpi-label">ACTIVE USERS</span>
          <span className="dash-an__kpi-value dash-an__kpi-value--sm">4,812</span>
          <span className="dash-an__kpi-delta dash-an__kpi-delta--up">+3.1%</span>
        </RankableElement>

        <RankableElement
          id="kpi-conversion"
          label="Tertiary KPI: Conversion"
          rationale="Context metric. Only useful when the top-line moves. You notice it when you need it — not before."
          className="dash-an__kpi"
        >
          <span className="dash-an__kpi-label">CONVERSION</span>
          <span className="dash-an__kpi-value dash-an__kpi-value--sm">2.84%</span>
          <span className="dash-an__kpi-delta dash-an__kpi-delta--down">−0.2%</span>
        </RankableElement>
      </div>

      <RankableElement
        id="chart"
        label="Revenue chart"
        rationale="A chart is secondary to its KPI card — the number summarizes the shape. But it's the most visually massive block on the page, so it reads before the details below."
        className="dash-an__chart"
      >
        <span className="dash-an__chart-label">REVENUE · DAILY</span>
        <svg className="dash-an__chart-svg" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,80 L40,70 L80,75 L120,55 L160,60 L200,45 L240,50 L280,30 L320,40 L360,25 L400,20"
            stroke="#111"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,80 L40,70 L80,75 L120,55 L160,60 L200,45 L240,50 L280,30 L320,40 L360,25 L400,20 L400,120 L0,120 Z"
            fill="rgba(17, 17, 17, 0.06)"
          />
        </svg>
      </RankableElement>

      <RankableElement
        id="alert-banner"
        label="Alert banner"
        rationale="Conditional content. When present, it jumps the queue — only color on the page is reserved for this. An alert that doesn't outrank the KPI would be a design bug."
        className="dash-an__alert"
      >
        <strong>Heads up.</strong> Stripe webhook latency is elevated. Ops are aware.
      </RankableElement>
    </div>
  );
}
