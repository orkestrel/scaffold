# Ledger: the contract 0.0.26 and scaffold 0.0.139 wave

| Date | Unit | Role | Carrier |
| --- | --- | --- | --- |
| 2026-11-17 | Make contract 0.0.25's helper adoptions during the wave, at each visit `ROADMAP.md` item 187 names | user | `plan.md` § Standing rulings |
| 2026-11-17 | Keep taverna out of this wave and leave veneer's adoption to its own session after the wave; the wave takes the host lane first | user | `plan.md` § Deferrals |
| 2026-11-17 | Adopt contract 0.0.25's helpers in abort, budget, timeout, indexeddb, and test | `builder` (Claude Sonnet 5.5) | abort `099a390`, budget `eeecc25`, timeout `b5787fb`, test `ac9f20d`; indexeddb found no site |
| 2026-11-17 | Review the abort, budget, and timeout adoptions | `reviewer` (Claude Opus 5.5) | accepted |
| 2026-11-17 | Review test's adoption | `reviewer` (Claude Opus 5.5) | repaired: `Teardown`, `Loopback`, and four journey sites keep their committed code |
| 2026-11-17 | Adopt contract 0.0.25's helpers in database, process, router, and server | `builder` (Claude Sonnet 5.5) | database `30117f4`, process `b875e16`, router `9d72177`, server `83e9008` |
| 2026-11-17 | Review the database, process, router, and server adoptions | `reviewer` (Claude Opus 5.5) | repaired: database TSDoc, router `Navigator#judge` kept, server's timeout relation and its assertions |
| 2026-11-17 | Adopt contract 0.0.25's helpers in capture, relation, middleware, and browser; make guide's table rewrite formatter-stable; move mcp onto server 0.0.29 | `builder` (Claude Sonnet 5.5) | in flight |
