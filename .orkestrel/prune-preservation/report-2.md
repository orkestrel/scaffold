# Corrected preservation receipt

manifest-2.json resolves Scaffold and Roughnotes entries from their separate absolute roots. It records every retained mapping, hash reuse, explicit exclusion class, and missing source.

stage-paths-2.txt is the explicit textual stage input. It excludes generated media and dependency caches that remain on disk.

The corrected Roughnotes retained copies match their manifest hashes. The original archive mappings remain retained evidence from the preceding attempt. The source identities for tmp/verify/test.log.txt are distinct between the Scaffold and Roughnotes roots, and their hashes differ.

| Record | SHA-256 |
| --- | --- |
| preserve-2.ps1 | C5ED21EF8AB66D4E604481A0C19E4F587136A6196A6A380AEE5D082F8DD328F1 |
| manifest-2.json | C012158921F7D999B1CBA5CE2515596545497692649B884888C33DCF918CB188 |
| stage-paths-2.txt | A548884BDF830823B5B7FCD6F1C3F56038E09F1431D5A53ADD94BEEE7CA47841 |

The first staging invocation rejected the PowerShell UTF-8 byte-order mark before changing the index. The same verified path lines were rewritten without that prefix before staging.
