import { CELL, CELLMASK, CELLWIDTH, Ptr, uservars } from './constants';
import {
    getMem,
    ip,
    mem,
    ppeek,
    ppoke,
    ppop,
    ppush,
    psp,
    rpeek,
    rpop,
    rpush,
    rsp,
    setIP,
    setMem,
    setPSP,
    setRSP,
    setRun,
} from './vm';

function docon(pfa: Ptr): void {
    ppush(getMem(pfa));
}

function dovar(pfa: Ptr): void {
    ppush(getMem(pfa)); /* pf holds variable address */
}

function dorom(pfa: Ptr): void {
    ppush(pfa);
}

function enter(pfa: Ptr): void {
    rpush(ip); /* push old IP on return stack */
    setIP(pfa); /* IP points to thread */
}

function douser(pfa: Ptr): void {
    const i = getMem(pfa); /* pf holds user var index */
    ppush(uservars + i); /* stack adrs of user var */
}

function docreate(pfa: Ptr): void {
    ppush(pfa + CELL);
}

// function dobuilds(pfa: Ptr):void {
//     let w = mem[pfa]; /* fetch word address from param field */
//     pfa += CELL;
//     ppush(pfa); /* push address of following data */
//     const x = mem[w]; /* fetch function adrs from word def */
//     w += CELL;
//     const f = codeTable[x];
//     f(w); /* call function w/adrs of word def */
// }

function exit(_pfa: Ptr): void {
    setIP(rpop()); /* pop IP from return stack */
}

function execute(_pfa: Ptr): void {
    let w = getMem(ppop()); /* fetch word address from stack */
    const x = getMem(w); /* fetch function adrs from word def */
    w += CELL;
    const f = codeTable[x];
    f(w); /* call function w/adrs of word def */
}

function lit(_pfa: Ptr): void {
    ppush(getMem(ip)); /* fetch inline value */
    setIP(ip + CELL);
}

function dup(_pfa: Ptr): void {
    ppush(ppeek());
}

function qdup(_pfa: Ptr): void {
    if (ppeek() != 0) {
        ppush(ppeek());
    }
}

function drop(_pfa: Ptr): void {
    ppop();
}

function swap(_pfa: Ptr): void {
    const x = ppeek(1);
    ppoke(ppeek(), 1);
    ppoke(x);
}

function over(_pfa: Ptr): void {
    ppush();
    ppoke(ppeek(2));
}

function rot(_pfa: Ptr): void {
    const x = ppeek(2);
    ppoke(ppeek(1), 2);
    ppoke(ppeek(), 1);
    ppoke(x);
}

function nip(_pfa: Ptr): void {
    // x1 x2 -- x2
    ppoke(ppop(), 1);
}

function tuck(_pfa: Ptr): void {
    // x1 x2 -- x2 x1 x2
    const x = ppeek(1); // x2
    ppush(x);
}

function tor(_pfa: Ptr): void {
    rpush(ppop());
}

function rfrom(_pfa: Ptr): void {
    ppush(rpop());
}

function rfetch(_pfa: Ptr): void {
    ppush(rpeek());
}

function spfetch(_pfa: Ptr): void {
    ppush(psp);
}

function spstore(_pfa: Ptr): void {
    setPSP(ppeek());
}

function rpfetch(_pfa: Ptr): void {
    ppush(rsp);
}

function rpstore(_pfa: Ptr): void {
    setRSP(ppop());
}

function fetch(_pfa: Ptr): void {
    const ptr = ppeek();
    ppoke(getMem(ptr));
}

function store(_pfa: Ptr): void {
    const ptr = ppop();
    setMem(ptr, ppop());
}

function cfetch(_pfa: Ptr): void {
    const ptr = ppeek();
    ppoke(getMem(ptr));
}

function cstore(_pfa: Ptr): void {
    const ptr = ppop();
    setMem(ptr, ppop());
}

function plus(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() + value);
}

function plusstore(_pfa: Ptr): void {
    const ptr = ppop();
    setMem(ptr, getMem(ptr) + ppop());
}

function mplus(_pfa: Ptr): void {
    const n = ppop();
    let d = (ppeek() << CELLWIDTH) + ppeek(1);
    d += n;
    ppoke(d >> CELLWIDTH);
    ppoke(d & CELLMASK, 1);
}

function minus(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() - value);
}

function mult(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() * value);
}

function div(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() / value);
}

function and(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() & value);
}

function or(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() | value);
}

function xor(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() ^ value);
}

function invert(_pfa: Ptr): void {
    ppoke(ppeek() ^ CELLMASK);
}

