PASS — The correction accepts the measured `EF BB BF 30 0D 0A` receipt. `tr` removes the BOM bytes and CR; Bash command substitution removes the trailing LF, leaving exactly `0`.

The exact comparison still rejects a normalized nonzero value such as `1`. The diff changes only this receipt reader, and `Format-Hex` confirms the original receipt remains unchanged.

This is a source-level comparison verdict. No carrier or release action ran. Prior source and operator-command acceptance stands.
