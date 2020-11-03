import { def32, defSpace } from './memory';
import { HOLDSIZE, PADSIZE, PSTACKSIZE, RSTACKSIZE, TIBSIZE, USERSIZE } from './constants';
import { Ptr } from './types';

// UZERO: 
//  DW QRX ;'?KEY
//  DW TXSTO ;'EMIT
//  DW ACCEP ;'EXPECT
//  DW KTAP ;'TAP
//  DW TXSTO ;'ECHO
//  DW DOTOK ;'PROMPT
//  DW BASEE ;BASE
//  DW 0 ;tmp
//  DW 0 ;SPAN
//  DW 0 ;>IN
//  DW 0 ;#TIB
//  DW TIBB ;TIB
//  DW 0 ;CSP
//  DW INTER ;'EVAL
//  DW NUMBQ ;'NUMBER
//  DW 0 ;HLD
//  DW 0 ;HANDLER
//  DW 0 ;CONTEXT pointer
//  DW VOCSS DUP (0) ;vocabulary stack
//  DW 0 ;CURRENT pointer
//  DW 0 ;vocabulary link pointer
//  DW CTOP ;CP
//  DW NTOP ;NP
//  DW LASTN ;LAST
// ULAST: 
export const rstack = defSpace(RSTACKSIZE, 'rstack');
export const pstack = defSpace(PSTACKSIZE, 'pstack');
export const lstack = defSpace(PSTACKSIZE, 'lstack'); /* grows down from end */
export const uservars = defSpace(USERSIZE, 'uservars');
export const tibarea = defSpace(TIBSIZE, 'tibarea');
export const padarea = defSpace(PADSIZE, 'padarea');
export const holdarea = defSpace(HOLDSIZE, 'holdarea');
const SP0 = def32(pstack + PSTACKSIZE-1, 'SP0');
const RP0 = def32(rstack + PSTACKSIZE-1, 'RP0');
const LAST = def32(0,'LAST')

export let PSP: Ptr = pstack + PSTACKSIZE - 1;
export let RSP: Ptr = rstack + RSTACKSIZE - 1; /* stack pointers */
export let IP: Ptr = 0;
export let run: boolean;

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
