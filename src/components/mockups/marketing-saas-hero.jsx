import RankableElement from '../RankableElement.jsx';
import './marketing-saas-hero.css';

/**
 * Marketing: SaaS landing hero.
 *
 * A modern SaaS marketing hero with nav, headline, subhead, CTA, trust logos,
 * and a product screenshot. The CTA is the most important element — it's the
 * only solid-filled, warm-colored, action-oriented element on the page.
 */
export default function MarketingSaasHero() {
  return (
    <div className="mk-saas-hero">
      <nav className="mk-saas-hero__nav">
        <RankableElement
          id="logo"
          label="Logo (Fernway)"
          rationale="The logo orients — but hierarchy-wise, it's table stakes. Users know the brand by the time they're on the page."
          className="mk-saas-hero__logo"
        >
          Fernway
        </RankableElement>
        <div className="mk-saas-hero__nav-links">
          <span className="mk-saas-hero__nav-link">Product</span>
          <RankableElement
            id="nav-pricing"
            label="Nav: Pricing"
            rationale="Pricing is where commercial intent lives. Mid-weight link; matters, but not the first thing a first-time visitor needs."
            className="mk-saas-hero__nav-link"
          >
            Pricing
          </RankableElement>
          <span className="mk-saas-hero__nav-link">Docs</span>
          <span className="mk-saas-hero__nav-link">Login</span>
        </div>
      </nav>

      <div className="mk-saas-hero__body">
        <div className="mk-saas-hero__copy">
          <span className="mk-saas-hero__eyebrow">For product teams shipping weekly</span>
          <RankableElement
            id="headline"
            label="Headline"
            rationale="Largest type on the page. Carries the promise. The second most important element — but only because the CTA carries action."
            as="h1"
            className="mk-saas-hero__headline"
          >
            Ship faster.<br />Break less.
          </RankableElement>
          <RankableElement
            id="subhead"
            label="Subhead"
            rationale="Supports the headline with a concrete promise. Important — but subordinate by design: smaller, lighter, shorter line length."
            as="p"
            className="mk-saas-hero__subhead"
          >
            Fernway is the deployment checklist your team actually uses.
            Environment parity, preflight checks, and rollbacks in one place.
          </RankableElement>
          <div className="mk-saas-hero__cta-row">
            <RankableElement
              id="cta-primary"
              label="Primary CTA"
              rationale="Only solid-filled element. Warm orange against a neutral field. Wins on color, weight, and isolation — the hero's reason to exist."
              as="button"
              className="mk-saas-hero__cta-primary"
            >
              Start free trial
            </RankableElement>
            <button className="mk-saas-hero__cta-ghost">Book a demo →</button>
          </div>
          <RankableElement
            id="trust-bar"
            label="Trust logos strip"
            rationale="Social proof anchors at the bottom, dimmed. Read last but reassures last — that's the job. Quiet by design."
            className="mk-saas-hero__trust"
          >
            <span className="mk-saas-hero__trust-label">Trusted by teams at</span>
            <span className="mk-saas-hero__trust-logos">
              <span>LINEAR</span>
              <span>VERCEL</span>
              <span>RETOOL</span>
              <span>RAMP</span>
            </span>
          </RankableElement>
        </div>
        <div className="mk-saas-hero__product" aria-hidden="true">
          <div className="mk-saas-hero__product-chrome">
            <span className="mk-saas-hero__product-dot" />
            <span className="mk-saas-hero__product-dot" />
            <span className="mk-saas-hero__product-dot" />
          </div>
          <div className="mk-saas-hero__product-body">
            <div className="mk-saas-hero__product-row">
              <span className="mk-saas-hero__product-bar" style={{ width: '60%' }} />
              <span className="mk-saas-hero__product-pill mk-saas-hero__product-pill--ok">passed</span>
            </div>
            <div className="mk-saas-hero__product-row">
              <span className="mk-saas-hero__product-bar" style={{ width: '80%' }} />
              <span className="mk-saas-hero__product-pill mk-saas-hero__product-pill--ok">passed</span>
            </div>
            <div className="mk-saas-hero__product-row">
              <span className="mk-saas-hero__product-bar" style={{ width: '45%' }} />
              <span className="mk-saas-hero__product-pill mk-saas-hero__product-pill--warn">checking</span>
            </div>
            <div className="mk-saas-hero__product-row">
              <span className="mk-saas-hero__product-bar" style={{ width: '72%' }} />
              <span className="mk-saas-hero__product-pill mk-saas-hero__product-pill--ok">passed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
