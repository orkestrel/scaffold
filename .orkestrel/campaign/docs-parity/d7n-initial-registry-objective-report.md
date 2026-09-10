I held the objective registry-closure lane. Every fixed claim is confirmed.

- **Registry artifact identity — CONFIRMED.** Each downloaded tarball matches the packument’s SHA-1 `shasum` and SHA-512 `integrity`. Its SHA-256 digest also matches the accepted prepared archive byte-for-byte. See [aggregate registry result](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-initial-registry-confirm-final/result.json).

| Package | Registry version | Accepted and downloaded SHA-256 |
|---|---:|---|
| `@orkestrel/contract` | `0.0.17` | `5e2d3ad7b2bb093df0e09d8a8a38ec2cf20bd7a77e0ef3358866d6f6bf38c515` |
| `@orkestrel/codec` | `0.0.3` | `d3c3ecd30327da12925fb9baa11a4394f537cc403ae0ab136ce315d5303fc895` |
| `@orkestrel/msg` | `0.0.10` | `adeb728dd1bf1331a83aeee7e94568c1d024be4867e7a8807f33a319946ff349` |
| `@orkestrel/sse` | `0.0.7` | `22e9c0069cd89eb7f06729b7573e0b1735c0741003da632542ef2edca59bb17b` |
| `@orkestrel/test` | `0.0.14` | `874c138731367d17c68abd8bef64bfb6fd3a6a8a5f7d1d0fb45746d506623a0f` |

- **Registry versions — CONFIRMED.** The fresh packuments report those versions as the package version and `dist-tags.latest`. Their registry reads exited `0`. See [published registry readings](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-initial-published-reading).

- **Canonical repository state — CONFIRMED.** Each checkout reports branch `main`, an empty porcelain status, successful fetch and ancestry receipts, and identical local HEAD and `origin/main`. Each packument’s `gitHead` matches that checkout’s accepted release commit.

- **Agent authentication and upload boundary — CONFIRMED within recorded scope.** The confirmation carrier only downloads validated public registry URLs and performs read-only Git commands. It contains no login, credential read, or upload operation. The campaign record attributes the completed upload to the owner and records that root did not authenticate or publish. Registry metadata cannot independently identify which human or process performed an upload; that attribution remains a process-record limit.

- **Retained prepublish evidence — CONFIRMED.** The registry serves the exact accepted archive bytes. The accepted preparation tied those archives to successful canonical `prepublishOnly`, pack, and rebuilt-distribution comparisons. Artifact identity therefore carries those receipts to the published packages without another gate run. See [initial layer preparation](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-initial-layer-prepared.md) and [direct prepublish report](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-initial-direct-prepublish-report.md).

Evidence limits: the registry and Git readings are point-in-time observations from `2026-09-10`. They do not establish future registry availability or later repository state. This closure covers only the named initial publication layer.

RELEASE: LANDED
