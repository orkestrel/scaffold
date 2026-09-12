$ErrorActionPreference = 'Stop'
foreach ($targetId in @(46064, 48972)) {
    $owner = Get-CimInstance Win32_Process -Filter "ProcessId = $targetId"
    if ($null -eq $owner) { continue }
    $parent = Get-CimInstance Win32_Process -Filter "ProcessId = $($owner.ParentProcessId)"
    $command = $owner.CommandLine
    $subject = 'unclassified'
    if ($command -match '@orkestrel[/\\]probe[/\\]dist[/\\]bin[/\\]main\.js') { $subject = 'installed Probe entry' }
    elseif ($command -match 'probe[/\\]dist[/\\]bin[/\\]main\.js') { $subject = 'canonical Probe entry' }
    elseif ($command -match 'oxlint') { $subject = 'Oxlint entry' }
    [pscustomobject]@{
        Id = $targetId
        Subject = $subject
        Parent = $owner.ParentProcessId
        ParentName = $parent.Name
        Executable = $owner.ExecutablePath
    } | Format-List
}
