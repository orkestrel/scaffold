# Missing class-member reading

Root ran the source-backed vector against canonical Guide's built output.

```text
node --experimental-strip-types C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/inspect-parity-class-population.mjs
```

The command exited 0 (terminal 6b13dd). The documented interface declares open and
render. The class declares render, so the retained scaffold nonempty-members guard
applies. The extracted methods report remains empty despite the absent class open
member. The prior scaffold source-surface loop compared the class and its named
interface exactly. Guide's prior documented-group loop rejected class extras only.
Keep these assertion populations independently selectable in the correction.

```json
{
  "contract": ["open", "render"],
  "implementation": ["render"],
  "methods": []
}
```

The instrument asserts that the reflected class is nonempty and differs from its
contract before checking the empty report. Removing its last method would fall
outside the prior assertion's population and would not prove this regression.
This reading does not certify the correction or claim a Probe receipt.
