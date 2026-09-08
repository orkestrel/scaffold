## Lane

I held the **subjective** lane: design acceptance criteria, API and vocabulary, architecture fit, simplification, and prose coherence. Correctness under adverse orderings, test sufficiency, and dependency constraints are referred, not adjudicated.

This lane ran as a native Claude Code subagent on Opus, not across a bench, so it has no journal path and no session id. Nothing in this verdict rests on the builder's report as its only evidence except where a verdict says so.

## Numbered verdicts

**1. Fixed population, fresh output only, no mutating operation — CONFIRMED**

`main.mjs:8` declares `run(root, output, npm, git)` with no population parameter, `constants.mjs:1` freezes `PACKAGES`, and `main.mjs:26` iterates that constant directly, so no caller-supplied list reaches the visit. Every production write resolves under `output`: `Capture.mjs:23`, `Capture.mjs:28`, `Capture.mjs:61-62`, `Capture.mjs:96-97`, and `Capture.mjs:104-107` all pass through `join(this.#output, …)`. Path handling is `node:path` throughout (`main.mjs:2`, `Capture.mjs:2`, `helpers.mjs:2`); no separator is concatenated by hand.

Attack that held: I looked for a write escape through `Capture.file`, whose `saved` parameter is caller-supplied and unconstrained (`Capture.mjs:35`). The class does not enforce its own write boundary — only `package()` constructs `saved` under `output` (`Capture.mjs:98-99`, `106-107`). The claim is scoped to the production entry, and through that entry the parameter is never caller-reachable, so the claim holds. Record the class-level permissiveness as adjacent behaviour that looks like the defect and is not one.

Occupied-output refusal is evidenced by the control at `test.mjs:40-50`: a sentinel file at the output path, `run` rejected, sentinel content re-read unchanged. No install, pack, publish, fetch, or Git write verb appears anywhere in the carrier; `constants.mjs:13-19` carries only read verbs, and the sole project import is the declared `@orkestrel/process/server` (`Capture.mjs:3`), not fleet source. Bound: no production run has occurred, so this confirms what the code does, not what a live survey did.

**2. Byte fidelity for files, unparsed streams, honest encoding boundary — CONFIRMED**

`Capture.mjs:38-39` reads and writes a `Buffer` with no encoding argument, and `helpers.mjs:4-6` digests those same bytes, so the saved copy and the digest share one source. The control at `test.mjs:14-27` writes non-UTF-8 bytes, re-reads the copy with `deepEqual`, and matches the row digest independently, so the identity assertion has a real input that a decoding bug would break.

Command streams are written with an explicit `'utf8'` argument (`Capture.mjs:65-66`) and digested over `Buffer.from(text, 'utf8')` (`Capture.mjs:77-78`), so the digest describes the bytes actually on disk. No trim, slice, or parse touches either stream — the grep for `JSON.parse` over `tmp/pass/layer-capture` returned no match. The row carries package, `stdout.path`, `stderr.path`, `executable`, `arguments`, `cwd`, `started`, and `finish` (`Capture.mjs:67-79`), and `run.json` states the decode boundary rather than claiming native bytes (`Capture.mjs:24`).

Attack that held: I tried to find a path where a command stream is written decoded but digested from a differently-encoded buffer, which would make the row's identity claim false. Output and digest read the same `output`/`diagnostics` locals, so they cannot diverge.

**3. Failures stay explicit through expiry, abort, and truncation — UNRESOLVED**

The conjuncts with evidence hold. Nonzero exit and malformed JSON text survive intact: `test.mjs:52-69` drives a real child to exit `7`, asserts `row.code`, `row.failed`, and re-reads both stream files against the exact Unicode and malformed-JSON strings written. A missing input leaves an error row with no digest (`test.mjs:29-38`, `Capture.mjs:43-47`). No verdict, health, or projection field exists anywhere in a row, and no retry loop exists — `Capture.mjs:56-58` catches once and never re-invokes.

The rest cannot be decided from the supplied evidence. No control exercises expiry, abort, or truncation. `test.mjs:65-67` asserts only that `row.expired`, `row.aborted`, and `row.truncated` are of boolean type — an assertion that passes whichever value the substrate reports, so it cannot fail on the behaviour the claim names. That leaves "expiry or abort retains the available streams and row before stopping" and "truncation is visible" resting on a source reading of `Capture.mjs:61-91` plus `Capture.mjs:102/105/110` and `main.mjs:28`, with no executed proof and no run under those conditions. A read-only lane returns a derivation there, and a derivation is not a verdict.

