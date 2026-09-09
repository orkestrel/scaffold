# Root optional fixture integration

Root omitted source from the formatDrift fixture instead of assigning undefined.
The authoritative Drift.source property is optional string. The expected diagnostic
still asserts that the source is absent; no production contract changed.

The preliminary ordered Guide chain stopped at check with TS2379. Its terminal
receipt is 65a060 and the complete diagnostic reading is 22cd89. The retained
evidence is evidence/d7n-guide-parity-leaves-gates. A scoped source project had not
typechecked the test, so its prior green did not settle this claim.

Root formatted the changed test; fcc1e5 exited 0. The final ordered Guide chain
exited 0 in 5b31da. See evidence/d7n-guide-parity-leaves-final-gates for the actual
format:check, lint:check, check, build and test output. Astra and the reused
objective analyst reviewed the omission against the final snapshot. No new
verifier was dispatched.
