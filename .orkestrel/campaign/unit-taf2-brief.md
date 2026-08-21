# Unit TAF2: the TA-fix audit's survivors

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. Ruling record: the Sol audit verdict at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-tafix-verdict.md` and
this brief's rulings. You perform the assignment directly and spawn nothing.

## The findings

1. **The two-walk refusal is unsound** (audit claim 1, executed): 64 nested
   `rgba(255, 255, 255, 0.5)` layers converge both floor readings to `[255, 255, 255, 1]`
   through floating-point rounding, so `contrast` fails to refuse a stack no layer of which
   is opaque. Replace the second-walk comparison in `contrast` with an explicit
   opaque-termination result carried from a single walk. The Orchestrator's concretization,
   honouring the no-hidden-helpers law that stopped the prior unit from adding a private
   helper: export a `{verb}{Noun}` leaf (name it for what it returns — the painted layer
   stack the backdrop walk collects, for example `readLayers(element): readonly Color[]`)
   from `src/browser/helpers.ts`, declared in `src/browser/types.ts` per types-first if a
   new shape is needed, exported through the browser barrel, with its own tests and guide
   Surface row; `readBackdrop` composes it (public signature unchanged — it appends the
   floor and blends); `contrast` reads it once and refuses with `floor` omitted unless the
   deepest collected layer is fully opaque. An empty stack keeps the existing refusal and
   message. CONSTRAINTS: the bounded cases (`tests/src/browser/helpers.test.ts` translucent-
   over-opaque near `:1009-1019` and supplied-floor cases near `:1028-1055`) stay green;
   the shallow translucent-only refusal case stays green; add the 64-layer case as the
   regression pin — it must red against the current two-walk code and green after.
2. **The `EPERM` pin closes on distinguishing properties, not identity** (audit claims 2-3,
   ruled by the Orchestrator): full object identity requires an injection seam the
   mocking ban forbids, and the originating reviewer finding allowed "identity or
   distinguishing properties." Strengthen the file-source refusal assertion
   (`tests/src/server/helpers.test.ts`, the `captureError` block near `:238`) to pin the
   host-populated fields a freshly constructed error would not carry: `code` `'EPERM'` AND
   `syscall` present (the host reports `'symlink'`) AND `errno` present. Record in the test's
   comment that identity is unreachable without an injection seam and the host fields are
   the discriminator.

## Scope

- Owned: `src/browser/helpers.ts`, `src/browser/types.ts`, `src/browser/index.ts` (barrel
  line only), `guides/test.md` (the new Surface row and any sentence the mechanism change
  falsifies), `tests/src/browser/helpers.test.ts`, `tests/src/server/helpers.test.ts` (the
  one assertion block), `tests/guides.test.ts` (only if parity requires the new export
  there).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the 64-layer case red against the current two-walk `contrast`, green
   after; the strengthened `EPERM` assertion red against a probe substituting a fresh
   `Error` carrying only `code: 'EPERM'` (the audit's exact escape), green with the probe
   removed — confirm the plant's removal in the diff.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot` per project:
   `src:browser`, `src:server`, `guides` — each exits 0; totals reported.

## Output

The diff; raw output and exit code per criterion including both failing-first pairs; any
deviation. No process diary.

## Deviation contract

Stop on: a bounded case reddening; the 64-layer case failing to discriminate; a criterion
unreachable. Naming and wording within the rules are yours: decide, record, carry on.