What would settle it: a control that sets a small timeout against a child that sleeps past it and asserts the stream files and the row exist with `expired: true` and the visit stopped; and a control whose child writes past `LIMIT` and asserts `truncated: true` with the retained partial stream. Both belong beside the controls already at `test.mjs`.

**4. Production command vectors and the cached-origin label — BROKEN**

The vectors themselves are right. `constants.mjs:14-18` carries `status --porcelain`, `branch --show-current`, `rev-parse HEAD`, `rev-parse origin/main`, and `merge-base --is-ancestor origin/main HEAD`, each prefixed with `-C` and the checkout path at `Capture.mjs:101`. The npm vector at `Capture.mjs:104` requests the full response with `--registry=https://registry.npmjs.org/` and `--json` and implements no field selector, so no category can be lost through a custom projection. Before and after copies keep distinct names (`Capture.mjs:98-99` against `106-107`) and the second Git pass is suffixed (`Capture.mjs:109`). No package JSON is parsed by the carrier.

The claim's labelling conjunct is false. **`origin/main` is nowhere labelled cached.** A case-insensitive grep for `cached` across `tmp/pass/layer-capture` returns no match. `run.json` records `encoding`, `limit`, `platform`, `population`, `registry`, `timeout`, `timestamp`, and `version` (`Capture.mjs:28-38`) and no staleness statement; the `git-origin` row (`constants.mjs:17`) records the vector and its output with nothing marking the ref as unrefreshed. The governing spec requires it — `d7n-layer-reading-boundary-verdict.md:18-20` places the origin refresh in a separate root operation, and `d7n-layer-capture-brief.md:63-65` directs the label into the run metadata.

Why it matters: this transcript is the input to graph reconciliation. A reader meets a `rev-parse origin/main` hash and an ancestry result with nothing on the record saying the ref was never fetched, so a stale ancestry reads as a current one. The carrier is honest about its decode boundary and silent about its staleness boundary — the same class of caveat, one of them shipped.

What right looks like: name the label in `constants.mjs` beside `REGISTRY`, and emit it from `Capture.begin` into `run.json` as its own field stating that `origin/main` is a cached local ref this carrier does not refresh, with root's separate refresh receipt establishing freshness. Bound: nothing else in this claim is broken, and the Git and npm vectors need no change.

**5. Controls exercise the real recording code — CONFIRMED**

`test.mjs:6-8` imports `Capture`, `digestBytes`, and `run` and calls them; no duplicate implementation and no source-text pattern stands in for the subject. Real filesystem: `mkdtemp` under `tmpdir()` (`test.mjs:10-12`), cleaned by the exact created path (`test.mjs:26`, `37`, `49`, `68`). Real child boundary: `process.execPath` running `child.mjs` (`test.mjs:60`), whose body only echoes supplied literals and sets an exit value (`child.mjs:1-4`), so it fakes no project behaviour. Nothing in the control names or assertions purports to cover fleet coverage, binary stdout, npm tree traversal, symlink races, or supervision internals.

Membership and exclusions, by family:

- **File bytes and digest** (`test.mjs:14-27`). Members: a small non-UTF-8 file through `Capture.file`, copy compared by `deepEqual`, digest compared against an independent computation. Excluded: a large file, a file mutated during capture, a read denied by permission, and the before/after pairing that `Capture.package` performs.
- **Missing input** (`test.mjs:29-38`). Members: an absent source path, asserting `error` present and `digest` absent on the returned row. Excluded: a read failure that is not `ENOENT` — a directory supplied as source, a locked file — and whether the failed row reached the journal.
- **Occupied output** (`test.mjs:40-50`). Members: a regular file at the output path through `run`, refusal matched on the message and the sentinel re-read. Excluded: an occupied directory, a symlink at that path — the `lstat` against `stat` distinction is never exercised — the relative-path refusal, the checkout-root refusal, the containment refusal, and a creation racing between `lstat` and `mkdir`.
- **Child settlement** (`test.mjs:52-69`). Members: a real child with Unicode and malformed-JSON stdout, Unicode stderr, exit `7`; asserts `code`, `failed`, and both stream files byte-for-byte. Excluded: truncation past `LIMIT`, a real expiry or abort and the stop-the-visit path, the `settlement` field's contents, the appended journal line, and any end-to-end pass through `main.run`.

No family observes `rows.jsonl`. Every test reads the returned row object; none reads the file `Capture.mjs:115-117` writes. The controls therefore execute the journal and assert nothing about it. That is a coverage exclusion I name here as the claim instructs; whether it is a sufficiency defect is R-2, referred.

**6. Declarations, state, helpers, and terms have their proper owners — BROKEN**

Several independent breaks, each readable from the diff:

