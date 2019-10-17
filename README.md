# A files bulk curd lib

`node version` >= 8.0.0

## usage example

> npm install bulk-curd-files --save-dev

```js
import { bulkCopy, bulkDelete } from 'bulk-curd-files';

//create fileB by copying fileA in bulk
await bulkCopy('./', 'fileA.ts', 'fileB.ts');

//delete fileA exclude node_modules folder in bulk
await bulkDelete('./', 'fileA.ts', 'node_modules');
```
