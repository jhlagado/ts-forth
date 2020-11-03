import {
    MEM_START, MEM_SIZE, CELL, DEBUG,
} from './constants';
import { Ptr } from './types';

export const buffer = new ArrayBuffer(MEM_SIZE);
export const mem = new DataView(buffer);

export let asmPtr = MEM_START;

export const setAsmPtr = (value: Ptr): void => {
    asmPtr = value;
};

export const def8 = (value: number, info: string): Ptr => {
    const result = asmPtr;
    if (DEBUG) console.log(`${info} starts: ${result} value: ${value}`);
    mem.setUint8(0, value);
    setAsmPtr(asmPtr + 1);
    return result;
};

export const def16 = (value: number, info: string): Ptr => {
    const result = asmPtr;
    if (DEBUG) console.log(`${info} starts: ${result} value: ${value}`);
    mem.setUint16(0, value);
    setAsmPtr(asmPtr + 2);
    return result;
};

export const def32 = (value: number, info: string): Ptr => {
    const result = asmPtr;
    if (DEBUG) console.log(`${info} starts: ${result} value: ${value}`);
    mem.setUint32(asmPtr, value);
    setAsmPtr(asmPtr + 4);
    return result;
};

export const defStr = (str: string, info: string): Ptr => {
    const result = asmPtr;
    if (DEBUG) console.log(`${info} starts: ${result} size: ${str.length}`);
    const bytes = new TextEncoder().encode(str);
    const { length } = bytes;
    for (let i = 0; i < length; i++) {
        mem.setUint8(asmPtr, bytes[i]);
        setAsmPtr(asmPtr + 1);
    }
    return result;
};

export const defSpace = (size: number, info: string): Ptr => {
    const result = asmPtr;
    if (DEBUG) console.log(`${info} starts: ${result} size: ${size} cells: ${size / CELL}`);
    setAsmPtr(asmPtr + size);
    return result;
};
