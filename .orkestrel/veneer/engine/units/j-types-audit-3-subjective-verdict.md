# J-TYPES audit round 3 — the subjective lane's verdict (returned 2026-09-23 by reviewer on Opus 5.5, native subagent, 35 tool uses, 241 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

Lane held: subjective, on Opus 5.5 (the `reviewer` alias served `claude-opus-5-5`). The same engine wrote this round. I ran no command. Every reading is from the source files, the installed libraries, and the Orchestrator's retained logs.

## Numbered verdicts

**1. CONFIRMED.**
- **Shape.** In `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts`, `SanitizerConfig` (around lines 396–412) declares exactly `readonly elements?: readonly string[]`, `readonly attributes?: readonly string[]`, and `readonly dataAttributes?: boolean`.
- **Leaf names and TSDoc.** The leaf names match the 6.0.3 library's `interface SanitizerConfig` (`node_modules/typescript/lib/lib.dom.d.ts` lines 2640–2647). Each leaf's TSDoc ends "mirroring the dictionary's `<field>` field".
- **Field type.** `SetHTMLOptions.sanitizer` is typed `SanitizerConfig` (line 422).
- **Search.** My search for `Sanitizer` in the file hits lines 400, 405, 422, 430, and 431. Line 430 is prose; the rest are the mirror's declaration, its reference, and prose.
- **Example.** The example at line 441 passes `{ sanitizer: { elements: ['b'] } }`.
- **Attack: the rule's type-name form.** `names.md` § Type-level identifiers requires `{Entity}Options` for a configuration type, which points to renaming it `SanitizerOptions`. The attack failed on design grounds:
  - `SanitizerOptions` would sit beside the existing `SanitizeOptions` (line 387). Those are near-identical names for Veneer's Bootstrap-facing options and the platform's dictionary, which is worse for a reader than the external name.
  - Keeping the external name follows the intent of `names.md` § General vocabulary (a mirror keeps the external wording). It also matches the `SetHTMLOptions` precedent.
  - A developer can find the name in the standard and on MDN.
- **Attack: collision with the global.** The export is module-scoped. It shadows the 6.0.3 global only in a consumer module that imports it. The `@remarks` states that the mirror carries only three fields, so hover text discloses the subset.
- **Held.** The name holds. Whether the type-name table binds a mirrored external dictionary is a rule-home question; see Referral R3.

