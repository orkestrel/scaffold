# Unit O7 — the last precision items on the ollama guide (audit round O6-R1)

The Orchestrator fills § Measurements at dispatch, after V2 finishes reading the checkout.

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified unit. Perform the assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\ollama` for the life of this unit.

## Objective

Close claims 8 and 10 and findings F1 and F2 of `o6-audit-objective.md` exactly as specified,
keeping every titled source example byte-equal to its guide fence and the guide gate green.

## Context

- Record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\o6-audit-objective.md`
  (claims 8 and 10, findings F1 and F2; each names its site at `f994872`).
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md` (a titled `@example`
  equals the guide fence under its heading; mark omitted code with a comment in the sample's
  language), `writing.md`, `tests.md` § Cross-cutting proofs.
- Host: Windows 11, Git Bash. HEAD is `f994872`, tree clean apart from `node_modules` (the agent
  tarball from `d84b1a2`). Never `npm install`, `git add`, `commit`, `stash`, `checkout`,
  `restore`, `reset`, `clean`, or `git mv`.
- Measurements: the ollama HEAD is `f994872` (2026-09-15), tree clean apart from `node_modules`.
  Host gates at `9231b3d` (`../scaffold/.orkestrel/campaign/o6-gates.log.txt`, the mirror
  refresh after it changes no test): `format:check`, `lint:check`, `check`, `build` exit 0;
  `test:src:core` 4 files / 99 tests; `test:setup` 3 files / 96 tests; `test:conformance` 17;
  `test:guides` 33; `test:policy` 90 passed, 1 skipped.

## Items

1. **The undeclared `charge` (claim 8).** In the titled generation fence (`guides/ollama.md`
   near line 145, mirrored on `createOllama`'s `@example` in `src/core/factories.ts` near line
   51), declare the billing integration the fence calls — a `declare function charge(usage:
   TokenUsage): void` line with `TokenUsage` imported from `@orkestrel/budget`, or an omission
   comment in the sample's language — identically in the guide fence and the source example.
   `@src/core` in prose sentences describing the repository alias stays; no fence imports it.

2. **The origin arrangement (claim 10).** In § Relaying through your own server, one sentence
   after the browser half: a page calling the relay from another origin needs CORS permission
   headers the relay route does not send, so serve the page from the relay server's own origin
   (as the recorded Chrome 148 run did) or put an origin-checking, CORS-answering middleware in
   front of the route (see the server guide), naming the `OPTIONS` preflight the browser sends
   with `authorization` and `content-type` as the requested headers.

3. **The cancel recovery (F1).** In the driven-stream fence (§ Surface) and any twin of it, the
   `catch` arm no longer appends `error.partial.content` to the accumulated deltas (the partial
   is cumulative); it records the partial as the recovered content on its own — for example
   `const recovered = error.partial.content // everything that streamed before the cancel` — with
   the surrounding comment saying so. Add the cancellation case to the transcription in
   `tests/guides.test.ts`: a canned transport that stays open after one delta, a cancel after
   that delta, and an assertion that the recovered content equals that one delta and is not
   duplicated.

4. **The introduction (F2).** The introduction sentence saying this surface imports "the error"
   from `@orkestrel/agent` now says the errors reach a caller through the base and the surface
   imports the base and the contract types, matching clause 2.

## Scope

**Owned.** `guides/ollama.md`, `src/core/factories.ts` (the titled `@example` only),
`tests/guides.test.ts`, `README.md` (only if its streaming sample carries the same cancel arm),
and `tests/setup.ts` or `tests/setupServer.ts` for additions only if the cancel transcription needs
a fixture the files lack (report it).

**Off-limits.** Everything else, including every other `src/**` and `tests/**` file,
`guides/agent.md` (the mirror), `guides/README.md`, `package.json`, `package-lock.json`.

**Tools and limits.** `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run test:guides`, `npm run test:src:core`, `npm run test:setup` (read-only); never `lint`,
`format`, `build`, `test`, `test:service`, or a mutating command; never install, commit, or read a
credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\o7-report.md` and return
the same text: per item the exact change; the cancel transcription's assertion; the gate commands
with counts; `Deviation`; `Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report when the cancel transcription cannot observe the partial with the fixtures at
hand, when a Summary cell cannot equal its paragraph, or when a file outside Owned must change.
Decide, record, and carry on from wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:guides` exits 0 with the cancel case added; `test:src:core` and `test:setup` at
   their prior counts.
3. `grep -n "charge" guides/ollama.md src/core/factories.ts` shows the declaration or the omission
   comment beside every call; the origin sentence names the preflight; the introduction no longer
   says the surface imports the error.
