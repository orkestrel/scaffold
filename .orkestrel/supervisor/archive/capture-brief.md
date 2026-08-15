# C-BASELINE — capture supervisor's current UI, driven as a human would drive it

## Role and engine

`builder`, cheap native tier, write-capable for probes and captures only. Perform this directly and
spawn nothing.

## Objective

A capture portfolio of `/workspace/supervisor`'s browser app **as it is today**, produced by driving
the real composed app in real Chromium — no mocked server, no component harness — plus an
interaction transcript counting what a human must do at each step. This is the baseline evidence
for a redesign of the auth flow and the workflow-opening flow; the design lanes will read it.

## How the app is driven

The repository already proves the credential wire end to end in real Chromium:
`tests/app/browser/integration/integration.test.ts` starts the real composed server at its own
origin and logs in through the real form. **Read that file first** — it is the map for starting the
server, seeding a credential, and driving the browser. Reuse its mechanism (setup helpers, seeded
credential, ports); do not invent a parallel one. `app/browser/seeders.ts` and the showcase
(`app/browser/showcase.ts`) may help seed visible data.

Playwright + Chromium are preinstalled (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; if the
project's pinned Playwright complains, launch with `executablePath: '/opt/pw-browsers/chromium'`).
Never run `playwright install`.

## What to capture

Matrix: **2 viewports × 2 themes** for every numbered state below.
Viewports: desktop `1440×900`, mobile `390×844`. Themes: light and dark — read
`app/browser/composables/useTheme.ts` / `ThemeToggle.vue` for how the app switches (`data-bs-theme`
or its own mechanism) and switch it the way a user would where possible.

States, in the order a human meets them:

1. **Login, first load** — empty form, nothing typed.
2. **Login, filled** — credential typed but not submitted (mask/visibility state as-is).
3. **Login, refused** — submit a wrong credential; capture the refusal exactly as rendered.
4. **Authenticated shell, first paint** — immediately after successful login, before any action.
5. **The workflow-open flow, every step** — wherever the workflow id is typed
   (`OpenPanel.vue` territory): the panel closed, the panel open and empty, the panel with an id
   typed, and the result of submitting (a real workflow id if one can be seeded through the app's
   own mechanisms; otherwise a plausible-but-absent id, capturing the error state that produces).
6. **The live surfaces** — feed/stack/content panes in whatever state login lands them
   (empty is expected and is itself evidence).
7. **Reload while authenticated** — does the session survive a hard reload? Capture what a
   returning user sees.

## The interaction transcript

Beside the captures, a table: step → what the human did (every keystroke-group, click, wait) →
what the app did in response → elapsed friction notes (fields that could have been prefilled,
focus not where the next action is, dead ends). This is the "cumbersome for humans" evidence the
redesign brief needs, stated as observations rather than opinions.

Also record, per state: the accessibility snapshot (Playwright `accessibility.snapshot()` or
aria-role tree) for the login form and the workflow-open panel — the redesign must not regress
what exists.

## Scope

- Probes under `/workspace/supervisor/tmp/probe/` (git-ignored), captures to
  `/home/user/scaffold/tmp/redesign/captures/` named `NN-state-viewport-theme.png`.
- Do not edit source, tests, configs, or guides. Do not commit. Do not npm install.
- Never read `.env*` or credential files; use only the credential the test infrastructure seeds.
  Never print a real secret into the transcript — refer to it as `<seeded credential>`.
- Kill every server you start; leave no process behind. Verify with a process list at the end.

## Deviation contract

Stop and report if the composed server cannot be started or the seeded credential cannot be
obtained from the test infrastructure — expected, found, exact evidence. Do not work around it by
mocking; a mocked capture is not evidence of the real app.

## Output

Return: the capture index (state → 4 file paths); the interaction transcript table; the two
accessibility snapshots; anything that surprised you about how the app actually behaves versus how
the code reads; the process-list proof that nothing was left running. Write the same content to
`/home/user/scaffold/tmp/redesign/capture-report.md`. No process diary.
