# Probe P15 — an armed AbortSignal.timeout and the process lifetime (Orchestrator, 2026-09-15; A13e reviewer R2)

Instrument: `P15-timer-probe.mjs.txt`, run with Node v24.20.0 on the host from the ollama checkout. A 60 000 ms `AbortSignal.timeout` was armed, a race it served was won at once, and the process was left to exit on its own.

Reading: `{"raced":"won","exitedAfterMs":0,"aborted":false}` — the process exited immediately with the timer still armed. The timer is unref'd, as Node documents; an armed deadline signal holds neither a Vitest worker nor the process. Ruling carried to U13h: nothing is cleared; state the fact in the TSDoc.