- **`Capture.mjs:74` is a no-op conditional.** `packageName === 'scaffold' ? '@orkestrel/scaffold' : \`@orkestrel/${packageName}\`` produces the identical string on either branch. It presents a special case that does not exist, and a reader must evaluate the template to learn that. The specifier is then built a third way at `Capture.mjs:104` with no shared source. Fix: delete the conditional, put the scope prefix in `constants.mjs`, and build the specifier once.
- **`Capture.mjs:86` stores `settlement: result` beside the fields spread from that same result at `Capture.mjs:81-87`.** Every settlement value is recorded twice in one row, and `command` at `Capture.mjs:69` is a third copy of `result.command`. This is stored state that can only drift or bloat: `settlement.stdout` carries the whole stream inline, so a large `npm view` response is written into `rows.jsonl` in addition to the stream file the same row already points at with a digest. Fix: keep the named settlement fields and the stream paths, and drop `settlement`.
- **`Capture.mjs:75` and `Capture.mjs:40` give one row key two meanings.** `source` is a command label (`git-status`, `npm-view`) on a command row and an absolute file path on a file row. `digest` likewise means arrived bytes on a file row (`Capture.mjs:46`) and re-encoded decoded text on a command row (`Capture.mjs:77-78`), with the caveat living only in `run.json`. A consumer reading one journal meets one vocabulary, and this journal has two. Fix: name each axis for what it is — the command's label and the file's path are different fields.
- **`Capture.mjs:46`, `50`, `79` use `type` as the row discriminant.** `AGENTS.md` § Design laws bans `kind` and `type` as discriminant names and requires the axis be named. Fix: name the axis, such as `record`.
- **`main.mjs:16` puts the literals `'scaffold'`, `'tmp'`, and `'pass'` in a validation body** while `constants.mjs` is the designated home the governing brief names for constants (`d7n-layer-capture-brief.md:21-23`).
- **`helpers.mjs:13-15` is a rename-only wrapper.** `stamp()` returns `new Date().toISOString()` and adds no boundary, invariant, composition, or narrower contract; the method name already states the format. This is the weakest of the breaks — it does fix one timestamp spelling across the carrier — and I record it as such rather than leaning on it. `digestBytes` is not in this class: it composes `createHash`, `update`, and `digest` and earns its place.
- **`Capture.mjs:24` puts an English sentence in a field named `encoding`.** The caveat is required and its content is correct; a reader of `run.json` opening `encoding` expects an encoding name. Fix: keep the sentence under a field that names a note, and let `encoding` carry `utf8`.

Bound: no parser, no assertion, no suppression, no behavioural fake, no nested assigned function, no duplicated package-health state, and no unsolicited dependency was introduced. The controls' `createTemporary` at `test.mjs:10` is module-scope, not nested. The break is vocabulary, placement, and duplicated state — not the prohibitions the claim's second clause lists.

## Findings outside the claims

**F-1. `main.mjs:16` adds an unrequested containment rule, and it makes `main.mjs:13-15` unreachable.**

The governing brief specifies exactly the input/output validation the carrier owes: absolute paths, an exclusive `mkdir` refusing an occupied output, a refused relative path, and a refused output equal to a checkout root (`d7n-layer-capture-brief.md:36-38`). `main.mjs:16` adds a rule nobody asked for — the output must sit beneath `<root>/scaffold/tmp/pass` — and the report never names the addition, though the brief directs the builder to stop on a change to the specified boundary (`d7n-layer-capture-brief.md:125-126`).

The addition is not neutral. Any path satisfying `isInside(resolve(root, 'scaffold', 'tmp', 'pass'), output)` lies at least three segments below `root`, so it can never equal `resolve(root, packageName)`, which lies one segment below. The checkout-root loop at `main.mjs:13-15` is therefore dead: it is a guard that reads as protection and can never fire. A later reader deleting the containment rule would silently re-arm a check that has never run.

Why it matters beyond tidiness: the carrier is meant to be a thin mechanism that root points at a fleet, and this bakes one host's directory layout into its contract as product policy. Root cannot direct output to a scratch volume, a different drive, or anywhere outside one specific checkout without editing the carrier.

What right looks like: remove `main.mjs:16`, keep the absolute-path, checkout-root, and exclusive-`mkdir` refusals the spec names, and let root choose the output location. If a containment rule is genuinely wanted, it belongs as a constant with the layout it encodes named, and the now-live checkout-root loop stays.

**F-2. The containment rule forces the carrier's output inside a checkout the carrier surveys.**

`constants.mjs:5` includes `scaffold` in the population, and `main.mjs:16` requires the output to live under `<root>/scaffold/tmp/pass`. So while the survey captures the `scaffold` checkout's `git status --porcelain` before and after (`Capture.mjs:100-103`, `108-111`), the carrier is actively writing into that checkout and appending to `rows.jsonl` there.

