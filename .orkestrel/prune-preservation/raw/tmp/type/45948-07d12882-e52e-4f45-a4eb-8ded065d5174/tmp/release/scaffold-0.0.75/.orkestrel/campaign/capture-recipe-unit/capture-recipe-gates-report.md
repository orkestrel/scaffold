# Capture recipe release gate

The independent Terra verifier ran `npm.cmd run prepublishOnly` in `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75` against frozen recipe successor3. Native process exit was 0. Measured duration was 267.883s on 2026-09-18. Candidate HEAD was c50efef0f741caafe1a80c1ef9ee4004f8be0f2b with the expected skill, capture reference, and generated host inventory edits.

The command used `$started = Get-Date; & npm.cmd run prepublishOnly; $exitCode = $LASTEXITCODE; $elapsed = ((Get-Date) - $started).TotalSeconds; Write-Output ('GATE_EXIT=' + $exitCode); Write-Output ('GATE_DURATION_SECONDS=' + [System.Math]::Round($elapsed, 3)); exit $exitCode`.

The ordered format, lint, typecheck, build, ordinary test chain, and release-mode distribution gate completed. Terminal session46473 reported GATE_EXIT=0 and GATE_DURATION_SECONDS=267.883. Source status matched before and after.

## Recovered terminal evidence

The verifier returned these measurements from its actual output. None of its output chunks reported truncation. They are excerpts, not an on-disk full log.

| Stage | Actual terminal reading |
| --- | --- |
| format:check | All matched files use the correct format;3939ms |
| lint:check and check | No diagnostics; execution advanced into build |
| build | Successful emits260ms,223ms,31ms; host and inventory staging completed |
| test chain summaries in emitted order | 426passed/21.37s;466passed,7skipped/10.20s;267passed/58.30s;110passed/2.54s;173passed,1skipped/5.87s;162passed,3skipped/6.89s;23passed/3.59s |
| release distribution | `vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution --mode release`;7passed,1skipped/130.32s |

Observed notices were API Extractor's bundled TypeScript5.9.3 against target6.0.3, ignored Vite build.lib.formats for the server build, and NodeDEP0190 from distribution. No failure excerpt was reported.

## Metadata correction and recording deviation

The verifier's initial final response named installed @orkestrel/test0.0.17. That lookup ran from canonical Scaffold, while the actual gate ran from the isolated candidate. The verifier disclosed the misplaced lookup. Root independently read candidate package.json, node_modules/@orkestrel/test/package.json, and package-lock.json from the candidate cwd: declared^0.0.18, installed0.0.18, locked0.0.18.

The verifier did not write the requested full gate log or report. Its terminal output existed in tool session46473; it returned the excerpts and exact command on follow-up. Root retains this returned evidence and the deviation. This report does not invent a filesystem transcript or claim the requested logging criterion was met. The measured gate outcome is accepted; future tracked gate commands must preserve their output at launch.

Publication, refreshed archive, final registry consumer adoption, and clean field proof remain separate acceptance conditions. This gate proves only the frozen local candidate.
