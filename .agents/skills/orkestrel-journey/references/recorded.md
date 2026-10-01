# Recorded browser journeys

Judge a journey a model recorded through `@orkestrel/browser` by the steps its replay ran, never by
the transcript of the session that recorded it. Translate those steps into the journey layer before
a run of them counts toward a family this skill declares.

## The vocabulary

```ts
import { waitForText } from '@orkestrel/test'
import {
	clickAccessible,
	fillAccessible,
	pressKeys,
	readPage,
	readPerception,
} from '@orkestrel/test/browser'
```

## What a recording holds

- Read a recorded journey as one user intent kept as JSON: a `name`, a one-sentence `description`,
  the `parameters` it declares, and `steps` that mirror the browser toolset's own tool calls.
- Take an acting step's target from its role and exact accessible name. Read its record-time
  `reference` and its `css` selector only as evidence for a refused resolution; a replay reads
  neither, and a translated step carries neither.
- Name each journey tool for its act: `record` starts a recording, `save` keeps it under its name,
  `journeys` reads the listing, `edit` changes steps by id, `replay` runs, and `forget` discards the
  journey with its runs.
- Find a `browse` server's files under `tmp/browsers/`: the journey at `NAME/journey.json`, each
  run at `NAME/runs/ID/run.json` beside that run's step captures, and the server's browser profile
  under `.profiles/`. `NAME` is the journey's name and `ID` is the run id the store minted.
- Register a `browse` server per `.claude/rules/quality.md` § Instruments.

## Translate a step

Translate each step through the following table. [layer.md](layer.md) owns each verb's contract.

| Recorded step                                             | Journey layer                                                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `click`                                                   | `clickAccessible(role, name)` with the step's role and name                  |
| `type`                                                    | `fillAccessible(name, text)`, refused for a `combobox` or a `listbox` target |
| `press`                                                   | `pressKeys(keys)`, with the chord translated                                 |
| `wait`                                                    | `waitForText(description, read, text)`                                       |
| `navigate`, `switch`, `dialog`, a page tool, `unresolved` | Refused                                                                      |

- Refuse a `type` step whose target is a `combobox` or a `listbox`. The toolset selected an option
  there, and `fillAccessible` replaces a field's text.
- When a `type` step carries `submit`, follow the fill with `pressKeys('{Enter}')` on the same field.
- Translate a `press` chord into the provider's key syntax: hold each modifier with `{Name>}`, send
  the terminal key, and release the modifiers with `{/Name}` in reverse order. `Enter` becomes
  `{Enter}`, and `Control+Shift+P` becomes `{Control>}{Shift>}P{/Shift}{/Control}`.
- Scope the reader a `wait` step passes to `waitForText` per [layer.md](layer.md) § The waits:
  `readPerception` over the region the sentence lands in, and `readPage` only where the claim is
  about the whole page.
- Refuse `navigate`: reach the page through the visible link or control that navigates, per
  [layer.md](layer.md) § The named bans. Refuse `switch`, `dialog`, a page tool, and an `unresolved`
  step, and report each as a step the layer has no verb for.

## Judge a run

- Feed a run's `steps` and `output` into the variant artifact ([decide.md](decide.md) § The
  rendered artifact) as automation evidence, labelled with the journey name and the run id.
- Discharge none of this skill's laws with a run until the workspace holds a trusted-input adapter
  that drives the steps through the published verbs. A family stays open until a journey test
  drives the translated steps.
- Read a run whose `outcome` is `stopped` or `aborted` as the step it stopped at, and never as the
  journey's outcome.

## Review a recording

Review a model's recording before a replay or a translation. The recorder keeps every action that
completed, so the recording carries each detour and each repeated submission the model made.

1. Read the listing `journeys` returns for the journey.
2. Remove each detour and each repeated step through `edit` with the `remove` operation, by step id.
3. Discard a recording that does not carry the intent through `forget`, and record it again.
