The brief requires a read-only reconciliation and names no additional skill. I will inspect the rulings, verify every sweep root exists, then return only the requested sections.The report is readable. The refuter confirms the package’s rulings in lane order; the only explicit duplicate carriers are `ollama-obj-1` for `ollama-subj-11` and `ollama-subj-14` for `ollama-obj-9`. I am checking the required breaking-identifier sweep now.## Question
Map every `CONFIRMED` refuter ruling against the four reconciliation rules and sweep breaking identifiers across the specified fleet paths.

## Evidence

### ollama-subj-1
- Breaking: `false`
- Ground: “The citations resolve to nothing, so the reader cannot check them.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-2
- Breaking: `false`
- Ground: “A bare `§14`, `H4`, or scenario `S2` names an audit round's own numbering, which no consumer of the published package can look up.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-3
- Breaking: `false`
- Ground: “NEVER name a list item by its position.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-4
- Breaking: `false`
- Ground: “A guide tagline and a Surface-row description are noun phrases.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-5
- Breaking: `false`
- Ground: “Keep public exports and behavioral methods in guide parity.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-6
- Breaking: `false`
- Ground: “Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-8
- Breaking: `false`
- Ground: “Name the software component that acts, and make it the subject of the sentence.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-9
- Breaking: `false`
- Ground: “Write the present tense for what exists.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-10
- Breaking: `false`
- Ground: “An option key that transliterates an external protocol field keeps the external wording and its TSDoc names the source it mirrors.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-11
- Breaking: `true`
- Ground: “`parse*`: coercion producing `T | undefined`.”
- Fold candidate: `ollama-obj-1` — “This is the repair to dispatch for both this finding and ollama-subj-11.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: no identifier is renamed or removed; no source consumer.

### ollama-subj-12
- Breaking: `true`
- Ground: “`build*` assembles a composite value from parts.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep:
  - `assembleResult` → `buildResult`
  - `/home/user/fleet/agent/src/core/helpers.ts:415`
  - `/home/user/fleet/agent/src/core/helpers.ts:419`
  - `/home/user/fleet/agent/src/core/Agent.ts:32`
  - `/home/user/fleet/agent/src/core/Agent.ts:289`
  - `/home/user/fleet/agent/tests/src/core/helpers.test.ts:4`
  - `/home/user/fleet/agent/tests/src/core/helpers.test.ts:588`
  - `/home/user/fleet/agent/tests/src/core/helpers.test.ts:590`
  - `/home/user/fleet/agent/tests/src/core/helpers.test.ts:603`
  - `/home/user/fleet/agent/tests/src/core/helpers.test.ts:619`
  - `/home/user/fleet/agent/guides/agent.md:445`
  - `/home/user/fleet/agent/guides/agent.md:1120`
  - These are `agent`’s own symbol references, not imports from `@orkestrel/ollama`.

### ollama-subj-13
- Breaking: `false`
- Ground: “Re-read the prose last, against what actually shipped.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-subj-14
- Breaking: `false`
- Ground: “The README states the opposite of what the configuration declares.”
- Fold candidate: `ollama-subj-14` — “This finding is the single carrier — ollama-obj-9 is the same README defect and must not be dispatched beside it.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-1
- Breaking: `true`
- Ground: “Flat coercers returning `T | undefined`.”
- Fold candidate: `ollama-obj-1` — “Give a single writer ollama-obj-1's repair.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: no identifier is renamed or removed; no source consumer.

### ollama-obj-2
- Breaking: `false`
- Ground: “Never declare or assign a function inside another function or method.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-3
- Breaking: `false`
- Ground: “Error classes expose a machine-readable `code` and optional `context`.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-4
- Breaking: `false`
- Ground: “Never reimplement or rename-wrap a declared package primitive.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-6
- Breaking: `false`
- Ground: “Name resolution is not a behavioural proof.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-7
- Breaking: `false`
- Ground: “Measure an elapsed interval with `performance.now()`, never `Date.now()`.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-8
- Breaking: `false`
- Ground: “Export every reusable helper, fixture type, factory, constant, and guard from setup files.”
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

### ollama-obj-9
- Breaking: `false`
- Ground: “TypeScript, SCSS, Markdown, tests, and showcase remain aligned.”
- Fold candidate: `ollama-subj-14` — “This finding is a DUPLICATE of ollama-subj-14's first half and carries no independent edit.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.

## Distillate
- Confirmed ids: `ollama-subj-1`, `ollama-subj-2`, `ollama-subj-3`, `ollama-subj-4`, `ollama-subj-5`, `ollama-subj-6`, `ollama-subj-8`, `ollama-subj-9`, `ollama-subj-10`, `ollama-subj-11`, `ollama-subj-12`, `ollama-subj-13`, `ollama-subj-14`, `ollama-obj-1`, `ollama-obj-2`, `ollama-obj-3`, `ollama-obj-4`, `ollama-obj-6`, `ollama-obj-7`, `ollama-obj-8`, `ollama-obj-9`.
- Rule 1 flagged: `ollama-subj-11` → `ollama-obj-1`; `ollama-obj-1` → `ollama-obj-1`; `ollama-subj-14` → `ollama-subj-14`; `ollama-obj-9` → `ollama-subj-14`.
- Rule 2 flagged: `none`.
- Rule 3 flagged: `none`.
- Rule 4 breaking ids: `ollama-subj-11`, `ollama-subj-12`, `ollama-obj-1`. Only `ollama-subj-12` renames an identifier.
- Source-consumer checkout with hits: `agent`; its hits refer to its own `assembleResult`, not to `@orkestrel/ollama`.
- Verified fleet consumers of `@orkestrel/ollama`: `none`.
- Sites the sweep could not read: `none`.

## Unknowns
- External consumers outside the named fleet and scaffold sweep paths are unknown.

## Journal
Leave for the driver.

## Deviation
none