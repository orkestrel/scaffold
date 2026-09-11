param(
    [string]$Label
)

$ErrorActionPreference = 'Stop'
$pass = $PSScriptRoot
$temporary = Split-Path -Parent $pass
$scaffold = Split-Path -Parent $temporary
$prompt = Join-Path $scaffold 'prompt.txt'

if ($Label -notmatch '^[a-z][a-z0-9-]*$') {
    throw 'record label is required'
}

$output = Join-Path $pass $Label
if (Test-Path -LiteralPath $output) {
    throw 'parse evidence exists'
}

if (-not (Test-Path -LiteralPath $prompt -PathType Leaf)) {
    throw 'prompt file is absent'
}

New-Item -ItemType Directory -Path $output | Out-Null
$content = [System.IO.File]::ReadAllText($prompt, [System.Text.UTF8Encoding]::new($false, $true))
$tokens = $null
$errors = $null
[void][System.Management.Automation.Language.Parser]::ParseInput($content, [ref]$tokens, [ref]$errors)

if ($errors.Count -ne 0) {
    $errors | ForEach-Object { $_.ToString() } | Set-Content -LiteralPath (Join-Path $output 'parse-errors.txt') -Encoding utf8
    exit 1
}

if ($content.EndsWith("`r`n")) {
    $line = $content.Substring(0, $content.Length - 2)
} elseif ($content.EndsWith("`n")) {
    $line = $content.Substring(0, $content.Length - 1)
} else {
    $line = $content
}

if ($line.Length -eq 0 -or $line.Contains("`r") -or $line.Contains("`n")) {
    Set-Content -LiteralPath (Join-Path $output 'line-error.txt') -Value 'prompt must contain one nonempty physical line' -Encoding utf8
    exit 1
}

Set-Content -LiteralPath (Join-Path $output 'parse.exit.txt') -Value '0' -Encoding utf8
