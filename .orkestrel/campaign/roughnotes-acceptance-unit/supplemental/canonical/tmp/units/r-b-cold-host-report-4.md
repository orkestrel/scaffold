# R-B cold-host contained-cache correction

The cache comparator resolves each path with `node:path` and uses `relative` to accept the requested root or a descendant. It refuses a sibling, a prefix sibling, a parent, and a path on another volume.

The observer now records the requested root and resolved Vitest child in each active marker. The runner retains that child in `ACTUAL_CACHE` and retains physical cache files found under the requested root.

Scoped validation passed: PowerShell parsed `run-r-b-cold-host-2.ps1`; TypeScript checked `cache-paths.ts` and `journey-cold-2.config.ts`; synchronous cache controls accepted slash variation and a Vitest child, then refused sibling, prefix-sibling, parent, and different-volume paths.

Run the parent-owned control from canonical Scaffold:

```powershell
powershell.exe -NoProfile -File tmp/probe/run-r-b-cold-host-2.ps1
```

No Vitest or browser runtime control ran while authoring this correction.
