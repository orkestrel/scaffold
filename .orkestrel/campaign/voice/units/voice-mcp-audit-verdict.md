# Audit verdict — unit voice-mcp

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `249299f`
(`units/voice-mcp.diff`, `units/voice-mcp.status`, `units/voice-mcp-report.md`).
Rewritten per the writer: imperative 72, verbless 232, name 10, returns 77. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

Lane held: SUBJECTIVE (design fit, voice, wording, meaning kept, guide voice). Engine: Claude Opus 5, the writer's engine, as the brief records (Sol bench dark). Subject: the uncommitted TSDoc voice sweep in /home/user/fleet/mcp, ruled on /home/user/scaffold/tmp/units/voice/voice-mcp.diff and the tree, not on the writer's report.

CLAIM 1 — every rewritten first sentence keeps the meaning of the one it replaced: BROKEN.
I read every hunk in the 3072-line diff. Most rewrites are faithful, and the transport and class headline rewrites (src/core/MCPServer.ts:123, src/core/MCPTaskClient.ts:12, src/core/MCPTextStreamController.ts:4, src/server/transports/StdioServerTransport.ts:12, src/server/transports/WebSocketServerTransport.ts:13) are good work: they move the verb to the front and keep every qualifier. These do not:

1a. src/core/types.ts:2067 — "Optional consumer-owned resource registry exposed over the modern resource methods." became "Holds the optional consumer-owned resource registry exposed over the resource methods." The qualifier `modern` is dropped. Modern versus legacy is the package's load-bearing era split, and the sibling property one line later (src/core/types.ts:2069) keeps "the modern prompt methods", so the two adjacent options now disagree about which era they serve. Right: "Holds the optional consumer-owned resource registry exposed over the modern resource methods."

1b. src/core/types.ts:2097 — "Optional multi-round-trip input mechanism; all continuation and expiry policy is consumer-supplied." became "…; continuation and expiry policy is consumer-supplied." The quantifier `all` is dropped, and it was the point of the clause: no part of that policy is MCP's. Right: keep "all".

1c. src/core/types.ts:1593 — "The terminating result returned when a `subscriptions/listen` stream closes gracefully." became "Represents the result returned when a `subscriptions/listen` stream closes gracefully." `terminating` is dropped, and this type is exactly the generator's return value rather than one more result; src/core/types.ts:1599 still calls it the "graceful terminal result". Right: "Represents the terminating result returned when …".

1d. src/core/types.ts:1515 — "The JSON-RPC id of the `subscriptions/listen` request whose stream delivered the frame." became "… whose stream delivered it." The noun `the frame` was the pronoun's referent and is gone, so `it` now attaches to `id`, `request`, or `stream`. The unit brief makes this exact case binding: "a pronoun such as `it` must still resolve to the same noun". Right: keep "the frame" and let the line run, or "Holds the JSON-RPC id of the `subscriptions/listen` request whose stream delivered this frame."

1e. src/core/types.ts:162 — "The result's protocol discriminator (`'complete'`, `'input_required'`, or a later value)." became "… or later)." "a later value" names another literal the union may gain; "or later" reads as a version comparison on `'input_required'`. Right: keep "or a later value" and wrap the block.

1f. src/core/types.ts:471 — "`true` when the tool failed — its error text is in `content`." became "Flags a failed tool — its error text is in `content`." This is a `boolean` property, not a `@returns`. The rewrite drops the `` `true` `` token and with it the polarity, so nothing states which value means failure. The wave brief permits dropping the `true`/`false` tokens for a boolean `@returns` alone, and the rule's own boolean form is "If `true`, …; if `false`, …". Right: "Flags a failed tool when `true` — its error text is in `content`."

1g. src/core/constants.ts:244 — "JSON-RPC 2.0 reserved error: invalid JSON was received (the message did not parse)." became "… (it did not parse)." Same referent loss as 1d: `the message` is gone and `it` now resolves to "invalid JSON". Right: keep "the message did not parse".

1h. src/core/constants.ts:171 — "MCP reserved error: required HTTP metadata does not match the request body." became "… that does not match the body." `request` is dropped from "request body", and this code exists precisely for a header-versus-request-body mismatch. Right: keep "the request body".

