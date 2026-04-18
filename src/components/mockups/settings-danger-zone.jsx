import RankableElement from '../RankableElement.jsx';
import './settings-danger-zone.css';

export default function SettingsDangerZone() {
  return (
    <div className="set-dz">
      <RankableElement
        id="dz-title"
        label="'Danger zone' heading"
        rationale="A label this severe is the whole point. If a user misses this heading, they might destroy something irreversible — so it earns the biggest weight on the page."
        as="h1"
        className="set-dz__title"
      >
        Danger zone
      </RankableElement>

      <RankableElement
        id="dz-warning"
        label="Warning banner"
        rationale="Red banner, centered copy. The warning outranks the actions because the warning is what lets the user decide. Read before acted upon — by design."
        className="set-dz__warning"
      >
        <strong>Everything in this section is irreversible.</strong> Take a breath.
      </RankableElement>

      <RankableElement
        id="dz-transfer"
        label="Transfer ownership row"
        rationale="Destructive but recoverable. Lower weight than deletion — buttons are outlined, not filled. Still meaningful enough to warrant its own row."
        className="set-dz__row"
      >
        <div>
          <h3>Transfer ownership</h3>
          <p>Move this workspace to another member. You keep your seat; they take over billing.</p>
        </div>
        <button className="set-dz__btn-secondary">Transfer…</button>
      </RankableElement>

      <RankableElement
        id="dz-archive"
        label="Archive workspace row"
        rationale="Middle severity. Archives pause but don't destroy. The UI should read as heavier than transfer, lighter than delete."
        className="set-dz__row"
      >
        <div>
          <h3>Archive workspace</h3>
          <p>Freeze deploys and integrations. Data is retained for 90 days.</p>
        </div>
        <button className="set-dz__btn-warn">Archive…</button>
      </RankableElement>

      <RankableElement
        id="dz-delete"
        label="Delete workspace row"
        rationale="The most dangerous action on the page. Red button, confirming copy, explicit about consequences. The hierarchy inside this row must be unambiguous."
        className="set-dz__row set-dz__row--delete"
      >
        <div>
          <h3>Delete workspace</h3>
          <p>Permanently remove this workspace, all deploys, integrations, and audit logs. Cannot be undone.</p>
        </div>
        <button className="set-dz__btn-danger">Delete…</button>
      </RankableElement>

      <RankableElement
        id="dz-backlink"
        label="'Back to settings' link"
        rationale="Escape hatch. Small, quiet, top-left — the classic place. High interaction value (people come here by mistake), low visual weight."
        as="a"
        className="set-dz__back"
        href="#"
      >
        ← Back to settings
      </RankableElement>
    </div>
  );
}
