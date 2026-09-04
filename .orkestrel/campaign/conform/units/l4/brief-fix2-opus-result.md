## Rewrites

O1, `file:line`, before → after:

| Site | Before | After |
| --- | --- | --- |
| `/home/user/fleet/brief/src/core/types.ts:168-169` | `where it once took` / `` `(name, role, url)` `` | `where the earlier` / `` `citation` function took `(name, role, url)` `` |
| `/home/user/fleet/brief/src/core/helpers.ts:190` | `buildGap('rules', 'Should validation message wording change?')` | `buildGap('rules', 'Does validation message wording need to change?')` |
| `/home/user/fleet/brief/guides/brief.md:415` | `buildOutcome(2, 'tests cover the new code paths'),` | `buildOutcome(2, 'tests cover the changed code paths'),` |
| `/home/user/fleet/brief/guides/brief.md:417` | `rules: ['No new dependencies.'],` | `rules: ['Add no dependencies.'],` |
| `/home/user/fleet/brief/guides/brief.md:429` | `gaps: [buildGap('rules', 'Should validation message wording change?')],` | `gaps: [buildGap('rules', 'Does validation message wording need to change?')],` |
| `/home/user/fleet/brief/guides/brief.md:980` | `buildGap('output', 'Should the result land as a diff or full files?', {` | `buildGap('output', 'Does the result need to land as a diff or as full files?', {` |
| `/home/user/fleet/brief/guides/brief.md:990` | `question: 'Should the result land as…'` | `question: 'Does the result need…'` |
| `/home/user/fleet/brief/tests/guides.test.ts:391` | `buildOutcome(2, 'tests cover the new code paths'),` | `buildOutcome(2, 'tests cover the changed code paths'),` |
| `/home/user/fleet/brief/tests/guides.test.ts:393` | `rules: ['No new dependencies.'],` | `rules: ['Add no dependencies.'],` |
| `/home/user/fleet/brief/tests/guides.test.ts:405` | `gaps: [buildGap('rules', 'Should validation message wording change?')],` | `gaps: [buildGap('rules', 'Does validation message wording need to change?')],` |
| `/home/user/fleet/brief/tests/guides.test.ts:442` | `{ rank: 2, text: 'tests cover the new code paths', required: true },` | `{ rank: 2, text: 'tests cover the changed code paths', required: true },` |
| `/home/user/fleet/brief/tests/guides.test.ts:444` | `expect(draft.rules).toStrictEqual(['No new dependencies.'])` | `expect(draft.rules).toStrictEqual(['Add no dependencies.'])` |
| `/home/user/fleet/brief/tests/guides.test.ts:465` | `question: 'Should validation message wording change?',` | `question: 'Does validation message wording need to change?',` |

`guides/brief.md:990` is the documented value the `:980` fence produces; the owned `:980` rewrite made it false, so it moved with the fence. Its `…` elision already truncated the question, and the shorter truncation keeps the line inside the guide's width.

O2, `file:line`, before → after:

| Site | Before | After |
| --- | --- | --- |
| `/home/user/fleet/brief/tests/guides.test.ts:340` | `These two tests transcribe the guide's flagship fences` | `These tests transcribe the guide's flagship fences` |

`tests/guides.test.ts` carries no presence guard over any rewritten string: `grep -nE 'toContain|toMatch|fence' tests/guides.test.ts` returns only section, language, and inventory checks. The transcriptions at `:391`, `:393`, `:405`, `:442`, `:444`, and `:465` are the whole carrier set, and each followed its fence line without changing an asserted relationship.

## Sweep rows as recorded

**Claim 3 — the inflection sweep over every renamed builder.**

```text
grep -rniE '\b(task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition)(s|ed|ing)?\s*\(' src tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src guides/brief.md guides/README.md README.md
```

`-i` supplies the case-insensitivity and `(s|ed|ing)?` the inflections, so the pattern admits `Task(`, `gaps(`, `outcomed(`, and `referencing(` alongside each bare name. No builder survives in its old call form. Each surviving hit is ruled:

- `BriefManagerInterface.brief` and `.briefs`, the registry lookup and listing methods, not builders — `src/core/BriefManager.ts:74`, `:79`, `src/core/types.ts:509`, `:510`, `tests/src/core/factories.test.ts:26`, `tests/src/core/BriefManager.test.ts:76`, `:77`, `:78`, `:97`, `:119`, `:147`, `:164`, `:165`, `:369`, `:370`, `:381`, `guides/brief.md:706`, and `:707`.
- The literal `'… blocking gap(s)'` inside a message string — `src/core/BriefCompiler.ts:331`, `tests/src/core/BriefCompiler.test.ts:158`, and `guides/brief.md:991`.
- `source.examples(` and `findUnexampled(`, reached by the `example` + `s` inflection — `tests/guides.test.ts:196`, `:197`, and `:202`.
- The heading literal `'Citations (trust order)'`, reached by the `citation` + `s` inflection — `src/core/helpers.ts:1117` and `tests/src/core/helpers.test.ts:670`.
- The prose phrase "over briefs (a brief's links…" — `guides/brief.md:861`.
- The fixture getter `get outcomes()` on a test-local class — `tests/src/core/BriefCompiler.test.ts:241`.

