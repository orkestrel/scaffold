# Unit: widen browser's frame API — remove `request` and `raw`, publish `assert` and `update`

## Role and engine

`implementer` on **Opus 5**. This is API-shape, naming, and guide-voice work.

## Objective

`src/core/BrowserFrame.ts` carries four `protected` members. `protected` is erased at runtime, so
they already ship reachable. Remove two, publish two, and widen one existing public method — then
carry the change through the interface, the guide, and the tests.

## The ruling — settled, not open

Two blind lanes ran on this and the Orchestrator reconciled them. Implement exactly this:

| Member                                | Action                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| `assert(): void` (BrowserFrame.ts:203) | **Publish.** Drop the `protected` keyword. It is a real polymorphic seam.       |
| `request(...)` (BrowserFrame.ts:209)   | **Delete.** Widen the existing public `send` with `timeout?` and reroute to it. |
| `raw(...)` (BrowserFrame.ts:217)       | **Delete.** Its one caller uses public `evaluate`.                              |
| `update(url)` (BrowserFrame.ts:221)    | **Publish.** Drop the keyword. Keep the name.                                   |

`BrowserPage.assert` (BrowserPage.ts:415) is `protected override`. Drop both keywords there; it
stays an override in fact.

Do not rename `update` to `sync`. `BrowserDownloadInterface.update(progress)`
(`src/core/types.ts:728`) already fixes `update` in this package as "record externally-observed new
state onto this entity", and `.claude/rules/names.md` fixes one term per concept.

Do not add any member beyond the three below. A `sync()` reconciler was considered and refused:
`#handleFrameNavigated` (BrowserPage.ts:788) already reconciles `url` off the frame tree.

## Resulting `BrowserFrameInterface` surface

```ts
assert(): void
send(method: string, params?: Readonly<Record<string, unknown>>, timeout?: number): Promise<unknown>
update(url: string): void
```

`send` already exists on the interface at `src/core/types.ts:1379` without `timeout`. Widen it there.

## The mechanical change

1. `send` (BrowserFrame.ts:179) gains `timeout?: number` and forwards it:
   `return await this.#client.send(method, params, await this.#sessionId(), timeout)`.
   It keeps its leading `this.assert()`.
2. Delete `request`. Rewrite all 13 `this.request(` call sites in `BrowserPage.ts` — lines 249, 271,
   309, 314, 324, 334, 357, 364, 433, 457, 494, 507, 734 — to `this.send(`. The argument lists are
   already compatible.
3. Delete `raw`. Its one caller, `BrowserPage.ts:553`, becomes
   `const currentUrl = await this.evaluate('location.href')`.
4. Drop `protected` from `assert` and `update`, and `protected override` from `BrowserPage.assert`.
5. Add `assert` and `update` to `BrowserFrameInterface` with complete TSDoc, and widen `send` there.
6. Add a `## Methods` row for each in `guides/browser.md` — the `BrowserFrameInterface` table starts
   at line 1001, under the heading at line 983 — and update the `send` row to state the optional
   per-call `timeout`. The `BrowserFrameInterface` summary row at line 245 mentions "raw frame-session
   CDP access"; correct it if the wording no longer holds.

## The behavior delta you are accepting, and must not paper over

`request` did not assert. `send` does, and `BrowserPage.assert` additionally throws when the page is
closed. So 13 call sites plus the former `raw` site gain an assert.

The Orchestrator checked that none of the 14 sits in `#close` or `#destroy`. **Verify this yourself
as your first step** and report what you find: for each of the 14, name the public method that
reaches it and whether that method already asserts on entry.

The residual delta is the close-race — a page closed mid-navigation or mid-screenshot now throws
`Browser page is closed` where it previously issued the CDP command. That is the intended, more
correct outcome. Do not add a guard to suppress it. If a test pins the old behavior, change the test
and say so in your report.

Line 324 is `await this.request('Emulation.setDefaultBackgroundColorOverride').catch(() => undefined)`.
Keep the `.catch`.

