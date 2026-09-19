# Roughnotes registry gates successor report

The control uses the same sequential child-loop mechanism as the production gate chain. The control child exits `7`, the shared loop stops before the successor, and the control driver returns `0` only after it confirms that stop result.

The runner retains the integrity from the pre-run adoption identity and passes that value into the post-run adoption check. It no longer treats the post-run lock integrity as its own expected value.

The successor control command was:

```powershell
C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe tmp/release/run-roughnotes-registry-gates.mjs --control roughnotes-control-2-20260918
```

Node syntax passed. The command returned `0`. Its `control.json` records child exit `7`, stdout, stderr, and no signal. Its `control-terminal.json` records `failed: "control"`, exit `7`, and `absent: true` for `successor.executed.txt`. The successor marker does not exist. `control-driver.json` records exit `0`.

The preserved original runner, launcher, and report are in `tmp/units/roughnotes-registry-gates-author-evidence/` with `.before` names. The actual successor patch is [runner-successor.diff.patch](../../../../canonical/tmp/units/roughnotes-registry-gates-author-evidence/runner-successor.diff.patch). Raw child logs remain in `roughnotes-registry-gates-evidence/roughnotes-control-2-20260918/`.

The recovery worktree status contains the pre-existing R-B source, guide, manifest, lock, and test edits. This successor made no recovery source edit. The launcher remains byte-identical to its preserved copy.

The runner SHA-256 is `D4E184D2BC052C88C49D1C0C6E8E3C92892DBE40BE94FB23D2FCEF043225A570`. The successor child SHA-256 is `C5ADD9F391E92C7714A4E2A9FDA45F348FC8EA88DFD48B13D9AE4044B8396F73`. No product gate or capture ran.
