## 1. Done / not done

Acceptance results are recorded by criterion.

1. **Done** — scoped `oxfmt --check` passes.
2. **Done** — scoped `oxlint --deny-warnings` passes.
3. **Done** — `npm run check` passes.
4. **Done** — request members use single words; obsolete members and prohibited constructs are absent.
5. **Done** — the contract and its reasoning preceded implementation in `app/browser/types.ts`; request refs and collections are readonly.
6. **Done** — subscription reproduction ran red before the behavior change and green afterward.
7. **Done** — contact and payment carry the same red/green proof.
8. **Done** — `npm run test:app:browser` passes: 60 tests.
9. **Done** — every summary entry passes the centre-hit assertion at 320 and 390 CSS px in Chromium with the shipped shell mounted.
10. **Done** — every declared journey project passes.
11. **Done** — `npm test` exits 0 end to end.

## 2. The shape

`ApplicationInterface.subscription`, `inquiry`, and `payment` expose `RequestInterface<Value, Field>`: readonly `accepted` and `issues` refs, plus `check(input)` and `submit(input)`.

The owning noun supplies the domain. This grouping owns a real validation/acceptance boundary: checking updates feedback; submitting alone stores acceptance and emits. The controller shares feedback handling through its private `#validate` method and reuses the unchanged core parsers.

An undefined issues value means unchecked or accepted. An empty collection means a valid checked draft, preserving revalidation when later edits become invalid.

The `subscribe`, `inquire`, and `pay` events retain their names and payloads because they still describe accepted actions. All affected consumers changed together. No compatibility shim, barrel change, or composable change was needed.

## 3. The failing proof

The same command produced the before and after results:

```sh
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/components/SubscribeForm.test.ts tests/app/browser/components/ContactForm.test.ts tests/app/browser/components/PaymentForm.test.ts
```

The recorded results are:

| Form | Before behavior change | After fixes |
|---|---|---|
| SubscribeForm | 1 failed | 3 passed |
| ContactForm | 1 failed | 3 passed |
| PaymentForm | 1 failed | 3 passed |

Before: **3 failed**, recorded in `tmp/codex/u3-before.log`. Each reproduction observed the missing form, acceptance text, and an event before explicit submission.

After: **9 passed**, recorded in `tmp/codex/u3-after.log`. Each form includes its submission regression and the viewport geometry cases. The regression also checks blur, valid-to-invalid editing, and exactly one event after explicit submission.

## 4. Defect three

Closing validation commits did **not** close the hit-target defect. After that fix alone, the payment customer link at 390 CSS px measured **142.921875 × 46.59375**; its centre hit **LI**, not the anchor. See `tmp/codex/u3-geometry-before.log`.

The fix uses the **shipped Bootstrap utility rung**: `d-block` gives each link a contiguous rectangle. No authored SCSS was needed.

The full-shell proof also exposed refusal-summary positioning: the narrow journey still reported a centre hitting `DIV` after the utility change. Each form now focuses the summary with `preventScroll`, then centres it using native instant scrolling.

The final payment customer link measures **202 × 51.1875** at 390 CSS px and **132 × 51.1875** at 320 CSS px; each centre hits **A**. Every subscription, inquiry, and payment entry passes. The final tests measure the rendered positions without scrolling links themselves.

## 5. Shared-file patches

None. The existing journeys pass with the application fixes. Neither shared file was edited.

## 6. Observations

The timed `npm test` run exited **0** in **67 seconds**. Its stages report application **91 passed**, journeys **68 passed / 4 skipped**, policy **111 passed**, and configuration **46 passed**. Evidence is in `tmp/codex/u3-test.log` and `tmp/codex/u3-duration.txt`; the executed gate script is `tmp/codex/u3-gates.sh`.

Per-variant results are:

| Project | Result |
|---|---|
| journey:light-1280 | Passed |
| journey:dark-1280 | Passed |
| journey:light-390 | Passed |
| journey:dark-390 | Passed |

The skipped cases write screenshot files only when capture mode is enabled; this run used the default disabled mode.

Sass still reports **313 repetitive deprecation warnings omitted**. This standing condition remains with unit 4.

The registered proof instrument returned `MCP tool call requires approval, but approval policy is never`. It produced no receipt. Behavioral evidence comes from the recorded Chromium red/green runs.

## 7. What you did not close

No acceptance criterion remains open. Guide reconciliation, accepted-state continuation, and Sass migration remain with their assigned units.

The auxiliary frontend static audit reports existing shell-button, marketplace-form, and textarea-resize findings in `tmp/codex/u3-premium-audit.json`. They are outside this brief’s defect scope and were left unchanged.

Pre-existing `.orkestrel/` changes were preserved. No dependencies were installed, and nothing was committed or pushed.