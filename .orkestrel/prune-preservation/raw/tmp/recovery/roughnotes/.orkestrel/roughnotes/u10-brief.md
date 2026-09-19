# Unit 10 — close the two carried findings

## Role and engine

`builder` — Sonnet, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch. Both changes are fully specified; no design
judgment is delegated.

## Authority

1. `tmp/authority/AGENTS.md` — § Design laws, § Non-negotiable rules, § TTTDD.
2. `tmp/authority/rules/names.md`, `rules/typescript.md`, `rules/tests.md`, `rules/writing.md`.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Change one — remove `refusal` from `NoticeCategory`

`app/browser/types.ts` declares `NoticeCategory` as `'empty' | 'miss' | 'partial' | 'refusal'`.
No view constructs a `Notice` with `category="refusal"`, and none can: the application's only
refusal is the error summary in `SubscribeForm`, `ContactForm`, and `PaymentForm`, which needs a
focusable element reference so a failed submit can move focus to it, and which carries a list of
per-field links. `Notice` exposes neither, so it cannot serve that case.

`AGENTS.md` § Design laws permits removing a symbol when the capability itself must not exist, and
requires literal unions to carry real domain states rather than decorative labels. A member no view
can construct is the latter.

Remove `refusal` from the union. Remove its entry from `NOTICE_MARKS` in
`app/browser/constants.ts` if one exists. Update `Notice.vue` and its mirrored test so neither
references it. Leave the three hand-rolled summaries exactly as they are — they are correct.

## Change two — route the last `NAV_ITEMS` label through `COPY`

`app/browser/constants.ts` declares `NAV_ITEMS` with three labels taken from `COPY` — `COPY.about`,
`COPY.publications`, `COPY.shop` — and one bare literal, `'Products'`.

Add `products: 'Products'` to `COPY`, in the position its neighbours' ordering implies, and take the
fourth label from it. That removes the last restatement of a shell destination's name.

The accessible name `Products` must not change; the journey suite resolves it.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- `npm run test:journey` runs the four journey projects. `VITE_CAPTURE=true npm run test:journey`
  writes frames.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition; ignore it.

## Scope

**Owned files:** `app/browser/types.ts`, `app/browser/constants.ts`,
`app/browser/components/Notice.vue`, `tests/app/browser/components/Notice.test.ts`.

**Off-limits:** every other file, including the three form components, every other view, the
stylesheet layer, `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`,
`guides/README.md`, `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. `NoticeCategory` has three members and `refusal` appears nowhere under `app/` or `tests/app/`.
5. `NAV_ITEMS` carries no bare label literal, and the rendered name `Products` is unchanged.
6. `npm run test:app:browser` passes.
7. `npm run test:journey` is green for all four projects.
8. `npm test` exits 0.

## Deviation contract

A conflict with either change stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a form component. Do not change an accessible name.

## Output

Write your report to `tmp/units/u10-report.md`, and make your final message the same content:
done/not done per criterion, what each change touched, and anything you did not close.

No process diary.
