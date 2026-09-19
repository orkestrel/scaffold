# Routing ledger — Rough Notes redesign, 2026-09-16

## Bench liveness, probed at session start

| Bench       | Probe                                                                 | Result                                        |
| ----------- | --------------------------------------------------------------------- | --------------------------------------------- |
| Codex       | `codex --version`                                                     | `codex-cli 0.153.4`                           |
| Codex       | Bounded `codex exec --json --sandbox read-only` round trip            | Live on `gpt-5.6-sol` and on `gpt-6-astra`    |
| Cursor Grok | Versioned entry `$LOCALAPPDATA/cursor-agent/versions/2026.09.10-fd3934a` | Live — absorption lane round-tripped       |

No bench is dark. No lane substitution is forced.

## Model substitution on the Codex bench

`.agents/transports/codex.md` pins `CODEX_ANALYST_MODEL=gpt-5.6-sol`. The user instructed
mid-campaign to route the Codex lanes on `gpt-6-astra`. The user's current instruction outranks the
transport pin, so every Codex lane in this campaign runs `--model gpt-6-astra` and this line is the
record.

The `analyst` design lane was launched first on `gpt-5.6-sol`, stopped before it wrote an answer,
and relaunched on `gpt-6-astra`. The stopped run's journal is `tmp/codex/redesign-analyst.jsonl`;
the run that counts is `tmp/codex/redesign-analyst-astra.jsonl`, thread
`01a0aaac-1fdc-7fd3-b1b2-ae76de710b69`. The superseded launch script
`tmp/codex/run-analyst.sh` stays beside its successor `tmp/codex/run-analyst-astra.sh`.

## Units dispatched

| Unit                | Role      | Engine                        | Lane       | Journal                                   |
| ------------------- | --------- | ----------------------------- | ---------- | ----------------------------------------- |
| `absorb-ui`         | `grok`    | Cursor Grok `cursor-grok-4.6-high` | absorption | `tmp/cursor/absorb-ui.jsonl`, session `80f5a1a3-aa96-443d-87d8-51b5a243bfd8` |
| `redesign-design`   | `planner` | Opus 5, native subagent       | subjective | native transcript                         |
| `redesign-design`   | `analyst` | GPT-6 Astra `gpt-6-astra`     | objective  | `tmp/codex/redesign-analyst-astra.jsonl`, thread `01a0aaac-1fdc-7fd3-b1b2-ae76de710b69` |

Both design lanes received the identical brief `tmp/units/redesign-design-brief.md`, ran in clean
contexts, in parallel, blind to each other.
