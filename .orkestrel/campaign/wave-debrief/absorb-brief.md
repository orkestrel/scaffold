# Unit wave-debrief-absorb — distil the publish wave's record

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI. You are a read-only bench engine reading this brief inside your own CLI: perform the assignment directly and spawn nothing. Never create, edit, or delete a file; never run `npm`, `git` writes, or any command that changes the tree.

## Objective

Return, for each question below, the verbatim evidence lines with `file:line` pointers from the record named in § Context, so an instruction-set audit can rule on the wave's process from the record rather than from recollection.

## Context

**The campaign.** The Orkestrel publish wave of 2026-09-04 (UTC): scaffold `0.0.61`, guide `0.0.16`, then layers L0 to L6, scaffold `0.0.62` and guide `0.0.17` before L3, scaffold `0.0.63` after a closing development re-pin round; then on 2026-09-05 the pushes to `main`, the re-pin to scaffold `^0.0.63`, a fleet `lint`-script alignment, the prune of the campaign folder, and ollama's service suite on a local daemon.

**The record** (all paths relative to the working directory `/home/user/scaffold`, read-only):

- `tmp/units/wave-record/report.md` — the preparation report (the plan, the round table, the peer edges).
- `tmp/units/wave-record/ledger.md` — the ledger: what landed when, with the registry confirmation, the re-baseline, the login, the closing rounds.
- `tmp/units/wave-record/*.sh`, `*.mjs` — the instruments as retained: `prep-one.sh`, `prep-one-2.sh`, `prep-one-3.sh` (three generations of the per-package visit), `publish-layer.sh`, `login-retry.sh`, `login-diag.sh`, `repin.mjs`, `distdiff2.mjs`, `devstale.mjs`, `release-commit.sh`, `push-main.sh`.
- `tmp/units/wave-record/work/` — the working logs, one copy per file: `login*.log`, `login-diag.log`, `prep-<pkg>*.log` (per-package visit logs, with `-overwrite`, `-install`, `-install2`, `-prepublish`, `-audit`, `-format` members), `layer-<slice>.log` (per-slice visit runs), `publish-<pkg>-1.log`/`-2.log` (upload journals under `script`), `publish-layer-<pkg>.log` (layer chain logs), `devround-*.log` (closing re-pin round), `regate*.log`, `push-main*.log`, `ollama-*.log`, `release-<pkg>-msg.txt` (release commit messages), `scaffold-*.log`, `prep-scaffold-*.log`.

**Law.** `AGENTS.md` § Writing (never state a count; name members); `.claude/rules/writing.md`. Quote verbatim; do not paraphrase a log line. Strip terminal control sequences from a quote where they obscure it, and say so.

**Host.** Linux, bash, no network needed. The logs may carry `\r` and ANSI sequences from `script`.

## Questions

Answer each with the exact lines and their `file:line` pointers. Where the record holds no evidence for a question, say `no evidence in the record` for that question rather than inferring.

