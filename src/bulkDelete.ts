import * as fs from 'fs'
import * as path from 'path'
import util from 'util'

const unlink = util.promisify(fs.unlink)
const readdir = util.promisify(fs.readdir)
const lstat = util.promisify(fs.lstat)

export default async function bulkDelete(dir: string, targetFileName: string, ignoreFolder?: string) {
    const files = await readdir(dir)
    await Promise.all(
        files.map(async filePath => {
            // if this is a folder, Recursive call it to handle the files from this folder;
            const fileOrFolderPath = path.resolve(dir, filePath)
            const isFolder = (await lstat(fileOrFolderPath)).isDirectory()
            if (isFolder && ignoreFolder !== fileOrFolderPath.toString()) {
                await bulkDelete(fileOrFolderPath, targetFileName, ignoreFolder)
                // if the file you want to delete exist
            } else if (new RegExp(targetFileName).test(filePath.toString())) {
                await unlink(path.resolve(dir, filePath))
            }
        }),
    )
}

// usage example
// bulkDelete('./', 'en-CA.ts', 'node_modules');
