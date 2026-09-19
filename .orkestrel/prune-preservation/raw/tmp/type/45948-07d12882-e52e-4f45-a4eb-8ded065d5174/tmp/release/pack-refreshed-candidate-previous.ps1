[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidatePattern('^[0-9a-fA-F]{40,64}$')]
    [string]$Commit
)

Set-StrictMode -Version Latest

$candidate = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$release = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release'
$output = Join-Path -Path $release -ChildPath 'refreshed-pack'
$expectedName = '@orkestrel/scaffold'
$expectedVersion = '0.0.75'
$expectedFilename = 'orkestrel-scaffold-0.0.75.tgz'
$expectedTest = '0.0.18'
$expectedRange = '^0.0.18'
$vendored = @(
    'agents/skills/orkestrel-prove-journey/SKILL.md',
    'agents/skills/orkestrel-prove-journey/references/captures.md'
)
$forbidden = [System.Collections.Generic.HashSet[string]]::new(
    [string[]]@('.npmrc', 'auth.json', '.codex', '.claude', '.orkestrel', 'tmp'),
    [System.StringComparer]::OrdinalIgnoreCase
)
$initial = Get-Location
$initialPreference = $ErrorActionPreference

function Get-ResolvedPath {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    return (Resolve-Path -LiteralPath $Path -ErrorAction Stop).Path
}

function Invoke-Native {
    param(
        [Parameter(Mandatory)]
        [string]$File,

        [Parameter(Mandatory)]
        [string[]]$Arguments,

        [Parameter(Mandatory)]
        [string]$Directory,

        [string]$StandardOutput,

        [string]$StandardError
    )

    $arguments = @{
        FilePath = $File
        ArgumentList = $Arguments
        WorkingDirectory = $Directory
        NoNewWindow = $true
        PassThru = $true
        Wait = $true
    }
    if ($StandardOutput) {
        $arguments.RedirectStandardOutput = $StandardOutput
    }
    if ($StandardError) {
        $arguments.RedirectStandardError = $StandardError
    }

    $process = Start-Process @arguments
    return $process.ExitCode
}

function Get-TextBytes {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    $bytes = [System.IO.File]::ReadAllBytes($Path)
    $encoding = [System.Text.UTF8Encoding]::new($false, $true)
    [void]$encoding.GetString($bytes)
    return ,$bytes
}

function Get-ArchiveBytes {
    param(
        [Parameter(Mandatory)]
        [string]$Archive,

        [Parameter(Mandatory)]
        [string]$Entry,

        [Parameter(Mandatory)]
        [string]$Output,

        [Parameter(Mandatory)]
        [string]$Directory
    )

    $error = "$Output.stderr.txt"
    $exit = Invoke-Native -File 'tar.exe' -Arguments @('-xOf', $Archive, $Entry) -Directory $Directory -StandardOutput $Output -StandardError $error
    if ($exit -ne 0) {
        throw "tar.exe failed to read $Entry with exit code $exit."
    }
    $bytes = Get-TextBytes -Path $Output
    return ,$bytes
}

function Test-ArchiveEntry {
    param(
        [Parameter(Mandatory)]
        [string]$Entry
    )

    if ($Entry.StartsWith('/') -or $Entry.StartsWith('\\') -or $Entry -match '^[A-Za-z]:') {
        throw "The archive contains an absolute entry: $Entry"
    }
    $payload = $Entry
    if ($payload.StartsWith('package/')) {
        $payload = $payload.Substring('package/'.Length)
    }
    $parts = $payload -split '[\\/]'
    if ($parts -contains '..') {
        throw "The archive contains a traversal entry: $Entry"
    }
    $root = $parts[0]
    if ($root -like '.env*' -or $forbidden.Contains($root)) {
        throw "The archive contains a forbidden root entry: $Entry"
    }
}

