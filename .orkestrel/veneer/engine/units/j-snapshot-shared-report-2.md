# J-SNAPSHOT-SHARED round 2 — the writer's report (opus on Opus 5.5, native, the round-1 writer resumed; retained from its final message, 2026-09-24)

All four obligations done; the acceptance chain exits 0; the whole browser suite passes (`Tests  916 passed (916)`); the instrument kills every row, holds the control, and ends `restored byte for byte`. Committed by the Orchestrator as Veneer `e3167f7` over `3b3b4a9` (`25 files changed, 729 insertions(+), 279 deletions(-)`).

## Files touched

- `src/browser/HostSnapshot.ts`: `#key(target)` keys a record by the name the platform resolves; the same-snapshot duplicate check compares keys; `#published` renamed `#owned`; the class summary and remarks say the last holder writes state back and state the naming rule; comments say "rejoins" where they said "takes back".
- `src/browser/types.ts`: the `HostSnapshotInterface` summary, the `save` remarks (the naming rule), two reflowed paragraphs, and the `TabInitialWrite` summary.
- Engines that destroy themselves when construction throws after the claim (a `try`/`catch` around the constructor tail that calls `destroy()` and rethrows): `Button.ts`, `Collapse.ts`, `Alert.ts`, `Toast.ts`, `ScrollSpy.ts`, `Dropdown.ts`, `Tab.ts`, `Carousel.ts`, `Tooltip.ts` (covering `Popover`); each also gets the F3 comment fix.
- `src/browser/Placement.ts`: reads `input.popover`, `position`, `offset`, and `fallbacks` before its first save; the TSDoc says so.
- `src/browser/ScrollLock.ts`: the F3 comment line only. `Alert.ts`: its class TSDoc paragraph reflowed. `Tab.ts`: the F2 wording in the class TSDoc and above `#planInitial`. `Tooltip.ts`: the `#linked` comments expanded.
- `guides/veneer.md`: the Surface rows for `HostSnapshotInterface`, `HostSnapshot`, and `TabInitialWrite`; § Delegate "joins the records"; § Ownership and restoration (the F1 sentence, the construction-failure rule, the naming rule); `#### Tab` (F2); `#### Carousel` (the swipe paragraph, the restoration paragraph, the departure bullet; A3); `#### Tooltip` (the nested-destroy clause, reflowed).
- Tests: `HostSnapshot.test.ts` (three R1 cases, A5 retitles, the fixture renamed `vn-probe-snapshot-three-holders`); one R2 case each in the `Button`, `Collapse`, `Alert`, `Toast`, `ScrollSpy`, `Dropdown`, `Tab`, `Carousel`, `Tooltip`, and `Placement` test files; `Tooltip.test.ts` the R4 case.
- `tmp/j-snapshot-shared/`: `mutations-2.py`, `acceptance-2.sh`, `record-digests.py`, `wrap.py`, `lf.py`, `reflow.py`, `widths.py`, the logs (retained as `units/j-snapshot-shared-mutations-2.*`, `-acceptance-2.sh`, `-r4-simpler.log.txt`).

## R1: names by the DOM's rule

