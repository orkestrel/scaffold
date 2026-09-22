# The scope read that answered a capability question by inspecting an interface

The Orchestrator's own record, written while the CL10 audit round ran. It is held back from that
round on purpose: claim 23 asks both lanes to rule on the refutation, so the retained scope-read
report carries no correction header until the lanes have returned.

## What happened

CL10's brief carried an Unknown: **whether the browser setup can drive the reduced-motion
preference.** The `checker` scope read ruled on it before dispatch and reported:

> the reduced-motion preference cannot be driven by the current setup. The browser page interface
> exposes no media emulation; the one preference-style toggle drives dark mode through a UI control;
> no control exists for this preference; and a protocol escape hatch exists on that interface but
> nothing in the setup uses it for any preference, so there is no pattern to follow.

It graded this **"confirmed-unreachable-as-scaffolded"** rather than a defect, and raised **no**
defect on the brief. Terminal line: `Dispatch: go`.

I folded that reading into the brief, which then told the unit the question was settled, named the
fallback it must use instead, and said "do not spend the round rediscovering it".

**Every part of the finding is false.** Verified first-party:

- `@orkestrel/test/browser` exports `stageMedia` and `releaseMedia`. `MediaOptions` carries a
  `motion` field, and the installed declaration states: "If `motion` is true, uses no preference; if
  false, uses reduced motion."
- `tests/src/styles/mixins.test.ts` already reads the exact collapse the scope read called
  unreachable: `0.15s`, then `stageMedia({ motion: false })`, then `0s`, then `releaseMedia()`, then
  `0.15s` back.
- `stageMedia` is imported by name in the styles proofs for both button partials and in the journey
  proof, in the same tree the scope read was reading.

A grep for `stageMedia` across `tests/` returns the answer immediately.

## Why the lane missed it

The lane inspected **the interface that would do the thing** — the browser page object the setup
uses — and reasoned from its absence of a media control to the conclusion that the thing could not
be done. The mechanism is not on that interface. It is a function an installed package exports, and
the proof that it works is that several sibling proofs already call it.

The lane's method was sound-looking and wrong in one specific way: it reasoned about which files
looked relevant instead of searching for the behaviour itself.

## This is a rule I already landed, scoped too narrowly

`.agents/orchestration.md` § Check the brief before you send it carries:

> Find the enumerating assertions by searching for the population's EXISTING members, never by
> reasoning about which files look relevant.

That is the same failure, and the rule names only enumerating assertions. The failure mode is
general: **any question of the form "can this tree do X" is answered by searching for X already
being done.** An interface's surface is evidence about that interface, never about the tree.

So the rule is widened rather than duplicated, in the section that already owns it.

## What it cost, and what it did not

It cost nothing in the end, because CL10 refused the premise: the unit read the declaration, found
the sibling proofs, and did **both** readings — the staged preference and the built-cascade
declaration the brief asked for. The proof is stronger than either alone.

It cost nothing only because the unit checked. A unit that trusted its brief would have shipped the
weaker proof and recorded a bound that was never real, and the bound would have propagated into the
guide as a published limit of this package.

## The carrier

The widened rule lands in `.agents/orchestration.md` § Check the brief before you send it, in the
same commit that states it, after the CL10 round returns and the scope-read report takes its
correction header. No implementation unit carries anything from this: the tree is correct.
