$ErrorActionPreference = 'Stop'
$tokens = $null
$diagnostics = $null
$path = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\launch-roughnotes-registry.ps1'
$ast = [System.Management.Automation.Language.Parser]::ParseFile($path, [ref]$tokens, [ref]$diagnostics)
if ($diagnostics) {
    $diagnostics | ForEach-Object { Write-Output $_.Message }
    exit 1
}
Write-Output "PowerShell parser passed: $path"
exit 0
