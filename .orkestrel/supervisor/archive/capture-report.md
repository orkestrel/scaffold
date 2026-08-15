# C-BASELINE — capture report

Captured by driving the real composed `/workspace/supervisor` app in real Chromium
(`/opt/pw-browsers/chromium`, headless), through a real built application server
(`dist/app/server/main.cjs`) started with `APP_STORE=memory` and a disposable workspace, reusing
the mechanism proven by `tests/app/browser/integration/integration.test.ts` and
`tests/setupBrowserServer.ts` (loopback port reservation, real child process, health-path poll,
same-origin login form, real cookie session). No mocked server, no component harness.

Probe script: `/workspace/supervisor/tmp/probe/capture.mjs` (git-ignored `tmp/`, not committed).
Captures: `/home/user/scaffold/tmp/redesign/captures/*.png` (40 files).
Raw index/transcript/accessibility JSON also at
`/home/user/scaffold/tmp/redesign/capture-index.json`.

Credential used throughout: `<seeded credential>` = username `operator` / the secret from
`tests/setup.ts` `APPLICATION_USER_SECRET` (never printed here). Bearer automation token was a
locally generated capture-only token, unrelated to any real secret.

## Capture index (state → files)

Matrix run: 2 viewports (desktop 1440×900, mobile 390×844) × 2 themes (light, dark) = 4 combos,
each walked through all 7 states in order. State 5 (workflow-open flow) produced 4 sub-shots per
combo. 40 files total.

