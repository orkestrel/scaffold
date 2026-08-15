# A9 audit + fix + re-verification — Sol both rounds

Round 1 (session 01a0074e-1364-79c0-ba19-a442ef8d4f0d, range 2d68a77..654e487):
AUDIT: FAIL 2,3,5 — six confirmed (incl. claim 1: the parser executed over every captured
fixture frame produced the expected labels; only the codex stderr chunk fell to undefined).
Refuted: (2) byte-equality fixture invariant under trim and re-encode; (3) regression pin
asserted substrings; (5) mirrored aria-expanded lags native open by a render.

Fix round f4f53f1 (Orchestrator serial integration): mirror DELETED — native summary
exposes expansion; tree describer reads details.open when no aria-expanded exists (ARIA
keeps precedence for real widgets); biting byte fixture (altered by both rewrites, strict);
exact class/clock pins; guide one-copy sentence.

Round 2 (session 01a0075e-2b66-7db1-abc0-5ddb9830674d): REVERIFY: FAIL 3 — 2 and 5 closed
(one copy of the expanded state; describer and native cannot disagree; no describer
regression for aria-expanded widgets), 3 held on a residual: the pin trimmed and its
fixture was trim-invariant.

Residual b6737f7: fixture is the captured chunk with its trailing newline, node asserted
untrimmed. Mutation probe run and recorded: entry.text.trim() in the fallback fails the
pin (1 failed), restored passes. Closed on the auditor's own prescription applied verbatim
plus the mechanical binding; no third bench round spent on a two-line test tightening.

A9 chain: 654e487 (unit + guide) → f4f53f1 (fix round) → b6737f7 (residual + probe).
app:browser 495/495, parity 374/374, check green throughout. A9 ACCEPTED. Exit item 8
closed; the disclosed portfolio state joins the 6-9 evidence set.
