# Audit lane — `analyst` on GPT-6 Astra, objective lane, F7 CAPTURE fix round

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer-f7`. You hold the **objective** lane over the F7 fix round, which
`opus` wrote from `.orkestrel/veneer/units/f7-brief-2.md`; you are the engine that did not
write it. Perform the audit directly and spawn nothing. Bound: rule within 20 minutes.

## Subject and evidence

The worktree carries the F7 unit's first-round writes and the fix round's writes, all uncommitted
over `07fc3c3`. `.orkestrel/veneer/units/f7-fix.diff` is the whole diff against `07fc3c3` and
`f7-fix-status.txt` the status; the fix round's own report
`.orkestrel/veneer/units/f7-report-2.md` names the files it touched, its measurements, its
deviations, and the claims it flagged unverified; the successor brief
`.orkestrel/veneer/units/f7-brief-2.md` names the findings each obligation carries, and the
round-1 verdicts `.orkestrel/veneer/units/f7-audit-{analyst,reviewer,checker}-verdict.md` are
where those findings came from. The gate chain over this tree is being written to
`.orkestrel/veneer/units/f7-fix-gates.log.txt` (a symbolic link to the Orchestrator's
scratchpad log), complete when its last line reads `=== gates done`; read it last.
`tmp/capture/states/` in the worktree holds the frames and accessibility artifacts the fix round's
final capture run wrote, and `tmp/capture/` its manifests; both are evidence, and untracked.

Standing conditions at launch: the sandbox denies every Vitest project, browser and Node alike, so a
claim about a proof is ruled on the mutation named and whether the assertions distinguish it, and a
claim that needs an executed run is `UNRESOLVED` with the exact settling command named; the
Orchestrator takes that run on the host. `npm run check` is allowed and is how claim 3 is settled.
The installed `@orkestrel/test` package's declarations are at
`/home/user/veneer-f7/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`.

## Claims

1. **The accessibility artifact is subject-rooted.** `describeSubject(subject, reading)` in
   `tests/setupBrowser.ts` wraps the subject in a roleless scope, takes the tree walk and the focus
   walk through that scope, and restores the subject under its own parent in a `finally`; the artifact
   body carries `subject:`, `variant:`, `state:`, `tree:`, and `focus:` lines typed by
   `SubjectReading`; the fallbacks read `No element in this subject carries a role.` and
   `No control inside this subject is reachable.`; a walk taken on the subject rather than the scope
   fails the case `describes a control-rooted subject through a scope that encloses it` in
   `tests/setupBrowser.test.ts` and the journey case `writes each subject its own accessibility
   artifact for the variant that rendered it` (name what each asserts that the mutation breaks).
2. **The frame guard reads the frames on disk.** The journey's guard walks the registry's expansion
   for the run's variant, reads each name out of `tmp/capture/states` through the runner's file
   command, and guards whatever answered; `FrameManager` records a scenario's region on every
   placement; `FramePlacement` is a scenario and its region; the empty-population reading is
   unconditional (`expect(present.length > 0).toBe(direct !== undefined)`), so a guard that reads
   nothing while the frame sits on disk reddens; the sampler's clip case pins its denominator
   (removing the four clamps in `measureVariation` fails `clips a region reaching past the frame, and
   refuses one that clips to nothing`); the manifests under `tmp/capture/` record the guard reading
   each variant's whole expansion with the capture flag unset.
3. **The registry grammar is typed.** `tests/setup.ts` declares `CaptureTheme`,
   `CaptureVariantName`, `CaptureSubject`, `CaptureState`, `CaptureStem`, `CaptureScenario`, and
   `CaptureFilename` as the report states them; `CaptureKey`, `CAPTURE_SCENARIOS`,
   `FrameManager.place`, `FrameManager.page`, and the journey's filename construction carry those
   types; `isVariantName` narrows the provided variant string and `tests/setup.test.ts` proves it
   against the refused spellings; run `npm run check` with `primary-hover` rewritten to
   `primary-hover--light-390-chromium` in `BUTTON_KEYS` and confirm TS2322 at the `tests/setup.ts`
   site, then confirm the unmodified tree typechecks (you cannot edit: rule this from the type text
   and say so, or run the check on a copy under the system temporary directory if the sandbox allows
   that write).
4. **The reviewer's findings are closed as ruled.** The accessibility proof asserts each subject's
   own artifact body (`Primary` names `button "Primary"` in both halves, `Role links` names a
   `link "` line the `Showcase` reading does not, the two bodies differ, `Capped container` records
   both fallbacks); the scenario-level filename law lives in `tests/setup.test.ts` alone and the
   journey keeps only the expanded-filename law; `FrameManager.place(scenario, subject, frame = subject)`
   and `FrameManager.page(scenario, subject)` are the whole placement surface and no call site omits
   an argument to mean something; the `declared.size` assertion is retired and its neighbour still
   refuses an undeclared subject; `readSubject` collects candidates through a `Set` and
   `resolves an element answering to two declarations as the one subject it is` fails without it.
5. **The guide's capture paragraphs are true.** § Tests states the stem rule and names the CL13
   Bootstrap 5.3.8 portfolio as its source without a counterpart-stem column and says no listing is
   retained; the side-by-side paragraph stands apart and says `a counterpart frame`; § Showcase names
   the actor and keeps the region sentence; `tests/setup.ts` and `tests/setup.test.ts` no longer
   attribute the counterpart portfolio to Elements; the artifact rule (one subject, one variant, the
   subject's stem, `state: rest`) is stated where the report says.
6. **The counts are gone.** `grep -n 'nine role links\|a ninth\|the three declarations\|three ways'
   tests/setup.ts tests/setupBrowser.ts tests/app/browser/integration.test.ts guides/veneer.md`
   prints nothing.
7. **The deviations are sound.** `CaptureVariantName` and `CaptureFilename` avoid the installed
   package's `CaptureVariant` and `captureFrame` names (confirm the declarations exist in the installed
   `index.d.ts`); the unconditional-expect shape satisfies `vitest(no-conditional-expect)` while still
   distinguishing an empty population from an unread one; `ProvidedContext.variant` stays `string`
   for the reason given (`configs/app/vite.journey.config.ts` is off-limits).
8. **Scope is honest.** The status lists exactly `guides/veneer.md`,
   `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`,
   `tests/setupBrowser.test.ts`, and `tests/setupBrowser.ts`; `tmp/probe/` and the prune sentinel
   are absent; nothing outside the owned set changed; `vite.config.ts` and `ROADMAP.md` carry no diff.
9. **The gate chain is green** (UNRESOLVED if the log lacks `=== gates done` when you read it).

## What you can execute

Read-only in the worktree: `grep`, `sed -n`, `cat`, `ls`, `git diff`, `git show 07fc3c3:<path>`, and
`node -e` that writes nothing, with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
`npm run check` is allowed. No Vitest project runs here. Never edit the worktree.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts with `file:line`, findings
outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
