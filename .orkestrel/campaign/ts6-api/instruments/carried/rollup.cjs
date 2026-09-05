const { Extractor, ExtractorConfig } = require('/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/index.js')
const config = ExtractorConfig.loadFileAndPrepare(process.argv[2])
const result = Extractor.invoke(config, { localBuild: true, showVerboseMessages: false })
console.log(`succeeded=${result.succeeded} errors=${result.errorCount} warnings=${result.warningCount}`)
