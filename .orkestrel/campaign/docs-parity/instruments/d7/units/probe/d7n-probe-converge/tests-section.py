PATH = 'guides/probe.md'
OLD = """- [`guides.test.ts`](../tests/guides.test.ts) — this guide's parity directions, the claim
  literal shared with the `Claim` contract, what `verdict.digest` covers, and the flagship claim run
  for its receipt.
"""
NEW = """- [`guides.test.ts`](../tests/guides.test.ts) — this guide's parity directions, and the equality
  gate: every `Summary` cell against its declaration's description paragraph, the titled `The claim
  that earns a receipt` fence against the `@example` block of that title (pinned so the titled pair
  cannot be retired silently), and the README pitch against this guide's tagline. It also runs the
  flagship fences and asserts what they claim: the claim literal shared with the `Claim` contract,
  the constants at the values they publish, the failure table against the tuples the package
  declares, what `verdict.digest` covers, and the flagship claim run for its receipt.
"""
text = open(PATH).read()
assert text.count(OLD) == 1
open(PATH, 'w').write(text.replace(OLD, NEW, 1))
print('ok')
