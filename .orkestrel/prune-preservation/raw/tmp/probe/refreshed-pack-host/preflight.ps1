Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$candidate = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$archive = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\packages\orkestrel-scaffold-0.0.75.tgz'
$output = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\refreshed-pack'
$root = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\probe\refreshed-pack-host'

function Invoke-Native {
    param([string]$File, [string[]]$Arguments, [string]$Directory, [string]$StandardOutput, [string]$StandardError)

    $startOptions = @{ FilePath = $File; ArgumentList = $Arguments; WorkingDirectory = $Directory; NoNewWindow = $true; PassThru = $true; Wait = $true }
    if ($StandardOutput) { $startOptions.RedirectStandardOutput = $StandardOutput }
    if ($StandardError) { $startOptions.RedirectStandardError = $StandardError }
    return (Start-Process @startOptions).ExitCode
}

function Get-TextBytes {
    param([string]$Path)

    $bytes = [System.IO.File]::ReadAllBytes($Path)
    $encoding = [System.Text.UTF8Encoding]::new($false, $true)
    [void]$encoding.GetString($bytes)
    return ,$bytes
}

function Get-ArchiveBytes {
    param([string]$Archive, [string]$Entry, [string]$Output, [string]$Directory)

    $error = "$Output.stderr.txt"
    $exit = Invoke-Native -File 'tar.exe' -Arguments @('-xOf', $Archive, $Entry) -Directory $Directory -StandardOutput $Output -StandardError $error
    if ($exit -ne 0) { throw "tar.exe failed with exit code $exit." }
    $bytes = Get-TextBytes -Path $Output
    return ,$bytes
}

function Get-LockedTest {
    param([string]$Directory)

    Set-Location -LiteralPath $Directory
    $program = 'Y29uc3QgbG9jaz1yZXF1aXJlKCIuL3BhY2thZ2UtbG9jay5qc29uIik7Y29uc3Qgcm9vdD1sb2NrLnBhY2thZ2VzWyIiXTtjb25zdCB0ZXN0PWxvY2sucGFja2FnZXNbIm5vZGVfbW9kdWxlcy9Ab3JrZXN0cmVsL3Rlc3QiXTtwcm9jZXNzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeSh7ZGVjbGFyZWQ6cm9vdC5kZXZEZXBlbmRlbmNpZXNbIkBvcmtlc3RyZWwvdGVzdCJdLHJlc29sdmVkOnRlc3QudmVyc2lvbn0pKTs='
    $record = & node.exe -e 'eval(Buffer.from(process.argv[1],String.fromCharCode(98,97,115,101,54,52)).toString())' $program
    if ($LASTEXITCODE -ne 0) { throw 'node.exe failed to read the candidate package-lock.json file.' }
    return (($record -join '') | ConvertFrom-Json)
}

$priorPreference = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
try {
    $childOutput = & powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\pack-refreshed-candidate.ps1' -Commit '0000000000000000000000000000000000000000' 2>&1
    $childExit = $LASTEXITCODE
}
finally {
    $ErrorActionPreference = $priorPreference
}
if ($childExit -eq 0 -or ($childOutput -join "`n") -notmatch 'candidate HEAD does not match') {
    throw 'The incorrect-commit child control did not produce the named nonzero refusal.'
}
if (Test-Path -LiteralPath $output) {
    throw 'The incorrect-commit child control created pack output.'
}

$prior = Get-Location
try {
    $locked = Get-LockedTest -Directory $candidate
}
finally {
    Set-Location -LiteralPath $prior
}
if ($locked.declared -ne '^0.0.18' -or $locked.resolved -ne '0.0.18') {
    throw 'The candidate lock preflight returned unexpected test versions.'
}

$packedPath = Join-Path $root 'historical-skill.packed'
$packed = Get-ArchiveBytes -Archive $archive -Entry 'package/dist/host/agents/skills/orkestrel-prove-journey/SKILL.md' -Output $packedPath -Directory $candidate
$source = Get-TextBytes -Path 'C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md'
$equal = [System.Linq.Enumerable]::SequenceEqual($packed, $source)
if (-not $equal) { throw 'The historical tar output differs from the canonical journey skill.' }

[ordered]@{
    childExit = $childExit
    declared = $locked.declared
    resolved = $locked.resolved
    tarBytes = $packed.Length
    tarEqual = $equal
} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $root 'preflight-result.json') -Encoding utf8
