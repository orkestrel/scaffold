# Roughnotes registry capture retention report

The retention successor is ready for the root-owned copy after the registry gate run finishes. Root must run:

```powershell
& C:\Users\mikes\WebstormProjects\scaffold\tmp\probe\retain-roughnotes-registry-capture.ps1
```

The successor keeps the fixed recovery capture sources and writes only to `tmp/capture-retained/roughnotes-registry-final-capture`. Before it creates that destination, it resolves the canonical gate output and requires `terminal.json` with `success: true`, plus `test-journey.json` with exit `0`, null signal, and `capture: true`. It copies the journey stdout, stderr, journey record, and terminal record into the portfolio. The README derives start, end, and elapsed time from the copied journey record and omits a parsed passed count.

PowerShell parser validation passed. The actual predecessor/successor diff is [successor.diff.patch](roughnotes-registry-capture-retention-evidence/successor.diff.patch). The predecessor copy and scoped status are retained in `tmp/units/roughnotes-registry-capture-retention-evidence/`.

The preflight did not run. The registry gate process owns mutable output while it runs, and this unit did not read, copy, or change that output. Root owns the later copy and final portfolio evidence.
