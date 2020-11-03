// import { CELL } from './constants';
// import { CodeDict, Ptr } from './types';
// import {
//     ppeek, ppoke, ppop, ppush, rpeek, rpoke, rpop, rpush,
// } from './stacks';
// import {
//     PSP, setPSP, RSP, setRSP, IP, setIP, setRun, uservars,
// } from './variables';
// import { mem } from './memory';
// import { getch, getquery, putch } from './io';
// import { asBool } from './utils';

// function enter(pfa?: Ptr): void {
//     rpush(IP); /* push old IP on return stack */
//     setIP(pfa!); /* IP points to thread */
// }

// function lit(): void {
//     ppush(mem.getUint32(IP)); /* fetch inline value */
//     setIP(IP + CELL);
// }

// function branch(): void {
//     /* Tbranch,-4  loops back to itself */
//     /* Tbranch,+4  is a no-op */
//     const offset = mem.getUint32(IP); /* fetch inline offset */
//     setIP(IP + offset);
// }

// function qbranch(): void {
//     /* Tbranch,-4  loops back to itself */
//     if (ppop() === 0) {
//         const offset = mem.getUint32(IP); /* fetch inline offset */
//         setIP(IP + offset);
//     } else {
//         setIP(IP + CELL);
//     }
// }

// function fetch(): void {
//     const ptr = ppeek();
//     ppoke(mem.getUint32(ptr));
// }

// function store(): void {
//     const ptr = ppop();
//     mem.setUint32(ptr, ppop());
// }

// function cfetch(): void {
//     const ptr = ppeek();
//     ppoke(mem.getUint32(ptr));
// }

// function cstore(): void {
//     const ptr = ppop();
//     mem.setUint32(ptr, ppop());
// }

// function rpfetch(): void {
//     ppush(RSP);
// }

// function rpstore(): void {
//     setRSP(ppop());
// }

// function tor(): void {
//     rpush(ppop());
// }

// function rfrom(): void {
//     ppush(rpop());
// }

// function rfetch(): void {
//     ppush(rpeek());
// }

// function rstore(): void {
//     rpoke(ppop());
// }

// function spfetch(): void {
//     ppush(PSP);
// }

// function spstore(): void {
//     setPSP(ppeek());
// }

// function drop(): void {
//     ppop();
// }

// function dup(): void {
//     ppush(ppeek());
// }

// function swap(): void {
//     const x = ppeek(1);
//     ppoke(ppeek(), 1);
//     ppoke(x);
// }

// function over(): void {
//     ppush();
//     ppoke(ppeek(2));
// }

// function zeroless(): void {
//     ppoke(ppop() < 0 ? -1 : 0);
// }

// function and(): void {
//     const value = ppop();
//     ppoke(ppeek() & value);
// }

// function or(): void {
//     const value = ppop();
//     ppoke(ppeek() | value);
// }

// function xor(): void {
//     const value = ppop();
//     ppoke(ppeek() ^ value);
// }

// function key() {
//     if (!getquery()) return true;
//     ppush(getch());
// }

// function emit() {
//     return putch(ppop());
// }

// function keyq() {
//     ppush(asBool(getquery()));
// }

// // function dot(pfa:Ptr,io:IO) {        /* temporary definition for testing */
// //     // printf(" %d", ppop());
// // }

// /// ///////////////////////////////////////////////////////////////////////

// function docon(pfa?: Ptr): void {
//     ppush(mem.getUint32(pfa!));
// }

// function dovar(pfa?: Ptr): void {
//     ppush(mem.getUint32(pfa!)); /* pf holds variable address */
// }

// function dorom(pfa?: Ptr): void {
//     ppush(pfa!);
// }

// function douser(pfa?: Ptr): void {
//     const i = mem.getUint32(pfa!); /* pf holds user var index */
//     ppush(uservars + i); /* stack adrs of user var */
// }

// function docreate(pfa?: Ptr): void {
//     ppush(pfa! + CELL);
// }

// // function dobuilds(pfa?: Ptr):void {
// //     let w = mem[pfa]; /* fetch word address from param field */
// //     pfa += CELL;
// //     ppush(pfa!); /* push address of following data */
// //     const x = mem[w]; /* fetch function adrs from word def */
// //     w += CELL;
// //     const f = codeTable[x];
// //     f(w); /* call function w/adrs of word def */
// // }

// function exit(): void {
//     setIP(rpop()); /* pop IP from return stack */
// }

// // function execute(): void {
// //     let w = mem.getUint32(ppop()); /* fetch word address from stack */
// //     const x = mem.getUint32(w); /* fetch function adrs from word def */
// //     w += CELL;
// //     const f = codeTable[x];
// //     f(w); /* call function w/adrs of word def */
// // }

// function qdup(): void {
//     if (ppeek() != 0) {
//         ppush(ppeek());
//     }
// }

