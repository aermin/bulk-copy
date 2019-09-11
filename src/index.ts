import fs from 'fs'

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
                // if the file you want to copy exist
                // &&  (if ingnore the existing file || if the file exist, don't cover it)
            } else if (
                new RegExp(originFileName).test(filePath.toString()) &&
                (alsoReplaceExistFile || !fs.existsSync(path.resolve(dir, targetFileName)))
            ) {
                fs.readFile(path.resolve(dir, filePath), 'utf8', (err, content) => {
                    if (err) {
                        throw err
                    }
                    // tslint:disable-next-line: no-shadowed-variable
                    fs.writeFile(`${dir}/${targetFileName}`, content, err => {
                        if (err) {
                            throw err
                        }
                    })
                })
            }
        }),
    )
}

export { readFiles }
