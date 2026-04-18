import RankableElement from '../RankableElement.jsx';
import './settings-billing.css';

export default function SettingsBilling() {
  return (
    <div className="set-bill">
      <h1 className="set-bill__title">Billing</h1>

      <RankableElement
        id="sb-current-plan"
        label="Current plan card"
        rationale="The most important fact on this page: what am I paying for. Large card, bolded plan name, separate from the rest. The reason someone opens Billing."
        className="set-bill__plan"
      >
        <div>
          <span className="set-bill__plan-label">CURRENT PLAN</span>
          <h2 className="set-bill__plan-name">Team · Annual</h2>
          <p className="set-bill__plan-meta">$12/user · 8 users · Renews Nov 12, 2026</p>
        </div>
        <span className="set-bill__plan-tag">ACTIVE</span>
      </RankableElement>

      <RankableElement
        id="sb-usage"
        label="Usage meter"
        rationale="Proximity-anchored to the plan (am I using what I'm paying for?). Visual weight comes from the bar, but it serves the plan above."
        className="set-bill__usage"
      >
        <div className="set-bill__usage-row">
          <span>Deploys this cycle</span>
          <strong>1,240 / 2,500</strong>
        </div>
        <div className="set-bill__meter"><span style={{ width: '49.6%' }} /></div>
      </RankableElement>

      <div className="set-bill__row">
        <RankableElement
          id="sb-payment-method"
          label="Payment method"
          rationale="Identifying info. Quiet display, but load-bearing — wrong card = dropped renewal. Middle priority."
          className="set-bill__method"
        >
          <span className="set-bill__method-label">PAYMENT METHOD</span>
          <div className="set-bill__card-row">
            <span className="set-bill__card-chip">VISA</span>
            <span>•••• 4242 · exp 04/2027</span>
          </div>
          <a href="#" className="set-bill__edit-link">Update</a>
        </RankableElement>

        <RankableElement
          id="sb-invoices"
          label="Invoices link"
          rationale="Historical record. Visited occasionally, rarely the primary reason for being here. Low priority in the layout."
          className="set-bill__invoices"
        >
          <span className="set-bill__method-label">INVOICES</span>
          <a href="#" className="set-bill__invoice-item">March 2026 · $96.00 →</a>
          <a href="#" className="set-bill__invoice-item">February 2026 · $96.00 →</a>
          <a href="#" className="set-bill__edit-link">View all</a>
        </RankableElement>
      </div>

      <RankableElement
        id="sb-cancel"
        label="Cancel subscription link"
        rationale="Intentional low hierarchy. You shouldn't cancel by accident — tiny, bottom-anchored, neutral color. Findable but never reachable by a misclick."
        as="a"
        className="set-bill__cancel"
        href="#"
      >
        Cancel subscription
      </RankableElement>
    </div>
  );
}
