import { asmPtr, def32, def8, defStr } from './memory';
import { codeKeys } from './primitives';
import { DEBUG, NULL } from './constants';
import { Ptr } from './types';

export const LIT = (n: number): number => n;

export const PRIMITIVE = (key: string): Ptr => {
    const ptr = asmPtr;
    def32(codeKeys.indexOf(key), `word: ${key}`);
    return ptr;
};

export const THREAD = (key: string, ...body: number[]): Ptr => {
    const ptr = PRIMITIVE(key);
    for (const item of body) {
        def32(item, `${item}`);
    }
    return ptr;
};

let prevPtr = NULL;
export const HEADER = (cfa: Ptr, flags: number, name: string): Ptr => {
    const ptr = asmPtr;
    if (DEBUG) console.log(`header: ${name} starts: ${ptr}`);
    def32(prevPtr, 'link');
    def32(cfa, 'cfa');
    prevPtr = ptr;
    def32(flags, 'flags');
    def8(name.length, 'name length');
    defStr(name, 'name');
    return ptr;
};
