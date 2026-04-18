import RankableElement from '../RankableElement.jsx';
import './pricing-three-tier.css';

export default function PricingThreeTier() {
  return (
    <div className="pr-3t">
      <div className="pr-3t__head">
        <p className="pr-3t__eyebrow">PRICING</p>
        <RankableElement
          id="p3-headline"
          label="Page headline"
          rationale="The thesis of a pricing page. Sets the frame: 'this is what you're choosing between.' Important but subordinate to the tier the page wants you to pick."
          as="h1"
          className="pr-3t__h"
        >
          Pick the plan that fits how you ship.
        </RankableElement>
      </div>

      <div className="pr-3t__tiers">
        <RankableElement
          id="p3-tier-starter"
          label="Starter tier"
          rationale="Anchor on the low end. Shows the cheap entry point — readers need to see it to appreciate what's above it."
          className="pr-3t__tier"
        >
          <h3>Starter</h3>
          <p className="pr-3t__tier-price">$0</p>
          <p className="pr-3t__tier-sub">Free forever · 1 project</p>
          <ul>
            <li>1 project</li>
            <li>Basic deploy checks</li>
            <li>Community support</li>
          </ul>
          <button className="pr-3t__btn pr-3t__btn--ghost">Start free</button>
        </RankableElement>

        <RankableElement
          id="p3-tier-team"
          label="Team tier (highlighted)"
          rationale="The page wants you to buy this. Elevated card (dark fill), larger price, a 'recommended' tag, contrasting CTA. The entire design bends to make this the obvious choice."
          className="pr-3t__tier pr-3t__tier--highlight"
        >
          <span className="pr-3t__tier-tag">MOST POPULAR</span>
          <h3>Team</h3>
          <p className="pr-3t__tier-price">$12 <span>/ user / mo</span></p>
          <p className="pr-3t__tier-sub">Billed annually · 14-day trial</p>
          <ul>
            <li>Unlimited projects</li>
            <li>Preflight checks + rollback maps</li>
            <li>Priority support</li>
            <li>Role-based access</li>
          </ul>
          <button className="pr-3t__btn pr-3t__btn--primary">Start 14-day trial</button>
        </RankableElement>

        <RankableElement
          id="p3-tier-enterprise"
          label="Enterprise tier"
          rationale="High-end anchor. Makes the middle tier feel reasonable by comparison. 'Contact us' not 'buy' — the pricing absence is intentional."
          className="pr-3t__tier"
        >
          <h3>Enterprise</h3>
          <p className="pr-3t__tier-price">Let's talk</p>
          <p className="pr-3t__tier-sub">Custom contract · SSO, SOC 2, DPA</p>
          <ul>
            <li>Everything in Team</li>
            <li>SSO + audit logs</li>
            <li>Dedicated CSM</li>
            <li>Custom SLAs</li>
          </ul>
          <button className="pr-3t__btn pr-3t__btn--ghost">Contact sales</button>
        </RankableElement>
      </div>

      <RankableElement
        id="p3-faq-link"
        label="'See all features' link"
        rationale="Escape valve for comparison-shoppers. Small and centered — the page wants you to pick a tile, not keep reading."
        as="a"
        className="pr-3t__faq"
        href="#"
      >
        See all features →
      </RankableElement>
    </div>
  );
}
