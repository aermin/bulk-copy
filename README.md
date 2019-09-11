# A files bulk copy lib

## usage example

npm install bulk-copy --save-dev

`with gulp:`

```js
import { readFiles } from 'bulk-copy';

gulp.task('copy-fileA-as-fileB', async () => {
await readFiles(path.resolve(\_\_dirname, ''), 'fileA.ts', 'fileB.ts');
});
```
