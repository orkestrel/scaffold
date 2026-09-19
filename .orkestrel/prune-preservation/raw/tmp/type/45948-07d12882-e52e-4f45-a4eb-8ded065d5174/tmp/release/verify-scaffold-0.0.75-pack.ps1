$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$release = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release'
$archive = Join-Path -Path $release -ChildPath 'packages\orkestrel-scaffold-0.0.75.tgz'
$report = Join-Path -Path $release -ChildPath 'scaffold-0.0.75-pack.json'
$expectedName = '@orkestrel/scaffold'
$expectedVersion = '0.0.75'
$expectedFilename = 'orkestrel-scaffold-0.0.75.tgz'
$expectedCommit = 'c50efef0f741caafe1a80c1ef9ee4004f8be0f2b'
$forbidden = [System.Collections.Generic.HashSet[string]]::new([string[]]@('.npmrc', '.env', 'auth.json', '.codex', '.claude', '.orkestrel', 'tmp'))

function Get-NativeOutput {
    param(
        [string]$File,
        [string[]]$Arguments
    )

    $preference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $output = & $File @Arguments *>&1
        $exit = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $preference
    }

    if ($exit -ne 0) {
        throw "The $File command failed with exit code $exit."
    }

    return ($output -join [Environment]::NewLine)
}

function Get-PackRecord {
    param([string]$Path)

    $pack = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
    $names = @($pack.PSObject.Properties.Name)
    if ($names.Count -ne 1 -or $names[0] -ne $expectedName) {
        throw 'The pack report does not contain exactly the intended package record.'
    }

    return $pack.$expectedName
}

function Get-RootPath {
    param([string]$Path)

    return ($Path -split '/', 2)[0]
}

function Get-Integrity {
    param([string]$Path)

    $algorithm = [System.Security.Cryptography.SHA512]::Create()
    try {
        $bytes = [System.IO.File]::ReadAllBytes($Path)
        return "sha512-$([System.Convert]::ToBase64String($algorithm.ComputeHash($bytes)))"
    }
    finally {
        $algorithm.Dispose()
    }
}

if ((Resolve-Path -LiteralPath $release).Path -ne $release) {
    throw "The release path does not resolve to $release."
}

if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) {
    throw "The packed archive is missing: $archive"
}

if (-not (Test-Path -LiteralPath $report -PathType Leaf)) {
    throw "The pack report is missing: $report"
}

$record = Get-PackRecord -Path $report
if ($record.name -ne $expectedName -or $record.version -ne $expectedVersion -or $record.filename -ne $expectedFilename) {
    throw 'The pack report identity does not match the expected Scaffold archive.'
}

foreach ($file in $record.files) {
    $root = Get-RootPath -Path $file.path
    if ($forbidden.Contains($root)) {
        throw "The archive inventory contains a forbidden root path: $($file.path)"
    }
}

$integrity = Get-Integrity -Path $archive
if ($integrity -ne $record.integrity) {
    throw "The archive SHA512 integrity does not match the pack report."
}

$manifestText = Get-NativeOutput -File 'tar' -Arguments @('-xOf', $archive, 'package/package.json')
$manifest = $manifestText | ConvertFrom-Json
if ($manifest.name -ne $expectedName -or $manifest.version -ne $expectedVersion) {
    throw 'The packed manifest identity does not match the expected Scaffold archive.'
}

if ($manifest.devDependencies.'@orkestrel/test' -ne '^0.0.18') {
    throw "The packed manifest has an unexpected @orkestrel/test range: $($manifest.devDependencies.'@orkestrel/test')"
}

$sha256 = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash
Write-Host "Provenance: $expectedCommit"
Write-Host "Tarball: $archive"
Write-Host "Integrity: $integrity"
Write-Host "SHA256: $sha256"
Write-Host "Size: $($record.size)"