function negate(_pfa: Ptr): void {
    ppoke(-ppeek());
}

function oneplus(_pfa: Ptr): void {
    ppoke(ppeek() + 1);
}

function oneminus(_pfa: Ptr): void {
    ppoke(ppeek() - 1);
}

function swapbytes(_pfa: Ptr): void {
    const u = ppeek();
    ppoke(((u & 0xff) << 8) | ((u & 0xff00) >> 8));
}

function twostar(_pfa: Ptr): void {
    ppoke(ppeek() << 1);
}

function twoslash(_pfa: Ptr): void {
    const n = ppeek();
    ppoke(n >> 1);
}

function lshift(_pfa: Ptr): void {
    const u = ppop();
    ppoke(ppeek() << u);
}

function rshift(_pfa: Ptr): void {
    const u = ppop();
    ppoke(ppeek() >> u);
}

function zeroequal(_pfa: Ptr): void {
    ppoke(ppop() === 0 ? -1 : 0);
}

function zeroless(_pfa: Ptr): void {
    ppoke(ppop() < 0 ? -1 : 0);
}

function equal(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() === value ? -1 : 0);
}

function notequal(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() !== value ? -1 : 0);
}

function less(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() < value ? -1 : 0);
}

function greater(_pfa: Ptr): void {
    const value = ppop();
    ppoke(ppeek() > value ? -1 : 0);
}

// function uless(_pfa: Ptr):void {
//     ppoke(xxz, 1) ppeek(1) < ppeek() ? -1 : 0;
//     psp++;
// }

// function ugreater(_pfa: Ptr):void {
//     ppoke(xxz, 1) ppeek(1) > ppeek() ? -1 : 0;
//     psp++;
// }

function branch(_pfa: Ptr): void {
    /* Tbranch,-4  loops back to itself */
    /* Tbranch,+4  is a no-op */
    const offset = getMem(ip); /* fetch inline offset */
    setIP(ip + offset);
}

function qbranch(_pfa: Ptr): void {
    /* Tbranch,-4  loops back to itself */
    if (ppop() === 0) {
        const offset = getMem(ip); /* fetch inline offset */
        setIP(ip + offset);
    } else {
        setIP(ip + CELL);
    }
}

/* '83 and ANSI standard +LOOP behavior:  (per dpans-6)
 * "Add n to the loop index. If the loop index did not cross the boundary
 * between the loop limit minus one and the loop limit, continue execution
 * at the beginning of the loop. Otherwise, discard the current loop
 * control parameters and continue execution immediately following the
 * loop."
 * rpoke() index, rsp[1] = limit */

/* circular comparison of two unsigned ints, returns true if x>=y */
// #define CIRCULARGE(x,y)  ((x-y) >= 0)

// function xplusloop(pfa:Ptr) {   /* n -- */
//     f = CIRCULARGE(rpeek(),rsp[1]);      // circular compare index:limit
//     rpeek() += ppop();                   // add n to index
//     if (CIRCULARGE(rpeek(),rsp[1]) != f) { // have we crossed the boundary?
//         rsp += 2;                           // yes: drop index, limit
//         ip += CELL;                         // and exit loop
//     } else {
//         offset = mem[ip];        // no: branch
//         ip += offset;
//     }
// }

// function xloop(pfa:Ptr) {
//     rpeek() += 1;                            // add 1 to index
//     if (rpoke()= rsp[1]) {                 // have we reached the limit?
//         rsp += 2;                           // yes: drop index, limit
//         ip += CELL;                         // and exit loop
//     } else {
//         const offset = mem[ip];             // no: branch
//         ip += offset;
//     }
// } ,

// function xdo(pfa:Ptr) {     /* limit start -- */
//     rpush( mem[psp+1];        // push limit
//     rpush( ppop();        // push starting index
//     psp++;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function i(_pfa: Ptr): void {
    ppush(rpeek()); // first loop index
}

function j(_pfa: Ptr): void {
    ppush(rpeek(2)); // second loop index
}

function unloop(_pfa: Ptr): void {
    rpop();
}

// function umstar(_pfa: Ptr):void {
//     /* u1 u2 -- ud */
//     const ud = ppeek() * ppeek(1);
//     ppoke(xxz, 1) ud & 0xffffffff;
//     ppoke( ud >> 32;
// }

// function umslashmod(_pfa: Ptr):void {
//     /* ud u1 -- rem quot */
//     const u1 = ppop();
//     const ud = (ppeek() << 32) | ppeek(1);
//     ppoke(xxz, 1) ud % u1;
//     ppoke( ud / u1;
// }

