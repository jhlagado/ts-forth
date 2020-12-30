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
let selectedReg = 0;
let rp = 0;
let ip = 0;
let mx = 0;
let s = 0;
let f = 0;

function NOP() {}
function f33() {
    seti32(geti32(selectedReg), geti32(s));
    s--;
}
function REG() {
    k = 1;
    selectedReg = u;
}
function PRINT() {
    ip++;
    u = geti8(ip);
    while (u !== CQUOTE) {
        putch(u);
        ip++;
        u = geti8(ip);
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
    ip++;
    u = geti8(ip);
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
        ip++;
        u = geti8(ip);
        while (u !== CCPAREN) {
            ip++;
            u = geti8(ip);
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
        updi32(selectedReg, (val) => val + 1);
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
        updi32(selectedReg, (val) => val - 1);
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
        ip++;
        u = geti8(ip);
    }
    s++;
    seti32(s, i);
    ip--;
}
function RSET() {
    seti32(selectedReg, geti32(s));
    s--;
}
function RGET() {
    s++;
    seti32(s, geti32(selectedReg));
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
    seti32(s, geti32(geti32(selectedReg)));
}
function OVER() {
    seti32(s + 1, geti32(s - 1));
    s++;
}
function CALL() {
    rp++;
    seti32(rp, ip);
    ip = geti32(u);
    u = geti8(ip);
    ip--;
}
function B1() {
    rp++;
    seti32(rp, ip);
    if (geti32(s) === 0) {
        ip++;
        u = geti8(ip);
        while (u !== CCBRACK) {
            ip++;
            u = geti8(ip);
        }
    }
}
function B2() {
    s--;
}
function B3() {
    if (geti32(s) !== 0) {
        ip = geti32(rp);
    } else {
        rp--;
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
    ip++;
    while (geti8(ip) !== CTICK) {
        ex += String.fromCharCode(geti8(ip));
        ip++;
    }
    console.log(ex);
}
function DEF() {
    const defCode = geti8(ip + 1);
    seti32(defCode, ip + 2);
    while (u !== CCBRACE) {
        ip++;
        u = geti8(ip);
    }
}
function OR() {
    updi32(s - 1, (val) => val | geti32(s));
    s--;
}
function ENDDEF() {
    ip = geti32(rp);
    rp--;
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
    DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, RSET, RGET, 
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
    ip = 8000;
    for (;;) {
        c = getch();
        if (c === EOF) break;
        seti8(ip++, c);
    }
    mx = ip;
    ip = 8000;
    s = 140;
    rp = 20;
    while (ip <= mx) {
        u = geti8(ip);
        q[u]();
        if (u < CLOWERA) {
            k = 0;
        } else if (u > CLOWERZ) {
            k = 0;
        }
        ip++;
    }
    return 0;
}
