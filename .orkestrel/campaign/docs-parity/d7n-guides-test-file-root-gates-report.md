# Direct test-file root gates

The corrected entry is implemented directly in canonical scaffold. The test file
owns command handling and explicit authority-driven rewrites; its worker only
reads and asserts. The manifest targets tests/guides.test.ts. The launchers are
absent, and the build regenerated host.json and dist/host without them.

Root's ordered format:check, lint:check, check, build and npm test each returned
exit 0. The carrier terminated with exit 0 in chunk 77307a and confirmed that
the product diff was unchanged by npm test. Manifest bytes and staged manifest
and lock entries survived the chain. Read evidence/d7n-guides-test-file-gates
for the final logs, exit files, source diff, status and baseline identity.

The initial full typecheck exposed optional-value narrowing at replaceFence and
an unused direction parameter. Root narrowed the fence branch explicitly and
used direction in the unresolved-drift explanation. The complete typecheck then
passed in chunk c7cad8. No assertion, suppression or contract deletion was used.

The subsequent full suite exposed an artifact-total expectation that still
included the removed launcher. Root reproduced that failure alone in chunk
d62d4d. The test now checks explicit computed and host path membership and retains
its template-path expectation. Its initial membership comparison exposed group
ordering, so the test compares sorted membership without imposing an unrelated
order. The same named case passed in chunk ac4061. The final chain includes these
root-authored corrections. Failed chains and focused outputs remain retained.

The writer report is immutable. Its scoped check did not establish full test-file
type correctness. Its copied runner statistics are raw run evidence, not prose
conventions. Root's final chain supplies the broader gate evidence. The required
Probe call returned the legacy stream-protocol error and produced no receipt.
No dependency transport correction was attempted in this source unit.

The owner approved root gates instead of a fresh verifier and reuse of the design
analyst. Objective acceptance uses that analyst with its earlier context disclosed.
Independent Opus review runs through the reviewer route, journal
tmp/claude/d7n-guides-test-file-review.jsonl, session
ad489cbb-e4bf-4e69-b22f-4fdd54c09f2f. Its journal advanced into source and evidence
reads. The shared audit brief and launcher are retained. Source stays frozen
pending verdicts.

Approval to include the owner's pending toolchain edits in the product commit
remains unanswered. Preserve the manifest and staged lock. This reading claims
no corrected scaffold tarball, Guide adoption, fleet propagation, product source
commit, publication or completed fleet release.
