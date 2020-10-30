/* eslint-disable prefer-const */
import { PSTACK, RSTACK, CELL } from './constants';
import { mem } from './memory';
import { Ptr } from './types';

export let PSP: Ptr = PSTACK;
export let RSP: Ptr = RSTACK; /* stack pointers */
export let PC: Ptr; 
export let IP: Ptr; 
export let W: Ptr;
export let run: boolean; /* "run" flag */
export let herePtr = 0;

export const reset = () => {
    W = mem.getInt32(IP);
    IP += 4;
    PC = mem.getInt32(W);
} 

export const $NEXT = () => {
    W = mem.getInt32(IP);
    IP += 4;
    PC = mem.getInt32(W);
} 


const OFFSET = (n: number): number => n * CELL; /* see CELL above, = 4 */

export const getHerePtr = (): Ptr => herePtr;

export const setPSP = (value: Ptr): void => {
    PSP = value;
};

export const setRSP = (value: Ptr): void => {
    RSP = value;
};

export const setIP = (value: Ptr): void => {
    IP = value;
};

export const setRun = (value: boolean): void => {
    run = value;
};

export const ppop = (): number => {
    const value = mem.getUint32(PSP);
    PSP += CELL;
    return value;
};

export const ppush = (value = 0): void => {
    PSP -= CELL;
    mem.setUint32(PSP, value);
};

export const ppeek = (offset = 0): number => {
    return mem.getUint32(PSP + OFFSET(offset));
};

export const ppoke = (value: number, offset = 0): void => {
    mem.setUint32(PSP + OFFSET(offset), value);
};

export const rpop = (): number => {
    const value = mem.getUint32(RSP);
    RSP += CELL;
    return value;
};

export const rpush = (value: number): void => {
    RSP -= CELL;
    mem.setUint32(RSP, value);
};

export const rpeek = (offset = 0): number => {
    return mem.getUint32(RSP + OFFSET(offset));
};

export const rpoke = (value: number, offset = 0): void => {
    mem.setUint32(RSP + OFFSET(offset), value);
};
