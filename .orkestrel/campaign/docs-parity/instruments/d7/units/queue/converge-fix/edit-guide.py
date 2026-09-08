import io, re, sys, pathlib

p = pathlib.Path('/home/user/fleet/queue/guides/queue.md')
t = p.read_text(encoding='utf-8')
orig = t

def sub1(old, new, label):
    global t
    if t.count(old) != 1:
        sys.exit(f'FAIL {label}: occurrences={t.count(old)}')
    t = t.replace(old, new, 1)

# --- Item 1: the Guards table gains Shape under the guard sentence ---
old_guards = """### Guards

| API                  | Kind     | Summary                                                                                                                                           |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isQueueError`       | function | Determines whether an unknown value is a `QueueError`, staying total for a hostile value.                                                         |
| `isQueueConcurrency` | function | Determines whether a value is a valid queue concurrency — a positive safe integer.                                                                |
| `isQueueRetries`     | function | Determines whether a value is a valid queue retry count — a nonnegative safe integer.                                                             |
| `isQueueTimeout`     | function | Determines whether a value is a valid queue timeout — an integer count of milliseconds inside the native timer range.                             |
| `isQueueSignal`      | function | Determines whether a value is a native abort signal usable by the queue, testing the native brand rather than the shape.                          |
| `isStoredEntry`      | function | Determines whether a value is a valid stored queue entry — a record holding a string `id`, an `input`, and a nonnegative safe-integer `attempts`. |
"""
new_guards = """### Guards

In a guard table a `Shape` cell holds the type the guard narrows to.

| API | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `isQueueError` | function | `QueueError` | Determines whether an unknown value is a `QueueError`, staying total for a hostile value. |
| `isQueueConcurrency` | function | `number` | Determines whether a value is a valid queue concurrency — a positive safe integer. |
| `isQueueRetries` | function | `number` | Determines whether a value is a valid queue retry count — a nonnegative safe integer. |
| `isQueueTimeout` | function | `number` | Determines whether a value is a valid queue timeout — an integer count of milliseconds inside the native timer range. |
| `isQueueSignal` | function | `AbortSignal` | Determines whether a value is a native abort signal usable by the queue, testing the native brand rather than the shape. |
| `isStoredEntry` | function | `StoredEntry<unknown>` | Determines whether a value is a valid stored queue entry — a record holding a string `id`, an `input`, and a nonnegative safe-integer `attempts`. |
"""
sub1(old_guards, new_guards, 'guards table')

# --- Item 5: a lead-in before the guards fence ---
sub1("""| `isStoredEntry` | function | `StoredEntry<unknown>` | Determines whether a value is a valid stored queue entry — a record holding a string `id`, an `input`, and a nonnegative safe-integer `attempts`. |

```ts
import {
""", """| `isStoredEntry` | function | `StoredEntry<unknown>` | Determines whether a value is a valid stored queue entry — a record holding a string `id`, an `input`, and a nonnegative safe-integer `attempts`. |

Call each guard on a sample value to see what it accepts and what it refuses:

```ts
import {
""", 'guards fence lead-in')

# --- Item 5: a lead-in before the helpers fence ---
sub1("""and the refused value when the guard refuses it. |

```ts
import { isQueueRetries, readOption, validateOption } from '@orkestrel/queue'
""", """and the refused value when the guard refuses it. |

Read one entry option, then validate what you read — the pair `enqueue` runs for every option a caller supplies:

```ts
import { isQueueRetries, readOption, validateOption } from '@orkestrel/queue'
""", 'helpers fence lead-in')

# --- Item 3: one convention, one home ---
sub1("`QueueInterface`'s readonly data members stay here, in its `Shape` cell, rather than under [Methods](#methods), and `emitter` is the typed push observation surface described under [Observing](#observing).",
     "The `emitter`, `count`, `active`, `paused`, and `stopped` members of `QueueInterface` are `readonly` data members (Surface rows, earlier) — its call-signature methods are documented under [Methods](#methods).",
     'convention sentence')

sub1("The public methods of `QueueInterface` and `QueueStoreInterface` — every call-signature member listed (their `readonly` data members stay Surface rows). Each class",
     "The public methods of `QueueInterface` and `QueueStoreInterface` — every call-signature member listed. Each class",
     'methods preamble parenthetical')

# --- Item 5: the Patterns fence lead-ins ---
leadins = [
    ("### Create a queue", "Build a queue over a handler and await the promise each `enqueue` hands back — the ordered default first, then a bounded, retried, time-boxed one:"),
    ("### Bounded concurrency", "Set `concurrency` to cap how many entries run at once; every later enqueue waits for a slot to free up:"),
    ("### Retries", "Set `retries` for the queue default, and override it on the one entry that must not be re-run:"),
    ("### Per-attempt timeout", "Set `timeout` to bound each attempt; a deadline that fires counts as a failed attempt:"),
    ("### Abort", "Call `abort` to reject pending work and fire every in-flight handler's `signal`:"),
    ("### Lifecycle", "Call `pause`, `resume`, `clear`, `stop`, `start`, and `destroy` to suspend, drain, and wind down a running queue:"),
]
for heading, sentence in leadins:
    sub1(f"{heading}\n\n```ts", f"{heading}\n\n{sentence}\n\n```ts", f'lead-in {heading}')

p.write_text(t, encoding='utf-8')
print('guide edits applied; bytes', len(orig), '->', len(t))
