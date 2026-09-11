$ErrorActionPreference = 'Stop'

$path = 'C:/Users/mikes/WebstormProjects/scaffold/tests/src/core/fixtures/app-only-toolchain.txt'
$encoding = [System.Text.UTF8Encoding]::new($false, $true)
$text = [System.IO.File]::ReadAllText($path, $encoding)

if (-not $text.EndsWith("`n")) {
    throw 'fixture does not end with a line feed'
}

if ($text.EndsWith("`r`n")) {
    $formatted = $text.Substring(0, $text.Length - 2)
} else {
    $formatted = $text.Substring(0, $text.Length - 1)
}

[System.IO.File]::WriteAllText($path, $formatted, $encoding)
