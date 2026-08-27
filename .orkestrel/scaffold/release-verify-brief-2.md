# Successor brief: run the release gate chain over the canon correction

Supersedes `tmp/units/release-verify-brief.md`. That brief proved the 0.0.56 artifact at commit
`09d0c03`, and 0.0.56 is published. This run proves the tree that carries the publish-skill
correction, which moved `dist/host` and the committed `host.json` inventory.

Everything in the original brief still binds. What changed:

- The subject is the current working tree of `/home/user/scaffold` on branch
  `claude/scaffold-proposal-impl-nabmm9`, which holds edits to
  `.agents/skills/orkestrel-publish/references/window.md`,
  `.agents/skills/orkestrel-publish/SKILL.md`, and a regenerated `host.json`. The tree is dirty by
  design; do not treat that as a deviation and do not commit it.
- `npm run build` already ran, so `host.json` matches the edited canon files. Run the chain
  anyway, in the manifest's order, because the chain's own build must stay idempotent.
- The `config` project reads the committed inventory against the checkout bytes, and the `guides`
  and `policy` projects read the canon tree. Those are the projects the correction can redden, so
  report their counts explicitly.
- The `distribution` proof under `--mode release` still matters: a 0.0.57 release ships this canon
  surface, so the packed artifact must install and drive a generated workspace as before.

Report exactly what the original brief's Output section names.
