# R-B final controls reporter correction

Updated `tmp/probe/run-r-b-final-controls.ps1`.

`Assert-Negative` normalizes whitespace in the captured output, requested title, and required evidence before it performs ordinal containment checks. Wrapped reporter lines retain the named-test requirement.

The content-continuation evidence requires `the subscribe view paints` and `did not hold within`. The truncated source-excerpt fragment `Free print and digital delivery` is no longer required.

The collection, import, parse, module, exit-code, byte-restoration, and restored-green guards remain unchanged. PowerShell parser validation follows this edit. Parent owns the rerun.
