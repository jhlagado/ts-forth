export type Ptr = number;
export type Fn = (pfa: Ptr) => void;

export const NULL = 0;
export const CELL = 4; /* CPU dependency, # of bytes/cell */

export const MEM_SIZE = 1000000;
export const MEM_START = 0;

export const CELLWIDTH = 32; /* # of bits/cell */
export const CELLMASK = 0xffffffff; /* mask for CELLWIDTH bits */

export const PSTACKSIZE = 64; /* 64 cells */
export const RSTACKSIZE = 64; /* 64 cells */
export const LSTACKSIZE = 32; /* 32 cells */
export const USERSIZE = 32; /* 32 cells */
export const TIBSIZE = 84; /* 84 characters */
export const PADSIZE = 84; /* 84 characters */
export const HOLDSIZE = 34; /* 34 characters */

export const RAMDICT_SIZE = 0x2000;
export const ROMDICT_SIZE = 0x400;

export const IMMEDIATE = 1; /* immediate bit in flags */

export type Header = {
    cfa: Ptr /* pointer to high level def'n */;
    link: Ptr /* pointer to previous header */;
    flags: number /* immed flag and others */;
    nfa: string /* inline name string */;
};

export const MEM_END = MEM_START + MEM_SIZE;

export const PSTACK = MEM_END; /* grows down from end */
export const RSTACK = PSTACK - PSTACKSIZE; /* grows down from end */
export const LSTACK = RSTACK - RSTACKSIZE; /* grows down from end */
export const uservars = MEM_START;
export const tibarea = uservars + USERSIZE;
export const padarea = tibarea + TIBSIZE;
export const holdarea = padarea + PADSIZE;
export const RAMDICT = holdarea + HOLDSIZE;
export const ROMDICT = RAMDICT + RAMDICT_SIZE;
export const free = ROMDICT + ROMDICT_SIZE;
