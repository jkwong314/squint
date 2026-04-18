import RankableElement from '../RankableElement.jsx';
import './marketing-pricing-cta.css';

export default function MarketingPricingCta() {
  return (
    <div className="mk-pcta">
      <RankableElement
        id="pcta-eyebrow"
        label="Section eyebrow"
        rationale="Orienting label. Tells the reader what kind of moment this is. Important but by convention subordinate."
        as="p"
        className="mk-pcta__eyebrow"
      >
        PRICING · SIMPLE BY DEFAULT
      </RankableElement>

      <RankableElement
        id="pcta-headline"
        label="Headline"
        rationale="The proposition. Large and centered. Carries the emotional weight that earns the click."
        as="h2"
        className="mk-pcta__headline"
      >
        One plan.<br />Everything included.
      </RankableElement>

      <RankableElement
        id="pcta-price"
        label="Price"
        rationale="The single biggest piece of information on this page. Numerical hierarchy — a price gets read even when nothing else does."
        className="mk-pcta__price"
      >
        <span className="mk-pcta__price-currency">$</span>
        <span className="mk-pcta__price-num">12</span>
        <span className="mk-pcta__price-interval">/user/mo</span>
      </RankableElement>

      <RankableElement
        id="pcta-sub"
        label="Price subtext"
        rationale="Clarifies the offer. Needs to be near the price but must never compete with it."
        as="p"
        className="mk-pcta__sub"
      >
        Billed annually · Cancel anytime · 14-day trial
      </RankableElement>

      <RankableElement
        id="pcta-button"
        label="'Start free trial' button"
        rationale="The only way forward. Solid black against an off-white field. The page's second-largest visual weight after the price."
        as="button"
        className="mk-pcta__button"
      >
        Start 14-day trial
      </RankableElement>

      <RankableElement
        id="pcta-finePrint"
        label="Fine print / guarantee"
        rationale="Risk-reducer, read last. Everyone who cares will find it; it doesn't need to find them."
        className="mk-pcta__fine"
      >
        No credit card required. Data stays yours.
      </RankableElement>
    </div>
  );
}
