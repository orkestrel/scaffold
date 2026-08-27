# Unit report: correct the approval mechanics in the publish skill's window reference

Done. `.agents/skills/orkestrel-publish/references/window.md` now carries the 0.0.56 run's
readings. One file changed, 73 insertions, 19 deletions. `git status --short` shows that file
alone as modified.

## Touched files

- `.agents/skills/orkestrel-publish/references/window.md` — corrected the URL relay form, replaced
  the expiry claim with the 45-second reading, added the one-time-code upload path as the preferred
  route for an authenticated session, split the `403 Forbidden - GET /-/v1/done` causes into their
  own section, and stated the never-re-mint-on-a-loop rule.

## Where each finding landed

| Finding                            | Location                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| Relay the URL exactly              | § Reach the approval, the relay bullet and the never-improve-a-URL bullet     |
| 45-second abandon                  | § Reach the approval, the expect-an-unclicked-session bullet and the one after |
| Mint only at the keyboard          | § Reach the approval, the opening bullet and the first-line-of-the-message one |
| Never re-mint on a loop            | § Reach the approval, the never-keep-a-link-alive bullet                      |
| One-time code as preferred upload  | § Authorize the upload, new section                                           |
| The two `403` causes               | § Read a `403` on the poll, new section                                       |

Detail on each.

- **Relay the URL exactly.** The file names `https://www.npmjs.com/login?next=/login/cli/<id>` for
  `npm login --browser=false` and `https://www.npmjs.com/auth/cli/<id>` for
  `npm publish --browser=false`. The bare `https://www.npmjs.com/login/cli/<id>` form appears once,
  inside the bullet stating it is not a page and answers `{"message":"Unauthorized"}`. The old
  `npmjs.com/login/cli/<id>` claim under § Reach the approval is gone.
- **45-second abandon.** Stated with its date (2026-08-27), its registry (`registry.npmjs.org`),
  and the `npm` 10.9.7 and `node` 22.22.2 versions, with the `202` poll and the `403` at about
  45 seconds. The bullet after it names how the abandon reads on each side: the legacy `Username:`
  prompt for `npm login`, `E403` naming `GET /-/v1/done?authId=` for `npm publish`. The unknown is
  written as the brief required — whether the registry fixes the abandon by elapsed time or by poll
  count is unmeasured, so plan against the duration. The ten-to-fifteen-minute expiry claim and the
  ten-minute click instruction are both gone; a grep for `ten to fifteen|ten minutes|10 minutes|10-15|within ten`
  over the file returns nothing.
- **Mint only at the keyboard.** The section now opens on minting only in a moment the user can
  click, followed by putting the URL on the first line of the message with nothing before it.
- **Never re-mint on a loop.** Stated with its trigger (a supervisor re-minting on expiry) and its
  bound (mint once per human moment, and mint again only when the user asks).
- **One-time code.** New § Authorize the upload sits between § Reach the approval and § Spend the
  window, so the operator chooses the upload path after the session is authenticated and before the
  window's rules apply. It leads with the code path, names the 0.0.56 evidence, requires asking for
  the code at the moment of the upload, bans asking for a password, an access token, or an auth
  file, and keeps the browser authorization for an account that answers with no code. § Spend the
  window now opens by scoping itself to the browser-authorization path.
- **The two `403` causes.** New § Read a `403` on the poll names the unclicked-session cause and the
  superseded-URL cause, the evidence that tells them apart (a single minted URL nobody opened versus
  a log carrying a superseded URL with the user reporting a click), and the common recovery: read
  the registry for the version, confirm no publish process is live, then mint exactly one fresh
  attempt with the user at the keyboard. The § Spend the window bullet about clicking the last URL
  now points here instead of carrying its own recovery.

## Structural decisions

The brief left heading choice to me. I kept every existing heading and added two: "Authorize the
upload" and "Read a `403` on the poll". The `403` split earned a heading because an operator
reaches for it mid-incident and needs it findable rather than buried in a window bullet.

I also fixed two writing-rule defects in text I was already editing: the old "Tell the user both are
coming, or the second link reads as the first having failed" named list items by position, and is
now "Name the login approval and the upload authorization to the user before either arrives, or the
authorization link reads as the login having failed."

