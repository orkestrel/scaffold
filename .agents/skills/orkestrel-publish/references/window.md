# The approval and the upload window

A release needs the user at the keyboard to authenticate the session, and again to authorize each
upload. An approval URL dies unclicked in under a minute, so mint one only in a
moment the user can click, and relay it byte for byte. Where the account answers with a one-time
code, take that code for the upload — it needs no browser authorization and opens no window to
lose. Where the account has no code, the browser authorization opens a five-minute window, and the
rest of the layer either fits inside it or takes another approval.

## Arm the terminal

- Run the login and every publish under `script -qfc '<command>' <log>`. npm offers the approval
  only when it sees a TTY; without one it fails `EOTP` with no way to answer.
- Pass `--browser=false` to `npm login` and to every `npm publish`. Without it npm prints
  `Press ENTER to open in the browser...` and blocks. Never answer that prompt with a newline: the
  web flow consumes the newline on a later read, drops to a legacy `Username:` prompt, and exits
  **zero** without authenticating. With the flag npm prints the URL and polls, and stdin stays
  untouched.
- Hold stdin open and write nothing to it. Use a fifo held open by a long `sleep`. EOF drops npm
  to the same legacy prompt a stray newline does.
- Run `npm login` before any publish. The `npm publish` command does not open the browser flow:
  unauthenticated it returns `E404` on `PUT`, which reads as a missing package rather than as a
  missing credential.
- Confirm authentication with `npm whoami`, never with an exit code. The legacy fallthrough exits
  zero.
- Re-probe `whoami` immediately before the first upload. A stored credential expires mid-session
  and an overnight gap expires it, so a session-start answer does not hold.
- Read a login log that shows the spinner and then a legacy `Username:` prompt as an expired
  attempt rather than as a prompt to answer. Kill it by process id and mint a fresh flow.
- On a Windows host, Git Bash ships no `script` binary, so the upload step is operator-driven:
  prepare the layer, prove the gates, surface the exact `npm publish` command, and the operator
  runs it in a real terminal. Everything before and after the upload — bumps, re-pins, gates,
  registry reads — stays with the Orchestrator. The fifo stdin law still binds on that host.

## Reach the approval

- Mint an approval only when the user is at the keyboard in that moment and can click immediately.
  A URL minted while the user is still on their way is dead before they arrive.
- Put the URL on the first line of the message, with nothing before it. A reader who must read
  anything before clicking arrives after the session is gone.
- Relay the URL exactly as the journal holds it. The `npm login --browser=false` command prints
  `https://www.npmjs.com/login?next=/login/cli/<id>`, and the `npm publish --browser=false` command
  prints `https://www.npmjs.com/auth/cli/<id>`.
- Never shorten, redirect-strip, or otherwise improve a minted URL. The bare
  `https://www.npmjs.com/login/cli/<id>` target the login URL names is not a page: opened in a
  browser it answers `{"message":"Unauthorized"}`. The user then reads a broken chain where the
  chain is healthy, and the operator diagnoses the wrong failure.
- Expect an unclicked session to die about 45 seconds after it is minted. Measured on 2026-08-27
  against `registry.npmjs.org` with `npm` 10.9.7 and `node` 22.22.2: npm polls `GET /-/v1/done`
  every few seconds and takes `202` while the session waits, and the registry answers `403` at
  about 45 seconds. Whether the registry fixes that abandon by elapsed time or by poll count is
  unmeasured, so plan against the duration.
- Recognise the abandon on each side. The `npm login` command reads the `403` as web login being
  unsupported and drops to its legacy `Username:` prompt. The `npm publish` command exits `E403`
  naming `GET /-/v1/done?authId=`.
- Never keep a link alive by re-minting on a loop. Each mint invalidates the URL before it, so a
  supervisor that re-mints on expiry makes the link a moving target and every relayed URL is dead
  on arrival. Mint once per human moment, and mint again only when the user asks.
- Name the login approval and the upload authorization to the user before either arrives, or the
  authorization link reads as the login having failed.
- Surface each approval URL the moment it appears in the log, and take the **last** one in log
  order. npm mints a new URL whenever an attempt starts again, and the log accumulates every one,
  so a URL chosen by sorting rather than by position is already dead when the user opens it.
- Read the URL out of the journal in the foreground and surface it before arming any watcher. A
  watcher-based relay can fail silently, and its silence is indistinguishable from a chain that
  has not reached the URL yet.
- Relay the URL as plain text. A decorated link did not render for the operator, who then had
  nothing to click while the window ran down.
