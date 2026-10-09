# Bench lanes

An external engine widens capacity and inherits no authority. Treat every bench output as a proposal until the Orchestrator verifies it against the tree. `.agents/transports/<harness>.md` owns each bench's command, sandbox, and recovery; this file owns what is true of every bench.

## Before the lane

- Probe the bench once per session with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts --cursor`, `--codex`, or `--claude` before its first lane, and again at any dispatch after a failure. `live: false` records the bench dark. A version string or a login status is not liveness.
- Write the brief with `scripts/brief.ts --unit <unit> --lane <bench>`; briefs never travel as shell arguments. Run `scripts/brief.ts --check` on it and fix every missing path.
- Name in the brief the host restrictions the transport contract records that this unit will meet. A proof that needs a restricted capability is taken on the host by the Orchestrator, and the unit records it as an observation naming the exact command.
- When the sandbox rejects a write, the unit stops and reports the rejection. It never tries another write mechanism, and the brief says so.
- A bench unit writes only its owned files and its checkout's `tmp/`. Name its report path there, or take the report from the last-message file.
- Launch one Grok lane at a time. An empty lane beside a live probe is starvation, so cut concurrency and re-run rather than recording the bench dark.

## During the lane

- The journal under `tmp/<bench>/` is the liveness signal and the recovery handle; `scripts/result.ts` reads both. Register the lane in the session task registry with subject, journal path, and session id.
- Never poll the bench from inside the driver. The Orchestrator owns the cap and the watch.

## After the lane

- Refuse a result whose journal path and session id are absent: it ran on the driver's engine.
- Read the answer with `scripts/result.ts`, never from stdout. Run `scripts/cite.ts` over it before reading it.
- Verify a writing lane with `git status --porcelain`, the diff, and scoped validation before integrating.
- A dispatch that fails on auth, quota, model access, or network is a fresh liveness result: record the bench dark and re-plan the lane on the substitute engine.
- Delete the brief, journal, `.err`, and last-message files when the unit is accepted.
