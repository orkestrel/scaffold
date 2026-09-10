$ErrorActionPreference = 'Stop'

$scaffold = 'C:/Users/mikes/WebstormProjects/scaffold'
$pass = "$scaffold/tmp/pass"
$reading = "$pass/d7n-initial-published-reading"
$output = "$pass/d7n-initial-registry-confirm-final"
$packages = @(
	@{ Name = 'contract'; Version = '0.0.17' },
	@{ Name = 'codec'; Version = '0.0.3' },
	@{ Name = 'msg'; Version = '0.0.10' },
	@{ Name = 'sse'; Version = '0.0.7' },
	@{ Name = 'test'; Version = '0.0.14' }
)

function Fail([string]$Message) { throw $Message }
function Hash([string]$Path, [string]$Algorithm) { (Get-FileHash -LiteralPath $Path -Algorithm $Algorithm).Hash.ToLowerInvariant() }
function ReadPackage([string]$Name, [string]$Version) {
	$stdout = Join-Path $reading ("registry-" + $Name + '.stdout.txt')
	$exit = Join-Path $reading ("registry-" + $Name + '.exit.txt')
	if (-not (Test-Path -LiteralPath $stdout -PathType Leaf) -or -not (Test-Path -LiteralPath $exit -PathType Leaf)) { Fail "registry reading is absent: $Name" }
	if ((Get-Content -LiteralPath $exit -Raw).Trim() -ne '0') { Fail "registry reading did not exit zero: $Name" }
	$value = Get-Content -LiteralPath $stdout -Raw | ConvertFrom-Json
	$entries = if ($value -is [Array]) { $value } else { @($value) }
	$entry = @($entries | Where-Object { $_.name -eq "@orkestrel/$Name" -and $_.version -eq $Version })
	if ($entry.Count -ne 1) { Fail "registry package object differs: $Name" }
	if ($null -eq $entry[0].dist -or [string]::IsNullOrWhiteSpace($entry[0].dist.tarball) -or [string]::IsNullOrWhiteSpace($entry[0].dist.shasum)) { Fail "registry dist fields are absent: $Name" }
	return $entry[0]
}

if (Test-Path -LiteralPath $output) { Fail "evidence output exists: $output" }
if (-not (Test-Path -LiteralPath $reading -PathType Container)) { Fail "registry reading directory is absent: $reading" }
New-Item -ItemType Directory -Path $output | Out-Null
$results = @()
foreach ($package in $packages) {
	$entry = ReadPackage $package.Name $package.Version
	$uri = [Uri]$entry.dist.tarball
	if ($uri.Scheme -ne 'https' -or $uri.Host -ne 'registry.npmjs.org' -or $uri.AbsolutePath -ne "/@orkestrel/$($package.Name)/-/$($package.Name)-$($package.Version).tgz") { Fail "registry tarball URL differs: $($package.Name)" }
	$archive = "$pass/packed/d7n-$($package.Name)-publish-final/orkestrel-$($package.Name)-$($package.Version).tgz"
	if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) { Fail "accepted archive is absent: $($package.Name)" }
	$download = Join-Path $output "orkestrel-$($package.Name)-$($package.Version).tgz"
	Invoke-WebRequest -UseBasicParsing -TimeoutSec 60 -Uri $uri.AbsoluteUri -OutFile $download
	$downloadedSha1 = Hash $download 'SHA1'
	$downloadedSha256 = Hash $download 'SHA256'
	$acceptedSha256 = Hash $archive 'SHA256'
	if ($downloadedSha1 -ne $entry.dist.shasum.ToLowerInvariant()) { Fail "registry SHA1 differs: $($package.Name) expected $($entry.dist.shasum) found $downloadedSha1" }
	if ($downloadedSha256 -ne $acceptedSha256) { Fail "archive SHA256 differs: $($package.Name) accepted $acceptedSha256 downloaded $downloadedSha256" }
	$repository = "C:/Users/mikes/WebstormProjects/$($package.Name)"
	$branch = & git.exe -C $repository branch --show-current
	if ($LASTEXITCODE -ne 0 -or $branch -ne 'main') { Fail "canonical branch differs: $($package.Name)" }
	$head = & git.exe -C $repository rev-parse HEAD
	if ($LASTEXITCODE -ne 0) { Fail "canonical HEAD is absent: $($package.Name)" }
	$status = @(& git.exe -C $repository status --porcelain=v1 --untracked-files=all)
	if ($LASTEXITCODE -ne 0 -or $status.Count -ne 0) { Fail "canonical status differs: $($package.Name)" }
	$result = [ordered]@{ name = $entry.name; version = $entry.version; url = $uri.AbsoluteUri; registrySha1 = $entry.dist.shasum; downloadedSha1 = $downloadedSha1; downloadedSha256 = $downloadedSha256; acceptedArchiveSha256 = $acceptedSha256; equal = $true; branch = $branch; head = $head; status = $status }
	$result | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $output "$($package.Name).json") -NoNewline
	$results += $result
	Write-Output "confirmed $($package.Name)"
}
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $output 'result.json') -NoNewline
