# Guide release-order constraint

The source Guide manifest declares version 0.0.18 and runtime ranges
@orkestrel/contract ^0.0.16 and @orkestrel/markdown ^0.0.13. Contract's clean reconciled
source declares 0.0.17. Markdown's inspected source manifest declares 0.0.14. These
are candidate unpublished versions, not accepted artifacts or new bumps by this reading.

Root queried the public registry through the absolute Node and npm CLI entries with
an explicit --registry=https://registry.npmjs.org/ argument. The Guide and Markdown
queries exited 0. Guide latest was 0.0.17; Markdown latest was 0.0.13. The returned
version lists did not contain their inspected source versions. Root's prior Contract
reading likewise found registry 0.0.16, below source 0.0.17. The host time after these
readings was 2026-09-08 18:12:54 UTC.

The user requires final dependency pins to use the accepted latest package versions.
If Contract 0.0.17 and Markdown 0.0.14 remain the accepted candidates, Guide must target
those versions. Publishing that Guide artifact before its runtime dependencies become
available would leave its new dependency ranges unresolved at the registry. The old
guide-first release sequence therefore cannot be frozen unchanged alongside that
alignment requirement.

Keep local dependency-first preparation moving. Keep all publication unapproved.
Ask the owner whether the release sequence may follow dependency order in place of
the old guide-first sequence, while preserving Ruling 8's requirement that the fleet
has closed on main before publication. This is a release-order decision, not permission
to publish, install into primary scaffold, or alter credentials.

## Commands and raw registry readings

Node entry: C:/Users/mikes/scoop/apps/nodejs-lts/current/node.exe
npm entry: C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js

Arguments for Guide:

```text
view @orkestrel/guide name version dist-tags versions dependencies peerDependencies peerDependenciesMeta optionalDependencies --registry=https://registry.npmjs.org/ --json
```

```json
{
  "name": "@orkestrel/guide",
  "version": "0.0.17",
  "dist-tags": { "latest": "0.0.17" },
  "versions": ["0.0.1", "0.0.2", "0.0.3", "0.0.4", "0.0.5", "0.0.6", "0.0.7", "0.0.8", "0.0.9", "0.0.10", "0.0.11", "0.0.12", "0.0.13", "0.0.14", "0.0.15", "0.0.16", "0.0.17"],
  "dependencies": { "@orkestrel/contract": "^0.0.16", "@orkestrel/markdown": "^0.0.13" }
}
```

Arguments for Markdown:

```text
view @orkestrel/markdown name version dist-tags versions dependencies peerDependencies peerDependenciesMeta optionalDependencies --registry=https://registry.npmjs.org/ --json
```

```json
{
  "name": "@orkestrel/markdown",
  "version": "0.0.13",
  "dist-tags": { "latest": "0.0.13" },
  "versions": ["0.0.1", "0.0.2", "0.0.3", "0.0.4", "0.0.5", "0.0.6", "0.0.7", "0.0.8", "0.0.9", "0.0.10", "0.0.11", "0.0.12", "0.0.13"],
  "dependencies": { "@orkestrel/contract": "^0.0.16", "@orkestrel/html": "^0.0.8" }
}
```

The JSON above preserves the returned values with normalized whitespace. Absent
queried fields remain absent. This is not a raw HTTP packument or status reading.
