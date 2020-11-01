import { codeKeys } from './code';
import { NULL } from './constants';
import { asmPtr, setAsmPtr } from './globals';
import { mem } from './memory';
import { Ptr } from './types';

export const def32 = (num: number): Ptr => {
    const result = asmPtr;
    mem.setUint32(asmPtr, num);
    setAsmPtr(asmPtr + 4);
    return result;
};

export const def16 = (num: number): Ptr => {
    const result = asmPtr;
    mem.setUint16(0, num);
    setAsmPtr(asmPtr + 2);
    return result;
};

export const def8 = (num: number): Ptr => {
    const result = asmPtr;
    mem.setUint8(0, num);
    setAsmPtr(asmPtr + 1);
    return result;
};

export const defStr = (str: string): Ptr => {
    const result = asmPtr;
    const bytes = new TextEncoder().encode(str);
    const length = bytes.length;
    for (let i = 0; i < length; i++) {
        mem.setUint8(asmPtr, bytes[i]);
        setAsmPtr(asmPtr + 1)
    }
    return result;
};

export const defSpace = (num: number): Ptr => {
    const result = asmPtr;
    setAsmPtr(asmPtr + num)
    return result;
};

export const LIT = (n: number): number => n;

export const PRIMITIVE = (key: string): Ptr => {
    const ptr = asmPtr;
    def32(codeKeys.indexOf(key));
    return ptr;
};

export const THREAD = (key: string, ...body: number[]): Ptr => {
    const ptr = PRIMITIVE(key);
    for (const item of body) {
        def32(item);
    }
    return ptr;
};

let prevPtr = NULL;
export const HEADER = (cfa: Ptr, flags: number, name: string): Ptr => {
    const ptr = asmPtr;
    def32(cfa);
    def32(prevPtr);
    prevPtr = ptr;
    def32(flags);
    def8(name.length);
    defStr(name);
    return ptr;
};
