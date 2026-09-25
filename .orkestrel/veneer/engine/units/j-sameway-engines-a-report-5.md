# J-SAMEWAY-ENGINES-A round 5 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-sameway-engines-a-brief-5.md`.

---

Round 5 is done and nothing blocked it. The record is now `HostWrite { target, value, priority }`, its leaves are `recordHostWrite` and `rewindHostWrites`, and no alias remains. Every acceptance step exits 0. The instrument's final run killed or held all 64 rows as expected, including the new branch row. Nothing is committed.

## Files touched
- `src/browser/types.ts`: `HostChange` becomes `HostWrite`, and its field `prior` becomes `value`, documented in `HostSnapshotRecord.value`'s terms.
- `src/browser/helpers.ts`:
  - the two leaves are renamed and take a `writes` parameter;
  - the `recordHostWrite` summary states its condition (N3);
  - the `value` parameter of `writeHostValue` says any string adds a token (N3);
  - the `readHostValue` example local is renamed from `prior` to `value`.
- `src/browser/Collapse.ts`, `Toast.ts`, `Tab.ts`, `Carousel.ts`: the renames. The class remarks say "writes each target … back" (N4). The `#rewind` comments already said "writes … back", so only their leaf name changed.
- `tests/src/browser/helpers.test.ts`: the renames, `value:` in every record `toEqual`, `writes` for the record-list locals, and the N5 case.
- `tests/src/browser/index.test.ts`: the export list names `recordHostWrite` and `rewindHostWrites`.
- `guides/veneer.md` § Surface: the `HostWrite`, `recordHostWrite`, and `rewindHostWrites` rows. The `recordHostWrite` row carries the N3 sentence.
- `src/browser/HostSnapshot.ts` is unchanged, because it names none of the renamed declarations.

Diffstat: 9 files changed, 169 insertions(+), 159 deletions(-).

## Renamed declarations and signatures
- `interface HostWrite { readonly target: HostSnapshotTarget; readonly value: string | undefined; readonly priority: string }`
- `recordHostWrite(writes: readonly HostWrite[], target: HostSnapshotTarget, next: string | undefined): readonly HostWrite[]`
  - Summary and § Surface row: "Returns a change's records with a target and the value and priority it reads appended, only when the coming write is the change's first to change that target."
- `rewindHostWrites(writes: readonly HostWrite[], owns: () => boolean): void`
- `writeHostValue` keeps its signature. Its `value` parameter reads: "The attribute's or property's value, or any string, which adds a token; undefined removes the target."
- Inside the four engines, the local array is still `written: readonly HostWrite[]`. The engines' `change` parameter now names only the call.

## N5 case and its red reading
The case is `readHostPriority reads the empty string for an attribute and a token named like an inline property that carries a priority`. Its element has an inline `width: 10px !important`, a `width="10"` attribute, and a `width` token, and the case expects `['important', '', '']`.

Under row `N5-read-branch`, which replaces the category branch with `return element.style.getPropertyPriority(name)`, it reads:
`AssertionError: expected [ 'important', 'important', …(1) ] to deeply equal [ 'important', '', '' ]` → KILLED.

## Mutation table
The log is `tmp/j-engines-a/mutations-5.log.txt`: `rows 64, missed 0`, `restored byte for byte`.
- **Carried rows:** all 46 carried rows (A1, A2, A3, PHASE, ORDER, R1, LEAF) read KILLED against the renamed code.

The round-4 additions and the new row:

| Row | Verdict | First line |
|---|---|---|
| F1-show-size | KILLED | `expected '' to be '0px'` |
| F1-hide-size | KILLED | `expected '' to be '0px'` |
| F1-hide-host | KILLED | `expected [ 'collapse', 'show' ] to deeply equal [ 'show' ]` |
| P2-record-priority | KILLED | `expected [ { target: { …(3) }, …(2) }, …(2) ] to deeply equal …` |
| P2-record-priority-engine | KILLED | `expected [ '12px', '' ] to deeply equal [ '12px', 'important' ]` |
| P2-record-value | KILLED | `expected [] to deeply equal [ { target: { …(3) }, …(2) } ]` |
| P2-rewind-drop | KILLED | `expected [ [ '12px', '' ], [ '12px', '' ] ] …` |
| P2-rewind-drop-engine | KILLED | `expected [ '12px', '' ] to deeply equal [ '12px', 'important' ]` |
| P2-rewind-value | KILLED | `expected [ [ '12px', 'important' ], …(1) ] …` |
| P2-write | KILLED | `expected [ '12px', '' ] …` |
| P2-write-snapshot | KILLED | `expected '' to be 'important'` |
| P2-read | KILLED | `expected [ '', '', '', '', '' ] …` |
| P2-read-snapshot | KILLED | `expected '' to be 'important'` |
| **N5-read-branch** | KILLED | `expected [ 'important', 'important', …(1) ] …` |
| CONTROL | HELD | none |
| CONTROL-priority | HELD | none |
| BOOM | REFUSED | `Error: boom` |
| UNBOUND | REFUSED | `ReferenceError: unboundToken is not defined` |

The first run of the round-5 instrument read 3 rows as `ANCHOR (0)`: `A2-collapse-rewind`, `A2-toast-rewind`, and `A2-tab-rewind`. The script that renamed its anchors missed `rewindHostChanges` wherever the name follows an escaped `\t`. I renamed those three anchors by hand, recorded that in the instrument's header, and re-ran the whole instrument. The run reported above is that second run. The first run is kept as `mutations-5-first.log.txt`.

## Report-only patch
The patch is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a/tmp/j-engines-a/guide-5.patch`. It changes "restores" to "writes … back" in the return paragraphs of § Collapse, § Tab, § Carousel, and § Toast. The Carousel paragraph's "comes back as well" becomes "is written back as well". Affected lines are rewrapped under 100 columns. On a copy, `oxfmt --check` reported the patched guide correctly formatted.

`git apply --check -v` output:
```
Checking patch guides/veneer.md...
apply-check exit 0
```

## Acceptance output, verbatim
From `tmp/j-engines-a/acceptance-5.log.txt`:
```
check exit 0
lint-check exit 0
format-check exit 0
Collapse exit 0 |  Tests 49 passed (49)
Toast exit 0 |  Tests 44 passed (44)
Tab exit 0 |  Tests 47 passed (47)
Carousel exit 0 |  Tests 69 passed (69)
helpers exit 0 |  Tests 93 passed (93)
HostSnapshot exit 0 |  Tests 48 passed (48)
index exit 0 |  Tests 3 passed (3)
test-guides exit 0 |  Tests 20 passed (20)
done
```

## `git status --short`
```
 M guides/veneer.md
 M src/browser/Carousel.ts
 M src/browser/Collapse.ts
 M src/browser/Tab.ts
 M src/browser/Toast.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
```

## Deviation state
Nothing stopped the unit. The choices I made:
- **Case titles:** existing titles are unchanged except for the describe-block prefixes. English uses of "prior value" and "changes" in titles and comments stay, because they are not identifiers.
- **Class remarks rewrapped:** Toast's and Carousel's remarks are rewrapped where the new verb pushed a line past 100 columns.
- **Acceptance script:** `acceptance-5.sh` no longer anchors its summary grep at the line start, so the `test:guides` summary line is captured this time.
- **Supporting scripts:** new scripts in `tmp/j-engines-a/`: `rename-5.py`, `rename-tests-5.py`, `derive-mutations-5.py`, and `reanchor-mutations-5.py`. Each is written as a file and run as a file.
