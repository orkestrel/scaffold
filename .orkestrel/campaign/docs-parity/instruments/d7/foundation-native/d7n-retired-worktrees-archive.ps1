param(
	[Parameter(Mandatory = $true)]
	[ValidateSet('Archive', 'Verify', 'Remove')]
	[string]$Mode,
	[string]$ArchiveCommit,
	[string]$HashOverride
)

$ErrorActionPreference = 'Stop'
$canonical = 'C:/Users/mikes/WebstormProjects/scaffold'
$pass = "$canonical/tmp/pass"
$archiveRoot = "$canonical/.orkestrel/campaign/docs-parity/evidence/d7n-retired-worktrees-archive"
$validationRoot = "$pass/d7n-retired-worktrees-validation"
$targets = @(
	@{ Name = 'scaffold-guides-entry'; Path = "$pass/scaffold-guides-entry"; Head = '9b3003d14ca73c5218a7cb2a968f8b35600d3280'; Branch = 'claude/docs-parity-guides-entry-unit'; Paths = @('.claude/rules/documentation.md','guides/scaffold.md','host.json','package-lock.json','package.json','scripts/docs.ts','scripts/guides.ts','src/core/compilers.ts','src/core/constants.ts','src/server/Materializer.ts','src/server/types.ts','tests/distribution.test.ts','tests/guides.test.ts','tests/src/bin/CLI.test.ts','tests/src/core/compilers.test.ts','tests/src/core/fixtures/app-only-toolchain.txt','tests/src/core/fixtures/setup-false-manifest.txt','tests/src/core/fixtures/source-manifest.txt','tests/src/core/helpers.test.ts','tests/src/server/Materializer.test.ts','tests/src/server/helpers.test.ts') },
	@{ Name = 'scaffold-path'; Path = "$pass/scaffold-path"; Head = 'c87021bdc6367d27463139b293287a586de18240'; Branch = $null; Paths = @('.claude/rules/portability.md','host.json','tests/config.test.ts','tests/setup.ts','tests/setupPolicy.ts','tests/setupPolicy.test.ts') }
)

