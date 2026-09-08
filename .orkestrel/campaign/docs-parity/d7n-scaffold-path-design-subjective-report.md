I hold the **subjective design lane** (shape, naming, ergonomics, design fit). I read only; I ran nothing and edited nothing.

---

## Design

**Invariant.** A lint diagnostic's reported filename and a written expectation compare equal exactly when they name the same file beneath the run's known root, because both operands pass through the same boundary conversion before comparison.

**Ownership.** The conversion is one exported helper in the vendored policy register, `tests/setupPolicy.ts`, beside the normalizer it complements. `tests/config.test.ts` calls it at the diagnostic boundary and nowhere else. `normalizePolicyPath` (`tests/setupPolicy.ts:276`) keeps its documented contract — workspace-relative text in, slash-canonical text out — and every existing caller keeps its behavior.

**The helper.**

```ts
export function normalizePolicyFilename(root: string, filename: string): string {
	const url = isAbsolute(filename) ? null : URL.parse(filename)
	const native = url === null ? filename : fileURLToPath(url)
	return normalizePolicyPath(relative(root, resolve(root, native)))
}
```

Name: `normalize*` is the fixed form for the canonical form of a value of the same type, and `filename` is the exact field oxlint's JSON report carries, so the helper names the external field it consumes. The `Policy` infix matches the register's family (`normalizePolicyPath`, `readPolicyPaths`, `isPolicyFile`), and the root-first parameter order matches `resolvePolicyDirectory(root, path)` and `isPolicyFile(root, path)`.

**Why the branch order is the design and not an accident.** The absolute test runs first for reasons that are each load-bearing:

- A Windows absolute path `C:\a\b.ts` parses as a URL whose protocol is `c:`. Parsing first would route a native path into URL decoding.
- A native path carrying a percent sign is not an escape sequence. Reaching the absolute door first is what keeps `100%.ts` intact, so nothing decodes a native percent sign.
- A file URL is never absolute by `isAbsolute`, on either host, so the URL door stays reachable for the case that produced the defect.

`fileURLToPath` refuses a malformed file URL and refuses any other scheme by throwing, so the helper writes no scheme branch and no error message of its own. Nothing is caught. That satisfies "fail loudly" with the platform's own diagnostic rather than a hand-written one.

**Out-of-root filenames stay distinguishable rather than fatal.** `relative` returns a `..`-prefixed path for a sibling directory and an absolute path for another Windows drive; either is normalized and returned. Neither can equal an expected `src/violations/...` entry, so the equality assertion does the discrimination. Throwing there would convert a stray diagnostic naming an unrelated file into a crash that hides which assertion was being read.

**Call site.** `tests/config.test.ts` computes the base once, from `realpathSync(scratch.path)` — `realpathSync` is already imported at `tests/config.test.ts:12` — and line 1863 becomes `codes.push(\`${code} ${normalizePolicyFilename(base, filename)}\`)`. The realpath is the operand-normalization half of the portability rule: the child resolves its own working directory, so the base must be resolved the same way before either operand is compared. Expected entries at `tests/config.test.ts:1875-1897` stay written as they are, because they are already the canonical form the boundary produces; the boundary normalizes the arriving operand up to them rather than degrading them down.

**Regression proof.** A new root proof, `tests/setupPolicy.test.ts`, collected by the existing `setup` project through its `tests/setup*.test.ts` include (`vite.config.ts:164`) with no configuration change. It resolves against its sibling module exactly as `.claude/rules/tests.md` fixes the pairing, and it is scaffold's own file rather than a vendored one, so no target receives it and no vendored path is added. Its cases build every native input with `join` and `resolve` and every URL with `pathToFileURL`, never with a written literal, so each case is correct on the host it runs on:

- an absolute native path beneath the root and the file URL `pathToFileURL` builds from that same path return the identical relative name — the round trip that pins the defect;
- names carrying a space, a percent sign, a hash character, and a non-ASCII character each go through both doors and agree;
- a native absolute path whose name contains the literal text `%25` keeps that text, proving the native door decodes nothing;
- a relative native filename returns itself in slash form;
- the root itself returns the empty string;
- a file beneath a sibling root does not equal the in-root answer and names the sibling directory;
- a file URL carrying `%2F` throws, and a `https:` URL throws — the controls drawn from outside the population the happy path covers;
- `normalizePolicyPath` applied to a file URL does **not** equal the expected relative name — the case that pins the logical normalizer's narrowness and reddens if a later change widens it.

The real-binary integration proof at `tests/config.test.ts:1750` is untouched in substance: the same spawn, the same fixtures, the same rule and code assertions, the same `expect(clean.status).toBe(0)` and `toHaveLength(0)`. Nothing stands in for the diagnostic producer.

**Instruction home.** One clarification in `.claude/rules/portability.md` § Paths, placed directly after the `pathToFileURL` line, scoped to the conversion rather than to this test:

