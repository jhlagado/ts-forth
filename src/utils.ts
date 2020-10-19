import { codeKeys } from './code';
import { NULL, Ptr } from './constants';
import { getHerePtr, writeInt32, writeInt8, writeStr } from './vm';

export const LIT = (n: number): number => n;

export const PRIMITIVE = (key: string): Ptr => {
    const ptr = getHerePtr();
    writeInt32(codeKeys.indexOf(key));
    return ptr;
};

export const THREAD = (key: string, body: number[]): Ptr => {
    const ptr = PRIMITIVE(key);
    for (const item of body) {
        writeInt32(item);
    }
    return ptr;
};

let prevPtr = NULL;
export const HEADER = (cfa: Ptr, flags: number, name: string): void => {
    const ptr = getHerePtr();
    writeInt32(cfa);
    writeInt32(prevPtr);
    prevPtr = ptr;
    writeInt32(flags);
    writeInt8(name.length);
    writeStr(name);
};
