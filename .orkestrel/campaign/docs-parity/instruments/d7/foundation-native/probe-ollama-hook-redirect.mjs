import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { once } from 'node:events'

const bash = 'C:/Users/mikes/scoop/apps/git/current/bin/bash.exe'
const script = '/c/Users/mikes/WebstormProjects/scaffold/scripts/ollama.sh'

async function inspectResponse(label, redirected) {
  const paths = []
  const server = createServer((request, response) => {
    paths.push(request.url)
    request.resume()
    response.setHeader('Content-Type', 'application/json')
    if (request.url === '/api/version') {
      response.end(JSON.stringify({ version: 'fixture' }))
    } else if (request.url === '/api/show') {
      response.statusCode = redirected === 'pull' ? 404 : 200
      response.end('{}')
    } else if (request.url === '/api/pull') {
      response.statusCode = redirected === 'pull' ? 302 : 200
      response.setHeader('Location', '/redirected-pull')
      response.end(JSON.stringify({ status: 'success' }))
    } else if (request.url === '/api/chat') {
      response.statusCode = redirected === 'chat' ? 302 : 200
      response.setHeader('Location', '/redirected-chat')
      response.end(JSON.stringify({ done: true }))
    } else {
      response.statusCode = 500
      response.end('{}')
    }
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  if (address === null || typeof address === 'string') throw new Error('Fixture address is absent')
  const child = spawn(bash, [script], {
    env: { ...process.env, OLLAMA_HOST: `http://127.0.0.1:${address.port}`, OLLAMA_MODEL: 'fixture-model' },
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 20000,
  })
  let stdout = ''
  let stderr = ''
  child.stdout.setEncoding('utf8').on('data', (value) => { stdout += value })
  child.stderr.setEncoding('utf8').on('data', (value) => { stderr += value })
  const [code, signal] = await once(child, 'close')
  server.close()
  await once(server, 'close')
  console.log(JSON.stringify({ label, code, signal, paths, stdout, stderr }))
  assert.equal(signal, null)
  assert.ok(paths.includes('/api/chat') || redirected === 'pull')
  return code
}

assert.equal(await inspectResponse('completed response control', undefined), 0)
const chat = await inspectResponse('redirected chat', 'chat')
const pull = await inspectResponse('redirected pull', 'pull')
assert.notEqual(chat, 0, 'A redirected chat response must not report readiness')
assert.notEqual(pull, 0, 'A redirected pull response must not report completion')