- Read a host path out of a `file:` URI with `fileURLToPath`. Never strip the scheme, the leading slash, or the drive prefix yourself, and never percent-decode the path by hand.
- Test a candidate with `isAbsolute` before parsing it as a URL. A Windows drive prefix parses as a URL scheme, and a native `%` is not an escape.

That file's `paths:` frontmatter already covers `tests/**/*`, so no frontmatter edit follows. `CLAUDE.md` gets nothing: it is a harness bridge and carries no coding policy.

**What over-correction would break.**

- Widening `normalizePolicyPath` to decode URLs breaks `createPolicyScratch.write` containment at `tests/setupPolicy.ts:67-75`, which refuses an absolute or escaping target by reading that normalizer's output, and it silently changes the mirror stems, glob readings, ignore-pattern reading, rule-map cells, and prose paths that all pass through it.
- Stripping to a basename destroys the two assertions that carry directory context: `policy(no-malformed-domain) app/browser/composables/useTheme.ts` at line 1888, which must not collide with the same rule's hit on `src/violations/composables.ts` at line 1887, and the negative `expect(violationCodes).not.toContain('policy(no-host-line-endings) scripts/read.ts')` at line 1897, which a basename fold would satisfy from the fixture's own hit and turn into a permanent false green.
- Case-folding lets a fixture written at `src/Violations/fixture.ts` satisfy an expectation naming `src/violations/fixture.ts`, hiding a real placement defect on a case-sensitive host.
- Catching a malformed URL and returning the raw text converts a producer change into "no diagnostic matched", which reads as a policy-rule regression and sends the next reader to the plugin.
- Throwing on an out-of-root result converts a stray diagnostic — the config file, a resolved dependency — into an error that names nothing about the assertion under test.

---

## Alternatives

**Inline the conversion in the diagnostic loop of `tests/config.test.ts`.** It adds no vendored export and no new file. It loses the property that makes the fix provable: the case matrix the brief requires — a space, a percent sign, a hash character, Unicode, a malformed URL — would have to be driven through the real oxlint binary over fixture files carrying those names, which is slow, partly unwritable on a Windows checkout, and cannot express the malformed-URL case at all. The instrument would then be certified only from inside the one filename shape the fixtures happen to produce. The helper wins because the conversion is genuine translation across two node modules with a fail-loud edge, which is what the wrapper test admits, and because a pure leaf is the only shape the required proof can address directly.

**Make the scratch root canonical instead, by resolving it inside `createPolicyScratch`.** It fixes the base for every caller at once and needs no new export. It changes the meaning of `PolicyScratchInterface.path` for every existing consumer of a vendored interface, in a change whose subject is a diagnostic comparison, and it still leaves the file URL undecoded — the actual defect survives it. Refused: it widens unrelated behavior and does not close the finding.

---

## Constraints

Objective lane.

## Refusals

Objective lane.

## Measurements

Objective lane. Readings the design needs and the dispatch did not supply are named under Tensions.

---

## Units

**U1 — implement the boundary.** Role `sol`, engine Sol; on a recorded dark Codex bench, role `implementer`, engine Opus, substitution recorded in the routing ledger. Objective, constraint-heavy path semantics is Sol's class of work.

- Owns: `tests/setupPolicy.ts`, `tests/config.test.ts`, `tests/setupPolicy.test.ts`, in the isolated worktree at `tmp/pass/scaffold-path`.
- Off-limits: `package.json`, `package-lock.json`, `host.json`, `dist/**`, `src/**`, `configs/**`, `.claude/rules/**`, every other `tests/**` file, and the primary checkout entirely.
- Depends on: the clean worktree existing at `c87021bd`.
- Acceptance, cheap first: the new proof file exists and the register exports the helper; `npx tsc -p tsconfig.json --noEmit` clean; `npx oxlint --config .oxlintrc.json tests/setupPolicy.ts tests/config.test.ts tests/setupPolicy.test.ts` clean; `npx oxfmt --config .oxfmtrc.json --check` clean over those paths; the `setup` project green; and the `config` project **filtered to the diagnostic test name** recorded red before the edit and green after, with both readings quoted.
- The filter is load-bearing: the `config` project also refuses a stale `host.json`, and regeneration is the Orchestrator's, so an unfiltered run inside this unit reports an inventory failure that is not this unit's.
- Reports as observations, never as criteria: the unfiltered `config` project reading, any whole-suite reading, and the host it ran on with the date.

**U2 — land the portability clarification.** Role `implementer`, engine Opus. Rule prose is voice work and the policy prose sweep reads it.

- Owns: `.claude/rules/portability.md` alone, in the same worktree, dispatched only after U1 returns, because one writer holds a checkout at a time.
- Acceptance: the directives sit in § Paths after the `pathToFileURL` line, name `fileURLToPath` and `isAbsolute`, refuse manual scheme, drive, and escape rewrites, restate no existing rule, record no history, and carry no term the `.claude/rules/writing.md` § Substitutions table bans; `npx vitest --project policy` green.

**U3 — mechanical conformance evidence.** Role `grok`, engine Cursor Grok, stepping the ladder to `checker` only after Grok is recorded past.

