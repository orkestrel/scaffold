<!-- sol on Astra (gpt-6-astra), bench unit, journal tmp/codex/cl11-2.jsonl, thread
01a0c7cc-10be-7811-ae6f-a4956faebbbc, exit=0. Sole writer in the Veneer checkout, continuing the
authored CL11 tree from 0e0b055. Round 1 was written natively by Opus 5, so this fix round went to
an engine that did not write it. Retained 2026-09-22 from the --output-last-message file. Its
brief is cl11-brief-2.md over cl11-brief.md; its measurements are cl11-fix-terrain.md. It carries
retention corrections to cl11-report.md, whose body is left unchanged. -->

CL11 fix-round report — 2026-09-22

The brief 2 proof-layer fixes are implemented over the authored CL11 tree at `0e0b055`. The gate chain, the requested Edge projects, and the final capture run passed. The distribution command exited 0, but its registry-dependent cases skipped; this round did not obtain a fresh installed-consumer reading.

The work ran directly in the sol role on Astra, with no delegation, commit, push, or dependency change. Round 1's accepted behavior remains in place. The staged scope report was absent; I read its retained copy at `../scaffold/.orkestrel/veneer/units/cl11-scope-read-report.md`.

Retention corrections to `cl11-report.md`: the universal byte-identity claim is false, although the home and Button rest frames depict the same resting page. The changed case title belongs to `tests/setupBrowser.test.ts`; `ButtonSection.test.ts` carries rename call sites only. The claim that frame reading lacked a usable base path is also withdrawn: the portfolio retains absolute paths, and the capture run successfully reads those paths. The prior report's body is unchanged. The false byte-identity and copy-fidelity claims in the `CASCADE_KEYS` doc block were corrected.

**Frame guard.** The capture-only portfolio case reads every accumulated absolute path through `commands.readFile(path, 'base64')`. The exported `measureFrameVariation` helper decodes the PNG and compares every pixel's RGBA channels with the first pixel. The assertion requires positive variation and names the offending path. Its readings are retained in each variant's text artifact.

The installed `@orkestrel/test/browser` entry implements `readFrame` as a dimension and bottom-row reading. That contract cannot answer this non-blank question. The added sampler uses the browser's image decoder and canvas over the written bytes; it does not infer image content from computed CSS.

The copy comparison remains, with comments limiting its claim to each key's declared property. It runs after placement and cannot prevent a bad file from being written. A failed pixel assertion makes the run red while retaining the evidence.

The permanent `distinguishes retained blank and painted PNG frames by pixels across the image` case uses the actual `plain--light-390.png` and `lifted-link--light-390.png` bytes from `tmp/probe`. Their base64 representations live in `CAPTURE_CONTROLS` in the owned setup module, so the control survives a scratch-directory sweep without a fixture file. Another permanent case checks rejection of undecodable bytes.

**Dark twins.** The container and row twins remain registered. The cascade journey reads the photographed copy's `color` in each mode and asserts that the values differ for each key. The measured values were `oklch(0.208 0.042 265.755)` in light mode and `oklch(0.929 0.013 255.508)` in dark mode. Their existing layout assertions remain.

For each key separately, I temporarily forced the dark lifted copy to inherit its recorded light text color. Each mutation failed its corresponding paint assertion. This command ran the controls and then passed after removing them:

```text
node tmp/cl11-run.mjs tmp/cl11-2-container-red.log.txt - - run test:journey -- --project journey:light-390 -t "renders the container"
node tmp/cl11-run.mjs tmp/cl11-2-row-red.log.txt - - run test:journey -- --project journey:light-390 -t "renders the container"
node tmp/cl11-run.mjs tmp/cl11-2-paint-green.log.txt - - run test:journey -- --project journey:light-390 -t "renders the container"
```

Each red run exited 1 with `1 failed | 22 skipped (23)` and reported:

```text
AssertionError: expected 'oklch(0.208 0.042 265.755)' not to be 'oklch(0.208 0.042 265.755)' // Object.is equality
```

The green run exited 0 with `1 passed | 22 skipped (23)`.

**Restore-refusal cleanup.** The case's visit and assertions are inside a `try`; `page.viewport(original.width, original.height)` runs in `finally`. The following case still independently reads the original viewport.

