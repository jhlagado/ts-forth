import { mem } from './memory';
import { CELL, PSTACKSIZE } from './constants';
import {
    PSP, pstack, RSP, setPSP, setRSP,
} from './variables';

const OFFSET = (n: number): number => n * CELL; /* see CELL above, = 4 */
export const ppop = (): number => {
    const value = mem.getUint32(PSP);
    setPSP(PSP + CELL);
    return value;
};

export const ppush = (value = 0): void => {
    setPSP(PSP - CELL);
    mem.setUint32(PSP, value);
};

export const ppeek = (offset = 0): number => mem.getUint32(PSP + OFFSET(offset));

export const ppoke = (value: number, offset = 0): void => {
    mem.setUint32(PSP + OFFSET(offset), value);
};

export const pdepth = (): number => {
    const pEnd = pstack + PSTACKSIZE - 1;
    return (pEnd - PSP) / CELL;
};

export const rpop = (): number => {
    const value = mem.getUint32(RSP);
    setRSP(RSP + CELL);
    return value;
};

export const rpush = (value: number): void => {
    setRSP(RSP - CELL);
    mem.setUint32(RSP, value);
};

export const rpeek = (offset = 0): number => mem.getUint32(RSP + OFFSET(offset));

export const rpoke = (value: number, offset = 0): void => {
    mem.setUint32(RSP + OFFSET(offset), value);
};
