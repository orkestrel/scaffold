# Capture-retention instrument report

The `tmp/probe/retain-r-b-capture.ps1` script retains only the assigned Roughnotes screenshots, journey records, and capture log under `tmp/capture-retained/r-b-final-capture`. It validates the fixed source and destination paths, refuses an existing destination, reads each PNG signature and IHDR, inventories dimensions and SHA256 values, and verifies copied bytes.

The script does not run the journey suite. Its retained readme records the supplied command, restored environment, process exit, reporter result, duration, and start time. It states that full-page screenshots do not alone prove the configured viewport height.

Syntax validation: `System.Management.Automation.Language.Parser::ParseFile` reported `PowerShell parser: clean` with exit code 0. The copying operation was not run.

Owned status: only `tmp/probe/retain-r-b-capture.ps1` and this report changed.

Deviation: none.
