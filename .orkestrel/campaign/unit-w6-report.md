# Unit W6 report — rewrite the guide for a scaffold that generates the proof

Role `implementer`, Opus 5, sole serial writer. Brief: `.orkestrel/campaign/unit-w6-brief.md`.

## The line the guide now draws

The rewrite's centre is one passage in Limits, and every other passage points at it rather than
restating it:

> **Scaffold writes the distribution proof and refuses every other one.** The subject is what
> separates them, and it is the whole rule. A distribution proof's every assertion derives from the
> artifact the workspace installs: the `exports` map the packed tarball declares, the built
> declarations beside it, and the module objects a Node import, a CommonJS require, and a real
> browser hand back from that installed tree. Nothing there has to be named, so one generated file
> measures every publishing workspace, and it stays true as that workspace's published surface
> moves. A guide, conformance, live-service, or setup proof's assertions derive from nothing
> scaffold can read: each names behavior or an external artifact only the package knows — the API a
> guide fence claims, the official runner a conformance check measures against, the service a live
> proof drives, the helpers a setup module exports. A generated file there would read as a proof
> while measuring nothing, which is worse than an absent one.

That is the same reasoning that decided this campaign against a generated setup proof, now stated
once with its one exception, so the two rulings are documented together rather than in tension.

## What else the guide gained

Presence ownership at the proof's path, with a plan-owned row in the presence-mechanisms table. The
manifest script-region write and its refusal. The `setup` question, what raises it, and that
scaffold does not write the proof it asks for.

Every passage carrying the deleted flag is gone: a grep for the flag language, the
presence-makes-a-workspace phrasing, and the add-to-select-a-project phrasing returns nothing.

## A criterion-ordering error in the brief

The brief ordered the cheap gates first, so `test:guides` sat ahead of the inventory rebuild. That
order **cannot pass**: the guides suite reads the guide out of the inventory, so a vendored-file
edit fails it on the stale digest by construction. The unit reordered and said so.

This is the second time the same trap has appeared in this campaign — W1 met it with
`tests/config.test.ts`. It is landed as a rule rather than recorded a second time.

## Findings recorded, not fixed

`README.md:56` claims a file the workspace owns "is written once at creation and is never rewritten
here". Under `repair` that is now false twice over: it restores an absent presence-owned
`tests/distribution.test.ts`, and it rewrites the manifest's script region. `README.md` is published
— `files` names it — so this is shipped prose. It was in neither the owned nor the off-limits list
and the unit correctly left it.

A pre-existing directional reference at `guides/scaffold.md:725` uses a word
`.claude/rules/writing.md` refuses. It states nothing false and is outside this unit.

## Ancillary calls the unit settled

The rule went in Limits rather than at the reader's first mention. Two tables widened rather than
their new cells shortened. The design round's `addScriptTag` fallback was dropped from the
browser-stage sentence, because the shipped template implements only the loopback server and
stating the fallback as available would be a prose claim the code does not earn. That last one is a
correct reading of the documentation contract.
