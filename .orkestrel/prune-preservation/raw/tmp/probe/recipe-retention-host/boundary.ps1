$instrument = Join-Path -Path $PSScriptRoot -ChildPath '..\..\release\retain-stage-capture-recipe.ps1'
. $instrument -Prepare

$input = Join-Path -Path $PSScriptRoot -ChildPath 'boundary-input.md'
$output = Join-Path -Path $PSScriptRoot -ChildPath 'boundary-output.md'
$failure = Join-Path -Path $PSScriptRoot -ChildPath 'boundary-failed-reading.txt'
$index = Join-Path -Path $PSScriptRoot -ChildPath 'index-output.md'
$canonicalPath = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\units\capture-recipe-brief-3.md'
$candidatePath = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75\tmp\units\capture-recipe-report-3.md'
$sourceContext = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75'
$text = [string]::Join([Environment]::NewLine, @(
    $canonicalPath,
    'C:/Users/mikes/WebstormProjects/scaffold/tmp/units/capture-recipe-brief-3.md',
    $candidatePath,
    'tmp/units/capture-recipe-report-3.md',
    'tmp/units/capture-recipe-evidence-3/',
    $sourceContext,
    'tmp/units/r-b-report-11.md',
    'tmp/units/capture-recipe-report-30.md'
))
[System.IO.File]::WriteAllText($input, $text, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllLines($failure, @(
    '/.orkestrel/campaign/capture-recipe-unit/capture-recipe-brief-3.md',
    '/tmp/release/scaffold-0.0.75'
), [System.Text.UTF8Encoding]::new($false))
$result = Get-MarkdownTransform -Path $input -Mappings $mappings
[System.IO.File]::WriteAllText($output, $result.Text, [System.Text.UTF8Encoding]::new($false))
$report = 'C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75\tmp\units\capture-recipe-report-3.md'
$actual = Get-MarkdownTransform -Path $report -Mappings $mappings
$expected = @(
    '.orkestrel/campaign/capture-recipe-unit-2/capture-recipe-brief-3.md',
    '.orkestrel/campaign/capture-recipe-unit-2/capture-recipe-report-3.md',
    '.orkestrel/campaign/capture-recipe-unit-2/capture-recipe-evidence-3/'
)
foreach ($value in $expected) {
    if ($result.Text -notmatch [regex]::Escape($value)) {
        throw "The retained mapping is absent: $value"
    }
}

foreach ($value in @($sourceContext, 'tmp/units/r-b-report-11.md', 'tmp/units/capture-recipe-report-30.md')) {
    if ($result.Text -notmatch [regex]::Escape($value)) {
        throw "The boundary control changed: $value"
    }
}

if ($actual.Text -notmatch [regex]::Escape($sourceContext.Replace('\', '/'))) {
    throw 'The selected report changed the source checkout context.'
}

if ($result.Text -match '(?m)^/\.orkestrel') {
    throw 'A retained target has a leading slash.'
}

[string[]]$indexRows = @('# Probe index', '', '| Source report | Reference |', '| --- | --- |')
[string[]]$probeUnresolvedRows = @(
    '',
    '## Unresolved references',
    '',
    'These references remain intact. They identify cross-unit dependencies for the parent ruling.',
    '',
    '| Source report | Reference |',
    '| --- | --- |'
) + @($unresolved | ForEach-Object { [string]::Format('| `{0}` | `{1}` |', $_.Source, $_.Reference) })
[System.IO.File]::WriteAllLines($index, $indexRows, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::AppendAllLines($index, $probeUnresolvedRows, [System.Text.UTF8Encoding]::new($false))
Get-Content -LiteralPath $index