I changed the case's final visited-width expectation from 576 to 577. Before the fix, the assertion failed and the following case also failed, reading width 576 instead of 414. After the fix, the planted assertion still failed, but the following case passed. Removing the plant returned the focused run to green.

The initial command also carried the independent blank-control plant:

```text
npm.cmd run test:setup:browser -- -t "distinguishes retained|breakpoint viewport restoration"
Tests  3 failed | 2 passed | 37 skipped (42)
```

After adding unconditional cleanup and correcting the blank-control expectation, the same selection reported:

```text
Tests  1 failed | 4 passed | 37 skipped (42)
```

Only the intentionally wrong 577 expectation failed. That reading is retained in `tmp/cl11-2-cleanup-planted.log.txt`. After removing that plant, the selection exited 0:

```text
node tmp/cl11-run.mjs tmp/cl11-2-controls-green.log.txt - - run test:setup:browser -- -t "distinguishes retained|breakpoint viewport restoration"
Tests  5 passed | 37 skipped (42)
NATIVE_EXIT=0
```

**Cascade state uniqueness.** I deleted the first-segment uniqueness assertion and its misleading comment. The preceding case still enforces specimen and selector uniqueness, and the state case still enforces full-name uniqueness. A distinct specimen sharing a family prefix is no longer rejected by that prefix check. A duplicate specimen, selector, or full state name remains rejected. No key or state was added or removed.

**Blank-control red and green.** I applied the capture assertion, `toBeGreaterThan(0)`, to the retained blank control. The exact command was:

```text
node tmp/cl11-run.mjs tmp/cl11-2-blank-red.log.txt - - run test:setup:browser -- -t "distinguishes retained"
```

Its relevant output was:

```text
FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts > browser setup > distinguishes retained blank and painted PNG frames by pixels across the image
AssertionError: expected 0 to be greater than 0
Test Files  1 failed (1)
Tests  1 failed | 41 skipped (42)
NATIVE_EXIT=1
```

The permanent case expects zero for that blank and positive variation for the retained painted link. After restoring that expectation, this command ran the same case:

```text
node tmp/cl11-run.mjs tmp/cl11-2-blank-green.log.txt - - run test:setup:browser -- -t "distinguishes retained"
```

Its final output was:

```text
Test Files  1 passed (1)
Tests  1 passed | 41 skipped (42)
NATIVE_EXIT=0
```

I also executed the audit's capture-target mutation: the cascade placement received the offscreen `subject` instead of the lifted `copy`. The property comparison remained green, and the written-frame assertion failed:

```text
node tmp/cl11-run.mjs tmp/cl11-2-offscreen-red.log.txt - 1 run test:journey -- --project journey:light-390

AssertionError: Uniform blank frame: C:/Users/mikes/WebstormProjects/veneer/tmp/capture/states/container-capped-rest--light-390.png: expected 0 to be greater than 0
Test Files  1 failed (1)
Tests  1 failed | 22 passed (23)
NATIVE_EXIT=1
```

I removed that mutation by returning the placement argument to `copy`. The same project then passed:

```text
node tmp/cl11-run.mjs tmp/cl11-2-offscreen-green.log.txt - 1 run test:journey -- --project journey:light-390

Test Files  1 passed (1)
Tests  23 passed (23)
NATIVE_EXIT=0
```

**Unknowns.** The guard belongs in the capture-only case because that case already owns the completed path population and filename membership assertion. It checks every written frame without distributing duplicate readback logic among placement sites.

The sampler examines the complete image, including every row. It detects the uniform blank condition demonstrated by the retained control and the offscreen-target mutation. Unrelated nonuniform paint, noise, partial content, or the wrong nonuniform image can defeat it. It does not prove full visual equivalence between a lifted specimen and its original.

Before retaining the dark twins, I searched the existing state names in `tests`, `app`, and `guides`; the follow-up search also covered `src`, `configs`, and `package.json`. Literal references occur in `tests/setup.ts` and `tests/app/browser/integration.test.ts`. The generic derivation assertions are in the owned setup proof. No out-of-scope literal consumer was found. No twin was dropped, so no proof was left asserting an unregistered state.

No `prove` receipt was issued. The brief settles that instrument's unavailability in this bench context. These results are executed test readings, not receipts.

