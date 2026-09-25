"""J-SAMEWAY-ENGINES-A mutation instrument, round 4.

Round 4 is the successor of round 3's `tmp/j-engines-a/mutations-3.py`, which stays in place
unedited. What changed:
- Round 4 records a property's priority in `HostChange` and writes it back, so every round-3 LEAF
  row whose anchor in `src/browser/helpers.ts` moved is re-anchored to the same rule on the new
  line: LEAF-write-property, LEAF-unchanged, LEAF-unchanged-engine, LEAF-order, LEAF-order-engine,
  LEAF-skip, LEAF-prior, CONTROL, and BOOM.
- An F1 row per completion write round 4 records in `Collapse` deletes that one added
  `recordHostChange` call.
- A P2 row per priority rule: the record drops the priority, the change test compares the value
  alone, the rewind drops the priority or compares the value alone, the writer drops the priority,
  and the reading returns no priority. Two of them also read a `HostSnapshot.test.ts` case, so the
  shared reading and writer bind through the snapshot, and two read the Collapse priority case.
- A second control spells the priority test of the change leaf another way and must read HELD.

Each row plants one mutation in one exact source span, runs the one case it names through the real
`src:browser` Vitest project against that case's test file, and reads the case's status and failure
message from the JSON report.

Obligations:
- A1, the old refusal restored: a door before the token step reads the token at the change's start
  again, or the token step writes the token the host already wrote.
- A2, a write goes unrecorded, or a stopped change takes no returning step.
- A3, Toast's transition door requires the `shown` token again.
- PHASE, a phase stop that is not a takeover runs the returning step: the door no longer ends the
  change when the panel, the toast, the list, or the items stop it otherwise.
- ORDER, Tab reads the host's token before the list, so a sibling's own swap reads as a takeover.
- R1, a removal of a token the item carried before the slide goes unrecorded.
- L1, a leaf rule broken: a write that changes nothing is recorded, a target is recorded again, the
  rewind runs forward, writes a target already at its recorded value, reads on after `owns` returns
  false, or writes back a value other than the recorded one.
- L2, absence reads as something other than undefined, or a present value reads as absent.
- F1, a Collapse completion write goes unrecorded after every earlier write to its target changed
  nothing.
- P2, a property's priority is lost: not recorded, not compared, not written back, not written, or
  not read.

Rule: a failed case counts as KILLED only when the first line of its failure message names an
assertion failure: it starts with `AssertionError`, or it is the expect library's own assertion
message, which starts with `expected `. Every other failure reads REFUSED, and so does a case that
was not collected or a run that reports a suite-level error. A passed case reads HELD only when the
whole run reports success, with no failed case, no failed suite, and no unhandled error; otherwise it
reads REFUSED. The BOOM row plants a thrown `Error('boom')` and the UNBOUND row an unbound
identifier; both must read REFUSED. The CONTROL and CONTROL-priority rows plant an equivalent
spelling of the change leaf's no-change test and must read HELD.

Every mutated source is read before any row runs and its SHA-256 digest printed; each row restores
the bytes it read, and the end of the run checks every digest again and prints the receipt
`restored byte for byte`.

Run from the worktree root: python tmp/j-engines-a/mutations-4.py
The log goes to tmp/j-engines-a/mutations-4.log.txt as well as to standard output.
"""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-engines-a/mutation-report-4.json'
LOG = ROOT / 'tmp/j-engines-a/mutations-4.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

COLLAPSE = 'src/browser/Collapse.ts'
TOAST = 'src/browser/Toast.ts'
TAB = 'src/browser/Tab.ts'
CAROUSEL = 'src/browser/Carousel.ts'

COLLAPSE_TEST = 'tests/src/browser/Collapse.test.ts'
TOAST_TEST = 'tests/src/browser/Toast.test.ts'
TAB_TEST = 'tests/src/browser/Tab.test.ts'
CAROUSEL_TEST = 'tests/src/browser/Carousel.test.ts'


SNAPSHOT_TEST = 'tests/src/browser/HostSnapshot.test.ts'


def case(test, title):
    prefix = {
        COLLAPSE_TEST: 'Collapse',
        TOAST_TEST: 'Toast',
        TAB_TEST: 'Tab',
        CAROUSEL_TEST: 'Carousel',
        SNAPSHOT_TEST: 'HostSnapshot',
    }
    return (test, f'{prefix[test]} {title}')


