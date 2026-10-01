# Unit foundation-design-analyst — objective lane of the foundation design round

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief. You hold the objective lane of a blind design round: cascade semantics, resolution, toolchain behaviour, proofs, and package consumption. A subjective lane runs on another engine in a separate clean context; you are not shown its answer and it is not shown yours.

Perform the work yourself and spawn nothing. Edit no tracked file.

## Brief

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-brief.md` first and execute it exactly: read every evidence path it names that your answers need, answer all nine questions, and return the document in the shape its Output section fixes. Where a question turns on a browser behaviour (questions 1, 2, 4), settle it by a run, not an argument: write a probe under `C:/Users/mikes/WebstormProjects/veneer/tmp/probes/`, run it with `npm run test:probe -- <file>` from that checkout (Node), or drive Playwright's Chromium from a probe as the audit lane did, and delete the probe before you return. Record each run's command and its reading beside the answer.

## Host

Windows 11, Node 22, npm 12.0.2; `codex exec -C` points at `C:/Users/mikes/WebstormProjects/veneer`, which has `node_modules` installed and `dist/` built. The sandbox is `danger-full-access`; the Orchestrator reads `git status --porcelain` after your run and discards a report that changed a tracked file. Another writing unit may have left uncommitted changes in the tree; read the working tree as it is. Never install; never run a tree-wide mutating command. A Windows shell write can re-encode text: write a probe with your patch tool.

## Output

Your final message is the document the brief's Output section fixes, headed `# foundation-design — analyst proposal`, with `path:line` citations for every fact taken from the tree or the records and the command behind every measurement. No process diary.
