# Unit A2 (successor) — the relay: `RelayProvider`, `RelayStream`, `createRelay` in `@orkestrel/agent` core

This brief supersedes `tmp/units/a2-brief.md` after its first run stopped on a stale example in the
Orchestrator's own acceptance criterion. Apply every section of that file exactly as written,
except the corrections here. Read that file, its report `tmp/units/a2-report.md`, and this one.

## What changed and why

The first run stopped correctly: acceptance criterion 4 in the original brief still wrote
`createRelayProvider({ url: 'http://relay.test/', frame, fetch: … })`, naming the relay option by
its pre-fix name. Unit A1-fix (F6b, `tmp/units/a1-fix-report-3.md`) renamed that option to
`parser`, and the landed contract at `src/core/types.ts` declares
`RelayProviderOptions.parser: () => ProviderParserInterface`. The design record
(`../scaffold/.orkestrel/campaign/design-reconciliation.md` § "Audit round A1-R1", ruling on F3)
and `../scaffold/.orkestrel/campaign/plan.md` § "The ruled contract" both say `parser`. The
landed contract is right; the example was stale.

**Correction.** Wherever the original brief names a `frame` *option* on `RelayProviderOptions`
or in a `createRelayProvider` call, read `parser`. In particular, acceptance criterion 4 reads:

> 4. The in-process hop: `createRelayProvider({ url: 'http://relay.test/', parser: createParser, fetch: (input, init) => handler(new Request(input, init)) })`,
> where `createParser` is the fixture's NDJSON-shaped parser factory (a line-per-record parser
> declared in `tests/setup.ts` — agent declares no `@orkestrel/ndjson`, so the fixture supplies the
> framing; real NDJSON composition is ollama's proof), in front of
> `createRelay({ provider: createScriptedProvider(...), authorize: () => true })`, yields the
> scripted deltas in order and returns a result deep-equal to the scripted provider's own result,
> `thinking`, `tools`, and `usage` included; `generate` deep-equals the drained `stream`.

The `frame()` *method* on `AgentProviderInterface` is unchanged: `RelayProvider.frame()` returns
`this.#parser()`. Nothing else in the original brief changes. Do not stop on this again; every
other semantic and criterion stands as written.

## Output (replaces the original path)

Write the report to `tmp/units/a2-report-2.md` and return the same text as your final message;
leave `tmp/units/a2-report.md` untouched.
