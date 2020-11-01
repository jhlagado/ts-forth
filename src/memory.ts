import { defSpace } from './asm';
import {
    HOLDSIZE,
    LSTACKSIZE,
    MEM_SIZE,
    MEM_START,
    PADSIZE,
    PSTACKSIZE,
    RSTACKSIZE,
    TABLE_SIZE,
    TIBSIZE,
    USERSIZE,
} from './constants';
import { setAsmPtr } from './globals';

export const table = new Array<Function>(TABLE_SIZE);
export const buffer = new ArrayBuffer(MEM_SIZE);
export const mem = new DataView(buffer);

setAsmPtr(MEM_START);
export const rstack = defSpace(RSTACKSIZE);
export const pstack = defSpace(PSTACKSIZE);
export const lstack = defSpace(LSTACKSIZE); /* grows down from end */
export const uservars = defSpace(USERSIZE);
export const tibarea = defSpace(TIBSIZE);
export const padarea = defSpace(PADSIZE);
export const holdarea = defSpace(HOLDSIZE);
