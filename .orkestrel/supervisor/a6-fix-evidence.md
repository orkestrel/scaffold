# A6-fix review brief evidence (generated)

```
6f9423f A6 fix: the stream's end demands a read that starts after it
(clean tree; diff below is bdb5d7c..6f9423f)
```

```diff
diff --git a/app/browser/controllers/Operator.ts b/app/browser/controllers/Operator.ts
index 58b767b..879a401 100644
--- a/app/browser/controllers/Operator.ts
+++ b/app/browser/controllers/Operator.ts
@@ -492,6 +492,9 @@ export class Operator implements OperatorInterface {
 			if (generation === this.#generation) this.#live.value = false
 		}
 		if (!closed || signal.aborted || generation !== this.#generation) return
+		const reading = this.#reading
+		if (reading !== undefined) await reading
+		if (signal.aborted || generation !== this.#generation) return
 		await this.refresh()
 	}
 
diff --git a/guides/src/supervisor.md b/guides/src/supervisor.md
index 6b815b9..ede432c 100644
--- a/guides/src/supervisor.md
+++ b/guides/src/supervisor.md
@@ -1948,24 +1948,29 @@ inspects the workflow, restores that
 workflow's stored view, replays the durable tail into the feed, and subscribes. Nothing polls: the
 operator re-inspects when a settlement observation arrives on the stream, when that stream ends
 cleanly under a current generation, after a command a component issued, and on an explicit
-`refresh`; two triggers that fire at once join one read rather than racing two. Every open takes the next of one monotonically increasing generation instead of a
-lock, so two overlapping opens end with the later one owning the state and work suspended across an
-await writes nothing once its generation is stale. `ended` and `fault` are exclusive claims about one
-run: once a snapshot has been read, a later `ABSENT` answer on any route — the tail, a re-inspect, or
-the subscription itself — is the run's durable end, and the retained rows keep rendering as an ended
-run instead of reporting a workflow that cannot be found. An `ABSENT` answer with no prior success is
-an ordinary refusal and is shown as one.
+`refresh`; ordinary triggers that fire at once join one read rather than racing two. A clean stream
+end is the exception: it waits for any read already in flight and then calls `refresh` again, so the
+end never joins a read that began before it was observed. Every open takes the next of one
+monotonically increasing generation instead of a lock, so two overlapping opens end with the later
+one owning the state and work suspended across an await writes nothing once its generation is stale.
+`ended` and `fault` are exclusive claims about one run: once a snapshot has been read, a later
+`ABSENT` answer on any route — the tail, a re-inspect, or the subscription itself — is the run's
+durable end, and the retained rows keep rendering as an ended run instead of reporting a workflow
+that cannot be found. An `ABSENT` answer with no prior success is an ordinary refusal and is shown as
+one.
 
 `terminal` and `ended` are different facts and neither implies the other. `terminal` is read from the
 retained snapshot's own workflow status, so it follows every inspect the operator takes and no second
 copy of it can drift: a run whose snapshot is terminal attaches no live subscription, and the
 interface renders a finished run rather than an idle one. A run that finishes while the viewer is
-open is reported from the inspect its own stream ending asks for, because that ending is the only
-announcement such a run makes — the settlement observation before it lands while the workflow is
-still running. `ended` says durable
-state disappeared after a snapshot had already been read. A run that finished normally is
-`terminal`; a run whose retained state was later removed is `ended`; a run that was already terminal
-when it was opened is never reported missing on either count.
+open is reported from the post-end inspect its own stream ending guarantees: the end waits for an
+earlier read to finish, rechecks that its generation still owns the view, and asks again. That read
+therefore starts after the end was observed, or joins a read that necessarily started after it. The
+ending is the only announcement such a run makes — the settlement observation before it lands while
+the workflow is still running. `ended` says durable state disappeared after a snapshot had already
+been read. A run that finished normally is `terminal`; a run whose retained state was later removed
+is `ended`; a run that was already terminal when it was opened is never reported missing on either
+count.
 
 The reader's session is one field, and the whole interface gates on its presence rather than on a
 companion boolean that could disagree with it. `identify` asks the server once as the interface
diff --git a/tests/app/browser/controllers/Operator.test.ts b/tests/app/browser/controllers/Operator.test.ts
index ad78c82..727b3e0 100644
--- a/tests/app/browser/controllers/Operator.test.ts
+++ b/tests/app/browser/controllers/Operator.test.ts
@@ -815,6 +815,30 @@ describe('Operator', () => {
 		expect(operator.stack.rows()[0]?.id).toBe(WORKFLOW)
 	})
 
+	it('starts a post-close inspect after an in-flight pre-terminal read drains', async () => {
+		const client = new ScriptedClient({
+			answers: [
+				success(createApplicationSnapshot()),
+				success(createApplicationSnapshot()),
+				success(FINISHED),
+			],
+		})
+		const operator = attach(client, new MemoryOperatorStore())
+		await operator.open('build')
+		client.stall()
+		const reading = operator.refresh()
+		await client.stalled
+
+		client.end()
+		await waitForBrowserState(() => !operator.live)
+		client.proceed()
+		await reading
+		await waitForDelay()
+
+		expect(client.inspects).toEqual(['build', 'build', 'build'])
+		expect(operator.terminal).toBe(true)
+	})
+
 	// The other end of the same stream: a subscription the reader released ends identically, and an
 	// answer read for it would describe a view that is already gone.
 	it('reads nothing further when the reader releases the subscription instead of the run ending it', async () => {
```
