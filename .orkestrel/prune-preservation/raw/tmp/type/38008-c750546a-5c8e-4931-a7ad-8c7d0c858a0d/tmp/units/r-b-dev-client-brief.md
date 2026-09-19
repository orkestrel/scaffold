# Author an isolated Chromium client for the dev-entry comparison

Act as builder on Terra. Read canonical AGENTS.md, .agents/orchestration.md, portability/tests/workspace/quality rules, the prove-journey skill, and r-b-config-design.md. Perform directly and spawn nothing. Preserve all source.

The computer-use connector reports no available browsers. This unit authors an isolated software test client for the local dev servers, not automation of the user's browser. It supplies the external-client dev-entry measurement requested by the independent design lanes; it does not replace R-B's published-layer journeys.

Own only `tmp/probe/r-b-cold/client.mjs` and any centralized temporary setup module it needs in the frozen Roughnotes recovery checkout. Use the already-installed Playwright Chromium package; inspect its installed entry before importing. Add no dependency and run no browser. Return exact command for parent execution.

The client accepts an explicit URL argument limited to http://127.0.0.1:5197/ or :5198/, plus an artifact stem limited to plain or historical. Launch a new headless Chromium browser with viewport390x844 and a fresh browser context. Keep browser.close in finally. Record pageerror events, requestfailed events, and failed script responses in a bounded local JSON report; do not log request headers, bodies or secrets. Fail if application errors or module-loading failures occur.

Navigate to the actual served root HTML. Read the current product guide/constants for its home heading, and assert it is visible through role/name. Save the arrival screenshot. Click the visible Menu button, assert the named Menu dialog is visible, and click Products, Site through role/name. Assert the Products heading and the dialog's concealment, then save the destination screenshot. Open Menu again, click its Close dismissal by role/name, and assert concealment. Interactions must be real clicks on accessible names: no evaluation, fabricated events, direct router/theme/storage state, classes, DOM identifiers, forced clicks, fixed sleep, or wildcard selectors.

Use normal bounded browser auto-wait/locator assertions from the installed client; if no assertion package exists, use locator.waitFor/visible observations with explicit error throws. Do not assert a warmed dependency cache: the parent-launched servers use distinct fresh cache directories and --force. Write artifacts only in this temporary directory and only under the selected stem. Report the visited URL, observed heading text, final URL, error arrays, screenshot paths and pass/fail as JSON. Re-throw failures after the report is retained. Do not start/stop servers, mutate source, install, publish or commit.

Return authored paths, available module resolution evidence and exact commands. The parent will independently run plain and historical inputs and compare actual UI outcomes. A server-ready message is not a passing client result.
