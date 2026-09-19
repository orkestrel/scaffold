GATE REPORT — RED (historical baseline hash record incomplete)

- Archive binding: `metadata.json`, candidate `HEAD`, and `git cat-file -e c64f7872…^{commit}` resolve `c64f7872d82a1718e722b8cb6a72af5f97506b58`; each command exited `0`.

- Archive integrity: Node byte inspection exited `0`.
  - Bytes: `2506479`, matching metadata and npm pack `size`.
  - SHA-256: `6ECEBB520CCD067E48E724FDE14AC5B41E8410C8DD638F80B3059A682750612B`, matching metadata.
  - SHA-512/integrity: `sha512-PEcCza8w+5lQqnZX0AP8QhCV3msFOf0JeBz0fwhvu4LP230avF14HuIUWPUkWCIxd1YxaYNM4pdgEFmqwWFi8A==`, matching metadata and npm pack.

- Manifest and inventory: native `tar -tzf` inspection exited `0`; manifest has `193` entries, every entry is rooted at `package/`, and it exactly matches npm’s `files` inventory. Credential-pattern matches: `[]`. `package.json` and `archive-entries.txt` match their retained byte records. Retained tar and npm stderr files are empty.

- Byte comparisons: each exited `0` and matched the candidate checkout:
  - `dist/host/guides/scaffold.md`
  - journey `SKILL.md` and `references/captures.md`
  - server `index.js`, `index.cjs`, `index.d.ts`, and `index.d.cts`
  - Each SHA-256 matches `metadata.json`.

- Candidate source: tracked worktree and index are clean (`git diff --quiet` and `git diff --cached --quiet`: exit `0`). The candidate has untracked `.orkestrel/campaign/capture-recipe-unit/` retention artifacts; this does not alter tracked source cleanliness.

- Historical archives:
  - `refreshed-pack/orkestrel-scaffold-0.0.75.tgz` hashes match its retained metadata: SHA-256 `3FEB4860C55C64BB1136FA366757B99CD0F34C169D842E46C46A9BF53787A9A3`; SHA-512 `sha512-m1UczQpWOFN/3ulUZ9lHTnn3a7CPZvDin5YVoq3sfMuj/iw2i4U8QrZnBArVF09itJRTUi/QOmnB58b6+QE15A==`.
  - `baseline/orkestrel-scaffold-0.0.72.tgz` exists and hashes to SHA-256 `CA3783FC0AB1080A0CE11B57E3DD8E5AE38A3091337AD3D7ADA59F1D44EF53E8`; SHA-512 `sha512-iZ6VvG2jXzebTblsiH479wTHS03IMvT+vRGagNBcpi3ONH4pbvIdZtvcGA4mSY0s0e585zOJnjGBrRVD0Wvzzg==`. Its retained `pack.log.txt` records only an abbreviated integrity value, and the full digest was not found in the designated retention/release evidence. Historical baseline hash retention is therefore unproven.

- Anomaly: an initial read-only extraction targeted `package/guides/scaffold.md` and exited `1` with `Not found in archive`. The archive location is `package/dist/host/guides/scaffold.md`; the corrected byte comparison passed. No writes, pack reruns, gates, or source review occurred.