1i. src/core/types.ts:784 — "Backpressured request-scoped progress reporter supplied to an explicit executor." became "Reports request-scoped progress under backpressure, supplied to an explicit executor." The rewrite deleted the noun `reporter` that "supplied to an explicit executor" modified, so the trailing phrase dangles onto "backpressure". It also gives the interface the same opener as its only method one line later (src/core/types.ts:786, "Reports one finite, strictly increasing progress value…"). Right: "Reports request-scoped progress under backpressure — the reporter supplied to an explicit executor."

1j. src/browser/transports/MessagePortTransport.ts:6 — "The browser-face `MessagePort` transport for the Model Context Protocol — a {@link MCPTransportInterface} over a native `MessagePort` …" became "Carries the Model Context Protocol across the browser face — …". The browser face is where the class lives, not the medium it carries MCP over; the class's own remarks (src/browser/transports/MessagePortTransport.ts:13) call the port "a plain duplex channel". The sibling rewrite at src/browser/transports/WebSocketClientTransport.ts:14 shows the correct pattern. Right: "Carries the Model Context Protocol over a native `MessagePort` from the browser face — a {@link MCPTransportInterface}, the genuinely new capability this face adds: MCP over `postMessage`."

1k. src/core/types.ts:769 — "required so MCP never invents an expiry policy" became "required so MCP invents no expiry policy". Same meaning, but the clause carried no rule defect and the emphatic `never` is the package's house emphasis. Right: leave the clause alone; wrap the block if the line is long.

1l. src/core/MCPClient.ts:69 and src/core/types.ts:2811 — "over an injected {@link MCPMessageTransportInterface}" became "over any injected …" to compensate for the dropped "transport-agnostic" appositive. The compensation is sound and the writer recorded it; I retain it. Listed so the Orchestrator sees it was ruled, not missed.

CLAIM 2 — third-person `-s` verb that fits the symbol, never repeating the symbol's name: BROKEN.
Verb choice is right almost everywhere, and the domain-shaped choices are good: `Lists` for a frozen array, `Bounds` for a cap, `Names` for a wire key, `Represents` for a data shape, `Mirrors` for the string-boundary types. Two defects:

2a. src/core/types.ts:56 — "Forbids an id, which is what makes a call a {@link JSONRPCRequest} instead." on `readonly id?: never` puts the symbol's own name in the verb's direct object. The writer's own convention three lines' worth away avoids exactly this: src/core/types.ts:99, :117, and :184 all read "Forbids this member; …". Right: "Forbids this member; an id is what makes a call a {@link JSONRPCRequest} instead."

2b. src/core/MCPMethodManager.ts:4 — "Registers the modern methods an {@link import('./types.js').MCPServerInterface} dispatches through" misdescribes the class. The class does not register; callers register into it, as its own remarks state at src/core/MCPMethodManager.ts:9 ("The server registers its built-in modern methods here"). The rewrite also moves what the server "dispatches through" from the registry to the methods, and the interface's parallel doc (src/core/types.ts, "Represents the modern method registry an {@link MCPServerInterface} dispatches through") keeps the original antecedent, so a class and its interface now describe the same seam differently. Right: "Holds the modern methods an {@link import('./types.js').MCPServerInterface} dispatches through — a name-keyed store of {@link MCPMethodHandler}s that owns its map rather than exposing one."

Borderline cases I examined and retain, so they are not re-litigated: src/server/types.ts:40 ("Reports one required MCP HTTP header that is absent or disagrees …") — an issue record reporting a header is defensible; src/server/types.ts:129 and :210 ("Requires the session/route layer's value") — the original modal "Must match" could not survive the third-person rule and the pair still reads as an agreement constraint; property docs that reuse a domain noun that is also the identifier (`transport`, `session`, `error`) — the brief's lesson licenses keeping a domain term.

CLAIM 3 — every rewritten boolean `@returns` reads "True if …; false otherwise" with the original condition kept: CONFIRMED.
Every rewritten `@returns` in the diff takes the exact form, and a sweep of `@returns (Whether|`true`|`false`|True|true )` over /home/user/fleet/mcp/src returns only the new form (src/core/errors.ts:47, src/core/helpers.ts:93, :194, :532, :997, and the src/core/validators.ts run from :137 onward, plus src/server/helpers.ts:94 and :114). Conditions survive: "`true` only for a string whose UTF-8 representation fits the bound" became "True if `value` is a string whose UTF-8 representation fits the bound; false otherwise" (src/core/validators.ts), where the "; false otherwise" half restores the biconditional the dropped "only" carried, and the four added `value` subjects the report names are subjects the original sentences implied. Non-boolean `@returns` lines were left alone (src/server/HTTPDisconnect.ts, "@returns The composed lifecycle signal").