**Gate readings.** The runner at `tmp/cl11-run.mjs` records the native npm process exit code. Its arguments are the log path, browser channel (`-` leaves it unset), capture flag (`-` leaves it unset), and npm arguments. Gate logs use the `tmp/cl11-2-` prefix.

The required chain ran in order on the final code:

| Command | Exit | Final result |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root and scoped checks completed without diagnostics |
| `npm run build` | 0 | `✓ built in 591ms` |
| `npm test` | 0 | Project results following |
| `npm run test:distribution` | 0 | `1 passed \| 8 skipped (9)` |

The whole-suite log is `tmp/cl11-2-test.log.txt`. Its result lines, in command order, were:

| Project or script | Result |
| --- | --- |
| `test:src` browser/core run | `51 passed (51)` |
| `test:src:styles` | `411 passed (411)` |
| `test:app` | `26 passed (26)` |
| `test:journey` | `88 passed \| 4 skipped (92)` |
| `test:policy` | `109 passed \| 1 skipped (110)` |
| `test:config` | `173 passed \| 1 skipped (174)` |
| `test:setup` | `156 passed (156)` |
| `test:setup:browser` | `42 passed (42)` |
| `test:conformance` | `10 passed (10)` |
| `test:guides` | `18 passed (18)` |

With `PLAYWRIGHT_CHANNEL=msedge`, the requested projects reported:

| Command | Exit | Final result |
| --- | --- | --- |
| `npm run test:src:styles` | 0 | `411 passed (411)` |
| `npm run test:setup:browser` | 0 | `42 passed (42)` |
| `npm run test:app` | 0 | `26 passed (26)` |
| `npm run test:journey` | 0 | `88 passed \| 4 skipped (92)` |

Those logs are `tmp/cl11-2-edge-styles.log.txt`, `tmp/cl11-2-edge-setupbrowser.log.txt`, `tmp/cl11-2-edge-app.log.txt`, and `tmp/cl11-2-edge-journey.log.txt`. The ordinary journey skips are the capture-only case in each variant.

The final capture command regenerated the portfolio after removing every mutation:

```text
node tmp/cl11-run.mjs tmp/cl11-2-capture-final.log.txt - 1 run test:journey

Test Files  4 passed (4)
Tests  92 passed (92)
NATIVE_EXIT=0
```

No registered frame returned a uniform blank. Every path passed the pixel assertion. Frames remain under `tmp/capture/states`; the `light-1280.txt`, `light-390.txt`, `dark-1280.txt`, and `dark-390.txt` artifacts under `tmp/capture` retain the path and variation readings.

The distribution reading is limited. The separate verbose run also exited 0 and explicitly reported:

```text
[`npm ping` did not answer, so nothing was packed or installed]
Tests  1 passed | 8 skipped (9)
```

Its command was `node tmp/cl11-run.mjs tmp/cl11-2-distribution-verbose.log.txt - - run test:distribution -- --reporter=verbose`. The classifier case passed; the packed-CSS consumer case did not run. A fresh distribution verification remains for the Orchestrator on a host where the registry prerequisite succeeds. This does not replace or reopen round 1's accepted distribution evidence.

**Tree evidence.** The following is the actual `git diff --stat` output against HEAD, including the preserved round 1 work:

```text
 tests/app/browser/integration.test.ts            | 156 +++++++++++++++----
 tests/app/browser/sections/ButtonSection.test.ts |  14 +-
 tests/distribution.test.ts                       | 132 +++++++++++++++-
 tests/setup.test.ts                              |  32 +++-
 tests/setup.ts                                   | 100 ++++++++++++
 tests/setupBrowser.test.ts                       | 189 +++++++++++++++++++++--
 tests/setupBrowser.ts                            | 149 +++++++++++++++---
 7 files changed, 700 insertions(+), 72 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output was:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/ButtonSection.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

Every listed path is owned. No tracked file was added. `git diff --check` exited 0. This round did not edit `ButtonSection.test.ts` or `distribution.test.ts`; their listed changes are preserved round 1 work.

No implementation obligation remains open. The fresh installed-consumer reading remains unavailable as described. The specimen term collision, the Button-family state list, the fluid container reading, and the shipped package were left alone.