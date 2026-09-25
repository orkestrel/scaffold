# TOKEN-PROOFS audit round 6 — verdict

The Orchestrator's ruling on the check of TOKEN-PROOFS round 7 (`tkp-audit-6-claims.md`). One lane ran, `analyst` on
GPT-6 Astra (`tkp-audit-6-objective-verdict.md`, thread `01a0d745-da7b-7280-a49c-dbe614d14c59`), because the round
checks the Orchestrator's own text and Astra wrote none of it.

**Verdict: FAIL 2; claim 5 settled; outside the claims: none.**

| Claim | Astra | Ruling |
| --- | --- | --- |
| 1 The Items | CONFIRMED | CONFIRMED |
| 2 Every stop is relative | BROKEN | BROKEN |
| 3 The primary alias on a root that carries a mode | CONFIRMED | CONFIRMED |
| 4 The title | CONFIRMED | CONFIRMED |
| 5 Gates | UNRESOLVED (no oxfmt exit) | CONFIRMED |

- **Claim 2.** This round's claim asked for the breadth sweep that `tkp-audit-5-verdict.md` named, and the sweep found
  the last three sentences of the same class. The § Customization mechanism and list hold for every placement the lane
  attacked. Three sentences outside them do not:
  - The describe block's comment says a `--bs-form-*` alias follows its token "from a mode scope and not from a plain
    ancestor"; the root, with or without a mode, is also where the alias resolves.
  - The scope case's comment says "a mode-scope override reaches the mode aliases and not the root-only ones"; a mode
    scope on the root reaches the root-only aliases too, as that case's own last assertion shows.
  - § Color modes says a name no mode changes "keeps one value in every scope", declared again "with the value the
    `:root` selector gives them". A mode scope repeats a declaration, not a value: `--bs-heading-color` re-resolves
    against the `--vn-text-heading` its own element holds, so an override between the root and a nested scope reaches
    the scope's heading color. "an island below the root inherits them from there" is false in the same case.
- **Claim 5.** The Orchestrator ran `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md
  tests/src/styles/tokens.test.ts` in the worktree on 2026-09-25 at about 06:45 UTC: exit 0.

## Carrier

TOKEN-PROOFS round 8 (`token-proofs-brief-8.md`, `builder` on Sonnet). Its check repeats claim 2's sweep over the whole
guide and the tokens test.
