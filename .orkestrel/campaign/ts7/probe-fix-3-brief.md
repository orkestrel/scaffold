# Unit ts7-probe-fix-3 — successor of ts7-probe-fix-2 edit 8: the loader's two branches read one shape and typecheck

Successor of `tmp/units/ts7-probe-fix-2-brief.md` (report `/home/user/fleet/probe/tmp/units/ts7-probe-fix-2-report.md`). What changed: edit 8 as prescribed — `const served = bridged.value` then `return served` — reddens `npm run check`, because the guard narrows the binding from `require`'s `any` to a record carrying `createProgram`, which the overloads' return type `typeof TypeScript` does not accept, while the workspace branch's `||` leaves `loaded` wide. The shape the subjective lane prescribed (round 2, F4) is the one that typechecks: alias each value as `unknown` for the guard and return the value `require` produced. This unit lands that shape at both sites.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe`. Perform the assignment directly and spawn nothing. Never write in `/home/user/scaffold`.

## Objective

Both branches of `loadWorkspaceModule` read their value through the same `unknown` alias and return the raw value, the comment says why, and `npm run check` exits 0.

## Context

**Law.** `AGENTS.md` § Non-negotiable rules (no `as`, no `any` written), `.claude/rules/typescript.md`. Skill: none. Guide: `guides/probe.md` (no guide change).

**Host.** Node v22.22.2. The working tree carries the earlier units' uncommitted edits; keep them. `src/server/helpers.ts:431-444` reads, at 16:58:

```ts
	const loaded = outcome.value
	// `createProgram` is the member the API's absence is read from, because a compiler that publishes
	// it publishes the rest of the in-process surface this package drives.
	if (specifier !== 'typescript' || (isRecord(loaded) && isFunction(loaded.createProgram))) {
		return loaded
	}
	const bridged = attempt(() => require('@typescript/typescript6'))
	if (bridged.success) {
		// The bridge answers the same reading its workspace's compiler answered, because a bridge
		// that resolves and publishes no compiler serves this stage no better than the entry it was
		// asked to stand in for, and returning it unread defers that refusal to the first call.
		const served = bridged.value
		if (isRecord(served) && isFunction(served.createProgram)) return served
	}
```

## Edits

1. Replace `const loaded = outcome.value` with `const loaded: unknown = outcome.value`, and `return loaded` (the line inside that `if`) with `return outcome.value`.
2. Replace `const served = bridged.value` with `const served: unknown = bridged.value`, and `return served` with `return bridged.value`.
3. Extend the first comment (the one beginning "`createProgram` is the member") with one sentence: "Each branch reads its value through an `unknown` alias and returns the value `require` produced, because the guard narrows the alias to a record carrying `createProgram` rather than to the compiler's module type the overloads return."
4. Run `npm run format` to converge, then the gates.

## Scope

**Owned.** `src/server/helpers.ts` (the lines above only). **Off-limits.** everything else; no commit, no push, no publish, no discarding git command.

## Gates

`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, then `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts tests/src/server/stages/TypeStage.test.ts`, reading each exit code. Record `npm run check` red before edits 1 and 2 (the standing condition) and green after.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-fix-3-report.md`: the red-then-green `check` readings, each gate's exit code, the scoped run, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit and on any need to edit a file outside `src/server/helpers.ts`.

## Acceptance criteria

1. `npm run check` exits 0 after the edits and exited 1 before them, both recorded.
2. `npm run format:check`, `npm run lint:check`, `npm run build`, and the scoped run exit 0.
3. `git status --short` lists the earlier units' files and nothing new.
