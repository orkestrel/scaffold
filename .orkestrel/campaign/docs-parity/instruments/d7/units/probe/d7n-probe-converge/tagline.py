TAGLINE = """> The claim prover for the `@orkestrel` line: an instrument that runs a claim's case and its
> negative control through the workspace's own TypeScript, Oxlint, and Vitest, and returns a
> `Verdict` carrying every issue — and a `receipt` when the case ran clean and the control broke
> where it said it would.
"""

guide = open('guides/probe.md').read()
lines = guide.split('\n')
# The head runs from the H1 to the line before `## Surface`.
end = lines.index('## Surface')
head = """# Probe

""" + TAGLINE + """
A `Claim`, a `Verdict`, and a `receipt` carry the package. A `Claim` is the question: a case, a
control that must break, and the TypeScript project both are judged under. A `Verdict` is the
answer: one `Check` per stage in each phase, the case and the control. A `receipt` is the verdict's
one-line summary of the conditions it was reached under, and it exists only when the claim proved
itself.

The type stage runs the workspace's own compiler over a mirror of the tree, and the lint and runtime
stages hold resident Oxlint and Vitest engines. Source: [`src/core`](../src/core),
[`src/server`](../src/server), [`src/bin`](../src/bin). Published through `@orkestrel/probe` and
`@orkestrel/probe/server`.

**An agent is the caller this exists for.** Deciding whether an edit compiles by reasoning about it
costs more than asking, and the answer is a guess.

**Mechanism, not policy.** probe reports evidence and mints a receipt under stated conditions. It
holds no key, signs nothing, and compels nothing. It also **executes caller-supplied test code with
the privileges of the process that hosts it**, so give a probe a workspace and a caller you already
trust with a shell.

"""
open('guides/probe.md', 'w').write(head + '\n'.join(lines[end:]))

readme = open('README.md').read()
rlines = readme.split('\n')
rend = rlines.index('## Install')
rhead = """# @orkestrel/probe

""" + TAGLINE + """
A claim carries a `case` — the edit you believe is correct — and a `control`, the same edit
deliberately broken, naming the stage it must fail at. The `receipt` a proven claim earns is a
one-line token naming the claim, the stage, the tool versions, and the TypeScript project that
judged the candidates.

Read [`guides/probe.md`](guides/probe.md) before you make a claim. It states the prerequisites, the
receipt's verification method and its limits, and what a receipt does not vouch for.

"""
open('README.md', 'w').write(rhead + '\n'.join(rlines[rend:]))
print('ok')
