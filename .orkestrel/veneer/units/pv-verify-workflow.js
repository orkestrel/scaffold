export const meta = {
  name: 'portfolio-verify',
  description: 'Portfolio verdict round: blind visual lenses per slice over one family\'s capture frames, then a completeness critic',
  phases: [
    { title: 'Review', detail: 'fidelity, state-truth, and variant lenses per slice, blind to each other (the ring lens alone for the focus slices)' },
    { title: 'Critic', detail: 'what the lenses missed' },
  ],
}

// args: { family, dir, ours, slices: { <slice>: { files: [...], sources: [...] } } }. Written for the
// B-PASSIVE, B-FORMS, B-MODAL, and B-UTILITIES portfolio rounds and the FOCUS-FRAME scoping read, derived
// from bc-verify-workflow.js with the frame description rewritten for the bounded frames PAGE-FRAME landed.
const ROOT = '/home/user/veneer'
const LENSES = {
  fidelity: 'BOOTSTRAP FIDELITY. For each scenario, judge whether the rendering matches what Bootstrap 5.3.8 renders for the same markup: colours, borders and radii, spacing and alignment, icons and indicators, typography, and the component\'s own chrome. Read the Bootstrap SCSS source for the component to know what it must look like, and Veneer\'s partial to see what it declares. Report a visible departure, not a guess about an invisible property.',
  state: 'STATE TRUTH. Each frame name claims a state or a variant of the key (resting, hover, focus, active, pressed, checked, disabled, shown, hidden, validated, a size step, a role colour, a breakpoint step, and the like). For each frame, compare it with its resting or sibling frame in the same variant and judge whether it visibly shows what its name claims, the way Bootstrap\'s rule for that key paints it. Report a frame that is indistinguishable from its sibling where Bootstrap paints a difference, or that shows the wrong state or value.',
  variant: 'VARIANT INTEGRITY. Each scenario is shot in light and dark at 1280 and 390 pixels wide. Judge the dark frames for legibility and for the colours Bootstrap\'s dark mode retunes (text, borders, backgrounds, icons, subtle and emphasis tiers), and the 390 frames for layout: wrapping, overflow, clipping, truncation, content cut off by the frame edge, or content pushed out of view. Report a variant that breaks where its sibling variant holds.',
  ring: 'RING FINDABILITY. Each frame is a focus scenario: its name ends in -focus and it claims one element holds keyboard focus. For each frame, find the focus indicator (Bootstrap\'s focus ring: a translucent box-shadow around the control, or a focus border colour, or an outline under forced colours) and judge whether a reader can locate it at the frame\'s size without being told where it is. Report each frame where the ring is absent, cropped by the frame edge, too small to find in the frame (for example a small control inside a tall page frame), or indistinguishable from the resting paint; name the frame\'s pixel size as you read it and where the ring sits.',
}
const FRAMES = 'Frames come in two kinds. An element frame is shot over one showcase specimen lifted to the document\'s start, so the band around the component is the page surface and the frame is about as big as the specimen. A page frame shows the page\'s opening (the heading and the Dark mode control) and the one showcase section holding its subject, with every other section taken out of the layout; the subject is one element inside that section.'

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

function lensPrompt(slice, lens, spec) {
  const sources = spec.sources.map((f) => `${ROOT}/${f}`).join(', ')
  return [
    `You are \`reviewer\` on Opus 5.5, a read-only lane in a capture-portfolio verdict round for Veneer, a Bootstrap 5.3.8 re-implementation in SCSS. Perform the review directly and spawn nothing. Edit nothing.`,
    `Your lens: ${LENSES[lens]}`,
    `Your slice: the ${slice} scenarios of the ${args.family} family. The frames are PNG files in ${args.dir}; open each one with the Read tool (it shows you the image). Frame names read <scenario>--<variant>.png, the variant being light-1280, dark-1280, light-390, or dark-390. The frames are: ${spec.files.join(', ')}.`,
    FRAMES,
    sources ? `Reference: Bootstrap's source for this slice is ${sources}; Veneer's partials are under ${ROOT}/src/styles (components/, utilities/, and the root partials). The showcase specimens' markup is in ${ROOT}/app/browser/constants.ts.` : `Reference: Veneer's partials are under ${ROOT}/src/styles, and Bootstrap's source is under ${ROOT}/node_modules/bootstrap/scss.`,
    `Rules: judge only what the image shows under your lens; do not report what another lens owns; open every frame in your slice and list each in reviewed; give each finding the exact frame file, the region, what you see, what Bootstrap renders there with the SCSS rule you read, a severity (blocker: the component is broken or unreadable; major: a visible departure a user notices; minor: a small visual difference), and your confidence. Report no finding you cannot point at in a frame. List the scenarios you judged clean.`,
  ].join('\n\n')
}

const units = []
for (const [slice, spec] of Object.entries(args.slices)) {
  for (const lens of args.lenses) units.push({ slice, lens, spec })
}

phase('Review')
const results = await parallel(units.map((u) => () =>
  agent(lensPrompt(u.slice, u.lens, u.spec), {
    label: `${u.lens}:${u.slice}`, phase: 'Review', schema: FINDINGS, model: 'opus', agentType: 'reviewer',
  }).then((r) => (r ? { slice: u.slice, lens: u.lens, ...r } : null))
))
const done = results.filter(Boolean)
log(`${done.length} of ${units.length} lens runs returned`)
for (const u of units) {
  const r = done.find((d) => d.slice === u.slice && d.lens === u.lens)
  if (r) {
    const unopened = u.spec.files.filter((f) => !r.reviewed.some((x) => x.endsWith(f)))
    if (unopened.length) log(`${u.lens}:${u.slice} left ${unopened.length} frames unopened`)
  } else log(`${u.lens}:${u.slice} returned nothing`)
}

phase('Critic')
const summary = done.map((r) => ({ slice: r.slice, lens: r.lens, reviewed: r.reviewed.length, findings: r.findings.map((f) => `${f.frame} | ${f.region} | ${f.severity} | ${f.seen}`), clean: r.clean }))
const critic = await agent([
  `You are \`reviewer\` on Opus 5.5, the completeness critic of a capture-portfolio verdict round over Veneer's ${args.family} family. Perform the review directly and spawn nothing. Edit nothing.`,
  `The lens runs returned this summary: ${JSON.stringify(summary)}.`,
  FRAMES,
  `The frames are in ${args.dir}; the slices and their frames are ${JSON.stringify(Object.fromEntries(Object.entries(args.slices).map(([k, v]) => [k, v.files])))}. Name (a) any frame a lens should have opened and did not, (b) any state or variant the family's partials under ${ROOT}/src/styles write (hover, focus, active, disabled, checked, shown, a size step, a role) that has no frame at all, comparing the partials' state selectors with the scenario names, and (c) any finding that contradicts another lens's clean verdict on the same frame. Open the frames you need to settle (c), and say which side each frame supports.`,
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
return { family: args.family, lenses: done, critic }
