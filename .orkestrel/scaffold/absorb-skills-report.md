## Question

Which `enterprise-bootstrap` and `orkestrel-prove-journey` instructions are now contradicted by, automatable through, or silent about what `@orkestrel/test/browser`, `@orkestrel/form`, and `@orkestrel/probe` publish?

## Evidence

1. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:6`), Instruction ("Implement the signatures below as a contract in the workspace's browser test setup module; never copy them as source."), Relation (`contradicted`), Package line (`test/package.json:3`), Fact (`@orkestrel/test` 0.0.11 publishes those helpers from `@orkestrel/test/browser`).

2. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md:50`), Instruction ("adds a journey helper only where `@orkestrel/test` publishes none."), Relation (`automatable`), Package line (`test/guides/test.md:174`), Fact (the journey verbs are imported from `@orkestrel/test/browser` rather than declared in a test file).

3. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:26`), Instruction ("`resolveAccessible(name)` / `resolveAccessible(role, name)` is the public resolver."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:183`), Fact (`resolveAccessible` is the published export, with `resolveRendered` beneath it).

4. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:49`), Instruction ("Keep these distinct failure voices, and never merge any of them into one message."), Relation (`automatable`), Package line (`test/guides/test.md:764`), Fact (the published voices table spells the same four resolver messages plus the region, disclosure, perception, and capture voices).

5. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:20`), Instruction ("Never let a helper take an element, a component instance, or a selector from the caller."), Relation (`contradicted`), Package line (`test/guides/test.md:179`), Fact (fixture builders, readers, `contrast`, `captureFrame`, and `place` take an element; only journey verbs refuse one).

6. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:76`), Instruction ("Provide `clickAccessibleWithin(region, role, name)` for repeated short verbs and a name a row status completes."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:252`), Fact (the published form matches the region exactly and the control name loosely).

7. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:70`), Instruction ("Give the layer a separate disclosure verb keyed to the summary's rendered text."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:291`), Fact (`clickDisclosure` is the published native-`<summary>` verb).

8. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:91`), Instruction ("`traverseAccessible(name)` moves focus by forward Tab and returns the target once focus lands on it."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:373`), Fact (`traverseAccessible` is published with a cycle end, a trail voice, and a hard cap).

9. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:105`), Instruction ("`readPerception(name)` returns the normalized `innerText` of exactly one visible named region, dialog, table, tab panel, alert, or status."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:418`), Fact (`readPerception` is published, and `readPage` / `readFocus` / `readValue` cover the extra readers layer.md:115 names).

10. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:130`), Instruction ("Give the layer exactly one capture helper."), Relation (`contradicted`), Package line (`test/src/browser/factories.ts:106`), Fact (the published surface is `createPortfolio(…).place`, plus `captureFrame`, `expandCaptures`, `stagePane`, and `releasePane`).

11. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:10`), Instruction ("`capture(state: string): Promise<string | undefined>` is the capture hook."), Relation (`contradicted`), Package line (`test/src/browser/factories.ts:125`), Fact (`place(state, element?)` is a method on the portfolio object, not a free `capture` function).

12. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:13`), Instruction ("Return `undefined` and do nothing when the capture flag is unset."), Relation (`automatable`), Package line (`test/src/browser/factories.ts:126`), Fact (an un-`enabled` `place` returns `undefined`, resizes nothing, and records nothing).

13. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:15`), Instruction ("Read one variant value that names the theme and the viewport together, and refuse a value that names no registered variant."), Relation (`automatable`), Package line (`test/src/browser/factories.ts:109`), Fact (`createPortfolio` throws `Capture variant "<name>" is not registered` at creation).

14. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:31`), Instruction ("Wrap the hook in a placement helper that refuses an unregistered state name, refuses a second placement of the same state, records each written path, and refuses a filename written twice."), Relation (`automatable`), Package line (`test/src/browser/factories.ts:127`), Fact (`place` refuses unregistered and already-placed states when enabled, records `paths`, and treats a duplicate filename as a duplicate placement).

15. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:37`), Instruction ("Name a variant as one value carrying both the theme and the viewport, such as `dark-390`."), Relation (`automatable`), Package line (`test/guides/test.md:200`), Fact (`CaptureVariant` is `{ name, width, height, apply? }` — one name for the theme-and-viewport pair).

16. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:61`), Instruction ("Attach a one-shot listener to the resolved control, place the capture from inside it, then click through the normal verb."), Relation (`silent`), Package line (`test/src/browser/factories.ts:125`), Fact (`place` accepts an optional element to photograph and publishes no activation-listener helper).

17. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:90`), Instruction ("Read every pairing through a reader that composites the painted layers, in both themes."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:1307`), Fact (`contrast(element, floor?)` composites ancestor layers top-over-bottom and refuses an unpainted stack when `floor` is omitted).

18. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md:352`), Instruction ("Use a reader that collects every painted layer to the first opaque one, composites a translucent foreground, measures both themes, and voids the run if a negative control passes."), Relation (`automatable`), Package line (`test/guides/test.md:2068`), Fact (`contrast` is that composited reader; theme swapping and the failing control remain the suite's).

19. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:91`), Instruction ("Extract every class authored in the templates and components, and fail the run on one that has no rule in the compiled CSS the page loads."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:1409`), Fact (`readCascade()` is the compiled-CSS membership set an authored-class check measures against).

20. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:91`), Instruction ("Extract every class authored in the templates and components…"), Relation (`silent`), Package line (`test/guides/test.md:266`), Fact (the browser package publishes `readCascade` / `readRules` / `findRule` and no template-class extractor).

21. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:92`), Instruction ("Register each status glyph against the meaning it carries; no meaning takes more than one glyph, no glyph serves more than one meaning, and every registered glyph resolves in the icon set actually shipped."), Relation (`silent`), Package line (`test/src/browser/helpers.ts:519`), Fact (the browser package drops `aria-hidden` glyphs from `readText` and publishes no glyph-to-meaning registry).

22. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/references/components.md:32`), Instruction ("Form controls are `.form-control`, `.form-control-lg/sm`, `.form-select`."), Relation (`silent`), Package line (`form/src/core/types.ts:21`), Fact (`FieldControl` is `text` | `editor` | `password` | `number` | `date` | `time` | `datetime` | `color` | `confirm` | `select` | `checkbox` | `file`, and the skill never names it).

23. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/references/components.md:33`), Instruction ("Check/Radio: `.form-check`, `.form-check-input`, `.form-check-label`."), Relation (`contradicted`), Package line (`form/guides/form.md:206`), Fact (a lone browser checkbox is `confirm`, `checkbox` is only the multi-choice group, and a radio group is `select`).

24. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md:221`), Instruction ("Email is `<input type=\"email\" class=\"form-control\">`."), Relation (`contradicted`), Package line (`form/guides/form.md:212`), Fact (email is `text` with `{ email: true }`, not its own control).

25. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:117`), Instruction ("Do not reach first for a `style=\"...\"` attribute."), Relation (`silent`), Package line (`test/guides/test.md:1571`), Fact (`extractOrphans` and `style()` read anatomy and computed properties and detect no inline or `<style>` authorship).

26. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:82`), Instruction ("The review input here is captures at both viewports and both themes plus an accessibility snapshot."), Relation (`automatable`), Package line (`test/guides/test.md:2249`), Fact (`createPortfolio` expands a registry across named theme-and-viewport variants, and `describeTree` / `describeFocus` are the published accessibility snapshot).

27. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/references/frontend-design.md:98`), Instruction ("Read both themes and both the wide and the narrow viewport from those captures, not the markup."), Relation (`automatable`), Package line (`scaffold/.agents/skills/orkestrel-polish-surface/references/capture-harness.md:44`), Fact (the harness table requires narrow and wide viewports and every theme at both, which `CaptureVariant` width/height plus `apply` implement).

28. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:157`), Instruction ("Support `data-bs-theme=\"light\"` and `dark` when the product offers both."), Relation (`silent`), Package line (`test/guides/test.md:2255`), Fact (the published `apply` example sets `data-theme`, not `data-bs-theme`).

29. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:161`), Instruction ("Keep every interactive target ≥ 24×24px, measured on the rendered box rather than assumed from the class."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:1669`), Fact (`pixels(element, property)` reads a resolved length in CSS pixels).

30. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:209`), Instruction ("Meaning never by color alone; contrast verified."), Relation (`automatable`), Package line (`test/src/browser/helpers.ts:1363`), Fact (`readRing` measures painted focus chrome against its backdrop once focus arrived through a journey verb).

31. Skill line (`scaffold/.agents/skills/enterprise-bootstrap/SKILL.md:86`), Instruction ("Pair each instrument with a negative control drawn from outside the population it covers, and treat an instrument whose control passes as broken."), Relation (`automatable`), Package line (`probe/guides/probe.md:298`), Fact (`prove` mints a receipt only when the control fails at the declared stage and falsifies the instrument when the control also breaks elsewhere).

32. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md:115`), Instruction ("Route review of the portfolio to the `orkestrel-polish-surface` campaign; do not judge it here."), Relation (`silent`), Package line (`probe/guides/probe.md:270`), Fact (neither skill mentions statecharts or interactive human review of journeys; `prove` is an automated case/control receipt, not a UI review).

