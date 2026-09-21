# CL3 scope read — the brief against the live tree before dispatch

Role: `checker` on native Sonnet, read-only, clean context. Perform the assignment directly and
spawn nothing.

Subject: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-brief.md`, the brief a bench
writer (Astra) will open next, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer` (HEAD `9f5ffda`, the CL2 landing; tracked tree clean).

Rule on these, with `file:line` evidence for every row:

1. Every path and symbol the brief names resolves from the writer's root, and every location it
   gives is right (list each that does not, with the true location): the layer order in
   `src/styles/_tokens.scss`, the load order in `src/styles/index.scss`, the existing partials
   under `src/styles/elements/` and `src/styles/components/`, the elements-layer guard and the
   physical-axis guard in `tests/src/styles/index.test.ts` (name the assertion that admits one
   bare tag per selector and the one that reads `MANDATED_TAG_PAIRS`), `MANDATED_TAG_PAIRS` in
   `tests/setupStyles.ts` (list its pairs), `app/browser/sections/ButtonSection.ts`,
   `app/browser/constants.ts` (the specimen table), `app/browser/types.ts` (the specimen
   interface, name it), `app/browser/index.ts` (the `sections/` export), `app/browser/Showcase.ts`
   (how it mounts `ButtonSection` into `main`), `tests/app/browser/sections/`, the export-set
   assertions in `tests/app/browser/index.test.ts` and `tests/setupStyles.test.ts`, the
   `reboot` entry and `listed` in `tests/conformance.test.ts` and `tests/fixtures/oracle/inventory.json`
   (name the selectors the `reboot` entry carries), `readOracleInventory` in
   `tests/setupConformance.ts`, the guide's § Styles files table, § Departures, and § Showcase
   region sentence in `guides/veneer.md` (line of each), the calibration records
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.md`
   and `research/calibration.md` (present and their surface tables named), and
   `node_modules/bootstrap/scss/_reboot.scss` in the Veneer checkout.
2. The readings the brief's Context paragraph "Readings the Orchestrator takes at launch" lists,
   taken now and reported as facts with `file:line`: the CL2 token names present in
   `src/styles/_tokens.scss` (`--vn-space-12`, `--vn-space-24`, `--vn-display-1` to `-6`) and
   `--vn-state-stripe` in `src/styles/_mixins.scss`; the current `index.scss` load order; the
   guard sites; the `MANDATED_TAG_PAIRS` set; the `ButtonSection` shape (its constructor,
   `mount`/`destroy` or equivalent lifecycle, the specimen table it reads, the `Section`
   interface it implements if one exists); the app barrel's export set as the index proof
   asserts it; the styles setup's export inventory as its proof asserts it; the guide's files
   table rows and their shape; the `--vn-line-heading`, `--vn-weight-heading`, `--vn-text-code`,
   `--vn-link-rgb`, and `--vn-link-*` tokens the brief binds to (present or absent, with
   values). List each statement of the brief the tree contradicts.
3. Scope by falsified assertions: for the brief's execution items 1 to 5, name every existing
   test, fixture, export-inventory assertion, parity list, guard, or policy sweep in the live
   tree that the item's result would make false (a new partial against the layer-order and
   guard proofs in `tests/src/styles/index.test.ts` and the guide's files table through
   `test:guides`; a new section against the app barrel's export set, the showcase proof, and
   the `sections/` proof shape; a new specimen table against `app/browser/constants.ts`'s
   proof if one exists; the `reboot` presence scan in `tests/conformance.test.ts` (does it
   read `listed` or the guide's Compatibility rows, and would new bare-tag selectors change its
   result while `reboot` stays `accepted`?); the physical-axis guard against any new
   `margin-left`-style declaration; the policy sweep against new comments), and say whether the
   brief's Scope section grants that file. Sweep `tests/**`, `app/**`, `guides/veneer.md`,
   `src/styles/**`, `package.json`, and `configs/**`, and name the scope you covered. List each
   ungranted file with the assertion and the item that breaks it.
4. Every owned file that is a vendored file (`vite.config.ts`, `tests/config.test.ts`,
   `tests/policy.test.ts`, `tests/setupPolicy.ts`) or otherwise off-limits by the brief's own
   Off-limits list; and every owned path that does not yet exist (expected for the new files;
   list them so the writer creates rather than looks).

Output, and nothing else: one table per item (the words `none found` when a sweep finds
nothing), then one line `Verdict: dispatch` or `Verdict: amend` with the rows that force it. No
process diary; report no wording or prose finding.
