export const meta = {
  name: 'native-catalog',
  description: 'Catalog the native browser platform features Bootstrap 5.3 lacks, apply the overlap test, verify support, rank, and draft the catalog for the user',
  phases: [
    { title: 'Scout', detail: 'Bootstrap 5.3.8 inventory and the earlier native candidates in the records' },
    { title: 'Research', detail: 'four researchers by area, with the web' },
    { title: 'Judge', detail: 'dedup, overlap test, ranking, shortlist' },
    { title: 'Critic', detail: 'missed features, misjudged overlap, wrong status' },
    { title: 'Draft', detail: 'the catalog file' },
  ],
}

const OUT = '/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/native-catalog'
const COMMON = `Rules: read-only everywhere except where this prompt names a file you write. Never run cd; use absolute paths. Never run git commands that change state. Cite every local fact as path:line and every web fact with its URL and the date you read it (2026-10-07). Write in the voice of /home/user/scaffold/.claude/rules/writing.md (no "should", "simply", "just", "currently", "now", "new", "latest"; one recommendation per question).

The user's ruling of 2026-10-07, which governs this round: "for the native stuff, instead of looking at stuff that overlaps with what bootstrap already implements and that we already have an engine for, let's look for the native stuff that it doesn't have that we can implement from scratch instead of trying to work against bootstrap." Veneer (/home/user/veneer) ships a drop-in Bootstrap 5.3.8 engine in src/browser (twelve families: alert, button, carousel, collapse, dropdown, modal, offcanvas, popover, scrollspy, tab, toast, tooltip; plus the helpers Placement, Backdrop, Trap, Lock, Hold, Swipe), Bootstrap's stylesheet faces, and a Tailwind layer. The overlap test: a native platform feature is OVERLAP when the user-facing concept it serves is one Bootstrap 5.3 implements as a component, helper, or utility (a modal, a dropdown, a tooltip or popover, a collapse or accordion, a carousel, a toast, tabs, an offcanvas, scrollspy, progress bars, placeholders, spinners, form validation styling, close buttons, badges, and the like). A feature passes the test when Bootstrap has no counterpart for its concept, or its concept is a different thing that only resembles a Bootstrap family in name.`

const FEATURES = {
  type: 'object',
  properties: {
    features: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          kind: { type: 'string', description: 'html element or attribute, css feature, js api, form control' },
          what: { type: 'string', description: 'what it does for a page author and a user, two sentences' },
          bootstrapNearest: { type: 'string', description: "Bootstrap 5.3's nearest component, helper, or utility, or 'none'" },
          overlap: { type: 'string', enum: ['none', 'partial', 'overlap'], description: 'the overlap test result' },
          overlapReason: { type: 'string' },
          support: { type: 'string', description: 'Chromium version that shipped it, Baseline status (limited, newly, widely) with the date, Firefox and Safari status, each with its source URL' },
          veneerShape: { type: 'string', description: 'what Veneer would build from scratch: the engine class or plugin, the styles, the markup contract, the events; three to five sentences' },
          consumerValue: { type: 'string', description: 'why a page author wants it, with a concrete use' },
          cost: { type: 'string', enum: ['small', 'medium', 'large'] },
          risks: { type: 'string' },
          sources: { type: 'array', items: { type: 'string' } },
        },
        required: ['name', 'kind', 'what', 'bootstrapNearest', 'overlap', 'overlapReason', 'support', 'veneerShape', 'consumerValue', 'cost', 'risks', 'sources'],
      },
    },
    notes: { type: 'string' },
  },
  required: ['features', 'notes'],
}

phase('Scout')
const scout = await agent(`${COMMON}

Task, read-only, local files only: produce two inventories.
1. Bootstrap 5.3.8's user-facing concepts in Veneer: every component family, helper, and utility group. Read /home/user/veneer/src/core/constants.ts (CLASS_NAMES groups and their leaves), /home/user/veneer/src/bootstrap/components/ and /home/user/veneer/src/bootstrap/_utilities.scss, and the engine families in /home/user/veneer/src/browser (one class per family). Return the list as the overlap reference: for each concept its name, the kind (component, helper, utility, engine family), and a one-line description.
2. The native candidates the records already name, with their status: /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/plan.md:21 (bare dialog, details, customizable select, form validation, clipboard, fullscreen), the deferred gates G1 to G5 in /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/browser-stage-b-verdict.md (near :50-53, :279, :325, :358, :807, :821), the research in /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/rulings-research-2026-10-06/elements.json, the § R11 assessment in /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native-separation-verdict.md, and any native item in /home/user/veneer/ROADMAP.md. For each: what it is, which Bootstrap family it was attached to, and your overlap verdict under the user's ruling with the reason.
Return both inventories as text with citations.`, { label: 'scout:inventory', phase: 'Scout', model: 'opus' })

