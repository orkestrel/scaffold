## Question

Map every `CONFIRMED` ruling in `/home/user/work/reports/conform-workflow.json` against the four reconciliation rules and sweep breaking identifiers across the specified fleet paths.

## Evidence

### workflow-obj-1

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-2

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-3

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-4

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-5

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-6

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-7

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-obj-11

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-1

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-2

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-3

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-4

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-5

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-6

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-8

- Breaking: `true`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep:
  - Identifiers: `WorkflowHooks`, `PhaseHooks`, `TaskHooks`
  - Repair clause: “Delete the three aliases at `src/core/types.ts:759-766`.”
  - `/home/user/fleet/toolbox/guides/workflow.md:365` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:366` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:367` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:365` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:366` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:367` — mirror
  - No source consumer.

### workflow-subj-9

- Breaking: `true`
- Fold candidate: `workflow-subj-10` — “Coupled: the rename of `TASK_STATUSES` to `LIFECYCLE_STATUSES` and `TERMINAL_TASK_STATUSES` to `TERMINAL_STATUSES` belongs in the same commit as workflow-subj-10.”
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep:
  - Identifiers: `PHASE_STATUSES`, `WORKFLOW_STATUSES`, `TASK_STATUSES`, `TERMINAL_TASK_STATUSES`
  - Repair clause: “Required now: delete `PHASE_STATUSES` ... and `WORKFLOW_STATUSES` ... Coupled: the rename of `TASK_STATUSES` to `LIFECYCLE_STATUSES` and `TERMINAL_TASK_STATUSES` to `TERMINAL_STATUSES`.”
  - `/home/user/fleet/toolbox/guides/workflow.md:320` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:321` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:322` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:323` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:320` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:321` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:322` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:323` — mirror
  - No source consumer.

### workflow-subj-10

- Breaking: `true`
- Fold candidate: `workflow-subj-9` — “Land this with workflow-subj-9, and update toolbox's `WorkflowStatus` import to `LifecycleStatus` in the same wave.”
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep:
  - Identifiers: `TaskStatus`, `PhaseStatus`, `WorkflowStatus`
  - Repair clause: “Delete the three aliases at `src/core/types.ts:355-393` and type every member, parameter and return that reads `TaskStatus`, `PhaseStatus` or `WorkflowStatus` as `LifecycleStatus`.”
  - `/home/user/fleet/toolbox/src/core/types.ts:9`
  - `/home/user/fleet/toolbox/src/core/types.ts:125`
  - `/home/user/fleet/toolbox/src/core/types.ts:126`
  - `/home/user/fleet/toolbox/tests/src/core/helpers.test.ts:5`
  - `/home/user/fleet/toolbox/tests/src/core/helpers.test.ts:152`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:501`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:503`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:505`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:510`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:512`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:517`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:519`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:524`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:525`
  - `/home/user/fleet/mcp/tests/setupConformance.ts:527`
  - `/home/user/fleet/mcp/tests/mirrors/ext-tasks-2026-07-28-schema.json:1493`
  - `/home/user/fleet/test/guides/test.md:1358`
  - `/home/user/fleet/toolbox/guides/workflow.md:208` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:209` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:211` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:320` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:321` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:322` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:323` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:324` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:350` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:351` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:352` — mirror
  - `/home/user/fleet/toolbox/guides/workflow.md:599` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:208` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:209` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:211` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:320` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:321` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:322` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:323` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:324` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:350` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:351` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:352` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:599` — mirror
  - Source-consumer checkout: `toolbox`.

### workflow-subj-11

- Breaking: `true`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep:
  - Identifier: `WorkflowFunctions`
  - Repair clause: “Rename `WorkflowFunctions` to `WorkflowRegistry` at `src/core/types.ts:1666-1677` and at every reference.”
  - `/home/user/fleet/toolbox/src/core/types.ts:7`
  - `/home/user/fleet/toolbox/src/core/types.ts:167`
  - `/home/user/fleet/toolbox/src/core/types.ts:186`
  - `/home/user/fleet/toolbox/src/core/factories.ts:8`
  - `/home/user/fleet/toolbox/src/core/factories.ts:320`
  - `/home/user/fleet/toolbox/src/core/factories.ts:325`
  - `/home/user/fleet/toolbox/tests/src/core/factories.test.ts:6`
  - `/home/user/fleet/toolbox/tests/src/core/factories.test.ts:600`
  - `/home/user/fleet/toolbox/guides/toolbox.md:21`
  - `/home/user/fleet/toolbox/guides/workflow.md:377` — mirror
  - `/home/user/fleet/agent/guides/workflow.md:377` — mirror
  - Source-consumer checkout: `toolbox`.

### workflow-subj-12

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-13

- Breaking: `false`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep: not applicable.

### workflow-subj-14

- Breaking: `true`
- Fold candidate: none
- Off-limits repair: none
- Consumer-only repair: none
- Breaking sweep:
  - Identifiers: `RunnerValue`, `RunnerFailure`
  - Repair clause: “Then delete the `RunnerValue` ... and `RunnerFailure` ...”
  - No source consumer.

## Distillate

- Confirmed ids: `workflow-obj-1`, `workflow-obj-2`, `workflow-obj-3`, `workflow-obj-4`, `workflow-obj-5`, `workflow-obj-6`, `workflow-obj-7`, `workflow-obj-11`, `workflow-subj-1`, `workflow-subj-2`, `workflow-subj-3`, `workflow-subj-4`, `workflow-subj-5`, `workflow-subj-6`, `workflow-subj-8`, `workflow-subj-9`, `workflow-subj-10`, `workflow-subj-11`, `workflow-subj-12`, `workflow-subj-13`, `workflow-subj-14`.
- Rule 1 flagged: `workflow-subj-9 → workflow-subj-10`; `workflow-subj-10 → workflow-subj-9`.
- Rule 2 flagged: none.
- Rule 3 flagged: none.
- Source-consumer checkout: `toolbox`.
- Sites the sweep could not read: none.

## Unknowns

None.

## Journal

Leave for the driver.

## Deviation

none