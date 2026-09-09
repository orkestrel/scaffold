Msg's authored native adoption survives review. Earlier reports remain unchanged.

| Claim | Verdict | Evidence |
|---|---|---|
| Native-safe entry | Survives | [guides.test.ts](C:/Users/mikes/WebstormProjects/msg/tests/guides.test.ts:5) retains only native-safe runtime imports at module scope. Source, fixture setup, and Vitest registration load inside the direct `execute` callback. |
| No duplicate engine | Survives | [GuideCommand composition](C:/Users/mikes/WebstormProjects/msg/tests/guides.test.ts:32) replaces local inventory assembly, parsing, and generic comparison loops. Retained helpers implement package-owned surface policy. |
| Generic parity and population guards | Survives | [Population checks](C:/Users/mikes/WebstormProjects/msg/tests/guides.test.ts:84) retain the required Msg row, nonempty inventory population, shared example title, and pitch checks. Per-row assertions retain fence, method, drift, function-example, method-example, import, link, and test findings. |
| INTERNAL and source surfaces | Survives | [Surface assertions](C:/Users/mikes/WebstormProjects/msg/tests/guides.test.ts:129) preserve direct/barrel comparisons, documented/barrel comparisons, INTERNAL anti-staleness, and hidden-declaration rejection. |
| Fixtures and flagship transcriptions | Survives | [Flagship cases](C:/Users/mikes/WebstormProjects/msg/tests/guides.test.ts:199) retain the baseline expressions, arguments, and expected values. The MSGError source-presence guard remains. `createMSG(readFixture('test.msg'))`, attachment access, and burn validation remain intact. The unchanged [fixture reader](C:/Users/mikes/WebstormProjects/msg/tests/setupServer.ts:48) reads real binary data. |
| Authored-file scope | Survives | Frozen diff and before/after status identify only `tests/guides.test.ts`. No product source, metadata, guide, configuration, or vendored edits appear. |

I ran `node --experimental-strip-types tests/guides.test.ts` from canonical Msg; it exited `0` and executed the guide tests. Root's retained `prepublishOnly` receipt also records exit `0`; I did not repeat its suite.

Evidence: [frozen diff](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-msg-native-prepublish/diff-before.txt), [root gate output](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-msg-native-prepublish/action.stdout.txt), [root gate exit](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-msg-native-prepublish/action.exit.txt).

VERDICT: PASS; outside the claims: none.
