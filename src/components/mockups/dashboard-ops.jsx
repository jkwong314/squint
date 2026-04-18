import RankableElement from '../RankableElement.jsx';
import './dashboard-ops.css';

export default function DashboardOps() {
  return (
    <div className="dash-ops">
      <div className="dash-ops__head">
        <span className="dash-ops__brand">NOC · production</span>
        <RankableElement
          id="ops-global-status"
          label="Global status indicator"
          rationale="On an ops dashboard, the overall state is the thesis of the page. Colored, always-visible, demands resolution before anything else."
          className="dash-ops__status dash-ops__status--degraded"
        >
          <span className="dash-ops__status-dot" /> DEGRADED
        </RankableElement>
      </div>

      <RankableElement
        id="ops-active-incident"
        label="Active incident banner"
        rationale="A live fire. This is why the ops engineer opened the page. Top of screen, highest contrast, the only red thing — by design."
        className="dash-ops__incident"
      >
        <div>
          <p className="dash-ops__incident-label">ACTIVE · P1 · opened 14 min ago</p>
          <p className="dash-ops__incident-title">Payment webhook failures — 4.2% error rate</p>
          <p className="dash-ops__incident-assignee">Assigned to @morgan · <a href="#">Open runbook</a></p>
        </div>
        <button className="dash-ops__incident-cta">Acknowledge</button>
      </RankableElement>

      <div className="dash-ops__grid">
        <RankableElement
          id="ops-error-rate"
          label="Error rate chart"
          rationale="Tells the story of the incident visually. Tightly coupled to the alert above it — the shape is the evidence."
          className="dash-ops__chart"
        >
          <span className="dash-ops__chart-title">ERROR RATE · 1h</span>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="dash-ops__chart-svg">
            <path d="M0,55 L30,50 L60,52 L90,45 L120,30 L150,12 L180,8 L200,5" stroke="#c0392b" strokeWidth="1.5" fill="none" />
          </svg>
        </RankableElement>

        <RankableElement
          id="ops-latency"
          label="Latency chart"
          rationale="Secondary chart. Supports context but hasn't moved much — its visual quiet is itself the signal."
          className="dash-ops__chart"
        >
          <span className="dash-ops__chart-title">P95 LATENCY · 1h</span>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="dash-ops__chart-svg">
            <path d="M0,40 L30,38 L60,42 L90,36 L120,40 L150,38 L180,42 L200,40" stroke="#111" strokeWidth="1.5" fill="none" />
          </svg>
        </RankableElement>

        <RankableElement
          id="ops-service-list"
          label="Service list"
          rationale="A detail table. Necessary for triage but visually quiet — if the incident banner didn't exist, this list would be the story instead."
          className="dash-ops__services"
        >
          <span className="dash-ops__chart-title">SERVICES · 12 / 14 OK</span>
          <ul>
            <li><span className="dash-ops__dot dash-ops__dot--ok" /> api-gateway</li>
            <li><span className="dash-ops__dot dash-ops__dot--fail" /> payments-webhook</li>
            <li><span className="dash-ops__dot dash-ops__dot--ok" /> queue-worker</li>
            <li><span className="dash-ops__dot dash-ops__dot--ok" /> auth-svc</li>
            <li><span className="dash-ops__dot dash-ops__dot--warn" /> search-svc</li>
          </ul>
        </RankableElement>
      </div>

      <RankableElement
        id="ops-deploy-log"
        label="Recent deploys"
        rationale="Historical context. Useful for correlating cause and effect but the lowest priority element on the page — until you need it."
        className="dash-ops__deploys"
      >
        <span className="dash-ops__chart-title">RECENT DEPLOYS</span>
        <div>payments-webhook · 14m ago · morgan@fernway</div>
        <div>api-gateway · 2h ago · deploy-bot</div>
      </RankableElement>
    </div>
  );
}
