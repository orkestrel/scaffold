# Unit scaffold-defects-3 — withdraw the Linux-only publish rule

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-defects`, branch `scaffold-defects` at `a8344e019`. Commit once more at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Ruling

The Orchestrator overrules the S5 policy of `a8344e019`: release directories may be packed and published from Windows, the only host this campaign has. A Windows pack records `0644` for an entry git tracks as `100755`; scaffold writes `0o755` itself when it vendors an executable file, so a workspace gets the same files from either host's pack.

1. `.agents/skills/orkestrel-publish/scripts/window.ts`: remove the `process.platform !== 'linux'` refusal of `--publish`, and its usage-line and `SKILL.md` wording ("requires Linux"); keep the linked-worktree and submodule refusal with its upward search exactly as `a8344e019` made it. Update `tests/agents/skills/orkestrel-publish/scripts/window.test.ts` so no case depends on the host being Linux; keep every linked-worktree case.
2. `.agents/skills/orkestrel-publish/references/wave.md`: replace the Linux packing directive with one directive line: "Compare release packs between hosts by paths, sizes, and content hashes, and report executable-mode differences separately; a pack made on Windows records `0644` for an entry git tracks as `100755`."
3. `.agents/skills/orkestrel-publish/references/window.md`: restore the Windows operator-driven paragraph `a8344e019` removed (the operator runs the exact `npm publish` command in a real terminal; the Orchestrator keeps everything before and after the upload; the one-time-code path through `window.ts` runs on every host; the fifo stdin law still binds a browser-authorized upload there), as it read at `060f390b9`, edited only where the linked-worktree rule now applies.

## Acceptance

After the last edit, in order, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:skills`, `npm test`, `npm run build`. Then `git diff --check`, one commit on `scaffold-defects`, and an empty `git status --porcelain`.

## Output

Write the report to `tmp/codex/scaffold-defects-3-report.md` and return it as your final message: each change, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

On any conflict with this brief, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