// function rot(): void {
//     const x = ppeek(2);
//     ppoke(ppeek(1), 2);
//     ppoke(ppeek(), 1);
//     ppoke(x);
// }

// function nip(): void {
//     // x1 x2 -- x2
//     ppoke(ppop(), 1);
// }

// function tuck(): void {
//     // x1 x2 -- x2 x1 x2
//     const x = ppeek(1); // x2
//     ppush(x);
// }

// function plus(): void {
//     const value = ppop();
//     ppoke(ppeek() + value);
// }

// function plusstore(): void {
//     const ptr = ppop();
//     mem.setUint32(ptr, mem.getUint32(ptr) + ppop());
// }

// // function mplus(): void {
// //     const n = ppop();
// //     let d = (ppeek() << CELLWIDTH) + ppeek(1);
// //     d += n;
// //     ppoke(d >> CELLWIDTH);
// //     ppoke(d & CELLMASK, 1);
// // }

// function minus(): void {
//     const value = ppop();
//     ppoke(ppeek() - value);
// }

// function mult(): void {
//     const value = ppop();
//     ppoke(ppeek() * value);
// }

// function div(): void {
//     const value = ppop();
//     ppoke(ppeek() / value);
// }

// // function invert(): void {
// //     ppoke(ppeek() ^ CELLMASK);
// // }

// function negate(): void {
//     ppoke(-ppeek());
// }

// function oneplus(): void {
//     ppoke(ppeek() + 1);
// }

// function oneminus(): void {
//     ppoke(ppeek() - 1);
// }

// function swapbytes(): void {
//     const u = ppeek();
//     ppoke(((u & 0xff) << 8) | ((u & 0xff00) >> 8));
// }

// function twostar(): void {
//     ppoke(ppeek() << 1);
// }

// function twoslash(): void {
//     const n = ppeek();
//     ppoke(n >> 1);
// }

// function lshift(): void {
//     const u = ppop();
//     ppoke(ppeek() << u);
// }

// function rshift(): void {
//     const u = ppop();
//     ppoke(ppeek() >> u);
// }

// function zeroequal(): void {
//     ppoke(ppop() === 0 ? -1 : 0);
// }

// function equal(): void {
//     const value = ppop();
//     ppoke(ppeek() === value ? -1 : 0);
// }

// function notequal(): void {
//     const value = ppop();
//     ppoke(ppeek() !== value ? -1 : 0);
// }

// function less(): void {
//     const value = ppop();
//     ppoke(ppeek() < value ? -1 : 0);
// }

// function greater(): void {
//     const value = ppop();
//     ppoke(ppeek() > value ? -1 : 0);
// }

// // function uless():void {
// //     ppoke(xxz, 1) ppeek(1) < ppeek() ? -1 : 0;
// //     psp++;
// // }

// // function ugreater():void {
// //     ppoke(xxz, 1) ppeek(1) > ppeek() ? -1 : 0;
// //     psp++;
// // }

// /* '83 and ANSI standard +LOOP behavior:  (per dpans-6)
//  * "Add n to the loop index. If the loop index did not cross the boundary
//  * between the loop limit minus one and the loop limit, continue execution
//  * at the beginning of the loop. Otherwise, discard the current loop
//  * control parameters and continue execution immediately following the
//  * loop."
//  * rpoke() index, rsp[1] = limit */

// /* circular comparison of two unsigned ints, returns true if x>=y */
// // #define CIRCULARGE(x,y)  ((x-y) >= 0)

// // function xplusloop(pfa:Ptr) {   /* n -- */
// //     f = CIRCULARGE(rpeek(),rsp[1]);      // circular compare index:limit
// //     rpeek() += ppop();                   // add n to index
// //     if (CIRCULARGE(rpeek(),rsp[1]) != f) { // have we crossed the boundary?
// //         rsp += 2;                           // yes: drop index, limit
// //         ip += CELL;                         // and exit loop
// //     } else {
// //         offset = mem[ip];        // no: branch
// //         ip += offset;
// //     }
// // }

// // function xloop(pfa:Ptr) {
// //     rpeek() += 1;                            // add 1 to index
// //     if (rpoke()= rsp[1]) {                 // have we reached the limit?
// //         rsp += 2;                           // yes: drop index, limit
// //         ip += CELL;                         // and exit loop
// //     } else {
// //         const offset = mem[ip];             // no: branch
// //         ip += offset;
// //     }
// // } ,

// // function xdo(pfa:Ptr) {     /* limit start -- */
// //     rpush( mem[psp+1];        // push limit
// //     rpush( ppop();        // push starting index
// //     psp++;
// // }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function i(): void {
//     ppush(rpeek()); // first loop index
// }

// function j(): void {
//     ppush(rpeek(2)); // second loop index
// }

// function unloop(): void {
//     rpop();
// }

// // function umstar():void {
// //     /* u1 u2 -- ud */
// //     const ud = ppeek() * ppeek(1);
// //     ppoke(xxz, 1) ud & 0xffffffff;
// //     ppoke( ud >> 32;
// // }

