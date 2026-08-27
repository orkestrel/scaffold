# Unit F1 — fix round for A1's findings

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer (recorded substitution: the
Codex bench is dark). The fix round's auditor is Cursor Grok, an engine that wrote none of this.

## Objective

Land every A1 finding's fix: state the true canon invariant everywhere the false universal ships,
close the writing-law hits, correct the inverted comment and the false example, name the members
in place of counts, add the pointer body's fourth resolution, harden the vendored skill-family
instrument, fix the README and guide vocabulary, and name the red gate the wave's sweep guards.

## Context

**Law.** `AGENTS.md`; `.claude/rules/writing.md`, `documentation.md`, `typescript.md`,
`tests.md`, `names.md`, `quality.md`. Skill: `orkestrel-falsify` governs the round this unit
closes; read its § Reconcile obligations for what a fix may not widen. Guide:
`guides/scaffold.md`.

**Evidence.** The round's verdict is `.orkestrel/scaffold/a1-audit-verdict.md` — read it whole;
each item below names its finding there. The lane reports are `a1-subjective-report.md` and
`a1-objective-grok-report.md` beside it. Every location below was reproduced by the Orchestrator
at `ceaf726`.

**The true invariant, fixed by the round's ruling.** No host-origin artifact claims a
`CANON_PATHS` member. The docs compiler plans the `AGENTS.md` and `CLAUDE.md` pointers at two
canon destinations as scaffold-owned template content — the one deliberate overlap, which the
advisory subtracts. `HOST_PATHS` and `CANON_PATHS` are disjoint. Every prose fix states this;
none of them invents a second mechanism.

**Host.** POSIX shell at `/home/user/scaffold`, clean committed tree at `ceaf726`, `dist/` built.

**Standing conditions.** `tmp/` and `.orkestrel/` are records; read, never edit. Editing
`tests/policy.test.ts` (item H) moves its digest in `host.json`; do not edit `host.json` — the
Orchestrator regenerates it through `npm run build` after integration, and `test:config` red on
that file before regeneration is expected, not yours.

## The fix items

**A — the false universal.**
1. `src/core/constants.ts`, `CANON_PATHS` remarks: replace "No plan claims one, no target
   receives one, and the `AGENTS.md` and `CLAUDE.md` pointers scaffold plans are what name those
   two locations." and "The two sets are disjoint. A path in both would be planned into a target
   and withheld from it at once." with the true invariant, naming `HOST_PATHS` and `CANON_PATHS`
   in the disjointness sentence instead of the count.
2. `guides/scaffold.md`, the paragraph opening "No group carries the instruction canon." (near
   the groups table): restate on the origin axis, keeping the pointer sentence that follows.