C_SHOW_EVENT = case(COLLAPSE_TEST, 'completes a show whose listener adds the shown token, expanding its trigger, clearing the size, and dispatching shown')
C_SHOW_SIBLING = case(COLLAPSE_TEST, 'completes a show whose open sibling hide listener adds the shown token to its panel')
C_HIDE_EVENT = case(COLLAPSE_TEST, 'completes a hide whose listener removes the shown token, collapsing its trigger and dispatching hidden')
C_HIDE_SIZE = case(COLLAPSE_TEST, 'completes a hide whose size write a reaction answers by removing the shown token, dispatching hidden and resolving true')
C_SHOW_TOKEN = case(COLLAPSE_TEST, 'returns a show whose completing token write a reaction answers by removing the shown token, clearing the transition token and the size, so a later show runs')
C_HIDE_TRIGGER = case(COLLAPSE_TEST, 'returns a hide whose trigger write a reaction answers by adding the shown token, expanding that trigger again and writing no aria-expanded value it never wrote')
C_SHOW_SIZED = case(COLLAPSE_TEST, 'returns a show whose listener added the shown token and whose zero-size write a reaction answers by removing it, adding back the host token and clearing the size')
C_SHOW_HOSTLESS = case(COLLAPSE_TEST, 'returns a show of a panel without the host token, whose host-token removal a reaction answers by removing the shown token, adding no host token')
C_SHOW_PRIOR = case(COLLAPSE_TEST, 'returns a show whose completing token write a reaction answers by removing the shown token to the inline size and the trigger state held before the show')
C_SHOW_PHASE = case(COLLAPSE_TEST, 'stops a show whose transition-token write a reaction answers by removing that token, writing nothing more')
C_HIDE_PHASE = case(COLLAPSE_TEST, 'stops a hide whose transition-token write a reaction answers by removing that token, writing nothing more')
C_SHOW_HOST_TRIGGER = case(COLLAPSE_TEST, 'returns a show whose completing token write a reaction answers by removing the shown token, leaving a trigger value the host wrote that the show never changed')
T_FADE_PHASE = case(TOAST_TEST, 'stops a show whose fade write a reaction answers by writing the transition token, writing nothing more')
TB_HOST_TOGGLE = case(TAB_TEST, 'returns a swap whose control loses its active token on the sibling hidden event, leaving a toggle token the host added that the swap never changed')

T_SHOW_FADE = case(TOAST_TEST, 'completes a show whose fade write a reaction answers by adding the shown token, dispatching shown and resolving true')
T_HIDE_EVENT = case(TOAST_TEST, 'completes a hide whose listener removes the shown token, dispatching hidden and resolving true')
T_HIDE_STUCK = case(TOAST_TEST, 'completes a hide whose transition-token write a reaction answers by removing the shown token, leaving no showing token, so a later show and hide run')
T_SHOW_TOKEN = case(TOAST_TEST, 'returns a show whose token write a reaction answers by removing the shown token, leaving no showing token, so a later show and hide run')
T_SHOW_SHOWN = case(TOAST_TEST, 'returns a show of a shown toast whose fade write a reaction answers by removing the shown token, removing only the fade token it added')
T_HIDE_RETURN = case(TOAST_TEST, 'returns a hide whose listener removed the shown token and whose transition-token write a reaction answers by adding it back, removing the showing token')
T_SHOW_PHASE = case(TOAST_TEST, 'stops a show whose shown-and-transition write a reaction answers by removing the transition token, writing nothing more')

TB_EVENT = case(TAB_TEST, 'completes a swap whose listener activates the control, writing no active token on the control and dispatching every event')
TB_SIBLING = case(TAB_TEST, 'completes a swap whose sibling token write a reaction answers by activating the control, writing no active token on the control')
TB_TOKEN = case(TAB_TEST, 'returns a swap whose control-activation write a reaction answers by removing the active token, reactivating and reselecting the sibling')
TB_DROPDOWN = case(TAB_TEST, 'returns a swap whose control loses its active token during the pane fade, reopening the dropdown that holds the sibling')
TB_CLOSED = case(TAB_TEST, 'returns a swap whose control loses its active token on the sibling hidden event, leaving the closed dropdown that holds the sibling closed')
TB_SHARED = case(TAB_TEST, 'returns a swap between two controls of one open dropdown whose control loses its active token on the sibling hidden event, leaving that dropdown open')
TB_TAKEN = case(TAB_TEST, 'resolves false for the swap a sibling takes over by a reaction to its control write, with no panes to read')
TB_PHASE = case(TAB_TEST, 'never swaps a list whose markup marks two controls active, stopping after the first removal')

