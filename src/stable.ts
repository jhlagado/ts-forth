/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

//         0,     1,     2,      3,       4,       5,       6       7      8,       9
// /* 30*/ noop,  noop,  noop,   store,   print,   dup_,    swap,   modulo,and_,    ext,
// /* 40*/ if_,   noop,  mul,    add,     emit,    sub,     dot,    div_,  digit,  digit,
// /* 50*/ digit, digit, digit,  digit,   digit,   digit,   digit,  digit, reg_get,reg_set,
// /* 60*/ less,  equal, greater,fetch,   over,    call,    call,   call,  call,   call,
// /* 70*/ call,  call,  call,   call,    call,    call,    call,   call,  call,   call,
// /* 80*/ call,  call,  call,   call,    call,    call,    call,   call,  call,   call,
// /* 90*/ call,  while_,drop,   endwhile,key,     negate,  character,reg,   reg,    reg,
// /*100*/ reg,   reg,   reg,    reg,     reg,     reg,     reg,    reg,   reg,    reg,
// /*110*/ reg,   reg,   reg,    reg,     reg,     reg,     reg,    reg,   reg,    reg,
// /*120*/ reg,   reg,   reg,    def,     or_,     enddef,  not_,   noop,  noop,   noop,
// /*130*/ flt,   unflt, dbg,    traceon, traceoff,version1,mstime, edit,  load,   block,
// /*140*/ trace, quit,  blocknr,btod,    dtob,    noop,    noop,   noop,  noop,   noop,

import { getch, putch, putStr } from './io';
import { getf32, geti32, geti8, setf32, seti32, seti8, updf32, updi32 } from './memory';

const EOF = 5;

const CZERO = '0'.charCodeAt(0);
const CNINE = '9'.charCodeAt(0);
const CQUOTE = '"'.charCodeAt(0);
const CAPOS = "'".charCodeAt(0);
const CDOT = '.'.charCodeAt(0);
const CPLUS = '+'.charCodeAt(0);
const CMINUS = '-'.charCodeAt(0);
const CSTAR = '*'.charCodeAt(0);
const CSLASH = '/'.charCodeAt(0);
const CCPAREN = ')'.charCodeAt(0);
const CCBRACK = ']'.charCodeAt(0);
const CCBRACE = '}'.charCodeAt(0);
const CLOWERA = 'a'.charCodeAt(0);
const CLOWERZ = 'z'.charCodeAt(0);
const CTICK = '`'.charCodeAt(0);

let ex = '';

let c = 0;
let u = 0;
let k = 0;
let i = 0;
let v = 0;
let r = 0;
let p = 0;
let mx = 0;
let s = 0;
let f = 0;
let x = 0;

