# Correct recovery receipt addressing

Keep the builder role and prior authority. The returned resume-next-pack.sh is rejected and retained before execution. Create resume-next-pack-verified.sh as its corrected successor and write its correction report; do not edit the retained predecessor or run the body.

Read the actual receipt directories before editing. Original final-visit action receipts are named d7n-<package>-next-final-<action>.exit.txt, not <action>.exit.txt. Audit, lock, ci and format use those action names and must equal0. Original prepublish uses that same prefix and must equal1. Catalog, guide-mirror and tooling are direct receipt names and must equal0. Offline overwrite uses the prefixed name and must equal1, not0; its exact required refusal is in tmp/pass/d7n-<package>-next-final-overwrite/action.stderr.txt. Require the same literal refusal used by finish-next-layer-native-final.sh. Do not reinterpret the expected refusal as a success code.

Add the missing canonical manifest name/version checks using read-package-field.mjs, as the original brief requires. Remove the unused pack variable. Preserve current metadata/diff/index binding, unique output, independent retained failure, actual pack exit and final captures. No other behavior changes. Syntax-check only. Write d7n-next-resume-pack-correction-report.md and return the exact changed source.
