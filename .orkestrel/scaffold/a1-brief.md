# Unit A1 — adversarial audit of the host-split campaign

## Subject and chain

The subject is the whole campaign, not the last commit: branch
`claude/scaffold-proposal-impl-nabmm9`, tip `ffbc6e3`, baseline `825c464` (release 0.0.55).

| Round | Commits | Claimed to close |
| ----- | ------- | ---------------- |
| W1 | `8f5c20d` | The canon split, the pointer templates, the overlay pair, the advisory, and their mirrored tests |
| W2 | `4b76a1c` | Fixture shadows, the vendored policy re-scope, the canon-family inventory proof, the regenerated `host.json` |
| W3 | `4979ed2` | Guide, README, roadmap, and visit parity; the proposal's retirement |
| Probe fix | `ffbc6e3` | The setup question's write claim, corrected from a driven run |

Opus 5 wrote every one of these (the Codex bench is dark this session). A lane whose engine is
Opus is auditing its own engine's work: attack that half harder — a clean pass on your own
engine's output is the least valuable result you can return.

## What the round decides

This round decides whether the campaign is accepted and the branch offered to the owner as the
release that ends instruction-file propagation. A finding is worth more than a clean pass: the
alternative is every fleet target repairing to a defective pointer after publication.

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from a writer's report:

- Every scoped project is green at `ffbc6e3` in this container: `src:core` 373, `src:server` 418,
  `src:bin` 206, `config` 46, `policy` 111, `guides` 17, each exit 0.
- `host.json` differs from the baseline only in the `tests/policy.test.ts` entry digest and the
  membership digest, and `npm run build` reproduces it byte-identically.
- The end-to-end probe (`.orkestrel/scaffold/probe-e2e.md`): a fresh offline `new` writes the
  pointer pair and no canon tree; `audit` reports a drifted pointer stale and raises the canon
  question naming a planted `.claude/rules`; `repair` restores the pointer bytes, leaves the
  leftover untouched, and carries the question in its terminal audit without refusing.
- The failing-first records in `.orkestrel/scaffold/w1-report.md` and `w2-report.md`.

## Review evidence

- The actual diff: `tmp/units/a1.diff` (baseline `825c464` to `ffbc6e3`, campaign folder
  excluded).
- The actual status output: `git status --porcelain` is empty at dispatch; the tree equals
  `ffbc6e3`.
- The reconciled plan and design reports under `.orkestrel/scaffold/`.
- The probe record `.orkestrel/scaffold/probe-e2e.md` — supplied as executed evidence for the
  behavioral claims, because your lane does not execute.

## Numbered falsifiable claims

1. **Staging is total and unchanged in membership.** `dist/host` and `host.json` carry every
   `HOST_PATHS` and every `CANON_PATHS` member, no path appears in both constants, and no path
   left the staged set relative to the baseline release.
2. **No compiled plan claims a canon path.** For any blueprint name and any group selection, no
   planned artifact's path is a `CANON_PATHS` member or sits beneath one.
3. **The pointer pair is planned exactly once each** at `AGENTS.md` and `CLAUDE.md`, with
   `origin: 'template'`, `ownership: 'content'`, `group: 'docs'`, and `README.md` still
   birth-owned beside them.
4. **The pointer bodies resolve.** Every sibling path they name exists in this checkout under
   `../scaffold/` semantics (the checkout itself), every installed path they name exists under
   `dist/host/` after a build, every `@` sits inside backticks, and no `{{token}}` remains.
5. **The overlay pair is sound.** The upstream fetch list contains no canon destination, contains
   every planned non-deferred destination, and `filesToHost` returns a live host when the fill
   carries no canon row while returning `undefined` when a planned non-deferred row is missing.
6. **The canon advisory is bounded.** It names exactly the canon members present in the target
   minus the planned document paths, no verb writes or deletes a canon path in a target, and an
   aligned tree's exit code is unchanged by the advisory's presence.
7. **The vendored policy suite binds and releases correctly.** In scaffold it fails when the skill
   family disagrees with a direct filesystem read or when a rule file has no rule-map row; on the
   post-migration target shape it passes; the twin-directory law still fails a lone bridge side;
   and the `orkestrel-falsify` bind survives in the server inventory proof with a control drawn
   from outside the staged population.
8. **The catalog path survives the split.** `.claude/agents/orkestrel.md` is planned
   presence-owned and deferred, written by `new`, restored by `repair` when absent, and
   `Materializer.catalog` finds it on a generated target.
9. **The shipped prose is true.** No sentence in `guides/scaffold.md`, `README.md`, `ROADMAP.md`,
   or the wave reference describes an instruction file as vendored into a target, the guide's
   claims about the advisories match the driven behavior in the probe record, and the
   dot-stripped fallback paths the guide and pointers name match `pathToStorage`.
10. **The law holds across the diff.** No `any`, no assertion, no suppression directive, no nested
    function declaration, no misplaced declaration kind, no compound entity member, no count in
    the prose the diff adds, and every new public export is barrel-reachable and documented.
11. **`host.json` moved minimally.** Exactly the vendored policy digest and the membership digest
    differ from the baseline, and both follow from the `tests/policy.test.ts` re-scope alone.
12. **The package is coherent as a whole.** The split, the pointer, the advisory, the policy
    re-scope, and the guide read as one design; would you ship this to the fleet?

## Instructions

- Attempt refutation, not confirmation. `CONFIRMED` requires naming the attack you tried that
  failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED` — say what would settle it.
- Assume this chain has one more defect. The freshest, least-examined surface is the writers' own
  rulings: the advisory's subtraction, the policy relationship assertion, the witness swaps, the
  probe-fix sentence.
- Do not hedge toward an imagined consensus; you run blind.
- Your lane edits nothing and spawns nothing. Read-only describes the subject, never your rigor.
- Findings outside the claims enter the verdict only substantiated to the `BROKEN` standard.

## Output

Return exactly the `orkestrel-falsify` verdict shape: numbered per-claim verdicts
(`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED`) with evidence, findings outside the
claims if substantiated, and the single terminal line. No process diary.