1. **The login.** From `work/login.log`, `work/login-1.log`, `work/login-diag.log`, and `login-retry.sh`, `login-diag.sh`: the `403` answer and its body, the drop to the legacy `Username:` prompt, the `202` poll cadence on one connection, and how many attempts the retry loop minted before one survived its first poll (quote each minted URL line with its time, where the log carries times). Which npm version each log names.
2. **The overwrite refusal.** The line where `scaffold overwrite` refused a tree with uncommitted changes (search `work/prep-*-overwrite.log`, `work/prep-*.log`, `work/layer-*.log` for `uncommitted`), and the diff between `prep-one.sh` and `prep-one-2.sh` that answered it (name the lines added).
3. **Install after overwrite.** Evidence that `scaffold overwrite` moved manifest ranges after the first install so that a second install was needed: quote the `prep-*-install2.log` head for one package and the `prep-one-3.sh` lines that run the second install, and the `regate-guide*.log` lines that show the lockfile regenerated.
4. **The one-time code's life.** From `work/publish-layer-*.log` and `work/publish-<pkg>-1.log`/`-2.log`: every `EOTP` line with its file and time; for each layer chain log, the first and last `+ @orkestrel/<pkg>@<version>` acceptance lines with their timestamps (or the `Script started`/`Script done` stamps beside them) so the number of uploads and the seconds one code carried can be read; the L4 first code that expired unused (`publish-brief-1.log` and `publish-brief-2.log`).
5. **The acceptance line as the verdict.** The `Your package is being processed and may take a few minutes to become available.` line beside a `+ @orkestrel/...` line, and the layer-chain lines in `work/publish-layer-abort.log`, `-agent.log`, `-brief.log` that stopped on `serves nothing yet`; the `publish-layer.sh` lines that read the acceptance line.
6. **Timing reds re-run alone.** The process package's failing assertion under a shared slice (search `work/devround-*.log`, `work/regate2-process*.log`, `work/layer-*.log`, `work/prep-process-prepublish.log` for `FAIL`, `AssertionError`, `chunk`, `timed out`), quoted with the file and line, and the green re-run line.
7. **Guide's early release.** From `work/layer-L0A.log`, `work/layer-L0B.log`, `work/layer-L0C.log`, `work/prep-<pkg>-prepublish.log` for the L0 packages (codec, contract, msg, sse, test): the `check` failure lines naming `extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, or `keyword`; and from `work/guide-check.log`, `work/guide-ci.log`, `work/guide-release-msg.txt` the evidence guide typechecked against registry ranges and released early.
8. **Peer ranges as ordering edges.** From `work/release-middleware-msg.txt` and `work/release-mcp-msg.txt` the peer ranges each release carries; from `report.md` the lines that reorder middleware and mcp after server and the reason given.
9. **Scaffold's dist moved on a development re-pin.** From `work/devround-*.log`, `work/regate-scaffold*.log`, `work/scaffold-release-3-msg.txt`, `work/prep-scaffold-6*.log`: the `distdiff` output lines that reported `dist/src` moved for scaffold and the reason the release message gives.
10. **The false BUMP-OWED readings.** From `work/devround-*.log` (toolbox and ollama rows) and `distdiff2.mjs`: the lines that reported a bump owed while the published tarball had not been fetched, and the later lines reporting the dist unmoved once it was; the `distdiff2.mjs` lines that decide what happens when the baseline directory is absent.
11. **Durations.** For each layer (L0, L1, L2, L3, L4, L5, L6) and for the scaffold and guide own-account releases: the first visit's start stamp and the layer's last registry confirmation stamp, from `work/layer-*.log` `Script started`/`date` lines and `ledger.md`. Report them as a table of layer, start, close, elapsed.
12. **The ollama service suite.** From `work/ollama-test-service.log` and `work/ollama-test-service-2.log`: the timeout line naming the provider file's warmup on the first run, and the `Test Files`/`Tests` summary lines of both runs; from `work/ollama-up.log` the model-present or model-pulled line.
13. **The pushes to main.** From `work/push-main.log` and `work/push-main-errors.log`: every `NONFF` or `DIRTY` line, and the scaffold merge line from `work/scaffold-merge-main.log`.
14. **Instrument authorship.** Whether the record holds a brief or a report file for any instrument (search `tmp/units/wave-record/` for `brief` or `report` in file names beyond `report.md`); name what exists.

## Output

Return only:

- `Question`: one line naming the unit.
- `Evidence`: per question number, the verbatim lines with `file:line` pointers, and the table for question 11.
- `Distillate`: at most twenty lines: the deviations and recoveries the evidence shows, each with one pointer.
- `Unknowns`: every question the record could not answer, and every input file the reading did not reach.
- `Journal`: the journal path and the session id from its `init` event.
- `Deviation`: any command failure or containment change.

No raw file dumps, no decisions, no design, no edits.
