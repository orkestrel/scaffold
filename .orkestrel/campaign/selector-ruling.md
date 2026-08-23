# The CommonJS selector: stop predicting, start observing

Four selectors have shipped and all four were wrong. This records the ruling rather than briefing a
fifth patch of the same shape.

## The four attempts

| attempt | predicate | broken by |
| ------- | --------- | --------- |
| `entry.module === false` | "declares no import condition" | a dual subpath — never entered the probe |
| `resolveTarget(…, commonjsConditions) !== undefined` | "something resolves" | an ESM-only package — `default` matches every set |
| walk traversed an explicit `require` key | "declares support" | `module-sync` first, and a `node` branch with no `require` key |
| resolve under `['node','require']`, classify the target's extension and root `type` | "the target is CommonJS" | an extensionless target, and `.js` under a nested `package.json` scope |

Each was narrower and more defensible than the last. Each passed a review. Each was broken by a shape
nobody had tried.

## Why a fifth patch of the same shape is the wrong move

Every attempt has been an attempt to **predict** Node's answer. The fourth got closest and its
remaining gaps name what predicting actually requires: the file extension, the nearest enclosing
`package.json` between the target and the package root, the extensionless case, and whatever else
Node's format resolution does that nobody has enumerated. That is not a predicate — it is a
re-implementation of `ESM_FILE_FORMAT` maintained by hand inside a generated test file, and the next
shape nobody tried will break it too.

Measured, both against real Node:

```text
extensionless under require, "type": "module"   node: requires fine   predicate: false
.js under a nested "type": "commonjs"           node: requires fine   predicate: false
```

## The ruling

**The proof must observe CommonJS consumability rather than predict it.** It already spawns a real
CommonJS driver that requires the specifier, and that drive is the ground truth the predicate has
been trying to guess. The compile probe belongs downstream of an observation, not of a prediction.

This is the discipline `AGENTS.md` already states — run the question rather than reasoning about it —
applied to a place where four rounds of reasoning have each produced a plausible wrong answer.

Designing the observation is objective work: what the stage runs, when it runs it, what it does when
the require legitimately throws, and how the result reaches `selectEntries` without making the proof
depend on its own drive order. That is the next unit's subject, and it is a change of shape rather
than another condition list.

## What stands regardless

The audit's runtime matrix supported the reason of record independently: core-only
`{imports: false, branch: false}`, app-browser `{imports: true, branch: false}`, published-browser
`{imports: true, branch: true}`. The rule consolidation was confirmed to have lost no obligation. The
emitted copy of the reason of record is correct; only the compiler copy is mangled, by a botched
find-replace no gate can see because a comment is syntactically valid prose.
