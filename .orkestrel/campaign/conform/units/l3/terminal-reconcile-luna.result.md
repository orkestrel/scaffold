## Question
Map every `CONFIRMED` refuter ruling against the four reconciliation rules and sweep breaking identifiers across the specified fleet paths.

## Evidence

### terminal-obj-1
- Breaking: `false`
- Fold candidate: `terminal-obj-4` — “terminal-obj-4 deletes `isOutputStream` outright.” (`conform-terminal.json:375`)
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-obj-2
- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: removed `ESCAPE`, `KEY_CSI`, and server `CSI`.
  - `/home/user/fleet/console/src/core/constants.ts:138`, `:141`, `:144`, `:154`, `:157`
  - `/home/user/fleet/console/src/core/helpers.ts:44`
  - `/home/user/fleet/console/src/core/renderers/ANSIRenderer.ts:2`, `:34`
  - `/home/user/fleet/console/tests/src/core/helpers.test.ts:64`, `:65`, `:724`, `:726`, `:738`, `:739`, `:1003`, `:1038`, `:1043`
  - `/home/user/fleet/console/tests/src/browser/helpers.test.ts:13`, `:150`, `:159`, `:165`, `:171`, `:178`, `:189`, `:204`, `:210`, `:217`, `:262`, `:269`, `:282`, `:290`, `:306`, `:313`, `:320`, `:329`, `:334`, `:339`, `:344`, `:350`, `:351`, `:352`, `:367`
  - `/home/user/fleet/toolbox/guides/terminal.md:323`, `:332`, `:393`, `:509` — mirror
  - Source consumer: no source consumer

### terminal-obj-3
- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: removed `CARRIAGE_RETURN` and `LINE_FEED`; no source consumer

### terminal-obj-4
- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: removed `OutputStreamInterface` and `isOutputStream`; no source consumer

### terminal-obj-5
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-obj-6
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-obj-7
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-1
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-2
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-3
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-4
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-5
- Breaking: `false`
- Fold candidate: `terminal-subj-7` — “This also removes the changelog clause terminal-subj-5 names at :45.” (`conform-terminal.json:477`)
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-6
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-7
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-8
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-9
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-10
- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable

### terminal-subj-11
- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: removed `inputReduce`, `passwordReduce`, `confirmReduce`, `selectReduce`, `checkboxReduce`, and `editorReduce`; no source consumer

### terminal-subj-12
- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: renamed the member literal `'terminal'` to `'target'`.
  - `/home/user/fleet/form/tests/src/core/cloners.test.ts:76`, `:95`
  - `/home/user/fleet/process/tests/guides.test.ts:988`, `:1003`
  - `/home/user/fleet/process/tests/src/server/processes/Supervisor.test.ts:25`, `:41`, `:42`, `:43`, `:70`, `:97`, `:121`, `:175`, `:210`
  - `/home/user/fleet/middleware/tests/setup.test.ts:182`, `:192`
  - `/home/user/fleet/qualifier/tests/src/core/Qualifier.test.ts:368`
  - `/home/user/fleet/server/tests/src/server/helpers.test.ts:102`, `:109`
  - `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136`
  - `/home/user/fleet/toolbox/guides/terminal.md:282`, `:465` — mirror
  - Source consumer: `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136`

### terminal-subj-14
- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: renamed `moveUp` to `renderCursorUp`; no source consumer

## Distillate
- Confirmed ids: `terminal-obj-1`, `terminal-obj-2`, `terminal-obj-3`, `terminal-obj-4`, `terminal-obj-5`, `terminal-obj-6`, `terminal-obj-7`, `terminal-subj-1`, `terminal-subj-2`, `terminal-subj-3`, `terminal-subj-4`, `terminal-subj-5`, `terminal-subj-6`, `terminal-subj-7`, `terminal-subj-8`, `terminal-subj-9`, `terminal-subj-10`, `terminal-subj-11`, `terminal-subj-12`, `terminal-subj-14`
- Rule 1 flagged: `terminal-obj-1 → terminal-obj-4`; `terminal-subj-5 → terminal-subj-7`
- Rule 2 flagged: `none`
- Rule 3 flagged: `none`
- Breaking ids: `terminal-obj-2`, `terminal-obj-3`, `terminal-obj-4`, `terminal-subj-11`, `terminal-subj-12`, `terminal-subj-14`
- Source-consumer checkout: `toolbox`
- Unread sweep sites: `none`

## Unknowns
`none`

## Journal
Leave for the driver.

## Deviation
`none`