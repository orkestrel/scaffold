$path = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-guide-heading-scout.jsonl'
$events = Get-Content -LiteralPath $path -Encoding Unicode
$result = $events | Where-Object { $_ -match '"type":"result"' } | Select-Object -Last 1
if ($null -eq $result) { throw 'Result event missing' }
$event = $result | ConvertFrom-Json
$event.session_id
$event.result