function Fail([string]$Message) { throw $Message }
function Git([string]$Path, [string[]]$Arguments) { & git -C $Path @Arguments; if ($LASTEXITCODE -ne 0) { Fail "git failed: $($Arguments -join ' ')" } }
function Hash([string]$Path) { (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant() }
function AssertSafePath([string]$Path) {
	$resolved = [IO.Path]::GetFullPath($Path)
	$base = [IO.Path]::GetFullPath($pass)
	if (-not $resolved.StartsWith($base + [IO.Path]::DirectorySeparatorChar, [StringComparison]::Ordinal)) { Fail "target escapes tmp/pass: $Path" }
	$current = Get-Item -LiteralPath $resolved -Force
	while ($true) {
		if (($current.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { Fail "reparse-point path refused: $($current.FullName)" }
		if ($current.FullName -eq $base) { break }
		$current = $current.Parent
		if ($null -eq $current) { Fail "target has no tmp/pass ancestor: $Path" }
	}
	return $resolved
}
function AssertNoReparse([string]$Path) {
	$current = Get-Item -LiteralPath $Path -Force
	while ($null -ne $current) {
		if (($current.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { Fail "reparse-point path refused: $($current.FullName)" }
		$current = $current.Parent
	}
}
function AssertCanonical() {
	if ((Git $canonical @('branch','--show-current') | Select-Object -Last 1) -ne 'main') { Fail 'canonical checkout is not on main.' }
}
function ExpectedStatus($Target) {
	if ($Target.Name -eq 'scaffold-guides-entry') { return @(' M .claude/rules/documentation.md',' M guides/scaffold.md',' M host.json',' M package-lock.json',' M package.json',' D scripts/docs.ts',' M src/core/compilers.ts',' M src/core/constants.ts',' M src/server/Materializer.ts',' M src/server/types.ts',' M tests/distribution.test.ts',' M tests/guides.test.ts',' M tests/src/bin/CLI.test.ts',' M tests/src/core/compilers.test.ts',' M tests/src/core/fixtures/app-only-toolchain.txt',' M tests/src/core/fixtures/setup-false-manifest.txt',' M tests/src/core/fixtures/source-manifest.txt',' M tests/src/core/helpers.test.ts',' M tests/src/server/Materializer.test.ts',' M tests/src/server/helpers.test.ts','?? scripts/guides.ts') }
	return @(' M .claude/rules/portability.md',' M host.json',' M tests/config.test.ts',' M tests/setup.ts',' M tests/setupPolicy.ts','?? tests/setupPolicy.test.ts')
}
function AssertTarget($Target) {
	AssertCanonical
	$path = AssertSafePath $Target.Path
	if (-not (Test-Path -LiteralPath (Join-Path $path '.git') -PathType Leaf)) { Fail "worktree .git file is absent: $path" }
	if ((Git $path @('rev-parse','HEAD') | Select-Object -Last 1) -ne $Target.Head) { Fail "HEAD changed: $($Target.Name)" }
	$branch = Git $path @('branch','--show-current') | Select-Object -Last 1
	if ($branch -ne $Target.Branch) { Fail "branch changed: $($Target.Name)" }
	$registration = @(Git $canonical @('worktree','list','--porcelain'))
	if ($registration -notcontains "worktree $path" -or $registration -notcontains "HEAD $($Target.Head)") { Fail "worktree registration changed: $($Target.Name)" }
	$common = Git $path @('rev-parse','--git-common-dir') | Select-Object -Last 1
	$commonPath = if ([IO.Path]::IsPathRooted($common)) { [IO.Path]::GetFullPath($common) } else { [IO.Path]::GetFullPath((Join-Path $path $common)) }
	if ($commonPath -ne [IO.Path]::GetFullPath((Join-Path $canonical '.git'))) { Fail "git common directory changed: $($Target.Name)" }
	$actual = @(Git $path @('status','--porcelain=v1','--untracked-files=all'))
	if ((Compare-Object (ExpectedStatus $Target) $actual)) { Fail "status population changed: $($Target.Name)" }
	& git -C $path diff --cached --quiet; if ($LASTEXITCODE -ne 0) { Fail "staged entries refused: $($Target.Name)" }
	foreach ($relative in $Target.Paths) { $source = Join-Path $path $relative; if (Test-Path -LiteralPath $source) { AssertNoReparse $source } }
	return $path
}
function ArchiveTarget($Target) {
	$path = AssertTarget $Target
	$directory = Join-Path $archiveRoot $Target.Name
	if (Test-Path -LiteralPath $directory) { Fail "archive destination exists: $directory" }
	New-Item -ItemType Directory -Path $directory | Out-Null
	AssertNoReparse $directory
	Set-Content -LiteralPath (Join-Path $directory '.gitattributes') -Value "* -text`n*.snapshot -text`n*.patch -text`n" -NoNewline
	$paths = $Target.Paths
	Git $path @('rev-parse','HEAD') | Set-Content -LiteralPath (Join-Path $directory 'head.txt') -NoNewline
	Git $path @('branch','--show-current') | Set-Content -LiteralPath (Join-Path $directory 'branch.txt') -NoNewline
	Git $path @('status','--porcelain=v1','--untracked-files=all') | Set-Content -LiteralPath (Join-Path $directory 'status.txt')
	Git $path @('ls-files','--stage') | Set-Content -LiteralPath (Join-Path $directory 'index.txt')
	foreach ($entry in @(@('combined',@('diff','HEAD','--binary','--full-index')), @('staged',@('diff','--cached','--binary','--full-index')), @('unstaged',@('diff','--binary','--full-index')))) {
		& git -C $path @($entry[1]) '--output' (Join-Path $directory "$($entry[0]).patch") '--' @paths
		if ($LASTEXITCODE -ne 0) { Fail "patch capture failed: $($Target.Name) $($entry[0])" }
	}
	$records = @()
	foreach ($relative in $paths) {
		$source = Join-Path $path $relative
		if (Test-Path -LiteralPath $source -PathType Leaf) {
			$snapshot = Join-Path $directory ($relative + '.snapshot')
			New-Item -ItemType Directory -Path (Split-Path -Parent $snapshot) -Force | Out-Null
			[IO.File]::WriteAllBytes($snapshot, [IO.File]::ReadAllBytes($source))
			$records += @{ path = $relative; state = 'present'; hash = Hash $snapshot }
		} else { $records += @{ path = $relative; state = 'deleted' } }
	}
	if ($records.Count -ne $paths.Count -or @($records.path | Sort-Object -Unique).Count -ne $paths.Count -or (Compare-Object ($paths | Sort-Object) ($records.path | Sort-Object))) { Fail "archive manifest population differs: $($Target.Name)" }
	if ($Target.Name -eq 'scaffold-guides-entry' -and (($records | Where-Object { $_.state -eq 'deleted' }).path -ne 'scripts/docs.ts')) { Fail 'deleted-path population differs from scripts/docs.ts.' }
	if ($records | Where-Object { $_.state -ne 'present' -and $_.state -ne 'deleted' }) { Fail "archive manifest state differs: $($Target.Name)" }
	$records | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $directory 'manifest.json') -NoNewline
	foreach ($patch in 'combined','staged','unstaged') { Hash (Join-Path $directory "$patch.patch") | Set-Content -LiteralPath (Join-Path $directory "$patch.sha256") -NoNewline }
	'archive completed' | Set-Content -LiteralPath (Join-Path $directory 'archive.log.txt')
}
function VerifyTarget($Target) {
	$path = AssertTarget $Target
	$directory = Join-Path $archiveRoot $Target.Name
	if (-not (Test-Path -LiteralPath $directory)) { Fail "archive is absent: $directory" }
	$attributes = Get-Content -LiteralPath (Join-Path $directory '.gitattributes') -Raw
	if ($attributes -notmatch '^\* -text' -or $attributes -notmatch '\*\.snapshot -text' -or $attributes -notmatch '\*\.patch -text') { Fail "archive attributes are absent: $($Target.Name)" }
	$records = Get-Content -LiteralPath (Join-Path $directory 'manifest.json') -Raw | ConvertFrom-Json
	if ((Get-Content -LiteralPath (Join-Path $directory 'head.txt') -Raw).Trim() -ne $Target.Head) { Fail "archived HEAD differs: $($Target.Name)" }
	if ((Get-Content -LiteralPath (Join-Path $directory 'branch.txt') -Raw).Trim() -ne $Target.Branch) { Fail "archived branch differs: $($Target.Name)" }
	if (Compare-Object (Get-Content -LiteralPath (Join-Path $directory 'status.txt')) (ExpectedStatus $Target)) { Fail "archived status differs: $($Target.Name)" }
	$liveIndex = @(Git $path @('ls-files','--stage'))
	if (Compare-Object (Get-Content -LiteralPath (Join-Path $directory 'index.txt')) $liveIndex) { Fail "archived index differs: $($Target.Name)" }
	if (@($records).Count -ne $Target.Paths.Count -or @($records.path | Sort-Object -Unique).Count -ne $Target.Paths.Count -or (Compare-Object ($Target.Paths | Sort-Object) ($records.path | Sort-Object))) { Fail "archive manifest population differs: $($Target.Name)" }
	if ($Target.Name -eq 'scaffold-guides-entry' -and (($records | Where-Object { $_.state -eq 'deleted' }).path -ne 'scripts/docs.ts')) { Fail 'deleted-path population differs from scripts/docs.ts.' }
	foreach ($record in $records) {
		$source = Join-Path $path $record.path
		if ($record.state -eq 'deleted') { if (Test-Path -LiteralPath $source) { Fail "deleted path returned: $($record.path)" }; continue }
		$snapshot = Join-Path $directory ($record.path + '.snapshot')
		$actual = Hash $source
		$saved = Hash $snapshot
		$expected = if ($HashOverride) { $HashOverride } else { $record.hash }
		if ($actual -ne $expected -or $saved -ne $expected) { Fail "snapshot hash differs: $($record.path)" }
	}
	foreach ($patch in 'combined','staged','unstaged') { if ((Hash (Join-Path $directory "$patch.patch")) -ne (Get-Content -LiteralPath (Join-Path $directory "$patch.sha256") -Raw)) { Fail "patch hash differs: $patch" } }
	if (-not (Test-Path -LiteralPath $validationRoot)) { New-Item -ItemType Directory -Path $validationRoot | Out-Null }
	AssertNoReparse $validationRoot
	$validation = Join-Path $validationRoot ("$($Target.Name)-" + [Guid]::NewGuid().ToString('N'))
	if (Test-Path -LiteralPath $validation) { Fail "validation destination exists: $validation" }
	New-Item -ItemType Directory -Path $validation -Force | Out-Null
	AssertNoReparse $validation
	foreach ($entry in @(@('combined',@('diff','HEAD','--binary','--full-index')), @('staged',@('diff','--cached','--binary','--full-index')), @('unstaged',@('diff','--binary','--full-index')))) {
		$live = Join-Path $validation "$($entry[0]).patch"
		& git -C $path @($entry[1]) '--output' $live '--' @($Target.Paths)
		if ($LASTEXITCODE -ne 0) { Fail "validation patch capture failed: $($Target.Name) $($entry[0])" }
		if ((Hash $live) -ne (Hash (Join-Path $directory "$($entry[0]).patch"))) { Fail "live patch differs: $($Target.Name) $($entry[0])" }
	}
	& git -C $canonical merge-base --is-ancestor $Target.Head HEAD; if ($LASTEXITCODE -ne 0) { Fail "retired head is not reachable: $($Target.Name)" }
	Write-Output "verified $($Target.Name)"
}

if ($Mode -eq 'Archive') { foreach ($target in $targets) { ArchiveTarget $target } }
if ($Mode -eq 'Verify') { foreach ($target in $targets) { VerifyTarget $target } }
if ($Mode -eq 'Remove') {
	if ([string]::IsNullOrWhiteSpace($ArchiveCommit)) { Fail 'Remove requires an explicit archive commit.' }
	foreach ($target in $targets) { VerifyTarget $target }
	& git -C $canonical merge-base --is-ancestor $ArchiveCommit origin/main; if ($LASTEXITCODE -ne 0) { Fail 'archive commit is not on origin/main.' }
	foreach ($target in $targets) {
		$directory = ".orkestrel/campaign/docs-parity/evidence/d7n-retired-worktrees-archive/$($target.Name)"
		$records = Get-Content -LiteralPath (Join-Path $archiveRoot "$($target.Name)/manifest.json") -Raw | ConvertFrom-Json
		foreach ($record in $records) {
			$snapshot = "$directory/$($record.path).snapshot"
			$blob = @(Git $canonical @('ls-tree','-r',$ArchiveCommit,'--',$snapshot))
			if ($blob.Count -ne 1) { Fail "archive commit omits snapshot: $snapshot" }
			if ($record.state -eq 'present') {
				$archiveHash = Hash (Join-Path $archiveRoot "$($target.Name)/$($record.path).snapshot")
				$blobHash = ($blob[0] -split '\s+')[2]
				$written = @(Git $canonical @('hash-object',(Join-Path $archiveRoot "$($target.Name)/$($record.path).snapshot"))) | Select-Object -Last 1
				if ($blobHash -ne $written -or $archiveHash -ne $record.hash) { Fail "archive blob differs: $snapshot" }
			}
		}
		$path = AssertTarget $target
		VerifyTarget $target
		& git -C $canonical worktree remove --force $path; if ($LASTEXITCODE -ne 0) { Fail "worktree removal failed: $($target.Name)" }
		if (Test-Path -LiteralPath $path) { Fail "removed worktree remains: $($target.Name)" }
		if (@(Git $canonical @('worktree','list','--porcelain')) -contains "worktree $path") { Fail "removed worktree remains registered: $($target.Name)" }
		Write-Output "removed $($target.Name)"
	}
	AssertCanonical
}