CA_EVENT = case(CAROUSEL_TEST, 'completes a slide whose listener activates the incoming item, writing no active token on it and dispatching slid')
CA_INDICATOR = case(CAROUSEL_TEST, 'completes a slide whose indicator write a reaction answers by activating the incoming item, dispatching slid')
CA_TRANSITION = case(CAROUSEL_TEST, 'completes a slide whose incoming item gains its active token during the transition, dispatching slid')
CA_OUTGOING = case(CAROUSEL_TEST, 'returns a slide whose outgoing removal a reaction answers by removing the incoming active token, reactivating the outgoing item and its indicator')
CA_REVERSED = case(CAROUSEL_TEST, 'returns a slide whose listener activated the incoming item and which loses that token during the transition, removing the order and direction tokens it added')
CA_ORDER = case(CAROUSEL_TEST, 'returns a slide whose completing write a reaction answers by removing the incoming active token, restoring an order token the incoming item carried before the slide')
CA_DIRECTION = case(CAROUSEL_TEST, 'returns a slide whose outgoing removal a reaction answers by removing the incoming active token, restoring a direction token the outgoing item carried before the slide')
CA_PHASE = case(CAROUSEL_TEST, 'stops a slide whose indicator write a reaction answers by taking the active token off the outgoing item, writing nothing more')

HELPERS = 'src/browser/helpers.ts'
HELPERS_TEST = 'tests/src/browser/helpers.test.ts'

H_READ = (HELPERS_TEST, 'readHostValue reads an attribute value, a token name, and an inline property value, and undefined for each when absent')
H_READ_EMPTY = (HELPERS_TEST, 'readHostValue reads an attribute present with an empty value as the empty string, not as absent')
H_WRITE = (HELPERS_TEST, 'writeHostValue adds or removes a token, sets or removes an attribute, and sets or clears an inline property')
H_WRITE_QUIET = (HELPERS_TEST, 'writeHostValue writes nothing for a token already in the state the value names')
H_UNCHANGED = (HELPERS_TEST, 'recordHostChange records nothing for a write that leaves the target as it reads, returning the same records')
H_ONCE = (HELPERS_TEST, 'recordHostChange records a target once, at its first changing write, with the value it held then, in the order of those first writes')
H_CATEGORY = (HELPERS_TEST, 'recordHostChange records an attribute and a token of the same name on one element as two targets')
H_REWIND = (HELPERS_TEST, 'rewindHostChanges writes each recorded target back to its prior value in reverse order, skipping a target already at it')
H_STOP = (HELPERS_TEST, 'rewindHostChanges stops at the first read of owns that returns false, reading and writing nothing after it')
H_READ_PRIORITY = (HELPERS_TEST, 'readHostPriority reads an inline property priority, and the empty string for an unprioritized or absent property, an attribute, and a token')
H_WRITE_PRIORITY = (HELPERS_TEST, 'writeHostValue sets an inline property with the priority it is given, and with none by default')
H_RECORD_PRIORITY = (HELPERS_TEST, 'recordHostChange records an inline property with its priority, and an attribute and a token with the empty string')
H_PRIORITY_ONLY = (HELPERS_TEST, 'recordHostChange records a write of the value an inline property holds when the property carries a priority')
H_REWIND_PRIORITY = (HELPERS_TEST, 'rewindHostChanges writes an inline property back with its recorded priority, and skips it once it holds that value and priority')

C_SHOW_PRIORITY = case(COLLAPSE_TEST, 'returns a show whose completing token write a reaction answers by removing the shown token to the inline size and priority held before the show')
C_HIDE_HOSTLESS = case(COLLAPSE_TEST, 'returns a hide of a panel without the host token, whose completing host-token write a reaction answers by adding the shown token, removing the host token again')
C_SHOW_ZERO = case(COLLAPSE_TEST, 'returns a show whose size writes change nothing and whose size clearing a reaction answers by removing the shown token, writing the zero size back')
C_HIDE_ZERO = case(COLLAPSE_TEST, 'returns a hide whose size write changes nothing and whose size clearing a reaction answers by adding the shown token, writing the zero size back')
S_PRIORITY = case(SNAPSHOT_TEST, 'restores an inline property with its priority and removes one it found absent')

