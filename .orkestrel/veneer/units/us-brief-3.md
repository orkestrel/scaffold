# Unit UTIL-SPACER (`us`) — round 2 (successor brief 3): the state dimension, the classless infix, the specimens, and the prose findings

This brief succeeds `us-brief-2.md` (round 1, complete in the worktree) and carries the round-1 audit verdict `us-audit-verdict.md` and its rulings: claim 7 (token nouns as ruled; the compatibility rows; criterion 3's record), F1 (`$state`), F2 (the classless infix), F3 and R3 (the specimens), F4, F5, F6, F7 (prose and placement), and R2 (the profiles equality). Everything round 1 wrote stays unless a ruling names it.

## Role and engine

`opus` on Opus 5.5 (the alias serves `claude-opus-5`), a native Claude subagent, the sole writer in `/home/user/veneer-us` (branch `unit/us`, uncommitted round-1 writes over `87ff1d0`).

## Objective

The `utility` and `utility-variable` mixins express a pseudo-class state and name a classless responsive entry the way the release does, the gap specimens draw their boxes in the Layout region's own shape and the responsive one wraps at 1280, and the round-1 prose findings are closed in the owned files and the revised shared patch.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/us-audit-verdict.md` (§ Rulings) with the lane verdicts beside it (`us-audit-objective-verdict.md` claim 7 for the token list; `us-audit-subjective-verdict.md` F1 to F7 and R2, R3 for the sites and the right text); the release's hover entries at `src/styles/components/_link.scss:34`, `:41`, `:63` (`.link-opacity-N-hover:hover` writes `--bs-link-opacity`; `.link-offset-N-hover:hover` writes `text-underline-offset … !important`), which UTIL-TEXT moves into the mixins in wave 2; the gutter siblings' specimen shape at `app/browser/constants.ts:557–574` (`.container-fluid > .row > div`, the responsive one with `row-cols-2` so it wraps); the release's utility API drops the infix's leading hyphen for a classless entry (`node_modules/bootstrap/scss/mixins/_utilities.scss`, the `$property-class-modifier` and `$infix` composition: read it before you edit).

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,typescript,names,documentation,writing}.md`; D42 and the token-noun ruling as the verdict states it (a CSS property, value, function, custom property, class selector, `!important` token, and a Sass variable stand as their own nouns; a file path, a mixin name, a test name, and a layer name take a noun); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` (R4 amended by this round: both mixins take `$state`); the family record `units/b-utilities-family.md`. Skill: none. Guide: `guides/veneer.md` § Styles and § Gap utilities (report-only).

