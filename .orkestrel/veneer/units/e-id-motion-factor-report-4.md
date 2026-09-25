# Unit E-ID-MOTION-FACTOR round 4 report

## Item 1

**Before:** "§ Departures records each scaled duration that differs from the release's, such as the
`.icon-link` transform's, and § Additions records each transition the release does not write."

**After:** "§ Departures records each scaled duration that differs from the release's, such as the
`.icon-link` transform's."

The paragraph containing that sentence is re-wrapped at 100 columns, with no other word changed.

## Gate table

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| oxfmt check | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md` | 0 | `mfac-instruments/r4/mfac-4-oxfmt.log.txt` |
| test:guides | `npm run test:guides` | 0 | `mfac-instruments/r4/mfac-4-test-guides.log.txt` |
| test:policy | `npm run test:policy` | 0 | `mfac-instruments/r4/mfac-4-test-policy.log.txt` |

## Artifacts

- `tmp/units/mfac-4.diff` — `git diff b613ae4` over the worktree.
- `mfac-instruments/r4/mfac-4-delta.diff` — this round alone, against the backup at `tmp/units/veneer.md.bak-4`.
- `mfac-instruments/r4/mfac-4-status.txt` — `git status --porcelain` output.
