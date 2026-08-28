# Unit U4 — fix round: repair the retreat, and correct the prose it exposed

## Role and engine

`implementer`. Engine: Opus 5 (native). Routing note: the Codex bench is dark this session, so the
audit lanes and this fix both run on Opus. The round therefore has no engine independence from the
original writer; the Orchestrator has compensated by running every load-bearing claim rather than
reading it, and the evidence in this brief is measured, not derived.

## Context

Read `/home/user/process/tmp/units/shared-context.md` first. Then read the audit verdict at
`/home/user/scaffold/.orkestrel/process/consolidation-audit-verdict.md`; it states what was
sustained, what was dropped on evidence, and why.

The consolidation has landed and every gate is green. This unit carries the audit's findings. It is
a repair, not a redesign: do not revisit the placement, the naming, or the `Retention` removal.

## Owned files

- `src/server/helpers.ts` — edit.
- `tests/src/server/helpers.test.ts` — edit.
- `guides/process.md` — edit.

## Off-limits

Everything else. In particular `src/server/types.ts`, `src/server/index.ts`, `tests/guides.test.ts`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `README.md`, and `package.json`.

## Finding 1 — `trimHead` retreats when nothing was split

This is a regression this campaign introduced, and it is the unit's main work.

`trimHead` retreats from the cut over continuation bytes without checking whether a multibyte
sequence genuinely spans the cut. Before the capture bound changed, `execute` never reached that
retreat: its capture stopped at exactly `limit`, so `trimHead`'s early return at
`if (buffer.byteLength <= limit) return buffer` always fired. Giving the trim its lookahead byte
exposed the flaw.

Measured, by running the published 0.0.8 artifact against the current build. A child writing the
bytes `61 61 61 61 80` — four ASCII `a` then a stray continuation byte — captured at `limit: 4`:

```
published 0.0.8  stdout="aaaa" bytes=4
landed change    stdout="aaa"  bytes=3
```

A valid ASCII byte is dropped because the first excluded byte looked like a continuation byte.

### The repair

Retreat only when the bytes before the cut begin a sequence that genuinely extends past it. Walk
back from the cut over continuation bytes to the lead byte, read the length that lead byte
declares, and keep the full `limit` bytes unless that sequence actually reaches beyond the cut.

Decide the exact code yourself against the real file. These cases must hold, and they are the
acceptance criteria:

- `trimHead(Buffer.from('hello'), 3)` returns the three leading bytes. The existing documented
  example must not move.
- Four ASCII bytes followed by a stray `0x80`, trimmed at 4, returns all four bytes. This is the
  regression.
- `aa€` — `61 61 e2 82 ac` — captured to 4 bytes and trimmed at 3 returns `aa`. This is the repair
  the campaign exists for, and it must survive.
- A buffer whose bytes are all continuation bytes, trimmed at any limit, returns something rather
  than looping or throwing. State what it returns and why.
- A buffer shorter than the limit returns unchanged.

`trimTail` is not yours. It is not reached by this campaign's change and its behaviour is
unaltered; leave it alone.

## Finding 2 — the guide overstates one mechanism

`guides/process.md` § Output bounds says "Each capture reads one byte past that bound". That is
true of `execute` and false of `executeSync`, which hands `limit` to `spawnSync` as `maxBuffer` and
lets the host decide how much it delivers. The sentence sits in a section whose opening and closing
paragraphs both govern the two functions by name.

Scope the mechanism sentence to `execute` and state `executeSync`'s mechanism accurately.

Do NOT write that `executeSync` returns split sequences. The Orchestrator measured it and it does
not: driven over `aa€bb€` at every limit from 1 to 11, `executeSync` never returned a replacement
character and its output matched `execute` at every limit, because `spawnSync` delivers more than
`maxBuffer` before reporting `ENOBUFS`, so the trim already had its lookahead byte on that path.
The guarantee holds for both functions; only the mechanism differs. Write it that way.

## Finding 3 — the guide files the function under a retired concept

`### Retention helpers` names the class this change deleted, while every sentence the change wrote
about `captureChunk` uses the word `capture`. Rename that heading so one concept carries one term,
and check the guide for any other sentence that still calls this family by the retired name.

The heading is referenced by nothing mechanical, but read the file after the rename and fix any
prose that pointed at it by name.

## Finding 4 — `trimHead` has no test for invalid UTF-8 at the cut

That gap is what let finding 1 ship. The existing rows exercise only a valid four-byte sequence,
where the retreat is bounded by the sequence itself.

Add rows covering the cases listed under finding 1, and add one row driving the regression through
`execute` end to end with the `61 61 61 61 80` vector, so the defect is pinned at the door it
arrived through as well as at the leaf.

## Finding 5 — `captureChunk` aliases or copies depending on size

`captureChunk` returns the caller's own buffer when the chunk fits its room, and a copy when it
does not, and neither the TSDoc nor the guide says so, while a test pins the aliasing as guaranteed
behaviour. State it in the TSDoc `@remarks`. No code change.

## Deviation contract

Stop and report if the `trimHead` repair cannot satisfy every case under finding 1 at once, if a
moved or existing test fails for a reason this brief did not anticipate, or if green requires
editing a file you do not own.

## Acceptance criteria

Ordered cheap-first. Run each yourself and paste its real output.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:src:server` exits 0, with a passing count at or above the current 174 and the same
   8 skipped.
5. `npm run test:guides` exits 0.
6. `npm run build` exits 0, then this command prints `aaaa` and `aa`:
   `node -e "const m=require('./dist/src/server/index.cjs');m.execute({file:process.execPath,arguments:['-e','process.stdout.write(Buffer.from([0x61,0x61,0x61,0x61,0x80]))']},{limit:4,strict:false}).then(r=>console.log(r.stdout));m.execute({file:process.execPath,arguments:['-e','process.stdout.write(Buffer.from(\"aa\\u20ac\",\"utf8\"))']},{limit:3,strict:false}).then(r=>console.log(r.stdout))"`

## Output

What you changed per file; the final `trimHead` body; each acceptance command with its real pasted
output; the case table under finding 1 with the value each case actually returned; every decision
where the brief left a detail open; and anything you could not close.
