import RankableElement from '../RankableElement.jsx';
import './settings-profile.css';

export default function SettingsProfile() {
  return (
    <div className="set-prof">
      <div className="set-prof__head">
        <RankableElement
          id="sp-title"
          label="Section title"
          rationale="Orients. On a settings page, the title tells you which sub-domain of config you're in. Important but by convention quiet."
          as="h1"
          className="set-prof__title"
        >
          Profile
        </RankableElement>
        <p className="set-prof__subtitle">Update how you appear across Fernway.</p>
      </div>

      <div className="set-prof__grid">
        <RankableElement
          id="sp-avatar"
          label="Avatar uploader"
          rationale="High visual weight because it's the biggest non-text element on the page. Users reach for it often — but the identity fields below are more structurally important."
          className="set-prof__avatar"
        >
          <div className="set-prof__avatar-img">JK</div>
          <span className="set-prof__avatar-edit">Change photo</span>
        </RankableElement>

        <div className="set-prof__fields">
          <RankableElement
            id="sp-name"
            label="Display name field"
            rationale="The most personal field. First on the form, weightiest label — your name is the anchor of the profile."
            className="set-prof__field"
          >
            <label className="set-prof__label">Display name</label>
            <div className="set-prof__input">Jamie Kwong</div>
          </RankableElement>

          <RankableElement
            id="sp-email"
            label="Email field"
            rationale="Identity-critical. Conventionally pairs with name. Readers scan for it even when they came for something else."
            className="set-prof__field"
          >
            <label className="set-prof__label">Email</label>
            <div className="set-prof__input set-prof__input--disabled">jamie@fernway.com</div>
            <span className="set-prof__help">Contact support to change.</span>
          </RankableElement>

          <RankableElement
            id="sp-bio"
            label="Bio field"
            rationale="Optional. Long-form. Lower priority than identity fields — most users leave it blank and aren't worse off for it."
            className="set-prof__field"
          >
            <label className="set-prof__label">Bio</label>
            <div className="set-prof__textarea">Staff PM, shipping less so others can ship more.</div>
          </RankableElement>

          <RankableElement
            id="sp-save"
            label="Save button"
            rationale="The form's commit action. Primary button, bottom-right — the conventional resting place. High interaction weight, but only when changes exist."
            as="button"
            className="set-prof__save"
          >
            Save changes
          </RankableElement>
        </div>
      </div>
    </div>
  );
}
