# J-TYPES audit round 4 — the subjective lane's verdict (returned 2026-09-23 by reviewer on Opus 5.5, native subagent, 30 tool uses, 198 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

Lane held: subjective, on Opus 5.5 (the `reviewer` alias served `claude-opus-5-5`, a native subagent). Opus 5.5 also wrote this round. I ran no command. Every reading comes from the worktree files, the installed 6.0.3 library, the rolled-up declaration in `dist`, and the Orchestrator's retained logs.

## Numbered verdicts

**1. CONFIRMED**
- **Shape.** `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts` declares `export interface SanitizerElementNamespaceWithAttributes` (around line 405). It has exactly `readonly name: string` and `readonly attributes?: readonly string[]`.
  - `SanitizerConfig.elements` is `ReadonlyArray<string | SanitizerElementNamespaceWithAttributes>` (around line 421).
  - The installed library at `node_modules/typescript/lib/lib.dom.d.ts` has `SanitizerElementNamespace` at lines 2650–2653 (`name`, `namespace`) and `SanitizerElementNamespaceWithAttributes` at lines 2655–2658 (`attributes`, `removeAttributes`). The mirror keeps `name` and `attributes` and leaves out `namespace` and `removeAttributes`.
- **No global `Sanitizer`.** I searched `\bSanitizer\b|new Sanitizer` over `src`, `app`, `tests`, `configs`, and `guides/veneer.md`. The only hit is the guide's generic "sanitizer allowlist" prose around line 4701.
- **Probe.** `j-types-probe-4.log.txt` reports `TS2322` at (11,54) for `numeric` and at (13,55) for `nameless` ("Property 'name' is missing"), and exits 2. It reports nothing on lines 3–9 of `j-types-probe-4.ts`, so `perElement` and `flat` compile.
  - Mutations the probe detects: making `name` optional removes the line-13 error, and widening the entry type removes both errors. Its assertions tell those mutants apart from the passing case.
  - What the probe does not show: that round 3's `readonly string[]` rejects `perElement`. That rests on round 3's objective reading, which this round did not re-run.
