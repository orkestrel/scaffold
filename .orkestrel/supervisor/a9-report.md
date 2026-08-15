# A9 report (Opus implementer, returned complete; landed at 654e487 with guide integration)

Touched: types.ts (TranscriptSummary: event + optional note), parsers.ts (parseTranscript
pure leaf, one rule: record naming non-empty type; label = type [+ subtype]; note = first
of result/text/item.text/message.content[].text, bounded via describeValue),
FeedItem.vue (native details/summary, aria-expanded mirrored from the UA toggle event for
the tree describer, entry.text disclosed byte-for-byte), parsers.test.ts (new, 10 tests on
real captured frames), FeedItem tests (+3 incl. keyboard-only), portfolio (disclosed state).
6 modified + 1 new, +275/-3 + 123 lines.

Measured ground (capture.mjs via built server SSE): agent/ollama lane emits ZERO transcript
frames (register fed only by WorkspaceProviderExecutor; AgentExecutor installs no transcript
handler); claude 8, codex 5 (incl. one non-JSON stderr chunk), cursor 6. Fixtures are
verbatim captured lines held as inert data; the 22k-unit claude frame stays in
tmp/a9/frames-claude.jsonl with its shape covered by the cursor system-init frame.

Proofs: red (missing export + 2 disclosure fails) -> green; byte-equality assertion on the
disclosed text; keyboard-only Tab+Enter proof with collapsed->expanded->collapsed tree
states; app:browser 494/494 (480→494); check green; scoped fmt/lint clean. Parity measured
red on exactly TranscriptSummary + parseTranscript; four-part guide patch (applied verbatim
in integration via tmp/a9/guide.patch.json anchors) -> 374/374. describeValue's guide row
re-worded (it now bounds provider fragments too).

Ancillary calls recorded: native details over custom button; no function-type alias for the
parser (no consumer seam); describeValue reused rather than a second bound; register-stamp
comment left as the general rule with the fold's own comment on the element.

Deviations: none stopping the unit; the ollama-lane surprise reported, not stopped on.
