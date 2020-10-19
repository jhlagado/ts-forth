/* eslint-disable prefer-const */
import { MEM_SIZE, Ptr, PSTACK, RSTACK, CELL } from './constants';

export let psp: Ptr = PSTACK;
export let rsp: Ptr = RSTACK; /* stack pointers */
export let ip: Ptr; /* interpreter pointer */
export let run: boolean; /* "run" flag */
export let herePtr = 0;

export const buffer = new ArrayBuffer(MEM_SIZE);
export const mem = new DataView(buffer);

const OFFSET = (n: number): number => n * CELL; /* see CELL above, = 4 */

export const getHerePtr = (): Ptr => herePtr;

export const getMem = mem.getUint32;
export const setMem = mem.setUint32;

export const writeInt32 = (num: number): void => {
    mem.setUint32(herePtr, num);
    herePtr += 4;
};

export const writeInt16 = (num: number): void => {
    mem.setUint16(0, num);
    herePtr += 2;
};

export const writeInt8 = (num: number): void => {
    mem.setUint8(0, num);
    herePtr += 1;
};

export const writeStr = (str: string): void => {
    const bytes = new TextEncoder().encode(str);
    const length = bytes.length;
    for (let i = 0; i < length; i++) {
        mem.setUint8(herePtr++, bytes[i]);
    }
};

export const setPSP = (value: Ptr): void => {
    psp = value;
};

export const setRSP = (value: Ptr): void => {
    rsp = value;
};

export const setIP = (value: Ptr): void => {
    ip = value;
};

export const setRun = (value: boolean): void => {
    run = value;
};

export const ppop = (): number => {
    const value = mem.getUint32(psp);
    psp += CELL;
    return value;
};

export const ppush = (value = 0): void => {
    psp -= CELL;
    mem.setUint32(psp, value);
};

export const ppeek = (offset = 0): number => {
    return mem.getUint32(psp + OFFSET(offset));
};

export const ppoke = (value: number, offset = 0): void => {
    mem.setUint32(psp + OFFSET(offset), value);
};

export const rpop = (): number => {
    const value = mem.getUint32(rsp);
    rsp += CELL;
    return value;
};

export const rpush = (value: number): void => {
    rsp -= CELL;
    mem.setUint32(rsp, value);
};

export const rpeek = (offset = 0): number => {
    return mem.getUint32(rsp + OFFSET(offset));
};

export const rpoke = (value: number, offset = 0): void => {
    mem.setUint32(rsp + OFFSET(offset), value);
};