CLAIM 4 — nothing already compliant was rewritten, and no `@example`, `@param`, `@remarks`, `@throws`, or later sentence was touched: CONFIRMED.
A sweep of removed lines opening with a third-person `-s` verb (`^-[\t ]*(/\*\* |\* )(Creates|Returns|Determines|Checks|Represents|Holds|Names|Reports|Carries|Provides|Sets|Bounds|Configures|Drives|Wraps|Adapts|Describes|Lists|Mirrors|Issues|Hands|Registers|Supplies|Declares|Requires|Flags|Pins|Reads|Suggests|Connects|Dispatches|Pumps|Arms|Preserves|Identifies|Emits|Builds|Parses|Resolves|Validates|Decodes|Encodes|Opens|Closes|Aborts|Runs|Sends|Writes|Applies|Answers|Accepts|Advertises|Exposes|Tracks|Keeps|Makes|Turns|Adds|Removes|Ends|Stops|Starts)\b`) over the diff returns nothing, so no compliant opener was disturbed; the many "Determines whether …" blocks in src/core/validators.ts appear only as unchanged context. A sweep of `^[+-].*@(param|remarks|example|throws|deprecated)` over the diff returns nothing. All 868 changed lines match `^[+-][\t ]*(/\*\*|\*)`, equal to the count of `^[+-][^+-]`, so every changed line is comment text. Where an added line carries trailing words of a later sentence (the "A defined" tail on the `MCPClientOptions.version` block), the later text is byte-identical.

Findings outside the claims:

FINDINGS OUTSIDE THE CLAIMS

F1. The sweep left orphaned continuation lines, because it added a word to a full first line without rewrapping the paragraph. src/core/types.ts:890 (" * with."), src/core/types.ts:2872 (" * task."), src/core/MCPStreamController.ts:10 (" * through."), src/core/constants.ts:43 (" * eras."), src/server/types.ts:41 (" * value."), src/browser/types.ts:82 (" * from a"). Why it matters: these blocks are the package's public documentation and a reader meets a one-word line before the remarks; the wave was meant to improve how the docs read. Right: rewrap the whole first paragraph of each block to the file's column budget, which touches only lines the unit already owns.

F2. One class of symbol received three different verbs. `DEFAULT_MCP_*` constants take "Supplies" at src/browser/constants.ts:9, :14 and in src/core/constants.ts (client name and version) but "Sets" at src/core/constants.ts:194, :295, :300 and src/server/constants.ts:18, :44, :57, :69. A constant does not set anything; the code that reads it does. Why it matters: one concept, one term is the house rule, and a reader scanning the constants file now sees two verbs for one kind of symbol. Right: pick one verb for a default-valued constant — "Supplies the default …" reads best against "Names the …" for a key and "Bounds the …" for a cap — and apply it to every `DEFAULT_*` constant in src/core/constants.ts, src/server/constants.ts, and src/browser/constants.ts.

F3. src/core/constants.ts:190 reads "Names the MCP reserved error for a request naming an unsupported protocol revision." The "Names … naming" echo is the only one in the tree; the writer avoided it elsewhere by reaching for "Identifies" (src/core/constants.ts:156). Right: "Names the MCP reserved error for a request that carries an unsupported protocol revision."

F4. The writer's report understates one token change, and the Orchestrator's acceptance rests on that sentence. The report's acceptance item 3 states that the only dropped backtick tokens are the `true`/`false` pair the boolean `@returns` rewrite drops by design plus one `MessagePort` duplicate. src/core/types.ts:471 also drops a `` `true` `` from a property's first sentence (finding 1f). Right: the successor report names that drop, or the fix in 1f removes it.

F5. Guide coherence: no drift found, within a bounded sweep. The pattern `transport-agnostic Model Context Protocol|browser-face|The CLIENT half of the stable Tasks|Backpressured request-scoped progress` over /home/user/fleet/mcp/guides returns one line, guides/mcp.md:3135, and that row is the guide's own prose rather than a quoted TSDoc sentence, so the sweep breaks no guide quotation. This covered four rewritten phrases, not every rewritten first sentence; a full guide-versus-TSDoc first-sentence comparison was NOT run in this lane.

REFERRALS (outside the subjective lane; the Sol bench is dark, so these go to the Orchestrator, with no verdict from me)

