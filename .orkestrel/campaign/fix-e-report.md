# FIX-E report — the guide states what the package does

Role `implementer`, Opus 5, sole serial writer. Brief: `.orkestrel/campaign/fix-e-brief.md`.

## The line the guide now draws

The audit's sharpest guide finding was that the distribution proof is called "the one proof scaffold
writes" three paragraphs below the guide's own statement that scaffold content-owns
`tests/policy.test.ts` and `tests/config.test.ts` and restores them. The correction is the
distinction the rule actually rests on:

> **Scaffold generates the distribution proof and refuses to generate every other one.** The subject
> is what separates them, and it is the whole rule. Generating a file is not the same as writing
> one: scaffold also writes `tests/policy.test.ts` and `tests/config.test.ts` into a target, byte for
> byte from the shared file set, and the distribution proof is the one it derives from the workspace
> it is writing into.

## What else landed

The setup comparison is stated as seed-relative rather than a test for emptiness, with the reason —
the seeds differ by path, so an emptiness test raises the question against a freshly materialized
workspace — and with the per-module pairing that makes writing one proof retire one module.

The categorical sentence is narrowed to its measured claim. The guide now says a setup proof's
**subject** is what no generated file can reach, and states plainly that a structural property of
the same files can be derivable — naming reachability from the root configuration as one — while a
file asserting it would still leave the module's behaviour unmeasured. That keeps the ruling and
drops the over-claim, which is exactly what the three lanes' disagreement resolved to.

The presence-ownership table gains the unhydrated row, and a paragraph unpacking the mistake it
invites.

The partition and the browser guard are documented, including that classification reads every target
an entry names so a `require`-only subpath with no declaration reddens, and that a types-only
condition cannot stand in for a missing declaration.

## The claim a reader will check, measured rather than asserted

The unit probed the hydration claim before writing prose about it. A `src: ['core']` plan from the
pure core face carries every host artifact at `presence` — `AGENTS.md`, `.claude/settings.json`, and
the vendored proofs among them — and none at `birth`. After `Materializer.audit` hydrates that plan
through `dist/host`, those paths report `content`, and the only host paths still `presence` are
`.gitignore` and the two guide mirrors, which are exactly the workspace-owned and verb-owned rows
the table already carried.

No number from that probe appears in the guide. Counts stay out of the prose.

## The unknown, answered

No other guide states anything this chain falsified. The sibling hits are each a mirror describing
its own package's files — a test-file index in two of them, browser-fixture teardown advice in a
third — and none asserts who writes those files or what scaffold generates. `guides/README.md` says
nothing about setup proofs, ownership, or the proof's authorship. The sibling mirrors are byte-copies
of upstream, which `.claude/rules/documentation.md` forbids rewriting in place.

## Ordering held

The guide is vendored, so the unit rebuilt and regenerated the inventory before every gate that
reads it, and again after its last prose edit. That ordering is the rule this campaign landed after
getting it wrong twice.
