$ErrorActionPreference = 'Stop'
$lockedPath = 'C:/Users/mikes/WebstormProjects/scaffold/node_modules/@oxlint/binding-win32-x64-msvc/oxlint.win32-x64-msvc.node'
$resolvedLock = [System.IO.Path]::GetFullPath($lockedPath)
foreach ($candidate in Get-Process -Name node,oxlint -ErrorAction SilentlyContinue) {
    try {
        foreach ($module in $candidate.Modules) {
            if ([System.IO.Path]::GetFullPath($module.FileName) -eq $resolvedLock) {
                [pscustomobject]@{
                    Id = $candidate.Id
                    Process = $candidate.ProcessName
                    Started = $candidate.StartTime
                    Executable = $candidate.Path
                    Module = $module.FileName
                } | Format-List
            }
        }
    } catch {
        Write-Warning "Could not inspect modules for process $($candidate.Id): $($_.Exception.Message)"
    }
}
