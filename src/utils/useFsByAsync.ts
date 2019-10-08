import fs from 'fs'

export default function useFsByAsync(fsEventName: string, fistArg: string, secondArg?: any) {
    return new Promise((resolve, reject) => {
        if (fs.hasOwnProperty(fsEventName) && typeof fs[fsEventName] === 'function') {
            fs[fsEventName](fistArg, secondArg, (err: any, buffer: unknown) => {
                if (err) {
                    reject(err)
                }
                resolve(buffer)
            })
        }
        reject('fs[fsEventName] is invalid!')
    })
}
