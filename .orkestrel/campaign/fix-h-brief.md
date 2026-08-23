# FIX-H — two bounded findings from the successor round

## Role and engine

`implementer`, Opus 5, clean context. Two unrelated findings in disjoint files, both fully
specified. Read `.orkestrel/campaign/audit-successor2-reconciliation.md` first.

---

## Finding 1 — the peer fixture inherits the host's resolver policy

**File: `tests/distribution.test.ts`,** this repository's own bespoke proof, around `:700-718`.

The test publishes a refused peer graph and asserts the install fails with `ERESOLVE`. It forwards
`{ ...process.env, npm_config_cache: cache }`, so it inherits whatever peer-resolution policy the
host carries.

An audit lane measured the consequence:

```json
{"default":         {"status":1,"mentionsERESOLVE":true},
 "legacy-peer-deps":{"status":0,"mentionsERESOLVE":false,"output":"added 3 packages"}}
```

With `npm_config_legacy_peer_deps=true` — an ordinary npm setting, reachable through a user
`.npmrc` — the install the test expects to be **refused succeeds**, and
`expect(rejected.status).not.toBe(0)` fails. That is a deterministic input under which this
package's publish gate reds for a reason that has nothing to do with scaffold.

The same lane measured the second half: a killed child returns `status: null` with
`signal: 'SIGKILL'`, and `${stdout}\n${stderr}` renders exactly `'\n'`. `expect(null).not.toBe(0)`
**passes**, so the assertion accepts a process that never ran its resolver as a refusal, and only
the substring check separates the two — with no diagnosis when it fails. That is why an earlier unit
spent a round on it.

**Fix both.** Pin the resolver policy in the fixture's own environment so the test's answer is the
test's, and assert the child was not killed so a harness fault fails as a harness fault rather than
reading as a refusal. Settle the exact spelling yourself.

### Acceptance for finding 1

- With `npm_config_legacy_peer_deps=true` exported in the environment, the test still passes.
- A killed child fails the test rather than satisfying it. Show this with a control.
- The ordinary path is unchanged: the refused graph still fails with `ERESOLVE`.

---

## Finding 2 — the setup advisory asserts something it never measured

**File: `src/bin/CLI.ts`,** `#setupQuestion`'s message.

The predicate decides membership on **bytes**: a module whose content differs from its planned seed.
The message then asserts **exports**: "each asserting the behavior the module of the same name
exports".

Those are different facts, and a real fleet package separates them. Measured:

```text
audit --target /home/user/orkestrel/indexeddb --offline
  setup: … carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts.
  Add tests/setup.test.ts, tests/setupBrowser.test.ts, each asserting the behavior the module of
  the same name exports.

grep -c "^export" /home/user/orkestrel/indexeddb/tests/setup.ts   → 0
wc -c                                                              → 423
```

That module is comment text and an `afterEach` call. It exports nothing. The maintainer's options
are to ignore a permanent advisory or to write a proof asserting nothing — the second being exactly
what the guide condemns two sections later.

**Narrow the message to what the predicate knows.** Name the module and ask for a proof covering it;
do not assert it exports behaviour.

**Do not screen the population by an `export` token.** That reintroduces the source-language text
scan the predicate's own comment correctly refuses, and it is wrong about comments and strings.

### Acceptance for finding 2

- The message no longer asserts the module exports behaviour.
- It still names each uncovered module and the proof each one wants.
- `audit` against `/home/user/orkestrel/indexeddb` produces a message a maintainer of that package
  can act on. Paste it.

---

## Scope

**Owned:** `tests/distribution.test.ts`, `src/bin/CLI.ts`, and the focused tests under
`tests/src/bin/` that pin the message.

**Off-limits:** `guides/` — FIX-I owns the prose and will state whatever wording you settle.
`src/core/`, `src/server/`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`host.json`, `vite.config.ts`, `package.json`, everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with either objective stops you and you report it. Message wording and the environment
spelling are yours to settle, record, and carry on from.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. Finding 1's acceptance list, each item with its evidence, including the killed-child control.
5. Finding 2's acceptance list, with the `indexeddb` message pasted.
6. `npm run test:src:bin` exits 0.
7. `npm run build` exits 0, then `npm test` exits 0. If it fails, run each link of its `&&` chain
   separately and report every one.
8. `npm run test:distribution -- --mode release` exits 0. Finding 1 edits that file, so this is the
   gate that reads it. Run it **alone**, with no other command in flight.

## Review evidence

Return the actual `git diff` of both files and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion; the controls verbatim;
the `indexeddb` message; and anything you could not close, named.
