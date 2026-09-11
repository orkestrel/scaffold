$ErrorActionPreference = 'Stop'

$fleet = 'C:/Users/mikes/WebstormProjects'
$pass = Join-Path (Join-Path (Join-Path $fleet 'scaffold') 'tmp') 'pass'
$output = Join-Path $pass 'd7n-following-registry-confirm-closed'
$packages = @(
	@{ Name = 'console'; Version = '0.0.13'; Head = 'ed57bc7eb00649288ea261cc041d1b12f7b77fb0'; Hash = 'baba0c5e17f61a824315c372d07b24e9972646c20a0f9b17fa7f91e36da6c8ce'; Label = 'd7n-console-following-final-pack' },
	@{ Name = 'database'; Version = '0.0.14'; Head = '4453c2606b585f47664314d20bba22bdf81cba40'; Hash = '6ae5d922703fd82b0cf892d18866061231386a4015ccceb093ba5ba6cc5d6acf'; Label = 'd7n-database-following-final-pack' },
	@{ Name = 'form'; Version = '0.0.6'; Head = '0f4f28d27f3246ad755a9472960c464eed48889d'; Hash = '5bf36761245b2c37d72e32cfbc1e70d920ccb71c61d87b7aea923ebf20e78ae3'; Label = 'd7n-form-following-final-pack' },
	@{ Name = 'markdown'; Version = '0.0.14'; Head = '99978d80dd2b677edd4195e71b9acd5bb7d89610'; Hash = 'ba59ba76ca61aac72805fb0dc2b7dae6765a673f4befce528cbf139e2000b6b7'; Label = 'd7n-markdown-following-final-pack' },
	@{ Name = 'pool'; Version = '0.0.11'; Head = '25ea973b1c6def0a16d3101ade2e334f75e1d636'; Hash = '7c8bb72cac44a7fbabedcc2bf931b69454c22b8b6a388e446fa022e751712251'; Label = 'd7n-pool-following-final-pack' },
	@{ Name = 'process'; Version = '0.0.11'; Head = 'ea3b717f2f8cff21cf3fa3d7a44e8c03296b34ee'; Hash = 'a67016fff3149884371dc87d179eaf0a73710a3636b05e4e9481f69d95c3ab37'; Label = 'd7n-process-following-final-pack' },
	@{ Name = 'reason'; Version = '0.0.10'; Head = 'e7e318ef62fc60e692123929660d874999e797d6'; Hash = 'be0ce5507c77bb5595d28ee1933e7ff00b3f2d98c8740690297f724db279d122'; Label = 'd7n-reason-following-final-pack' },
	@{ Name = 'router'; Version = '0.0.14'; Head = 'fbc69d71bddb38bfceb980aa9b524a2008e9fb35'; Hash = 'bdbb9fca154a608015c3ec74449d81b606de4acf5805c4321b8b1cd2a1e0baed'; Label = 'd7n-router-following-final-pack' },
	@{ Name = 'table'; Version = '0.0.5'; Head = 'f4805ea314a19fae5be86b7038ae2a2a70af55c3'; Hash = '4c639cb91c59a02c195cef88777bca59ef79e39a66791fd68c54db97b707b9c5'; Label = 'd7n-table-following-final-pack' },
	@{ Name = 'template'; Version = '0.0.7'; Head = 'c053c4d5e54cf93f886dc4618f9bc3bf45162de7'; Hash = '5864b22be5739f5d97d01ddc8d2e5561b88baa0a8fd9326158ceb0674470badc'; Label = 'd7n-template-following-final-pack' },
	@{ Name = 'websocket'; Version = '0.0.12'; Head = 'cc62597214e1deb3a892119fbdc484772079bc5c'; Hash = '0e14c051df9175f6d488c93dc1ce8fee31203fda98f9e1b40817d9c88382f794'; Label = 'd7n-websocket-following-final-pack' }
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
