$ErrorActionPreference = 'Stop'

$fleet = 'C:/Users/mikes/WebstormProjects'
$pass = Join-Path (Join-Path (Join-Path $fleet 'scaffold') 'tmp') 'pass'
$output = Join-Path $pass 'd7n-dependent-registry-confirm-closed'
$packages = @(
	@{ Name = 'brief'; Version = '0.0.8'; Head = '5cc84a937c929a2d84961353871346107d1ef066'; Hash = 'ad1afafe3d5d4a3f40c81d2597a5c0a2439b2d73cf79bb0a37dd12debddc819f'; Label = 'd7n-brief-final-registry-visit-pack' },
	@{ Name = 'mcp'; Version = '0.0.29'; Head = '45ba0a4b5741a79f32500479de9549c0e6a17839'; Hash = '0a9a407c083aa9f4907d93e03fac095d9254a4f57d930fdfd5a3df364d09a97e'; Label = 'd7n-mcp-final-registry-visit-pack' },
	@{ Name = 'middleware'; Version = '0.0.20'; Head = 'af01ea39388c05da52fb954476cac0ba423a5f23'; Hash = '03a520c6773a8c5e9797aef8ce5c02417d9bb2358f2a905d91ed8ed068dcac42'; Label = 'd7n-middleware-final-registry-visit-pack' },
	@{ Name = 'program'; Version = '0.0.13'; Head = 'f474b0aa1e8ab0565c8fe0f818ec816e7c5052cb'; Hash = '14531aac23bcadacb11b2d344591f58e3f0ed8ff0ccc895864906d69448c7201'; Label = 'd7n-program-final-registry-visit-pack' },
	@{ Name = 'worker'; Version = '0.0.12'; Head = '4df117583143117a21b23246b27b6addd42ef0b9'; Hash = '046e323e3b3488db028f7fac65875a9a1e2c56d981bc11592292a99a1666511d'; Label = 'd7n-worker-final-registry-visit-pack' },
	@{ Name = 'workflow'; Version = '0.0.18'; Head = '0789593a6ab1b2905b16fd2f95a5b30e700888c5'; Hash = 'f7b89c454aa2b63a267479c87a2a33ff9d69ddd02793137cc00b382cfa3073e5'; Label = 'd7n-workflow-final-registry-visit-pack' }
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
