# Read the Ubuntu result

Automatic installation and the live service suite pass on Ubuntu24.04.5 with Node26.8.2 in run34676625435, job103507513066. The workflow checks Ollama commitd6e868d886f2968edbcaf125a207966a6ae8dd15. Read the retained run.json and run.log.txt under evidence/d7n-ollama-hook-linux-ci, or see the [Ollama workflow run](https://github.com/orkestrel/ollama/actions/runs/34676625435).

The service log records the official installer installing under /usr/local, creating the Ollama account and systemd service, and reporting the loopback API. The actual scripts/ollama.sh invocation then reports readiness. The following real service project passes on the CPU runner. The Node26 job also passes installation of the registry lock, formatting, lint, typecheck, build, and ordinary tests.

This reading proves automatic Linux installation and completed setup through the committed script, followed by real provider use. The log does not record process identities. Do not infer installer-started daemon reuse, invocation-owned group startup, failure cleanup, or a TERM-resistant child's termination from the successful job. Those lifecycle readings remain required before release acceptance. Windows reuse and HTTP negative controls remain separately retained evidence.

The workflow as a whole fails because job103507513115 uses Node22.12.0. That job stops at lint with ERR_UNKNOWN_FILE_EXTENSION for configs/policy.ts. It never reaches service setup. Its registry install also warns that the installed @orkestrel/sqlite0.0.11 dependency requires ^22.18.0 or >=24.4.0. The lint error is an executed reading; a later failure involving SQLite is unproved. No runtime floor, CI matrix, or shared lint launcher was changed. This is not a waived green CI run or a standing gate exemption.

The watcher exits 1 because the run fails. Its terminal receipts and logs are retained. No watcher remains active, and no upload ran.
