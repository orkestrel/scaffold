$ErrorActionPreference = 'Stop'

$fleet = 'C:/Users/mikes/WebstormProjects'
$pass = Join-Path (Join-Path (Join-Path $fleet 'scaffold') 'tmp') 'pass'
$output = Join-Path $pass 'd7n-next-registry-confirm-closed'
$packages = @(
	@{ Name = 'abort'; Version = '0.0.10'; Head = '3dddab98f6df54fda88633b85f94d0efbefab56b'; Hash = 'd8a1f0d4e7948eb577f88befe08c0c11465a76022ace907df5091b09a653b9ff'; Label = 'd7n-abort-next-final-pack' },
	@{ Name = 'budget'; Version = '0.0.10'; Head = '625e743207db65b3fb8aa5dc0cbdf5507b1abd34'; Hash = '8a8cb35a625dad235f3290b9e7723f608507bccb70cfa6b73580e76b74ed0762'; Label = 'd7n-budget-next-final-pack' },
	@{ Name = 'csv'; Version = '0.0.7'; Head = 'b9e989391762a564004b3aaa45c4e5477b0d5b40'; Hash = 'f095d20b6062f1e8baf9430d04d0a2c43337d81eacf02ddd424ac36f019a18e0'; Label = 'd7n-csv-next-final-pack' },
	@{ Name = 'emitter'; Version = '0.0.10'; Head = 'fe7e689475719aa6f64fa2298de295e0e99c52ce'; Hash = '8c76ceef3eb53b1d9ed61107cace0dfc85a10fad95638907c8a05a37c62ab9bd'; Label = 'd7n-emitter-next-final-pack' },
	@{ Name = 'html'; Version = '0.0.9'; Head = 'aa08eb19f7e6883917dbefe97c90926f1677b7ed'; Hash = 'ff22bcf20f80ba37fa7dbe7199592395b0806158b12a9bb30a73f6c2afe4f604'; Label = 'd7n-html-next-final-pack' },
	@{ Name = 'indexeddb'; Version = '0.0.11'; Head = 'cb179f6c085e44c8a56f25db8398bd54b7c00a29'; Hash = '35368fe77e5403dea0c547b6e9f981ed5ba5811f792cb406ccc0238699b96603'; Label = 'd7n-indexeddb-next-final-pack' },
	@{ Name = 'ndjson'; Version = '0.0.10'; Head = 'a35c40cb7045cfe11e29c1f48e70860fb3169e4c'; Hash = '1476e71fb2620ac1c4d149b918767580af401b766233ba7cb1c62005fe7268f5'; Label = 'd7n-ndjson-next-final-alone-pack' },
	@{ Name = 'sqlite'; Version = '0.0.11'; Head = 'f2ffc0acfeeb5123ffc32552552f6b60b911f108'; Hash = 'e65036940568b21509d88d17fdb6bb3224f4b87b108ba6840bb84afd60c12063'; Label = 'd7n-sqlite-next-final-pack' },
	@{ Name = 'timeout'; Version = '0.0.10'; Head = 'a058b1f274df3ba5e63d11f99fb7fb2a0d936710'; Hash = 'ac3fbe2c886d0831db3dcc2329ebed6362f78f2e89ec581ce7ff950884366a53'; Label = 'd7n-timeout-next-final-pack' },
	@{ Name = 'tool'; Version = '0.0.14'; Head = '4761097860243d86c4154e95edd0d4dcce11da8c'; Hash = '772dbda52330fd4a5cb50e86e97bffbd3b362b1d75dc0ddb61fe7a177d5da1ec'; Label = 'd7n-tool-next-final-alone-pack' }
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
	$value = Get-Content -LiteralPath $stdout -Raw
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
	$entry = Get-Content -LiteralPath $metadata -Raw | ConvertFrom-Json
	if ($entry.name -ne "@orkestrel/$($package.Name)" -or $entry.version -ne $package.Version) { Fail "registry identity differs: $($package.Name)" }
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
	$manifest = Get-Content -LiteralPath (Join-Path $target 'package.json') -Raw | ConvertFrom-Json
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
