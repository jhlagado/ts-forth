import { mem } from './memory';
import { Ptr } from './types';

export let asmPtr = 0;

export const origin = (value: Ptr): Ptr => {
    asmPtr = value;
    return asmPtr;
};

export const def32 = (num: number): Ptr => {
    const result = asmPtr;
    mem.setUint32(asmPtr, num);
    asmPtr += 4;
    return result;
};

export const def16 = (num: number): Ptr => {
    const result = asmPtr;
    mem.setUint16(0, num);
    asmPtr += 2;
    return result;
};

export const def8 = (num: number): Ptr => {
    const result = asmPtr;
    mem.setUint8(0, num);
    asmPtr += 1;
    return result;
};

export const defStr = (str: string): Ptr => {
    const result = asmPtr;
    const bytes = new TextEncoder().encode(str);
    const length = bytes.length;
    for (let i = 0; i < length; i++) {
        mem.setUint8(asmPtr++, bytes[i]);
    }
    return result;
};

export const defSpace = (num: number): Ptr => {
    const result = asmPtr;
    asmPtr += num;
    return result;
};