F1_SHOW_SIZE = "\t\t// The clearing is the first changing write of a size both earlier size writes left as it was.\n"
F1_HIDE_SIZE = "\t\t// The clearing is the first changing write of a size the measured size write left as it was.\n"
F1_HIDE_HOST = "\t\t// The addition is the first changing write of a `host` token the panel lacked before the hide.\n"
SIZE_CLEARED = "\t\twritten = recordHostChange(\n\t\t\twritten,\n\t\t\t{ category: 'property', element: host, name: dimension },\n\t\t\tundefined,\n\t\t)\n"
HOST_ADDED = "\t\twritten = recordHostChange(\n\t\t\twritten,\n\t\t\t{ category: 'token', element: host, name: this.#classes.host },\n\t\t\tthis.#classes.host,\n\t\t)\n"
CHANGE_TEST = "return prior === next && priority === '' ? changes : [...changes, { target, prior, priority }]"
REWIND_LOOP = 'for (const { target, prior, priority } of [...changes].reverse()) {'
REWIND_TEST = "\t\tif (readHostValue(target) !== prior || readHostPriority(target) !== priority) {\n\t\t\twriteHostValue(target, prior, priority)\n\t\t}\n"


def drop(path, indent, target, next_value, after=''):
    """Returns an edit that deletes one `recordHostChange` call, the lines after it named by `after`
    kept, so the write it records goes unrecorded."""
    tabs = '\t' * indent
    block = f'{tabs}written = recordHostChange(\n{tabs}\t{"written"},\n{tabs}\t{target},\n{tabs}\t{next_value},\n{tabs})\n'
    return (path, block + after, after)


