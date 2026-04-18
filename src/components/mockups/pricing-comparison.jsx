import RankableElement from '../RankableElement.jsx';
import './pricing-comparison.css';

export default function PricingComparison() {
  return (
    <div className="pr-cmp">
      <h2 className="pr-cmp__h">Compare plans</h2>

      <div className="pr-cmp__table">
        <RankableElement
          id="pc-header-team"
          label="'Team' column header"
          rationale="Highlighted column on a comparison. Bolder fill, larger price — the comparison table is also a sales tool, and its pointer is still set."
          className="pr-cmp__col-head pr-cmp__col-head--highlight"
        >
          <strong>Team</strong>
          <span>$12/user/mo</span>
        </RankableElement>

        <RankableElement
          id="pc-header-starter"
          label="'Starter' column header"
          rationale="Peer to other columns. Its label is all it needs to do — the comparison rows do the talking."
          className="pr-cmp__col-head"
        >
          <strong>Starter</strong>
          <span>Free</span>
        </RankableElement>

        <RankableElement
          id="pc-header-enterprise"
          label="'Enterprise' column header"
          rationale="Same weight as Starter; the page needs to visually demote both to keep Team in focus."
          className="pr-cmp__col-head"
        >
          <strong>Enterprise</strong>
          <span>Custom</span>
        </RankableElement>

        <RankableElement
          id="pc-row-highlighted"
          label="'Rollback maps' feature row"
          rationale="Bold-marked row in the feature list — the one feature the page wants you to care about. Column headers outrank it, but it outranks all other rows."
          className="pr-cmp__row pr-cmp__row--highlight"
        >
          <span className="pr-cmp__feature">Rollback maps</span>
          <span className="pr-cmp__check">—</span>
          <span className="pr-cmp__check pr-cmp__check--yes">✓</span>
          <span className="pr-cmp__check pr-cmp__check--yes">✓</span>
        </RankableElement>

        <RankableElement
          id="pc-cta-row"
          label="CTA row (bottom of table)"
          rationale="The decision moment, placed where the eye lands after a scan. 'Start trial' button under the Team column continues the column's emphasis."
          className="pr-cmp__row pr-cmp__row--cta"
        >
          <span className="pr-cmp__feature" aria-hidden="true" />
          <button className="pr-cmp__btn pr-cmp__btn--ghost">Start free</button>
          <button className="pr-cmp__btn pr-cmp__btn--primary">Start trial</button>
          <button className="pr-cmp__btn pr-cmp__btn--ghost">Contact sales</button>
        </RankableElement>

        <RankableElement
          id="pc-footnote"
          label="Footnote"
          rationale="Metadata, currency, fine print. Read only when needed — visually subordinate to every row above it."
          className="pr-cmp__footnote"
        >
          All prices in USD. Annual billing saves 20%.
        </RankableElement>
      </div>
    </div>
  );
}
