$ErrorActionPreference = 'Stop'

$fleet = 'C:/Users/mikes/WebstormProjects'
$pass = Join-Path (Join-Path (Join-Path $fleet 'scaffold') 'tmp') 'pass'
$output = Join-Path $pass 'd7n-upper-registry-confirm-closed'
$packages = @(
	@{ Name = 'browser'; Version = '0.0.16'; Head = '02611821d50b0508b237684455944cccda31f696'; Hash = '28a804f938d4c81f4829997cd04c255fd320bfeda70dea79ce0b4c8c6a9fff23'; Label = 'd7n-browser-final-registry-visit-pack' },
	@{ Name = 'interpret'; Version = '0.0.13'; Head = 'a3928145fac315c3b8ef43e53ebffc4442a49286'; Hash = 'c4bbca7ccf749f977b7d8548e07fe1aae056ee921b6209027bc57895ceefa3c4'; Label = 'd7n-interpret-final-registry-visit-pack' },
	@{ Name = 'lsp'; Version = '0.0.7'; Head = 'd6543822b6c88201a96af0293123b2c3c60dc6b8'; Hash = '09335ae7bd72220582b421340330c3567ab637381b7c0aef5de9cad36422741e'; Label = 'd7n-lsp-registry-docs-pack' },
	@{ Name = 'qualifier'; Version = '0.0.14'; Head = 'c10f4c8661b753f8b6eaf8caf96fe0fbb47ef158'; Hash = '00d13ca3b44ab1bd3dc9818800a1b949c9c73698b67f94a16f76c81b6637926b'; Label = 'd7n-qualifier-final-registry-visit-pack' },
	@{ Name = 'queue'; Version = '0.0.13'; Head = '02df755da2b8dc8f324dfb58849504187ceab580'; Hash = '30fdbec1c29c15cb7b9dfe32e39748fa09bee3626e45147409a1f96a65c9db30'; Label = 'd7n-queue-final-registry-visit-pack' },
	@{ Name = 'rater'; Version = '0.0.14'; Head = '394b1d6c014255847d45627d4a1b5708c5b2a14e'; Hash = '739f2f710e554e39370496294b1c01b0e167490c77a83639524375043c39bcd5'; Label = 'd7n-rater-final-registry-visit-pack' },
	@{ Name = 'relation'; Version = '0.0.12'; Head = '1b212ca725e6b7f6b0d1fd5b664b05cc6769d27f'; Hash = 'b6fe2e1a7f00956f137a1a6056c2fb6b2d68b43cc90e7a09cd3d965c138e83c5'; Label = 'd7n-relation-final-registry-visit-pack' },
	@{ Name = 'sea'; Version = '0.0.15'; Head = 'bfbccc215f50d7867ac5b79785da80c607f4fc7a'; Hash = '05dc0366438e87cb74f2cc2b8023689a40417bc6050bbdebabe2ae7094fd625a'; Label = 'd7n-sea-final-registry-visit-pack' },
	@{ Name = 'server'; Version = '0.0.19'; Head = '772b84e1a5ce0f3ec8cb1da96395b3c6bc6029e7'; Hash = '5a9416835c44943290c340434964cb704c088efa44e31a27b5ef4db60a469d5a'; Label = 'd7n-server-final-registry-visit-pack' },
	@{ Name = 'terminal'; Version = '0.0.15'; Head = 'd9eba22ddf3c3a68ea2e1f006e617a1efdb8ffe2'; Hash = '69045041b111f6b97dd75f5542b4c23eb2efffa9fc66d7c92bb4140f85ec082e'; Label = 'd7n-terminal-final-registry-visit-pack' },
	@{ Name = 'workspace'; Version = '0.0.8'; Head = 'defd09e0ef8ad0bbfd44979c0d9b86257b883773'; Hash = '07213a52d3a66a92a98ceda2873fa5179504ccc5c681f737f25dda624bb0e6a0'; Label = 'd7n-workspace-final-registry-visit-pack' }
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
