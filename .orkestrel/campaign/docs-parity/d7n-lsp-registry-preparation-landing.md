# LSP registry preparation landing

LSP's registry preparation commit d2c5e0299e87aad1b08252b09fe9e243c4f1dbdb is pushed to the campaign branch. The canonical checkout remains on that branch until release closure.

Root ran prepare-lsp-registry.sh with d7n-lsp-final-registry-visit to exit 0. Online overwrite and audit passed. The supported sweep removed scripts/docs.ts and scripts/metamodel.sh under the owner's scripts-ownership instruction. The final manifest removes scripts.docs and retains the direct native test:guides entry. The own LSP guide and authored guides test hashes remained unchanged.

Final registry install resolved Guide0.0.18 and Scaffold0.0.64. Their installed distributions match the registry-confirmed accepted archives. Full prepublishOnly and actual packing passed. The archive SHA256 is 09335ae7bd72220582b421340330c3567ab637381b7c0aef5de9cad36422741e. Packed manifest and complete dist match canonical. The fetched LSP0.0.6 baseline differs materially, and runtime pin movement independently requires pending0.0.7.

Independent and reused objective release reviews, final release commit, main push and local main selection remain pending. No upload ran.
