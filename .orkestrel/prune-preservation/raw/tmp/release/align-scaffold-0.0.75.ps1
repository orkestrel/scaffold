$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$worktree = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$expectedHead = '178c7cbbe4f125e4d6ca33e54918f12f9339f5e9'
$utf8 = [System.Text.UTF8Encoding]::new($false)
$permitted = [System.Collections.Generic.HashSet[string]]::new([string[]]@('package.json', 'package-lock.json'))
$updates = @(
    [pscustomobject]@{
        Path = 'tests/src/core/fixtures/app-only-toolchain.txt'
        From = '"@orkestrel/scaffold": "^0.0.74"'
        To = '"@orkestrel/scaffold": "^0.0.75"'
    },
    [pscustomobject]@{
        Path = 'tests/src/core/fixtures/app-only-toolchain.txt'
        From = '"@orkestrel/test": "^0.0.17"'
        To = '"@orkestrel/test": "^0.0.18"'
    },
    [pscustomobject]@{
        Path = 'tests/src/core/fixtures/source-manifest.txt'
        From = '"@orkestrel/scaffold": "^0.0.74"'
        To = '"@orkestrel/scaffold": "^0.0.75"'
    },
    [pscustomobject]@{
        Path = 'tests/src/core/fixtures/source-manifest.txt'
        From = '"@orkestrel/test": "^0.0.17"'
        To = '"@orkestrel/test": "^0.0.18"'
    },
    [pscustomobject]@{
        Path = 'tests/src/core/fixtures/setup-false-manifest.txt'
        From = '"@orkestrel/scaffold": "^0.0.74"'
        To = '"@orkestrel/scaffold": "^0.0.75"'
    },
    [pscustomobject]@{
        Path = 'tests/src/core/fixtures/setup-false-manifest.txt'
        From = '"@orkestrel/test": "^0.0.17"'
        To = '"@orkestrel/test": "^0.0.18"'
    },
    [pscustomobject]@{
        Path = 'tests/src/bin/CLI.test.ts'
        From = '"@orkestrel/test": "^0.0.17"'
        To = '"@orkestrel/test": "^0.0.18"'
    }
)

function Get-OccurrenceCount {
    param(
        [string]$Text,
        [string]$Value
    )

    return ([regex]::Matches($Text, [regex]::Escape($Value))).Count
}

function Test-Utf8Bom {
    param([byte[]]$Bytes)

    return $Bytes.Length -ge 3 -and $Bytes[0] -eq 239 -and $Bytes[1] -eq 187 -and $Bytes[2] -eq 191
}

Set-Location -LiteralPath $worktree

$head = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) {
    throw "Git could not read the HEAD of $worktree."
}

if ($head -ne $expectedHead) {
    throw "Expected HEAD $expectedHead, received $head."
}

$tracked = @(& git diff --name-only HEAD)
if ($LASTEXITCODE -ne 0) {
    throw "Git could not read the tracked status of $worktree."
}

foreach ($path in $tracked) {
    if (-not $permitted.Contains($path)) {
        throw "The worktree has tracked changes outside package.json and package-lock.json: $path"
    }
}

$manifestPath = Join-Path -Path $worktree -ChildPath 'package.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
if ($manifest.version -ne '0.0.75') {
    throw "Expected package version 0.0.75, received $($manifest.version)."
}

if ($manifest.devDependencies.'@orkestrel/test' -ne '^0.0.18') {
    throw "Expected @orkestrel/test range ^0.0.18, received $($manifest.devDependencies.'@orkestrel/test')."
}

$texts = @{}
foreach ($path in $updates.Path | Select-Object -Unique) {
    $file = Join-Path -Path $worktree -ChildPath $path
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
        throw "The replacement target is missing: $path"
    }

    $bytes = [System.IO.File]::ReadAllBytes($file)
    if (Test-Utf8Bom -Bytes $bytes) {
        throw "The replacement target has a UTF-8 BOM: $path"
    }

    $texts[$path] = [System.IO.File]::ReadAllText($file, $utf8)
}

foreach ($update in $updates) {
    $matches = Get-OccurrenceCount -Text $texts[$update.Path] -Value $update.From
    if ($matches -ne 1) {
        throw "Expected one replacement target in $($update.Path): $($update.From)"
    }
}

foreach ($path in $texts.Keys) {
    $text = $texts[$path]
    foreach ($update in $updates.Where({ $_.Path -eq $path })) {
        $text = $text.Replace($update.From, $update.To)
    }

    [System.IO.File]::WriteAllText((Join-Path -Path $worktree -ChildPath $path), $text, $utf8)
}

Write-Host 'Aligned Scaffold 0.0.75 release expectations.'
