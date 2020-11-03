import {
    asmPtr, def32, def8, defStr,
} from './memory';
import * as codeDict from './primitives';
import { DEBUG, NULL } from './constants';
import { Primitive, Ptr } from './types';

export const codeKeys = Object.keys(codeDict);
export const codeTable = Object.values<Primitive>(codeDict);

export const asBool = (b: boolean): number => (b ? -1 : 0);

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
