export const meta = {
  name: 'native-catalog-systems',
  description: 'Refresh the native catalog: browser systems and APIs first, then native elements to improve, with the elements W3C corpus and the orkestrel form and table packages as inputs',
  phases: [
    { title: 'Distill', detail: 'read-only distillers over the elements guides, its W3C corpus, the form and table guides, and the standing catalog and law' },
    { title: 'Research', detail: 'four researchers with the web over browser systems and APIs by group' },
    { title: 'Judge', detail: 'one judge ranks under the overlap test and the user priorities; one critic checks completeness; the judge amends' },
    { title: 'Write', detail: 'one writer composes the catalog record' },
  ],
}

const E = '/home/user/mikesaintsg/elements'
const G = '/home/user/scaffold/guides'
const R = '/home/user/.wave/scaffold-main-wt/.orkestrel/veneer'
const OUT = `${R}/native/catalog-2026-10-07-systems.md`

const LAW = `Context and law. @orkestrel/veneer (/home/user/veneer) carries Bootstrap 5.3.8's sheet and a drop-in engine for Bootstrap's JavaScript families (src/browser: alert, button, carousel, collapse, dropdown, modal, offcanvas, popover, scrollspy, tab, toast, tooltip) and, beside them, native modules with no Bootstrap counterpart: copiers (a clipboard copy button, Async Clipboard API) and drags (a sortable list, HTML drag and drop with keyboard reorder and moveBefore), each a module under src/browser/<plural>/ composed through createVeneer plugins, with the showcase section, the journey case, and the departure records. The user's rulings: the native track builds only surfaces with no Bootstrap counterpart (the overlap test: anything Bootstrap 5.3 implements in JavaScript or styles as a component is excluded; ${R}/native/catalog-2026-10-07.md § Excluded lists 31 with their counterparts), each from scratch in its own module behind composition (${R}/native-separation-verdict.md); and, on 2026-10-07: "concentrate on systems and APIs that browsers provide but also native elements that we can improve on; first what we can with the native systems and APIs of the browser and then we can look at other surfaces and elements; keep in mind the form and table packages that we have in orkestrel that would really come in handy and best to use here". The elements repository (${E}, public, mikesaintsg/elements) is API guidance only, never a source to copy. Read-only: edit nothing, run nothing. Cite file:line (or a URL with its date) behind every claim. Return only the structured result.`

const DISTILL_SCHEMA = {
  type: 'object',
  properties: {
    source: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'the browser system, API, or native element' },
          kind: { type: 'string', enum: ['system', 'api', 'element', 'pattern', 'package-surface', 'law', 'exclusion'] },
          what: { type: 'string', description: 'what the browser provides, or what the source built or states' },
          gain: { type: 'string', description: 'what a page author gains from a module over it, or what to improve on the element' },
          overlap: { type: 'string', description: 'the Bootstrap 5.3 counterpart if any, else none' },
          fit: { type: 'string', description: 'the orkestrel form or table package fit, if any' },
          cite: { type: 'string' },
        },
        required: ['name', 'kind', 'what', 'gain', 'overlap', 'cite'],
      },
    },
    lessons: { type: 'array', items: { type: 'string' }, description: 'API-guidance lessons from the source, each with a citation' },
  },
  required: ['source', 'items', 'lessons'],
}

