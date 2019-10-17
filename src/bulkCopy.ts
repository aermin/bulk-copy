import * as fs from 'fs'
import * as path from 'path'
import util from 'util'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const lstat = util.promisify(fs.lstat)
const exists = util.promisify(fs.exists)

export default async function bulkCopy(
    dir: string,
    originFileName: string,
    targetFileName: string,
    alsoReplaceExistFile: boolean = false,
) {
    const files = await readdir(dir)
    await Promise.all(
        files.map(async filePath => {
            const fileOrFolderPath = path.resolve(dir, filePath)
            // if this is a folder, Recursive call it to handle the files from this folder;
            const isFolder = (await lstat(fileOrFolderPath)).isDirectory()
            if (isFolder) {
                await bulkCopy(fileOrFolderPath, originFileName, targetFileName, alsoReplaceExistFile)
                // if the file you want to copy exist
                // &&  (if ignore the existing file || if the file exist, don't cover it)
            } else {
                const fileExist = await exists(path.resolve(dir, targetFileName))
                if (new RegExp(originFileName).test(filePath.toString()) && (alsoReplaceExistFile || !fileExist)) {
                    const content = await readFile(fileOrFolderPath, 'utf8')
                    await writeFile(`${dir}/${targetFileName}`, content)
                }
            }
        }),
    )
}

// bulkCopy('./', 'originFileName.js', 'targetFileName.js')
