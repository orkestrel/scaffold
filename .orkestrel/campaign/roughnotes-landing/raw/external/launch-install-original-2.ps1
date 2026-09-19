param([switch]$Check)
$ErrorActionPreference='Stop'
Set-StrictMode -Version Latest
$root='C:\Users\mikes\WebstormProjects\roughnotes'
$scratch='C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918'
$run=Join-Path $scratch 'original-registry-install-20260918'
$node='C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe'
$npm=Join-Path (Split-Path $node -Parent) 'node_modules\npm\bin\npm-cli.js'
$expected='57b738fd38d4553d0f4f6a31ff4fb1030432a389'
$codex=@('.codex/agents/orkestrel.toml','.codex/hooks.json')
function Git([string[]]$Arguments){$out=@(& git -C $root @Arguments);if($LASTEXITCODE -ne 0){throw "Git failed: $($Arguments -join ' ')"};return $out}
function Snapshot(){return @{head=(Git @('rev-parse','HEAD'));status=(Git @('status','--porcelain=v1'));index=(Git (@('ls-files','-s','--')+$codex));hashes=@('package.json','package-lock.json')+$codex|%{ @{path=$_;sha256=(Get-FileHash (Join-Path $root $_) -Algorithm SHA256).Hash } } }}
if((Resolve-Path $root).Path -ne $root -or (Git @('rev-parse','--show-toplevel')).Trim() -ne $root -or (Git @('branch','--show-current')).Trim() -ne 'main' -or (Git @('rev-parse','HEAD')).Trim() -ne $expected){throw 'Original admission failed'}
$before=Snapshot
if((@($before.status)-join"`n")-cne(@('A  .codex/agents/orkestrel.toml','A  .codex/hooks.json')-join"`n")){throw 'Original status admission failed'}
if(Test-Path $run){throw 'Install evidence exists'}
if($Check){Write-Output 'Original install admission passed before output creation.';exit 0}
New-Item -ItemType Directory -Path $run -ErrorAction Stop|Out-Null
$before|ConvertTo-Json -Depth 6|Set-Content (Join-Path $run 'before.json') -Encoding utf8
$out=Join-Path $run 'npm.stdout.log.txt';$err=Join-Path $run 'npm.stderr.log.txt'
$p=Start-Process -FilePath $node -ArgumentList @($npm,'ci','--ignore-scripts','--no-audit','--no-fund') -WorkingDirectory $root -RedirectStandardOutput $out -RedirectStandardError $err -WindowStyle Hidden -PassThru;$handle=$p.Handle;Write-Output "npm PID $($p.Id)"
if(-not$p.WaitForExit(300000)){& "$env:SystemRoot\System32\taskkill.exe" /PID $p.Id /T /F;$exit=124}else{$p.WaitForExit();$exit=$p.ExitCode};$p.Dispose();if($exit-ne0){@{success=$false;exit=$exit}|ConvertTo-Json|Set-Content (Join-Path $run 'terminal.json');exit $exit}
$ls=& $node $npm ls '@orkestrel/scaffold' '@orkestrel/test' '--depth=0' '--json';if($LASTEXITCODE-ne0){throw 'npm ls failed'};$packages=$ls|ConvertFrom-Json;if($packages.dependencies.'@orkestrel/scaffold'.version-ne'0.0.75'-or$packages.dependencies.'@orkestrel/test'.version-ne'0.0.18'){throw 'Installed versions differ'}
if((Get-FileHash (Join-Path $root 'node_modules\@orkestrel\scaffold\.codex\config.toml') -Algorithm SHA256).Hash-ne'C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076'){throw 'Public config digest differs'}
$after=Snapshot;$after|ConvertTo-Json -Depth 6|Set-Content (Join-Path $run 'after.json') -Encoding utf8;if(($before|ConvertTo-Json -Depth 6)-cne($after|ConvertTo-Json -Depth 6)){throw 'Original preservation drift'};@{success=$true;pid=$p.Id;handle=$handle}|ConvertTo-Json|Set-Content (Join-Path $run 'terminal.json')