phase('Distill')
const DISTILL = [
  { key: 'w3c-interactions', prompt: `${LAW}\nSource: the elements repository's W3C corpus notes ${E}/guides/w3c.md, ${E}/guides/w3c/interactions.md (hidden, inert, focus, tabindex, contenteditable, popover), ${E}/guides/w3c/aria.md, ${E}/guides/w3c/categories.md. List every interaction system the corpus documents as an item (kind system), with what the spec gives a page and what a module could add, the Bootstrap overlap, and the citation.` },
  { key: 'w3c-elements', prompt: `${LAW}\nSource: the carded element entries under ${E}/guides/w3c/elements/ (list the directory; read the forms, interactives, tables, embeddeds, groupings, and texts chapters whole, the others by their headings) and the matching sections of ${E}/guides/w3c/renderings.md (UA default rendering). For every native element a page author uses in an application (inputs of each type, select and datalist, output, meter, progress, details and summary, dialog, search, time and data, table parts, fieldset and legend, label, button, img and picture, video and audio, iframe, template and slot, menu, and the rest you find), one item (kind element): what the UA provides, what a page author lacks or must repeat (the improve-on opportunity), the Bootstrap overlap (Bootstrap styles many of these; a styled element is not an overlap unless Bootstrap also drives it with JavaScript), the citation.` },
  { key: 'elements-built', prompt: `${LAW}\nSource: ${E}/guides/elements.md, ${E}/guides/surfaces.md, ${E}/guides/components.md (large files; read them whole). For every element, surface, or component the elements repository built over a native browser system or element, one item (kind element or system): what it wraps, the browser API it used, what it added for the author, the Bootstrap overlap, the citation. Lessons: the API-guidance lessons the guides state (naming, event shapes, attribute conventions, what failed).` },
  { key: 'elements-behaviors', prompt: `${LAW}\nSource: ${E}/guides/composables.md, ${E}/guides/patterns.md, and the capability catalog in ${E}/guides/README.md (read whole). For every composable behavior or pattern over a native browser system or API, one item (kind pattern or api): the API it wraps, what it added, the Bootstrap overlap, the citation. Lessons as above.` },
  { key: 'form-package', prompt: `${LAW}\nSource: the orkestrel form package guide ${G}/form.md (read whole; the package is @orkestrel/form 0.0.8, environment-agnostic: FormSchema, Form, FieldRule, one submit). Items (kind package-surface): the package's surface a browser host consumes, what the guide says the browser host owns (rendering, reading the DOM, focus, validation display), and the browser systems a veneer host module over Bootstrap's form markup would use (the Constraint Validation API, :user-invalid, requestSubmit, FormData and the formdata event, showPicker, inputmode, autocomplete, datalist, output). Lessons: what the guide prescribes for a host.` },
  { key: 'table-package', prompt: `${LAW}\nSource: the orkestrel table package guide ${G}/table.md (read whole; @orkestrel/table 0.0.7: TableSchema, Table, the lens of sort, filter, and page). Items (kind package-surface): the package's surface a browser host consumes, what the host owns (drawing, headers, aria-sort, the search landmark, pagination), and how a veneer host module over a Bootstrap table would bind column sort, a filter input, and Bootstrap's pagination to the lens. Lessons: what the guide prescribes for a host.` },
  { key: 'standing', prompt: `${LAW}\nSource: ${R}/native/catalog-2026-10-07.md (whole: shortlist, longlist, excluded, questions, the elements addendum), ${R}/native-separation-verdict.md, ${R}/native/copier-1/ and ${R}/native/drag-1/ (list; read each README or report for the module shape that landed). Items (kind law or exclusion or system): the law rows a module must satisfy (module shape, naming, composition, events, departure records, journey case, showcase section), every excluded candidate with its counterpart, and every shortlist and longlist candidate with its rank and status.` },
]
const distillates = await parallel(DISTILL.map((d) => () => agent(d.prompt, { label: `distill:${d.key}`, phase: 'Distill', schema: DISTILL_SCHEMA, agentType: 'distiller', model: 'opus' })))
const found = distillates.filter(Boolean)
log(`${found.length} of ${DISTILL.length} distillates returned`)

