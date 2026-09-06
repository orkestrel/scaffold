const RULE = {
  meta: { messages: { first: 'comment reported by node', second: 'comment reported by loc' } },
  create(context) {
    return {
      Program() {
        const comments = context.sourceCode.getAllComments()
        const shapes = comments.map((c) => ({ type: c.type, keys: Object.keys(c).join(','), value: String(c.value).slice(0, 30) }))
        console.error('COMMENTS ' + JSON.stringify(shapes))
        for (const comment of comments) {
          try { context.report({ node: comment, messageId: 'first' }) } catch (error) { console.error('REPORT-BY-NODE threw: ' + String(error).slice(0, 120)) }
          try { context.report({ loc: comment.loc, messageId: 'second' }) } catch (error) { console.error('REPORT-BY-LOC threw: ' + String(error).slice(0, 120)) }
        }
      },
    }
  },
}
export default { meta: { name: 'probe' }, rules: { comment: RULE } }
