# Dependent release-state evidence sweep

Act as Cursor Grok performing this bounded, read-only repository scouting task. Do not act as a
bridge, do not resolve or launch another provider, do not edit files, and do not run gates,
installs, fetches, publishes, or commands that change state.

## Question

What retained release obligations and local preparation state remain in Brief, MCP, Middleware,
Program, Worker, and Workflow after the preceding runtime layer was handed to the owner? Return
evidence, not a design or verdict.

## Authority and paths

Read Scaffold's `AGENTS.md`, `.agents/orchestration.md`, the portability, writing, quality,
documentation, and workspace rules, `orkestrel-publish/SKILL.md` with its `wave.md` and
`window.md` references, `orkestrel-align-packages/SKILL.md` with its `fleet.md` and
`integration.md` references, and each subject's `guides/README.md` plus matching guide.

Scaffold is `C:/Users/mikes/WebstormProjects/scaffold`. Subject checkouts are canonical siblings
under `C:/Users/mikes/WebstormProjects`, never copies or worktrees. Campaign artifacts are under
Scaffold's `.orkestrel/campaign/docs-parity`. Windows PowerShell is the outer shell. Git Bash is
`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe`. Use forward-slash paths and plain
script-file invocations for program commands.

## Scope

For Brief, MCP, Middleware, Program, Worker, and Workflow, read the manifest; local `git status`,
`HEAD`, and `origin/main` ancestry; installed Guide and Scaffold package versions; package
scripts; `tests/guides.test.ts`; retained d7n audit, fix, check, verify, and closure packets; and
applicable main correction records.

For every named package, report runtime, peer, and optional Orkestrel ranges; development-tooling
pins; local branch, `HEAD`, and dirty paths; whether the native `GuideCommand` entry is present;
the retained accepted and open items; and each absent packet. Report local refs as local readings,
not freshly fetched remote state. Read the catalog only as recorded evidence. Preserve Ollama and
all other out-of-scope work.

## Output

Return a concise fact matrix with `file:line` evidence for each named package. Include actual git
status evidence. Do not infer a closed gate from an old report or manufacture a closure where no
verdict exists. Do not provide raw dumps, recommendations, design, decisions, source edits, or
authored prose counts. Name every package that the distillate did not reach under `Unknowns`.