phase('Research')
const RESEARCH_SCHEMA = {
  type: 'object',
  properties: {
    group: { type: 'string' },
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          surface: { type: 'string', description: 'the API, attribute, element, or CSS feature' },
          use: { type: 'string', description: 'the application use a page author has for it' },
          status: { type: 'string', description: 'Chromium version and Baseline status with the source and date' },
          overlap: { type: 'string', description: 'the Bootstrap 5.3 counterpart or none' },
          fit: { type: 'string', description: 'orkestrel form or table fit, or none' },
          cite: { type: 'string' },
        },
        required: ['name', 'surface', 'use', 'status', 'overlap', 'cite'],
      },
    },
  },
  required: ['group', 'candidates'],
}
const RESEARCH = [
  { key: 'forms', prompt: `${LAW}\nResearch with the web (MDN, web.dev, the WHATWG and W3C specs, Chrome platform status; cite URLs with dates) the browser's input and form systems and APIs a module could serve on Bootstrap's form markup: the Constraint Validation API (setCustomValidity, reportValidity, validity states, :user-valid and :user-invalid), requestSubmit, FormData and the formdata event, showPicker, inputmode and enterkeyhint, autocomplete tokens, datalist, output, dirname, the customizable select (appearance: base-select, selectedcontent), the input types and their pickers, form-associated custom elements and ElementInternals, and what else you find. Bootstrap styles validation states (.is-valid, .is-invalid, .was-validated) but ships no validation JavaScript; say so per candidate.` },
  { key: 'overlays', prompt: `${LAW}\nResearch with the web (cite URLs with dates) the browser's overlay, navigation, and reveal systems: the Popover API and popovertarget, invoker commands (commandfor and command), CloseWatcher, CSS anchor positioning, View Transitions (same-document and cross-document), the Navigation API, hidden=until-found and beforematch, details name groups, dialog closedby, scrollIntoView options, scroll snap and the scrollsnapchange events, scroll-driven animations, and what else you find. Apply the overlap test strictly: Bootstrap's modal, dropdown, tooltip, popover, offcanvas, collapse, carousel, scrollspy, tab, and toast are counterparts; a system that only serves one of those families is excluded; a system that serves content outside those families (a page's own disclosures, a navigation crossfade, a found-text reveal) stays.` },
  { key: 'device', prompt: `${LAW}\nResearch with the web (cite URLs with dates) the browser's device, sensing, and system APIs a page module could serve: Fullscreen, Screen Wake Lock, Web Share, Page Visibility, Document Picture-in-Picture, Media Session, Notifications and Badging, Idle Detection, Network Information, Screen Orientation, Permissions, File System Access and showOpenFilePicker, file drag and drop, Visual Viewport, matchMedia and the prefers-* queries, the Keyboard API, Web Locks, Broadcast Channel, and what else you find; note Chromium-only status where Baseline lacks it (the target is Chromium 141 and 153).` },
  { key: 'text', prompt: `${LAW}\nResearch with the web (cite URLs with dates) the browser's text, content, and internationalization systems: contenteditable=plaintext-only, the EditContext API, the CSS Custom Highlight API, the Selection API, Intl.RelativeTimeFormat, DateTimeFormat, NumberFormat, ListFormat, PluralRules, and Segmenter over time, data, and output elements, meter and progress, declarative shadow DOM with template and slot, inert, text-wrap balance and pretty, the Speech APIs, and what else you find.` },
]
const research = await parallel(RESEARCH.map((r) => () => agent(r.prompt, { label: `research:${r.key}`, phase: 'Research', schema: RESEARCH_SCHEMA, agentType: 'researcher', model: 'opus' })))
const researched = research.filter(Boolean)
log(`${researched.length} of ${RESEARCH.length} research groups returned`)

