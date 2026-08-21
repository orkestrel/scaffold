# Design round 4: the process family

## Role and engine

This brief goes independently to the subjective lane (`planner`, Opus 5) and the objective lane
(`analyst`, GPT-5.6 Sol). Blind lanes, read-only, spawn nothing.

## Objective

Rule on `@orkestrel/process`'s open rows so implementation units can dispatch: the
stdin-delivery failure surfacing, bare-`\r` handling in `lines`, and the `bytes`/`write`
surface synthesis for `ProcessInterface`. The original ruling texts for the last part are not
in any checkout — re-derive from the code and the consumer evidence, not from memory.

## Context

Repository: `C:/Users/mikes/WebstormProjects/process` (0.0.4, clean, installed). Authority:
`AGENTS.md` and the `.claude/rules/*.md` set in that checkout. Guide: `process/guides/*.md`.
Downstream runtime consumers: mcp, sea, scaffold (direct), probe (through mcp) — a published
change cascades to them in layer order, and supervisor consumes it too
(`supervisor/package.json` pins `process ^0.0.4`).

Ground (from the fleet absorption, verify first-hand):

- `lines` is `ProcessInterface.lines: AsyncIterable<string>` (`src/core/types.ts:176`),
  implemented by `createInterface({ input: this.#child.stdout, crlfDelay: Infinity })`
  (`src/server/Process.ts:133-134`). No `'\r'` literal anywhere under `src/`. What readline
  does with a LONE `\r` on the engine's Node line is unmeasured — measure it.
- Stdin errors are swallowed: `this.#child.stdin.on('error', () => undefined)`
  (`Process.ts:138`) and the same in `execute.ts:143`. The child's own `error` event is
  forwarded. `send(text)` writes `${text}\n` and resolves `false` on a write-callback error
  (`Process.ts:206-208`) without emitting anything. The ROADMAP row: a child that closes
  stdin and stays alive makes the consumer's prompt write fail silently, so the failure
  surfaces through the consumer's own timeout instead of a fast `PROTOCOL`; supervisor's
  `CLIProvider` keeps a timeout as its backstop until this lands.
- Windows measurement (2026-08-21, this campaign): a child that closes its own fd 0 does NOT
  break the parent's pipe on this host — the next `stdin.write` returns `true`, no stream
  error, child alive — while POSIX refuses the write with `EPIPE`. Any stdin-delivery design
  must state what it can and cannot detect per host.
- `ProcessInterface`'s write surface is `send(text): Promise<boolean>` (`types.ts:183-195`).
  The lost ruling reportedly synthesized `bytes` and `write` members; treat that as a rumor —
  derive what the interface actually needs from its consumers (mcp's transports, sea's
  `runShell`, scaffold's process uses, supervisor's providers — read their call sites).

## Subjects

### A. Stdin-delivery failure

Rule: the invariant (what a consumer must be able to learn, how fast, through which member or
event), the mechanism (where the swallow becomes a surfaced failure — an emitted event, a
rejected `send`, a `PROTOCOL`-coded error — and what stays deliberately quiet), the per-host
honesty (what this host cannot deliver, stated where a consumer meets it), and the proofs.
Name the blast radius: which consumers' behaviour changes, and whether the change is additive
or breaking for mcp/sea/scaffold/supervisor.

### B. Bare `\r` in `lines`

MEASURED (readline-cr-facts.cjs, Node v24.18.1, 2026-08-21, `crlfDelay: Infinity`): a lone
`\r` is a line terminator in EVERY position — `"a\rb\n"` → `["a","b"]`; a CR ending one chunk
with the LF opening the next reassembles as one CRLF break (`["a","b"]`, no phantom empty
line); `"a\r\rb\n"` → `["a","","b"]`; a bare `"\r"` alone → `[""]`. So `lines` already frames
bare CR as a break. Rule: is that the documented contract (state it in the guide and pin it
with a proof), or does the package owe different framing? Weigh against "no second parser" and
what the guide currently claims about `lines`.

### C. The `bytes`/`write` surface

From the consumer call sites, rule whether `ProcessInterface` owes a byte-level write or a
byte-stream read surface at all, what its shape is if so (single-word members, entity rules),
and what is refused. A surface no consumer needs now is refused by the minimal-API law
regardless of what the lost ruling said.

## Output

Per subject: `Ruling` (invariant, constraint, consumer obligation), `Units` (role AND engine,
ownership, acceptance criteria), `Row` (the ROADMAP disposition wording), `Evidence`
(file:line). Then `Tensions` and `Risks`.

## Deviation contract

Read-only. Report file:line mismatches as findings and continue.
