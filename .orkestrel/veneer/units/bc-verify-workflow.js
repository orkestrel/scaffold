export const meta = {
  name: 'b-collapse-verify-portfolio',
  description: 'B-COLLAPSE VERIFY: blind visual lenses over the disclosure family capture frames, then a completeness critic',
  phases: [
    { title: 'Review', detail: 'fidelity, state-truth, and variant lenses per slice, blind to each other' },
    { title: 'Critic', detail: 'what the lenses missed' },
  ],
}

const DIR = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bc-verify-frames'
const SCSS = '/home/user/veneer/node_modules/bootstrap/scss'
const OURS = '/home/user/veneer/src/styles/components'
const SOURCES = {
  'collapse-accordion': ['_transitions.scss', '_accordion.scss'],
  'dropdown-toggles': ['_dropdown.scss', '_button-group.scss', '_input-group.scss', '_buttons.scss'],
  'nav-tabs': ['_nav.scss', '_card.scss'],
  'navbar': ['_navbar.scss', '_nav.scss'],
}
const LENSES = {
  fidelity: 'BOOTSTRAP FIDELITY. For each scenario, judge whether the rendering matches what Bootstrap 5.3.8 renders for the same markup: colours, borders and radii, spacing and alignment, carets and chevrons, typography, and the component\'s own chrome. Read the Bootstrap SCSS source for the component to know what it must look like, and Veneer\'s partial to see what it declares. Report a visible departure, not a guess about an invisible property.',
  state: 'STATE TRUTH. Each frame name claims a state (resting, hover, focus, pressed, shown, hidden, collapsed, expanded, opened, inverted, validated, and the like). For each state frame, compare it with its resting sibling in the same variant and judge whether the frame visibly shows the state its name claims, the way Bootstrap\'s state rule for that component paints it (a focus ring, a hover fill, an active colour, a rotated chevron, an open menu, a hidden panel). Report a state frame that is indistinguishable from resting where Bootstrap paints a difference, or that shows the wrong state.',
  variant: 'VARIANT INTEGRITY. Each scenario is shot in light and dark at 1280 and 390 pixels wide. Judge the dark frames for legibility and for colours Bootstrap\'s dark mode retunes (text, borders, backgrounds, carets, the navbar toggler icon), and the 390 frames for layout: wrapping, overflow, clipping, truncation, a menu or panel cut off by the frame edge, or content pushed out of view. Report a variant that breaks where its sibling variant holds.',
}

const FINDINGS = {
  type: 'object',
  properties: {
    reviewed: { type: 'array', items: { type: 'string' }, description: 'every frame file you opened' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          frame: { type: 'string' },
          region: { type: 'string', description: 'where in the frame' },
          seen: { type: 'string', description: 'what the frame shows' },
          expected: { type: 'string', description: 'what Bootstrap 5.3.8 renders there, citing the SCSS rule by file and selector' },
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['frame', 'region', 'seen', 'expected', 'severity', 'confidence'],
      },
    },
    clean: { type: 'array', items: { type: 'string' }, description: 'scenarios you judged free of defects under your lens' },
  },
  required: ['reviewed', 'findings', 'clean'],
}

function lensPrompt(slice, lens, files) {
  const sources = SOURCES[slice].map((f) => `${SCSS}/${f}`).join(', ')
  return [
    `You are \`reviewer\` on Opus 5.5, a read-only lane in a capture-portfolio verdict round for Veneer, a Bootstrap 5.3.8 re-implementation in SCSS. Perform the review directly and spawn nothing. Edit nothing.`,
    `Your lens: ${LENSES[lens]}`,
    `Your slice: the ${slice} scenarios of the disclosure family. The frames are PNG files in ${DIR}; open each one with the Read tool (it shows you the image). Frame names read <scenario>--<variant>.png, the variant being light-1280, dark-1280, light-390, or dark-390. The frames are: ${files.join(', ')}.`,
    `Reference: Bootstrap's source for this slice is ${sources}; Veneer's partials are under ${OURS}. Each frame is a lifted copy of one showcase specimen photographed on the page surface, so the white or dark band around the component is the page, and a specimen framed in a fixed-height viewport box is deliberately bounded.`,
    `Rules: judge only what the image shows under your lens; do not report what another lens owns; open every frame in your slice and list each in reviewed; give each finding the exact frame file, the region, what you see, what Bootstrap renders there with the SCSS rule you read, a severity (blocker: the component is broken or unreadable; major: a visible departure a user notices; minor: a small visual difference), and your confidence. Report no finding you cannot point at in a frame. List the scenarios you judged clean.`,
  ].join('\n\n')
}

const slices = Object.keys(args)
const units = []
for (const slice of slices) for (const lens of Object.keys(LENSES)) units.push({ slice, lens })

phase('Review')
const results = await parallel(units.map((u) => () =>
  agent(lensPrompt(u.slice, u.lens, args[u.slice]), {
    label: `${u.lens}:${u.slice}`, phase: 'Review', schema: FINDINGS, model: 'opus', agentType: 'reviewer',
  }).then((r) => (r ? { ...u, ...r } : null))
))
const done = results.filter(Boolean)
log(`${done.length} of ${units.length} lens runs returned`)

phase('Critic')
const summary = done.map((r) => ({ slice: r.slice, lens: r.lens, reviewed: r.reviewed.length, findings: r.findings.map((f) => `${f.frame} | ${f.region} | ${f.severity} | ${f.seen}`), clean: r.clean }))
const critic = await agent([
  `You are \`reviewer\` on Opus 5.5, the completeness critic of a capture-portfolio verdict round over Veneer's disclosure family (collapse, accordion, dropdown and split toggles, nav and tabs, navbar). Perform the review directly and spawn nothing. Edit nothing.`,
  `The lens runs returned this summary: ${JSON.stringify(summary)}.`,
  `The frames are in ${DIR}. Name (a) any frame a lens should have opened and did not, (b) any scenario or state the family ships that has no frame at all (read Veneer's partials under ${OURS} for _collapse.scss, _accordion.scss, _dropdown.scss, _nav.scss, and _navbar.scss, and compare their state selectors with the scenario names), and (c) any finding that contradicts another lens's clean verdict on the same frame. Open the frames you need to settle (c).`,
].join('\n\n'), {
  label: 'critic', phase: 'Critic', model: 'opus', agentType: 'reviewer',
  schema: {
    type: 'object',
    properties: {
      unopened: { type: 'array', items: { type: 'string' } },
      unframed: { type: 'array', items: { type: 'string' } },
      contradictions: { type: 'array', items: { type: 'string' } },
    },
    required: ['unopened', 'unframed', 'contradictions'],
  },
})
return { lenses: done, critic }