**Installed primitives.** As in `us-brief-2.md`; this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-us`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; no sandbox; Chromium 141 for the browser proofs.

**Measurements.** Round 1's: the built cascade's `gap` and `column-gap` selectors read `<property>:var(--vn-gap-N)!important` (the objective lane checked `dist/src/styles/index.css`); the worktree's Layout proof is red without the shared patch (12 specimens against 14 expected). Take the `_link.scss` hover entries' exact selectors and declarations yourself before designing `$state`.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's ten owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, and `git clean` are forbidden. The shared files stay report-only: return a revised `tmp/units/us-shared.patch` that supersedes round 1's whole, generated the same way (`git diff` over a probe copy, or hand-written hunks that `git apply --check` accepts against `87ff1d0`).

## Unknowns

- Whether `utility-variable` with `$state` needs the `!important`-free form only (it does: a custom property is never important); report if a release hover entry needs anything else.

## Scope

**Owned.** `src/styles/_mixins.scss` (the two mixins only), `src/styles/utilities/_gap.scss`, `tests/src/styles/fixtures/mixins.scss`, `tests/src/styles/mixins.test.ts`, `tests/src/styles/utilities/gap.test.ts`, `tests/app/browser/sections/LayoutSection.test.ts`, `tests/service/tailwind/profiles.test.ts`, `tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/preflight.test.ts`, `tests/fixtures/tailwind/markup.html`.

**Shared (report-only, in the revised patch).** `app/browser/constants.ts` (the two specimens in the gutter shape, the Layout copy per F4), `tests/setup.ts`, `tests/conformance.test.ts` (the comment's nouns), `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `guides/veneer.md` (the compatibility rows as ruled; § Styles gains the mixin contract sentences and § Gap utilities keeps the gap-specific ones, F6; the § Tailwind sentence, F5; the token nouns as ruled), `ROADMAP.md` (the CL8b cell in the closed rows' form with `<landing hash>` as a placeholder the Orchestrator fills).

**Off-limits.** Everything else: `src/styles/index.scss`, `src/styles/components/**`, every sibling unit's owned files, `tests/setupServer.ts`, the vendored files, `tests/setup.css` and the Tailwind exclusion line copies (unchanged: `gap-*` stays off the line).

**What asserts the state this change ends.** `mixins.test.ts` and `gap.test.ts` (Owned); `LayoutSection.test.ts` (Owned; its selectors follow the new specimen shape); `profiles.test.ts` (Owned; the exact `variables` equality); the shared patch's consumers at landing.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` (scoped `oxfmt --write` over owned files is permitted).

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-us/tmp/units/us-report-2.md`: what changed per finding, the `$state` design (signature, emitted selector form, the fixture entries), each gate's command and result line (the baseline compile command and the `compare.mjs` invocation with their printed lines included, and the baseline step retained as `tmp/units/us-instruments/baseline.sh`), the mutation each new proof distinguishes, and the revised shared patch's file list. The report states no count and uses no banned term. The revised patch at `tmp/units/us-shared.patch`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a release hover entry cannot be expressed through `$state` without a second mechanism, or when the responsive specimen cannot wrap at 1280 inside the Layout region's shape. Decide, record, and carry on for the fixture entry names, the exact `$state` parameter shape (a list of pseudo-class names, following the release's `state` key), and the sentence placement in § Styles.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0; `npm run check` exits 0.
2. `npm run build:src` exits 0, and the built cascade's `gap`, `row-gap`, `column-gap`, `g`, `gx`, and `gy` rules are unchanged from round 1 (the `compare.mjs` run, recorded with its command and output).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/mixins.test.ts tests/src/styles/utilities/gap.test.ts` exits 0; the fixture carries a `$state: (hover)` entry on `utility` (emitting `.vn-utility-<name>-hover:hover { <property>: <value> !important }`) and on `utility-variable` (emitting `.vn-utility-<name>-hover:hover { --bs-<variable>: <value> }`), and a classless responsive entry emitting `.md-<key>`; the mixins cases distinguish: the state selector emitted without `:hover`, the state emitted on the base class instead, the classless infix keeping its hyphen (`.-md-<key>`), and round 1's mutations still.
4. `npm run build:src:styles && npm run test:service` exits 0 with `profiles.test.ts` asserting the `tailwind` profile's `variables` equal to the exact measured set (a leaked `--font-sans` fails), and round 1's negative controls still red (recorded).
5. The Layout section proof, run against a probe copy with the revised shared patch applied, exits 0 with the gap specimens in the gutter shape, no `.card` in either specimen, and the `Responsive gap` specimen laid out as two rows at 1280 (assert a second row: the last item's top is below the first item's bottom).
6. In the owned files' changed comments and in the revised patch, every file path, mixin name, test name, and layer name is followed by a noun; the compatibility rows read as ruled; the revised patch applies (`git apply --check` against `87ff1d0` in a probe copy) and touches the same seven files.
7. The report carries each item of § Output.

**Observations, not criteria.** `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, the journey, and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`git -C /home/user/veneer-us diff 87ff1d0` and `git -C /home/user/veneer-us status --porcelain` at hand-back (`us-2.diff`, `us-2-status.txt`), the revised `us-shared.patch`, and the report.
