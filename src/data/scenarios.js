export const SCENARIOS = [
  {
    id: 'marketing-saas-hero',
    category: 'marketing',
    title: 'SaaS landing hero',
    blurb: 'A modern B2B SaaS homepage above the fold. Rank the elements in order of visual importance.',
    rankedElements: [
      { id: 'cta-primary', label: 'Primary CTA' },
      { id: 'headline', label: 'Headline' },
      { id: 'subhead', label: 'Subhead' },
      { id: 'logo', label: 'Logo' },
      { id: 'nav-pricing', label: 'Nav: Pricing' },
      { id: 'trust-bar', label: 'Trust logos strip' },
    ],
    expertOrder: ['cta-primary', 'headline', 'subhead', 'logo', 'nav-pricing', 'trust-bar'],
    rationales: {
      'cta-primary': "Only solid-filled element. Warm orange against a neutral field. Wins on color, weight, and isolation — the hero's reason to exist.",
      'headline': 'Largest type on the page. Carries the promise. The second most important element — but only because the CTA carries action.',
      'subhead': 'Supports the headline with a concrete promise. Important — but subordinate by design: smaller, lighter, shorter line length.',
      'logo': "The logo orients — but hierarchy-wise, it's table stakes. Users know the brand by the time they're on the page.",
      'nav-pricing': 'Pricing is where commercial intent lives. Mid-weight link; matters, but not the first thing a first-time visitor needs.',
      'trust-bar': "Social proof anchors at the bottom, dimmed. Read last but reassures last — that's the job. Quiet by design.",
    },
  },
];

export function scenariosByCategory(categoryId) {
  return SCENARIOS.filter((s) => s.category === categoryId);
}

export function scenarioById(id) {
  return SCENARIOS.find((s) => s.id === id) || null;
}
