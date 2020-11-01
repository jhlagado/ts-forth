import { PSTACKSIZE, RSTACKSIZE } from "./constants";
import { pstack, rstack } from "./memory";
import { Ptr } from "./types";

export let PSP: Ptr = pstack + PSTACKSIZE - 1;
export let RSP: Ptr = rstack + RSTACKSIZE - 1; /* stack pointers */
export let asmPtr = 0;
export let IP: Ptr = 0;
export let run: boolean;

export const setPSP = (value: Ptr): void => {
    PSP = value;
};

export const setRSP = (value: Ptr): void => {
    RSP = value;
};

export const setAsmPtr = (value: Ptr): void => {
    asmPtr = value;
};

export const setIP = (value: Ptr): void => {
    IP = value;
};

export const setRun = (value: boolean): void => {
    run = value;
};
