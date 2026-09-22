# Unit F7 CAPTURE — report 2 (the fix round)

Successor to `f7-brief.md`'s run, executed from `f7-brief-2.md` in `/home/user/veneer-f7`
(detached at `07fc3c3` plus the first run's writes). Every measurement here was taken on this host
on 2026-09-22, with npm 11.19.1 and Chromium 141 at `/opt/pw-browsers`.

Every obligation is done. No obligation was deferred and nothing outside the owned set was edited.

## The two pre-edit measurements

**The installed portfolio does not prune `tmp/capture/states/`.** `createPortfolio` and
`captureFrame` in `node_modules/@orkestrel/test/dist/src/browser/index.js` write and read back; no
path in either deletes. Measured as well as read: `tmp/capture/states/prune-sentinel.txt` was
planted at 19:06:13 UTC before any edit, and it was still there after `CAPTURE=1 npm run test:journey`
had rewritten every frame at 19:27 UTC. The baseline's `home--*.png` frames are gone because the
registry no longer carries that scenario and nothing removes a frame whose name left the registry —
a stale frame outlives its scenario. The sentinel was removed before this report was written.

**`describeFocus` returns the subject's own control when it is called on an enclosing scope, and
nothing when it is called on the subject.** Measured in the browser project against the mounted
showcase, writing the readings to `tmp/probe/focus.txt`:

```text
direct focus: ""
scoped focus: "1. button \"Primary\""
direct tree: "button \"Primary\""
scoped tree: "button \"Primary\""
restored parent: specimens
```

`describeTree` already describes its root, so only the focus half was losing the subject. The wrap
and unwrap put the subject back under its own parent, and the page inventory still listed it.

## Per obligation

### 1 — the accessibility artifacts (analyst 3; reviewer F3, F6)

`describeSubject(subject, reading)` in `tests/setupBrowser.ts` is the artifact's one contract. It
wraps the subject in a roleless scope, takes both walks through that scope, and puts the subject
back in a `finally`. The body carries `state:` beside `subject:` and `variant:`, and the fallbacks
are worded for what the walk covers: `No element in this subject carries a role.` and
`No control inside this subject is reachable.` `SubjectReading` types the heading lines, so the name
is a `CaptureSubject`, the variant a `CaptureVariantName`, and the state a `CaptureState`.

The written artifact for a control-rooted subject now reads:

```text
subject: Primary
variant: dark-390
state: rest
tree:
button "Primary"
focus:
1. button "Primary"
```

Red then green, `npm run test:setup:browser`, walks taken on the subject rather than the scope:
exit 1, 1 failed and 53 passed, failing `describes a control-rooted subject through a scope that
encloses it`. Restored: exit 0, 54 passed.

Red then green, `npm run test:journey`, same mutation: exit 1, 4 failed and 96 passed, each variant
failing `writes each subject its own accessibility artifact for the variant that rendered it` with
`expected 'focus:\nNo control inside this subjec…' to contain 'button "Primary"'`. Restored: exit 0,
100 passed.

The guide states the artifact rule: one artifact covers one subject and one variant, its stem is the
subject's where a frame's stem is the scenario's, and the Button scenarios' frames therefore share
the `primary` and the `toggle` artifact.

Files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, `guides/veneer.md`.

### 2 — the guard's population (analyst 4; reviewer referral)

The guard reads the frames on disk. It walks the registry's own expansion for this run's variant,
reads each name back out of `tmp/capture/states` through the runner's file command, and guards
whatever answered. `FrameManager` records a scenario's region on every placement rather than only
where a file was written, so a run with the flag unset has the region for a frame an earlier capture
run left. `FramePlacement` is now the scenario and its region; the written path comes from the
portfolio.

The empty population is held to the directory rather than passed over: the first expanded name is
read directly and `expect(present.length > 0).toBe(direct !== undefined)` compares the population
against that reading, so a guard that reads nothing while the frame sits on disk reddens.

Red then green, `npm run test:journey` with the flag unset and the saved frames present, the
population taken from this run's own writes instead of from disk: exit 1, 4 failed and 96 passed,
each variant failing `reads every frame this variant left in the portfolio directory inside its
declared region` with `expected false to be true`. Restored: exit 0, 100 passed, and each variant's
manifest records the guard reading its whole expansion for that variant from disk.

The sampler's clip case pins its denominator: a region reaching past the frame now has to read
exactly what the whole frame reads, and the reading is bounded below 1. Red then green,
`npm run test:setup:browser` with the four clamps in `measureVariation` removed: exit 1, 1 failed
and 53 passed, failing `clips a region reaching past the frame, and refuses one that clips to
nothing`. Restored: exit 0, 54 passed.

Files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, `guides/veneer.md`.

### 3 — the registry types (analyst 11)

`tests/setup.ts` declares the grammar as types and the registry rows are written in them:

- `CaptureTheme` is `'dark' | 'light'`.
- `CaptureVariantName` is `` `${CaptureTheme}-${number}` ``.
- `CaptureSubject` is the union of declared subject names; `CaptureState` the states a journey
  drives or reads.
- `CaptureStem<S>` reduces a declared name to its stem at the type level, mirroring `buildStem`, and
  defaults to every subject, so the bare type is each subject's stem.
- `CaptureScenario` is `` CaptureStem | `${CaptureStem}-${CaptureState}` ``.
- `CaptureFilename` is `` `${CaptureScenario}--${CaptureVariantName}.png` ``.

`CaptureKey.scenario` and `.subject` carry those types, `CAPTURE_SCENARIOS` is
`readonly CaptureScenario[]`, `FrameManager.place` and `FrameManager.page` take a `CaptureScenario`,
and the journey's guard builds each name it reads as a `CaptureFilename`. `isVariantName` narrows
the plain string the journey's project provides before a filename is built on it.

Red then green, `npm run check`, with `primary-hover` rewritten to
`primary-hover--light-390-chromium` in `BUTTON_KEYS`: exit 2,
`tests/setup.ts(213,14): error TS2322: Type 'readonly (… { scenario: "primary-hover--light-390-chromium"; subject: "Primary"; } …)[]' is not assignable to type 'readonly CaptureKey[]'`.
Restored: exit 0, no diagnostic.

A separate probe under `tmp/probe/` compiled the grammar against its controls before it was adopted.
Refused there, each with its own diagnostic: `primary-hover--light-390-chromium`, `primary-hoverr`,
`primary-dark`, `light-390-chromium`, `chromium-390`, and
`role-links--light-390-chromium.png`. Accepted: every registered scenario, `light-1280`, `dark-390`,
and `role-links--light-390.png`.

`isVariantName` is proven at runtime in `tests/setup.test.ts` against the same refused spellings.

Files: `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`,
`tests/app/browser/integration.test.ts`, `guides/veneer.md`.

### 4 — the proof that cannot fail, the duplicated law, and the placement signature (reviewer F4, F5, F7)

**The accessibility proof.** It reads each subject's own artifact body: `Primary` names
`button "Primary"` in the tree half and in the focus half, `Role links` names a `link "` line the
`Showcase` page reading does not, the two bodies are not equal, and `Capped container` records both
fallbacks. A writer handing every subject the same page dump reddens on the `Role links` and
`Showcase` pair; a writer dropping the scope reddens on `Primary`. Both mutations were run, and § 1
gives their readings.

**The duplicated law.** The scenario-level filename law lives in `tests/setup.test.ts` alone. The
journey keeps the expanded-filename law read off `expandCaptures`, and its comment names where the
other half lives.

**The placement signature.** `FrameManager.place(scenario, subject, frame = subject)` shoots an
element frame and `FrameManager.page(scenario, subject)` a page frame, both through one private
staging path. No call site omits an argument to mean something: `FRAMES.page('showcase', …)`,
`FRAMES.page('primary-focus', host)`, `FRAMES.place('primary-hover', host)`.

**The dead assertion.** `expect(declared.size).toBeGreaterThan(CAPTURE_KEYS.length)` is retired. Its
neighbour already refuses an undeclared subject, and an empty `declared` set reddens that neighbour,
so no mutation separated the two.

**`readSubject`'s candidates** are collected through a `Set` before the ambiguity check. Red then
green, `npm run test:setup:browser` with the set removed: exit 1, 1 failed and 53 passed, failing
`resolves an element answering to two declarations as the one subject it is`. Restored: exit 0,
54 passed.

Files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`.

### 5 — the guide's capture paragraphs (analyst 1; reviewer F1, F2)

§ Tests states the Veneer-side rule — a scenario's stem is its subject's stem, and a driven state
follows it — and names where the rule came from: the Bootstrap 5.3.8 portfolio the CL13 round shot
of the same markup, whose stems match that registry's specimen names. The counterpart-stem column is
dropped; the table now carries the Veneer stem and its subject. The paragraph says plainly that no
listing of that portfolio is retained here and that the appearance round reading one pairs the rows.

The side-by-side-limit paragraph is separated from the style-proof index by a blank line, and it
says "a counterpart frame" where it said "an Elements frame".

§ Showcase keeps the region sentence in its opening paragraph with the actor named — "The showcase's
own button drives the controller and announces the selected mode" — and the capture-registry
sentences follow in their own paragraph.

The same false attribution in the registry's own prose is corrected: `buildStem` and
`CAPTURE_SCENARIOS` in `tests/setup.ts` and the stem law's comment in `tests/setup.test.ts` no longer
say the counterpart portfolio is Elements'.

Files: `guides/veneer.md`, `tests/setup.ts`, `tests/setup.test.ts`.

### 6 — the counts (analyst 10; reviewer 10)

- `tests/app/browser/integration.test.ts`: "one of its nine role links" → "one of its role links".
- `tests/setup.ts`: "carries a ninth of the role links" → "carries one role link".
- `tests/setupBrowser.ts`: "The three declarations … three ways" → "The declarations … in separate
  ways", and the `@throws` line reads "when separate declarations answer to it".
- `guides/veneer.md`: "carries one of the role links" → "carries one role link".

`grep -n 'nine role links\|a ninth\|the three declarations\|three ways' tests/setup.ts
tests/setupBrowser.ts tests/app/browser/integration.test.ts` prints nothing (exit 1).

## What the final capture run wrote

`CAPTURE=1 npm run test:journey`, exit 0, 100 passed across 4 files, 65.94 s. Nothing else is in
`tmp/capture/states/`.

**Frames**, four variants each (`dark-1280`, `dark-390`, `light-1280`, `light-390`):
`base`, `capped-container`, `numbered-columns`, `primary-active`, `primary-focus`, `primary-hover`,
`role-links`, `showcase`, `toggle-pressed`, each as `<scenario>--<variant>.png`.

**Accessibility artifacts**, four variants each: `base`, `capped-container`, `numbered-columns`,
`primary`, `role-links`, `showcase`, `toggle`, each as `<subject>--<variant>-accessibility.txt`.

The guard's readings, from the manifests that run wrote. Size and floor are `readFrame`'s, the region
is what the scenario declared at staging, and the variation is the fraction of that region's pixels
differing from its first pixel. Every row matches the first run's table, which is the reading the
change was meant to leave alone.

| Scenario | Variant | Frame | Floor | Region | Variation |
| --- | --- | --- | --- | --- | --- |
| `base` | dark-1280 | 1280x149 | `rgb(20, 25, 30)` | 0,0 1280x148 | 0.0361 |
| `base` | dark-390 | 390x149 | `rgb(20, 25, 30)` | 0,0 390x148 | 0.0722 |
| `base` | light-1280 | 1280x149 | `rgb(255, 255, 255)` | 0,0 1280x148 | 0.0357 |
| `base` | light-390 | 390x149 | `rgb(255, 255, 255)` | 0,0 390x148 | 0.0710 |
| `capped-container` | dark-1280 | 1280x21 | `rgb(20, 25, 30)` | 70,0 1140x21 | 0.0648 |
| `capped-container` | dark-390 | 390x21 | `rgb(20, 25, 30)` | 0,0 390x21 | 0.1895 |
| `capped-container` | light-1280 | 1280x21 | `rgb(255, 255, 255)` | 70,0 1140x21 | 0.0618 |
| `capped-container` | light-390 | 390x21 | `rgb(255, 255, 255)` | 0,0 390x21 | 0.1807 |
| `numbered-columns` | dark-1280 | 1280x21 | `rgb(20, 25, 30)` | 0,0 1280x21 | 0.0567 |
| `numbered-columns` | dark-390 | 390x42 | `rgb(20, 25, 30)` | 0,0 390x42 | 0.0927 |
| `numbered-columns` | light-1280 | 1280x21 | `rgb(255, 255, 255)` | 0,0 1280x21 | 0.0542 |
| `numbered-columns` | light-390 | 390x42 | `rgb(255, 255, 255)` | 0,0 390x42 | 0.0881 |
| `primary-active` | dark-1280 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-active` | dark-390 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-active` | light-1280 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `primary-active` | light-390 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `primary-focus` | dark-1280 | 1280x8223 | `rgb(20, 25, 30)` | 0,120 80x35 | 0.9914 |
| `primary-focus` | dark-390 | 390x8802 | `rgb(20, 25, 30)` | 0,141 80x35 | 0.9914 |
| `primary-focus` | light-1280 | 1280x8223 | `rgb(255, 255, 255)` | 0,120 80x35 | 0.9914 |
| `primary-focus` | light-390 | 390x8802 | `rgb(255, 255, 255)` | 0,141 80x35 | 0.9914 |
| `primary-hover` | dark-1280 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-hover` | dark-390 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-hover` | light-1280 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `primary-hover` | light-390 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `role-links` | dark-1280 | 1280x21 | `rgb(20, 25, 30)` | 0,2 83x16 | 0.4940 |
| `role-links` | dark-390 | 390x63 | `rgb(20, 25, 30)` | 0,2 83x16 | 0.4940 |
| `role-links` | light-1280 | 1280x21 | `rgb(255, 255, 255)` | 0,2 83x16 | 0.4940 |
| `role-links` | light-390 | 390x63 | `rgb(255, 255, 255)` | 0,2 83x16 | 0.4940 |
| `showcase` | dark-1280 | 1280x8223 | `rgb(20, 25, 30)` | 0,78 1280x21 | 0.0878 |
| `showcase` | dark-390 | 390x8802 | `rgb(20, 25, 30)` | 0,78 390x21 | 0.2882 |
| `showcase` | light-1280 | 1280x8223 | `rgb(255, 255, 255)` | 0,78 1280x21 | 0.0850 |
| `showcase` | light-390 | 390x8802 | `rgb(255, 255, 255)` | 0,78 390x21 | 0.2790 |
| `toggle-pressed` | dark-1280 | 72x36 | `rgb(20, 25, 30)` | 0,0 71x35 | 0.9903 |
| `toggle-pressed` | dark-390 | 72x36 | `rgb(20, 25, 30)` | 0,0 71x35 | 0.9787 |
| `toggle-pressed` | light-1280 | 72x36 | `rgb(255, 255, 255)` | 0,0 71x35 | 0.9831 |
| `toggle-pressed` | light-390 | 72x36 | `rgb(255, 255, 255)` | 0,0 71x35 | 0.9714 |

The manifests in `tmp/capture/` are from the ordinary journey run inside `npm test` at 19:32 UTC,
which ran after the capture run and left the frames on disk untouched. Each of them records the
guard reading its variant's whole expansion out of `tmp/capture/states` with the flag unset, which is
the reading acceptance criterion 4 asks for.

## Commands and exit codes

Every command ran in `/home/user/veneer-f7` with npm 11.19.1 on `PATH`.

| Command | Exit | Reading |
| --- | --- | --- |
| `tsc --ignoreConfig … tmp/probe/grammar.ts` (grammar probe) | 2 | each refused control diagnosed, each accepted control silent |
| `npx vitest run … --project setup:browser -t 'MEASURE'` (focus probe) | 0 | the `describeFocus` readings in § The two pre-edit measurements |
| `npm run check`, project suffix planted | 2 | TS2322 at `tests/setup.ts:213` |
| `npm run check`, restored | 0 | no diagnostic |
| `npm run test:setup:browser`, unscoped artifact walk | 1 | 1 failed, 53 passed |
| `npm run test:setup:browser`, candidate set removed | 1 | 1 failed, 53 passed |
| `npm run test:setup:browser`, sampler clamps removed | 1 | 1 failed, 53 passed |
| `npm run test:journey`, guard reading this run's writes | 1 | 4 failed, 96 passed |
| `npm run test:journey`, unscoped artifact walk | 1 | 4 failed, 96 passed |

The gate chain below ran after the final edit to every owned file, in this order. Nothing was edited
after it began; the only later change to the tree was removing the prune sentinel and `tmp/probe/`,
both untracked.

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | all matched files use the correct format, 209 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root, src core, src browser, src styles, app browser |
| `npm run build` | 0 | src core, src browser, src styles, app browser |
| `npm run test:setup` | 0 | 125 passed, 3 files |
| `npm run test:setup:browser` | 0 | 54 passed, 1 file |
| `npm run test:app` | 0 | 26 passed, 10 files |
| `npm run test:journey` | 0 | 100 passed, 4 files, 50.08 s |
| `CAPTURE=1 npm run test:journey` | 0 | 100 passed, 4 files, 65.94 s |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm test` (observation) | 0 | src 73, src styles 412, app 26, journey 100, policy 109, config 173, setup 125, setup browser 54, conformance 11, guides 18 |

The setup project reported 124 passed before this round and 125 after; the browser setup project
50 before and 54 after; the journey 100 in both, its case list unchanged in size because the guard
case was replaced rather than added to.

## Tree state

`git status --porcelain`:

```text
 M guides/veneer.md
 M tests/app/browser/integration.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

`git diff --stat`:

```text
 guides/veneer.md                      |  75 +++++++-
 tests/app/browser/integration.test.ts | 342 ++++++++++++++++++++++++----------
 tests/setup.test.ts                   |  93 +++++----
 tests/setup.ts                        | 297 ++++++++++++++++++++++-------
 tests/setupBrowser.test.ts            | 193 ++++++++++++++++++-
 tests/setupBrowser.ts                 | 336 +++++++++++++++++++++++++++++++--
 6 files changed, 1118 insertions(+), 218 deletions(-)
```

The first run's files and nothing outside the owned set. `tmp/` is untracked and ignored; the probe
directory and the prune sentinel are deleted. `dist/` is ignored and carries the build the gates
produced.

### Files touched

- `tests/setup.ts` — the grammar types `CaptureTheme`, `CaptureVariantName`, `CaptureSubject`,
  `CaptureState`, `CaptureStem`, `CaptureScenario`, `CaptureFilename`, and the `isVariantName` guard;
  `CaptureKey`'s members typed by them; `CAPTURE_SCENARIOS` narrowed; the counterpart-portfolio
  prose corrected; the role-link count dropped.
- `tests/setup.test.ts` — the export inventory, the `isVariantName` case, and the stem law's comment.
- `tests/setupBrowser.ts` — `SubjectReading` and `describeSubject`; `FramePlacement` reduced to a
  scenario and its region; `FrameManager.place` defaulting its frame and `FrameManager.page` naming
  the page entry, both over one private staging path; `readSubject`'s candidate set and its prose.
- `tests/setupBrowser.test.ts` — the `describeSubject` cases, the two-declaration case, the clip
  case's pinned denominator, the frame-manager case against a disabled portfolio, and the inventory.
- `tests/app/browser/integration.test.ts` — the variant narrowed through `isVariantName`, the one
  directory spelling, the placements through `place` and `page`, the artifact case rewritten around
  `describeSubject` with its per-subject assertions, the guard reading the frames on disk, the
  duplicated scenario law removed, the dead assertion retired, and the role-link count dropped.
- `guides/veneer.md` — § Tests's capture paragraphs and § Showcase's capture sentences.

## Shared-file patches

**`vite.config.ts`: none.** The typed variant stops at the journey suite. `ProvidedContext.variant`
stays `string`, because the journey's project passes `variant.name` from a `JourneyVariant` in
`configs/app/vite.journey.config.ts`, and narrowing the provided context would redden that
off-limits file's typecheck. `isVariantName` narrows at the journey's own module scope instead, so
the grammar binds without a shared-file change.

**`ROADMAP.md`: the first run's proposed row edit still stands**, unchanged and unapplied. It is
quoted in `tmp/units/f7-report.md` § Shared-file patches.

## Deviations

1. **`CaptureVariant` is `@orkestrel/test`'s name, so this registry's type is `CaptureVariantName`.**
   - Expected: `CaptureVariant` for the type spelling a variant's name.
   - Found: `npm run test:policy` exit 1, `surface name belongs to one package: CaptureVariant
     (test)` at `tests/setup.ts:67`. The installed package declares `CaptureVariant` as the variant
     object — its name, viewport, and the change a run applies — at
     `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:297`.
   - Done: renamed for the thing it is, per `.claude/rules/names.md` § Fleet name ownership rule
     "The subject keeps the name". `CaptureFrame` was renamed to `CaptureFilename` in the same pass,
     because the installed `captureFrame` function shoots a frame and a type one letter away from it
     naming a filename is the same collision a case difference hides. The guard is `isVariantName`
     for one term per concept. `npm run test:policy` exit 0 after the rename.

2. **The guard's empty-population reading is unconditional, not a branch.**
   - Expected: an `if (present.length === 0)` branch asserting the first expanded frame is absent.
   - Found: `npm run lint:check` exit 1,
     `tests/app/browser/integration.test.ts:932:4: error vitest(no-conditional-expect)`.
   - Done: the first expanded name is read once, unconditionally, and the population is compared
     against that reading with `expect(present.length > 0).toBe(direct !== undefined)`. Same
     falsification, no conditional assertion. The red-first run in § 2 was retaken against this
     shape.

3. **The counterpart portfolio's stems cannot be verified here, so the column is dropped.** The
   brief's unknown is answered: no listing exists. `/home/user/scaffold/.orkestrel/veneer/units/`
   holds `cl13-portfolio-observations.md`, which lists Veneer's own frames, and no
   `cl13-capture-2.mjs`; the `.png` names inside `cl13-verdict.md` are Veneer's old names. The guide
   now states the Veneer-side rule, names CL13's Bootstrap 5.3.8 portfolio as where the rule came
   from, and says that pairing the two directories belongs to the appearance round that reads a
   listing.

4. **The artifact's state is `rest` for every subject, and the guide says so.** The brief left the
   `state:` wording to this unit. Every artifact is written in one case, on arrival, so a driven
   state would be a claim about a surface that case does not hold still. The Button scenarios' frames
   show focus, the pointer, and a press while their artifact reads at rest, and the guide states
   that pairing rather than leaving a reader to infer it.

5. **The first run's deviations still stand, unchanged.** The caption opt-out specimen is still
   blocked on F6's class; the journey suite is still `tests/app/browser/integration.test.ts`; a frame
   still carries no step token; `button-primary-rest` and `home-dark` stay removed. `tmp/units/f7-report.md`
   § Deviations holds the evidence for each, and nothing this round measured changed any of them.

## Unverified claims

- **The counterpart portfolio's stems.** CL13 finding 2 states that the Bootstrap side's stems match
  that registry's specimen names; no listing here corroborates it. The guide's rule rests on that
  finding and says so. Confirm against a real listing before an appearance round pairs the
  directories by filename.
- **`base` as a stem.** It follows the rule and reads thinly alone. Kept deliberately; the guide's
  table names its subject.
- **The region is read in the staged layout by construction rather than by independent
  measurement.** `FrameManager` stages the pane before it reads the box, and the installed capture
  finds that pane already in place. Every region's variation came back above zero on the capture run
  and on the ordinary run reading the same frames, which is consistent with the claim without
  proving it.
- **The prune reading covers the installed portfolio, not every writer.** The sentinel proves that
  nothing in a capture run removed a file it did not write. A frame whose scenario leaves the
  registry therefore stays on disk until someone removes it, and no proof here catches that.
