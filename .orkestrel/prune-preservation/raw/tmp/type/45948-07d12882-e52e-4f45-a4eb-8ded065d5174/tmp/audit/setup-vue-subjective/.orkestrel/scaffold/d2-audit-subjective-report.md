# Unit D2 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-17. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool. Staged in the Orchestrator's scratchpad while the objective lane still read
`.orkestrel/scaffold/`, and moved here after that lane returned.

**Decision: REJECT.** Three single-string edits are required before this ships. Nothing in the
mechanism, the contracts, the seam, or the measurement blocks.

## Per-claim verdicts

1. **CONFIRMED.** `tests/config.test.ts:80-83` filters `['core','browser','server']` by
   `lstatSync(...).isDirectory() === true`. `src/core/constants.ts:13` declares `ENVIRONMENTS` as
   exactly that list in that order, and `src/bin/helpers.ts:899-903` filters the same list by
   `isPhysicalDirectory`, which at `src/server/helpers.ts:412-415` is `lstatSync` plus
   `isDirectory() && !isSymbolicLink()`. Because `lstat` does not follow, `isDirectory()` is already
   false for a symbolic link, a junction, and a broken link, so the test and the mechanism agree on
   every link shape. One divergent input is referred as R-3.
2. **CONFIRMED.** `d2-postfix.log.txt:83-84` records shape D failing at `tests/config.test.ts:2187`
   with `The workspace declares no face project`, with `EXIT_D=1` at line 101.
3. **CONFIRMED.** Pre-fix, shapes B and C each fail. Post-fix, each reports
   `171 passed | 3 skipped (174)` with exit 0. Shape D stays red in both, which is the negative
   control the instrument needed.