**2. CONFIRMED (ruled from the source; this is the objective lane's claim).**
- **`elements` and `attributes` leaves.** "Lists the element names the sanitized markup keeps" and "…every kept element keeps" match the `dictionary.elements` reading in `j-types-3-probe-sanitizer.log.txt`: `b`, `a`, and `span` are kept; `i` is removed; `class`, `href`, `aria-label`, and `title` are kept; `id` and `onclick` are dropped.
- **`dataAttributes` leaf.** `true` keeps `data-x` (the `dictionary.dataTrue` reading). `false` drops it (the `dictionary.elements` reading). With `attributes` given and `dataAttributes` absent, it is dropped (the `dictionary.dataAbsent` reading). That matches "Default: dropped when `attributes` is given".
- **Excluded fields.** None of `removeElements`, `replaceWithChildrenElements`, `removeAttributes`, or `comments` appears.
- **Attack: extra or missing field.** I compared the mirror field by field against lib lines 2640–2647. It holds.
- **Still open.** The claim covers field names, not field types. The narrowing of `elements` to strings is Finding F1 and Referral R1. The default when `attributes` is absent is Referral R2.

**3. CONFIRMED (ruled from the source; this is the objective lane's claim).**
- **After the edit.** `j-types-gates-3.log.txt` reads `build:src:browser exit=0`, after "Analysis will use the bundled TypeScript version 5.9.3".
- **Before the edit.** `j-types-landing-gates.log.txt` gate 4, on `main` at `1868007`, reads `Internal Error: Unable to follow symbol for "Sanitizer"`.
- **The mutation.** Reverting to `sanitizer?: Sanitizer` yields the base state, up to comment-only differences. The control is therefore the executed base run, not an isolated single-line revert.
- **Attack: could a comment change have fixed the rollup?** The removed prose names `Sanitizer` only in backticks. There is no `{@link}`, so it put no symbol into the graph. The two runs share the lockfile at the same commit, and both report bundled TypeScript 5.9.3. The before/after pair distinguishes the edit.
- **Not settled here.** Whether the single-line mutation run in isolation reproduces the error belongs to the objective lane.

**4. CONFIRMED.**
- **Status.** `j-types-3-status.txt` lists exactly `guides/veneer.md` and `src/browser/types.ts`.
- **Guide.** The guide hunk adds exactly one row, between `SanitizeOptions` and `SetHTMLOptions`, matching source order. No other row changes.
- **Summary.** The row's Summary is character-identical to the description at line 397.
- **Checks.** `j-types-gates-3.log.txt` reads exit 0 for check, oxlint, oxfmt, `test:guides` (19 passed), and `test:policy` (109 passed, 1 skipped).
- **Attack: other guide sites.** I searched `guides/veneer.md` for other sites naming `Sanitizer` or `setHTML`. Line 227 is the unchanged `setHTML` method row. Line 4700 uses "Sanitizer allowlist" generically for Bootstrap's feature and is outside this diff. Neither is drift.

**5. CONFIRMED.**
- **No alias or leftover marker.** No `type Sanitizer` alias, re-export, `@deprecated` tag, or fallback survives. My search for `Sanitizer\b|new Sanitizer|SetHTMLOptions|SanitizerConfig` over `src`, `app`, `tests`, `guides`, and `configs` finds only the declarations and the guide rows.
- **Consumer.** `SanitizerConfig` has its type-level consumer at line 422.
- **Attack: does `SetHTMLOptions` still earn its place?** It keeps the platform's call shape, `setHTML(html, { sanitizer })`. Collapsing it to `options?: SanitizerConfig` would change the mirror away from the platform's signature. It is a mirrored dictionary, not a forwarding wrapper.
- **Attack: does `SanitizeTargetInterface` still earn its place?** It is the guard's narrowing target, because 6.0.3 declares only `setHTMLUnsafe` (lib lines 13893 and 35328). It holds.
- **Attack: a sentence describing the earlier shape.** Line 431 reads "…rather than a sanitizer object". It states the contract's present narrowing relative to the platform's accepted `sanitizer` types, not the history of the edit. It holds; its placement is Bound B1.

**6. CONFIRMED.**
- **Summary voice.** The summary opens with `Mirrors` and does not name the symbol.
- **Toolchain statements, checked against the installed libraries.**
  - "TypeScript 6.0.3 declares the dictionary globally": 6.0.3 lib line 2640.
  - "TypeScript 5.9.3, whose DOM library declares no sanitizer types": my search of `node_modules/@microsoft/api-extractor/node_modules/typescript/lib/lib.dom.d.ts` for `Sanitizer|setHTML|SetHTMLOptions` returns only `setHTMLUnsafe` lines.
  - "the declaration rollup compiles with TypeScript 5.9.3": gates log line 14.
  - `SetHTMLOptions`, "TypeScript's DOM library does not declare it": no `SetHTMLOptions` in either library.
  - `SanitizeTargetInterface`, "omits `setHTML`": only `setHTMLUnsafe` is declared.
  - "declares no platform `Sanitizer` interface": true of 5.9.3.
- **Attack.** I read each sentence against the grep. No toolchain statement is contradicted.

## Findings fitting no claim

**F1: the mirror cannot express per-element attributes, which the tip sanitizer's own public contract promises.**
- **What is wrong.** `src/browser/types.ts`, `SanitizerConfig.elements` (around line 407), is typed `readonly string[]`. The attributes can then only be listed globally ("the attribute names every kept element keeps", around line 408).
- **The public promise it breaks.** `SanitizeAllowlist` (around line 378) documents "Maps each element name to the attributes sanitized tip markup keeps on it". R10 (`j-engine-design-verdict.md`) builds the tip sanitizer from Bootstrap's allowlist, "the per-tag attributes" included.
- **Failing input.** Take `allow: { a: ['href'], b: [] }` and the markup `<b href="https://x">t</b><a href="https://x">l</a>`. Bootstrap keeps `href` on `<a>` and drops it on `<b>`. No value of the mirror reproduces that:
  - `attributes: ['href']` keeps `href` on `<b>`;
  - omitting `href` from `attributes` drops it on `<a>`.
- **Why it matters.** Round 2's `Sanitizer` type could express this case, through `allowElement` with a `SanitizerElementWithAttributes` entry. So this round's narrowing removes a capability the design names. R10's helper will be forced to flatten, which departs silently from Bootstrap and falsifies the `SanitizeAllowlist` doc. Under E6 ("get it right the first time"), the public contract that implementation units write against is where to fix it.
- **What right looks like.** Recommended: mirror the dictionary's per-element entry. The 6.0.3 library types `elements?: SanitizerElementWithAttributes[]` (line 2644), which admits `{ name, attributes? }` (lines 2650–2658 and 44230). Type `elements` as `readonly (string | <per-element mirror>)[]`, with the per-element mirror carrying `readonly name: string` and `readonly attributes?: readonly string[]`, and give it its § Surface row. Alternative: keep the flat shape, record the flattening as a departure on `SanitizeOptions.allow` beside R10's URL-floor departure, and rewrite the `SanitizeAllowlist` summary. That alternative gives up Bootstrap parity, so I recommend the former.
- **Before acting.** Per-element entries on Chromium 153's `setHTML` are not measured by any probe in the record (terrain probe 2 and `j-types-3-probe-sanitizer.test.ts` pass flat lists only). Add a probe row with a per-element entry and a flat control before landing the recommended shape.

## Attacked and held

- **The `Sanitizer` prose at line 430.** It is a backticked name in prose, not a type reference, so the rollup cannot see it. Criterion 3 of `j-types-brief-3.md` permits it.
- **The guide padding.** oxfmt left every other row's padding unchanged; the diff hunk is a single `+` line.
- **`readonly` arrays against the platform's mutable arrays.** The tip writes through `SanitizeTargetInterface.setHTML`, whose parameter is the mirror. No assignment to the 6.0.3 global's mutable `SanitizerAttribute[]` occurs in shipped code.
- **The example's call.** `{ sanitizer: { elements: ['b'] } }` type-checks against the mirror. It matches the shape of the probe's `dictionary.elements` case.

## Referrals (to the objective lane)

- **R1.** Does narrowing `elements` and `attributes` to `readonly string[]` lose a case R10 needs? Settle it against R10's per-tag attributes and lib lines 2644 and 2655–2658, and add a Chromium 153 probe row with a per-element entry (see F1).
- **R2.** `dataAttributes` states a default only for the case where `attributes` is given. Establish the platform's value when `attributes` is absent, which no probe row measures. Then either state it or confirm the field is inert in that case.
- **R3.** Does `names.md` § Type-level identifiers (`{Entity}Options`) bind the type name of a mirrored external dictionary, or does § General vocabulary's mirror rule reach type names? Neither rule says, and `SanitizerConfig` sits in that gap. This needs a rule-home ruling, not a code change in this unit.

## Bounds (wording, not findings)

- **B1: placement.** The rationale for narrowing `SetHTMLOptions.sanitizer` sits in the `@remarks` of `SanitizeTargetInterface` (lines 430–431) and of `SanitizerConfig` (lines 401–403). The `@remarks` of `SetHTMLOptions`, which owns the field, is silent. Keep the rationale in one home, on the field's owner.
- **B2: consumer-facing docs.** The public TSDoc states the package's build-toolchain versions ("TypeScript 5.9.3", "the declaration rollup"). That is a build detail, not a consumer contract, and the sentence goes false when API Extractor upgrades its bundled compiler.
- **B3: one name per source.** `SanitizerConfig` says "the HTML standard's dictionary" while the adjacent `SetHTMLOptions` summary says "the WHATWG dictionary". Pick one name.

VERDICT: FAIL none; outside the claims: F1
