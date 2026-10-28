# Equivalence of a rewrite

Judge a structural rewrite that claims unchanged behavior, such as a sweep under
`.claude/rules/typescript.md` § Bindings, a centralization move, or a nested-function extraction, by
this contract against its baseline revision. Prove it with a differential under
`.claude/rules/quality.md` § Instruments that runs the baseline and the rewrite on the same inputs,
with a row for each class this contract names that the changed code admits.

## Hold the contract

- Treat every value the declared parameter types admit as inside the contract: holes, entries read
  through getters (their count and order), entries that throw, an array whose `Symbol.iterator` is
  missing or replaced, and an iterator's `return()`.
- Match the outcome (the return value, or the thrown error's constructor), the element reads (which
  indices, in what order, how often), and every effect before a throw. Let a message differ only
  where the throwing expression differs, and name each such row.
- For an entry whose own getters are pure, returning the same value on every read with no side
  effect, match the outcome. For an entry that throws, match the thrown constructor. Leave the count
  and order of an entry's own property reads outside the contract.
- Leave outside the contract a value outside the declared types, such as a number or a plain
  array-like where an array is declared; a `Proxy` trap other than element `get` and
  `Symbol.iterator`; the order of a record's own property reads when each is read as often as before
  and no outcome changes; and tampering with a global prototype.

## Keep the iterator protocol

When a rewrite replaces a `for…of` over a caller's array, refuse each form that changes what it
reads:

- `Array.from(source, mapper)` falls back to index access when `Symbol.iterator` is missing, so it
  returns where `for…of` threw a `TypeError`.
- `source.values()` and the array methods read by index, so they accept a missing iterator and
  skip a replaced or closing one; `flatMap`, `filter`, `reduce`, `forEach`, `some`, and `every`
  skip a hole that `for…of` reads.
- A spread copies every element first, so it reads past a hole or ahead of a throwing entry where
  the baseline threw at the earlier element.

Consume the source through `Iterator.from(source)` and its helpers, or through a generator whose
body is the baseline `for…of`. To keep `Array.from`, hand it an iterable that forwards only
`[Symbol.iterator]()`. Never bound a hand-written stepper by `length`: a replaced iterator that
yields more entries than `length` is truncated.

## Keep every test

Before a claim that a rewrite lost no test, run
`node .agents/skills/orkestrel-harden/scripts/titles.ts --base REV`, where `REV` is the baseline
revision. Restore each missing title, or rule its removal with the behavior it proved, and confirm
each moved title by reading the registration that uses it.
