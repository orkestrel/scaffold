# FIX-M and FIX-N audit — the last code and prose before the fleet sweep

Both lanes receive this identical text and are blind to each other.

## Subject

`@orkestrel/scaffold` 0.0.50 at `bdaa995` on `claude/new-session-hxonen`. The subject is the range
`0a0815a~1..HEAD`: FIX-M (the CommonJS selector and two executed guide assertions) and FIX-N (the
browser branch's reason of record, three writing-rule hits, one falsified clause, and two process
rules), plus three edits the Orchestrator made inside them.

Chain: design rounds, W1–W7, propagation, audit round 1 (FAIL), FIX-A–E, round 2 (FAIL), FIX-G/H/I,
round 3 (two lanes FAIL, nine refuters), FIX-J, FIX-J audit (two lanes FAIL), FIX-L, FIX-K, FIX-K
audit (FAIL), FIX-M, FIX-N.

## What this round decides

**Whether the fleet sweep runs and 0.0.50 publishes.** After this round the eleven targets receive
these bytes and the version goes to the registry. Every earlier fix round in this campaign shipped
the next defect; assume this one did too.

## Who wrote which half

- **Sol wrote FIX-M.** Objective lane: that is your own engine's work — attack it hardest.
- **Opus wrote FIX-N.** Subjective lane: that is your own engine's work — attack it hardest.
- **The Orchestrator wrote three edits**, all inside otherwise-unit work, all with no firing control:
  the emitted `declaration` literal reformatted to oxfmt's output (earlier, still in range), the
  guide's Vite condition sentence, and FIX-N's two flagged residues — a count removed and a packing
  claim restated. Claims C6 and C7 cover them. Nothing is exempt because the Orchestrator wrote it.

## Already established — do not re-run

Verified by the Orchestrator directly:

- At `bdaa995`: `format:check`, `lint:check`, `check`, `test:guides` all exit 0; inventory staged 108
  files.
- Host readings after FIX-M: `src:core` scoped to `templates.test.ts` 22 passed; `src:core` 354
  passed; `src:core` scoped to `compilers.test.ts` 91 passed; `src:bin` 197 passed; `test:policy` 93
  passed; `test:config` 44 passed; `test:guides` 16 passed.
- **The end-to-end reading FIX-M exists for.** Before M1, `indexeddb`'s regenerated proof reported
  `1 failed | 5 passed | 2 skipped`, failing on a CommonJS consumer importing an ESM-only package.
  After M1, regenerated from the rebuilt candidate and installed into the real target:
  `6 passed | 2 skipped`, exit 0.
- **No fleet manifest uses a bare-string exports entry**, so FIX-M's flagged false negative reaches
  nothing today. It is on the roadmap. Do not re-report it as new.
- Node's condition set, Vite 8.2.2's `defaultClientConditions`, and that Node loads an extensionless
  file under both module systems — all measured, all recorded. **Do not revive the extensionless
  claim; it was refuted and withdrawn.**
- `tests/src/core/compilers.test.ts` bans the literals `playwright` and `configs/browsers.js` from
  the emitted proof's whole content. That is why one copy names imports by role. Known constraint.
- **The distribution proof is presence-owned**, so `overwrite` never replaces one a target already
  has. The fleet sweep must delete it first. Known, recorded, and not a finding.

## Review evidence

- Diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/mn/diff.txt`
- Diffstat: `.../audit/mn/diffstat.txt` · Status: `.../audit/mn/status.txt` (empty; tree clean)
- Unit reports: `.orkestrel/campaign/fix-m-report.md`, `.orkestrel/campaign/fix-n-report.md`
- The repository at `/home/user/scaffold`.

## Claims

**C1 — FIX-M's selector is right and complete.** It requires the resolved path to traverse an
explicit `require` condition. Attack: name a subpath it now wrongly excludes, or one it still wrongly
includes. Does the dual-subpath repair genuinely survive? Does it interact correctly with the browser
face, which retires the Node drives by a different predicate?

**C2 — FIX-M's two guide assertions actually break when the behaviour breaks.** Attack the
instruments, not their output. Would each red if the sentence it gates went false in a way the unit
did not anticipate? Is either a substring check wearing an execution costume?

**C3 — FIX-N's true cause is true.** The branch follows a published `src` browser face. Attack: find
a blueprint where the branch appears without one, or is absent with one. Check the selector in
`src/core/compilers.ts` yourself rather than trusting any report.

**C4 — the three copies of that reason now say one thing.** Compare `src/core/compilers.ts`, the
emitted `guard` template in `src/core/templates.ts`, and `guides/scaffold.md`. Do they agree, and is
each true of the code? One copy is constrained by the literal ban — does it still say the same thing?

**C5 — the two landed process rules are directives, not narrative.** `AGENTS.md` § Instruction files:
name the observable trigger and the required action; do not record how a finding was found, which
round found it, or what was tried first. Attack: does either read as a story? Does either duplicate a
rule that already has a home elsewhere in that file?

**C6 — the Orchestrator's Vite sentence and formatter edit hold.** Both shipped with no firing
control. Is the Vite sentence checkable end to end by a reader with the installed package? Is the
reformatted literal genuinely the formatter's fixed point?

**C7 — the Orchestrator's two FIX-N residue edits hold.** "takes its release contract from the
outside" replaced a count — does the sentence still say what it needs to, or did removing the tally
lose the meaning? "the selector reads the `src` axis, and a generated manifest packs `dist/src`, so
an application face is neither selected nor packed" replaced a claim a hand-edited `files` list would
falsify — is the replacement itself true, and does it survive the same attack?

**C8 — no refusal was widened, and no coverage was lost.** Every change here makes the proof stricter
or the prose narrower. Attack: which legitimate package shape now reddens that did not, or which now
passes unmeasured that used to be measured? FIX-M's selector narrowed a probe — name what fell out of
it besides the ESM-only faces it was meant to exclude.

**C9 — the writing contract holds across the diff.** Sweep the substitution table
case-insensitively and across inflections over every file in the diff. Rule each hit by the sense the
row bans. Name the pattern and the paths — including a clean result. The counts ban is live and has
been violated twice in this campaign.

**C10 — coherent, and would you ship it to eleven repositories?** Read the whole range as one change.

## Unknowns, named as unknowns

- Whether FIX-M's selector interacts correctly with a subpath that is both browser-faced and
  require-declaring is not known. C1 settles it.
- Whether either landed rule duplicates existing guidance in `.agents/orchestration.md` is not known.
  C5 settles it.

## Where a probe may live

**Objective lane (Sol, inside `codex exec`):** probes only under `tmp/audit-mn-sol/`. Never inside
`tests/`. Delete before returning. No tree-wide gate. Scope every run to a named vitest project or an
explicit path. Your sandbox denies a grandchild process, a nested install, and a loopback listener —
**four times in this campaign that denial hid something and the host reading found it.** Report such
a reading as an observation with the exact command; never substitute the reachable half.

**Subjective lane (Opus): Read, Grep, Glob only — no Bash, no Write.** Do not plan a probe or a
command. Where a claim needs a run, return `UNRESOLVED` and name the exact command; the Orchestrator
runs it and rules. C3, C4, C5, C7, C9 and C10 are yours first.

## The threshold

A finding is worth more than a clean pass. This is the last round before eleven repositories receive
these bytes and the version is spent. Return "no findings" only if you attacked and failed to break,
and show what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
