---
paths:
  - '**/*.{ts,tsx,mts,cts,vue}'
---

# TypeScript rules

The non-negotiables and design laws in `AGENTS.md` apply without exception and are not restated here. This file adds only what TypeScript itself decides.

## Syntax and imports

- Tabs for indentation.
- No semicolons unless ASI requires one.
- Single quotes.
- Named exports only, except framework-required defaults.
- ESM imports use explicit `.js` extensions for local TypeScript modules.
- Place `import type` declarations before value imports.
- Do not place blank lines between consecutive imports of the same kind.
- Narrow an accepted `unknown` with a total guard rather than a conditional access.
- A parameter property is a constructor parameter carrying any accessibility or `readonly` modifier.
  The ban reaches every form, `readonly` alone included; declare the `#` field and assign it in the
  constructor body.

## Types

- Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`.
- Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`, or `ReadonlySet<T>`.
- Optional state is `T | undefined`; an optional lookup failure returns `undefined`.
- `as const` annotates a literal with its own type and never overrides the checker, so the assertion
  ban does not reach it. Use it to derive a literal union from a value and to fix a tuple's arity and
  element types. Do not write it on a value whose contract is already declared; annotate the
  declaration instead. A class field that holds one literal keeps `as const`
  (`readonly code = 'ABORT' as const`): the vendored lint gate's `prefer-as-const` rule refuses the
  annotated form, and a field whose type is a union of literals is annotated as the preceding
  sentence states.

## Immutability

- Never mutate caller-owned inputs.
- Use copy-on-write for internal state.
- Return copies or readonly views; never leak a mutable internal reference.
- Compute derived facts instead of persisting duplicate state.

## Bindings

- **Variables.** Never write a `let` or `var` declaration, at module scope, in a function, in a loop
  head, or in a test; declare each variable with the `const` keyword. Never assign to a parameter or
  a `catch` binding, whether by `=`, by a compound operator such as `+=` or `??=`, by `++` or `--`,
  or as a destructuring target.
- **Derivation.** Derive a value instead of accumulating it: write the expression that produces it
  (`some`, `every`, `find`, `filter`, `map`, `reduce`, a conditional expression), or extract a
  `{verb}{Noun}` helper that returns it. Build text from its parts with `join` or a template literal,
  never with a fold whose step appends a part to the text it carries.
- **Iteration.** Iterate with `for…of` over `entries()` or an iterable instead of an index counter.
- **Try results.** Take a value out of a `try` block through a helper that runs the block and
  returns the value. Treat a log that the block appends to as a log rather than such a value, and
  apply the **Lists and logs** rule to it.
- **Running values.** Treat a flag, a counter, a sum, a latest value, a one-slot cell, or text built
  piece by piece as a running value. Treat carrying one by changing a record, an array, a `Map`, a
  `Set`, or a recorder as a reassigned binding, whether a variable, a parameter, or a `reduce`
  accumulator holds that collection, directly or through a property: derive the value, or keep it
  where the **Per-call state** or **Entity state** rule places it. Treat a collection that holds at
  most one entry and that code reads by position, such as `cell[0]`, `cell.at(-1)`, or
  `const [entry] = cell`, as a one-slot cell. Treat selecting an entry by iteration order as a
  position read, including an iterator read such as `values().next()` or `keys().next()`, and a key
  obtained that way.
- **Lists and logs.** Build a list from a list with `map`, `filter`, or `flatMap`, and a lookup with
  `new Map(…)` or `new Set(…)` over a derived list. When a loop awaits or yields between steps, or
  its step depends on earlier steps, append each step's readonly result to a log that the loop owns,
  and derive every aggregate from the log, never from a running value. Apply these conditions whether
  the loop pushes to the log or a `reduce` call returns it:
  - let only the loop's own steps, in order, or the callbacks of one event source, in emission order,
    append to the log, and apply the **Per-call state** rule to a list that concurrent paths append
    to;
  - let a step read the record before it and carry an aggregate computed from that record, such as a
    running total;
  - append each record final: never replace, rewrite, or remove a record the log holds, and never
    append a record whose text extends an earlier record's text;
  - treat a log, or a `Map` keyed by step, whose every read takes its last entry or its length as the
    carrier of a latest value or a counter: derive that value from the source list, return it from a
    bounded recursion, or carry it in a `reduce` accumulator;
  - find a log's reads through its aliases, the calls it is passed to, and the callers it is returned
    to, and never count passing or returning the log as a read of its history.
