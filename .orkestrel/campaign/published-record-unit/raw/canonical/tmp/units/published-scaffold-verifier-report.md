GATE REPORT — GREEN

- Archive hashes: direct Node inspection exited `0`.
  - Prepared: `2506479` bytes; SHA-256 `6ECEBB520CCD067E48E724FDE14AC5B41E8410C8DD638F80B3059A682750612B`; integrity `sha512-PEcCza8w+5lQqnZX0AP8QhCV3msFOf0JeBz0fwhvu4LP230avF14HuIUWPUkWCIxd1YxaYNM4pdgEFmqwWFi8A==`.
  - Downloaded registry archive: `2506394` bytes; SHA-256 `13AF8BBE9BD869DBFEE439EB37DD1BB940573617BF118BE3253E6D506FC73327`; integrity `sha512-ueJmibzyJKE7fyATUgc+CUWIKpfUEJxUm8oXBSFSrusuZiRYF6s7SfdCyQFmB37vN8+SoUVCssKV4/54sr1fEA==`.
  - Each integrity matches its supplied expected value.

- Tar inspection exited `0`. Each archive contains `193` regular `package/` members. Actual memberships are equal, with no non-`package/` path.

- Retained comparator evidence binds to the same archive paths and reports matching integrity values. Its complete inventory has `193` members. Executed changed-byte and missing-member controls are `true`. Its instrument SHA-256 is `4257F796121FE8FC5FFE06C3C1BF8EC1464BDECC16A047A13B85B3EC330866AC`, matching `comparison-report.md`.

- Direct byte comparison confirms exactly these differing payload members:
  - `package/dist/host/codex/config.toml`: prepared `1802` bytes / `D37AB5CD40864BA5667F1E942979A7F0BC641AA8B9636D34A3BB93ABFFB6C729`; published `1556` bytes / `C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076`.
  - `package/dist/host/manifest.json`: prepared `50075` bytes / `9AE80F9D0B0C76FE413A8D768D1D4250019B54EE38C7BF8FE12DA262A98D05C5`; published `50075` bytes / `3AC660B1D7077D93276226082BA5EF3124F266DA934D71814C791C06B4342AB0`.

- The published config bytes equal canonical `.codex/config.toml`; canonical SHA-256 is `C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076`. The retained manifest diff changes that config’s digest and the host manifest digest, accounting for the manifest payload difference.

- Retained listing files normalize native CRLF output to LF. Raw buffer equality therefore reports false, while normalized member sequences equal the fresh native tar listings.

- Scope limit: this verifies the downloaded archive against root-supplied registry integrity and retained comparator evidence. It does not make a live registry request, run runtime gates, modify files, install packages, or reopen prepared/source acceptance.