# (row, obligation, mutation label, (path, old, new), (test file, case full name), expected verdict)
ROWS = [
    ('A1-collapse-show-event', 'A1', 'the show re-read refuses a shown panel', (COLLAPSE, 'this.#transitioning([this.#host, ...siblings])', 'this.#transitioning([this.#host, ...siblings]) ||\n\t\t\tthis.shown'), C_SHOW_EVENT, 'KILLED'),
    ('A1-collapse-show-sibling', 'A1', 'the sibling door refuses a shown panel', (COLLAPSE, 'if (!this.#holds(change, shown, [], [this.#classes.transition])) return false', 'if (!this.#holds(change, shown, [], [this.#classes.transition, this.#classes.shown])) return false'), C_SHOW_SIBLING, 'KILLED'),
    ('A1-collapse-hide-event', 'A1', 'the hide re-read refuses a hidden panel', (COLLAPSE, 'this.#transitioning([this.#host])', 'this.#transitioning([this.#host]) ||\n\t\t\t!this.shown'), C_HIDE_EVENT, 'KILLED'),
    ('A1-collapse-hide-size', 'A1', 'the size-write door requires the shown token', (COLLAPSE, '!this.#apply(change, expected, [], during, () =>', '!this.#apply(change, expected, [this.#classes.shown], during, () =>'), C_HIDE_SIZE, 'KILLED'),
    ('A2-collapse-trigger', 'A2', "the hide records no trigger's collapsed token", drop(COLLAPSE, 3, "{ category: 'token', element: trigger, name: collapsed }", 'collapsed'), C_HIDE_TRIGGER, 'KILLED'),
    ('A2-collapse-host', 'A2', "the show records no removal of the panel's host token", drop(COLLAPSE, 2, "{ category: 'token', element: host, name: this.#classes.host }", 'undefined', '\t\tif (\n\t\t\t!this.#apply(change, expected, during, [], () => host.classList.remove(this.#classes.host))'), C_SHOW_SIZED, 'KILLED'),
    ('A2-collapse-size', 'A2', "the show records no inline size", drop(COLLAPSE, 2, "{ category: 'property', element: host, name: dimension }", "'0px'"), C_SHOW_PRIOR, 'KILLED'),
    ('A2-collapse-rewind', 'A2', 'a stopped change takes no returning step', (COLLAPSE, '\t\trewindHostChanges(written, () => this.#owns(change))\n', ''), C_SHOW_TOKEN, 'KILLED'),
    ('PHASE-collapse', 'PHASE', 'a phase stop keeps the identity, so the returning step writes', (COLLAPSE, '\t\tthis.#change = {}\n', ''), C_HIDE_PHASE, 'KILLED'),
    ('A1-toast-show-fade', 'A1', 'the fade door refuses the shown token', (TOAST, '!this.#apply(change, expected, [], [transition], () => host.classList.add(fade))', '!this.#apply(change, expected, [], [shown, transition], () => host.classList.add(fade))'), T_SHOW_FADE, 'KILLED'),
    ('A1-toast-hide-event', 'A1', 'the hide re-read refuses a hidden toast', (TOAST, "has made this call's token write for it.\n\t\tif (this.#refused() || this.#change !== prior) return false", "has made this call's token write for it.\n\t\tif (this.#refused() || this.#change !== prior || !this.shown) return false"), T_HIDE_EVENT, 'KILLED'),
    ('A3-toast-hide-transition', 'A3', 'the transition door requires the shown token', (TOAST, 'if (!this.#apply(change, expected, [transition], [], () => host.classList.add(transition))) {', 'if (!this.#apply(change, expected, [shown, transition], [], () => host.classList.add(transition))) {'), T_HIDE_STUCK, 'KILLED'),
    ('A2-toast-fade', 'A2', 'the show records no fade token', (TOAST, "\t\t\twritten = recordHostChange(written, { category: 'token', element: host, name: fade }, fade)\n", ''), T_SHOW_SHOWN, 'KILLED'),
    ('A2-toast-transition', 'A2', 'the hide records no transition token', drop(TOAST, 2, "{ category: 'token', element: host, name: transition }", 'transition', '\t\tif (!this.#apply(change, expected, [transition], [], () => host.classList.add(transition))) {'), T_HIDE_RETURN, 'KILLED'),
    ('A2-toast-rewind', 'A2', 'a stopped change takes no returning step', (TOAST, '\t\trewindHostChanges(written, () => this.#owns(change))\n', ''), T_SHOW_TOKEN, 'KILLED'),
    ('PHASE-toast', 'PHASE', 'a phase stop keeps the identity, so the returning step writes', (TOAST, '\t\tthis.#change = {}\n', ''), T_FADE_PHASE, 'KILLED'),
    ('A1-tab-event', 'A1', 'the re-read refuses an active control', (TAB, 'this.#sibling() !== outgoing) {', 'this.#sibling() !== outgoing || this.active) {'), TB_EVENT, 'KILLED'),
    ('A1-tab-skip', 'A1', 'the token step writes the token the host already wrote', (TAB, 'if (!this.active) host.classList.add(active)', 'host.classList.add(active)'), TB_SIBLING, 'KILLED'),
    ('A2-tab-selection', 'A2', "the sibling's deselection records nothing", (TAB, '\t\t\t\t\twritten = recordHostChange(written, target, value)\n', ''), TB_TOKEN, 'KILLED'),
    ('A2-tab-dropdown', 'A2', "the sibling's deselection records no dropdown write", (TAB, '\t\t\t\t\twritten = recordHostChange(written, target, value)\n', '\t\t\t\t\tif (target.element === outgoing) written = recordHostChange(written, target, value)\n'), TB_DROPDOWN, 'KILLED'),
    ('A2-tab-rewind', 'A2', 'a stopped change takes no returning step', (TAB, '\t\trewindHostChanges(written, () => this.#owns(change))\n', ''), TB_SHARED, 'KILLED'),
    ('ORDER-tab', 'ORDER', 'the host token is read before the list', (TAB, '\t\tif (this.#sibling() === undefined) {\n\t\t\tif (active !== undefined && this.active !== active) return false\n', '\t\tif (active !== undefined && this.active !== active) return false\n\t\tif (this.#sibling() === undefined) {\n'), TB_TAKEN, 'KILLED'),
    ('PHASE-tab', 'PHASE', 'a phase stop keeps the identity, so the returning step writes', (TAB, '\t\tthis.#change = {}\n', ''), TB_PHASE, 'KILLED'),
    ('A1-carousel-event', 'A1', 'the re-read refuses an active incoming item', (CAROUSEL, '!current.includes(incoming)\n\t\t) {', '!current.includes(incoming) ||\n\t\t\tincoming.classList.contains(active)\n\t\t) {'), CA_EVENT, 'KILLED'),
    ('A1-carousel-indicator', 'A1', 'the indicator door refuses an active incoming item', (CAROUSEL, '() => indicator.classList.remove(active),\n\t\t\t\t\t\tchange,\n\t\t\t\t\t\tpair,\n\t\t\t\t\t\texpected,\n\t\t\t\t\t\t[[outgoing, active]],\n\t\t\t\t\t\t[[indicator, active]],', '() => indicator.classList.remove(active),\n\t\t\t\t\t\tchange,\n\t\t\t\t\t\tpair,\n\t\t\t\t\t\texpected,\n\t\t\t\t\t\t[[outgoing, active]],\n\t\t\t\t\t\t[[indicator, active], [incoming, active]],'), CA_INDICATOR, 'KILLED'),
    ('A1-carousel-transition', 'A1', 'the transition door refuses an active incoming item', (CAROUSEL, 'if (!this.#holds(change, pair, expected, moving, blocked, [])) {', 'if (!this.#holds(change, pair, expected, moving, [...blocked, [incoming, active]], [])) {'), CA_TRANSITION, 'KILLED'),
    ('A2-carousel-current', 'A2', "the leaving indicator's aria-current removal is no entry", drop(CAROUSEL, 4, "{ category: 'attribute', element: indicator, name: 'aria-current' }", 'undefined'), CA_OUTGOING, 'KILLED'),
    ('A2-carousel-outgoing', 'A2', "the completion records no removal of the outgoing item's active token", drop(CAROUSEL, 3, "{ category: 'token', element: outgoing, name: active }", 'undefined'), CA_OUTGOING, 'KILLED'),
    ('A2-carousel-direction', 'A2', "the slide records no addition of the incoming item's direction token", drop(CAROUSEL, 3, "{ category: 'token', element: incoming, name: direction }", 'direction'), CA_REVERSED, 'KILLED'),
    ('R1-carousel-order', 'R1', 'the completion records no removal of an order token the incoming item carried', drop(CAROUSEL, 3, "{ category: 'token', element: incoming, name: order }", 'undefined'), CA_ORDER, 'KILLED'),
    ('R1-carousel-direction', 'R1', 'the completion records no removal of a direction token the outgoing item carried', drop(CAROUSEL, 3, "{ category: 'token', element: outgoing, name: direction }", 'undefined'), CA_DIRECTION, 'KILLED'),
    ('PHASE-carousel', 'PHASE', 'a phase stop keeps the slide in flight, so the returning step writes', (CAROUSEL, '\t\tthis.#finish(change)\n\t\treturn false\n\t}', '\t\treturn false\n\t}'), CA_PHASE, 'KILLED'),
    ('LEAF-read-absent', 'L2', 'an absent attribute reads as the empty string', (HELPERS, "if (category === 'attribute') return element.getAttribute(name) ?? undefined", "if (category === 'attribute') return element.getAttribute(name) ?? ''"), H_READ, 'KILLED'),
    ('LEAF-read-empty', 'L2', 'an empty attribute value reads as absent', (HELPERS, "if (category === 'attribute') return element.getAttribute(name) ?? undefined", "if (category === 'attribute') return element.getAttribute(name) || undefined"), H_READ_EMPTY, 'KILLED'),
    ('LEAF-read-token', 'L2', 'a present token reads as the empty string', (HELPERS, "if (category === 'token') return element.classList.contains(name) ? name : undefined", "if (category === 'token') return element.classList.contains(name) ? '' : undefined"), H_READ, 'KILLED'),
    ('LEAF-write-token', 'L1', 'a token write always adds or removes, whatever the token reads', (HELPERS, "if (category === 'token') element.classList.toggle(name, value !== undefined)", "if (category === 'token') {\n\t\tif (value === undefined) element.classList.remove(name)\n\t\telse element.classList.add(name)\n\t}"), H_WRITE_QUIET, 'KILLED'),
    ('LEAF-write-property', 'L1', 'an inline property value is never written', (HELPERS, '\telse element.style.setProperty(name, value, priority)', '\telse element.style.removeProperty(name)'), H_WRITE, 'KILLED'),
    ('LEAF-unchanged', 'L1', 'a write that changes nothing is recorded', (HELPERS, CHANGE_TEST, 'return [...changes, { target, prior, priority }]'), H_UNCHANGED, 'KILLED'),
    ('LEAF-unchanged-engine', 'L1', 'a write that changes nothing is recorded, read by a tab swap', (HELPERS, CHANGE_TEST, 'return [...changes, { target, prior, priority }]'), TB_HOST_TOGGLE, 'KILLED'),
    ('LEAF-once', 'L1', 'a target is recorded again at a later write', (HELPERS, '\tif (recorded) return changes\n', ''), H_ONCE, 'KILLED'),
    ('LEAF-category', 'L1', 'a target is matched by element and name alone', (HELPERS, '\t\t\tchange.target.category === category &&\n', ''), H_CATEGORY, 'KILLED'),
    ('LEAF-order', 'L1', 'the rewind runs in the order of the first writes', (HELPERS, REWIND_LOOP, 'for (const { target, prior, priority } of changes) {'), H_REWIND, 'KILLED'),
    ('LEAF-order-engine', 'L1', 'the rewind runs in the order of the first writes, read by a carousel slide', (HELPERS, REWIND_LOOP, 'for (const { target, prior, priority } of changes) {'), CA_OUTGOING, 'KILLED'),
    ('LEAF-skip', 'L1', 'the rewind writes a target already at its recorded value', (HELPERS, REWIND_TEST, '\t\twriteHostValue(target, prior, priority)\n'), H_REWIND, 'KILLED'),
    ('LEAF-stop', 'L1', 'the rewind reads on after owns returns false', (HELPERS, '\t\tif (!owns()) return\n', '\t\tif (!owns()) continue\n'), H_STOP, 'KILLED'),
    ('LEAF-prior', 'L1', 'the rewind writes back the value the call wrote, not the prior one', (HELPERS, '\t\t\twriteHostValue(target, prior, priority)\n', '\t\t\twriteHostValue(target, readHostValue(target), priority)\n'), C_SHOW_PRIOR, 'KILLED'),
    ('F1-show-size', 'F1', "the show records no clearing of a size its earlier writes left as it was", (COLLAPSE, F1_SHOW_SIZE + SIZE_CLEARED, F1_SHOW_SIZE), C_SHOW_ZERO, 'KILLED'),
    ('F1-hide-size', 'F1', "the hide records no clearing of a size its measured write left as it was", (COLLAPSE, F1_HIDE_SIZE + SIZE_CLEARED, F1_HIDE_SIZE), C_HIDE_ZERO, 'KILLED'),
    ('F1-hide-host', 'F1', "the hide records no completing addition of a host token the panel lacked", (COLLAPSE, F1_HIDE_HOST + HOST_ADDED, F1_HIDE_HOST), C_HIDE_HOSTLESS, 'KILLED'),
    ('P2-record-priority', 'P2', 'the record carries no priority', (HELPERS, '\tconst priority = readHostPriority(target)\n', "\tconst priority: string = ''\n"), H_RECORD_PRIORITY, 'KILLED'),
    ('P2-record-priority-engine', 'P2', 'the record carries no priority, read by a stopped collapse show', (HELPERS, '\tconst priority = readHostPriority(target)\n', "\tconst priority: string = ''\n"), C_SHOW_PRIORITY, 'KILLED'),
    ('P2-record-value', 'P2', 'the change test compares the value alone', (HELPERS, CHANGE_TEST, 'return prior === next ? changes : [...changes, { target, prior, priority }]'), H_PRIORITY_ONLY, 'KILLED'),
    ('P2-rewind-drop', 'P2', 'the rewind writes the value back without its priority', (HELPERS, '\t\t\twriteHostValue(target, prior, priority)\n', '\t\t\twriteHostValue(target, prior)\n'), H_REWIND_PRIORITY, 'KILLED'),
    ('P2-rewind-drop-engine', 'P2', 'the rewind writes the value back without its priority, read by a stopped collapse show', (HELPERS, '\t\t\twriteHostValue(target, prior, priority)\n', '\t\t\twriteHostValue(target, prior)\n'), C_SHOW_PRIORITY, 'KILLED'),
    ('P2-rewind-value', 'P2', 'the rewind skips a target whose value alone matches the record', (HELPERS, 'if (readHostValue(target) !== prior || readHostPriority(target) !== priority) {', 'if (readHostValue(target) !== prior) {'), H_REWIND_PRIORITY, 'KILLED'),
    ('P2-write', 'P2', 'the writer sets a property without its priority', (HELPERS, '\telse element.style.setProperty(name, value, priority)', '\telse element.style.setProperty(name, value)'), H_WRITE_PRIORITY, 'KILLED'),
    ('P2-write-snapshot', 'P2', "the writer sets a property without its priority, read by a snapshot's restoration", (HELPERS, '\telse element.style.setProperty(name, value, priority)', '\telse element.style.setProperty(name, value)'), S_PRIORITY, 'KILLED'),
    ('P2-read', 'P2', 'the reading returns no priority', (HELPERS, "return category === 'property' ? element.style.getPropertyPriority(name) : ''", "return ''"), H_READ_PRIORITY, 'KILLED'),
    ('P2-read-snapshot', 'P2', "the reading returns no priority, read by a snapshot's restoration", (HELPERS, "return category === 'property' ? element.style.getPropertyPriority(name) : ''", "return ''"), S_PRIORITY, 'KILLED'),
    ('CONTROL', 'control', "the leaf's no-change test spelled as its negation", (HELPERS, CHANGE_TEST, "return prior !== next || priority !== '' ? [...changes, { target, prior, priority }] : changes"), H_UNCHANGED, 'HELD'),
    ('CONTROL-priority', 'control', "the leaf's priority test spelled as a length test", (HELPERS, CHANGE_TEST, "return prior === next && priority.length === 0 ? changes : [...changes, { target, prior, priority }]"), H_PRIORITY_ONLY, 'HELD'),
    ('BOOM', 'refusal', "the rewind throwing Error('boom')", (HELPERS, '\t\t\twriteHostValue(target, prior, priority)\n', "\t\t\tthrow new Error('boom')\n"), C_SHOW_TOKEN, 'REFUSED'),
    ('UNBOUND', 'refusal', 'the tab token step naming an unbound identifier', (TAB, 'if (!this.active) host.classList.add(active)', 'if (!this.active) host.classList.add(unboundToken)'), TB_TOKEN, 'REFUSED'),
]