// // function umslashmod():void {
// //     /* ud u1 -- rem quot */
// //     const u1 = ppop();
// //     const ud = (ppeek() << 32) | ppeek(1);
// //     ppoke(xxz, 1) ud % u1;
// //     ppoke( ud / u1;
// // }

// function fill(): void {
//     /* c-addr u char -- */
//     const c = ppop();
//     let u = ppop();
//     let dst = ppop();
//     while (u-- > 0) mem.setUint8(dst++, c);
// }

// function cmove(): void {
//     /* src dst u -- */
//     let u = ppop();
//     let dst = ppop();
//     let src = ppop();
//     while (u-- > 0) mem.setUint8(dst++, mem.getInt8(src++));
// }

// function cmoveup(): void {
//     /* src dst u -- */
//     let u = ppop();
//     let dst = u + ppop();
//     let src = u + ppop();
//     while (u-- > 0) mem.setUint8(--dst, mem.getInt8(--src));
// }

// // function skip():void {
// //     /* c-addr u c -- c-addr' u' */
// //     const c = ppop();
// //     let u = ppop();
// //     let src = ppop();
// //     while (u > 0 && c === mem[src]) {
// //         src++;
// //         u--;
// //     }
// //     ppush( src);
// //     ppush( u);
// // }

// // function scan():void {
// //     /* c-addr u c -- c-addr' u' */
// //     const c = ppop();
// //     let u = ppop();
// //     let src = ppop();
// //     while (u > 0 && c != mem[src]) {
// //         src++;
// //         u--;
// //     }
// //     ppush( src);
// //     ppush( u);
// // }

// // function sequal(pfa:Ptr) {  /* c-addr1 c-addr2 u -- n */
// //     let result = 0;
// //     let u = ppop();
// //     let dst = ppop();
// //     let src = ppop();
// //     while ((u-- > 0) & (result === 0)) {
// //         if (mem[dst] != mem[src]) {
// //             if (mem[dst] > mem[src]) result = 1;
// //             else if (mem[dst] < mem[src]) result = -1;
// //         }
// //         dst++; src++;
// //     }
// //     ppush( result;
// // }

// /* TERMINAL I/O */

// // function dothh(pfa:Ptr) {        /* temporary definition for testing */
// //     printf(" %2x", ppop());
// // }

// // function dothhhh(pfa:Ptr) {        /* temporary definition for testing */
// //     printf(" %8x", ppop());
// // }

// // function dots(pfa:Ptr) {    /* print stack, for testing */
// //     const p = PSTACK - (PSTACKSIZE-2);      /* deepest element on stack */
// //     printf("\n%8x:", p);
// //     while (p >= psp) printf(" %8x", mem[p--]);
// // }

// // function dump(pfa:Ptr) {   /* adr n -- */
// //     const n = ppop();
// //     const p = ppop();
// //     for (i=0; i<n; i++) {
// //         if ((i&0xf)==0) printf("\n%8x:", p);
// //         printf(" %02x", mem[p++]);
// //     }
// // }

// function bye(): void {
//     setRun(false);
// }

// const codeDict: CodeDict = {
//     key,
//     emit,
//     keyq,

//     dovar,
//     dorom,
//     enter,
//     douser,
//     docreate,
//     // dobuilds,
//     exit,
//     // execute,
//     lit,
//     dup,
//     qdup,
//     drop,
//     swap,
//     over,
//     rot,
//     nip,
//     tuck,
//     tor,
//     rfrom,
//     rfetch,
//     spfetch,
//     spstore,
//     rpfetch,
//     rpstore,
//     fetch,
//     store,
//     cfetch,
//     cstore,
//     plus,
//     plusstore,
//     // mplus,
//     minus,
//     mult,
//     div,
//     and,
//     or,
//     xor,
//     // invert,
//     negate,
//     oneplus,
//     oneminus,
//     swapbytes,
//     twostar,
//     twoslash,
//     lshift,
//     rshift,
//     zeroequal,
//     zeroless,
//     equal,
//     notequal,
//     less,
//     greater,
//     // uless,
//     // ugreater,
//     branch /* Tbranch,-4  loops back to itself */,
//     qbranch /* Tbranch,-4  loops back to itself */,
//     i,
//     j,
//     unloop,
//     /* MULTIPLY AND DIVIDE */

//     // umstar /* u1 u2 -- ud */,
//     // umslashmod /* ud u1 -- rem quot */,
//     fill /* c-addr u char -- */,
//     cmove /* src dst u -- */,
//     cmoveup /* src dst u -- */,
//     // skip /* c-addr u c -- c-addr' u' */,
//     // scan /* c-addr u c -- c-addr' u' */,
//     bye,
// };

// export const codeKeys = Object.keys(codeDict);
// export const codeTable = Object.values(codeDict);
