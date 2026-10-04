# tokens-t1 report

Not done. Stopped during governing-file reads because the generated edit requires changes to files the brief explicitly excludes. No tracked file changed; nothing was committed.

## Finding per item

| Item | Finding |
| --- | --- |
| Switches and functions | Not done; no declarations or functions added. |
| Generated edit | Not done; 0 sites rewritten in every file. The supplied M4 record contains 571 rows, including 3 sites outside ownership. Tracer hits and compiled line-count equality were not measured. |
| Writer and records | Not done; 0 records created. Palette, scale, and kept row counts are unmeasured. Oracle joined/unjoined counts and palette equality count are unmeasured. |
| Configuration | Not done; configuration unchanged. |
| Node cases | Not done; 0 case titles or controls added. |
| Guards | Not done; no guards or proofs added. |

## Stop evidence

Expected: the generator can wrap all 571 color sites and the grid-tied scale sites within the owned paths.

Found: the brief owns `src/bootstrap/_mixins.scss`, `src/bootstrap/_tokens.scss`, and `src/bootstrap/components/**`, but not `src/bootstrap/_reset.scss` or `src/bootstrap/_utilities.scss`. Its boundary says “Off-limits. Every other file”. The appended launch ruling does not expand ownership.

The M4 JSON was read with Node and filtered by those paths. It reports `sites: 571`, `rows.length: 571`, and these excluded sites; a grep of the launch source independently confirms their lines and literals:

| File | Line | Literal |
| --- | ---: | --- |
| src/bootstrap/_reset.scss | 29 | `rgba(0, 0, 0, 0)` |
| src/bootstrap/_utilities.scss | 782 | `rgba(0, 0, 0, 0.5)` |
| src/bootstrap/_utilities.scss | 783 | `rgba(255, 255, 255, 0.5)` |

The responsive utility breakpoint map is also in `src/bootstrap/_utilities.scss:1035`, with `576px`, `768px`, `992px`, `1200px`, and `1400px` at lines 1036–1040. Those values feed the responsive utility media conditions.

The governing `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol requires: “A unit stops when a conflict blocks its objective or requires an unowned change.” This stop applies before implementation. The remaining governing-file reads and acceptance work were not completed.

Hypothesis: the owned-path list omitted the reset and utility partials that the cited census already includes.

Required resolution: extend ownership to the generated color edits in both partials and the grid breakpoint edits in `_utilities.scss`, preserving its RFS cap.

## Acceptance

The commands were not run as an acceptance sequence because implementation stopped. The read-only status and digest checks below record the unchanged launch tree.

| Command or proof | Exit | Result |
| --- | --- | --- |
| `npm run check` | — | Not run |
| `npm run lint:check` | — | Not run |
| `npm run format:check` | — | Not run |
| `npm run build` | — | Not run |
| `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | 0 | Both match launch |
| `npm run test:setup` | — | Not run |
| `npm run test:conformance` | — | Not run |
| `npm run test:guides` | — | Not run |
| Tracer compile and line-count equality | — | Not run |
| Writer twice and `cmp` on both records | — | Not run |
| `git diff --check` | 0 | Empty output |
| `git status --porcelain` | 0 | Empty output |

## Digests

The before values are the appended launch ruling; the after values are the direct SHA-256 readings at this stop. No build ran.

| Sheet | Before | After |
| --- | --- | --- |
| Bootstrap | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| Tailwind | `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` | `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` |

## Cases and controls

None added or executed. All requested Node cases and controls remain outstanding. Chromium cases remain assigned to T2 by the brief.

## Deviations from V

No alternative implementation was adopted. V § 4 remains unimplemented, including its sentence: “The partials take `swatch` at the 571 color sites and `measure` at the grid-tied breakpoint, down-form, container, and type sites”. Restricting the color rewrite to owned files would cover at most 568 of the recorded sites and contradict that requirement; the executor did not make that partial rewrite.

## Status

Launch HEAD: `77c65cf`. `git log --oneline -3` and the initial status both exited 0.

`git status --porcelain` returned no output. The only artifact written is this ignored report.