ASSERTION = re.compile(r'^(AssertionError\b|expected .+)')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def escape(name):
    return ''.join('\\' + char if char in '\\^$.|?*+()[]{}' else char for char in name)


def first_line(text):
    for line in text.splitlines():
        if line.strip():
            return line.strip()[:200]
    return ''


def read(case_name):
    """Returns (status, first line of the failure message, refusal reason or None)."""
    if not REPORT.exists():
        return 'NO REPORT', '', 'no report'
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    suites = report.get('testResults', [])
    suite_messages = [suite.get('message', '') for suite in suites if suite.get('message')]
    found = [
        result
        for suite in suites
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case_name
    ]
    if len(found) != 1:
        return f'NOT COLLECTED ({len(found)})', first_line(' '.join(suite_messages)), 'not collected'
    status = found[0]['status']
    message = first_line('\n'.join(found[0].get('failureMessages', [])))
    if suite_messages:
        return status, message, 'suite-level error: ' + first_line(' '.join(suite_messages))
    if status == 'passed':
        clean = (
            report.get('success') is True
            and report.get('numFailedTests') == 0
            and report.get('numFailedTestSuites') == 0
        )
        return status, '', None if clean else 'run reported failure or an unhandled error'
    if status != 'failed':
        return status, message, 'not run'
    if ASSERTION.match(message):
        return status, message, None
    return status, message, 'not an assertion failure'


