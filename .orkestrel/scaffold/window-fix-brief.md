# Unit brief: correct the approval mechanics in the publish skill's window reference

## Role and engine

`implementer` on Claude Opus 5. This is documentation-voice work, which is the subjective lane. The
Sol bench is dark this session (`codex` CLI ENOENT), so no objective implementation lane is
available; the substitution is recorded in the campaign record.

## Objective

`.agents/skills/orkestrel-publish/references/window.md` carries approval mechanics that a live
release just falsified. An operator following the file today writes a dead URL to the user, waits
for a window that has already closed, and never reaches the one mechanism that uploads reliably.
Correct the file against the findings below, in its own voice.

## Context

- Repository: `/home/user/scaffold`, branch `claude/scaffold-proposal-impl-nabmm9`, clean tree at
  the release commits. Read `AGENTS.md`, `.claude/rules/writing.md`, and
  `.claude/rules/documentation.md` before editing. The dispatch-named skill is `orkestrel-publish`;
  read its `SKILL.md` file and `references/wave.md` so the corrected file stays consistent with
  both. `.agents/orchestration.md` § Publishing the fleet is the contract this reference serves and
  outranks it.
- The findings come from the `@orkestrel/scaffold` 0.0.56 release run on 2026-08-27 against
  `registry.npmjs.org`, from a Linux container holding no npm credential at the start. Every
  reading below was measured in that run, with `npm` 10.9.7 and `node` 22.22.2.
- The file's readers are an Orchestrator running a release and an operator reading over its
  shoulder. Keep the existing heading structure, the bullet form, and the imperative voice.
- Standing condition: `.agents/**` ships inside `dist/host`, so editing this file makes the
  committed `host.json` inventory stale until `npm run build` regenerates it, and the floor-reading
  suites are expected red between your edit and the Orchestrator's build. Do NOT run `npm run build`
  yourself. Validate with scoped, read-only commands.

## The findings to encode

Each finding is a measurement, not a hypothesis. Write each as a directive with its observable
trigger, in the file's existing voice.

1. **Relay the URL exactly as the journal holds it.** `npm login --browser=false` prints
   `https://www.npmjs.com/login?next=/login/cli/<id>`, and `npm publish --browser=false` prints
   `https://www.npmjs.com/auth/cli/<id>`. Rewriting the login URL to the bare
   `https://www.npmjs.com/login/cli/<id>` target it names answers
   `{"message":"Unauthorized"}` in the browser: that path is not a page. The user reads a broken
   chain where the chain is healthy, and the operator diagnoses the wrong failure. Never shorten,
   redirect-strip, or otherwise improve a minted URL.
   - The file's own text carries this defect today. Under **Reach the approval** it names
     `npmjs.com/login/cli/<id>` as the URL that authenticates the session. Correct that form to
     what npm prints.
2. **An unclicked CLI session dies in about forty-five seconds.** npm polls
   `GET /-/v1/done` every few seconds and takes `202` while the session waits; the registry then
   answers `403` at about forty-five seconds. `npm login` treats that as web login being
   unsupported and drops to its legacy `Username:` prompt, and `npm publish` exits `E403` naming
   `GET /-/v1/done?authId=`. Replace the file's current claim that an approval URL expires
   unclicked in about ten to fifteen minutes, and replace the instruction to launch the chain when
   the user will click within ten minutes: the user must click within the minute.
   - The operational consequence, which the file must state: mint only when the user is at the
     keyboard in that moment, and put the URL on the first line of the message. A reader who must
     read anything before clicking arrives after the session is gone.
3. **Never keep a link alive by re-minting on a loop.** Each mint invalidates the URL before it, so
   a supervisor that re-mints on expiry makes the link a moving target and every relayed URL is
   dead on arrival. Mint once per human moment, and mint again only when the user asks.
4. **Answer publish two-factor authentication with the account's one-time code where the account
   has one.** `npm publish --ignore-scripts --otp=<code>` uploads with no browser authorization and
   no poll, so it carries neither a window nor a race. Ask for the code at the moment of the
   upload, run the upload inside the code's own life, and never ask for a password, a token, or an
   auth file. In the 0.0.56 run the browser authorization failed twice on the forty-five-second
   abandon and the one-time code uploaded the package on the first attempt.
   - Place this as the preferred upload path for an authenticated session, with the browser
     authorization as what to use where the account answers with no code.
5. **Read `403 Forbidden - GET /-/v1/done` for what it is.** The file today reads that code as a
   click on a superseded URL poisoning the live attempt. That cause is real and stays. Add the
   cause this run measured: the same code appears when nobody clicked inside the session's life.
   Separate them by evidence — check the registry for the version, confirm no attempt is live, then
   mint one fresh attempt — rather than by which cause feels likelier.

## Unknowns

Whether the forty-five-second abandon is fixed by elapsed time or by poll count is unmeasured. Do
not claim either. Write the reading as the duration the run observed.

## Scope

- Owned: `.agents/skills/orkestrel-publish/references/window.md`.
- Report-only: `.agents/skills/orkestrel-publish/SKILL.md` and `references/wave.md`. Where a
  correction here contradicts either, return the exact patch in your report rather than editing it.
- Off-limits: everything else, `host.json` and `dist/` included. No commits, no pushes, no
  installs, no `git checkout`, `restore`, `stash`, `reset`, or `clean`, no tree-wide `format`,
  `lint --fix`, or `build`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Write the report to `tmp/units/window-fix-report.md` and return its content as your final message:
what changed, where each finding landed, any contradiction you found with the skill or the wave
reference and its exact patch, the read-only validation you ran with exit codes, and any claim of
your own you flag.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, at most one hypothesis — if a
finding contradicts `.agents/orchestration.md` § Publishing the fleet, or if the file's structure
cannot carry a finding without restating a rule the contract owns. Wording placement and heading
choice inside the file are yours to decide and record.

## Acceptance criteria

1. The file names the login URL in the `login?next=/login/cli/<id>` form and names no bare
   `login/cli/<id>` form except where it states that path answers `Unauthorized`.
2. The file states the forty-five-second reading with the date and the registry behind it, and
   carries no ten-to-fifteen-minute expiry claim and no ten-minute click instruction.
3. The file directs the operator to the one-time code path for an authenticated session and keeps
   the browser authorization for an account that answers with no code.
4. The file separates the two causes of `403 Forbidden - GET /-/v1/done` and names the evidence
   that tells them apart.
5. The file states the never-re-mint-on-a-loop rule with its trigger.
6. `.claude/rules/writing.md` holds throughout: no `should`, no count of a growable set, no
   ordinal reference to a list item, the imperative for instructions, and a code token followed by
   a noun.
7. `git status --short` shows this file alone as modified.