4. **CONFIRMED.** The workspace sits at `C:/Users/mikes/AppData/Local/Temp/d2-postfix1/generated`.
   The lane checked the ancestor chain itself for `node_modules` at `…/Temp`, `…/Local`, `…/AppData`,
   `C:\Users\mikes`, `C:\Users`, and `C:\` — no match at any. The counts also reconcile.
5. **CONFIRMED.** `src/core/compilers.ts` declares `publishes` at `:278`, `:519`, `:714`, `:1430` for
   the fact read from disk, and `src/bin/CLI.ts:1007` declares `publishes` for the fact the
   case-locals read. Both readings own the word in the source, so D2 qualified rather than inventing
   a synonym. A taste finding stands against it as F-4.
6. **PARTLY REFUTED.** The bracket form is precedented at `tests/distribution.test.ts:996` and in
   `src/core/templates.ts`. The form stands; the bracket's content does not — see F-3. The comment at
   `:2172-2176` states only checkable facts and is accurate.
7. **CONFIRMED.** `tests/setupServer.ts:836`, `:859`, `:928` declare the three moved exports, and
   `tests/distribution.test.ts:20-27` imports them. A grep for `expect(`, `describe(`, and `it(` over
   `tests/setupServer.ts` returns no match.
8. **CONFIRMED.** Both callers read `generated.path`, `generated.environment`, `generated.manifest`,
   and `generated.pin.*`. The only remaining `'generated'` literals sit in a case that packs and
   installs nothing and correctly does not use the helper.
9. **CONFIRMED.** Three `here` hits remain in `tests/config.test.ts`, each inside a fixture string,
   which `.claude/rules/writing.md` § Substitutions exempts as data. The lane notes for the record
   that the rule bans `here` as link text and the repository's comments use it widely, so this claim
   closed a lane finding rather than a rule.
10. **CONFIRMED.** The sweep returns only prose hits.
11. **CONFIRMED.** `package.json` is absent from the status, so no version moved.
12. **UNSETTLED.** The lane cannot compute SHA-256 without a shell. Referred as R-4.

## Required before this ships

**F-1 — `tests/distribution.test.ts:437-439`: the rewritten sentence is circular and its pronouns
collide.** "The statement the comment sits on is the shortest run of lines ending at it that closes
every bracket it opens" — the first `it` points at the thing being defined, so the definition
consumes itself; the second points at the run. The `here` it replaced was deictic but not ambiguous,
so the rewrite satisfied the finding and degraded the sentence.

**F-2 — `tests/distribution.test.ts:553`: `moves that set nothing` is ungrammatical.** The replaced
text was grammatical. Right: "moves nothing in that set."

**F-3 — `tests/config.test.ts:2178`: the case name's trailing clause contradicts the case's own
invariant.** The name ends `[inapplicable where the workspace publishes no source from src, which
leaves no face project to read]`. That tells a reader a missing face project makes the case
inapplicable. The body throws `The workspace declares no face project`, and shape D proves the throw
fires. The name states, in the vendored surface every target receives, the opposite of the invariant
this campaign is about. Right: end the bracket at the skip's own mechanism —
`[inapplicable where no src environment directory exists]`. This edit forces `build:host` and
`build:inventory` before any gate that reads the generated artifact.

The deciding consideration on F-3 is cost asymmetry: the same correction is one string now, or a
bump, a publish, and a re-propagation across every target after the release.

## Recommendations and observations

- **F-4, recommendation.** `manifestPublishes` parses as subject plus verb when the intended reading
  is "publishes, per the manifest", and the module-scope `publishes` stays shadowable inside both
  cases that avoid it. The smallest correct fix qualifies both sides. Not required: each reading owns
  the bare word somewhere in the source, so the file has no collision-free option.
- **F-5, observation.** The module comment's last sentences exist only to explain the split. That is
  F-4's cost, and it is tolerable.
- **F-6, observation, outside this change.** `tests/distribution.test.ts:841` writes `above` as a
  cross-reference on a line this diff does not touch.

## Hazard rulings

- **Vendored import closure — CLEAN.** The vendored test imports only builtins, packages, the two
  vendored `configs/` leaves, the target's generated root configuration and tsconfig, and
  `./setupPolicy.js`. No `./setupServer.js` import; the helper move went entirely into the
  non-vendored `tests/distribution.test.ts`. Direct proof: a generated app-only workspace holding
  only the vendored set ran the config project to exit 0.
- **The case-insensitive decision — RIGHT.** The test asks the host the same question the mechanism
  asks it. A case-sensitive and a case-insensitive host disagree about the product identically,
  because both rest on the same `lstat`. The test tracks the mechanism rather than introducing a
  second answer.
- **The helper move's blast radius — CLEAN.** Only builtin imports added, no package edge, no cycle,
  and one `Object.freeze` reading `process.platform` at load. The `relative as relativePath` alias is
  necessary rather than ornamental.
- **Throws replacing assertions — no diagnostic got weaker, and most got stronger.** The conversion
  was obligatory because `.claude/rules/tests.md` bars `expect` from a `setup*.ts`, and the two
  readings that were genuine claims return as `pin.range` and `pin.resolved` and are asserted in both
  cases.
- **The returned shape — CLEAN, and the sub-entity earns itself.** It follows the module's
  established `Test{Entity}{Noun}` form, every member is one word and readonly, and the group
  disambiguates `version`, which flattened would read as the workspace's own.
- **The helper seam — NATURAL.** Neither case body carries glue. The one implicit coupling is stated
  in a `@param`.
- **The scope sentence D2 flagged — ACCURATE. Retain.**
- **What the target sees — no target can redden on this change.** The compiler-refusal reading, which
  moved to `configs/tsconfig.absent.json` so it resolves without a `configs/src/` directory, is
  evidenced by the app-only run rather than derived.

## Referrals to the objective lane

- **R-1** — `tests/config.test.ts:80-83` runs `lstatSync` at module scope, so a throw there is a
  collection error taking the whole file down rather than one case.
- **R-2** — the compiler-refusal path moved to `configs/tsconfig.absent.json`; whether `tsc` refuses
  it with the same message on both workspace shapes is a behavioural reading.
- **R-3** — `lstatSync(path, { throwIfNoEntry: false })` suppresses `ENOENT` alone and rethrows
  `EACCES` and `EPERM`, while `isPhysicalDirectory` wraps the same call in `attempt` and returns
  `false` for every error. On a directory the process cannot stat, the vendored test throws where the
  mechanism it claims to match returns false.
- **R-4** — re-derive the SHA-256 of the source and the vendored copy against `host.json` on the
  current tree.

VERDICT: REJECT
