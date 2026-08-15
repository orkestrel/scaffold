1. **CONFIRMED** — Reverse-arrival and wire-order attacks fail: rows sort by `created`, then deterministic string-id order. The test pins both tie arrival orders to `alpha, zulu`, while the comment honestly permits same-millisecond movement.

2. **CONFIRMED** — Live, departed, and departed-current combinations hold. Departed badges use centralized `ENDED_TONE`; the higher-priority current-row branch preserves the open-row override, and adjacent live badges retain their status tone.

3. **CONFIRMED** — With no snapshot, only the alert contains “Updates stopped”; the status line says “No runs are listed.” With a retained snapshot, the partial-state announcement logic is unchanged.

4. **CONFIRMED** — The keyboard path begins at `document.body`, performs one Tab, asserts focus on the row, then presses Enter; no direct focus call conceals reachability. The targeted OpenPanel path waits on stack-row convergence through the reactive watcher, with no timer.

5. **CONFIRMED** — `advertised` tracks the manager’s reactive snapshot, covering frames present before or delivered after mounting. For a running attempt whose uniquely registered executor holds commands, no additional branch disables those controls. Against the parent code, the new proof plausibly fails twice: the one-shot `BARE` copy stays stale after delivery, and the private `roster` read is recorded; both defects disappear in this diff.

VERDICT: PASS — 5 of 5 confirmed, no findings outside the claims