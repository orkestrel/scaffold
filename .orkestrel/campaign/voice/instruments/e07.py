# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
apply('/home/user/fleet/terminal/src/core/stores/DatabaseTerminalStore.ts', [
 (" * A {@link TerminalStoreInterface} backed by one table of the `databases` layer — an endpoint's\n",
  " * Implements a {@link TerminalStoreInterface} backed by one table of the `databases` layer — an endpoint's\n"),
 ("\t * Wrap a table as a terminal store.\n", "\t * Wraps a table as a terminal store.\n"),
 ("/** Resolve the persisted snapshot for `id`, narrowing the opaque JSON column back to a `TerminalSnapshot`. */",
  "/** Resolves the persisted snapshot for `id`, narrowing the opaque JSON column back to a `TerminalSnapshot`. */"),
 ("/** Insert or replace under the snapshot's OWN `id` (no separate id param) — the row is `{ id, snapshot }`. */",
  "/** Inserts or replaces under the snapshot's OWN `id` (no separate id param) — the row is `{ id, snapshot }`. */"),
 ("/** Drop a snapshot by id; an absent id is a no-op (no throw). */",
  "/** Drops a snapshot by id; an absent id is a no-op (no throw). */"),
])
apply('/home/user/fleet/terminal/src/core/stores/MemoryTerminalStore.ts', [
 (" * The in-memory {@link TerminalStoreInterface} — a process-lifetime `Map` of\n",
  " * Implements the in-memory {@link TerminalStoreInterface} — a process-lifetime `Map` of\n"),
])
