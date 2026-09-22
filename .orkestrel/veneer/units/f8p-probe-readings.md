# F8p IMPORT-FORM probe readings (Orchestrator, host, 2026-09-22, tailwindcss 4.3.3 through @tailwindcss/postcss)

## Pass 1 (automatic source detection on; the directory scan reached the probe script itself, so pass 2 isolates the forms)

    {
     "builtClassNames": 527,
     "measuredShared": 209,
     "shippedShared": 16,
     "shippedSharedNames": [
      "caption-top",
      "col-1",
      "col-10",
      "col-11",
      "col-12",
      "col-2",
      "col-3",
      "col-4",
      "col-5",
      "col-6",
      "col-7",
      "col-8",
      "col-9",
      "col-auto",
      "container",
      "table"
     ]
    }
    {
     "label": "composable-txt",
     "bytes": 1417,
     "layerStatements": [
      "theme, reset, base, elements, components, utilities"
     ],
     "layerBlocks": [
      "theme",
      "utilities"
     ],
     "emitted": {
     },
     "sharedEmitted": 16,
     "sharedMissing": []
    }
    {
     "label": "composable-css",
     "bytes": 1417,
     "layerStatements": [
      "theme, reset, base, elements, components, utilities"
     ],
     "layerBlocks": [
      "theme",
      "utilities"
     ],
     "emitted": {
     },
     "sharedEmitted": 16,
     "sharedMissing": []
    }
    {
     "label": "composable-excluded",
     "bytes": 441,
     "layerStatements": [
      "theme, reset, base, elements, components, utilities"
     ],
     "layerBlocks": [

## Pass 2 (source(none); each @source form in isolation)

    none-composable bytes 144 layers  produced 0 emitted 
    txt-composable bytes 1079 layers utilities produced 17 emitted container,table,col-1,col-auto,caption-top
    css-composable bytes 144 layers  produced 0 emitted 
    txt-excluded bytes 144 layers  produced 0 emitted 
    txt-full bytes 5609 layers theme,base,utilities produced 17 emitted container,table,col-1,col-auto,caption-top
    inline-only bytes 634 layers theme,utilities produced 3 emitted gap-0,container,px-8

## Pass 3 (the oracle inventory and a gitignored candidates file as sources)

    inventory produced 242 of measured shared 209 caption-bottom false container true
    ignored-dir produced 17 of measured shared 16 caption-bottom true container true
    ignored-dirpath produced 17 of measured shared 16 caption-bottom true container true
