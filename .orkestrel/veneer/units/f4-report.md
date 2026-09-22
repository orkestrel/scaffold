<!-- Unit F4 HOST-OBSERVATIONS, run 1: `sol` on GPT-6 Astra (codex exec, workspace-write with the network-access override), thread 01a0c97f-ba24-7ad1-ad37-b40cd6b43d7e, returned 2026-09-22 with a deviation report and no tracked change. Brief: f4-brief.md over f4-terrain.md. Journal: tmp/codex/f4.jsonl (launch journal, swept at acceptance). Retained verbatim. -->

F4 stopped before implementation because Obligation 5 conflicts with the terrain and the tree. HEAD is `751c3ed`; tracked files remain unchanged.

The obligations have the following disposition, in brief order.

- Obligation 1 — Not done. No reading type, recorder, or recorder proofs added. No files touched.
- Obligation 2 — Not done. The event cases remain unchanged. No files touched.
- Obligation 3 — Not done. No provenance field, refresh, or receipt changes. No files touched.
- Obligation 4 — Not done. No restoration matrix or serialized-class measurements. No files touched.
- Obligation 5 — Stopped on the disagreement detailed at the end of this report. The guide remains unchanged.
- Obligation 6 — Not done. No registry rename. No files touched.
- Obligation 7 — Not done. No stripe assertion changes. No files touched.

The shell invocations returned exit code 0. The commands were:

```sh
cat ./tmp/units/f4-terrain.md
cat ./tmp/units/f4-brief.md /home/user/scaffold/AGENTS.md /home/user/scaffold/.agents/orchestration.md
cat /home/user/scaffold/AGENTS.md
cat /home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,patterns,documentation,writing,browser}.md
git status --porcelain; git log -1 --format='%h %D'
cat src/browser/Delegate.ts tests/src/browser/Delegate.test.ts
grep -n -A 65 -B 4 '^## Deviation protocol' /home/user/scaffold/.agents/orchestration.md; grep -n -A 32 -B 4 'host reinserted\|#activate(event\|reacquires a pruned host' tmp/units/f4-brief.md src/browser/Delegate.ts tests/src/browser/Delegate.test.ts; git diff --stat; git status --porcelain
```

The combined brief/contracts output and combined rules output were truncated. The terrain output was complete. The coding contract was read separately, and the deviation protocol was retrieved explicitly. Contract loading stopped at the disagreement; this report makes no claim that every required file was read in full.

No gate chain ran after a final implementation edit because implementation stopped before edits. No npm command ran, and npm 11.19.1 was not confirmed. The report was written with the patch tool under the ignored `tmp/units/` directory.

The Obligation 2 sweep did not run. Its requested fields are `target`, `currentTarget`, `relatedTarget`, and `composedPath()`, across the owned files. There is no sweep result from this unit.

The Obligation 4 serialized-class observations were not measured. There are no before-and-after strings from this unit.

The oracle fixture was not refreshed. There is no fixture header diff and no measured `browser.version()` string from this unit.

The `npm test` whole-chain observation was not taken. This report claims no passing or failing gate result.

The repository checks produced the following readings before the report write. The `git status --porcelain` command printed nothing. The `git diff --stat` command printed nothing. The `git log -1 --format='%h %D'` command printed:

```text
751c3ed HEAD -> claude/inspiring-allen-t4qzv1, origin/claude/inspiring-allen-t4qzv1
```

The deviation concerns reacquisition timing.

- Expected: Obligation 5, at `tmp/units/f4-brief.md:190`, requires the guide to state that “a host reinserted before that click is reacquired.” The referenced click is the next click that reaches the root.
- Found: A host reinserted before the root's next click retains its existing engine. The tree releases ownership only when the host is outside the root during a click. Reacquisition requires a prior release.
- Exact evidence: The terrain's “The delegation's release ordering” section says the delegate destroys engines whose hosts the root no longer contains. In `src/browser/Delegate.ts:53`, `if (this.#root.contains(button.host)) continue` skips destruction and ownership deletion for a reinserted host. In `src/browser/Delegate.ts:69`, the delegate retrieves the existing engine with `this.#buttons.get(host)` and constructs an engine only when none exists. The case “reacquires a pruned host after reinsertion” in `tests/src/browser/Delegate.test.ts:289` executes `host.remove()`, then `root.click()`, then `root.append(host)`, then `host.click()`. Its reinsertion follows the pruning click.
- Done: Read the terrain in full, checked HEAD and tracked status, located the contradictory requirement, and compared it with the delegate implementation and existing proof.
- Not done: Implementation, documentation edits, rename, fixture refresh, measurements, and gates. No tracked file changed. No agent spawned.

The user's stop instruction and the brief's disagreement rule require this stop. The report does not resolve the wording or alter the plan. The timing finding rests on source inspection; no additional runtime probe ran. The existing test's behavior was inspected but not executed in this unit. No other unverified success claim is made.