Red on the `3b3b4a9` sources with the round-2 tests, `npm run test:src:browser -- <HostSnapshot plus the ten R2 test files>`: `Tests  12 failed | 418 passed (430)`; after, `Tests  430 passed (430)`. "joins one record for an attribute or a property saved under two spellings of its name on an HTML element, in either release order" (red `expected 'original' to be 'second'`; the analyst's witness in both orders, with a `height`/`HEIGHT` property row); "joins the record a restoration still owns when a reaction saves the attribute under another spelling of its name" (red `expected 'original' to be 'live'`); "keeps attribute names that differ in case apart on an SVG element and on an HTML element outside an HTML document, and custom property names apart on any element" (passes on `3b3b4a9`, bound by rows R1-NAMESPACE, R1-DOCUMENT, R1-CUSTOM). The rule in `#key`: fold to ASCII lowercase when the category is `attribute`, `namespaceURI` is XHTML, and `ownerDocument.contentType` is `'text/html'`; also fold a `property` whose name does not start with `--` (CSSOM folds non-custom property names); everything else, class tokens included, keeps its case.

## R2: no holder left by a failed construction

Each case constructs the engine with an option getter that throws, then checks that the error propagates, `find` returns undefined, a fresh engine constructs, and the host matches its markup. Red on `3b3b4a9`: Button (`on`; also another snapshot's `aria-pressed` restores) `expected Button{} to be undefined`; Collapse (`on`), Alert (`on`), Toast (`signal`), ScrollSpy (`on`), Dropdown (`signal`), Tab (`signal`), Carousel (`signal`, thrown after the swipe wrote `pointer-event`), Tooltip (`signal`, thrown after the title moved) each `expected <Engine>{} to be undefined`; Placement (a `position` getter, thrown after the promotion) `expected true to be false` (still `:popover-open`).

The search, every constructor of every class that builds a `HostSnapshot`: Button (claim, two saves, then `options.on`, the hook getters, `options.signal`: release needed); Collapse, Alert, Toast, ScrollSpy, Dropdown (claim, then `options.on`, hook getters, `options.signal`, and `addEventListener` on the signal, ScrollSpy also `refresh()`: a throw left the claim and listeners; release needed); Tab (claim, binding and signal reads, `#writeInitial`: release needed); Carousel (claim, binding, the `Swipe` construction, which saves and writes, then `options.signal` and `start()`: release needed); Tooltip and Popover (claim, binding, `#retitle`, which saves and writes, then `settings.signal`: release needed); Placement (saves and promotes, then read `position`, `offset`, `fallbacks`, and `input.popover` between a save and its write: reads moved before the first save); Swipe (reads every option before its save, then only `addEventListener`: no change); Isolation (reads every option before its first claim: no change); ScrollLock (reads every option before creating its snapshot: no change).

## Findings for J-SAMEWAY (`Modal.ts` and `Offcanvas.ts` unchanged)

Modal: `Modal.#registry.claim(host, this)` (around line 171) is followed by `bindEventMap(host, MODAL_EVENTS, isRelatedEvent, options?.on, signal)`, the keydown, mousedown/click, and resize listeners, then `options?.signal` and `lifetime?.addEventListener(...)`; nothing releases on a throw, so a throwing `on`, `signal`, or hook getter leaves the claim held (`Modal.find(host)` returns the half-built modal, `new Modal(host)` throws `MODAL_HOST_OWNED`, the listeners stay bound); it saves nothing, so no record leaks. Offcanvas: the same shape (claim around line 173). Patch for both: move `this.#host = host` above the claim, then wrap everything after the claim in `try { … } catch (error) { this.destroy(); throw error }`, each with a throwing-getter case. Also J-SAMEWAY's: the F3 comment in each `destroy()` and the `#### Modal` "one recording" sentence.

## R3: vocabulary

F1 (the § Ownership and restoration sentence ends "…which relinquishes its targets without writing, so the last remaining holder of each record it shared writes that record back, and a later save reads a record it held alone from the host"); F2 ("every role and state construction writes on its list, whether it writes the value or finds it already written"); F3 (`#owned`; § Delegate "joins the records the restoration has still to write back"; the comment "its snapshot joins the records this one has still to write back" in Alert, Tab, Button, Collapse, Carousel, Dropdown, ScrollSpy, Toast; ScrollLock "its snapshot joins the records still to write back"); F4 (the `TabInitialWrite` summary and row as specified); A1 (the class and interface summaries and both guide rows end "…when the last snapshot holding it restores"); A3 (`#### Carousel` says the swipe writes the `pointer` token back when it holds it last); A5 ("first save value" titles now "record value" or "from its record"; "pending original" and "take back" became "joins" and "rejoins"; the fixture renamed).

## R4: the `#linked` field stays

"takes its tip id out when a closing beforetoggle listener destroys it inside a hide while a popover on the same trigger lives, holding no record after": a `beforetoggle` listener on the tip destroys the tooltip during the placement teardown inside its own hide; passes on `3b3b4a9` (round 1 has the field); the simpler shape (no unlink in `destroy()`, the teardown unlinking regardless of lifetime) fails it (`r4-simpler.log.txt`: `Tests  1 failed | 72 passed (73)`, `expected [ Array(1) ] to deeply equal [ [ 'help vn-popover-90' ] ]`, reading `"help vn-popover-90 vn-tooltip-91"`): the nested destroy returns while the removed tip's id is still named, and the resumed hide then saves and writes after the destruction; row R4-LINKED re-proves it.

## `types.ts` changes

The `HostSnapshot` class summary becomes "Records host state before an engine writes it, and writes that state back when the last snapshot holding it restores."; the `save` remarks add "A target is named as the platform reads it: an attribute of an HTML element in an HTML document, and an inline property other than a custom property, match in any ASCII case, so `data-state` and `DATA-STATE` name one record, while another element's attribute names, custom property names, and class tokens keep their case."; the `TabInitialWrite` summary becomes "Describes one role or state a tab's construction sets on its list: the element, the attribute's name, and the value it takes."; the `restore` and `clear` remarks reflowed only.

## Mutation table (`mutations-2.log.txt`)

KILLED: READ, JOIN, SILENT, LAST (S1); CLEAR, CLEAR-PENDING, CLEAR-ALERT (S3); TAB (S4); S5; R1-FOLD, R1-TAKEOVER, R1-NAMESPACE, R1-DOCUMENT, R1-CUSTOM (R1); R2-BUTTON, R2-COLLAPSE, R2-ALERT, R2-TOAST, R2-SCROLLSPY, R2-DROPDOWN, R2-TAB, R2-CAROUSEL, R2-TOOLTIP, R2-PLACEMENT (R2); R4-LINKED. HELD: the control. `restored byte for byte`; `rows 26, missed 0`.

## Acceptance (`acceptance-2.log.txt`)

`check:src:browser`, oxlint and oxfmt over the owned files, `check`, `test:guides` 20, `test:policy` 109 and 1 skipped, the owned test files `Tests  587 passed (587)`: `chain exit 0`. Observations: `test:src:browser` 916; `test:setup:browser` 83.

## Deviation state

1. The SVG case goes through `Reflect.apply`, because `HostSnapshotTarget.element` is typed `HTMLElement`; an HTML element inside an XML document exercises the document half through the typed API.
2. R1 covers inline property names too (CSSOM folds non-custom names); R1-FOLD and R1-CUSTOM bind it.
3. R2 covers registry-claim leaks in engines that save nothing, since the brief names "a save (or a registry claim)".
4. A4: the reviewer's line list was not on disk; every comment line the diffs added past 100 columns (a tab counting 2) and the long guide lines were reflowed; one-line TSDoc summaries stay on one line; `Carousel.ts` line 70, an over-long TSDoc line from the base commit, stays.
5. Three proofs do not read red on `3b3b4a9` (the R1 SVG and XML case and the R4 case), because round 1 already had the behaviour; their evidence is the named mutation rows.
6. A wrap script wrote CRLF into seven engine files; `lf.py` restored LF, `oxfmt --check` confirms, and the script now writes LF.