- Reads the returned diff and reports: that no caller of `normalizePolicyPath` other than the diagnostic loop changed; that `tests/setupPolicy.ts` imports only `node:*` modules and packages the vendored-import allowlist admits, which `tests/src/server/helpers.test.ts` reads; that `HOST_PATHS` in `src/core/constants.ts` is unchanged; and that no vendored path was added.

**U4 — adversarial audit.** Roles `analyst` (Sol) and `reviewer` (Opus), blind, clean-contexted, on numbered falsifiable claims, at least one on an engine that did not write the work. Subject: the invariant, the branch order, the fail-loud edge, and the over-correction list.

**U5 — regenerate and verify.** The Orchestrator runs `npm run build:inventory` on the canonical checkout after integration, then role `verifier`, engine Sonnet, runs the gate chain in order and reports exit codes and output.

**Exit criterion.** The campaign ends when: the boundary helper exists with its documented contract; the diagnostic loop compares through it; the case matrix and its controls run green in the `setup` project; the unfiltered `config` project is green against a regenerated inventory on Windows; the portability directive is landed; and the Linux gate reading is either green or recorded as a limit naming the host it needs.

---

## Tensions

These are my lane's judgment calls. The objective lane can overturn each.

- **The base is `realpathSync(scratch.path)`, not `scratch.path`.** I chose the realpath because the child resolves its own working directory and reports from that, and because a symlinked temporary root on Linux or macOS and a short-name temporary root on Windows both break a raw base. The dispatch supplied no Linux reading, so this is inference from Node and OS semantics, not measurement. **Missing reading:** the `filename` field oxlint emits on Linux for the same fixture — absolute file URL, absolute native path, or relative — and whether it names the symlinked or the resolved root. Command the Orchestrator can run: the retained `d7n-guide-policy-observe` observation instrument on a Linux runner, or the CI Linux gate over the `config` project.
- **The helper takes no filesystem reading.** Keeping it pure is what makes the required case matrix testable without writing files whose names a Windows checkout refuses. The cost is that a producer reporting a path through a different symlink than the base cannot be reconciled inside the helper; that repair belongs at the call site.
- **An out-of-root result is returned, not thrown.** I weighed fail-closed against diagnostic clarity and chose the value that cannot equal any expectation. The objective lane may argue the fail-closed direction is mandatory here.
- **`URL.parse` over `URL.canParse`.** One parse rather than a parse-and-reparse. **Missing reading:** whether `URL.parse` is present in the declared `@types/node` and the Node floor of `>=22.12.0` as the workspace resolves them. The unit's typecheck settles it in its first criterion; the named fallback is `URL.canParse(filename) ? fileURLToPath(filename) : filename`.
- **The proof lives in a new `tests/setupPolicy.test.ts` rather than in the vendored `tests/policy.test.ts`.** The setup pairing rule names it, and the vendored surface stays as small as the fix allows. The counter-argument the objective lane can make: putting it in the vendored proof would propagate the regression guard to every target.
- **The dispatch supplied no bench-liveness reading**, so U1's engine is stated as a primary with a recorded fallback rather than as a fact. Re-probe at dispatch.
- **The dispatch supplied no reading of whether `host.json` digests cover canon paths.** That decides whether U2 also forces a regeneration before the `config` project runs. Command: read the inventory's declared path set against `CANON_PATHS`, or run `build:inventory` after U2 and read whether the file changed.
- **No `prove` receipt exists for the conversion fragment.** The brief records that the legacy transport refused the stream. I claim nothing proven about the branch order; the new proof file is what binds it, and the round-trip case plus the `%2F` control are what make that proof capable of failing.

---

## Risks

- **The Linux gate reddens on the base choice.** Evidence that settles it: the `config` project run on Linux with the fix in place. Repair is one call-site line, inside U1's owned set.
- **A future oxlint version changes the `filename` shape.** The design absorbs a relative name, an absolute name, and a file URL by construction, so the shape can move without breaking the comparison. Evidence: the case matrix covers all three doors.
- **A file URL carrying an unescaped hash character loses everything after it before any reader sees it.** No conversion can detect that. This belongs in the helper's `@remarks` as a stated limit, not in code. Evidence needed: none — it is a property of the URL format; the limit sentence is the deliverable.
- **macOS reports a decomposed filename that a composed expectation does not equal.** The design adds no `normalize` call, because renormalizing would hide real mismatches. Present expectations are ASCII, so the risk is dormant. Evidence that would raise it: a non-ASCII fixture name entering the vendored instrument.
- **The vendored surface moves, so `scaffold` bumps, publishes, and propagates.** That is release coordination the brief places outside this round; the risk is that a target running `repair` before the release sees restored old bytes. Evidence: the owner's ruling on release order, which the diagnosis file already routes to the owner.
- **A concurrent writer touches the worktree.** U1 and U2 are serialized for this reason, and the primary checkout with the owner's `package.json` and `package-lock.json` edits is off-limits to every unit.
