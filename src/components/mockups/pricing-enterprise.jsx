import RankableElement from '../RankableElement.jsx';
import './pricing-enterprise.css';

export default function PricingEnterprise() {
  return (
    <div className="pr-ent">
      <div className="pr-ent__left">
        <span className="pr-ent__eyebrow">ENTERPRISE</span>
        <RankableElement
          id="pe-headline"
          label="Headline"
          rationale="Serious, measured. Enterprise buyers read the headline to confirm they're on the right page — it anchors confidence more than it persuades."
          as="h1"
          className="pr-ent__h"
        >
          Built for teams where downtime costs more than the tool.
        </RankableElement>

        <RankableElement
          id="pe-subhead"
          label="Subhead"
          rationale="Expands the headline with concrete commitments. Enterprise copy is less poetic, more list-like — this still matters visually."
          as="p"
          className="pr-ent__sub"
        >
          SSO, SOC 2, custom SLAs, and a dedicated engineer. Your procurement team will be fine.
        </RankableElement>

        <RankableElement
          id="pe-cta"
          label="'Talk to sales' CTA"
          rationale="The only action on the page. In enterprise sales, the CTA is an invitation to a conversation, not a transaction — but it's still the weightiest button on the page."
          as="button"
          className="pr-ent__cta"
        >
          Talk to sales
        </RankableElement>

        <RankableElement
          id="pe-trust"
          label="Trust logos"
          rationale="Enterprise social proof. Weightier on this page than a B2B hero — the buyer is often asking 'who else like us trusts them?' before anything else."
          className="pr-ent__trust"
        >
          <span className="pr-ent__trust-label">Trusted by</span>
          <div className="pr-ent__logos">
            <span>NORTHWIND</span>
            <span>AXIS</span>
            <span>QUILL</span>
            <span>CEDAR</span>
          </div>
        </RankableElement>
      </div>

      <div className="pr-ent__right">
        <RankableElement
          id="pe-contact-form"
          label="Contact form card"
          rationale="Functional, not decorative. The form is the CTA's destination — often ranked adjacent to the headline in real hierarchy, since some users skip the pitch and fill the form."
          className="pr-ent__form"
        >
          <h3>Get a quote</h3>
          <div className="pr-ent__field">
            <label>Work email</label>
            <div className="pr-ent__input">name@company.com</div>
          </div>
          <div className="pr-ent__field">
            <label>Company size</label>
            <div className="pr-ent__input">50–200 employees ▾</div>
          </div>
          <button className="pr-ent__form-btn">Request quote</button>
        </RankableElement>

        <RankableElement
          id="pe-compliance"
          label="Compliance badges"
          rationale="Procurement checkboxes. Low priority visually — but their presence (or absence) is itself the signal. Quiet, bottom-anchored, almost invisible unless you're looking."
          className="pr-ent__badges"
        >
          <span className="pr-ent__badge">SOC 2</span>
          <span className="pr-ent__badge">GDPR</span>
          <span className="pr-ent__badge">HIPAA-ready</span>
          <span className="pr-ent__badge">SSO</span>
        </RankableElement>
      </div>
    </div>
  );
}
