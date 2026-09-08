const [stdout, stderr, code] = process.argv.slice(2)
process.stdout.write(stdout ?? '')
process.stderr.write(stderr ?? '')
process.exitCode = Number(code ?? '0')
