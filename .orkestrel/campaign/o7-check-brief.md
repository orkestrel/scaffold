# Unit O7-check — mechanical conformance of unit O7

## Role and engine

`checker`, native Claude (Sonnet), read-only, clean context. Perform the assignment directly and
spawn nothing. Return the verdict as your final message.

## Objective

Rule on each claim from the diff and the files at the ollama commit named under § Context, per
the `orkestrel-falsify` value set (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, with `file:line`
evidence), then findings outside the claims, then one terminal `VERDICT:` line.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/ollama`, read only, at commit `e689e5b`, tree clean apart
  from `node_modules`.
- Brief and report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o7-brief.md` and
  `o7-report.md`; the findings it closes: `o6-audit-objective.md` claims 8 and 10, F1 and F2.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o7-diff.txt`
  (`git diff f994872 `e689e5b``); gates `o7-gates.log.txt`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/documentation.md`,
  `writing.md`, `tests.md` under that root.

## Claims

1. The titled generation fence declares or marks `charge` identically in `guides/ollama.md` and
   `createOllama`'s `@example` in `src/core/factories.ts`, and the pair is byte-equal.
2. § Relaying through your own server carries a sentence stating the origin arrangement: serve the
   page from the relay server's origin or put CORS-answering middleware in front, naming the
   `OPTIONS` preflight with `authorization` and `content-type`.
3. The driven-stream fence's `catch` arm records `error.partial.content` on its own rather than
   appending it to the accumulated deltas; the transcription in `tests/guides.test.ts` carries a
   cancellation case asserting the recovered content equals the one delta and is not duplicated;
   the README's streaming sample, if it carries the same arm, changed the same way.
4. The introduction no longer says the surface imports the error from `@orkestrel/agent`, and
   agrees with clause 2.
5. The diff touches only the files the brief owns; no banned construct; no count of a growable
   set in the touched prose; no possessivized token.
6. The gate log shows `format:check`, `lint:check`, `check`, `test:src:core` (99), `test:setup`
   (96), `test:conformance` (17), `test:guides` (34), `test:policy`, and `build` exit 0.

## Output

Per-claim verdicts with evidence, findings outside the claims, and one line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
