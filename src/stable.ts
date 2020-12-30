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

let ipChar = 0;
let incMode = 0;
let selectedReg = 0;
let rp = 0;
let ip = 0;
let sp = 0;

const NOP = () => {};

const STORE = () => {
    seti32(geti32(selectedReg), geti32(sp));
    sp--;
};

const REG = () => {
    incMode = 1;
    selectedReg = ipChar;
};

const PRINT = () => {
    ip++;
    ipChar = geti8(ip);
    while (ipChar !== CQUOTE) {
        putch(ipChar);
        ip++;
        ipChar = geti8(ip);
    }
};

const DUP = () => {
    sp++;
    seti32(sp, geti32(sp - 1));
};

const MUL = () => {
    updi32(sp - 1, (val) => val * geti32(sp));
    sp--;
};

const SWAP = () => {
    const i = geti32(sp);
    seti32(sp, geti32(sp - 1));
    seti32(sp - 1, i);
};

const MOD = () => {
    updi32(sp - 1, (val) => val % geti32(sp));
    sp--;
};

const AND = () => {
    updi32(sp - 1, (val) => val & geti32(sp));
    sp--;
};

const EXTERNAL = () => {
    ip++;
    ipChar = geti8(ip);
    if (ipChar === CAPOS) {
        setf32(sp, geti32(sp));
    } else if (ipChar === CZERO) {
        seti32(sp, getf32(sp));
    } else if (ipChar === CDOT) {
        putStr(getf32(sp).toString());
        sp--;
    } else if (ipChar === CPLUS) {
        updf32(sp - 1, (val) => val + getf32(sp));
        sp--;
    } else if (ipChar === CMINUS) {
        updf32(sp - 1, (val) => val - getf32(sp));
        sp--;
    } else if (ipChar === CSTAR) {
        updf32(sp - 1, (val) => val * getf32(sp));
        sp--;
    } else if (ipChar === CSLASH) {
        updf32(sp - 1, (val) => val / getf32(sp));
        sp--;
    }
};

const IF = () => {
    if (geti32(sp) === 0) {
        sp--;
        ip++;
        ipChar = geti8(ip);
        while (ipChar !== CCPAREN) {
            ip++;
            ipChar = geti8(ip);
        }
    } else {
        sp--;
    }
};
const ADD = () => {
    if (incMode === 0) {
        updi32(sp - 1, (val) => val + geti32(sp));
        sp--;
    } else {
        updi32(selectedReg, (val) => val + 1);
    }
};

const EMIT = () => {
    putch(geti32(sp));
    sp--;
};

const NEGATE = () => {
    updi32(sp, (val) => -val);
};

const SUB = () => {
    if (incMode === 0) {
        updi32(sp - 1, (val) => val - geti32(sp));
        sp--;
    } else {
        updi32(selectedReg, (val) => val - 1);
    }
};

const DOT = () => {
    putStr(geti32(sp).toString());
    sp--;
};

const DIV = () => {
    updi32(sp - 1, (val) => val / geti32(sp));
    sp--;
};

const DIGIT = () => {
    let i = 0;
    while (ipChar >= CZERO && ipChar <= CNINE) {
        i = i * 10 + ipChar - CZERO;
        ip++;
        ipChar = geti8(ip);
    }
    sp++;
    seti32(sp, i);
    ip--;
};

const RSET = () => {
    seti32(selectedReg, geti32(sp));
    sp--;
};

const RGET = () => {
    sp++;
    seti32(sp, geti32(selectedReg));
};

const LESS = () => {
    if (geti32(sp) > geti32(sp - 1)) {
        seti32(sp, -1);
    } else {
        seti32(sp, 0);
    }
};

const EQUAL = () => {
    if (geti32(sp) === geti32(sp - 1)) {
        seti32(sp, -1);
    } else {
        seti32(sp, 0);
    }
};

const GREATER = () => {
    if (geti32(sp) < geti32(sp - 1)) {
        seti32(sp, -1);
    } else {
        seti32(sp, 0);
    }
};

const FETCH = () => {
    sp++;
    seti32(sp, geti32(geti32(selectedReg)));
};

const OVER = () => {
    seti32(sp + 1, geti32(sp - 1));
    sp++;
};

const CALL = () => {
    rp++;
    seti32(rp, ip);
    ip = geti32(ipChar);
    ipChar = geti8(ip);
    ip--;
};

const LOOP = () => {
    rp++;
    seti32(rp, ip);
    if (geti32(sp) === 0) {
        ip++;
        ipChar = geti8(ip);
        while (ipChar !== CCBRACK) {
            ip++;
            ipChar = geti8(ip);
        }
    }
};

const DROP = () => {
    sp--;
};

const ENDLOOP = () => {
    if (geti32(sp) !== 0) {
        ip = geti32(rp);
    } else {
        rp--;
    }
    sp--;
};

const KEY = () => {
    let ch = getch();
    if (ch === EOF) {
        ch = 0;
    }
    sp++;
    seti32(sp, ch);
};

const CHAR = () => {
    ip++;
    while (geti8(ip) !== CTICK) {
        ex += String.fromCharCode(geti8(ip));
        ip++;
    }
    console.log(ex);
};

const DEF = () => {
    const defCode = geti8(ip + 1);
    seti32(defCode, ip + 2);
    while (ipChar !== CCBRACE) {
        ip++;
        ipChar = geti8(ip);
    }
};

const OR = () => {
    updi32(sp - 1, (val) => val | geti32(sp));
    sp--;
};

const ENDDEF = () => {
    ip = geti32(rp);
    rp--;
};

const NOT = () => {
    updi32(sp, (val) => ~val);
};

// prettier-ignore
const q = [ 
    NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, 
    NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, 
    NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, NOP, 
    NOP, NOP, NOP, STORE, PRINT, DUP, SWAP, MOD, AND, EXTERNAL, 
    IF, NOP, MUL, ADD, EMIT, SUB, DOT, DIV, DIGIT, DIGIT, 
    DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, DIGIT, RSET, RGET, 
    LESS, EQUAL, GREATER, FETCH, OVER, CALL, CALL, CALL, CALL, CALL, 
    CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, 
    CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, CALL, 
    CALL, LOOP, DROP, ENDLOOP, KEY, NEGATE, CHAR, REG, REG, REG, 
    REG, REG, REG, REG, REG, REG, REG, REG, REG, REG, 
    REG, REG, REG, REG, REG, REG, REG, REG, REG, REG, 
    REG, REG, REG, DEF, OR, ENDDEF, NOT, 
];

const main = () => {
    for (let i = 0; i < 2400; i++) {
        seti32(i, 0);
    }
    ip = 8000;
    for (;;) {
        const ch = getch();
        if (ch === EOF) break;
        seti8(ip++, ch);
    }
    const endOfCode = ip;
    ip = 8000;
    sp = 140;
    rp = 20;
    while (ip <= endOfCode) {
        ipChar = geti8(ip);
        q[ipChar]();
        if (ipChar < CLOWERA) {
            incMode = 0;
        } else if (ipChar > CLOWERZ) {
            incMode = 0;
        }
        ip++;
    }
};