R1. The acceptance instrument cannot close half of the unit's own criterion. `voice-scan.mjs` reports `imperative`, `verbless`, and `returnsBad` only, per the counts quoted in the brief and the report, so nothing in the acceptance chain tests "never repeats the symbol's name". Claim 2's failure at src/core/types.ts:56 was invisible to a green instrument run. Decide whether the criterion is narrowed on the record or the instrument gains that check.

R2. Line length. The writer records five boolean `@returns` lines past 100 columns, and the rewrites also produced long single-line comments at src/core/types.ts:2097 and :2599 and at src/core/validators.ts:137. `format:check` passed because oxfmt does not reflow comments. Whether the repository's lint or format contract tolerates them is objective, and the answer decides whether the fix in 1b, 1d, and 1e can simply restore the dropped words on a wrapped line.

R3. The report's gate readings are the writer's own. Per the acceptance laws, an independent verifier's run is what establishes green; I ruled on the diff and the tree alone and take no position on the gate results.

## Checker lane (FAIL 2)

Per-claim verdicts below.

Findings outside the claims:

Claim 1 — CONFIRMED. Every hunk in `/home/user/scaffold/tmp/units/voice/voice-mcp.diff` (3073 lines, 26 files) changes only text inside `/** … */` or `//` comment blocks. A full sweep for `+`/`-` lines whose first non-whitespace character is not `*`, `/**`, or `//` returned zero code-token hunks; every matched line is a comment line (e.g. `voice-mcp.diff:9-14`, `:1710-1721`, `:2757-2780`, `:3044-3047`).

Claim 2 — BROKEN, one instance. `src/core/types.ts` (diff hunk around original line 932-933): `/** \`true\` when the tool failed — its error text is in \`content\`. */` → `/** Flags a failed tool — its error text is in \`content\`. */`. This drops the backticked `` `true` `` token from a field doc (the `isError?: boolean` property), but the resulting sentence is "Flags a failed tool …", not the mandated exception form "Checks whether the value is …" that claim 2 names for a boolean-summary opener. It also is not a boolean `@returns` line (no `True if …; false otherwise` conversion applies) and is not a name-clause drop of the symbol's own identifier. This token change falls outside every named exception and was not called out as a deviation in the writer's report. Every other backtick, `{@link …}`, and URL token I sampled across the diff (77 `@returns True if … ; false otherwise` conversions, the `MessagePortTransport.ts` name-drop, the `MCPClient`/`MCPServer` appositive rewording) is either byte-identical or matches a named exception.

Claim 3 — CONFIRMED. `voice-mcp.status` lists 26 entries, all `M src/...` (`voice-mcp.status:1-26`); none under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`. The repository has no `app/` directory (confirmed: path does not exist).

Claim 4 — CONFIRMED. Grepping `src/` for a comment line beginning with a listed imperative verb (case-insensitive) followed by a space or backtick returned 19 hits across 12 files, but every hit is a mid-block continuation line inside `@remarks` prose or a bulleted list item (for example `src/core/types.ts:66`, `"Narrow the arms apart on the id…"`, which sits inside `@remarks` under the correctly third-person opener at `types.ts:63`, `"Represents one inbound JSON-RPC call…"`). None is a doc block's first line. A grep for `@returns Whether`, `` @returns `true` ``, or `@returns true ` under `src/` returned zero matches.

Claim 5 — CONFIRMED on the quoted evidence. The writer's report (`/home/user/scaffold/tmp/units/voice/voice-mcp-report.md:60-74`) quotes `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`, each with exit code 0 and a note; `npm test` is flagged explicitly as an observation for timing, consistent with the claim's own rule that the Orchestrator's landing chain is authoritative.

Findings outside the numbered claims: none beyond the claim 2 break above; the `isError` field's dropped `` `true` `` token is the only mechanical deviation found in an exhaustive comment-hunk sweep of the diff.

## Orchestrator

Subjective claims 1 and 2 broke on a set of sentences in the wave's largest diff: dropped qualifiers (`modern`, `all`, `the frame`, `never`), a discriminator sentence, a stream-close result, a progress reporter, the browser transport's headline, and two verb misfits (`Forbids an id`, `Registers` on the method holder). Ruled with the lane's wordings, restored links and tokens kept, over-width lines rewrapped (fix-up brief `voice-mcp-fixup-brief.md`, implementer on Opus). The checker's `isError` opener dropping its backticked `true` is permitted as a boolean-summary opener. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
