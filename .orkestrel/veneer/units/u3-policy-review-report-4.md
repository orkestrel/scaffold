# U3-policy review round 4 — objective lane (reviewer, native Opus 5, 2026-09-20, 404 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | REFUTED | `tests/policy.test.ts:692` `expect(index).toContain(own)` fails in `roughnotes`, a live target holding the vendored file: its package name is `roughnotes`, `guides/roughnotes.md` does not exist, and its index links only `guide.md` and `scaffold.md`. `:688-689` (`index.length > 0`) is also non-portable: a target whose index links guides only through parent paths, fragments, or reference definitions yields an empty list legitimately. Every other assertion in the touched cases is portable (walked individually). The crafted-root case leaks nothing: `createPolicyScratch` allocates under the system temporary directory, writes only its own index, and destroys it in `finally`. The refuted clause is the brief's, not the builder's. |
| 2 | CONFIRMED | `tests/setupPolicy.ts:377` captures `tokens` from the bare, `./`, double-quoted-title, and angle-bracketed forms and rejects `](nested/tokens.md)`, `](https://x/y.md)`, `](../README.md)`. It newly admits the unbalanced `](<tokens.md)` and `](tokens.md>)`, with no consequence beyond accounting for a malformed link. |
| 3 | CONFIRMED | each row's membership names only what its fixture writes; the code-span row traced through `stripPolicyCode`, `POLICY_SPAN_PATTERN`, and `inspectPolicyProse`; the `accepts` and `sweeps` rows still yield exactly one violation each. |
| 4 | CONFIRMED | mechanism and remarks; `isPolicyMirror` body unchanged; the ruling in both homes; the `rejects` row still discriminates; no forbidden syntax; every new declaration exported and imported; one-sentence descriptions; no banned term outside fixture data. |
| 5 | CONFIRMED | `u` flag alone with a fresh global matcher per call; three non-nested quantifiers each terminated by a literal, so the worst case is polynomial. |

## Findings

6. The pattern excludes a single-quoted title, a parenthesized title, a fragment
   (`](tokens.md#names)` — the form this checkout writes at `guides/README.md:19`), and a
   reference-style definition, all ordinary CommonMark.
7. `POLICY_INDEX_FILE` restates `POLICY_GUIDE_MAP` as a second literal instead of deriving it.
8. `readPolicyIndex`'s remarks omit the span-pairing limit the new code-span row demonstrates: one
   unpaired backtick re-pairs every following span and blanks the links after it.

Verdict: fix round — claim 1.
