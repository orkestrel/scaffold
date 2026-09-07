```text
- SHOULD still accept from an older peer.
+ `SHOULD` still accept from an older peer.
- revision says a server SHOULD carry its identity in a result's `_meta`
+ revision says a server `SHOULD` carry its identity in a result's `_meta`
- they check the CALENDAR, not just the shape:
+ they check the CALENDAR, not the shape alone:
- a `Mcp-Param-*` `HeaderMismatch` — a declared SHOULD
+ a `Mcp-Param-*` `HeaderMismatch` — a declared `SHOULD`
- says a client receiving `HeaderMismatch` SHOULD re-list and retry
+ says a client receiving `HeaderMismatch` `SHOULD` re-list and retry
- is refused, not re-requested — a declared SHOULD departure.**
+ is refused, not re-requested — a declared `SHOULD` departure.**
- finds requested information missing on a retry SHOULD answer a
+ finds requested information missing on a retry `SHOULD` answer a
- carrier it just declined to trust,
+ carrier it declined to trust,
- scenarios check a SHOULD, so a refusal reports WARNING
+ scenarios check a `SHOULD`, so a refusal reports WARNING
- signal-first, not stdin-first — a declared SHOULD
+ signal-first, not stdin-first — a declared `SHOULD`
- The stdio page says a client SHOULD close the child's
+ The stdio page says a client `SHOULD` close the child's
- server SHOULD send the EMPTY `subscriptions/listen` result
+ server `SHOULD` send the EMPTY `subscriptions/listen` result
- the pre-`2026-07-28` spelling a client SHOULD
+ the pre-`2026-07-28` spelling a client `SHOULD`
```