phase('Judge')
const CATALOG_SCHEMA = {
  type: 'object',
  properties: {
    tier1: { type: 'array', description: 'browser systems and APIs, ranked', items: { type: 'object', properties: { rank: { type: 'number' }, name: { type: 'string' }, module: { type: 'string', description: 'src/browser/<plural>/' }, surface: { type: 'string' }, use: { type: 'string' }, status: { type: 'string' }, composes: { type: 'string', description: 'the Bootstrap markup it composes with, or none' }, fit: { type: 'string' }, elements: { type: 'string', description: 'what the elements repository did with it, cited, or none' }, size: { type: 'string', enum: ['small', 'medium', 'large'] }, reason: { type: 'string' } }, required: ['rank', 'name', 'module', 'surface', 'use', 'status', 'composes', 'fit', 'elements', 'size', 'reason'] } },
    tier2: { type: 'array', description: 'native elements to improve on, ranked', items: { type: 'object', properties: { rank: { type: 'number' }, name: { type: 'string' }, module: { type: 'string' }, surface: { type: 'string' }, use: { type: 'string' }, status: { type: 'string' }, composes: { type: 'string' }, fit: { type: 'string' }, elements: { type: 'string' }, size: { type: 'string', enum: ['small', 'medium', 'large'] }, reason: { type: 'string' } }, required: ['rank', 'name', 'module', 'surface', 'use', 'status', 'composes', 'fit', 'elements', 'size', 'reason'] } },
    excluded: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, counterpart: { type: 'string' }, reason: { type: 'string' } }, required: ['name', 'counterpart', 'reason'] } },
    deferred: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, reason: { type: 'string' } }, required: ['name', 'reason'] } },
    questions: { type: 'array', items: { type: 'string' } },
    first: { type: 'array', items: { type: 'string' }, description: 'the recommended first three units in order, each one sentence' },
  },
  required: ['tier1', 'tier2', 'excluded', 'deferred', 'questions', 'first'],
}
const judgePrompt = (extra) => `${LAW}\nYou are the judge. Over the distillates and research (JSON follows), produce the ranked catalog: tier 1, the browser systems and APIs (the user's first priority), and tier 2, the native elements to improve on; apply the overlap test strictly and list every exclusion with its Bootstrap counterpart; keep the landed modules (copiers, drags) out of the ranks but name them; mark where @orkestrel/form or @orkestrel/table is the fit (a browser host module over Bootstrap's form or table markup, the package owning the document and the host owning the DOM); rank by the application value for a Bootstrap page author, Chromium 141 and 153 support, and size (small first among equals); name the module directory for each (src/browser/<plural>/); carry the elements repository's lesson for each where one exists; state the deferred candidates with the gate that opens them; list the questions only the user can rule; recommend the first three units.${extra}\n\nDistillates:\n${JSON.stringify(found, null, 1)}\n\nResearch:\n${JSON.stringify(researched, null, 1)}`
const draft = await agent(judgePrompt(''), { label: 'judge', phase: 'Judge', schema: CATALOG_SCHEMA, agentType: 'planner', model: 'opus' })
const CRITIC_SCHEMA = { type: 'object', properties: { missing: { type: 'array', items: { type: 'string' } }, misjudged: { type: 'array', items: { type: 'string' } }, statusErrors: { type: 'array', items: { type: 'string' } }, verdict: { type: 'string' } }, required: ['missing', 'misjudged', 'statusErrors', 'verdict'] }
const critique = await agent(`${LAW}\nYou are the completeness critic. The judge's draft catalog follows with the distillates and research it was built from. Find what is missing (a system, API, or element the W3C corpus notes or the elements guides cover that the draft neither ranks, excludes, nor defers; verify by reading ${E}/guides/w3c/interactions.md, the ${E}/guides/w3c/elements/ chapter headings, and the elements guides' capability lists yourself), what is misjudged under the overlap test or the user's priority order, and any status claim that contradicts its own citation. Return the lists with citations.\n\nDraft:\n${JSON.stringify(draft, null, 1)}\n\nDistillates:\n${JSON.stringify(found, null, 1)}\n\nResearch:\n${JSON.stringify(researched, null, 1)}`, { label: 'critic', phase: 'Judge', schema: CRITIC_SCHEMA, agentType: 'reviewer', model: 'opus' })
const final = await agent(judgePrompt(`\n\nYour earlier draft and the critic's findings follow; amend the draft where the critic is right (say so in the reason fields) and keep it where the critic is wrong (say why in the reason fields).\n\nDraft:\n${JSON.stringify(draft, null, 1)}\n\nCritic:\n${JSON.stringify(critique, null, 1)}`), { label: 'judge:amend', phase: 'Judge', schema: CATALOG_SCHEMA, agentType: 'planner', model: 'opus' })

phase('Write')
const WRITE_SCHEMA = { type: 'object', properties: { path: { type: 'string' }, tier1: { type: 'number' }, tier2: { type: 'number' }, excluded: { type: 'number' }, first: { type: 'array', items: { type: 'string' } }, questions: { type: 'array', items: { type: 'string' } } }, required: ['path', 'tier1', 'tier2', 'excluded', 'first', 'questions'] }
const written = await agent(`${LAW}\nYou are the writer. Write the catalog record ${OUT} (create nothing else; the directory exists) from the judge's final catalog (JSON follows), in the repository's writing rules (present tense; must, can, might; no should, simply, now, new, latest, via, e.g.; numerals; serial comma; sentence-case headings; every number and status cited; link text by title, introduced by see): a lead with the user's order of 2026-10-07 and the method (the sources: the elements repository's guides and W3C corpus, the form and table guides, the standing catalog, the four research groups); § Tier 1: browser systems and APIs (a ranked table: rank, name, surface, use, status, composes with, package fit, elements lesson, size, module directory); § Tier 2: native elements to improve on (the same table); § Excluded (name, counterpart, reason); § Deferred (name, gate); § Questions for the user; § The first units (the three recommended, each with its owned files, its showcase section, its journey case, and its departure record, in the shape copiers and drags landed). Then return the structured summary.\n\nCatalog:\n${JSON.stringify(final, null, 1)}`, { label: 'write', phase: 'Write', schema: WRITE_SCHEMA, agentType: 'opus', model: 'opus' })

return { distillates: found, research: researched, draft, critique, final, written }