- **Exemptions.** Exempt these from the **Running values**, **Lists and logs**, and **Per-call state**
  rules:
  - a traversal's worklist, which is a list, `Set`, or `Map` that a loop visits while its steps add
    the entries left to visit, provided one step can add more than one entry. Treat a loop as a
    traversal only when it reaches each node after its roots as a successor of a node it has already
    reached, such as a child directory, a dependency, an amendment, or a child process. Count as one
    step a complete iteration that removes or visits an entry of the worklist, its nested loops
    included. Treat a worklist that no step can add more than one entry to as a cursor, and return
    what it reaches from a bounded recursion;
  - a traversal's membership set or map, which the traversal reads to avoid revisiting a node or to
    discover the nodes reachable from nodes it has recorded, whether or not it iterates that
    collection, and to which the cursor condition never applies;
  - a memo, which is a `Map` that caches a computation's result by its input or identity key for
    reuse within one owning operation, writes each key once, and never changes a stored value. Never
    key a memo by iteration position: treat a `Map` keyed by step as a log;
  - a list or record that straight-line branches outside any loop append to, with no entry written
    twice;
  - a write that a platform API requires, such as `process.exitCode`, a DOM property, or a Vue `ref`
    value, and one write per key into a fresh local object that builds a fixture a literal cannot
    express, such as a cycle or a sparse array.
- **Per-call state.** Keep state that the awaits or callbacks of one call change, other than a log,
  in `#` fields of an entity created for that call. Treat a list that more than one concurrently
  pending async path of one call appends to, such as the workers of a pool, as state of that call:
  collect each path's result through `Promise.all` or `Promise.allSettled`, or keep the list in the
  call's entity. Treat an iterator or an `AbortController` instance created for the call as that
  entity for its own protocol, its cursor, its abort, and its first reason, and never treat an array,
  a record, a `Map`, or a `Set` as that entity. Treat an entity created for one call, or for one unit
  under the **Bound values** rule, as short-lived for that call or unit, and every other entity as
  long-lived. Judge lifetime against the call or bound unit whose state you classify: treat an owner
  that can serve another such call or unit as long-lived, even when that owner belongs to an enclosing
  call or unit.
- **Entity state.** Keep state that outlives one call in a `#` field on its owning class, never in
  an array, a record, a `Map`, or a `Set` that a function holds in its closure and changes after the
  call that created the function returns. Keep a composable's reactive state as
  `.claude/rules/browser.md` states, and a middleware's changing state where
  `.claude/rules/architecture.md` § Middleware places it.
- **Call slots.** In a long-lived entity, never keep a call's own entity, context, promise, or
  scratch value in a `#` field that the call sets when it starts or clears when it settles, for its
  steps, its callbacks, a handler registered outside it, or a later call to reach while it runs:
  treat that field as a reassigned binding, even when a refusal keeps the calls from overlapping.
  Reach the call's entity through the **Registries** rule. Treat neither a bound value nor a latch,
  under the **Bound values** rule, as a call slot.
- **Unit resets.** In a long-lived entity, never let a method that binds or releases a unit of work
  reset a `#` field other than the bound value's own field for the unit's later calls to change,
  whether by assigning the field or by emptying the collection it holds: treat that field as a
  reassigned binding. Treat an assignment as such a reset when it discards the preceding unit's state
  and initializes state for another unit, even when its expression reads the old field. Keep that
  state in `#` fields of the bound value.
