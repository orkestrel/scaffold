```diff
-/** The last complete authorized roster, or `undefined` before one arrives or after clear. */
+/** The last complete authorized roster, or `undefined` before one arrives, after a session start, or after clear. */

 /**
  * Begin or restart the roster subscription for a newly adopted session.
  *
  * @returns Nothing; consumption continues in the owned asynchronous loop
+ * @remarks
+ * Adopting a session discards the retained snapshot and departure memory before the new stream
+ * begins.
  */
```

```diff
- * @returns An operator holding a same-origin client, an empty stack, and an empty feed.
+ * @returns An operator holding a same-origin client, an empty roster, an empty stack, and an empty feed.

- * reads one stack, one feed, and one subscription, and unmounting the application releases them.
+ * shares one stack, one feed, one roster, and their subscriptions, and unmounting the application
+ * releases them.
```

```diff
  * @param failure - The typed `AUTH` refusal that ended the roster stream
  * @returns Nothing; the composition root owns the resulting session transition
+ * @remarks
+ * The handler must not throw; a thrown error escapes the owned consumption loop and rejects the
+ * joined destroy.
```

```text
 M app/browser/factories.ts
 M app/browser/types.ts
```