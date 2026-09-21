# Unit CL5c — brief 2

Succeeds `units/cl5c-brief.md`, which stays in force for everything this brief does not name and
is left unedited. What changed and why: a `checker` scope read
(`units/cl5c-scope-read-report.md`) checked brief 1 against the tree and returned two amendments.
One of them overturns part of the Orchestrator's own mark ruling, which is restated here in full.
Read brief 1 first, then this delta.

## Correction 1 — the mark ruling, restated

Brief 1 ruled that the mark class declares the CSS system colours the calibration record
measured. The scope read found that **no predicate anywhere inspects a declaration's colour
value**, so nothing would have refused it. But it also found the governing text: the styles rule
bans a literal colour and names two permitted forms, a token reference or a mix over tokens. **A
bare system colour keyword is neither.** The ruling as written would have shipped a declaration
in neither permitted form, into a file no enforcer guards, which is precisely how a rule erodes.

**The ruling, restated.** Add two tokens carrying the system colours, and have **both** sides read
them:

- The tag stops relying on the user-agent rule implicitly and declares the same paint explicitly.
  Its computed reading does not move, because the tokens carry exactly the values the user agent
  was already supplying, so its proof stays green unedited. Confirm that with a reading before and
  after rather than assuming it.
- The class reads the same two tokens and takes the tag's inline-axis padding, so an element
  carrying the class renders as the tag does.

This is what the calibration record shows Elements itself did: its own mark tokens hold those
system colours, and the record's computed rows are what they resolve to. Binding both sides to
tokens satisfies the styles rule, makes the twin identical by construction rather than by
coincidence, and leaves a consumer one place to retune.

**This brief therefore grants `src/styles/_tokens.scss` for those two tokens alone.** Change no
existing token. If adding them moves any consumer's resolved reading, stop and report.

## Correction 2 — the owned set gains the styles setup proof

`tests/setupStyles.test.ts` holds the case that freezes the retune tables and must gain the
disjointness assertion obligation 3 names. Brief 1 granted only the data module. Add that proof
to the Owned list.

## What the scope read confirmed, so you need not re-derive it

- The three sections differ only in the doc description, the example's class name, the imported
  constant names, the class name, and the label each reads. No line differs in control flow,
  method count, or behaviour.
- A shared shape must still surface each section under its own exported name, because the barrel
  proof pins the exact export-name set and a section proof imports its class by name. The region
  labels and specimen order the showcase proof asserts are behavioural and unaffected by internal
  shape.
- The button section differs in kind, not degree: it owns engines, mounts through a private pair,
  applies a grid class, constructs an engine per matching specimen, and releases them before
  removing its region. Leave it alone.
- The caption pair already has an assertion recording that the two do **not** resolve alike. So
  obligation 2's caption item is already answered in the tree: report both resolved values and
  leave the assertion as it stands, rather than binding them to one token.
- The retune values are disjoint from the default sizes by construction, and nothing asserts it.

## Acceptance criteria, amended

Brief 1's criteria stand, with these corrections:

- Criterion 3 reads: an element carrying the mark class and the bare mark tag render the same
  paint and padding because both read the same two tokens, proved by a comparison in one host,
  and a divergence reddens it.
- A criterion is added: the tag's resolved paint is unchanged by declaring it explicitly, shown
  by a reading before and after, and the tag's existing proof passes unedited.
- A criterion is added: `src/styles/_tokens.scss` gains exactly the two mark tokens and no other
  change, and no consumer's resolved reading moves.
- Criterion 4 reads: the caption pair's two resolved values are reported and its existing
  difference assertion is left as it stands.