| # | State | desktop-light | desktop-dark | mobile-light | mobile-dark |
|---|---|---|---|---|---|
| 1 | Login, first load | `01-login-first-load-desktop-light.png` | `01-login-first-load-desktop-dark.png` | `01-login-first-load-mobile-light.png` | `01-login-first-load-mobile-dark.png` |
| 2 | Login, filled | `02-login-filled-desktop-light.png` | `02-login-filled-desktop-dark.png` | `02-login-filled-mobile-light.png` | `02-login-filled-mobile-dark.png` |
| 3 | Login, refused | `03-login-refused-desktop-light.png` | `03-login-refused-desktop-dark.png` | `03-login-refused-mobile-light.png` | `03-login-refused-mobile-dark.png` |
| 4 | Authenticated shell, first paint | `04-authenticated-first-paint-desktop-light.png` | `04-authenticated-first-paint-desktop-dark.png` | `04-authenticated-first-paint-mobile-light.png` | `04-authenticated-first-paint-mobile-dark.png` |
| 5a | Workflow panel closed | `05-workflow-panel-closed-desktop-light.png` | `05-workflow-panel-closed-desktop-dark.png` | `05-workflow-panel-closed-mobile-light.png` | `05-workflow-panel-closed-mobile-dark.png` |
| 5b | Workflow panel open, empty | `05-workflow-panel-open-empty-desktop-light.png` | `05-workflow-panel-open-empty-desktop-dark.png` | `05-workflow-panel-open-empty-mobile-light.png` | `05-workflow-panel-open-empty-mobile-dark.png` |
| 5c | Workflow panel, id typed | `05-workflow-panel-id-typed-desktop-light.png` | `05-workflow-panel-id-typed-desktop-dark.png` | `05-workflow-panel-id-typed-mobile-light.png` | `05-workflow-panel-id-typed-mobile-dark.png` |
| 5d | Submit result | `05-workflow-open-result-real-desktop-light.png` (real id, seeded via the server's own bearer-automation route) | `05-workflow-open-result-absent-desktop-dark.png` (plausible-but-absent id) | `05-workflow-open-result-absent-mobile-light.png` (absent id) | `05-workflow-open-result-absent-mobile-dark.png` (absent id) |
| 6 | Live surfaces | `06-live-surfaces-desktop-light.png` | `06-live-surfaces-desktop-dark.png` | `06-live-surfaces-mobile-light.png` | `06-live-surfaces-mobile-dark.png` |
| 7 | Reload while authenticated | `07-reload-authenticated-desktop-light.png` | `07-reload-authenticated-desktop-dark.png` | `07-reload-authenticated-mobile-light.png` | `07-reload-authenticated-mobile-dark.png` |

Note on 5d: only the desktop-light combo was seeded with a real workflow (started through the
server's own `POST /workflows` bearer route immediately before the open click, then opened through
the UI), to keep the matrix to one server process and one workflow-id namespace without
cross-combo collisions. The other three combos capture the absent-id refusal, which the brief
treats as acceptable when a real id "cannot be seeded through the app's own mechanisms" — here it
could be seeded once; the remaining three intentionally exercise the refusal path since both paths
are in scope and the matrix would otherwise show the refusal zero times.

## Interaction transcript

One full walkthrough (11 steps) per viewport/theme combo, in the order a human meets them. All
four combos followed byte-identical script logic; only the sub-outcome of step 9 differs (real
workflow vs. absent-id refusal, per the index note above).

| Step | Combo | Human did | App did | Friction |
|---|---|---|---|---|
| 1 | desktop-light | Loaded the app origin for the first time | Rendered the login form, empty | No prefilled values; focus not verified to land in the name field |
| 2 | desktop-light | Typed the seeded credential name and secret into the two fields | Fields hold the typed values; secret field masks input (browser default) | Two separate keystroke groups (tab or click between fields) before any submit is possible |
| 3 | desktop-light | Submitted the form with a wrong secret | Login refused; the form re-rendered with a refusal message ("That login was refused.") near the fields | Both the username and password inputs are marked `is-invalid` (red-ringed) even though only the secret was wrong; the refusal names neither field |
| 4 | desktop-light | Submitted the correct credential | Authenticated shell painted: navbar, status badge, workflow panel, empty content | A second full form submit was required after the failed attempt above; no single retry-in-place path |
| 5 | desktop-light | Clicked the "Workflow" toggle in the navbar | The workflow-open panel collapsed out of view | Toggle is an icon-first button; caption text hides below the `sm` breakpoint (mobile shows icon only) |
| 6 | desktop-light | Clicked "Workflow" again to reopen the panel | Panel reopened with the workflow id field empty | Focus is not moved into `#open-workflow` on reopen |
| 7 | desktop-light | Typed a workflow id into the field | Field holds the typed id; no live validation before submit | No suggestion/autocomplete of known or open-able workflow ids while typing |
| 8 | desktop-light | (setup, not a UI action) started the workflow via the bearer-token automation route | Server accepted with HTTP 202 | n/a |
| 9 | desktop-light | Clicked "Open" to submit the workflow id | The real, already-running workflow opened into the stack/content view (Stack row, phase, feed request card, Pause/Resume/Stop) | A human has no UI path to *start* a workflow — only to open one that already exists, started elsewhere (automation, CLI, another operator) |
| 10 | desktop-light | Observed the page after the open attempt settled | Feed/stack/content panes render whatever state the open call left (populated here; empty is the expected look for a refused open) | No loading indicator distinguishes "still fetching" from "genuinely empty" |
| 11 | desktop-light | Performed a hard reload | Session survived (httpOnly cookie); authenticated shell repainted without a new login | The previously opened workflow view is not restored automatically; the reader must reopen it by hand (confirmed against `ApplicationView.vue`'s `gate`/`watch` logic, which resets on mount) |
| 12–21 | desktop-dark | Same 11-step walkthrough | Same, absent-id refusal at step 9 instead of open | Same frictions; refusal copy is the only signal and offers no link back to a valid id |
| 22–31 | mobile-light | Same 11-step walkthrough | Same, absent-id refusal at step 9 | Same frictions, plus: "Workflow" and "Logout" navbar buttons drop their captions at this width, leaving unlabeled-looking icon buttons (each keeps an `aria-label`, so this is a sighted-only friction) |
| 32–41 | mobile-dark | Same 11-step walkthrough | Same, absent-id refusal at step 9 | Same as mobile-light |

Full 41-row machine-readable transcript: `/home/user/scaffold/tmp/redesign/capture-index.json` →
`.transcript`.

## Accessibility snapshots

Captured with Playwright `locator.ariaSnapshot()`.

**Login form** (`#login`, captured once — identical DOM every combo):

```
- region "Login to the supervisor":
  - heading "Login to the supervisor" [level=2]
  - text: Username
  - textbox "Username"
  - text: The name this supervisor knows you by. Password
  - textbox "Password"
  - text: Both are sent once and exchanged for a session the server issues and holds; this browser stores neither of them.
  - button "Login with these credentials": Login
```

**Workflow-open panel form** (the `<form>` wrapping `#open-workflow`, captured with an id typed):

```
- text: Workflow
- textbox "Workflow": capture-real
- text: The id of the workflow to open, such as build.
- button "Open this workflow": Open
```

## What surprised me versus how the code reads

- **Opening is not starting.** `OpenPanel.vue` reads entirely as "open a workflow by id," and
  nothing in the browser UI can create one. Reaching state 5d's populated result required calling
  the server's `POST /workflows` bearer-token route directly, exactly as the existing integration
  test does — this is not a gap in the capture, it is the app's actual shape. The redesign brief
  should treat "how does a human start a run" as an open question, not an oversight in this
  capture.
- **Both fields flag red on a wrong-secret refusal.** The code (`LoginPanel`-adjacent form
  handling) marks both `#login-name` and `#login-secret` `is-invalid` when only the secret was
  wrong, and the refusal text ("That login was refused.") does not attribute the failure to either
  field. Reading the component in isolation did not make this obvious; seeing the rendered state
  did.
- **The session persists across reload but the workflow view does not.** `ApplicationView.vue`'s
  `probed`/`gate` logic re-runs `operator.identify()` on every mount, which correctly restores the
  session, but nothing re-opens whatever workflow was on screen before the reload. This matches
  reading the `onMounted` hook, but is easy to miss until watching the actual state 7 capture: a
  logged-in user is dropped back at the workflow-open gate, not at what they were looking at.
  (`tests/app/browser/integration/integration.test.ts`'s expiry test explicitly re-opens the
  workflow after its own reload/relogin path, which is the same behavior confirmed here for a plain
  authenticated reload.)
- **The theme toggle is a single glyph with no visible label**, confirmed by the accessibility
  snapshot gap: `ariaSnapshot()` on the login region did not surface it at all pre-login (it is
  outside `#login`), and post-login it is an icon-only button identified solely by its
  `aria-label`. Sighted frictions (icon collapse under `sm`) compound with this on mobile.
- **The refusal path for an absent workflow id offers no recovery affordance** — no list of
  addressable workflows, no link, just the inline field error. This was expected from reading
  `OpenPanel.vue`, but the capture confirms there is genuinely nothing else on screen (no roster,
  no history) a human could act on instead.

## Process cleanup proof

```
$ ps aux | grep -E "chrome|main.cjs|node tmp/probe" | grep -v grep
(no output)

$ ls /tmp | grep supervisor-capture
(no output)
```

No server child process, no Chromium process, and no leftover temporary workspace directory
remained after the probe completed. The probe's own `finally` block closed the browser and
force-stopped (`SIGTERM`, `SIGKILL` fallback) the application child process, then removed its
`mkdtemp`-created workspace.
