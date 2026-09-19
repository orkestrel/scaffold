# Preserve raw patch evidence during whitespace review

Retain the source unit's staged evidence unchanged. The staging script copied and SHA256-verified all required artifacts, then its whole cached whitespace check flagged only the retained .patch files: literal context prefixes create space-before-tab and blank-line markers by patch syntax. This is evidence format, not source whitespace.

Run cached diff --check over the full staged change while excluding only .orkestrel/campaign/setup-vue-unit/setup-vue.patch and setup-vue-2.patch. Keep every source, guide, report, log and other artifact in the check. Do not trim or reformat the raw patches. Read the actual source diff and cached status before the source-unit commit. The full source acceptance gate remains the independent prepublishOnly exit0.
