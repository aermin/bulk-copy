# A files bulk curd lib

## usage example

> npm install bulk-curd-files --save-dev

```js
import { bulkCopy, bulkDelete } from 'bulk-curd-files';

//create fileB by copying fileA in bulk
bulkCopy(path.resolve(__dirname, './'), 'fileA.ts', 'fileB.ts');

//delete fileA exclude node_modules folder in bulk
bulkDelete('./', 'fileA.ts', 'node_modules');
```
