$ErrorActionPreference = 'Stop'

$fleet = 'C:/Users/mikes/WebstormProjects'
$pass = Join-Path (Join-Path (Join-Path $fleet 'scaffold') 'tmp') 'pass'
$output = Join-Path $pass 'd7n-agent-probe-registry-confirm-closed'
$packages = @(
	@{ Name = 'agent'; Version = '0.0.21'; Head = '188ff5152d3878d274ac845b0845cd079c4d2232'; Hash = 'c0bdf531097696a6b048d42552912664e6b2ae4c564e217e4e78990f68577b58'; Label = 'd7n-agent-final-registry-visit-pack' },
	@{ Name = 'probe'; Version = '0.0.13'; Head = '22eca15dce31021b222dfa8652a01d2bb2c56dfe'; Hash = '8fa05fa2962fec81ca31bfa9fbd3d8e468b7a2f638f63309add17efd9e3724b0'; Label = 'd7n-probe-final-registry-visit-pack' }
)
function Fail([string]$Message) { throw $Message }
function Hash([string]$Path, [string]$Algorithm) { (Get-FileHash -LiteralPath $Path -Algorithm $Algorithm).Hash.ToLowerInvariant() }
function Git([string]$Target, [string]$Name, [string[]]$Arguments) {
	$stdout = Join-Path $output "$Name.stdout.txt"
	$stderr = Join-Path $output "$Name.stderr.txt"
	& git.exe -C $Target @Arguments > $stdout 2> $stderr
	$status = $LASTEXITCODE
	Set-Content -LiteralPath (Join-Path $output "$Name.exit.txt") -Value $status -NoNewline
	if ($status -ne 0) { Fail "git command failed: $Name" }
	$value = Get-Content -LiteralPath $stdout -Raw -Encoding utf8
	if ($null -eq $value) {
		return ''
	}
	return $value.Trim()
}
if (Test-Path -LiteralPath $output) { Fail "evidence output exists: $output" }
New-Item -ItemType Directory -Path $output | Out-Null
$results = @()
try {
foreach ($package in $packages) {
	$uri = [Uri]("https://registry.npmjs.org/@orkestrel%2f" + $package.Name + '/latest')
	$metadata = Join-Path $output "$($package.Name).metadata.json"
	Invoke-WebRequest -UseBasicParsing -TimeoutSec 60 -Uri $uri.AbsoluteUri -OutFile $metadata
	$entry = Get-Content -LiteralPath $metadata -Raw -Encoding utf8 | ConvertFrom-Json
	if ($entry.name -ne "@orkestrel/$($package.Name)" -or $entry.version -ne $package.Version) { Fail "registry identity differs: $($package.Name)" }
	if ($entry.gitHead -ne $package.Head) { Fail "registry git head differs: $($package.Name)" }
	$archiveUri = [Uri]$entry.dist.tarball
	if ($archiveUri.Scheme -ne 'https' -or $archiveUri.Host -ne 'registry.npmjs.org' -or $archiveUri.AbsolutePath -ne "/@orkestrel/$($package.Name)/-/$($package.Name)-$($package.Version).tgz") { Fail "registry tarball URL differs: $($package.Name)" }
	$archive = Join-Path (Join-Path (Join-Path $pass 'packed') $package.Label) ("orkestrel-" + $package.Name + '-' + $package.Version + '.tgz')
	if ((Hash $archive 'SHA256') -ne $package.Hash) { Fail "accepted archive hash differs: $($package.Name)" }
	$download = Join-Path $output "$($package.Name).tgz"
	Invoke-WebRequest -UseBasicParsing -TimeoutSec 60 -Uri $archiveUri.AbsoluteUri -OutFile $download
	$sha1 = Hash $download 'SHA1'
	$sha256 = Hash $download 'SHA256'
	if ($sha1 -ne $entry.dist.shasum.ToLowerInvariant() -or $sha256 -ne $package.Hash) { Fail "registry archive differs: $($package.Name)" }
	$target = Join-Path $fleet $package.Name
	Git $target "$($package.Name)-fetch" @('fetch','origin') | Out-Null
	$branch = Git $target "$($package.Name)-branch" @('branch','--show-current')
	$head = Git $target "$($package.Name)-head" @('rev-parse','HEAD')
	$origin = Git $target "$($package.Name)-origin-main" @('rev-parse','origin/main')
	$statusText = Git $target "$($package.Name)-status" @('status','--porcelain=v1','--untracked-files=all')
	$status = @($statusText -split "`r?`n" | Where-Object { $_.Length -gt 0 })
	$manifest = Get-Content -LiteralPath (Join-Path $target 'package.json') -Raw -Encoding utf8 | ConvertFrom-Json
	if ($manifest.name -ne "@orkestrel/$($package.Name)" -or $manifest.version -ne $package.Version) { Fail "canonical manifest differs: $($package.Name)" }
	if ($branch -ne 'main' -or $head -ne $package.Head -or $origin -ne $package.Head -or $status.Count -ne 0) { Fail "canonical state differs: $($package.Name)" }
	$result = [ordered]@{ name = $entry.name; version = $entry.version; url = $archiveUri.AbsoluteUri; registrySha1 = $entry.dist.shasum; downloadedSha1 = $sha1; downloadedSha256 = $sha256; acceptedArchiveSha256 = $package.Hash; gitHead = $entry.gitHead; branch = $branch; head = $head; originMain = $origin }
	$result | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $output "$($package.Name).json") -NoNewline
	$results += $result
	Write-Output "confirmed $($package.Name)"
}
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $output 'result.json') -NoNewline
} catch {
	[ordered]@{ error = $_.Exception.Message } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $output 'failure.json') -NoNewline
	throw
}
