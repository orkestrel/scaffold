# Prune preservation receipt

The archive is retained under `raw/`. `manifest.json` maps every retained source to its copy and records source entries that were absent when the inventory was read.

The retained payload measures 332309765 bytes. The scoped SHA-256 sweep found every retained copy equal to its manifest hash.

The external inventory copies retain these hashes:

| Record | SHA-256 |
| --- | --- |
| `inventories/scaffold-files.txt` | `CF2DBE05E271D9CAC87B826971293EE90CADB11C6B215401A2E406B82FA9B716` |
| `inventories/roughnotes-files.txt` | `BE44401AA6C0F567D28AF5903545C49FE2B90EA1A50936E5C7ADF616FE99373C` |
| `brief-source.md` | `DEFCCAACB15A71908B94A18BF233BD8F2E22D8F5234CF04C5A2BDBE5032470A2` |
| `raw/.orkestrel/campaign/rebaseline-2.md` | `023E7615CA0651C9EE0F1A9734F963037B86BD2F2F72BFAB56DA9614D3CFF1C8` |

The audit worktree records retain `HEAD` `dc98373d5872d7a1d4a4337e2bce64be0ab70097`. Their staged patches are empty. Their unstaged patch hashes are:

| Worktree | SHA-256 |
| --- | --- |
| `setup-vue-control` | `CAB00B4A342EFE81A69F1ACE6F67C625191FD6019CAC17AE4C5969609A3300F2` |
| `setup-vue-objective` | `36548CA8EF7A616F5A5A6EAB7F41EDED2EF52701709CF7A2F2318C1FAC5E2331` |
| `setup-vue-subjective` | `36548CA8EF7A616F5A5A6EAB7F41EDED2EF52701709CF7A2F2318C1FAC5E2331` |

## Staging result

Canonical `.orkestrel` was not staged. The required exclusion scan found media under `.orkestrel/campaign/recovery-evidence/r-b-cold/` and a nested dependency cache under `.orkestrel/campaign/s1-3-instruments/s1-wrapper/node_modules/`. The brief requires a stop in this condition rather than deleting those paths.

No product, dependency, user configuration, or original campaign record was changed by this unit.