**Claim 4 — the old-form sweep behind each row.** Population: `src`, `tests`, `guides`, `README.md`.

brief-subj-5 removed the `required` boolean's old wording. Exit 1, no hit:

```text
grep -rnE 'Whether the outcome gates' src tests guides README.md
```

brief-subj-7 removed the old parameter word on `gate` and `add`. Returned `tests/src/core/BriefManager.test.ts:91`, `:129`, `:130`:

```text
grep -rnE '\b(gate|add)\s*\(\s*(data|source)\b' src tests guides README.md
```

Those are call sites, not declarations: each is `registry.add(source)` passing the test's own `const source`, declared at `tests/src/core/BriefManager.test.ts:86` and `:128`. The companion documentation sweep `grep -rnE '\b(gate|add)\((data|source):|@param (data|source) -' src tests guides README.md` returns no `gate(` or `add(` hit; its `@param source -` hits sit on the `src/core/cloners.ts` and `src/core/helpers.ts` leaves the row excludes, and on the vendored `tests/setupPolicy.ts`.

brief-subj-8 removed `buildExample`'s `result` parameter. Exit 1, no hit:

```text
grep -rnE '@param result\b|\bresult:\s*string|buildExample\s*\([^)]*\bresult\b|\bexample\s*\(\s*input' src tests guides README.md
```

**O1 sweep.** `grep -rniE '\b(new|should|once)\b' src guides/brief.md guides/README.md README.md tests/guides.test.ts`. `should` returns no hit. Every `new` hit is `new X()` constructor syntax at `src/core/BriefCompiler.ts:54`, `:83`, `:213`, `:226`, `:302`, `:396`, `:471`, `src/core/cloners.ts:36`, `:47`, `:125`, `src/core/factories.ts:36`, `:55`, `src/core/BriefManager.ts:28`, `:36`, `:49`, `:54`, `:105`, `:139`, `:150`, `:182`, `:199`, `src/core/helpers.ts:533`, `:539`, `:579`, `:587`, `:706`, `:805`, `:819`, `:854`, `:897`, `src/core/errors.ts:16`, `:46`, `guides/brief.md:188`, `:529`, `:677`, `:711`, `tests/guides.test.ts:144`, `:213`, `:241`, `:251`, `:275`, `:299` — save the one under Deviation state. Every `once` hit counting occurrences rather than sequencing them is permitted: `src/core/BriefCompiler.ts:243`, `:265`, `src/core/cloners.ts:12`, `src/core/helpers.ts:513`, `:557`, `src/core/types.ts:438`, `:453`, `:455`, `guides/brief.md:460`, `:466`, `:829`, `:837`, `:1205`, `tests/guides.test.ts:221`. `guides/README.md` and `README.md` have no hit.

## `git status --short`

```text
 M README.md
 M guides/brief.md
 M src/core/BriefCompiler.ts
 M src/core/BriefManager.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/BriefCompiler.test.ts
 M tests/src/core/BriefManager.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/validators.test.ts
```

The unit's 22 paths, nothing added.

## Gate exit codes

Run in `/home/user/fleet/brief`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 53 files |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | `tsconfig.json` and `configs/src/tsconfig.core.json` both clean |
| `npm run test:guides` | 0 | `Test Files 1 passed (1)`, `Tests 20 passed (20)` |

## Deviation state

Expected: acceptance criterion 2 says the `new|should|once` sweep returns only permitted code senses.

Found: the sweep returns hits in the banned prose senses at sites outside this fix's owned lines.

Exact evidence:

- `/home/user/fleet/brief/src/core/BriefManager.ts:166` — "seeding all-or-nothing once every entry has been staged" (`once` sequencing, the sense `after` carries).
- `/home/user/fleet/brief/src/core/helpers.ts:869` — "returns its argument by IDENTITY once the guard passes" (same sense).
- `/home/user/fleet/brief/guides/brief.md:591` — "argument once the guard passes" (same sense).
- `/home/user/fleet/brief/src/core/types.ts:155` — "vocabulary this once held" (`once` for past time).
- `/home/user/fleet/brief/tests/guides.test.ts:303` — "the exact member this package once shipped dead" (same sense).
- `/home/user/fleet/brief/guides/brief.md:933` — `text: 'migrate the 3 legacy stores to the new driver seam'` (`new` dating a value inside fence sample data, the same sense the lane flagged at `:415`).

Done or not done: every site the fix brief names is done, `guides/brief.md:990` moved with the fence that produces it, and each gate exits 0. The listed sites are outside Owned, so they were not edited.

Hypothesis: the objective lane enumerated the sites its own reading reached rather than the sweep's full result, so criterion 2 inherited a site list narrower than the sweep it prescribes.

The report's `## Fix round 2` section is appended at `/home/user/scaffold/tmp/units/conform/conform-brief-report.md`.
