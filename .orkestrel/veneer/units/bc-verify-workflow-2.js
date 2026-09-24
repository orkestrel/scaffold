export const meta = {
  name: 'b-collapse-verify-2',
  description: 'B-COLLAPSE VERIFY successor: blind lenses over the dropdown direction frames and the navbar frames the first round left unruled',
  phases: [{ title: 'Review', detail: 'fidelity and state lenses over the missed frames, blind to each other' }],
}
const DIR = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bc-verify-frames'
const BS = '/home/user/veneer/node_modules/bootstrap/scss'
const OURS = '/home/user/veneer/src/styles/components'
const FINDINGS = {
  type: 'object',
  properties: {
    reviewed: { type: 'array', items: { type: 'string' } },
    findings: { type: 'array', items: { type: 'object', properties: {
      frame: { type: 'string' }, region: { type: 'string' }, seen: { type: 'string' }, expected: { type: 'string' },
      severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    }, required: ['frame', 'region', 'seen', 'expected', 'severity', 'confidence'] } },
    clean: { type: 'array', items: { type: 'string' } },
  },
  required: ['reviewed', 'findings', 'clean'],
}
const LENSES = {
  fidelity: 'Bootstrap 5.3.8 fidelity: does each frame paint what the release paints for the same markup (placement, caret direction, spacing, colours, borders, radius)? Read the release rule in the Bootstrap SCSS before ruling.',
  state: 'State truth and variant integrity: does each frame show the state its scenario names (an open menu placed on the named side, a resting bar with no hovered or focused link), and do the light and dark, 1280 and 390 siblings agree on everything except what the mode or width must change?',
}
const SLICES = {
  directions: ['dropup--light-1280.png','dropup--dark-1280.png','dropup--light-390.png','dropup--dark-390.png','dropup-center--light-1280.png','dropup-center--dark-1280.png','dropup-center--light-390.png','dropup-center--dark-390.png','dropend--light-1280.png','dropend--dark-1280.png','dropend--light-390.png','dropend--dark-390.png','dropstart--light-1280.png','dropstart--dark-1280.png','dropstart--light-390.png','dropstart--dark-390.png'],
  navbar: ['navbar-scroll--light-1280.png','navbar-scroll--dark-1280.png','navbar-scroll--light-390.png','navbar-scroll--dark-390.png','navbar-inverted--light-1280.png','navbar-inverted--dark-1280.png','navbar-inverted--light-390.png','navbar-inverted--dark-390.png','navbar-inverted-class--light-1280.png','navbar-inverted-class--dark-1280.png','navbar-inverted-class--light-390.png','navbar-inverted-class--dark-390.png'],
}
function lensPrompt(slice, lens, files) {
  return [
    `You are \`reviewer\` on Opus 5.5, one blind lens of a capture-portfolio verdict round over Veneer's disclosure family. Perform the review directly and spawn nothing. Edit nothing.`,
    `Your lens: ${LENSES[lens]}`,
    `Frames (open every one with the Read tool): ${files.map((f) => `${DIR}/${f}`).join(', ')}.`,
    `Bootstrap's source is under ${BS}; Veneer's partials are under ${OURS}. Source is corroboration only: rule on what each frame shows.`,
    `Rules: judge only what the image shows under your lens; open every frame in your slice and list each in reviewed; give each finding the exact frame file, the region, what you see, what Bootstrap renders there with the SCSS rule you read, a severity (blocker: broken or unreadable; major: a visible departure a user notices; minor: a small visual difference), and your confidence. Report no finding you cannot point at in a frame. List the scenarios you judged clean, each with every variant you opened for it.`,
  ].join('\n\n')
}
const units = []
for (const slice of Object.keys(SLICES)) for (const lens of Object.keys(LENSES)) units.push({ slice, lens })
const done = (await parallel(units.map((u) => () =>
  agent(lensPrompt(u.slice, u.lens, SLICES[u.slice]), {
    label: `${u.lens}:${u.slice}`, phase: 'Review', schema: FINDINGS, model: 'opus', agentType: 'reviewer',
  }).then((r) => (r ? { ...r, slice: u.slice, lens: u.lens } : null))
))).filter(Boolean)
log(`${done.length} of ${units.length} lens runs returned`)
return { lenses: done }
