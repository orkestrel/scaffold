[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Head,

    [switch]$Control
)

$candidate = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$units = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\units'
$output = if ($Control) {
    Join-Path $units 'anchor-release-gates-control-2'
} else {
    Join-Path $units 'anchor-release-gates-2'
}
$stdout = Join-Path $output 'stdout.log.txt'
$stderr = Join-Path $output 'stderr.log.txt'
$summary = Join-Path $output 'summary.json'
$cap = [TimeSpan]::FromSeconds(900)
$originalLocation = Get-Location
$originalErrorActionPreference = $ErrorActionPreference
$originalProgressPreference = $ProgressPreference
$exitCode = 1

function Get-GitValue {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    $value = & git.exe -C $candidate @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "git.exe $($Arguments -join ' ') exited $LASTEXITCODE."
    }

    return @($value)
}

function Get-NpmVersion {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $manifest = Join-Path (Split-Path -Parent $Path) 'node_modules\npm\package.json'
    if (-not (Test-Path -LiteralPath $manifest -PathType Leaf)) {
        throw "npm package manifest is absent at $manifest."
    }

    $text = Get-Content -LiteralPath $manifest -Raw
    $match = [regex]::Match($text, '"version"\s*:\s*"(?<value>[^"]+)"')
    if (-not $match.Success) {
        throw "npm package manifest has no version at $manifest."
    }

    return $match.Groups['value'].Value
}

function Stop-ProcessTree {
    param(
        [Parameter(Mandatory = $true)]
        [int]$Identifier
    )

    & taskkill.exe /PID $Identifier /T /F | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "taskkill.exe could not stop process tree ${Identifier}: exit $LASTEXITCODE."
    }
}

try {
    $ErrorActionPreference = 'Stop'
    $ProgressPreference = 'SilentlyContinue'

    if (Test-Path -LiteralPath $output) {
        throw "Evidence directory already exists: $output."
    }

    if (-not (Test-Path -LiteralPath $candidate -PathType Container)) {
        throw "Candidate directory is absent: $candidate."
    }

    $actualHead = @(Get-GitValue -Arguments @('rev-parse', 'HEAD'))[0]
    if ($actualHead -ne $Head) {
        throw "Candidate HEAD $actualHead does not match expected HEAD $Head."
    }

    $status = Get-GitValue -Arguments @('status', '--short')
    $npm = @(Get-Command npm.cmd -CommandType Application)[0]
    $node = @(Get-Command node.exe -CommandType Application)[0]
    $npmPath = $npm.Source
    $nodePath = $node.Source
    $npmVersion = Get-NpmVersion -Path $npmPath
    $nodeVersion = (Get-Item -LiteralPath $nodePath).VersionInfo.ProductVersion
    if ([string]::IsNullOrWhiteSpace($nodeVersion)) {
        throw "node.exe has no product version at $nodePath."
    }

    New-Item -ItemType Directory -Path $output | Out-Null

    if ($Control) {
        $file = $nodePath
        $arguments = @(
            '-e',
            'process.stdout.write(''ANCHOR_CONTROL_STDOUT\n''); process.stderr.write(''ANCHOR_CONTROL_STDERR\n''); process.exitCode = 7;'
        )
    } else {
        $file = $npmPath
        $arguments = @('run', 'prepublishOnly')
    }

    $started = [DateTime]::UtcNow
    $watch = [Diagnostics.Stopwatch]::StartNew()
    $process = Start-Process -FilePath $file -ArgumentList $arguments -WorkingDirectory $candidate -RedirectStandardOutput $stdout -RedirectStandardError $stderr -WindowStyle Hidden -PassThru
    $expired = $false
    while (-not $process.HasExited) {
        if ($watch.Elapsed -ge $cap) {
            $expired = $true
            Stop-ProcessTree -Identifier $process.Id
            break
        }

        Start-Sleep -Milliseconds 100
        $process.Refresh()
    }
    $process.WaitForExit()
    $process.Refresh()
    $watch.Stop()
    $native = $process.ExitCode
    $ended = [DateTime]::UtcNow
    if ($expired) {
        $exitCode = 124
    } else {
        $exitCode = $native
    }

    $record = [ordered]@{
        started = $started.ToString('o')
        ended = $ended.ToString('o')
        duration = [Math]::Round($watch.Elapsed.TotalMilliseconds)
        cap = [Math]::Round($cap.TotalSeconds)
        labels = @('exit-seven', 'redirected-markers')
        candidate = [ordered]@{
            path = $candidate
            head = $actualHead
            status = @($status)
        }
        toolchain = [ordered]@{
            node = [ordered]@{
                path = $nodePath
                version = $nodeVersion
            }
            npm = [ordered]@{
                path = $npmPath
                version = $npmVersion
            }
        }
        command = [ordered]@{
            file = $file
            arguments = @($arguments)
            working = $candidate
            process = $process.Id
        }
        result = [ordered]@{
            native = $native
            expired = $expired
            exit = $exitCode
        }
        logs = [ordered]@{
            stdout = $stdout
            stderr = $stderr
        }
    }
    $record | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $summary -Encoding UTF8
} finally {
    Set-Location -LiteralPath $originalLocation
    $ErrorActionPreference = $originalErrorActionPreference
    $ProgressPreference = $originalProgressPreference
}

exit $exitCode