function fill(_pfa: Ptr): void {
    /* c-addr u char -- */
    const c = ppop();
    let u = ppop();
    let dst = ppop();
    while (u-- > 0) mem.setUint8(dst++, c);
}

function cmove(_pfa: Ptr): void {
    /* src dst u -- */
    let u = ppop();
    let dst = ppop();
    let src = ppop();
    while (u-- > 0) mem.setUint8(dst++, mem.getInt8(src++));
}

function cmoveup(_pfa: Ptr): void {
    /* src dst u -- */
    let u = ppop();
    let dst = u + ppop();
    let src = u + ppop();
    while (u-- > 0) mem.setUint8(--dst, mem.getInt8(--src));
}

// function skip(_pfa: Ptr):void {
//     /* c-addr u c -- c-addr' u' */
//     const c = ppop();
//     let u = ppop();
//     let src = ppop();
//     while (u > 0 && c === mem[src]) {
//         src++;
//         u--;
//     }
//     ppush( src);
//     ppush( u);
// }

// function scan(_pfa: Ptr):void {
//     /* c-addr u c -- c-addr' u' */
//     const c = ppop();
//     let u = ppop();
//     let src = ppop();
//     while (u > 0 && c != mem[src]) {
//         src++;
//         u--;
//     }
//     ppush( src);
//     ppush( u);
// }

// function sequal(pfa:Ptr) {  /* c-addr1 c-addr2 u -- n */
//     let result = 0;
//     let u = ppop();
//     let dst = ppop();
//     let src = ppop();
//     while ((u-- > 0) & (result === 0)) {
//         if (mem[dst] != mem[src]) {
//             if (mem[dst] > mem[src]) result = 1;
//             else if (mem[dst] < mem[src]) result = -1;
//         }
//         dst++; src++;
//     }
//     ppush( result;
// }

/* TERMINAL I/O */

// function key(pfa:Ptr) {
//     ppush( getch();
// }

// function emit(pfa:Ptr) {
//     putch(ppop());
// }

// function keyq(pfa:Ptr) {
//     ppush( getquery();
// }

// function dot(pfa:Ptr) {        /* temporary definition for testing */
//     printf(" %d", ppop());
// }

// function dothh(pfa:Ptr) {        /* temporary definition for testing */
//     printf(" %2x", ppop());
// }

// function dothhhh(pfa:Ptr) {        /* temporary definition for testing */
//     printf(" %8x", ppop());
// }

// function dots(pfa:Ptr) {    /* print stack, for testing */
//     const p = PSTACK - (PSTACKSIZE-2);      /* deepest element on stack */
//     printf("\n%8x:", p);
//     while (p >= psp) printf(" %8x", mem[p--]);
// }

// function dump(pfa:Ptr) {   /* adr n -- */
//     const n = ppop();
//     const p = ppop();
//     for (i=0; i<n; i++) {
//         if ((i&0xf)==0) printf("\n%8x:", p);
//         printf(" %02x", mem[p++]);
//     }
// }

function bye(_pfa: Ptr): void {
    setRun(false);
}

const codeDict = [
    docon,
    dovar,
    dorom,
    enter,
    douser,
    docreate,
    // dobuilds,
    exit,
    execute,
    lit,
    dup,
    qdup,
    drop,
    swap,
    over,
    rot,
    nip,
    tuck,
    tor,
    rfrom,
    rfetch,
    spfetch,
    spstore,
    rpfetch,
    rpstore,
    fetch,
    store,
    cfetch,
    cstore,
    plus,
    plusstore,
    mplus,
    minus,
    mult,
    div,
    and,
    or,
    xor,
    invert,
    negate,
    oneplus,
    oneminus,
    swapbytes,
    twostar,
    twoslash,
    lshift,
    rshift,
    zeroequal,
    zeroless,
    equal,
    notequal,
    less,
    greater,
    // uless,
    // ugreater,
    branch /* Tbranch,-4  loops back to itself */,
    qbranch /* Tbranch,-4  loops back to itself */,
    i,
    j,
    unloop,
    /* MULTIPLY AND DIVIDE */

    // umstar /* u1 u2 -- ud */,
    // umslashmod /* ud u1 -- rem quot */,
    fill /* c-addr u char -- */,
    cmove /* src dst u -- */,
    cmoveup /* src dst u -- */,
    // skip /* c-addr u c -- c-addr' u' */,
    // scan /* c-addr u c -- c-addr' u' */,
    bye,
];

export const codeKeys = Object.keys(codeDict);
export const codeTable = Object.values(codeDict);
