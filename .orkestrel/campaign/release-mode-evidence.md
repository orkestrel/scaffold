# Executed evidence — the release-mode gate depends on an unguarded config shape

Measured 2026-08-23 with Vitest 4.1.11 from `/home/user/scaffold/node_modules`.

The objective lane reported that `--mode release` reaches `import.meta.env.MODE` only when a root
`projects` entry is a function. The Orchestrator's first probe contradicted it, then isolated the
variable and confirmed it. The first probe was wrong: it varied the configuration form — a plain
object exported from a `.mjs` file — rather than the entry form, and that form never propagates the
mode at all.

## The isolated reading

Held constant: a `.ts` configuration, `defineConfig` from `vitest/config`, one project, the same
test file, and `--mode release` on the command line. Only the `projects` entry form varies.

| `projects` entry | `import.meta.env.MODE` |
| ---------------- | ---------------------- |
| function         | `release`              |
| inline object    | `test`                 |

Without `--mode release`, the function form reports `test`, so the flag is what moves it.

## What this means

`vite.config.ts:238` emits bare function references, which is why the publish gate works today:
`prepublishOnly` runs `npm run test:distribution -- --mode release`, and the proof reads
`import.meta.env.MODE === 'release'` to decide whether an unreachable registry fails or skips.

Nothing asserts that shape. A refactor of the root configuration to inline object entries would
keep every test green, keep the gate wired, and silently convert the release gate into a skip — the
proof would report success without ever having proved the artifact installs.

## Where a guard belongs, and what that costs

The subject is the root configuration, which is `tests/config.test.ts`'s stated subject in
`.claude/rules/workspace.md`. That file is **vendored**: `host.json:634` stores it, `dist/host/tests`
ships it, and `repair` restores it. A guard placed there protects every package's publish gate
rather than scaffold's alone, which is the only placement that matches the defect's reach.

It also moves a vendored byte, which turns the release carrying it from a `dist/src` release into a
vendored-byte release: bump, publish, re-pin `@orkestrel/scaffold` in every target, run `repair`
there, and prove each target's gates still green.
