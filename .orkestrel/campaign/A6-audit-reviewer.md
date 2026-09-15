<!-- A6-S — reviewer (Opus 5, native), subjective lane on U6b, blind. Retained from the completion notification, 2026-09-15 (427 s, 60 tool uses). Abridged. -->

1. Every second-argument use examined; none treats a `ToolContext` as a caller — CONFIRMED (every handler declares no second parameter; the report's examination list omitted `tests/service/compaction.test.ts:165, 251`, which declare none, so the conclusion stands).
2. `extractTools` sets no `caller`; the wire projection — BROKEN on the documentation half. The official client's tool shape (`node_modules/ollama/dist/shared/ollama.*.d.ts:73-94`) admits only `name`, `description`, `type`, `parameters`, so dropping `title` and `annotations` at `OllamaProvider.ts:79-90` is correct and folding `title` into `description` would be product policy; but nothing says so. Fix: extend invariant 3 at `guides/ollama.md:114` with one sentence naming `title` and `annotations` as deliberately not sent because the `/api/chat` tool function object carries no field for either (the shape of invariant 11 at `:122` about `format`).
3. No migrated fixture should have become a cancellation proof — CONFIRMED (fixtures declare `(args)`; `tests/setup*.test.ts` proves its sibling module; dispatch cancellation is tool's and agent's claim; no ollama product claim depends on it). A signal-observing live fixture is new capability recorded against tool and agent.
4. Nothing else moved; mirrors byte-identical — BROKEN on the mirrors: `guides/tool.md` stale against tool's tip (same drift as A3 claim 7); `guides/agent.md` same line count but the `### Placement proofs` section moved and the ollama copy still ships "(campaign unit U5)" labels the upstream removed. Fix: re-copy both immediately before release; no ollama gate can see mirror drift (`GUIDE_SPEC` is `guides/ollama.md` alone).
5. `guides/ollama.md` still true — CONFIRMED.
6. Ship — BROKEN until the mirrors, the invariant sentence, and F1 close.

F1 — the installed tool tarball in ollama is the U1b build (raw-argument forward; no `Arguments did not parse`) while the mirrored guide describes the U1c/U1d build (parsed forward, constraint bounds). Bound: ollama configures no `contract`, so no path reaches the differing branch. Fix: re-pack from the release tip, re-install, re-run scoped gates, re-copy the mirror from that tip, in that order. Referral: the Orchestrator rules which tool artifact is the release (settled: the U0d tarball from the accepted tree).

Attacked and held: the projection's silence is the right code behaviour; the shared `CONTEXT` constant is the right shape; `extractTools` reads only `function.name`, `function.arguments`, `id`; no untracked file beside the edits.

VERDICT: FAIL 2, 4, 6; outside the claims: F1
