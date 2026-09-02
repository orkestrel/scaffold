# Unit voice-template — report

Every TSDoc block under `src/` of `/home/user/fleet/template` now opens with a third-person `-s`
verb sentence, and both boolean `@returns` lines read `True if …; false otherwise`. The gate chain
exits 0 at every step. The package has no `app/` directory.

## Counts by kind

| Kind                                            | Blocks |
| ----------------------------------------------- | ------ |
| First sentence from the imperative              | 16     |
| First sentence given a verb (verbless opener)   | 27     |
| First sentence reworded to drop the symbol name | 0      |
| Boolean `@returns` rewritten                    | 2      |

Blocks rewritten: 43 of 48. The remaining 5 already opened in the third person
(`TemplateManager#template`, `#fill`, `#validate`, `#parameters`, and `resolveToken`) and stay
byte-identical.

Acceptance instrument, before and after (`.orkestrel/campaign/instruments/voice-scan.mjs`):

```text
before: template files=  9 blocks=  48 imperative=  19 verbless=  21 returnsBad=  2
after:  template files=  9 blocks=  48 imperative=   0 verbless=   0 returnsBad=  0
```

The launch buckets over-approximate in one direction and under-approximate in another: the
classifier read `Options for …` and `Per-call options for …` as third-person or imperative when
each is a bare noun phrase, and it read `Prototype-pollution-unsafe field-path segments —` and
`Coded misuse / failure conditions …` as imperative for the same reason. Each block was ruled by
reading, so the by-kind counts differ from the launch buckets while the totals agree.

## Files touched

- `/home/user/fleet/template/src/core/Template.ts` — class, `definition`, `fill`, `validate`, and `parameters` first sentences.
- `/home/user/fleet/template/src/core/TemplateManager.ts` — class and `register`, `templates`, `find`, `has`, `remove`, `clear` first sentences, plus `has`'s boolean `@returns`.
- `/home/user/fleet/template/src/core/constants.ts` — `FILL_PATTERN`, `DEFAULT_MISSING_POLICY`, `DEFAULT_LOCALE`, and `UNSAFE_FIELD_SEGMENTS` first sentences.
- `/home/user/fleet/template/src/core/errors.ts` — `TemplateError` and `isTemplateError` first sentences, plus `isTemplateError`'s boolean `@returns`.
- `/home/user/fleet/template/src/core/factories.ts` — `createTemplate` and `createTemplateManager` first sentences.
- `/home/user/fleet/template/src/core/helpers.ts` — `formatValue`, `resolveSafeField`, and `fillTemplate` first sentences.
- `/home/user/fleet/template/src/core/shapers.ts` — `placeholderShape` first sentence.
- `/home/user/fleet/template/src/core/types.ts` — every one of its doc blocks, including the three `TemplateManagerEventMap` member comments.

Diffstat: 8 files changed, 55 insertions(+), 53 deletions(-). Every changed line begins with `*`,
`/**`, or a tab and `*`; no non-comment token moved.

## Gates

| Command                | Exit | Excerpt                                    |
| ---------------------- | ---- | ------------------------------------------ |
| `npm run format:check` | 0    | `All matched files use the correct format.` |
| `npm run lint:check`   | 0    | no diagnostics                             |
| `npm run check`        | 0    | `tsc --noEmit` clean for root and src:core  |
| `npm run build`        | 0    | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| `npm test`             | 0    | 125, 111, 46, 2, and 23 tests passed across src:core, policy, config, setup, and guides |

No gate failed, so no excerpt of a failure exists and no re-run was needed. `npm test` timing is
an observation; the Orchestrator's landing chain is the authoritative run.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-template.diff`
- `/home/user/scaffold/tmp/units/voice/voice-template.status`

`git status --short` lists exactly the eight `src/core/*.ts` files. The tree is uncommitted and
unstaged.

## Judgment calls

- The lowercase domain noun `template` stays in a first sentence (`Represents a named, versionable
  template …`). The rule bans repeating the symbol's name; every symbol in this package carries the
  `Template` prefix, and stripping the common noun would remove the subject of the sentence. No
  block's first sentence carried its own identifier as a code token, so the drop-the-name count is 0.
- Verb choice by declaration kind: `Represents` for an interface or type alias standing for a
  record, `Names` for a literal union, `Carries` for an options bag, `Declares` for a contract or
  event map, `Holds` for a value constant or the registry class, `Lists` for a frozen array,
  `Reports` for a result, and `Fires when …` for an event-map member.
- `TemplateManagerEventMap`'s member comments moved from the past tense (`A template was
  registered`) to `Fires when a template is registered`, which states the same fact as the event's
  trigger.
- Four paragraphs were rewrapped where the added verb pushed a line ragged. Each rewrapped
  paragraph holds only the first sentence, so no later sentence's bytes moved.

## Observations outside scope

`guides/template.md` describes the same symbols in the imperative in its Surface tables (for
example `Format a resolved fill value …`, `Build the \`@orkestrel/contract\` object shape …`).
Guides are off-limits to this unit and `tests/guides.test.ts` compares symbol names, fence
languages, links, and `@example` presence rather than sentences, so the tree stays green. Guide
voice needs its own unit if the wave is meant to reach it.

## Deviations

none.
