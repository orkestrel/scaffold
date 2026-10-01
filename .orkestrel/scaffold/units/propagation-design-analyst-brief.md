# Unit propagation-design (objective lane) — surfaces and extensions in the scaffold generator

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief. Executor: BENCH_ENGINE. You hold the objective lane: the generator's data flow, ownership and repair semantics, the config proof, the adoption path, and what breaks. A subjective lane runs blind on the same brief on another engine; you never see its answer. Perform the whole design yourself and spawn nothing. Edit no tracked file in either checkout; the Orchestrator reads `git status --porcelain` before and after your run. A probe lives under `C:/Users/mikes/WebstormProjects/scaffold/tmp/probes/` and is deleted before you return; a scratch adopter you generate with the scaffold CLI lives under `C:/Users/mikes/WebstormProjects/scaffold/tmp/` too and is deleted before you return. Never install, commit, or run a mutating tree-wide command.

## Objective and questions

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-design-brief.md` from disk and answer its nine questions in its output shape, as the `analyst` lane. `codex exec -C` points at the scaffold checkout; the reference implementation is the veneer checkout at `C:/Users/mikes/WebstormProjects/veneer` (read-only). The scaffold CLI runs as `node dist/bin/main.js <verb> …` after `npm run build` in the scaffold checkout, or through `npx scaffold` where the built entry exists; read `guides/scaffold.md` § Command line for the verbs and options before running one against a scratch directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-design-analyst-proposal.md` with exactly the document the brief's Output section specifies, headed `# propagation-design — analyst proposal`, and return it verbatim as your final message. Cite `path:line` for every fact from either tree. No process diary.