33. Skill line (`scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md:48`), Instruction ("Build the layer as shared browser test infrastructure… it lives in the workspace's browser test setup module."), Relation (`silent`), Package line (`probe/guides/probe.md:418`), Fact (probe's runtime stage requires a named Vitest project and overlay plugin, and neither journey skill names those prerequisites).

## Distillate

- Measurement grep on `layer.md` and `enterprise-bootstrap/SKILL.md`: `resolveAccessible` at `layer.md:26–27`, `traverseAccessible` at `layer.md:91`, `readPerception` at `layer.md:105`, `contrast` at `SKILL.md:75,135,146,152,156,209`; `createPortfolio` and `readCascade` have no hits in those two files.
- `layer.md:6` still orders a workspace contract implementation; `@orkestrel/test` 0.0.11 already publishes the journey layer (`test/package.json:3`). That contradiction is reported, not resolved.
- `captures.md` still specifies a free `capture(state)` helper; the published door is `createPortfolio` / `place`.
- Contrast is automatable through `contrast`; authored-class cascade membership through `readCascade`; glyph registry, template-class extraction, and inline/`<style>` detection are unpublished.
- `@orkestrel/form`'s `FieldControl` vocabulary (`confirm` / `checkbox` / `select` / `text`+email) is unnamed in the Bootstrap skill and collides with `.form-check` / `type="email"` markup.
- Viewport×theme coverage is automatable through `CaptureVariant` + `createPortfolio`; the published `apply` example is silent on `data-bs-theme`.
- Probe automates the negative-control receipt law; it does not measure contrast, cascade, or glyphs.
- Neither skill states a statechart or an interactive human-review procedure for journeys.
- Recording `0.0.11` as a version catalog inside either skill would need a file `scaffold/.claude/rules/documentation.md:73` forbids; adding an unnamed extra file under a skill directory would need a file `:74` forbids; the named references (`layer.md`, `captures.md`, `bootstrap-reference.md`) can absorb the facts.

## Unknowns

`captures.md` registry and variant rules versus `createPortfolio` refusals:

- Flag unset returns `undefined` and writes nothing — `captures.md:13` / `factories.ts:126` — `matches`.
- Refuse an unregistered variant name — `captures.md:15` / `factories.ts:109` — `matches`.
- Apply that variant's theme and viewport inside the hook — `captures.md:17` / `factories.ts:134` (`apply?.()` then `captureFrame` size) — `looser` (`apply` is optional).
- Write `<state>--<variant>.png` and return the path — `captures.md:19` / `factories.ts:133` — `looser` (directory is caller-supplied, not fixed to `tmp/`).
- Frozen state and variant lists in the journey file — `captures.md:24` / `factories.ts:106` — `looser` (options object, no freeze, no file-location check).
- Name a state for surface and condition — `captures.md:26` / `factories.ts:106` — `looser` (no naming refusal).
- Every registered state must be placed — `captures.md:28` / `factories.ts:106` — `looser` (no unplaced-state refusal).
- Refuse an unregistered state name — `captures.md:31` / `factories.ts:128` — `matches` (when enabled).
- Refuse a second placement of the same state — `captures.md:31` / `factories.ts:131` — `matches` (when enabled).
- Record each written path — `captures.md:31` / `factories.ts:142` — `matches`.
- Refuse a filename written twice — `captures.md:31` / `test.md:455` — `matches` (injectivity: a duplicate filename is a duplicate placement, which `place` already refuses).
- Place from inside the journey immediately after the proving assertion — `captures.md:32` / `factories.ts:125` — `looser` (not enforced).
- One name carries theme and viewport; never split selectors — `captures.md:37` / `test.md:200` — `matches`.
- One variant per run — `captures.md:40` / `factories.ts:107` — `matches`.
- Always-on unique filename-expansion proof — `captures.md:50` / `helpers.ts:1836` — `looser` (`expandCaptures` exists; `createPortfolio` does not assert uniqueness).
- Placement set-equality against the registry — `captures.md:52` / `factories.ts:119` — `looser` (`states` is a snapshot, not an assertion).
- Under the flag, disk filenames equal the expansion and each file reads back non-empty — `captures.md:54` / `helpers.ts:1809` — `looser` (per-file byte readback matches; membership equality is not in the factory).
- Transient in-flight capture via a one-shot listener — `captures.md:64` / `factories.ts:125` — `looser` (optional element only).

Whether an authored-class extractor or a glyph registry exists outside `test/src/browser` was not in scope. Whether `prove` is intended as the negative control for the contrast, cascade, and glyph instruments is unread.

## Deviation

none