function NOP() {}
function f33() {
    seti32(geti32(v), geti32(s));
    s--;
}
function REG() {
    k = 1;
    v = u;
}
function PRINT() {
    p++;
    u = geti8(p);
    while (u !== CQUOTE) {
        putch(u);
        p++;
        u = geti8(p);
    }
}
function DUP() {
    s++;
    seti32(s, geti32(s - 1));
}
function MUL() {
    updi32(s - 1, (val) => val * geti32(s));
    s--;
}
function SWAP() {
    i = geti32(s);
    seti32(s, geti32(s - 1));
    seti32(s - 1, i);
}
function MOD() {
    updi32(s - 1, (val) => val % geti32(s));
    s--;
}
function AND() {
    updi32(s - 1, (val) => val & geti32(s));
    s--;
}
function EXT() {
    p++;
    u = geti8(p);
    if (u === CAPOS) {
        setf32(s, geti32(s));
    } else if (u === CZERO) {
        seti32(s, getf32(s));
    } else if (u === CDOT) {
        putStr(getf32(s).toString());
        s--;
    } else if (u === CPLUS) {
        updf32(s - 1, (val) => val + getf32(s));
        s--;
    } else if (u === CMINUS) {
        updf32(s - 1, (val) => val - getf32(s));
        s--;
    } else if (u === CSTAR) {
        updf32(s - 1, (val) => val * getf32(s));
        s--;
    } else if (u === CSLASH) {
        updf32(s - 1, (val) => val / getf32(s));
        s--;
    }
}
function IF() {
    if (geti32(s) === 0) {
        s--;
        p++;
        u = geti8(p);
        while (u !== CCPAREN) {
            p++;
            u = geti8(p);
        }
    } else {
        s--;
    }
}
function ADD() {
    if (k === 0) {
        updi32(s - 1, (val) => val + geti32(s));
        s--;
    } else {
        updi32(v, (val) => val + 1);
    }
}
function EMIT() {
    putch(geti32(s));
    s--;
}
function B5() {
    updi32(s, (val) => -val);
}
function SUB() {
    if (k === 0) {
        updi32(s - 1, (val) => val - geti32(s));
        s--;
    } else {
        updi32(v, (val) => val - 1);
    }
}
function DOT() {
    putStr(geti32(s).toString());
    s--;
}
function DIV() {
    updi32(s - 1, (val) => val / geti32(s));
    s--;
}
function DIGIT() {
    i = 0;
    while (u >= CZERO && u <= CNINE) {
        i = i * 10 + u - CZERO;
        p++;
        u = geti8(p);
    }
    s++;
    seti32(s, i);
    p--;
}
function RGET() {
    seti32(v, geti32(s));
    s--;
}
function RSET() {
    s++;
    seti32(s, geti32(v));
}
function LESS() {
    if (geti32(s) > geti32(s - 1)) {
        seti32(s, -1);
    } else {
        seti32(s, 0);
    }
}
function EQUAL() {
    if (geti32(s) === geti32(s - 1)) {
        seti32(s, -1);
    } else {
        seti32(s, 0);
    }
}
function GREATER() {
    if (geti32(s) < geti32(s - 1)) {
        seti32(s, -1);
    } else {
        seti32(s, 0);
    }
}
function FETCH() {
    s++;
    seti32(s, geti32(geti32(v)));
}
function OVER() {
    seti32(s + 1, geti32(s - 1));
    s++;
}
function CALL() {
    r++;
    seti32(r, p);
    p = geti32(u);
    u = geti8(p);
    p--;
}
function B1() {
    r++;
    seti32(r, p);
    if (geti32(s) === 0) {
        p++;
        u = geti8(p);
        while (u !== CCBRACK) {
            p++;
            u = geti8(p);
        }
    }
}
function B2() {
    s--;
}
function B3() {
    if (geti32(s) !== 0) {
        p = geti32(r);
    } else {
        r--;
    }
    s--;
}
function B4() {
    c = getch();
    if (c === EOF) {
        c = 0;
    }
    s++;
    seti32(s, c);
}
function B6() {
    x = 0;
    p++;
    while (geti8(p) !== CTICK) {
        ex += String.fromCharCode(geti8(p));
        p++;
    }
    console.log(ex);
}
function DEF() {
    f = geti8(p + 1);
    seti32(f, p + 2);
    while (u !== CCBRACE) {
        p++;
        u = geti8(p);
    }
}
function OR() {
    updi32(s - 1, (val) => val | geti32(s));
    s--;
}
function ENDDEF() {
    p = geti32(r);
    r--;
}
function NOT() {
    updi32(s, (val) => ~val);
}

// prettier-ignore
const q = [ 
    NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, 
    NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, 
    NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, 
    NOP, NOP, NOP, f33, PRINT, DUP, SWAP, MOD, AND, EXT, 
    IF, NOP, MUL, ADD, EMIT, SUB, DOT, DIV, DIGIT, DIGIT, 
    DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, RGET, RSET, 
    LESS, EQUAL, GREATER, FETCH, OVER, CALL, CALL, CALL, CALL, CALL, 
    CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, 
    CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, 
    CALL, B1, B2, B3, B4, B5, B6, REG, REG, REG, 
    REG, REG, REG, REG, REG, REG, REG, REG, REG, REG, 
    REG, REG, REG, REG, REG, REG, REG, REG, REG, REG, 
    REG, REG, REG, DEF, OR, ENDDEF, NOT, 
];

function main() {
    for (i = 0; i < 2400; i++) {
        seti32(i, 0);
    }
    p = 8000;
    for (;;) {
        c = getch();
        if (c === EOF) break;
        seti8(p++, c);
    }
    mx = p;
    p = 8000;
    s = 140;
    r = 20;
    while (p <= mx) {
        u = geti8(p);
        q[u]();
        if (u < CLOWERA) {
            k = 0;
        } else if (u > CLOWERZ) {
            k = 0;
        }
        p++;
    }
    return 0;
}