try {
    $ErrorActionPreference = 'Stop'
    $resolvedRelease = Get-ResolvedPath -Path $release
    $resolvedCandidate = Get-ResolvedPath -Path $candidate
    if ($resolvedRelease -ne $release -or $resolvedCandidate -ne $candidate) {
        throw 'A fixed release root does not resolve to its required path.'
    }
    if (Test-Path -LiteralPath $output) {
        throw "The write-once output path already exists: $output"
    }

    $head = (& git -C $candidate rev-parse HEAD).Trim()
    if ($LASTEXITCODE -ne 0 -or $head -ne $Commit) {
        throw 'The candidate HEAD does not match -Commit.'
    }
    $status = & git -C $candidate status --porcelain=v1 --untracked-files=no
    if ($LASTEXITCODE -ne 0 -or $status) {
        throw 'The candidate tracked working tree or index is not clean.'
    }

    $manifest = Get-Content -LiteralPath (Join-Path $candidate 'package.json') -Raw | ConvertFrom-Json
    $lock = Get-Content -LiteralPath (Join-Path $candidate 'package-lock.json') -Raw | ConvertFrom-Json
    $installed = Get-Content -LiteralPath (Join-Path $candidate 'node_modules\@orkestrel\test\package.json') -Raw | ConvertFrom-Json
    if ($manifest.name -ne $expectedName -or $manifest.version -ne $expectedVersion) {
        throw 'The candidate manifest identity does not match the fixed package.'
    }
    if ($manifest.devDependencies.'@orkestrel/test' -ne $expectedRange -or $installed.version -ne $expectedTest) {
        throw 'The candidate declared or installed @orkestrel/test version is unexpected.'
    }
    if ($lock.packages.''.devDependencies.'@orkestrel/test' -ne $expectedRange -or $lock.packages.'node_modules/@orkestrel/test'.version -ne $expectedTest) {
        throw 'The candidate locked @orkestrel/test version is unexpected.'
    }
    foreach ($path in @('dist\src', 'dist\bin', 'dist\host')) {
        if (-not (Test-Path -LiteralPath (Join-Path $candidate $path) -PathType Container)) {
            throw "The candidate is missing $path."
        }
    }

    New-Item -ItemType Directory -Path $output -ErrorAction Stop | Out-Null
    $stdout = Join-Path $output 'npm-pack.stdout.json'
    $stderr = Join-Path $output 'npm-pack.stderr.txt'
    $exit = Invoke-Native -File 'npm.cmd' -Arguments @('pack', '--ignore-scripts', '--json', '--pack-destination', $output) -Directory $candidate -StandardOutput $stdout -StandardError $stderr
    if ($exit -ne 0) {
        throw "npm.cmd pack failed with exit code $exit."
    }

    $pack = Get-Content -LiteralPath $stdout -Raw | ConvertFrom-Json
    $names = @($pack.PSObject.Properties.Name)
    if ($names.Length -ne 1 -or $names[0] -ne $expectedName) {
        throw 'The npm JSON output does not contain exactly the intended package record.'
    }
    $record = $pack.PSObject.Properties[$expectedName].Value
    if ($record.name -ne $expectedName -or $record.version -ne $expectedVersion -or $record.filename -ne $expectedFilename) {
        throw 'The npm package record identity is unexpected.'
    }

    $archive = Join-Path $output $expectedFilename
    if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) {
        throw "npm.cmd pack did not create $archive."
    }
    $inventory = Join-Path $output 'archive-entries.txt'
    $inventoryError = Join-Path $output 'archive-entries.stderr.txt'
    $exit = Invoke-Native -File 'tar.exe' -Arguments @('-tf', $archive) -Directory $candidate -StandardOutput $inventory -StandardError $inventoryError
    if ($exit -ne 0) {
        throw "tar.exe failed to list the archive with exit code $exit."
    }
    foreach ($entry in Get-Content -LiteralPath $inventory) {
        Test-ArchiveEntry -Entry $entry
    }

    $sha512 = "sha512-$([System.Convert]::ToBase64String(([System.Security.Cryptography.SHA512]::HashData([System.IO.File]::ReadAllBytes($archive)))))"
    if ($sha512 -ne $record.integrity) {
        throw 'The archive SHA512 does not match npm integrity.'
    }
    $packedManifestPath = Join-Path $output 'packed-package.json'
    $packedManifestBytes = Get-ArchiveBytes -Archive $archive -Entry 'package/package.json' -Output $packedManifestPath -Directory $candidate
    $packedManifest = [System.Text.Encoding]::UTF8.GetString($packedManifestBytes) | ConvertFrom-Json
    if ($packedManifest.name -ne $expectedName -or $packedManifest.version -ne $expectedVersion -or $packedManifest.devDependencies.'@orkestrel/test' -ne $expectedRange) {
        throw 'The packed manifest does not match the fixed package or test range.'
    }

    $files = @()
    foreach ($relative in $vendored) {
        $packedPath = Join-Path $output (($relative -replace '[\\/]', '-') + '.packed')
        $packed = Get-ArchiveBytes -Archive $archive -Entry "package/dist/host/$relative" -Output $packedPath -Directory $candidate
        $staged = Get-TextBytes -Path (Join-Path $candidate "dist/host/$relative")
        $source = Get-TextBytes -Path (Join-Path $candidate ($relative -replace '^agents/skills/', '.agents/skills/'))
        if (-not [System.Linq.Enumerable]::SequenceEqual($packed, $staged) -or -not [System.Linq.Enumerable]::SequenceEqual($packed, $source)) {
            throw "The packed vendored content differs for $relative."
        }
        $files += [ordered]@{
            path = $relative
            sha256 = (Get-FileHash -LiteralPath $packedPath -Algorithm SHA256).Hash
        }
    }

    [ordered]@{
        commit = $Commit
        archive = $archive
        sha512 = $sha512
        sha256 = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash
        bytes = (Get-Item -LiteralPath $archive).Length
        vendored = $files
    } | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $output 'metadata.json') -Encoding utf8NoBOM
}
finally {
    $ErrorActionPreference = $initialPreference
    Set-Location -LiteralPath $initial
}
