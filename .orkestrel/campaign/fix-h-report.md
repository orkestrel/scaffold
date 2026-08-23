# FIX-H report — the peer fixture and the advisory's over-assertion

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/fix-h-brief.md`.

## Finding 1 — the fixture now answers with its own policy

The fixture forwarded the host environment, so a host carrying
`npm_config_legacy_peer_deps=true` made the install the test expects to be **refused** succeed, and
this package's publish gate reddened for a reason unrelated to scaffold.

**Failing first:** `npm_config_legacy_peer_deps=true` against the pre-fix test →
`AssertionError: expected +0 not to be +0`. After the fix, the same command passes.

The unit pinned at the fixture's **shared** environment binding rather than at the refused spawn
alone, so all three installs in that test answer with the test's policy — and that also covers the
opposite host setting, since `npm_config_strict_peer_deps=true` could otherwise have reddened the
accepted graph's success assertion. All three host policies now pass.

It settled the spelling by probing rather than assuming: an npm environment variable outranks every
`.npmrc`, and nothing in the fixture passes the matching flags that would outrank the environment in
turn.

**The killed-child controls, both planted and removed by digest-verified restore.** A child that
SIGKILLs itself now fails `expected 'SIGKILL' to be null`; a harness kill now fails on `ETIMEDOUT`.

**And the rival reading was excluded.** The unit ran the self-killing child against the **pre-fix**
assertion pair: it sailed past `expect(status).not.toBe(0)` and reported only on the substring, with
two empty lines as the received value. That is exactly the shape that cost an earlier round — a
failure carrying no diagnosis — and it is what the new assertions replace.

## Finding 2 — the advisory asks for coverage, not for exports

The predicate decides membership on bytes; the message asserted exports. `indexeddb/tests/setup.ts`
is 423 bytes of comment and an `afterEach` call with zero exports, and it was handed a remedy
demanding a proof of behaviour it does not have.

The message now reads, against that real target:

> carries test setup modules that no proof covers: `tests/setup.ts`, `tests/setupBrowser.ts`. Add
> `tests/setup.test.ts`, `tests/setupBrowser.test.ts`, each covering the module of the same name.

It claims nothing about exports, and the population is unchanged — no `export` token screens it, so
the source-language scan the predicate's comment refuses is not reintroduced.

The new test carries a property assertion beside the literal pin, for a reason worth keeping: a
wording change moves the source and the fixture literal together, so only the property assertion
survives that edit.

## An integration the Orchestrator made, and why

The unit flagged a second environment binding in the same file, built for the packed-scaffold
install test, which inherits the host's resolver policy the same way. Its assertions are successes
rather than a refusal, so `legacy_peer_deps` does not red it; `strict_peer_deps=true` is the
untested direction. The unit correctly placed it outside its findings.

The Orchestrator pinned it. The reasoning: this file **is** the gate that decides publication, the
repair is one line of a shape just proved in the same file, and leaving a known-shaped hazard on the
publish path is worse than the scope discipline that would defer it. Verified by running the whole
proof under `npm_config_strict_peer_deps=true`: 5 passed, exit 0.

## Carried to FIX-I

`guides/scaffold.md:644` says the question lists "packages whose setup **helpers** no proof covers".
That carries the same export-flavoured over-assertion the message just dropped; the predicate's
population is setup **modules**. The neighbouring sentence pairing each module with the proof it
wants survives unchanged.

## Recorded for whoever next writes in this file

`vitest/valid-expect` rejects a bare identifier as `expect`'s message argument and accepts a
template literal, probed directly. That is why the final shape inlines the render template rather
than binding it to a const.