def run(test, case_name):
    if REPORT.exists():
        REPORT.unlink()
    subprocess.run(
        [
            'node',
            str(VITEST),
            'run',
            '--config',
            'vite.config.ts',
            '--no-cache',
            '--project',
            'src:browser',
            '--reporter=json',
            f'--outputFile={REPORT.relative_to(ROOT).as_posix()}',
            '-t',
            escape(case_name),
            test,
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return read(case_name)


def verdict(status, reason):
    if status == 'passed' and reason is None:
        return 'HELD'
    if status == 'failed' and reason is None:
        return 'KILLED'
    return 'REFUSED'


def main():
    sink = []
    paths = sorted({row[3][0] for row in ROWS})
    originals = {path: (ROOT / path).read_bytes() for path in paths}
    recorded = {path: digest(data) for path, data in originals.items()}
    for path in paths:
        emit(f'digest {path} {recorded[path]}', sink)
    emit('| Row | Obligation | Mutation | Case | Expected | Status | Verdict | Failure message | Refusal |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- | --- | --- |', sink)
    misses = 0
    for row, obligation, label, (path, old, new), (test, case_name), expected in ROWS:
        text = originals[path].decode('utf-8')
        count = text.count(old)
        try:
            if count != 1:
                status, message, reason = f'ANCHOR ({count})', '', 'anchor'
            else:
                (ROOT / path).write_bytes(text.replace(old, new).encode('utf-8'))
                status, message, reason = run(test, case_name)
        finally:
            (ROOT / path).write_bytes(originals[path])
        reading = verdict(status, reason)
        if reading != expected:
            misses += 1
        cell = message.replace('|', '\\|')
        emit(
            f'| {row} | {obligation} | {label} | {case_name} | {expected} | {status} | {reading} | {cell} | {reason or ""} |',
            sink,
        )
    restored = all(digest((ROOT / path).read_bytes()) == recorded[path] for path in paths)
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit(f'rows {len(ROWS)}, missed {misses}', sink)
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored and misses == 0 else 1)


if __name__ == '__main__':
    main()
