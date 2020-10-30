import { def32, def8, defStr } from './asm';
import { codeKeys } from './code';
import { NULL } from './constants';
import { Ptr } from './types';
import { getHerePtr } from './vm';

export const LIT = (n: number): number => n;

export const PRIMITIVE = (key: string): Ptr => {
    const ptr = getHerePtr();
    def32(codeKeys.indexOf(key));
    return ptr;
};

export const THREAD = (key: string, body: number[]): Ptr => {
    const ptr = PRIMITIVE(key);
    for (const item of body) {
        def32(item);
    }
    return ptr;
};

let prevPtr = NULL;
export const HEADER = (cfa: Ptr, flags: number, name: string): void => {
    const ptr = getHerePtr();
    def32(cfa);
    def32(prevPtr);
    prevPtr = ptr;
    def32(flags);
    def8(name.length);
    defStr(name);
};
