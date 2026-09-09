# Installed artifact for Scaffold's corrected Guide adoption

Read this with d7n-scaffold-api-rules-adopt-brief.md. Work only in canonical
C:/Users/mikes/WebstormProjects/scaffold. Root completed installation and mirror
refresh before dispatch; no role installs or edits Guide.

The archive is
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/packed/d7n-guide-api-rules/orkestrel-guide-0.0.18.tgz.
Its SHA256 is 9a64d5e4f264301f0d1a9434d7cdc18617c971a9ccbff9f98f9060ac21a4295a.
The runtime overlay carries Contract ^0.0.17 and Markdown ^0.0.14. Root restored
Guide's canonical manifest and lock to their pre-pack hashes after packing.

The actual Guide core/server JavaScript and declarations match the canonical build,
archive and installed Scaffold dependency. The artifact comparison at c60e91
exited 0; its record is tmp/pass/d7n-guide-api-rules-artifact/artifact.json.
The installed server export resolved normally and exposed GuideCommand.
The server JavaScript SHA256 is
f0b37cdb4499ee1a40f62d16209f295840e738413cabadb56e1c6e9f8cfb8517.
The server declaration SHA256 is
a7921e72912d7a950555ad6ec8b0cb9b028b0e3f1f2caeee142fc95755b71356.

Root's ordered Guide gates exited 0 at c8d071, with actual logs under
tmp/pass/d7n-guide-api-rules-gates. Root's whole-project TypeScript check exited 0
at 0c7872; the scoped server run exited 0 at 070489. The changing-getter probe
exited 0 at 3ed94b and reported false for the failed result. These readings establish
the dependency candidate, not the still-unimplemented Scaffold adoption.

Installation at 84cdef exited 0 and preserved Scaffold's working manifest, lock
and staged metadata. The supported mirror refresh at b75268 exited 0 and wrote
guides/guide.md. Do not edit that mirror manually. The owner toolchain edits remain
present and must be preserved for root's later accepted product commit.

The Guide writer's immutable result is tmp/units/d7n-guide-api-rules-fix-report.md.
The public contracts are installed under node_modules/@orkestrel/guide/dist/src.
Follow the successor adoption brief, not its predecessor's raw-options design.
Scaffold still has createParity and its local command helpers before this unit;
their failures against the new artifact are the scheduled adoption, not an unknown
dependency failure. Guide's own native-entry adoption remains a later unit.
