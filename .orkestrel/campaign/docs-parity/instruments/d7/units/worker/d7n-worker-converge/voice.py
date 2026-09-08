"""Applies the exact all-caps-emphasis and count corrections in guides/worker.md.

Each pair is asserted present exactly once before it is applied, so a miss stops the run
rather than writing a partial sweep.
"""

import pathlib
import sys

PATH = pathlib.Path("guides/worker.md")

PAIRS = [
    ("1. **DOC ↔ SOURCE bijection.**", "1. **Doc ↔ source bijection.**"),
    ("a handler that IGNORES its", "a handler that ignores its"),
    ("and every event sits strictly AFTER the relevant", "and every event sits strictly after the relevant"),
    ("so a buggy observer can NEVER corrupt the queue or pool", "so a buggy observer can never corrupt the queue or pool"),
    ("4. **DOC ↔ SOURCE method bijection.**", "4. **Doc ↔ source method bijection.**"),
    ("It does NOT reimplement concurrency", "It does not reimplement concurrency"),
    ("Both generics\n   INFER from the `input` / `result` guards, so a call site needs no type argument. The\n   structured-clone boundary is crossed with ZERO `as`:",
     "`TInput` and\n   `TResult` infer from the `input` and `result` guards, so a call site needs no type\n   argument. The structured-clone boundary is crossed with no `as`:"),
    ("6. **Abort TERMINATES + evicts the thread without losing its cause.**", "6. **Abort terminates and evicts the thread without losing its cause.**"),
    ("7. **A thread death settles its job under EVERY event ordering", "7. **A thread death settles its job under every event ordering"),
    ("flip `alive = false`\n   AND latch the first terminal event", "flip `alive = false`\n   and latch the first terminal event"),
    ("aggregates two failures in that order", "aggregates the queue's failure and the pool's in that order"),
    ("module MUST call `serveWorker`", "module must call `serveWorker`"),
    ("the pooled resource is a worker THREAD, and", "the pooled resource is a worker thread, and"),
    ("reply value. Both generics infer from these, so call sites pass no type arguments:",
     "reply value. `TInput` and `TResult` infer from these, so call sites pass no type arguments:"),
    ("handler on the SAME event loop", "handler on the same event loop"),
    ("entries persist ACROSS store instances on", "entries persist across store instances on"),
    ("over REAL worker threads (no mocking)", "over real worker threads (no mocking)"),
    ("the concurrency cap AND the live-thread cap", "the concurrency cap and the live-thread cap"),
    ("rejecting AND terminating the uncooperative thread", "rejecting and terminating the uncooperative thread"),
    ("exit-code message; both terminal paths evicting their thread", "exit-code message; each terminal path evicting its thread"),
    ("driven MANUALLY over a raw", "driven manually over a raw"),
    ("(SYNC and ASYNC\n  rejections both reported", "(a synchronous throw and an\n  asynchronous rejection both reported"),
    ("then `handler` once across two real jobs", "then `handler` once across successive real jobs"),
]

text = PATH.read_text(encoding="utf8")
for old, new in PAIRS:
    if text.count(old) != 1:
        sys.stdout.write(f"MISS {text.count(old)}: {old!r}\n")
        raise SystemExit(1)
    text = text.replace(old, new)
PATH.write_text(text, encoding="utf8")
sys.stdout.write(f"applied {len(PAIRS)} pairs\n")
