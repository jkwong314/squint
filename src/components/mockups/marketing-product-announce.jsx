import RankableElement from '../RankableElement.jsx';
import './marketing-product-announce.css';

export default function MarketingProductAnnounce() {
  return (
    <div className="mk-announce">
      <div className="mk-announce__tag-row">
        <RankableElement
          id="announce-badge"
          label="'New' badge"
          rationale="Context-setter, not content. A small pill signals novelty but would never win attention on its own — it's a label, not a message."
          className="mk-announce__badge"
        >
          NEW · April 2026
        </RankableElement>
      </div>

      <RankableElement
        id="announce-title"
        label="Announcement title"
        rationale="Massive serif, single line. This is what the page is about. Nothing else on the page has its scale — nor should it."
        as="h1"
        className="mk-announce__title"
      >
        Fernway 2.0 — now with rollback maps.
      </RankableElement>

      <RankableElement
        id="announce-lede"
        label="Lede paragraph"
        rationale="One sentence sums the promise. Larger than body, smaller than title. Editorial craft: every word earns its place."
        as="p"
        className="mk-announce__lede"
      >
        See every deploy, every dependency, every way back — in one map.
      </RankableElement>

      <RankableElement
        id="announce-cta"
        label="'Read the post' CTA"
        rationale="Underlined link in the accent color. In an editorial layout, the CTA doesn't shout — it waits. But it's the only interactive element that moves the reader forward."
        as="a"
        className="mk-announce__cta"
        href="#"
      >
        Read the announcement →
      </RankableElement>

      <RankableElement
        id="announce-hero-image"
        label="Hero artwork"
        rationale="The art carries mood and makes the page memorable, but hierarchy-wise it supports the title. You'd read the title even if the image failed to load."
        className="mk-announce__art"
      >
        <div className="mk-announce__art-inner" aria-hidden="true">
          <div className="mk-announce__art-node mk-announce__art-node--1" />
          <div className="mk-announce__art-node mk-announce__art-node--2" />
          <div className="mk-announce__art-node mk-announce__art-node--3" />
          <svg className="mk-announce__art-lines" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M60,40 C160,40 140,160 280,160" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M60,40 C120,40 140,100 280,100" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M280,100 C320,100 300,160 340,160" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </RankableElement>

      <RankableElement
        id="announce-byline"
        label="Byline / date"
        rationale="Metadata. Useful for credibility and recency, but it only needs to be found — not seen first."
        className="mk-announce__byline"
      >
        By the Fernway team · April 12, 2026
      </RankableElement>
    </div>
  );
}
