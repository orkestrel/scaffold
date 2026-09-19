$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$canonical = 'C:\Users\mikes\WebstormProjects\scaffold'
$roughnotes = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\recovery\roughnotes'
$archive = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\packages\orkestrel-scaffold-0.0.75.tgz'
$report = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75-pack.json'
$metadata = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\adopt-scaffold-0.0.75-metadata.json'
$log = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\adopt-scaffold-0.0.75.log.txt'
$expectedBranch = 'recovery/journey-20260918'
$utf8 = [System.Text.UTF8Encoding]::new($false)

function Invoke-NativeCommand {
    param(
        [string]$File,
        [string[]]$Arguments
    )

    $preference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & $File @Arguments *>&1 | Tee-Object -FilePath $log -Append
        $exit = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $preference
    }

    if ($exit -ne 0) {
        throw "The $File command failed with exit code $exit."
    }
}

if ((Resolve-Path -LiteralPath $canonical).Path -ne $canonical) {
    throw "The canonical path does not resolve to $canonical."
}

if ((Resolve-Path -LiteralPath $roughnotes).Path -ne $roughnotes) {
    throw "The Roughnotes path does not resolve to $roughnotes."
}

Set-Location -LiteralPath $roughnotes
$branch = (& git branch --show-current).Trim()
if ($LASTEXITCODE -ne 0) {
    throw 'Git could not read the Roughnotes branch.'
}

if ($branch -ne $expectedBranch) {
    throw "Expected branch $expectedBranch, received $branch."
}

$manifest = Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json
if ($manifest.name -ne 'roughnotes') {
    throw "Expected package name roughnotes, received $($manifest.name)."
}

if ($manifest.private -ne $true) {
    throw 'The Roughnotes manifest must declare private as true.'
}

$range = $manifest.devDependencies.'@orkestrel/scaffold'
if ([string]::IsNullOrWhiteSpace($range)) {
    throw 'The Roughnotes manifest has no @orkestrel/scaffold development range.'
}

$installedPath = Join-Path -Path $roughnotes -ChildPath 'node_modules\@orkestrel\scaffold\package.json'
if (-not (Test-Path -LiteralPath $installedPath -PathType Leaf)) {
    throw "The installed Scaffold manifest is missing: $installedPath"
}

$installed = Get-Content -LiteralPath $installedPath -Raw | ConvertFrom-Json
if ($installed.name -ne '@orkestrel/scaffold') {
    throw "Expected installed package @orkestrel/scaffold, received $($installed.name)."
}

if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) {
    throw "The packed Scaffold archive is missing: $archive"
}

if (-not (Test-Path -LiteralPath $report -PathType Leaf)) {
    throw "The Scaffold pack report is missing: $report"
}

$pack = Get-Content -LiteralPath $report -Raw | ConvertFrom-Json
$names = @($pack.PSObject.Properties.Name)
if ($names.Count -ne 1 -or $names[0] -ne '@orkestrel/scaffold') {
	throw 'The Scaffold pack report does not contain exactly the intended package record.'
}

$result = $pack.'@orkestrel/scaffold'
if ($result.name -ne '@orkestrel/scaffold') {
    throw "Expected packed package @orkestrel/scaffold, received $($result.name)."
}

if ($result.version -ne '0.0.75') {
    throw "Expected packed version 0.0.75, received $($result.version)."
}

if ($result.filename -ne (Split-Path -Path $archive -Leaf)) {
    throw "The pack report filename does not match the archive: $($result.filename)"
}

if (Test-Path -LiteralPath $metadata) {
    throw "The adoption metadata already exists: $metadata"
}

$hash = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash
$record = [pscustomobject]@{
    range = $range
    installed = $installed.version
    archive = $hash
}
[System.IO.File]::WriteAllText($metadata, ($record | ConvertTo-Json), $utf8)

Invoke-NativeCommand -File 'npm.cmd' -Arguments @('install', '--no-save', '--package-lock=false', $archive)

$adopted = Get-Content -LiteralPath $installedPath -Raw | ConvertFrom-Json
if ($adopted.name -ne '@orkestrel/scaffold') {
    throw "Expected installed package @orkestrel/scaffold, received $($adopted.name)."
}

if ($adopted.version -ne '0.0.75') {
    throw "Expected installed version 0.0.75, received $($adopted.version)."
}

Invoke-NativeCommand -File 'node' -Arguments @('node_modules/@orkestrel/scaffold/dist/bin/main.js', 'repair', '--groups', 'configs,manifest')
Invoke-NativeCommand -File 'git' -Arguments @('status', '--short')
Write-Host 'The following gates prove a local tarball until the registry copy is restored.'
