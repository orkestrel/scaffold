# Scaffold entry candidate version

Prepare scaffold 0.0.64 for the accepted entry change. Root queried the public npm
registry at 2026-09-09T00:23Z with:

    node C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js view @orkestrel/scaffold version versions --json

The command exited 0. The version response is 0.0.63 and the returned version history
does not contain 0.0.64. This is a registry reading, not a reserved version or upload.

The entry change replaces a public path constant and moves the vendored host inventory.
It therefore requires a scaffold bump independently of development dependency updates.
The source writer does not own version or lock edits. Root performs preparation after
the source returns, preserves primary owner edits and refreshes registry availability
before a final pack or release decision. Later corrections may replace this unpublished
candidate without consuming another version. Publication remains held by the owner.