phase('Research')
const AREAS = [
  { key: 'html', prompt: 'HTML elements and attributes with user-facing behavior that Bootstrap 5.3 has no counterpart for: for example details and summary with name grouping, the popover attribute as a non-overlay disclosure, invoker commands (commandfor, command) for custom commands, hidden="until-found" and beforematch, search, selectedcontent and the customizable select (appearance: base-select), datalist, output, meter and progress elements, dialog in its non-modal mode, template and slot, inert, contenteditable=plaintext-only, inputmode and enterkeyhint, loading=lazy and fetchpriority, the Navigation API-driven view switching. Judge each against the overlap test and exclude anything whose concept Bootstrap implements.' },
  { key: 'css', prompt: 'CSS features with user-facing value that Bootstrap 5.3 does not provide: for example scroll-snap carousels with ::scroll-button and ::scroll-marker, scroll-driven animations (animation-timeline), view transitions (cross-document and same-document), @starting-style entry animations, interpolate-size and calc-size for height auto transitions, container queries and container units, field-sizing: content, text-wrap: balance and pretty, light-dark() and color-scheme, color-mix() and relative color syntax, anchor positioning for non-overlay uses (callouts, connectors), ::details-content, :has() patterns, scroll-state() container queries (stuck, snapped), reading-flow, the customizable select pseudo-elements (::picker), accent-color, @scope. For each, say whether it is a style face concern (the ./styles face Veneer plans) or needs an engine class.' },
  { key: 'api', prompt: 'JavaScript platform APIs with a user-facing surface that Bootstrap 5.3 lacks: for example CloseWatcher, the Navigation API, the View Transitions API, the Clipboard API (copy buttons), the Fullscreen API, the Screen Wake Lock API, the Web Share API, the File System Access pickers, drag and drop with the HTML Drag and Drop API, the Constraint Validation API (setCustomValidity, reportValidity, validity states) as a programmatic validation engine, requestSubmit and form-associated custom elements, ElementInternals, the Popover API events (beforetoggle, toggle) for non-overlay uses, ResizeObserver and IntersectionObserver patterns (sticky state, infinite lists), the Idle Detection or Visibility APIs, the Vibration API, Notifications, Badging, the EditContext API, Speech Recognition and Synthesis, the Page Lifecycle API, the Scheduler API. Judge each against the overlap test.' },
  { key: 'forms', prompt: 'Form controls and input types that Bootstrap 5.3 styles only partially or not at all, and what a from-scratch native treatment gives: the customizable select (appearance: base-select, selectedcontent, ::picker(select), ::checkmark), input type color (alpha, colorspace attributes), input type date, time, datetime-local, month, week and their picker parts, input type file and the showOpenFilePicker alternative, input type range with ::slider-thumb (Bootstrap styles range), number with spin buttons, search with ::search-cancel, datalist, output, textarea with field-sizing, the popover-based picker patterns, autocomplete tokens, the Constraint Validation pseudo-classes (:user-invalid, :user-valid) against Bootstrap\'s was-validated class approach. For each, state whether Bootstrap already has the concept (then it is overlap unless the native treatment covers a control Bootstrap leaves unstyled).' },
]
const researched = await parallel(AREAS.map((area) => () => agent(`${COMMON}

The scout's inventories (the overlap reference and the earlier candidates):
${scout ?? '(scout returned nothing)'}

Your area: ${area.prompt}

Research with the web (MDN, web.dev, the Baseline status pages at webstatus.dev or web-platform-dx, caniuse, Chrome Platform Status, the WHATWG and CSSWG specifications), and read /home/user/veneer/node_modules/bootstrap/scss where you need Bootstrap's own rules to decide overlap. For every feature you keep, fill the schema completely; put the features you exclude as overlap in the list too with overlap 'overlap' and the Bootstrap counterpart named, so the judge can check your test. Prefer breadth: at least 12 candidates in your area, each with its support status read from a source today. Do not guess support; a feature whose status you could not read goes in notes.`, { label: `research:${area.key}`, phase: 'Research', schema: FEATURES, agentType: 'researcher', model: 'opus' })))
const all = researched.filter(Boolean).flatMap((r) => r.features)
log(`research returned ${all.length} candidates across ${researched.filter(Boolean).length} areas`)

