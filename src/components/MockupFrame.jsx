import { MOCKUP_REGISTRY } from './mockups/registry.js';

/**
 * Renders a mockup by scenario id inside a styling boundary.
 * Inside the frame, mockups can bring their own typography, color, and spacing
 * without leaking into the trainer chrome.
 */
export default function MockupFrame({ scenarioId }) {
  const Component = MOCKUP_REGISTRY[scenarioId];
  if (!Component) {
    return (
      <div className="mockup-frame mockup-frame--missing">
        <p>No mockup registered for <code>{scenarioId}</code>.</p>
      </div>
    );
  }
  return (
    <div className="mockup-frame">
      <div className="mockup-scope">
        <Component />
      </div>
    </div>
  );
}