## Contradictions with the report-only files

`references/wave.md` — none. Its `--ignore-scripts` reasoning and its note that the flag skips
`prepack` both hold for the one-time-code command.

`SKILL.md` — one drift. Step 7 of § Run the release names spending the window as the only upload
procedure, so an operator reading the skill without opening the reference never reaches the
one-time-code path. Exact patch:

```diff
-7. **Spend the window.** Follow [window.md](references/window.md). Open the layer with one
-   package, confirm its upload from the registry, then chase the remaining uploads back-to-back.
+7. **Authorize and upload.** Follow [window.md](references/window.md). Take the account's one-time
+   code where it has one, because that path opens no window. Where the account answers with no
+   code, the browser authorization opens the five-minute window: open the layer with one package,
+   confirm its upload from the registry, then chase the remaining uploads back-to-back.
```

The skill's frontmatter `description` and its § The boundary with the contract both still read true
after that patch, so neither needs one.

## Validation

Read-only, scoped to the owned file.

Every command ran against `.agents/skills/orkestrel-publish/references/window.md` except the last.

- `npx oxfmt --config .oxfmtrc.json --check <file>` — exit 0, "All matched files use the correct
  format".
- A case-insensitive `grep -nE` for the expiry claims the brief struck (`ten to fifteen`,
  `ten minutes`, `10 minutes`, `10-15`, `within ten`) — exit 1, no hit.
- A case-insensitive `grep -nE` over the `.claude/rules/writing.md` substitution table (`should`,
  `simply`, `easy`, `easier`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`,
  `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`,
  `sanity check`, `dummy`, `blacklist`, `whitelist`, `master`, `slave`, `ensure`, `guarantee`) —
  exit 1, no hit.
- A case-insensitive `grep -nE` for `we`, `our`, `let's`, `above`, `below`, and `here` — exit 1, no
  hit.
- A case-insensitive `grep -nE` for `both`, `twice`, `two`, `three`, and `several` — one hit, the
  pre-existing "retry about three times", which is a retry limit rather than a tally.
- `awk 'length>100'` — no line over 100 columns.
- `npm run test:policy` — exit 0, 111 tests passed across 1 file.
- `git status --short` — exit 0, ` M .agents/skills/orkestrel-publish/references/window.md` alone.

The `new` and `once` hits that remain are permitted senses, ruled individually: `a new URL`, `a new
authId`, and `no new approval` name a distinct object rather than a recency, and `once to
authenticate` and `Mint once per human moment` mean one time rather than `after`.

Observation, not a criterion: `npm run test:policy` came back green, so the standing condition the
brief named — floor-reading suites red until `npm run build` regenerates `host.json` — did not
surface in that suite. I ran no build, so the inventory is still stale for whatever suite reads it.

## Claims of my own I flag

- **The one-time code against the contract's credential law.** `.agents/orchestration.md`
  § Publishing the fleet forbids substituting an API key, an access token, a copied auth file, or
  another login flow, and forbids asking the user to paste a token into the conversation. I ruled
  that an npm two-factor one-time code is none of those: it is the second factor npm's own publish
  flow asks for inside the user's already-authenticated session, it grants no standing access, and
  it substitutes for the browser authorization rather than for the login. That is my reading, not a
  measurement, and the Orchestrator owns it. The file states the ban on a password, an access token,
  and an auth file explicitly, and cites the contract as the owner.
- **Terminal arming for the one-time-code upload.** I have no measurement of whether
  `npm publish --ignore-scripts --otp=<code>` needs the `script -qfc` TTY, so I wrote the directive
  to arm it the way § Arm the terminal arms every other publish rather than claiming the arming can
  be dropped.
- **Number style.** I wrote `45 seconds` as a numeral per `.claude/rules/writing.md`, and left the
  window as `five-minute` because `SKILL.md` and the contract name it in that form. The
  inconsistency is deliberate.

## Deviation state

None. No finding contradicted `.agents/orchestration.md` § Publishing the fleet, and the file's
structure carried every finding.
