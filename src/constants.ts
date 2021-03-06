export const NULL = 0;
export const CELL = 4; /* CPU dependency, # of bytes/cell */
export const CELLWIDTH = CELL * 8; /* # of bits/cell */
// export const CELLMASK = 0xffffffffffffffff; /* mask for CELLWIDTH bits */

export const MEM_SIZE = 1000000;
export const MEM_START = 0;
export const TABLE_SIZE = 1000;

export const PSTACKSIZE = 64; /* 64 cells */
export const RSTACKSIZE = 64; /* 64 cells */
export const LSTACKSIZE = 32; /* 32 cells */
export const USERSIZE = 32; /* 32 cells */
export const TIBSIZE = 84; /* 84 characters */
export const PADSIZE = 84; /* 84 characters */
export const HOLDSIZE = 32; /* 34 characters */

export const RAMDICT_SIZE = 0x2000;
export const ROMDICT_SIZE = 0x400;

export const IMMEDIATE = 1; /* immediate bit in flags */

export const MEM_END = MEM_START + MEM_SIZE;

export const DEBUG = false;

export const TRUE = -1;
export const FALSE = 0;
