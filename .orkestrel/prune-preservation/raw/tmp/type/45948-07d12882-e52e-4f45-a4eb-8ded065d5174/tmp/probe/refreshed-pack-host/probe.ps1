Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$root = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\probe\refreshed-pack-host'

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

    $startOptions = @{
        FilePath = $File
        ArgumentList = $Arguments
        WorkingDirectory = $Directory
        NoNewWindow = $true
        PassThru = $true
        Wait = $true
    }
    if ($StandardOutput) {
        $startOptions.RedirectStandardOutput = $StandardOutput
    }
    if ($StandardError) {
        $startOptions.RedirectStandardError = $StandardError
    }

    $process = Start-Process @startOptions
    return $process.ExitCode
}

$content = [System.Text.Encoding]::UTF8.GetBytes('{"status":"pass"}')
$contentPath = Join-Path $root 'content.json'
[System.IO.File]::WriteAllBytes($contentPath, $content)
$algorithm = [System.Security.Cryptography.SHA512]::Create()
try {
    $integrity = "sha512-$([System.Convert]::ToBase64String($algorithm.ComputeHash([System.IO.File]::ReadAllBytes($contentPath))))"
}
finally {
    $algorithm.Dispose()
}
$metadataPath = Join-Path $root 'metadata.json'
[System.IO.File]::WriteAllText($metadataPath, '{"status":"pass"}', [System.Text.UTF8Encoding]::new($false))
$stdout = Join-Path $root 'node.stdout.txt'
$stderr = Join-Path $root 'node.stderr.txt'
$exit = Invoke-Native -File 'node.exe' -Arguments @('--version') -Directory $root -StandardOutput $stdout -StandardError $stderr
if ($exit -ne 0) {
    throw "node.exe exited with $exit."
}
[string]$node = [System.IO.File]::ReadAllText($stdout)
[ordered]@{
    integrity = $integrity
    metadata = [System.BitConverter]::ToString([System.IO.File]::ReadAllBytes($metadataPath))
    node = $node.Trim()
} | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath (Join-Path $root 'result.json') -Encoding utf8
