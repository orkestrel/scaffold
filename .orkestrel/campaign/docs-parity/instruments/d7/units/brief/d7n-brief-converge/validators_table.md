A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.

| API | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `isText` | const | `string` | Checks whether the value is a string holding no line terminator, empty included. |
| `isLine` | const | `string` | Checks whether the value is a non-empty string holding no line terminator. |
| `isTaskOperation` | const | `TaskOperation` | Checks whether the value is one of the `TaskOperation` literals. |
| `isTaskDomain` | const | `TaskDomain` | Checks whether the value is one of the `TaskDomain` literals. |
| `isOutputFormat` | const | `OutputFormat` | Checks whether the value is one of the `OutputFormat` literals. |
| `isRiskSeverity` | const | `RiskSeverity` | Checks whether the value is one of the `RiskSeverity` literals. |
| `isTask` | const | `Task` | Checks whether the value is a well-formed `Task` — both vocabularies closed, statement one line. |
| `isReference` | const | `Reference` | Checks whether the value is a well-formed `Reference` — both members required, both single-line. |
| `isManifest` | const | `Manifest` | Checks whether the value is a well-formed `Manifest`. |
| `isOutcome` | const | `Outcome` | Checks whether the value is a well-formed `Outcome` — `rank` a positive integer. |
| `isGiven` | const | `Given` | Checks whether the value is a well-formed `Given` — its `value` may be empty but stays one line. |
| `isExample` | const | `Example` | Checks whether the value is a well-formed `Example`. |
| `isCitation` | const | `Citation` | Checks whether the value is a well-formed `Citation` — every member single-line. |
| `isGap` | const | `Gap` | Checks whether the value is a well-formed `Gap`. |
| `isRisk` | const | `Risk` | Checks whether the value is a well-formed `Risk` — `severity` on the closed vocabulary. |
| `isOutput` | const | `Output` | Checks whether the value is a well-formed `Output` — `format` on the closed vocabulary. |
| `isProof` | const | `Proof` | Checks whether the value is a well-formed `Proof`. |
| `isBrief` | const | `Brief` | Checks whether the value satisfies the whole exact-record `Brief` contract. |
