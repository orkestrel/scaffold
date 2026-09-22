# Unit F4 HOST-OBSERVATIONS — successor brief 3

Effective over `f4-brief-2.md` (retained beside this file) and `f4-brief.md` (retained beside this file), which stay in force for
every section this file does not change. Read the terrain `f4-terrain.md` (retained beside this file) first and
whole, then brief 1, then brief 2, then this file, each in its own command; read a file longer than
about 400 lines in bounded stretches with `sed -n` rather than one `cat`.

## What changed and why

Run 2 measured Obligation 4's matrix on this Chromium and stopped, correctly, on the reading its
stop condition named: a host constructed with no `class` attribute carries `class=""` after
`toggle()` and `destroy()`, for every `aria-pressed` value. The Orchestrator rules that reading a
defect of the engine's restoration, not a permitted difference: attribute presence is part of the
original state, and the engine already restores `aria-pressed` absence exactly (it removes the
attribute it created). `src/browser/Button.ts` therefore joins the owned set for one bounded change,
stated under § Obligation 4. The other readings run 2 recorded (`"active btn"` restored as
`"btn active"`, and the whitespace variant collapsed to the same string) are token order and
whitespace collapse with membership and every other token intact; those stay observations, and the
proof asserts nothing about them.

Every other obligation, the scope beyond this one file, the criteria, and the output contract stand
unchanged. Run 2's probe reading (`browser.version()` is `141.0.7390.37` on this host) is a
measurement you may reuse in the README row after the fixture refresh confirms it.

## Scope (adds to the original)

**Owned, in addition.** `src/browser/Button.ts`, for the change under § Obligation 4 and nothing
else. Its class doc block's description paragraph and the guide's `destroy` summary cell stay
byte-identical to each other (the guide parity proof compares them); change neither.

## Obligation 4 — the restoration proof over every initial state (replaces the original)

In `src/browser/Button.ts`: record in the constructor, beside the active membership and the
`aria-pressed` value, whether the host carried a `class` attribute at all, in a `#` field. In
`destroy()`, after restoring the active membership, remove the `class` attribute when it was absent
at construction and the host's class list is empty; leave every other case exactly as it is, so a
consumer's own class edits survive. No other line of the engine changes. Run
`npm run check:src:browser` and `npm run lint:check` after the edit.

Then extend `tests/src/browser/Button.test.ts` with the matrix proof: an absent `class` attribute;
`class="active btn"`; `class=" active  btn "`; `class="btn"`; `class=""`; each combined with
`aria-pressed` absent, `"true"`, `"false"`, and `"mixed"`. For each: construct, `toggle()`,
`destroy()`, then assert the `active` membership equals the original, every other class token is
kept in its original order, the `class` attribute's presence equals the original, and
`aria-pressed` presence and exact value equal the original. Record under § Output, as observations,
the serialized `class` strings that differ by token order or whitespace collapse, and assert nothing
about those strings. Insert the failing proof before the engine change: run the matrix case on the
unrepaired engine first, record the exact failing assertion and count, make the engine change, and
record the same command green. Keep the existing consumer-edit case as it is.

Stop and report only if, after the engine change, a matrix reading fails on membership, on another
token's order, on `aria-pressed`, or on attribute presence for a case other than the absent
attribute; nothing else in this obligation stops the unit.

## Acceptance criteria (adds to the original)

- `npm run test:src:browser` exits 0 with the matrix case present, and the report carries the red
  reading taken before the engine change and the green reading after it.

## Report

Write `f4-report-3.md` (retained beside this file; the unit wrote it as `./tmp/units/f4-report-3.md`) and return its full content as your final message, nothing
else, in the shape the original brief's § Output fixes, with the red-then-green readings for
Obligation 4 added.
