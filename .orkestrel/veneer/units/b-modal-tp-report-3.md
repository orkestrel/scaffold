# Unit TIP (`tp`), round 3 report

P7 is in place. The Tooltip and Popover `plugin` rows carry every clause P7 restores and every clause
round 2 wrote, and each restored clause agrees with the release source. The `oxfmt` formatter re-pads
the § Compatibility table. Each gate the criteria name exits 0 on the rebuilt validation copy and in the
worktree. The `tp-shared-3.patch` file passes the `git apply --check` command on a fresh `2a3f223`
extract and supersedes the `tp-shared-2.patch` file whole. Deviation state: none.

## Artifacts

All paths were under `/home/user/veneer-tp/tmp/units/` and are retained in `.orkestrel/veneer/units/` (the diff, status, and shared patch) and `.orkestrel/veneer/units/tp-instruments/` (every other file).

- `tp-report-3.md`: this report.
- `tp-shared-3.patch`: the revised shared patch against `2a3f223`.
- `tp-3.diff` and `tp-3-status.txt`: the owned-file diff and status, captured as round 2 captured
  them. Every owned file is untracked (`??`). Neither file changed this round: the `cmp` command
  reports the `tp-3.diff` file equal to the `tp-2.diff` file and the `tp-3-status.txt` file equal to
  the `tp-2-status.txt` file.
- `tp-stage-3.sh`: rebuilds the validation copy under `tmp/probe/base/` from `2a3f223`, the owned
  files, and the `tp-shared-2.patch` file, beside a pristine extract under `tmp/probe/tp-orig/`.
- `tp-rows-3.py`: restores the P7 clauses in the copy's guide and refuses to run unless each target
  text matches once.
- `tp-patch-3.py`: writes the `tp-shared-3.patch` file as the `tp-shared-2.patch` file with its
  `guides/veneer.md` section replaced by the copy's guide diff.
- `tp-check-3.sh` and `tp-check-3.log.txt`: the apply check and byte comparison on a fresh extract.
- `tp-guide-3-vs-2.diff`: the round-3 guide against the round-2 guide.
- `tp-gates-3.sh` and `tp-gates-3.log.txt`: the gate script and its log on the validation copy.
- `tp-gates-3-nobuild.log.txt`: the earlier gate run with no build step, kept as an observation.
- `tp-wt-3.sh`, `tp-wt-fmt-3.log.txt`, and `tp-wt-lint-3.log.txt`: the worktree format and lint runs.

The validation copy under `tmp/probe/` is deleted, and `tmp/` holds only `units/`.

## P7: the plugin rows keep every obligation

The file is `guides/veneer.md`, § Compatibility. In the following rows, the table padding is removed
so the text is readable.

The Tooltip row before, as round 2 wrote it:

> Tooltip: no data API; `placement: 'top'` and `trigger: 'hover focus'` defaults; `show` and `hide`
> methods; cancelable `show.bs.tooltip` and `hide.bs.tooltip` events; an `id` attribute a trigger's
> `aria-describedby` attribute names; placement writes the `bs-tooltip-auto` class and
> `data-popper-placement` attribute; sets the `show` class, and the `fade` class when the tip is
> animated; `Sanitizer` and `TemplateFactory` utilities. Owner: J-ENGINE.

The Tooltip row after:

> Tooltip: constructed by a consumer, no data API; `placement: 'top'`, `trigger: 'hover focus'`, and
> `sanitize: true` defaults; `show`, `hide`, and `setContent` methods; cancelable `show.bs.tooltip`
> and `hide.bs.tooltip` events; an `id` attribute a trigger's `aria-describedby` attribute names;
> placement writes the `bs-tooltip-auto` class and `data-popper-placement` attribute; sets the `show`
> class, and the `fade` class when the tip is animated; `Sanitizer` and `TemplateFactory` utilities.
> Owner: J-ENGINE.

The Popover row before, as round 2 wrote it:

> Popover: extends Tooltip, inheriting its methods and ARIA under `.bs.popover` events;
> `content: ''`, `offset: [0, 8]`, `placement: 'right'`, and `trigger: 'click'` defaults; the release
> removes the `.popover-header` or `.popover-body` element when its title or content is falsy;
> placement writes the `bs-popover-auto` class and `data-popper-placement` attribute; sets the `show`
> class, and the `fade` class when animated. Owner: J-ENGINE.

The Popover row after:

> Popover: extends Tooltip, inheriting its construction, methods, sanitizing, and ARIA under
> `.bs.popover` events; `content: ''`, `offset: [0, 8]`, `placement: 'right'`, and `trigger: 'click'`
> defaults; the release removes the `.popover-header` or `.popover-body` element when its title or
> content is falsy; placement writes the `bs-popover-auto` class and `data-popper-placement`
> attribute; sets the `show` class, and the `fade` class when animated. Owner: J-ENGINE.

Each restored clause sits where round 1 placed it. Round 2's clauses keep their wording and order.

### Each restored clause against the release source

The following checks read `node_modules/bootstrap/js/src/` in the worktree:

