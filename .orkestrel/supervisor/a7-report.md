# A7 report (Opus implementer, returned complete; landed at adc8d11 with integration)

Touched: app/browser/helpers.ts (describeValue, describeOutcome; MAX_VALUE_LENGTH moved to
constants.ts by the Orchestrator in integration per centralize-by-kind), FeedItem.vue
(outcome guards absent row, delegates to describeOutcome, drops deriveUnitRowStatus import),
FeedItem.test.ts (3 new renders + 2 restated), helpers.test.ts (describeValue 6 shapes +
boundary; describeOutcome 4 outcomes + bound), portfolio.ts/portfolio.test.ts (settled state
between prompted and terminal). 6 files, +289/-12 before integration.

Bound: MAX_VALUE_LENGTH = 160 UTF-16 code units on the value's rendered text alone; cut ends
with one ellipsis; the carrying sentence is never cut ('Completed: ' + 160 + 1 = 172 max).
Shapes from source: SettledUnit.result is Result<JSONValue, TaskFailure> (src/core/types.ts:85);
validators forbid undefined; null is the only absence. Production settles a record
(AgentExecution.ts:38 agentResultToJSON -> {content, usage, partial}); fixtures settle a bare
string ('ok'). String stated as itself (no JSON escaping); number/boolean/array/record
serialized; null/''/whitespace record nothing and get the words. 0 and false are stated.

Voice: 'Completed' -> 'Completed: <value>'; Failed/Quarantined byte-identical.

Proofs: red 5 failed | 18 passed -> green 23/23 (FeedItem.test.ts, written before source);
grep "result is not available" app/ empty; app:browser 467/467; guides 373/374 red on the
three new exports, closed by the guide patch in integration -> 374/374; check green; scoped
oxfmt/oxlint clean (oxlint silence probed with a deliberate error, exit 1). Portfolio:
settled filmed, 4 frames; wide-light/narrow-dark show the bounded card with the full
pretty-printed record in the pane above — the division the bound exists for.

Recorded out of scope, against the settlement-card capability: Failed: ${message} and
Quarantined: ${reason} carry provider-controlled strings unbounded through the same door.

Deviations: none. The freshness premise held; no second refresh path considered.