- **Bound values.** When a long-lived entity binds one unit of work at a time that later calls
  continue, such as a goal, a session, or a lease, and holds that unit nowhere else, keep the unit's
  value in one `#` field typed `T | undefined`, never in a collection:
  - in the binding method, throw while the field holds a value and publish the incoming value, both
    before the method's first suspension, and keep asynchronous initialization inside that value's
    lifecycle;
  - in a `start` method that restarts instead, call the bound value's own end method and publish the
    incoming value before the method's first suspension, and await the previous value's end only
    after publishing;
  - set the field back to `undefined` in a later call, such as a `clear` method, the method that ends
    the unit, or the entity's teardown, and never in the binding call's own settle path. Treat as a
    later call only an independent invocation made after the binding invocation returned, never
    cleanup that the binding invocation invokes or registers;
  - narrow the field's `T | undefined` type by throwing, branching, or optional chaining before you
    use the value as present, or return or forward it unnarrowed through a contract that admits
    absence;
  - keep state whose lifetime is the bound unit in `#` fields of the bound value, and keep state that
    continues across units in the owning entity's `#` fields.

  Treat an explicit bind-to-release lifecycle as a bound unit. Keep several units bound at once in a
  registry under the **Registries** rule, read by key. Treat a field that selects an entry the entity
  already holds, such as the id of its active conversation, as a selection, not a bound value. Treat a
  field as a latch, not a bound value, when it can acquire a value only once during its owner's
  lifetime, whether a repeated invocation throws or keeps that value.

- **Registries.** Reach the entities of operations in flight, such as calls, streams, tickets, or
  units bound at once, through a `readonly` `#` registry, a `Set` or a `Map`: add each entity when its
  operation starts, delete it on every path that ends the operation, and clear the registry in bulk
  only in the method that tears the entity down. Delete each settling operation's entry even when
  that leaves the registry empty. Apply this rule to unfinished calls, streams, tickets, and
  explicitly bound units, and never to a manager's population, a subscription, a cache, or a
  persisted record merely because a collection holds it. Read a registry through its `size` property,
  through every entry, or through the entry a key names. Take its entry by position, as
  `const [entry] = registry` does, only while a refusal on every add caps the registry at one entry
  and the call that added the entry deletes it on every path that settles that call, and handle the
  empty registry at that read.
- **Immutability exceptions.** As an exception to § Immutability, change in place the membership of a
  registry that the **Registries** rule admits, and keep its field binding `readonly`. As an exception
  to the § Immutability ban on mutating caller-owned inputs, let a helper that takes part in one
  owning operation append to that operation's log under the **Lists and logs** rule, or insert into
  its memo under the **Exemptions** rule, and mutate no other caller-owned input.

## Errors and outcomes

| Condition                            | Required strategy                           |
| ------------------------------------ | ------------------------------------------- |
| Programmer error or invalid argument | Throw an `AppError`                         |
| I/O/network/external operation       | Return `Result<T, E>` or throw consistently |
| Optional missing lookup              | Return `undefined`                          |
| Invalid input inside a guard         | Return `false`; never throw                 |

Use the existing outcome contract from a declared dependency or the owning environment; do not redeclare it at each call site. When no such contract exists and adding a dependency is not authorized, define this once in the owning `types.ts`:

```ts
interface Success<T> {
	readonly success: true
	readonly value: T
}

interface Failure<E> {
	readonly success: false
	readonly error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>
```

- When `@orkestrel/contract` is declared, inspect and use its exact installed `Result`, construction/narrowing helpers, and `attempt` behavior instead of duplicating them.
- Otherwise construct and narrow through the owning environment's centralized helpers.
- Error classes expose a machine-readable `code` and optional `context`.
- Every public error class ships with a guard such as `isAppError` for safe `catch` narrowing.

## Comments and API documentation

- Comments explain why, never restate what self-explanatory code does. The Writing rules in `AGENTS.md` and `.claude/rules/writing.md` govern their prose.
- Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.
- The first sentence states what the symbol does in the third person with an `-s` verb — `Creates`,
  `Returns`, `Checks whether` — and never repeats the symbol's name.
- `policy/no-malformed-summary` reads that first sentence over every doc block a top-level export
  declaration follows, and refuses an opening word that is not a third-person `-s` verb and a
  sentence naming the declared symbol. A word ending in `s` that the rule's stop set does not name
  passes whether or not it is a verb — a plural noun such as `Files` included — so read the sentence
  in review as well.
- Describe a boolean parameter as "If `true`, …; if `false`, …", and a boolean return as
  "True if …; false otherwise".
- Write a default as "Default: …" and a thrown error as "Thrown when …".
- State a prerequisite and the failure behavior wherever the symbol has either.
- `@deprecated` names the replacement first, then the reason.
- Document an options object as one `@param`; describe its short fields under `@remarks`.
- Private methods and overload-specific notes use single-line `//` comments, not public TSDoc.
- Do not document speculative future product behavior unless requested.
- Never use `@internal` to hide a method; make it `#` private.
