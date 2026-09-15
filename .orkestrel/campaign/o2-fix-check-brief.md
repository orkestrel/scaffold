# Unit O2-fix-check — mechanical conformance of unit O2-fix

## Role and engine

`checker`, native Claude (Sonnet), read-only, clean context. Perform the assignment directly and
spawn nothing. Return the verdict as your final message.

## Objective

Rule on each claim from the diff and the files at the ollama commit named under § Context, per
the `orkestrel-falsify` value set (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, with `file:line`
evidence), then findings outside the claims, then one terminal `VERDICT:` line.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/ollama`, read only, at commit O2FIX_SHA, tree clean.
- Unit brief and report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o2-fix-brief.md`
  and `o2-fix-report.md`; the findings it closes: `o2-audit-subjective.md` F3, F4, F5.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o2-fix-diff.txt`
  (`git diff 24662ef O2FIX_SHA`); gates `o2-fix-gates.log.txt`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/tests.md`,
  `names.md`, `typescript.md`, `writing.md` under that root.

## Claims

1. Exactly one pre-aborted case remains in `tests/src/core/OllamaProvider.test.ts`; it asserts
   that the headers-hook recorder is empty across the pre-aborted call and keeps the transport
   assertions (`signals.length === 1`, `signals[0].aborted === false`); the folded duplicate is
   gone and the sibling comment no longer says "two guards".
2. The deadline control carries a comment stating that the base passes one combined signal to
   the header hook and to the transport.
3. `RecordedRequest.text` in `tests/setupServer.ts` is required, its doc sentence names no
   omitting producer, and the helper in `tests/setup.test.ts` returns a `RecordedRequest` with a
   `text`.
4. The diff touches only `tests/src/core/OllamaProvider.test.ts`, `tests/setupServer.ts`, and
   `tests/setup.test.ts`; no banned construct; test names describe what each proves.
5. The gate log shows `test:src:core` at 99 tests and `test:setup` at 96, `format:check`,
   `lint:check`, `check`, `conformance`, and `build` exit 0.

## Output

Per-claim verdicts with evidence, findings outside the claims, and one line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
