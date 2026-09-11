# Carry the upper-layer root action runner

Act as the mechanical builder. Read AGENTS.md, orchestration, portability,
writing and quality rules, the publish skill and wave reference, and
guides/scaffold.md catalog section. Work only in tmp/pass/upper-layer-action.sh.
You are not alone; preserve other work. Spawn nothing. Use apply_patch. Do not
run actions, install, authenticate, publish, read secrets, or change Git refs.

Make an exact successor of tmp/pass/next-layer-action.sh. Replace its package
exclusion guard with the inclusion set from tmp/pass/read-upper-layer.sh. For
scaffold accept only the catalog action; reject other actions before creating
receipts. For scaffold catalog select node dist/bin/main.js catalog. Preserve
the existing command selection for all other accepted packages and preserve
every cap, canonical-path, manifest, snapshot and actual-exit behavior.

Run bash -n only and return the actual syntax exit and exact predecessor diff.
This is a root command runner, not permission to change package source. Stop on
any required deviation. Root reads and executes it after the scout finishes.
