# J-TYPES audit round 4 — the objective lane's verdict (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf69-861c-7db0-b833-ad13abd49696`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-4.jsonl` (launch copy under `tmp/codex/`); 22 commands; 276 s; usage {"input_tokens":890769,"cached_input_tokens":800256,"cache_write_input_tokens":0,"output_tokens":7123,"reasoning_output_tokens":1333}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED.** The objective-lane attack from round 3 compiles against the fixed mirror:
   ```ts
   {
     elements: [{ name: 'a', attributes: ['href'] }, 'span'],
     attributes: ['class'],
     dataAttributes: false
   }
   ```
   An in-memory TypeScript 6.0.3 compilation reports no diagnostics. Restoring `readonly string[]` reproduces TS2322. Numeric and nameless entries still produce TS2322; string entries compile. AST inspection confirms the prescribed readonly fields, union, and absence of a global `Sanitizer` reference.

   Walking Bootstrap’s installed `DefaultAllowlist` found no omitted field needed to carry its rules: `a` and `img` use local attribute lists; the remaining tags use empty local lists; `class`, `dir`, `id`, `lang`, `role`, and expanded ARIA names use the global list. The resulting dictionary compiles.

2. **BROKEN.** The [dataAttributes sentence](/C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:424) says `false` “drops each one.” The [installed DOM library](/C:/Users/mikes/WebstormProjects/veneer-types/node_modules/typescript/lib/lib.dom.d.ts:34622) instead describes explicit attribute names remaining available.

   The attack is `<span data-x="1">s</span>` with this compiler-admitted configuration:
   ```ts
   {
     elements: ['span'],
     attributes: ['data-x'],
     dataAttributes: false
   }
   ```
   The documented rule predicts removal of `data-x`. The HTML standard’s attribute-filtering algorithm retains explicitly allowed attributes regardless of this flag; the same exception applies when the flag is omitted. This corroborates the installed-library contradiction. See the [HTML standard’s sanitization algorithm](https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#inner-sanitize-steps).

   Smallest correct fix: describe `false` as requiring explicit allowance through global or per-element `attributes`, and qualify the default accordingly. This is a documentation finding; the supplied browser probes do not exercise explicitly allowed `data-*` names.

   Bound: `perElement.plusGlobal`, `perElement.bHref`, `elementsOnly.data`, and `dictionary.dataAbsent` support their measured cases. `elementsOnly.dataFalse` records the refusal without global `attributes`; the report correctly records `true` without `attributes` as unmeasured.

3. **CONFIRMED.** Attacked the rollup rationale against the installed declarations and generated artifact. TypeScript 5.9.3 lacks the sanitizer declarations; the rationale resides in `SetHTMLOptions` remarks. Searching `src/browser/types.ts` and `guides/veneer.md` finds no `WHATWG`. The [Orchestrator’s gate log](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-gates-4.log.txt) records build exit 0, and the rolled-up declaration exports the entry interface and references it from `SanitizerConfig.elements`.

4. **CONFIRMED.** Attacked scope by comparing the captured diff with the live base-relative diff: they match. Reconstructing the round-3 guide confirms that the subsequent whitespace-insensitive changes are the separator, entry row, and `SetHTMLOptions` summary. Independent summary comparisons pass; deliberately incorrect summaries fail. The replacement retains no compatibility alias, re-export, deprecation, fallback, or string-only description. The captured status names only the authorized files, and the Orchestrator’s recorded acceptance checks pass.

Findings fitting no claim: none.

**Attacked and held:** The mirror carries Bootstrap’s default allowlist without namespace or removal fields. Explicit global attributes remain necessary for per-tag restriction: the recorded baseline behavior without that list correctly retains `href` on `b`. Dropping an unlisted `data-x` remains correct; treating `false` as overriding an explicit allowance is the broken sentence. The compiler-version notice does not contradict the successful rollup.

VERDICT: FAIL 2; outside the claims: none
