CL3 stopped on a calibration conflict requiring an off-limits token change. The scroll-behaviour probe passed on managed Chromium and Edge. Its plant was removed, the restored stylesheet was rebuilt, and the tracked tree is clean. The reset, text partials, proofs, showcase section, and guide changes are not implemented.

Assignment: `cl3-brief-2.md`, role `sol` on Astra, sole writer, no agents spawned. Baseline and return HEAD: `9f5ffda`. Host: Windows, 2026-09-21.

The blocking evidence is:

| Requirement | Expected | Found |
| --- | --- | --- |
| Brief execution item 2, line 149 | The code family's paint binds to `--vn-text-code`. | `src/styles/_mixins.scss:151` emits that token from the theme map's `code` value. |
| Brief execution item 3 and acceptance criterion 2 | Resolved values equal the calibration record. | `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.md:2309` records inline code text as `oklch(0.208 0.042 265.755)` in light and `oklch(0.929 0.013 255.508)` in dark, identically on Chromium and Edge. |
| Existing token values | The required token supplies those calibrated colors. | `src/styles/_tokens.scss:33` binds light code to `var(--vn-palette-pink)`; line 75 binds dark code to `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-palette-pink))`. The pink palette value is `#d63384`. |
| Ownership | A repair stays within owned files. | Brief line 133 makes `_tokens.scss`, `_theme.scss`, and `_mixins.scss` off-limits. |

Binding the required token would violate the calibrated-value criterion. Substituting the body token would violate the required binding. Changing the token requires an unowned edit. This triggers `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`, Deviation protocol: “Stop when a conflict prevents the primary objective or requires an unowned change.” These are source and record readings; no rendered code-color proof is claimed. A successor brief must resolve the token value or explicitly change the calibration requirement before implementation resumes.

The scroll probe appended this temporary rule to `src/styles/index.scss`:

```scss
@layer reset {
	@media (prefers-reduced-motion: no-preference) {
		:root {
			scroll-behavior: smooth;
		}
	}
}
```

The executed commands and terminal readings were:

| Command and state | Engine | Exit | Final reading | Log |
| --- | --- | --- | --- | --- |
| `npm.cmd run build:src:styles`, plant present | Build | 0 | `✓ built in 284ms`; `index.css` 51.93 kB | `cl3-scroll-build.log.txt` |
| `npm.cmd run test:journey`, plant present | Managed Chromium | 0 | `Test Files 4 passed (4)`; `Tests 84 passed \| 4 skipped (88)`; `Duration 23.27s` | `cl3-scroll-chromium.log.txt` |
| `cmd.exe /d /c tmp\units\cl3-scroll-msedge.cmd`, plant present | Edge | 0 | `Test Files 4 passed (4)`; `Tests 84 passed \| 4 skipped (88)`; `Duration 27.67s` | `cl3-scroll-msedge.log.txt` |
| `npm.cmd run build:src:styles`, plant removed | Build | 0 | `✓ built in 273ms`; `index.css` 51.85 kB | `cl3-scroll-restored-build.log.txt` |

The Edge launcher sets `PLAYWRIGHT_CHANNEL=msedge`, calls `npm.cmd run test:journey`, and returns its exit code. It remains under `` with the probe logs as execution evidence.

The probe reached the existing journey projects with the rule present and produced no failing journey. It does not prove the future Content section or replace the required resolved `smooth`/`auto` media proofs. No reduced-motion staging requirement for CL11 was exposed by these runs. The journey suite must run again after the implementation lands.

No per-partial values were bound. The stopped implementation scope comprises `_reset.scss`; the text partials `_heading.scss`, `_p.scss`, `_hr.scss`, `_a.scss`, `_ul.scss`, `_ol.scss`, `_dl.scss`, `_blockquote.scss`, `_address.scss`, `_abbr.scss`, `_strong.scss`, `_small.scss`, `_mark.scss`, `_sub.scss`, `_sup.scss`, `_code.scss`, `_pre.scss`, `_kbd.scss`, `_samp.scss`, and `_var.scss`; and any required changes to `_html.scss` and `_body.scss`. Existing HTML and body treatments remain unchanged. There are no per-partial red-then-green pairs, hidden-cascade proofs, no-href proofs, body-variable proofs, or section lifecycle proofs to report.

The ordered acceptance gates were not reached. Their exit codes and final lines are unavailable, rather than passing:

| Gate | Managed Chromium/default run | Edge run |
| --- | --- | --- |
| `npm.cmd run format:check` | Not run | Not run |
| `npm.cmd run lint:check` | Not run | Not run |
| `npm.cmd run check` | Not run | Not run |
| `npm.cmd run build` | Not run | Not run |
| `npm.cmd run test:src:styles` | Not run | Not run |
| `npm.cmd run test:conformance` | Not run | Not run |
| `npm.cmd run test:app:browser` | Not run | Not run |
| `npm.cmd run test:journey` | Acceptance gate not run; planted probe exited 0 | Acceptance gate not run; planted probe exited 0 |
| `npm.cmd run test:guides` | Not run | Not run |
| `npm.cmd run test:policy` | Not run | Not run |
| `npm.cmd run test:setup` | Not run | Not run |

The only plant was the temporary scroll rule. Its exact addition was removed with a patch, followed by the successful restored build. No other plant was made. No off-limits file was edited. The guide's Compatibility table and the conformance `listed` array remain unchanged. No guide parity rows were added; the requested departure rows and region sentence remain unimplemented. No additional guide bound for CL12 was established.

The actual return command `git diff --stat` exited 0 and produced empty stdout. The actual return command `git status --porcelain --untracked-files=all` exited 0 and produced empty stdout. `git diff -- src/styles/index.scss` also produced empty stdout. Git reported the existing warning that `C:\Users\mikes/.config/git/ignore` could not be accessed because permission was denied. The report and execution evidence live under ignored ``, so they do not appear in that status output.

CL3 is incomplete and requires a reconciled successor brief. The return contains the scroll probe evidence and this deviation report, with no product changes.