What keeps this from corrupting the reading is external: `.gitignore:11` in this checkout ignores `tmp`. The carrier neither checks that rule nor records its dependence on it, and `run.json` says nothing about writing inside a surveyed checkout. A checkout whose ignore rules differ, or a future change to that line, turns the carrier's own output into the status evidence it is capturing — and the before/after comparison the checker performs would read the carrier's growth as a moving checkout.

Bound: no other package in the population is written to, and today's reading is not corrupted. What right looks like: with F-1's rule removed, place output outside every surveyed checkout; if it must stay inside one, record the checkout it writes into as a field in `run.json` so the checker can discount that package's status rows on the record rather than on an assumption.

**F-3. `run.json` records the population it is handed, not the population that is visited.**

`Capture.mjs:27` writes `population: input.population`, restating a value the spread at `Capture.mjs:23` already carried — a line that reads as if it sources the population and does not. The visited population comes from `PACKAGES` at `main.mjs:26`; the recorded one comes from whatever `begin` is called with. Nothing ties them.

This is not hypothetical. The controls demonstrate the drift: `test.mjs:22`, `32`, `56` call `capture.begin({ population: [] })`, writing a `run.json` that declares an empty population. Any caller of `Capture` other than `main.run` produces a metadata record that contradicts the visit. The claim that the population is fixed is enforced at the entry and unrecorded at the transcript.

What right looks like: have `begin` read `PACKAGES` from `constants.mjs` directly and drop the `population` key from its input, so the recorded population and the visited population are one fact with one source. Delete the redundant restatement at `Capture.mjs:27` either way.

## Referrals to the objective lane

No verdict from me on any of these.

- **R-1. `Capture.mjs:41-47`: the journal append sits inside the try that guards the file copy.** If `writeFile` succeeds at `Capture.mjs:39` and `#row` rejects at `Capture.mjs:41`, the catch records an error row asserting the file capture failed when the bytes were written. Whether that is reachable under resource exhaustion, and what the second `#row` call at `Capture.mjs:45` does when the first one just failed, is an adverse-ordering question. My lane's half: one catch stands for two different failures and produces a row that names the wrong one.
- **R-2. No control observes `rows.jsonl`.** Every assertion reads the returned row object; `Capture.mjs:115-117` executes unasserted. Whether the durable journal — the artifact graph reconciliation consumes — is sufficiently proven is a test-sufficiency ruling.
- **R-3. `test.mjs:60` resolves the child through `join(process.cwd(), 'tmp/pass/layer-capture/child.mjs')`.** The control's subject path depends on the ambient working directory rather than `import.meta.url`. Whether that invalidates the control when run from elsewhere is the instrument's correctness.
- **R-4. Claim 1's "no credentials inspection".** The carrier itself reads no credential file. Whether `npm view` with an explicit public registry consults `.npmrc` auth on this host is a substrate question.

## Attacked and held

- **Claim 1, write escape through `Capture.file`.** The `saved` parameter is unconstrained at the class level; the attack fails because `package()` is the only production constructor of that argument and it builds under `output`. Adjacent behaviour that looks like the defect: `Capture.mjs:21` calls `mkdir` with `recursive: true`, which would create parents for a directly constructed `Capture`. Through `main.run` the exclusive `mkdir` at `main.mjs:23` has already established the directory, so the recursive call is a no-op there and the exclusivity guarantee survives.
- **Claim 1, occupied-output control flow.** `main.mjs:17-22` throws its own refusal from inside the `try` whose `catch` exists for `lstat`. The attack was that the refusal is swallowed. It is not: the thrown `Error` carries no `code`, so `!('code' in error)` is true and it is re-thrown. The mechanism is correct and reads as an accident; a reader must trace three negations to see it works. Bounded as readability, not defect.
- **Claim 2, digest and saved bytes diverging.** Both derive from the same local in each path, so no encoding split is reachable.
- **Claim 4, category loss through a manifest field list.** None exists; `Capture.mjs:104` requests the full response.
- **Claim 3, a hidden verdict field.** I searched every row constructor for a health, validity, completeness, or derived-termination field. None exists — the row carries only substrate vocabulary and capture facts. Adjacent behaviour that looks like the defect: a failed file row still carries `saved` naming a path where nothing was written (`Capture.mjs:50`). The `error` key disambiguates it, and this is correct.
- **Population fidelity against the spec.** `constants.mjs:1-8` matches the population `d7n-layer-capture-brief.md:43-47` fixes, member for member.

VERDICT: FAIL 3, 4, 6; outside the claims: F-1, F-2, F-3
