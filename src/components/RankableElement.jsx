import { useRanking } from '../state/RankingContext.jsx';

/**
 * Wraps any mockup element to make it participate in ranking.
 *
 * Contract:
 *   <RankableElement id="cta-primary" label="Primary CTA" as="button">...</RankableElement>
 *
 * Renders a wrapping <span>/<div> (configurable via `as`) with:
 *   - hover outline (ranking mode)
 *   - rank chip overlay when assigned
 *   - click-to-assign / click-to-unassign
 *   - review mode: outline color reflects correctness; rationale accessible via aria-label
 */
export default function RankableElement({
  id,
  label,
  as = 'span',
  rationale,
  children,
  style,
  className = '',
  ...rest
}) {
  const { mode, assign, unassign, rankOf, expertRankOf } = useRanking();
  const rank = rankOf(id);
  const expertRank = expertRankOf(id);

  const isReview = mode === 'review';
  const isCorrect = isReview && rank !== null && rank === expertRank;
  const isWrong = isReview && rank !== null && rank !== expertRank;

  const handleClick = (e) => {
    if (isReview) return;
    e.stopPropagation();
    if (rank === null) assign(id);
    else unassign(id);
  };

  const Wrapper = as;

  const wrapperClass = [
    'rankable',
    rank !== null && 'rankable--assigned',
    isReview && 'rankable--review',
    isCorrect && 'rankable--correct',
    isWrong && 'rankable--wrong',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Wrapper
      {...rest}
      onClick={handleClick}
      className={wrapperClass}
      style={style}
      data-rankable-id={id}
      data-rankable-label={label}
      aria-label={isReview && rationale ? `${label}. ${rationale}` : label}
      tabIndex={isReview ? -1 : 0}
      onKeyDown={(e) => {
        if (isReview) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
    >
      {children}
      {rank !== null && (
        <span
          className={
            'rank-chip' +
            (isCorrect ? ' rank-chip--correct' : '') +
            (isWrong ? ' rank-chip--wrong' : '')
          }
          aria-hidden="true"
        >
          {rank}
        </span>
      )}
      {isReview && expertRank !== null && rank !== expertRank && (
        <span className="rank-chip rank-chip--expert" aria-hidden="true">
          {expertRank}
        </span>
      )}
      {isReview && rationale && (
        <span className="rank-rationale" role="note">
          {rationale}
        </span>
      )}
    </Wrapper>
  );
}
