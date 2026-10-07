AS1 is blocked by an unowned test change.

[tests/integration.test.ts:1104](/home/user/.wave/veneer-audit-sheet/tests/integration.test.ts:1104) removes every `base` layer from the recipe. That also removes the required object-fit restoration.

The queued reproduction confirmed it: **unchanged control passed; restoration comparison failed**, missing exactly `display`, `max-width`, and `height: revert-layer`. Folder: `runs/as1-scope`; exit **1**.

- Tracked diff and `git status --porcelain`: empty.
- `./bootstrap`: **332,388 → 332,388 bytes**, `cmp` identical.
- Existing counts unchanged: **72 reboot copies, 8 scoped copies, 11 restorations**.
- Direct boundary checks passed.
- Implementation, acceptance gates, journey comparison, and captures remain unrun.

Please authorize changing only that integration test case to retain and compare Veneer’s `base` restoration. [Full command and evidence report](/home/user/.wave/veneer-audit-sheet/tmp/units/as1-report.txt).

The stop follows scaffold’s [deviation protocol](/home/user/.wave/veneer-audit-sheet/node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md): “A unit stops when a conflict blocks its objective or requires an unowned change.”