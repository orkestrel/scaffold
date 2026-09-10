$ErrorActionPreference = 'Stop'
$passRoot = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/pass'
$publishTokens = $null
$publishErrors = $null
$publishTree = [System.Management.Automation.Language.Parser]::ParseFile("$passRoot/publish-initial-direct.ps1", [ref] $publishTokens, [ref] $publishErrors)
if ($publishErrors) {
    $publishErrors
    throw 'Publish command does not parse.'
}
Write-Output 'PowerShell parser: accepted; upload not executed.'
foreach ($packageName in @('contract', 'codec', 'msg', 'sse', 'test')) {
    $registryRows = Get-Content -LiteralPath "$passRoot/d7n-initial-direct-reading/registry-$packageName.stdout.txt" -Raw | ConvertFrom-Json
    $packageManifest = Get-Content -LiteralPath "C:/Users/mikes/WebstormProjects/$packageName/package.json" -Raw | ConvertFrom-Json
    foreach ($registryRow in $registryRows) {
        if ($registryRow.name -ne $packageManifest.name) { throw "Unexpected registry identity: $packageName" }
        if ($registryRow.versions -contains $packageManifest.version) { throw "Pending version already exists: $packageName" }
        Write-Output "$packageName registry=$($registryRow.version) prepared=$($packageManifest.version) absent-from-registry"
    }
}