- **Name attack (the brief's Unknown).** I tested whether the name should be the standard's `SanitizerElementWithAttributes` typedef instead. The attack failed:
  - In the standard, that typedef is the union `string | SanitizerElementNamespaceWithAttributes` (lib line 44230). Giving that name to the object interface would misname it.
  - Naming the union alias instead would push the dictionary into an inline object type. The fields would lose their own TSDoc home, and the alias would repeat what the `elements` leaf already says, which `AGENTS.md` § Design laws forbids as a superfluous wrapper.
  - `names.md` § General vocabulary keeps the external wording for a transliterated member, and round 3 accepted `SanitizerConfig` on the same terms: a subset mirror under the standard's exact name.
  - A developer can search for the exact name in the standard and in the 6.0.3 library.
- **Cost of the name.** The name contains `Namespace`, a field the mirror omits. The `@remarks` sentence on lines 400–403 discloses the subset. That cost is Bound B3.

**2. UNRESOLVED**
- **What holds.**
  - Per-element entries: in `j-types-3-probe-sanitizer-3.log.txt`, the `perElement.plusGlobal` reading keeps `href` on `a` only and `class` on both elements. That matches the entry's leaf ("beside the configuration's `attributes` list") and the `elements` leaf. The `perElement` reading in `j-types-3-probe-sanitizer-2.log.txt` agrees: `a` keeps `href` and `class` and loses `title`, and `span` loses `href`.
  - `dataAttributes` when `attributes` is absent: the `elementsOnly.data` reading keeps `data-x`.
  - `dataAttributes` when `attributes` is given: the round-3 probe's `dictionary.dataAbsent` reading drops `data-x` (`j-types-3-probe-sanitizer.test.ts`, line 22, supplies `attributes: ['aria-label']`).
  - Refusal: the `elementsOnly.dataFalse` reading throws `TypeError: … Invalid Sanitizer configuration.` for `false`. The claim itself states that `true` is unmeasured.
  - Citation error in the claims file: it cites `j-types-3-probe-sanitizer-2.log.txt` for `dataAttributes`, but that log has no `data-*` reading. The other readings carry that part without it.
- **What cannot be decided: the `attributes` default.** The leaf says "Default: the attributes the platform's safe baseline keeps."
  - The readings show what the absent-list path keeps: `data-x`, `title`, and `class` on `span`, and `href` on `b` (`perElement.bHref`).
  - Nothing in the record shows what "the platform's safe baseline" keeps. The adjacent `SetHTMLOptions.sanitizer` leaf (around line 438) uses the same phrase for the default when no sanitizer is given.
  - No probe reads `setHTML` with no options, so nobody measured whether that default keeps `href` on `<b>`.
  - If it drops `href` on `<b>`, the `attributes` sentence is false, and one term names two behaviours, which `AGENTS.md` § Design laws ("One concept, one term") forbids.
  - To settle it: Referral R1.

**3. CONFIRMED**
- **One home for the rationale.** The rationale sentence appears only in the `SetHTMLOptions` `@remarks` (lines 432–435).
  - The `SanitizerConfig` remarks (lines 416–417) keep only the dictionary's name and the field subset.
  - The `SanitizeTargetInterface` remarks (lines 446–447) keep only the `setHTML` omission that the guard exists for.
- **One name for the source.** Searching for `WHATWG` in `src/browser/types.ts` and `guides/veneer.md` finds nothing. Every sentence that names the source opens with "the HTML standard", at lines 397, 400, 413, 416, 429, and 432, and in guide rows 64–66. The later short forms ("The standard's…") refer back inside the same paragraph.
- **Rollup.** `j-types-gates-4.log.txt` reads `build:src:browser exit=0`. `dist/src/browser/index.d.ts` declares `export declare interface SanitizerElementNamespaceWithAttributes` (around line 1148), and its `SanitizerConfig.elements` names the entry type (around line 1132).
- **Attack.** I read each remarks block for a second copy of the rationale, including a paraphrase. None exists. The entry's remarks explain the union, not the reason for dropping the sanitizer object.

**4. CONFIRMED**
- **Status.** `j-types-4-status.txt` and the gates log head list exactly ` M guides/veneer.md` and ` M src/browser/types.ts`.
- **Guide change.** I compared the diff's old and new § Surface tables row by row. The changes are:
  - the widened Name separator;
  - the added `SanitizerConfig` row, which round 3 added, character-identical to line 9 of `j-types-3.diff`;
  - the added `SanitizerElementNamespaceWithAttributes` row, placed before `SanitizerConfig` in source order;
  - the `SetHTMLOptions` summary, "WHATWG" → "the HTML standard's".

  Every other row differs only in padding.
- **E6.** No alias, re-export, `@deprecated` tag, or fallback exists. No sentence describes a strings-only `elements` field: the leaf at line 420 describes both entry forms.
- **Gates.** `j-types-gates-4.log.txt` reads exit 0 for `check:src:browser`, oxlint, and oxfmt, `test:guides` 19 passed out of 19, and `test:policy` 109 passed with 1 skipped.

## Findings fitting no claim

None.

## Attacked and held

- **Mixed array spellings.** `ReadonlyArray<…>` for `elements` sits beside `readonly string[]` for `attributes`. The lint rule `array-type` requires the first spelling for a non-simple element type, and `SanitizeAllowlist` (around line 384) uses the same spelling. It is deliberate, not drift.
- **Summary voice.** Each summary opens with `Mirrors`, an `-s` verb, and none names its symbol. The guide rows equal their doc blocks (`test:guides` green).
- **No union alias.** The `elements` leaf states the union once. Adding a `SanitizerElementWithAttributes` alias would add a name with no boundary or invariant, which E6 and the wrapper law forbid.
- **Shadowing the 6.0.3 globals.** The two mirrors are module exports. They shadow the globals only where imported. Nothing in shipped code assigns the global's mutable `SanitizerAttribute[]` to the mirror, because `SanitizeOptions.allow` takes `SanitizeAllowlist`, not the mirror.

## Referrals (to the objective lane)

- **R1.** On Chromium 153, run each of these on `<b href="https://x" data-x="1" title="t" class="c" onclick="x()">t</b>`:
  - `setHTML` with no options;
  - `{ sanitizer: {} }`;
  - `{ sanitizer: { elements: ['b'] } }`.

  If all three keep the same set, the `attributes` default sentence holds and "safe baseline" names one concept. If the no-options call drops `href` on `b` while the absent-list call keeps it, `src/browser/types.ts` around line 422 is false. In that case, the leaf needs to state the measured default, for example "every attribute the platform does not remove as unsafe" (with the `onclick` reading as its evidence), and "safe baseline" needs to stay only on `SetHTMLOptions.sanitizer`.
- **R2.** Run `{ sanitizer: { elements: ['span'], dataAttributes: true } }`. The `dataAttributes` leaf around line 424 states that this configuration is refused, but only `false` has been measured.

## Bounds (wording, not findings)

- **B1.** "Default: the attributes the platform's safe baseline keeps" names a set the reader cannot check (`writing.md` § Claims and time). R1 decides whether it is a wording issue or a false statement.
- **B2.** "the platform refuses a configuration that names it alone" covers `true` without a measurement.
- **B3.** `Namespace` in the entry's name advertises a field the mirror omits. The cost is accepted because the name matches the standard exactly and the `@remarks` discloses the subset.
- **B4.** "the ones the tip sanitizer sets" (lines 401 and 417) states in the present tense a consumer the tree does not yet contain. A search for `setHTML` finds no implementation caller. Round 4 added a second copy of round 3's phrase.

VERDICT: FAIL 2; outside the claims: none

---

Orchestrator's note at retention: referrals R1 and R2 were run by the Orchestrator at once (`j-types-4-probe-sanitizer-4.log.txt`). R1: `setHTML` with no options keeps only `title` on the sample `b` (it drops `href`, `data-x`, `class`, `id`, and `aria-label`), while `{ sanitizer: {} }` and `{ sanitizer: { elements: ['b'] } }` keep every attribute but `onclick`; so the `attributes` leaf's "Default: the attributes the platform's safe baseline keeps" is false as written, and "safe baseline" names two behaviours. R2: `dataAttributes: true` named without `attributes` is refused (`Invalid Sanitizer configuration`), with or without `elements`, so the leaf's refusal sentence holds for both values.