## Standing conditions — known, do not report these as deviations

- **The tree is dirty.** `/workspace/browser` carries ~27 uncommitted vendored-host changes from a
  propagation wave. `git status` is expected to be noisy. Leave every one of them alone.
- **`npm run lint:check` currently fails and will still fail when you finish.** It reports 5
  `policy(no-keyword-privacy)` errors (the members you are fixing) and 11 `policy(no-mocking)`
  errors in `tests/src/core/BrowserPage.test.ts` and `tests/src/core/CDPClient.test.ts`. The mocking
  errors are a **separate unit that is not yours**. Do not touch a fake-timer call. Your criterion is
  that the 5 privacy errors are gone and no new error appears — not that the gate is green.

## Scope

**Owned files** — you may edit only these:

- `src/core/BrowserFrame.ts`
- `src/core/BrowserPage.ts`
- `src/core/types.ts`
- `guides/browser.md`
- any file under `tests/src/` that your change breaks, except the two named above

**Off-limits** — vendored host files restored by `scaffold repair`; editing one is reverted and
reports as drift:

- `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `.agents/**`, `.codex/**`, `.cursor/**`
- `configs/policy.ts`, `configs/helpers.ts`
- `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`
- `.oxlintrc.json`, `.prettierignore`, `package.json`, `package-lock.json`
- `tests/src/core/BrowserPage.test.ts` and `tests/src/core/CDPClient.test.ts` **fake-timer calls
  only** — you may edit these files for API-rename fallout, but leave every `vi.useFakeTimers` /
  `vi.advanceTimersByTime` / `vi.useRealTimers` exactly as it is.

**Permissions.** Do not commit, push, install a dependency, or run a destructive command. Do not run
`npm run format` or `lint --fix` tree-wide; scope any formatting to your owned files.

## Execution

Perform this assignment directly. Spawn nothing.

## Governing law

Read before editing: `AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/documentation.md`, and `guides/browser.md`. No skill
is named for this unit.

`.claude/rules/typescript.md` requires complete TSDoc on every public export: first sentence in the
third person with an `-s` verb, never repeating the symbol's name; `@param`; `@returns`; and
"Thrown when …" for a throwing member. `assert` throws — document it.

## Unknowns

- Whether any existing test asserts on `request` or `raw` by name, or pins the no-assert behavior.
  Find out and report. The Orchestrator has not checked.
- Whether `guides/browser.md` documents `request` or `raw` anywhere beyond the summary row at 245.
  A grep found neither, but that grep covered backticked names only.

## Acceptance criteria

Each closes using owned files alone.

1. `grep -n "protected\|private \|public " src/core/BrowserFrame.ts src/core/BrowserPage.ts` returns
   no accessibility keyword on a class member.
2. `grep -rn "this\.request(\|this\.raw(" src/` returns nothing, and neither method is declared.
3. `npx oxlint --config .oxlintrc.json --deny-warnings src/` reports zero errors.
4. `npm run check` exits 0.
5. `npx vitest run --project src:core` passes, with a count at least equal to the pre-change count.
   Record both counts.
6. `npx vitest run --project guides` passes — this is the parity gate for the new interface members.
7. `npx prettier --check` on your owned files passes.

## Output

Return, and nothing else:

- The assert-coverage table you were asked to build as step one: the 14 sites, their public entry
  method, and whether it already asserts.
- The final `BrowserFrameInterface` diff for the three members.
- Test counts before and after, plus the exact command.
- Any test whose expectation you changed, with the reason.
- Exit status of each acceptance command.

No process diary.

## Deviation contract

Stop and report if the ruling above conflicts with what the code actually permits — for example if
`send`'s assert breaks a path the Orchestrator did not find, or if a public member cannot be
documented without inventing behavior. Report expected, found, exact evidence, done or not done, and
at most one hypothesis. Do not redesign.

Where a paragraph sits, which heading a guide row takes, and how a TSDoc sentence is worded are
yours to decide. Decide them and carry on.