- Re-read the log before treating an approval as failed. The chain is sometimes still alive on a
  later URL, so surface that one rather than starting the chain again.
- Read a `404` on an approval URL as a publish that already succeeded and consumed it. Read the
  registry before calling it a failure.

## Authorize the upload

- Take the account's one-time code where the account has one. The
  `npm publish --ignore-scripts --otp=<code>` command uploads with no browser authorization and no
  poll, so it carries neither a window nor a race. In the `@orkestrel/scaffold` 0.0.56 run on
  2026-08-27 the browser authorization failed on the 45-second abandon and the one-time code
  uploaded the package with no retry.
- Ask for the code at the moment of the upload, and run the upload inside that code's own life. A
  code read minutes earlier is already spent.
- Ask for the code and nothing else. Never ask for a password, an access token, or an auth file.
  `.agents/orchestration.md` § Publishing the fleet owns that law.
- Arm a one-time-code upload the way § Arm the terminal arms every other publish.
- Fall back to the browser authorization where the account answers with no code. That path mints
  the `auth/cli/<id>` URL, needs the click inside the session's life, and opens the five-minute
  window.
- Tell the user that approving an `auth/cli/<id>` URL opens a five-minute window covering the rest
  of the layer.

## Spend the window

- Everything under this heading is the browser-authorization path. A one-time-code upload opens no
  window, so none of it binds that path.
- The window opens when the user approves, not when the first publish starts.
- Open each layer with one package: publish it alone, surface its approval URL the moment the
  journal shows it, and confirm the upload from the registry before starting the rest.
- Then chase the remaining uploads back-to-back in one process with no gap. An upload started
  within seconds of an approval frequently rides that approval, and each one that does not mints
  its own URL.
- Relay every new URL to the user the moment it appears, through a journal watcher, and never
  pause the chain to wait for a click: a poll outlives the relay.
- Tell the user to click only the URL last in log order. A click on a superseded URL poisons the
  live attempt, and the current poll then fails `403 Forbidden - GET /-/v1/done` mid-flight.
  § Read a `403` on the poll owns the recovery.
- **Never retry a publish that is still waiting for its authorization.** Each `npm publish`
  attempt mints a new `authId` and invalidates the previous one, so a retry loop makes the URL a
  moving target the user cannot approve in time. Publish a layer's opening package with exactly
  one attempt.
- Retry only an upload that failed **inside** an already-open window. `EOTP` there is intermittent
  contention rather than the window closing: retry about three times, and retry a failed set after
  the layer ends. Packages have landed on a third attempt and on a later pass with no new
  approval. These are different failures wearing similar codes; a retry fixes in-window contention
  and causes the moving approval target.
- Expect a large layer to outlast one window. Size batches to what uploads in five minutes and
  name each planned approval point to the user, rather than discovering them mid-run.
- The contract's serialization law binds every upload in the window, and
  `.agents/orchestration.md` § Long-running commands binds the chain that runs them.

## Read a `403` on the poll

`403 Forbidden - GET /-/v1/done` carries more than one cause, and each takes a different reading of
the same status. Rule from the evidence, never from which cause reads likelier.

- Nobody clicked inside the session's life. The poll ran out its 45 seconds against a URL no one
  opened, and the registry closed the session.
- The user clicked a superseded URL and poisoned the live attempt. The poll fails mid-flight while
  the user is looking at a page that reports success.
- Tell those causes apart from the log and the user, never from the status alone. A single minted
  URL that nobody opened in time is the abandon. A log carrying a URL the running attempt
  superseded, with the user reporting a click, is the poisoned attempt.
- Recover the same way whichever it was: read the registry for the version, confirm no publish
  process is live, then mint exactly one fresh attempt with the user at the keyboard.

## Read the verdict from the registry

- Read the result from the registry, not from an exit code. A piped `npm publish` reports the exit
  status of the pipeline, and a CDN read straight after a publish can still serve the previous
  version.
- Treat a `404` after a first publish as pending rather than failed. A first publish creates the
  packument and can serve `404` for minutes after success, so for a package with no prior version
  re-read on an interval before reporting either way. A bump serving the old version is CDN lag,
  same rule.
- Rule on a pack-time manifest-rewriting warning by fetching the registry's copy of the manifest,
  never by the warning's own text.
- Re-read the registry before telling the user a package failed. A chain still running, a retry
  that landed, and CDN lag all produce a failure reading that the registry contradicts, and a
  false failure report costs a needless approval and a needless republish.
