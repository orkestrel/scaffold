$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$worktree = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$release = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release'
$packages = Join-Path -Path $release -ChildPath 'packages'
$resultPath = Join-Path -Path $release -ChildPath 'scaffold-0.0.75-pack.json'
$filename = 'orkestrel-scaffold-0.0.75.tgz'
$archive = Join-Path -Path $packages -ChildPath $filename
$utf8 = [System.Text.UTF8Encoding]::new($false)
$forbidden = [System.Collections.Generic.HashSet[string]]::new([string[]]@('.npmrc', '.env', 'auth.json', '.codex', '.claude', '.orkestrel', 'tmp'))

function Get-RootPath {
    param([string]$Path)

    return ($Path -split '/', 2)[0]
}

$manifestPath = Join-Path -Path $worktree -ChildPath 'package.json'
if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    throw "The package manifest is missing: $manifestPath"
}

$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
if ($manifest.name -ne '@orkestrel/scaffold') {
    throw "Expected package name @orkestrel/scaffold, received $($manifest.name)."
}

if ($manifest.version -ne '0.0.75') {
    throw "Expected package version 0.0.75, received $($manifest.version)."
}

if ($manifest.devDependencies.'@orkestrel/test' -ne '^0.0.18') {
    throw "Expected @orkestrel/test range ^0.0.18, received $($manifest.devDependencies.'@orkestrel/test')."
}

foreach ($path in @('dist/src', 'dist/bin', 'dist/host')) {
    $required = Join-Path -Path $worktree -ChildPath $path
    if (-not (Test-Path -LiteralPath $required -PathType Container)) {
        throw "The required build output is missing: $required"
    }
}

if (Test-Path -LiteralPath $packages) {
    if (-not (Test-Path -LiteralPath $packages -PathType Container)) {
        throw "The packages path is not a directory: $packages"
    }
}
else {
    New-Item -ItemType Directory -Path $packages | Out-Null
}

if (Test-Path -LiteralPath $archive -PathType Leaf) {
    throw "The release archive already exists: $archive"
}

Set-Location -LiteralPath $worktree
$packJson = (& npm.cmd pack --ignore-scripts --json --pack-destination $packages | Out-String)
if ($LASTEXITCODE -ne 0) {
    throw "npm.cmd pack failed with exit code $LASTEXITCODE."
}

[System.IO.File]::WriteAllText($resultPath, $packJson, $utf8)
$results = @($packJson | ConvertFrom-Json)
if ($results.Count -ne 1) {
    throw 'npm.cmd pack returned an unexpected result set.'
}

$result = $results[0]
if ($result.name -ne '@orkestrel/scaffold') {
    throw "Expected packed name @orkestrel/scaffold, received $($result.name)."
}

if ($result.version -ne '0.0.75') {
    throw "Expected packed version 0.0.75, received $($result.version)."
}

if ($result.filename -ne $filename) {
    throw "Expected packed filename $filename, received $($result.filename)."
}

if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) {
    throw "npm.cmd pack did not create the release archive: $archive"
}

foreach ($file in $result.files) {
    $root = Get-RootPath -Path $file.path
    if ($forbidden.Contains($root)) {
        throw "The release archive contains a forbidden root path: $($file.path)"
    }
}

$hash = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash
Write-Host "Tarball: $archive"
Write-Host "Integrity: $($result.integrity)"
Write-Host "SHA256: $hash"
Write-Host "Size: $($result.size)"
