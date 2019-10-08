import fs from 'fs'
import path from 'path'
import useFsByAsync from './utils/useFsByAsync'

export default async function bulkCopy(
    dir: string,
    originFileName: string,
    targetFileName: string,
    alsoReplaceExistFile: boolean = false,
) {
    const files = fs.readdirSync(dir)
    await Promise.all(
        files.map(async filePath => {
            const fileOrFolderPath = path.resolve(dir, filePath)
            // if this is a folder, Recursive call it to handle the files from this folder;
            const isFolder = fs.lstatSync(fileOrFolderPath).isDirectory()
            if (isFolder) {
                await bulkCopy(fileOrFolderPath, originFileName, targetFileName, alsoReplaceExistFile)
                // if the file you want to copy exist
                // &&  (if ingnore the existing file || if the file exist, don't cover it)
            } else if (
                new RegExp(originFileName).test(filePath.toString()) &&
                (alsoReplaceExistFile || !fs.existsSync(path.resolve(dir, targetFileName)))
            ) {
                const content = await useFsByAsync('readFile', fileOrFolderPath, 'utf8')
                await useFsByAsync('writeFile', `${dir}/${targetFileName}`, content)
            }
        }),
    )
}
