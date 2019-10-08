import fs from 'fs'
import path from 'path'
import useFsByAsync from './utils/useFsByAsync'

export default async function bulkDelete(dir: string, targetFileName: string, ignoreFolder?: string) {
    const files = fs.readdirSync(dir)
    await Promise.all(
        files.map(async filePath => {
            // if this is a folder, Recursive call it to handle the files from this folder;
            const fileOrFolderPath = path.resolve(dir, filePath)
            const isFolder = fs.lstatSync(fileOrFolderPath).isDirectory()
            if (isFolder && ignoreFolder !== fileOrFolderPath.toString()) {
                await bulkDelete(fileOrFolderPath, targetFileName, ignoreFolder)
                // if the file you want to delete exist
            } else if (new RegExp(targetFileName).test(filePath.toString())) {
                await useFsByAsync('unlink', path.resolve(dir, filePath))
            }
        }),
    )
}

// usage example
// bulkDelete('./', 'en-CA.ts', 'node_modules');
