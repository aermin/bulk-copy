import fs, { promises as promiseFs } from 'fs'

import path from 'path'

async function readFiles(
    dir: string,
    originFileName: string,
    targetFileName: string,
    alsoReplaceExistFile: boolean = false,
) {
    const files = fs.readdirSync(dir)
    await Promise.all(
        files.map(async filePath => {
            // if this is a folder, Recursive call it to handle the files from this folder;
            const isFolder = fs.lstatSync(path.resolve(dir, filePath)).isDirectory()
            if (isFolder) {
                await readFiles(path.resolve(dir, filePath), originFileName, targetFileName, alsoReplaceExistFile)
                // 是否存在被拷贝的文件 && (是否要忽略已存在的文件 || 要生成的文件是否已存在(存在就不会覆盖)
            } else if (
                new RegExp(originFileName).test(filePath.toString()) &&
                (alsoReplaceExistFile || !fs.existsSync(path.resolve(dir, targetFileName)))
            ) {
                const content = await promiseFs.readFile(path.resolve(dir, filePath), 'utf8')
                await promiseFs.writeFile(`${dir}/${targetFileName}`, content)
            }
        }),
    )
}

export { readFiles }