- **"constructed by a consumer, no data API".** The `tooltip.js` file registers no
  `EventHandler.on(document, …)` handler and declares no data-API event. The only instance path is the
  `constructor` method, through the `getOrCreateInstance` method or the `jQueryInterface` method. A
  search for `DATA_API` and `EventHandler.on(document` in the `tooltip.js` file returns nothing.
- **The `sanitize: true` default.** The `Default` object in the `tooltip.js` file declares
  `sanitize: true` (around line 70), and the `DefaultType` object types it as `'boolean'`. The
  `util/template-factory.js` file sanitizes content through the `sanitizeHtml` function when
  `this._config.sanitize` is true (the `_maybeSanitize` method).
- **The `setContent` method.** The `Tooltip` class declares a public `setContent(content)` method
  (around line 326). It stores the content and, when the tip is shown, disposes of the Popper instance
  and calls the `show` method again.
- **"inheriting its construction, methods, sanitizing, and ARIA".** The `popover.js` file declares
  `class Popover extends Tooltip` and defines no constructor, so it inherits the `Tooltip` constructor
  and every public method. Its `Default` object spreads `...Tooltip.Default`, which carries the
  `sanitize: true` default, and its `DefaultType` object spreads `...Tooltip.DefaultType`. It
  overrides only the `_isWithContent`, `_getContentForTemplate`, and `_getContent` private methods,
  so the inherited `show` and `hide` methods still write and remove the trigger's `aria-describedby`
  attribute. Its `NAME` getter returns `'popover'`, which names the `.bs.popover` events.

The round-2 clauses still agree with the release:

- The `show` class and the conditional `fade` class: the `show` method adds the `CLASS_NAME_SHOW`
  class, and the `_createTipElement` method adds the `CLASS_NAME_FADE` class only when the
  `_isAnimated` method returns true.
- The falsy-content removal: the `_setContent` method in the `util/template-factory.js` file calls
  `templateElement.remove()` when the resolved content is falsy.

### Readings

- The `tp-guide-3-vs-2.diff` file compares the round-3 guide with the round-2 guide in one hunk over
  the § Compatibility table. With whitespace ignored, the only changed lines are the table's delimiter
  row, which widens, and the Tooltip and Popover rows.
- An inline `python3` command split the round-2 and round-3 patches on their `diff --git` headers and
  compared the sections. It reported `same file set: True` and
  `sections that differ: ['diff --git a/guides/veneer.md b/guides/veneer.md']`.
- The `tp-check-3.log.txt` file records `apply-check exit 0`, `apply exit 0`, and
  `byte-compare exit 0`. Every file the patch touches, applied to a fresh `2a3f223` extract, is
  byte-equal to the validation copy. The `git apply --stat` command reports
  `16 files changed, 1028 insertions(+), 220 deletions(-)`. The growth over round 2 is the re-padded
  table.

## Gates

The following gates ran on the rebuilt validation copy. The log is the `tp-gates-3.log.txt` file.

| Gate        | Command                                                                                              | Result                                        |
| ----------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| check       | `npm run check`                                                                                      | exit 0                                        |
| build       | `npm run build:src`                                                                                  | exit 0                                        |
| conformance | `npm run test:conformance`                                                                           | exit 0, `Tests  22 passed (22)`               |
| guides      | `npm run test:guides`                                                                                | exit 0, `Tests  19 passed (19)`               |
| policy      | `npm run test:policy`                                                                                | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| format      | `npx oxfmt --config .oxfmtrc.json --ignore-path=../tp-empty.ignore --check guides/veneer.md`         | exit 0, "All matched files use the correct format." |

The following gates ran in the worktree:

- `npm run format:check` exits 0 with "All matched files use the correct format. Finished in 15160ms
  on 359 files using 4 threads."
- `npm run lint:check` exits 0 and prints no diagnostic.

## Decisions

- **Clause order.** Each restored clause returns to its round-1 position within its row, and the
  round-2 clauses keep theirs.
- **Re-padding.** The `oxfmt` formatter re-pads the whole § Compatibility table on the copy, as the
  ruling directs.
- **Patch form.** The `tp-shared-3.patch` file carries each non-guide section of the
  `tp-shared-2.patch` file byte for byte, so only the guide changes between them.

## Observations

- The gate script's earlier run had no build step. In that run the `npm run test:conformance` command
  exited 1 with `Tests  6 failed | 16 passed (22)`, and each failure was an `ENOENT` error for the
  `dist/src/styles/index.css` file or the `dist/src/core/index.js` file on the fresh copy. The
  conformance gate reads the built `dist/` directory. The script now runs the `npm run build:src`
  command before it, as round 2's script did, and the recorded run is green. The
  `tp-gates-3-nobuild.log.txt` file keeps the earlier run.
- The owned files and every other shared file are unchanged from round 2, so the round-2 style,
  section, setup, and showcase readings still hold. This round did not re-run them.
- Nothing was written into the session scratchpad. It was read only for the npm 11 `PATH` entry in the
  `tp-env.sh` file.