3. `guides/scaffold.md`, the staged-for-reading paragraph ("A release stages every one of them
   and no plan claims one, so no target receives a copy."): scope the universal to what is true —
   the members that paragraph lists are never planned; the pointer pair at the document
   destinations is planned as template content.
4. `guides/scaffold.md`, the canon-question paragraph sentence "No verb writes or deletes a canon
   path, so refusing `repair` over this question would block every write on a gap no write can
   close.": the true statement is that no verb writes or deletes a path this question names — the
   subtraction is what guarantees it.
5. `guides/scaffold.md`, the sentence "`isCanonPath` is the one reading of canon membership …
   never disagree about what a path is": state honestly that staging and the overlay share the
   predicate while the compiler deliberately plans the pointer pair at two canon destinations,
   which the advisory subtracts.
6. `tests/setupServer.ts`, `STAGED_PATHS` remarks: align the "A plan claims no canon path"
   sentence with the invariant, and name the members instead of "two lists" if that phrase is
   present.

**B — writing-law hits.**
7. `src/core/compilers.ts`, `blueprintToDocumentArtifacts` `@returns`: "The birth-owned package
   front page and the two content-owned root instruction pointers." → name the members, drop the
   count: the front page and the `AGENTS.md` and `CLAUDE.md` pointers.
8. `src/bin/CLI.ts`: the advisory message's "the installed package now supplies" → "the installed
   package supplies"; the comment's "and now stages them" → "and stages them".

**C — the inverted comment.**
9. `src/core/helpers.ts`, the `inferGroup` comment "// The licence and the root instruction
   documents are the workspace's own prose.": the row now holds the workspace's front page and
   licence beside the scaffold-owned root pointers — state what the row holds; the group carries
   placement, not authorship.

**D — one term for the vendored set.**
10. `README.md`, the split paragraph: drop the "tool surface" coinage. State the split as: every
    target carries its own copy of the vendored set — its toolchain, its policy proofs, its
    harness wiring — while the instruction canon is read from scaffold; keep the existing
    canon list and fallback sentence.
11. `guides/scaffold.md`, the intro's "tool surface" occurrences: same one-term fix — the
    vendored set.

**E — the wave's red gate.**
12. `.agents/skills/orkestrel-publish/references/wave.md`, step 3's consequence sentence: a
    target that takes the pointer `AGENTS.md` and keeps `.claude/rules` fails the vendored
    rule-map policy at the gates — every rule file it holds is unnamed by a pointer that carries
    no rule map — so the sweep cannot be deferred past the gates step. Name that, replacing the
    softer consequence.

**F — the pointer body's fourth resolution.**
13. `src/core/templates.ts`, the `AGENTS.md` pointer body: the read list names the skills tree
    and the resolution bullets cover the contract, the orchestration contract, and the rules
    directory; add `../scaffold/.agents/skills/` to the sibling bullet and
    `node_modules/@orkestrel/scaffold/dist/host/agents/skills/` to the installed bullet. Keep
    every existing hard constraint: no `@` outside a code span, no template token.

**G — the false example.**
14. `src/server/helpers.ts`, the `filesToHost` `@example`: a live `AGENTS.md` fill no longer
    yields a host carrying live bytes for it. Witness a host-owned path (`scripts/codex.sh`) with
    live bytes, and let the comment beside it say a canon destination keeps the floor's bytes.

**H — the vendored instrument.**
15. `tests/policy.test.ts`, the skill-family case: the case's own read joins `process.cwd()` with
    `SKILL_FAMILY_ROOT`, the same constant `readSkillFamily` reads, so a drifted constant moves
    both sides together and the case cannot fail for it. Inline the literal `'.agents/skills'`
    in the case's own `join`, and say in its comment that the literal is what makes the read a
    second mechanism: a drifted constant desyncs the sides and reddens where the tree exists,
    while absence still passes. Update the mirrored test pinning this file's behavior only if one
    exists and reddens.

## Unknowns

None. A location that does not match its quoted text is a deviation — stop and report the exact
line.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/compilers.ts`,
`src/core/templates.ts`, `src/bin/CLI.ts`, `src/server/helpers.ts`, `tests/setupServer.ts`,
`tests/policy.test.ts`, `README.md`, `guides/scaffold.md`,
`.agents/skills/orkestrel-publish/references/wave.md`, and the mirrored tests these edits redden:
`tests/src/core/templates.test.ts`, `tests/src/core/compilers.test.ts`,
`tests/src/bin/CLI.test.ts`, `tests/src/server/helpers.test.ts`.

**Shared (report-only).** None.

**Off-limits.** `host.json` (the Orchestrator regenerates it), `AGENTS.md`, `CLAUDE.md`,
`.agents/**` beyond the wave reference, `.claude/**`, `ROADMAP.md`, `package.json`,
`vite.config.ts`, `tsconfig.json`, `.orkestrel/**`, `tmp/**`, secrets.

**What asserts the state this change ends.** The pointer-body tests pin body content — item F
adds paths, so extend the path assertions rather than weakening them. Item H's edit moves
`tests/policy.test.ts` bytes — `test:config` reddens until the Orchestrator regenerates, per the
standing conditions. Derive the rest by running the scoped projects.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run check`,
`test:src:core`, `test:src:server`, `test:src:bin`, `test:policy`, `test:guides`, and single-file
vitest runs. No `build`, no tree-wide mutating gate, no commit, push, or dependency change, no
`git checkout`, `restore`, `stash`, `reset`, or `clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: each item A through H with the exact old and new sentence (or a pointer to the hunk for
the longer ones); scoped validation evidence per command with exit status, `test:config` excepted
per the standing conditions; deviation state. Write the same content to `tmp/units/f1-report.md`.
No process diary.

## Deviation contract

Stop and report when a quoted location does not match, when a fix would require editing an
off-limits file, or when item H reddens anything beyond `test:config`. Wording inside the fixed
sentences is yours within the stated invariant and the writing law; where a paragraph needs a
connective rewritten to stay coherent, rewrite it and record it.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run test:src:core`, `test:src:server`, `test:src:bin`, `test:policy`, `test:guides` exit
   0.
3. `git status --porcelain` shows changes only in owned files.
4. No owned file carries the strings "now supplies", "now stages", "tool surface", "the two
   content-owned", or the sentence "No plan claims one, no target receives one".

**Observations, not criteria.** `test:config` (red until regeneration), the full `npm test`, and
`npm run build`.

## Review evidence

The subject is a code change closing an audit round: supply the actual diff and status output in
the report; the auditor receives them with the A1 verdict.
