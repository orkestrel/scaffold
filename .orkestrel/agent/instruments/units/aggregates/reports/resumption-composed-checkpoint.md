# Composed instrument checkpoint

The corrected aggregate harness passed independent verification on Windows on 2026-10-11. Overall scaffold acceptance remains pending its final tests and host-inventory regeneration check. No corrected live model comparison has run.

Native verifier Luna executed the exact emitted test family serially against frozen source, dependencies, workload, and compiler inputs. The run passed 410 of 410 tests across 81 suites, with no failures, skips, cancellations, or todo tests. The test command exited 0 in 953310 ms. The continuous-runtime fixture passed in 447821 ms. These measurements prove instrument behavior with local protocol peers, not model quality.

The canonical harness build, scaffold formatting, lint, type checks, and scaffold build commands each exited 0. The enclosing gate exited 1 uncapped in 994068 ms because scaffold build regenerated host.json; scaffold tests were not reached. The only protected-input change was the digest for the existing branch .gitignore addition and the resulting host-manifest digest. Root retains that generated correction and requires idempotent regeneration before completing the remaining tests. No harness source changed after its passing suite.

The canonical emitted build manifest is SHA-256 `488a17b933ff8aeb07532a36c6794eeded09e3c2f4f433efb0670fda4f87d4ff`. It binds 484 exact inputs and 604 outputs, with canonical workload manifest `bbd37cb0aa16522649d35c052baa25ff569adff50c872768431daa1d3067e741`. The synthetic fixture is absent from that final build.

The fixture repair predeclares uniform service work for development and evaluation and preserves production deadlines. Its separate full writer proof passed in 450130 ms with 32 completed evaluation goals per arm. Disabling wall enforcement broke the permanent refusal assertion in 33416 ms; restoring the exact production bytes restored the passing control in 20944 ms. All 494 recorded production/workload identities remained equal. Earlier failed gates and their raw artifacts remain evidence.

Local evidence is retained under primary scaffold tmp/units: aggregate-resolved-stage-b-final-report.md, SHA-256 `b2ff162e90293982dc0214df9ac2f4c146af47c69750854013bfb5e3332eea87`; aggregate-integrated-resolved-04-emitted-harness-tests.stdout.log, SHA-256 `470b2df3e8a86d0bceadcd6e8d6e2c4f1c6e91d26d903179c3e7de5d55a8c62a`; and aggregate-resolved-stage-b-final-inventory.json, SHA-256 `fc0e1785e9ca808bdeadaf71e5fb662c2d2f6bc6f359b0ef8716c0f957288908`. The verifier read all raw command logs and checked the frozen inventory after the gate. The recorded process tree exited before consolidation began.

The user's directory consolidation changes the active path, not the experiment contract. Source/build identity checks follow relocation before live freezes. Root RESULTS.md will report model outcomes separately from instrument proofs. Publication remains held through the matrix, final continuous comparison, analysis, and adoption verdict.
