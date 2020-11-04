import { CELL } from './constants';
import { Ptr } from './types';
import { ppeek, ppoke, ppop, ppush, rpeek, rpoke, rpop, rpush } from './stacks';
import { PSP, setPSP, RSP, setRSP, IP, setIP, setRun } from './variables';
import { mem } from './memory';
import { appendOutputBuffer, getch, getquery, putch } from './io';
import { asBool } from './utils';

export function enter(pfa?: Ptr): void {
    rpush(IP); /* push old IP on return stack */
    setIP(pfa!); /* IP points to thread */
}

export function $exit(): void {
    setIP(rpop()); /* pop IP from return stack */
}

export function $yield(_pfa?: Ptr, retry?: boolean): void | boolean {
    return retry ? undefined : true;
}

export function lit(): void {
    ppush(mem.getUint32(IP)); /* fetch inline value */
    setIP(IP + CELL);
}

export function branch(): void {
    /* Tbranch,-4  loops back to itself */
    /* Tbranch,+4  is a no-op */
    const offset = mem.getUint32(IP); /* fetch inline offset */
    setIP(IP + offset);
}

export function qbranch(): void {
    /* Tbranch,-4  loops back to itself */
    if (ppop() === 0) {
        const offset = mem.getUint32(IP); /* fetch inline offset */
        setIP(IP + offset);
    } else {
        setIP(IP + CELL);
    }
}

export function fetch(): void {
    const ptr = ppeek();
    ppoke(mem.getUint32(ptr));
}

export function store(): void {
    const ptr = ppop();
    mem.setUint32(ptr, ppop());
}

export function cfetch(): void {
    const ptr = ppeek();
    ppoke(mem.getUint32(ptr));
}

export function cstore(): void {
    const ptr = ppop();
    mem.setUint32(ptr, ppop());
}

export function rpfetch(): void {
    ppush(RSP);
}

export function rpstore(): void {
    setRSP(ppop());
}

export function tor(): void {
    rpush(ppop());
}

export function rfrom(): void {
    ppush(rpop());
}

export function rfetch(): void {
    ppush(rpeek());
}

export function rstore(): void {
    rpoke(ppop());
}

export function spfetch(): void {
    ppush(PSP);
}

export function spstore(): void {
    setPSP(ppeek());
}

export function drop(): void {
    ppop();
}

export function dup(): void {
    ppush(ppeek());
}

export function swap(): void {
    const x = ppeek(1);
    ppoke(ppeek(), 1);
    ppoke(x);
}

export function over(): void {
    ppush();
    ppoke(ppeek(2));
}

export function zeroless(): void {
    ppoke(ppop() < 0 ? -1 : 0);
}

export function and(): void {
    const value = ppop();
    ppoke(ppeek() & value);
}

export function or(): void {
    const value = ppop();
    ppoke(ppeek() | value);
}

export function xor(): void {
    const value = ppop();
    ppoke(ppeek() ^ value);
}

export function key(): void | boolean {
    if (!getquery()) return true;
    ppush(getch());
}

export function emit(): void {
    return putch(ppop());
}

export function keyq(): void {
    ppush(asBool(getquery()));
}

export function dot(): void {
    /* temporary definition for testing */
    appendOutputBuffer(ppop().toString());
}

/// ///////////////////////////////////////////////////////////////////////

export function bye(): void {
    setRun(false);
}
