**GREEN — successor receipt verification**

- Corrected `stage.ps1` identity is exact: staged blob and unfiltered disk hash are `2564a0f45b410124ed2434c10d5c79d6a2a82e16`, matching `raw-index-identity.json`.
- Full staged identity comparison passes: `identityRecords=421`, `mismatches=0`.
- Retained verifier brief, successor brief, and prior RED report match their external originals byte-for-byte.
- Staged membership has no path outside `stage-targets.txt`; protected canonical paths remain unstaged.
- The prior passed allowlist, exclusion, landing/publication manifest, required-link, and protected-hash checks carry forward.
