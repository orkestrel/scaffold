# Retain discovery evidence in the consumer's reporter

Act as sol in the existing setup Vue unit. Keep the original scope and source repair frozen. The parent rebuilt and ran the exact consumer command. The generated Chromium test exited0 with1 passed, but the outer distribution test fails because its child uses --reporter=dot and the dot output omits setup:browser and the test path.

Change only the new child Vitest command's reporter to `--reporter=verbose`, preserving the assertions that prove the selected project and paired proof path. Do not remove discovery assertions or loosen them to installation success. The source artifact needs no rebuild for this test-harness-only correction.

Record the parent run in tmp/setup-vue-consumer-green.log.txt as an instrument failure with the successful inner consumer result, not as the final green. Run scoped format/lint for the touched test and return. Do not run the install-dependent command; the parent will replay it. No other source changes, installs, commits or new scope.
