1. **BROKEN** — `EventSourceInterface<TMap extends Record<string, readonly unknown[]>>` rejects an event map such as `{ readonly ready?: readonly [name: string] }`. `Object.fromEntries(entries)` also selects its permissive fallback because each entry is inferred as an array, concealing an implicit `any` behind the declared return. Broaden the event-map contract through `NonNullable<TMap[K]>`, and replace the construction with a shape that does not depend on the permissive overload.

2. **UNRESOLVED** — `AddEventListenerOptions` permits a secondary `signal`, but `createSignal` never removes its registration when that signal automatically removes the installed listener. Settle the suspected desynchronization with `npx vitest run --config vite.config.ts --project probe tmp/probe/a1-objective-signal.test.ts`, using `fixture.signal.addEventListener('abort', listener, { signal: secondary.signal })`, then aborting `secondary` and asserting `fixture.count === 0`.

3. **BROKEN** — The revoked object and revoked array use the same `Reflect.ownKeys` failure, while the cyclic object and cyclic array use the same `JSON.stringify` failure. The sparse array and hidden-key object do not make their negative controls throw. Remove duplicate members or give each a distinct reader failure, and align the guide with the “throws or violates an assumption” contract.

4. **CONFIRMED** — The attack passed every hostile value through `invokeUnchecked`; the `typeof` refusal reaches no proxy trap and throws `TypeError`. The primitive set for `readProperty` reaches its explicit `TypeError` guard. Callable and object inputs cross the documented caller-owned unchecked boundary.

5. **CONFIRMED** — The record, entries, and `Headers` attacks normalize through the same constructor, and `Object.freeze` seals each result. The supplied core, browser, server, and root typecheck evidence covers the derived `HeadersSource` spelling in every project.

6. **CONFIRMED** — A cyclic value falls from `JSON.stringify` to `String`, and a value whose JSON and string conversions throw reaches `[unrenderable]`. Every rendered path is cut to 200 UTF-16 code units before the message is built.

7. **CONFIRMED** — The already-aborted attack returns before listener installation. The pending path installs only a one-shot abort listener, so delivery removes it without a timer.

8. **CONFIRMED** — The supplied compile probe establishes inference from an `EventSourceInterface<LoaderEvents>` reference and includes a failing control. The concrete-class failure recorded in U2 and F1 establishes why that call shape needs explicit map and event-name arguments.

9. **CONFIRMED** — The executed browser proof distinguishes the detached and mounted states through computed style, layout width, identity, and connection. Replacing `mount` with bare `append` breaks expression composition and the same-element return contract used by `render` and `mount(build(...))`.

10. **CONFIRMED** — Removing `trim()` did not redden the Chromium proof, so its necessity is unfalsifiable on the supplied engine. The postcondition remains engine-independent, and the guide promises normalized output without promising padded text.

11. **CONFIRMED** — The throwing-sheet attack is contained by the per-sheet `try` and `continue`; later sheets still enter the queue. The growing indexed walk appends nested `CSSGroupingRule` children after top-level rules, preserving the documented breadth-first first-match order.

12. **CONFIRMED** — The `0` result is a measured contribution, not absence: the guide explicitly groups `auto`, `none`, and empty text as contributing no pixels and directs callers needing the distinction to `style`.

13. **CONFIRMED** — Invalid inline color, unreadable computed color, and successful parsing all leave through the `finally` that removes the mounted probe. The TSDoc and guide state that an undeclared `var()` can resolve to inherited color.

14. **CONFIRMED** — The overload set admits one argument only through the markup signature and requires `classes` for the tag signature. The supplied root and browser checks compile every repository and guide call site.

15. **CONFIRMED** — The real IndexedDB proof drives successful deletion, absent deletion, and a held-open blocked request. Only `success` resolves; `blocked` rejects with the documented message.

16. **CONFIRMED** — Recorder attacks observe `input` alone from `typeInput` and `input` followed by `change` from `commitInput`. Each event is constructed with `bubbles: true`, after the value assignment.

17. **CONFIRMED** — Each event handler destroys its owned client resource before settling: the upgraded socket on `upgrade`, the response and request on `response`, and the request on `error`. Promise settlement ignores later events, `finally` destroys again safely, and `agent: false` prevents pooling. The supplied active-resource proof covers resolution and rejection paths.

18. **BROKEN** — `UpgradeResult` admits contradictory states such as `{ claimed: true, status: 426, protocol: undefined }`, although `claimed` is computed entirely from whether `status` exists. Remove `claimed` and derive the fact from `status`, or replace the interface with a discriminated shape that cannot express contradictory states; the derive-state law favors removal.

19. **CONFIRMED** — Allocation occurs before each `try`, so allocation failure propagates. Operational refusals return `false`, and every entered path executes `removeTree` in `finally`; cleanup failure propagates. The supplied residue and allocation-control proofs cover each probe.

20. **BROKEN** — The repaired permission-hold case uses `PERMISSION_HOLD_REFUSES_REMOVAL`, but other server tests still use `process.platform === 'win32'` and `process.platform !== 'win32'` for `removeTree` and `destroyScratch`. Replace those platform gates with runtime probes of the working-directory hold they require.

21. **BROKEN** — The guide says every `createHostileValues` member makes a naive reader throw and tells consumers to prove that throw. The sparse-array and hidden-key controls instead compare key membership and throw nothing. Change the universal to “throws or violates a naive structural assumption” and transcribe the actual controls.

22. **BROKEN** — The green parity gate misses the false hostile-value universal because it checks names, methods, imports, and links, then executes only unrelated wait and cookie fences. Changing `pixels(card, 'padding-left') // 12` to `// 13` would also remain green. Add executed, mutation-proven assertions for the added flagship fences and their behavioral prose.

23. **BROKEN** — `readCascade` changed observable `ReadonlySet` insertion order in addition to gaining throw-skip behavior. With top-level `.first` followed by `.second`, v0.0.8’s LIFO walk inserts `second` before `first`, while 0.0.9’s `readRules` walk inserts `first` before `second`. Preserve the prior order or document and test the intentional order change.

24. **BROKEN** — The attacked rulings were U1’s assertion-free `Object.fromEntries` typing, U1’s hostile-value deduplication, and U3’s decision to document `UpgradeResult.claimed`. The permissive `Object.fromEntries` overload conceals `any`, the hostile controls duplicate failure classes, and `claimed` violates derive-state. Repair those contracts rather than retaining the rulings.

25. **BROKEN** — The optional-event-map input is refused, `UpgradeResult` permits contradictory state, platform-name skips remain, and the guide states a false hostile-value universal that its green parity gate cannot detect. Repair these seams and repeat the falsification round before shipping 0.0.9.

VERDICT: FAIL — 9 broken, 1 unresolved, 0 not-evidenced, 0 findings outside the claims