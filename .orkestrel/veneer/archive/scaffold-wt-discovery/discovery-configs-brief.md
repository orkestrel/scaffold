# Unit discovery-configs — census every config, mode, and project filter a gate runs

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-discovery`, branch `discovery-configs` at `54f757a7c` (scaffold `main`). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The defect

`.agents/skills/orkestrel-harden/scripts/discovery.ts` runs `vitest list` once, against the one `--config` it was given (default `vite.config.ts`), and reads only the `--project` names the root script chains pass. A gate that runs a Vitest script with its own `--config`, a `--mode`, or no `--project` filter is therefore misread. Measured on veneer (`C:\Users\mikes\WebstormProjects\veneer`, run as `node C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden/scripts/discovery.ts --json` from its root, 2026-10-03), exit 3 with:

- `ungated`: `app:vue (chromium)`, `src:bootstrap (chromium)`, `src:styles (chromium)`, `src:tailwindcss (chromium)`, `src:vue (chromium)`; veneer's `package.json` gates these through `npm run test:src:bootstrap` (`vitest run --config configs/src/vite.bootstrap.config.ts`, no `--project`) and its siblings;
- `undiscovered`: `tests/app/browser/integration.test.ts` and `tests/app/vue/integration.test.ts`, which only `test:journey` (`--config configs/app/vite.journey.config.ts`) and `test:journey:vue` (the same with `--mode vue`) collect.

`54f757a7c` already folds a browser instance's name (`NAME (BROWSER)`) into its gated base name; keep that.

## Work

1. Read each Vitest script in a root chain as a gate over a unit: its `--config` (default the script's `--config` option, else `vite.config.ts`), its `--mode` when present, and its `--project` names, where none means every project that config and mode define. Read the flags in both `--flag value` and `--flag=value` forms.
2. Run `vitest list --json=FILE` once per distinct config and mode a gate reaches (and once for the script's own `--config` option), with that unit's project filter where every gate on it names projects, and merge the collected entries. A project or file is gated when any unit's gate reaches it. Keep the existing outputs, flags, and exit codes; extend `Project` and the JSON only where a reader needs the unit, and update the opening comment and `SKILL.md`'s description of the script to match.
3. Proofs in `tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts`, each a scratch fixture driven as a child process, each shown red against `54f757a7c` and green after (record command and counts): a wrapper config gated with no `--project`; a file collected only by a second config's script; a `--mode` that changes what a config collects; and a control where a project in a second config that no chain runs is still reported ungated.
4. Run veneer's census again from veneer's root with your script by absolute path, and report its output; it must no longer flag the gated wrapper projects or the journey files.
5. Gates, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:skills`, `npm run test:policy`, `npm run test:guides`; then `git diff --check`. One commit. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/discovery-configs-report.md` and return it as your final message: the change, each proof's red and green commands and counts, veneer's census before and after, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only if a gate unit cannot be read from the script text without running the script, and report: expected, found, evidence, and one hypothesis.