phase('Judge')
const JUDGE = {
  type: 'object',
  properties: {
    excluded: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, counterpart: { type: 'string' }, reason: { type: 'string' } }, required: ['name', 'counterpart', 'reason'] } },
    shortlist: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          rank: { type: 'number' },
          name: { type: 'string' },
          why: { type: 'string', description: 'value, readiness under the Chromium 153 floor, and fit with a from-scratch Veneer module, in three sentences' },
          support: { type: 'string' },
          module: { type: 'string', description: 'the module folder name (plural entity per the naming law), the class or plugin names, the markup contract, the events, the styles face, and the first proof' },
          firstUnit: { type: 'string', description: 'the smallest landable unit and its acceptance' },
          cost: { type: 'string', enum: ['small', 'medium', 'large'] },
        },
        required: ['rank', 'name', 'why', 'support', 'module', 'firstUnit', 'cost'],
      },
    },
    longlist: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, note: { type: 'string' } }, required: ['name', 'note'] } },
    reasoning: { type: 'string' },
  },
  required: ['excluded', 'shortlist', 'longlist', 'reasoning'],
}
const judge = await agent(`${COMMON}

You are the judge. The scout's inventories:
${scout ?? ''}

The researchers' candidates (${all.length}):
${JSON.stringify(all, null, 1)}

Do the following. (1) Deduplicate by concept. (2) Apply the overlap test strictly and list every excluded feature with its Bootstrap counterpart; be strict: a scroll-snap carousel duplicates Bootstrap's carousel concept even if the mechanism is new, a popover-attribute tooltip duplicates tooltip, a native dialog modal duplicates modal, details as an accordion duplicates accordion UNLESS it is kept as the bare element with no accordion chrome; say which side of that line each sits on and why. (3) Rank the rest by consumer value, readiness under the Chromium 153 floor and Baseline, and fit with a from-scratch Veneer module (an engine class or plugin in its own module folder behind composition, styles in the ./styles face, a markup contract, typed events, proofs against the specification in Chromium), and name a module shape and the first unit for the top 8 to 10. (4) Put the remaining passes in a longlist with a one-line note. Verify any support claim you rely on that two researchers state differently by naming the source you trust.`, { label: 'judge', phase: 'Judge', schema: JUDGE, model: 'opus' })

phase('Critic')
const CRITIC = {
  type: 'object',
  properties: {
    missed: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, why: { type: 'string' }, source: { type: 'string' } }, required: ['name', 'why', 'source'] } },
    misjudged: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, judged: { type: 'string' }, correction: { type: 'string' }, evidence: { type: 'string' } }, required: ['name', 'judged', 'correction', 'evidence'] } },
    statusErrors: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, claimed: { type: 'string' }, actual: { type: 'string' }, source: { type: 'string' } }, required: ['name', 'claimed', 'actual', 'source'] } },
    summary: { type: 'string' },
  },
  required: ['missed', 'misjudged', 'statusErrors', 'summary'],
}
const critic = await agent(`${COMMON}

You are the critic. Attack the judge's output below on three fronts, with the web and the local sources: (a) native features with no Bootstrap counterpart that nobody listed (think of what a page author reaches for a library to get: command palettes, resizable panels, sortable lists, toasts are overlap, but what about live regions and announcements, skip links, focus management helpers, keyboard shortcut registries, print layouts, clipboard, share, undo stacks, forms autosave, scroll restoration, sticky headers with scroll-state, data tables with sticky columns, virtualized lists, date formatting with Intl, relative time, number inputs with Intl, color pickers, file drop zones, image zoom, lightbox, tree views, disclosure groups, split buttons, segmented controls, steppers, timelines, tags input, combobox and autocomplete, listbox and menus with ARIA patterns, dialogs that are not modal); (b) overlap verdicts you can show are wrong either way, with Bootstrap's own documentation or source as evidence; (c) support claims that a source contradicts. Report only what you can prove.

Judge output:
${JSON.stringify(judge, null, 1)}`, { label: 'critic', phase: 'Critic', schema: CRITIC, agentType: 'researcher', model: 'opus' })

phase('Draft')
const draft = await agent(`${COMMON}

Write exactly one file: ${OUT}/catalog.md (create the folder if needed). It is the catalog of native platform features Bootstrap 5.3 lacks, for the user to pick from. Inputs: the judge's output and the critic's findings below, and the researchers' candidates for the detail. Structure, headings in sentence case: a lead stating the user's ruling and the overlap test; a shortlist table (rank, feature, what the user gets, support under the Chromium 153 floor and Baseline, module shape, first unit, cost) followed by one short paragraph per shortlisted feature; the longlist as a table; the excluded features as a table with each Bootstrap counterpart; a section on what the critic changed (missed features added, overlap verdicts corrected, status corrections) applied into the tables; and a final section of questions for the user with one recommendation each (which features to open first, and whether any excluded item the critic argued about returns). Every support claim carries its source URL. Keep it as long as the contract needs and no longer. Return the file path and a five-line summary.

Judge: ${JSON.stringify(judge, null, 1)}

Critic: ${JSON.stringify(critic, null, 1)}

Researchers: ${JSON.stringify(all.map((f) => ({ name: f.name, kind: f.kind, what: f.what, support: f.support, veneerShape: f.veneerShape, consumerValue: f.consumerValue, cost: f.cost, risks: f.risks, sources: f.sources })), null, 1)}`, { label: 'writer:catalog', phase: 'Draft', model: 'opus' })
return { candidates: all.length, judge, critic, draft }
