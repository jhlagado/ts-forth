/* eslint-disable import/extensions */
import {
    IP, pstack, rstack, run, setIP, setPSP, setRSP, setRun,
} from './variables';
import { PSTACKSIZE, RSTACKSIZE, CELL } from './constants';
import { Ptr } from './types';
import { mem } from './memory';
import { PRIMITIVE, HEADER, codeTable } from './utils';

export const exit = PRIMITIVE('exit');
export const bye = PRIMITIVE('bye');
export const lit = PRIMITIVE('lit');
export const dup = PRIMITIVE('dup');
export const key = PRIMITIVE('key');

export const interpreter = (word: Ptr): Promise<unknown> => {
    setPSP(pstack + PSTACKSIZE - 1);
    setRSP(rstack + RSTACKSIZE - 1);
    setIP(word + CELL);
    setRun(true);
    return new Promise((resolve) => {
        const loop = (restart = false) => {
            const IP1 = restart ? IP - CELL : IP;
            const w = mem.getInt32(IP1);
            setIP(IP1 + CELL);
            const x = mem.getInt32(w);
            const xt = codeTable[x];
            const result = xt(w + CELL, restart);
            if (run) {
                if (result) {
                    setTimeout(() => loop(true));
                } else {
                    loop();
                }
            } else {
                resolve();
            }
        };
        loop();
    });
};

// export const exit = PRIMITIVE('exit');
// export const execute = PRIMITIVE('execute');
// export const swap = PRIMITIVE('swap);
// export const tor = PRIMITIVE('tor);
// export const rfetch = PRIMITIVE('rfetch);

/* synonyms for unified code and data space */
// #define Tifetch  Tfetch
// #define Ticfetch Tcfetch
// #define Tistore  Tstore
// #define Ticstore Tcstore
// #define Thfetch  Tfetch
// #define Thcfetch Tcfetch
// #define Thstore  Tstore
// #define Thcstore Tcstore

// export const plus = PRIMITIVE('plus);

// export const qbranch = PRIMITIVE('qbranch);
// export const xplusloop = PRIMITIVE('xplusloop);
// export const xloop = PRIMITIVE('xloop);
// export const xdo = PRIMITIVE('xdo);

// export const sequal = PRIMITIVE('sequal);

// export const key = PRIMITIVE('key);
// export const emit = PRIMITIVE('emit);
// export const keyq = PRIMITIVE('keyq);
// PRIMITIVE('dot);
// export const dothh = PRIMITIVE('dothh);
// export const dothhhh = PRIMITIVE('dothhhh);
// export const dots = PRIMITIVE('dots);
// export const dump = PRIMITIVE('dump);

// export const idp = [ CODE(douser, LIT(10)];          /* not used in this model */

// extern export const struct Header Hcold;

// export const uinit = [ CODE(dorom),
//     LIT(0),  LIT(0),  LIT(10), LIT(0),  // u0 >in base state
//     RAMDICT, LIT(0),  LIT(0),  Hcold.nfa,    // dp source latest
//     LIT(0),  LIT(0),  ROMDICT, LIT(0)];  // hp lp idp newest

// #define TBD(name)  export const void * T##name[] = { Fenter, Texit }

// #define Tidp     Tdp
// #define Tihere   There
// #define Tiallot  Tallot
// #define Ticomma  Tcomma
// #define Ticcomma Tccomma
// /* synonyms for unified header and data space */
// #define Thhere   There
// #define Thallot  Tallot
// #define Thcomma  Tcomma
// #define Thccomma Tccomma
// #define Thword   Tword

// export const aligned = [CODE(enter), Tcell, Tover, Tminus, Tcell, Toneminus, Tand, Tplus, Texit];
// export const align = [ CODE(enter), Tihere, Taligned, Tidp, Tstore, Texit ];
// export const cellplus = [ CODE(enter), Tcell, Tplus, Texit ];
// export const charplus = [ CODE(enter), Tone, Tplus, Texit ];

// export const tobody = [ CODE(enter),
//     Tdup, Tifetch,                      /* fetch code field */
//     Tdup, Tlit, Fdocreate, Tequal,      /* if it's Fdocreate */
//     Tswap, Tlit, Fdobuilds, Tequal, Tor,  /* or Fdobuilds */
//     Tqbranch, OFFSET(3), Tcell, Tplus,  /* then add an extra cell */
//     Tcell, Tplus, Texit ];

// export const commaxt = [ CODE(enter), Ticomma, Texit ];
// export const storecf = [ CODE(enter), Tistore, Texit ];
// export const commacf = [ CODE(enter), Tihere, Tstorecf, Tcell, Tiallot, Texit ];
// export const commaexit = [ CODE(enter), Tlit, Texit, Tcommaxt, Texit ];

//     /* the c model uses relative addressing from the location of the
//      * offset cell */
// export const commabranch = [ CODE(enter), Ticomma, Texit ];
// export const commadest = [ CODE(enter), Tihere, Tminus, Ticomma, Texit ];
// export const storedest = [ CODE(enter), Ttuck, Tminus, Tswap, Tistore, Texit ];
// export const commanone = [ CODE(enter), Tcell, Tiallot, Texit ];

// export const twofetch = [ CODE(enter), Tdup, Tcellplus, Tfetch, Tswap, Tfetch, Texit ];
// export const twostore = [ CODE(enter), Tswap, Tover, Tstore, Tcellplus, Tstore, Texit ];
// export const twodrop = [ CODE(enter), Tdrop, Tdrop, Texit ];
// // export const twodup = [ CODE(enter), Tover, Tover, Texit ];
// export const twoswap = [ CODE(enter), Trot, Ttor, Trot, Trfrom, Texit ];
// export const twoover = [ CODE(enter), Ttor, Ttor, Ttwodup, Trfrom, Trfrom,
//                     Ttwoswap, Texit ];

// export const stod = [ CODE(enter), Tdup, Tzeroless, Texit ];
// export const qnegate = [ CODE(enter), Tzeroless,
//                     Tqbranch, OFFSET(2), Tnegate, Texit ];
// export const abs = [ CODE(enter), Tdup, Tqnegate, Texit ];
// export const dnegate = [ CODE(enter), Tswap, Tinvert, Tswap, Tinvert,
//                     Tone, Tmplus, Texit ];
// export const qdnegate = [ CODE(enter), Tzeroless,
//                     Tqbranch, OFFSET(2), Tdnegate, Texit ];
// export const dabs = [ CODE(enter), Tdup, Tqdnegate, Texit ];

// export const mstar = [ CODE(enter), Ttwodup, Txor, Ttor,
//                     Tswap, Tabs, Tswap, Tabs, Tumstar,
//                     Trfrom, Tqdnegate, Texit ];
// export const smslashrem = [ CODE(enter), Ttwodup, Txor, Ttor, Tover, Ttor,
//                     Tabs, Ttor, Tdabs, Trfrom, Tumslashmod, Tswap,
//                     Trfrom, Tqnegate, Tswap, Trfrom, Tqnegate, Texit ];
// export const fmslashmod = [ CODE(enter), Tdup, Ttor, Ttwodup, Txor, Ttor, Ttor,
//                     Tdabs, Trfetch, Tabs, Tumslashmod,
//                     Tswap, Trfrom, Tqnegate, Tswap, Trfrom, Tzeroless,
//                     Tqbranch, OFFSET(10),
//                     Tnegate, Tover, Tqbranch, OFFSET(6),
//                     Trfetch, Trot, Tminus, Tswap, Toneminus,
//                     /* branch dest */ Trfrom, Tdrop, Texit ];
// export const star = [ CODE(enter), Tmstar, Tdrop, Texit ];
// export const slashmod = [ CODE(enter), Ttor, Tstod, Trfrom, Tfmslashmod, Texit ];
// export const slash = [ CODE(enter), Tslashmod, Tnip, Texit ];
// export const mod = [ CODE(enter), Tslashmod, Tdrop, Texit ];
// export const starslashmod = [ CODE(enter), Ttor, Tmstar, Trfrom, Tfmslashmod, Texit ];
// export const starslash = [ CODE(enter), Tstarslashmod, Tnip, Texit ];
// export const max = [ CODE(enter), Ttwodup, Tless, Tqbranch, OFFSET(2), Tswap,
//                 Tdrop, Texit ];
// export const min = [ CODE(enter), Ttwodup, Tgreater, Tqbranch, OFFSET(2), Tswap,
//                 Tdrop, Texit ];
// export const umax = [ CODE(enter), Ttwodup, Tuless, Tqbranch, OFFSET(2), Tswap,
//                 Tdrop, Texit ];
// export const umin = [ CODE(enter), Ttwodup, Tugreater, Tqbranch, OFFSET(2), Tswap,
//                 Tdrop, Texit ];

// export const cells = [ CODE(enter), Tcell, Tstar, Texit ];
// export const storecolon = [ CODE(enter), Ttwo, Tcells, Tnegate, Tiallot,
//                       Tlit, Fenter, Tcommacf, Texit ];

// export const count = [ CODE(enter), Tdup, Tcharplus, Tswap, Tcfetch, Texit ];
// export const cr = [ CODE(enter), Tlit, LIT(0x0d), Temit, Tlit, LIT(0x0a), Temit,
//                 Texit ];
// export const space = [ CODE(enter), Tlit, LIT(0x20), Temit, Texit ];
// export const spaces = [ CODE(enter), Tdup, Tqbranch, OFFSET(5), Tspace, Toneminus,
//                 Tbranch, OFFSET(-6), Tdrop, Texit ];

// // #ifdef LINUX
// // #define NEWLINE 0x0a
// // #define BACKSPACE 0x7f      /* key returned for backspace */
// // #define BACKUP  8           /* what to emit for backspace */
// // #else
// // #define NEWLINE 0x0d
// // #define BACKSPACE 8         /* key returned for backspace */
// // #define BACKUP  8           /* what to emit for backspace */
// // #endif

// export const accept = [ CODE(enter), Tover, Tplus, Toneminus, Tover,
// /* 1 */  Tkey, Tdup, Tlit, LIT(NEWLINE), Tnotequal, Tqbranch, OFFSET(27 /*5*/),
//          Tdup, Tlit, LIT(BACKSPACE), Tequal, Tqbranch, OFFSET(12 /*3*/),
//          Tdrop, Tlit, LIT(BACKUP), Temit, Toneminus, Ttor, Tover, Trfrom,
//          Tumax, Tbranch, OFFSET(8 /*4*/),
// /* 3 */  Tdup, Temit, Tover, Tcstore, Toneplus, Tover, Tumin,
// /* 4 */  Tbranch, OFFSET(-32 /*1*/),
// /* 5 */  Tdrop, Tnip, Tswap, Tminus, Texit ];

// export const type = [ CODE(enter), Tqdup, Tqbranch, OFFSET(12 /*4*/),
//          Tover, Tplus, Tswap, Txdo,
// /* 3 */  Ti, Tcfetch, Temit, Txloop, OFFSET(-4 /*3*/),
//          Tbranch,  OFFSET(2 /*5*/),
// /* 4 */  Tdrop,
// /* 5 */  Texit ];

// // #define Ticount Tcount
// // #define Titype Ttype

// export const udslashmod = [ CODE(enter), Ttor, Tzero, Trfetch, Tumslashmod, Trot, Trot,
//          Trfrom, Tumslashmod, Trot, Texit ];
// export const udstar = [ CODE(enter), Tdup, Ttor, Tumstar, Tdrop,
//          Tswap, Trfrom, Tumstar, Trot, Tplus, Texit ];

// export const hold = [ CODE(enter), Tminusone, Thp, Tplusstore,
//                 Thp, Tfetch, Tcstore, Texit ];
// export const lessnum = [ CODE(enter), Tlit, &holdarea[HOLDSIZE-1], Thp, Tstore, Texit ];
// export const todigit = [ CODE(enter), Tdup, Tlit, LIT(9), Tgreater, Tlit, LIT(7),
//                 Tand, Tplus, Tlit, LIT(0x30), Tplus, Texit ];
// export const num = [ CODE(enter), Tbase, Tfetch, Tudslashmod, Trot, Ttodigit,
//                 Thold, Texit ];
// export const nums = [ CODE(enter), Tnum, Ttwodup, Tor, Tzeroequal, Tqbranch, OFFSET(-5),
//                 Texit ];
// export const numgreater = [ CODE(enter), Ttwodrop, Thp, Tfetch,
//                 Tlit, &holdarea[HOLDSIZE-1], Tover, Tminus, Texit ];
// export const sign = [ CODE(enter), Tzeroless, Tqbranch, OFFSET(4), Tlit, LIT(0x2d),
//                 Thold, Texit ];
// export const udot = [ CODE(enter), Tlessnum, Tzero, Tnums, Tnumgreater, Ttype,
//                 Tspace, Texit ];
// export const dot = [ CODE(enter), Tlessnum, Tdup, Tabs, Tzero, Tnums, Trot, Tsign,
//                 Tnumgreater, Ttype, Tspace, Texit ];
// export const decimal = [ CODE(enter), Tlit, LIT(10), Tbase, Tstore, Texit ];
// export const hex = [ CODE(enter), Tlit, LIT(16), Tbase, Tstore, Texit ];

// export const source = [ CODE(enter), Tticksource, Ttwofetch,  Texit ];
// export const slashstring = [ CODE(enter), Trot, Tover, Tplus, Trot, Trot, Tminus,
//                         Texit ];
// export const tocounted = [ CODE(enter), Ttwodup, Tcstore, Tcharplus, Tswap, Tcmove,
//                         Texit ];
// export const adrtoin = [ CODE(enter), Tsource, Trot, Trot, Tminus, Tmin, Tzero, Tmax,
//                     Ttoin, Tstore, Texit ];
// export const parse = [ CODE(enter), Tsource, Ttoin, Tfetch, Tslashstring,
//         Tover, Ttor, Trot, Tscan, Tover, Tswap, Tqbranch, OFFSET(2),
//         Tcharplus, Tadrtoin, Trfrom, Ttuck, Tminus, Texit ];
// export const word = [ CODE(enter), Tdup, Tsource, Ttoin, Tfetch, Tslashstring,
//         Trot, Tskip, Tdrop, Tadrtoin, Tparse, There, Ttocounted, There,
//         Tbl, Tover, Tcount, Tplus, Tcstore, Texit ];

// /* (S") S" ." for unified code/data space */
// export const xsquote = [ CODE(enter), Trfrom, Tcount, Ttwodup, Tplus, Taligned, Ttor,
//          Texit ];

// export const squote = [ CODE(enter), Tlit, Txsquote, Tcommaxt,
//          Tlit, LIT(0x22), Tword, Tcfetch, Toneplus,
//          Taligned, Tallot, Texit ];

// // #define Txisquote Txsquote
// // #define Tisquote  Tsquote

// export const dotquote = [ CODE(enter), Tsquote, Tlit, Ttype, Tcommaxt, Texit ];

//     /* Dictionary header [sizes in bytes]:
//      *   link[4], cfa[4], flags[1], name[n]
//      * Note that link is to the previous name field. */

// // export const lfatonfa = [ CODE(enter), Tlit, LIT(CELL*2 + 1), Tplus, Texit ];
// export const nfatolfa = [ CODE(enter), Tlit, LIT(CELL*2 + 1), Tminus, Texit ];
// // export const lfatocfa = [  Fenter, Tcell, Tplus, Thfetch, Texit ];
// export const nfatocfa = [  Fenter, Tlit, LIT(CELL+1), Tminus, Thfetch, Texit ];
// export const immedq = [ CODE(enter), Toneminus, Thcfetch, Tone, Tand, Texit ];

// export const find = [ CODE(enter), Tlatest, Tfetch,
//  /*1*/  Ttwodup, Tover, Tcfetch, Tcharplus,
//         Tnequal, Tdup, Tqbranch, OFFSET(5 /*2*/),
//         Tdrop, Tnfatolfa, Thfetch, Tdup,
//  /*2*/  Tzeroequal, Tqbranch, OFFSET(-14 /*1*/),
//         Tdup, Tqbranch, OFFSET(9 /*3*/),
//         Tnip, Tdup, Tnfatocfa,
//         Tswap, Timmedq, Tzeroequal, Tone, Tor,
//  /*3*/  Texit ];

// export const literal = [ CODE(enter),
//         Tstate, Tfetch, Tqbranch, OFFSET(5),
//         Tlit, Tlit, Tcommaxt, Ticomma,
//         Texit ];

// export const digitq = [ CODE(enter),
//         Tdup, Tlit, LIT(0x39), Tgreater, Tlit, LIT(0x100), Tand, Tplus,
//         Tdup, Tlit, LIT(0x140), Tgreater, Tlit, LIT(0x107), Tand,
//         Tminus, Tlit, LIT(0x30), Tminus,
//         Tdup, Tbase, Tfetch, Tuless, Texit ];

// export const qsign = [ CODE(enter),
//         Tover, Tcfetch, Tlit, LIT(0x2c), Tminus, Tdup, Tabs,
//         Tone, Tequal, Tand, Tdup, Tqbranch, OFFSET(6),
//             Toneplus, Ttor, Tone, Tslashstring, Trfrom,
//         Texit ];

// export const tonumber = [ CODE(enter),
//  /*1*/  Tdup, Tqbranch, OFFSET(21 /*3*/),
//         Tover, Tcfetch, Tdigitq,
//         Tzeroequal, Tqbranch, OFFSET (3 /*2*/),
//         Tdrop, Texit,
//  /*2*/  Ttor, Ttwoswap, Tbase, Tfetch, Tudstar,
//         Trfrom, Tmplus, Ttwoswap,
//         Tone, Tslashstring, Tbranch, OFFSET (-22 /*1*/),
//  /*3*/  Texit ];

// export const qnumber = [ CODE(enter), Tdup, Tzero, Tdup, Trot, Tcount,
//         Tqsign, Ttor, Ttonumber, Tqbranch, OFFSET(7 /*1*/),
//         Trfrom, Ttwodrop, Ttwodrop, Tzero,
//         Tbranch, OFFSET(8 /*3*/),
//  /*1*/  Ttwodrop, Tnip, Trfrom, Tqbranch, OFFSET(2 /*2*/),
//         Tnegate,
//  /*2*/  Tminusone,
//  /*3*/  Texit ];

// // extern export const void * Tabort[];   /* forward reference */

// export const interpret = [ CODE(enter),
//         Tticksource, Ttwostore, Tzero, Ttoin, Tstore,
//  /*1*/  Tbl, Tword, Tdup, Tcfetch, Tqbranch, OFFSET(33 /*9*/),
//         Tfind, Tqdup, Tqbranch, OFFSET(14 /*4*/),
//         Toneplus, Tstate, Tfetch, Tzeroequal, Tor,
//         Tqbranch, OFFSET(4 /*2*/),
//         Texecute, Tbranch, OFFSET(2 /*3*/),
//  /*2*/  Tcommaxt,
//  /*3*/  Tbranch, OFFSET(14 /*8*/),
//  /*4*/  Tqnumber, Tqbranch, OFFSET(4 /*5*/),
//         Tliteral, Tbranch, OFFSET(8 /*6*/),
//  /*5*/  Tcount, Ttype, Tlit, LIT(0x3f), Temit, Tcr, Tabort,
//  /*6*/
//  /*8*/  Tbranch, OFFSET(-37 /*1*/),
//  /*9*/  Tdrop, Texit ];

// export const evaluate = [ CODE(enter), Tticksource, Ttwofetch, Ttor, Ttor,
//         Ttoin, Tfetch, Ttor, Tinterpret,
//         Trfrom, Ttoin, Tstore, Trfrom, Trfrom,
//         Tticksource, Ttwostore, Texit ];

// // export const char okprompt[] = "\003ok ";

// export const quit = [ CODE(enter), Tl0, Tlp, Tstore,
//         Tr0, Trpstore, Tzero, Tstate, Tstore,
//  /*1*/  Ttib, Tdup, Ttibsize, Taccept, Tspace, Tinterpret,
//         Tcr, Tstate, Tfetch, Tzeroequal, Tqbranch, OFFSET(5 /*2*/),
//         Tlit, okprompt, Ticount, Titype,
//  /*2*/  Tbranch, OFFSET(-17 /*1*/) ];     // never exits

// export const abort = [ CODE(enter), Ts0, Tspstore, Tquit ];

// export const qabort = [ CODE(enter), Trot, Tqbranch, OFFSET(3), Titype, Tabort,
//                    Ttwodrop, Texit ];

// export const abortquote = [ CODE(enter), Tisquote, Tlit, Tqabort, Tcommaxt, Texit ];

// export const char huhprompt[] = "\001?";

// export const tick = [ CODE(enter), Tbl, Tword, Tfind, Tzeroequal,
//         Tlit, huhprompt, Ticount, Tqabort, Texit ];

// /* COMPILER */

// export const char = [ CODE(enter), Tbl, Tword, Toneplus, Tcfetch, Texit ];

// export const bracchar = [ CODE(enter), Tchar, Tlit, Tlit, Tcommaxt, Ticomma, Texit ];

// export const paren = [ CODE(enter), Tlit, LIT(0x29), Tparse, Ttwodrop, Texit ];

// /* header is  { link-to-nfa, cfa, flags, name }  where default cfa,
//  * in unified memory space, is immediately following header */

// export const header = [ CODE(enter), Tlatest, Tfetch, Thcomma, /* link */
//         Thhere, Tcell, Thallot,                 /* reserve cell for cfa */
//         Tzero, Thccomma,                        /* flags byte */
//         Thhere, Tlatest, Tstore,                /* new latest = nfa */
//         Tbl, Thword, Thcfetch, Toneplus, Thallot,   /* name field */
//         Talign, Tihere, Tswap, Thstore, Texit ];    /* patch cfa cell */

// /* defined word is { Fdobuilds, Tdoesword, ... }
//  * Fdobuilds is installed by DOES> so we can use CREATE or <BUILDS.
//  * Both CREATE and <BUILDS should reserve the two cells */

// export const create = [ CODE(enter), Theader, Tlit, Fdocreate, Tcommacf,
//         Tihere, Tcellplus, Ticomma, Texit ];

// export const builds = [ CODE(enter), Tcreate, Texit ];    /* same as CREATE */

// export const variable = [ CODE(enter), Theader, Tlit, Fdovar, Tcommacf,
//         Tihere, Tcellplus, Ticomma, Tcell, Tiallot, Texit ];
//         /* TODO: this is inline variable. fix for RAM/ROM */

// export const constant = [ CODE(enter), Theader, Tlit, Fdocon, Tcommacf,
//         Ticomma, Texit ];

// export const user = [ CODE(enter), Theader, Tlit, Fdouser, Tcommacf,
//         Ticomma, Texit ];

// /* defining word thread is
//  *   { ...build code... Txdoes, Fenter, ...DOES> code.... }
//  *                              \--headless Forth word--/     */

// export const xdoes = [ CODE(enter), Trfrom,           /* xt of headless doesword */
//         Tlatest, Tfetch, Tnfatocfa,         /* cfa of word being built */
//         Tlit, Fdobuilds, Tover, Tstorecf,   /* first cell: Fdobuilds */
//         Tcellplus, Tistore,                 /* second cell: xt of doesword */
//         Texit ];

// export const does = [ CODE(enter), Tlit, Txdoes, Tcommaxt,
//         Tlit, Fenter, Ticomma, Texit ];

// export const recurse = [ CODE(enter), Tnewest, Tfetch, Tnfatocfa, Tcommaxt, Texit ];

// export const leftbracket = [ CODE(enter), Tzero, Tstate, Tstore, Texit ];

// export const rightbracket = [ CODE(enter), Tminusone, Tstate, Tstore, Texit ];

// export const hide = [ CODE(enter), Tlatest, Tfetch, Tdup, Tnewest, Tstore,
//         Tnfatolfa, Thfetch, Tlatest, Tstore, Texit ];

// export const reveal = [ CODE(enter), Tnewest, Tfetch, Tlatest, Tstore, Texit ];

// export const immediate = [ CODE(enter), Tone, Tlatest, Tfetch,
//         Tone, Tchars, Tminus, Thcstore, Texit ];

// export const colon = [ CODE(enter), Tbuilds, Thide, Trightbracket, Tstorecolon,
//         Texit ];

// export const semicolon = [ CODE(enter), Treveal, Tcommaexit, Tleftbracket, Texit ];

// export const brackettick = [ CODE(enter), Ttick, Tlit, Tlit, Tcommaxt, Ticomma, Texit ];

// export const postpone = [ CODE(enter), Tbl, Tword, Tfind, Tdup, Tzeroequal,
//         Tlit, huhprompt, Ticount, Tqabort,
//         Tzeroless, Tqbranch, OFFSET(10),
//         Tlit, Tlit, Tcommaxt, Ticomma,
//         Tlit, Tcommaxt, Tcommaxt, Tbranch, OFFSET(2),
//         Tcommaxt, Texit ];

// export const compile = [ CODE(enter), Trfrom, Tdup, Tcellplus, Ttor,
//         Tifetch, Tcommaxt, Texit ];

// /* CONTROL STRUCTURES */

// export const if = [ CODE(enter), Tlit, Tqbranch, Tcommabranch, Tihere, Tcommanone,
//         Texit ];
// export const then = [ CODE(enter), Tihere, Tswap, Tstoredest, Texit ];
// export const else = [ CODE(enter), Tlit, Tbranch, Tcommabranch, Tihere, Tcommanone,
//         Tswap, Tthen, Texit ];
// export const begin = [ CODE(enter), Tihere, Texit ];
// export const until = [ CODE(enter), Tlit, Tqbranch, Tcommabranch, Tcommadest, Texit ];
// export const again = [ CODE(enter), Tlit, Tbranch, Tcommabranch, Tcommadest, Texit ];
// export const while = [ CODE(enter), Tif, Tswap, Texit ];
// export const repeat = [ CODE(enter), Tagain, Tthen, Texit ];

// export const tol = [ CODE(enter), Tcell, Tlp, Tplusstore, Tlp, Tfetch, Tstore, Texit ];
// export const lfrom = [ CODE(enter), Tlp, Tfetch, Tfetch, Tcell, Tnegate, Tlp,
//         Tplusstore, Texit ];
// export const do = [ CODE(enter), Tlit, Txdo, Tcommaxt, Tihere, Tzero, Ttol, Texit ];
// export const endloop = [ CODE(enter), Tcommabranch, Tcommadest,
//         Tlfrom, Tqdup, Tqbranch, OFFSET(4), Tthen, Tbranch, OFFSET(-6),
//         Texit ];
// export const loop = [ CODE(enter), Tlit, Txloop, Tendloop, Texit ];
// export const plusloop = [ CODE(enter), Tlit, Txplusloop, Tendloop, Texit ];
// export const leave = [ CODE(enter), Tlit, Tunloop, Tcommaxt,
//         Tlit, Tbranch, Tcommabranch, Tihere, Tcommanone, Ttol, Texit ];

// export const within = [ CODE(enter), Tover, Tminus, Ttor, Tminus, Trfrom,
//         Tuless, Texit ];
// export const move) =  { Fenter, Ttor, Ttwodup, Tswap, Tdup, Trfetch, Tplus,
//         Twithin, Tqbranch, OFFSET(5), Trfrom, Tcmoveup, Tbranch, OFFSET(3),
//         Trfrom, Tcmove, Texit ];
// export const depth = [ CODE(enter), Tspfetch, Ts0, Tswap, Tminus, Tcell, Tslash,
//         Texit ];
// export const environmentq = [ CODE(enter), Ttwodrop, Tzero, Texit ];

// /*
// export const  = [ CODE(enter),   Texit ];
// export const  = [ CODE(enter),   Texit ];
// export const  = [ CODE(enter),   Texit ];
// */

// export const marker = [ CODE(enter), Tlatest, Tfetch, Tihere, There,
//         Tbuilds, Ticomma, Ticomma, Ticomma, Txdoes,
//         /* DOES> action as a headerless Forth word */
//         Fenter, Tdup, Tifetch, Tswap, Tcellplus, Tdup, Tifetch,
//         Tswap, Tcellplus, Tifetch,
//         Tlatest, Tstore, Tidp, Tstore, Tdp, Tstore, Texit ];

// // #define Thcount Tcount
// // #define Thtype Ttype

// export const words = [ CODE(enter), Tlatest, Tfetch,
//  /*1*/  Tdup, Thcount, Tlit, LIT(0x7f), Tand, Thtype, Tspace,
//         Tnfatolfa, Thfetch, Tdup, Tzeroequal, Tqbranch, OFFSET(-12),
//         Tdrop, Texit, ];

// /* MAIN ENTRY POINT */

// export const char coldprompt[] = "\042CamelForth in C v0.1 - 14 Feb 2016";

// export const cold = [ CODE(enter),
//     Tuinit, Tu0, Tninit, Titod,     /* important initialization! */
//     Tlit, coldprompt, Tcount, Ttype, Tcr,
//     Tabort, ];                      /* Tabort never exits */

// /*
//  * INNER INTERPRETER
//  */

// /*
//  * DICTIONARY HEADERS
//  */

// HEADER(exit, 0, 'exit');
// HEADER(execute, 0, 'EXECUTE');
HEADER(lit, 0, 'lit');
HEADER(dup, 0, 'DUP');
// HEADER(qdup, dup, 0, "\004?DUP");
// HEADER(drop, qdup, 0, "\004DROP");
// HEADER(swap, drop, 0, "\004SWAP");
// HEADER(over, swap, 0, "\004OVER");
// HEADER(rot, over, 0, "\003ROT");
// HEADER(nip, rot, 0, "\003NIP");
// HEADER(tuck, nip, 0, "\004TUCK");
// HEADER(tor, tuck, 0, "\002>R");
// HEADER(rfrom, tor, 0, "\002R>");
// HEADER(rfetch, rfrom, 0, "\002R@");
// HEADER(spfetch, rfetch, 0, "\003SP@");
// HEADER(spstore, spfetch, 0, "\003SP!");
// HEADER(rpfetch, spstore, 0, "\003RP@");
// HEADER(rpstore, rpfetch, 0, "\003RP!");
// HEADER(fetch, rpstore, 0, "\001@");
// HEADER(store, fetch, 0, "\001!");
// HEADER(cfetch, store, 0, "\002C@");
// HEADER(cstore, cfetch, 0, "\002C!");

// /* synonyms for unified code/data/header space */
// HEADER(ifetch, cstore, 0, "\002I@");
// HEADER(istore, ifetch, 0, "\002I!");
// HEADER(icfetch, istore, 0, "\003IC@");
// HEADER(icstore, icfetch, 0, "\003IC!");
// HEADER(hfetch, icstore, 0, "\002H@");
// HEADER(hstore, hfetch, 0, "\002H!");
// HEADER(hcfetch, hstore, 0, "\003HC@");
// HEADER(hcstore, hcfetch, 0, "\003HC!");

// HEADER(plus, hcstore, 0, "\001+");
// HEADER(plusstore, plus, 0, "\002+!");
// HEADER(mplus, plusstore, 0, "\002M+");
// HEADER(minus, mplus, 0, "\001-");
// HEADER(mult, minus, 0, "\001*");
// HEADER(div, mult, 0, "\001/");
// HEADER(and, div, 0, "\003AND");
// HEADER(or, and, 0, "\002OR");
// HEADER(xor, or, 0, "\003XOR");
// HEADER(invert, xor, 0, "\006INVERT");
// HEADER(negate, invert, 0, "\006NEGATE");
// HEADER(oneplus, negate, 0, "\0021+");
// HEADER(oneminus, oneplus, 0, "\0021-");
// HEADER(swapbytes, oneminus, 0, "\002><");
// HEADER(twostar, swapbytes, 0, "\0022*");
// HEADER(twoslash, twostar, 0, "\0022/");
// HEADER(lshift, twoslash, 0, "\006LSHIFT");
// HEADER(rshift, lshift, 0, "\006RSHIFT");

// HEADER(zeroequal, rshift, 0, "\0020=");
// HEADER(zeroless, zeroequal, 0, "\0020<");
// HEADER(equal, zeroless, 0, "\001=");
// HEADER(notequal, equal, 0, "\002<>");
// HEADER(less, notequal, 0, "\001<");
// HEADER(greater, less, 0, "\001>");
// HEADER(uless, greater, 0, "\002U<");
// HEADER(ugreater, uless, 0, "\002U>");

// HEADER(branch, ugreater, 0, "\006branch");
// HEADER(qbranch, branch, 0, "\007?branch");
// HEADER(xplusloop, qbranch, 0, "\007(+loop)");
// HEADER(xloop, xplusloop, 0, "\006(loop)");
// HEADER(xdo, xloop, 0, "\004(do)");
// HEADER(i, xdo, 0, "\001I");
// HEADER(j, i, 0, "\001J");
// HEADER(unloop, j, 0, "\006UNLOOP");
// HEADER(umstar, unloop, 0, "\003UM*");
// HEADER(umslashmod, umstar, 0, "\006UM/MOD");
// HEADER(fill, umslashmod, 0, "\004FILL");
// HEADER(cmove, fill, 0, "\005CMOVE");
// HEADER(cmoveup, cmove, 0, "\006CMOVE>");
// HEADER(itod, cmoveup, 0, "\004I->D");

// HEADER(skip, itod, 0, "\004SKIP");
// HEADER(scan, skip, 0, "\004SCAN");
// HEADER(sequal, scan, 0, "\002S=");
// HEADER(nequal, sequal, 0, "\002N=");

// HEADER(key, nequal, 0, "\003KEY");
// HEADER(emit, key, 0, "\004EMIT");
// HEADER(keyq, emit, 0, "\004KEY?");
// HEADER(bye, keyq, 0, "\003BYE");

// HEADER(u0, bye, 0, "\002U0");
// HEADER(toin, u0, 0, "\003>IN");
// HEADER(base, toin, 0, "\004BASE");
// HEADER(state, base, 0, "\005STATE");
// HEADER(dp, state, 0, "\002DP");
// HEADER(ticksource, dp, 0, "\007'SOURCE");
// HEADER(latest, ticksource, 0, "\006LATEST");
// HEADER(hp, latest, 0, "\002HP");
// HEADER(lp, hp, 0, "\002LP");
// HEADER(idp, lp, 0, "\003IDP");
// HEADER(newest, lp, 0, "\006NEWEST");
// HEADER(uinit, newest, 0, "\005UINIT");
// HEADER(ninit, uinit, 0, "\005#INIT");
// HEADER(pad, ninit, 0, "\003PAD");
// HEADER(l0, pad, 0, "\002L0");
// HEADER(s0, l0, 0, "\002S0");
// HEADER(r0, s0, 0, "\002R0");
// HEADER(tib, r0, 0, "\003TIB");
// HEADER(tibsize, tib, 0, "\007TIBSIZE");
// HEADER(bl, tibsize, 0, "\002BL");
// HEADER(zero, bl, 0, "\0010");
// HEADER(one, zero, 0, "\0011");
// HEADER(two, one, 0, "\0012");
// HEADER(three, two, 0, "\0013");
// HEADER(minusone, three, 0, "\002-1");
// HEADER(cell, minusone, 0, "\004CELL");
// HEADER(chars, cell, 0, "\005CHARS");
// HEADER(here, chars, 0, "\004HERE");
// HEADER(allot, here, 0, "\005ALLOT");
// HEADER(comma, allot, 0, "\001,");
// HEADER(ccomma, comma, 0, "\002C,");
// HEADER(aligned, ccomma, 0, "\007ALIGNED");
// HEADER(align, aligned, 0, "\005ALIGN");
// HEADER(cellplus, align, 0, "\005CELL+");
// HEADER(charplus, cellplus, 0, "\005CHAR+");
// HEADER(tobody, charplus, 0, "\005>BODY");
// HEADER(commaxt, tobody, 0, "\010COMPILE,");
// HEADER(storecf, commaxt, 0, "\003!CF");
// HEADER(commacf, storecf, 0, "\003,CF");
// HEADER(storecolon, commacf, 0, "\006!COLON");
// HEADER(commaexit, storecolon, 0, "\005,EXIT");
// HEADER(commabranch, commaexit, 0, "\007,BRANCH");
// HEADER(commadest, commabranch, 0, "\005,DEST");
// HEADER(storedest, commadest, 0, "\005!DEST");
// HEADER(commanone, storedest, 0, "\005,NONE");
// HEADER(twofetch, commanone, 0, "\0022@");
// HEADER(twostore, twofetch, 0, "\0022!");
// HEADER(twodrop, twostore, 0, "\0052DROP");
// HEADER(twodup, twodrop, 0, "\0042DUP");
// HEADER(twoswap, twodup, 0, "\0052SWAP");
// HEADER(twoover, twoswap, 0, "\0052OVER");
// HEADER(stod, twoover, 0, "\003S>D");
// HEADER(qnegate, stod, 0, "\007?NEGATE");
// HEADER(abs, qnegate, 0, "\003ABS");
// HEADER(dnegate, abs, 0, "\007DNEGATE");
// HEADER(qdnegate, dnegate, 0, "\010?DNEGATE");
// HEADER(dabs, qdnegate, 0, "\004DABS");
// HEADER(mstar, dabs, 0, "\002M*");
// HEADER(smslashrem, mstar, 0, "\006SM/REM");
// HEADER(fmslashmod, smslashrem, 0, "\006FM/MOD");
// HEADER(star, fmslashmod, 0, "\001*");
// HEADER(slashmod, star, 0, "\004/MOD");
// HEADER(slash, slashmod, 0, "\001/");
// HEADER(mod, slash, 0, "\003MOD");
// HEADER(starslashmod, mod, 0, "\005*/MOD");
// HEADER(starslash, starslashmod, 0, "\002*/");
// HEADER(max, starslash, 0, "\003MAX");
// HEADER(min, max, 0, "\003MIN");
// HEADER(umax, min, 0, "\004UMAX");
// HEADER(umin, umax, 0, "\004UMIN");
// HEADER(cells, umin, 0, "\005CELLS");
// HEADER(count, cells, 0, "\005COUNT");
// HEADER(cr, count, 0, "\002CR");
// HEADER(space, cr, 0, "\005SPACE");
// HEADER(spaces, space, 0, "\006SPACES");
// HEADER(accept, spaces, 0, "\006ACCEPT");
// HEADER(type, accept, 0, "\004TYPE");
// HEADER(udslashmod, type, 0, "\006UD/MOD");
// HEADER(udstar, udslashmod, 0, "\003UD*");
// HEADER(hold, udstar, 0, "\004HOLD");
// HEADER(lessnum, hold, 0, "\002<#");
// HEADER(todigit, lessnum, 0, "\006>DIGIT");
// HEADER(num, todigit, 0, "\001#");
// HEADER(nums, num, 0, "\002#S");
// HEADER(numgreater, nums, 0, "\002#>");
// HEADER(sign, numgreater, 0, "\004SIGN");
// HEADER(udot, sign, 0, "\002U.");
// HEADER(dot, udot, 0, "\001.");
// HEADER(decimal, dot, 0, "\007DECIMAL");
// HEADER(hex, decimal, 0, "\003HEX");
// HEADER(source, hex, 0, "\006SOURCE");
// HEADER(slashstring, source, 0, "\007/STRING");
// HEADER(tocounted, slashstring, 0, "\010>COUNTED");
// HEADER(adrtoin, tocounted, 0, "\006ADR>IN");
// HEADER(parse, adrtoin, 0, "\005PARSE");
// HEADER(word, parse, 0, "\004WORD");
// HEADER(xsquote, word, 0, "\004(S\")");
// HEADER(squote, xsquote, IMMEDIATE, "\002S\"");
// HEADER(dotquote, squote, IMMEDIATE, "\002.\"");
// HEADER(nfatolfa, dotquote, 0, "\007NFA>LFA");
// HEADER(nfatocfa, nfatolfa, 0, "\007NFA>CFA");
// HEADER(immedq, nfatocfa, 0, "\006IMMED?");
// HEADER(find, immedq, 0, "\004FIND");
// HEADER(literal, find, IMMEDIATE, "\007LITERAL");
// HEADER(digitq, literal, 0, "\006DIGIT?");
// HEADER(qsign, digitq, 0, "\005?SIGN");
// HEADER(tonumber, qsign, 0, "\007>NUMBER");
// HEADER(qnumber, tonumber, 0, "\007?NUMBER");
// HEADER(interpret, qnumber, 0, "\011INTERPRET");
// HEADER(evaluate, interpret, 0, "\010EVALUATE");
// HEADER(quit, evaluate, 0, "\004QUIT");
// HEADER(abort, quit, 0, "\005ABORT");
// HEADER(qabort, abort, 0, "\006?ABORT");
// HEADER(abortquote, qabort, IMMEDIATE, "\006ABORT\"");
// HEADER(tick, abortquote, 0, "\001'");
// HEADER(char, tick, 0, "\004CHAR");
// HEADER(bracchar, char, IMMEDIATE, "\006[CHAR]");
// HEADER(paren, bracchar, IMMEDIATE, "\001(");
// HEADER(header, paren, 0, "\006HEADER");
// HEADER(builds, header, 0, "\007<BUILDS");
// HEADER(variable, builds, 0, "\010VARIABLE");
// HEADER(constant, variable, 0, "\010CONSTANT");
// HEADER(user, constant, 0, "\004USER");
// HEADER(create, user, 0, "\006CREATE");
// HEADER(xdoes, create, 0, "\007(DOES>)");
// HEADER(does, xdoes, IMMEDIATE, "\005DOES>");
// HEADER(recurse, does, IMMEDIATE, "\007RECURSE");
// HEADER(leftbracket, recurse, IMMEDIATE, "\001[");
// HEADER(rightbracket, leftbracket, 0, "\001]");
// HEADER(hide, rightbracket, 0, "\004HIDE");
// HEADER(reveal, hide, 0, "\006REVEAL");
// HEADER(immediate, reveal, 0, "\011IMMEDIATE");
// HEADER(colon, immediate, 0, "\001:");
// HEADER(semicolon, colon, IMMEDIATE, "\001;");
// HEADER(brackettick, semicolon, IMMEDIATE, "\003[']");
// HEADER(postpone, brackettick, IMMEDIATE, "\010POSTPONE");
// HEADER(compile, postpone, 0, "\007COMPILE");
// HEADER(if, compile, IMMEDIATE, "\002IF");
// HEADER(then, if, IMMEDIATE, "\004THEN");
// HEADER(else, then, IMMEDIATE, "\004ELSE");
// HEADER(begin, else, IMMEDIATE, "\005BEGIN");
// HEADER(until, begin, IMMEDIATE, "\005UNTIL");
// HEADER(again, until, IMMEDIATE, "\005AGAIN");
// HEADER(while, again, IMMEDIATE, "\005WHILE");
// HEADER(repeat, while, IMMEDIATE, "\006REPEAT");
// HEADER(tol, repeat, 0, "\002>L");
// HEADER(lfrom, tol, 0, "\002L>");
// HEADER(do, lfrom, IMMEDIATE, "\002DO");
// HEADER(endloop, do, 0, "\007ENDLOOP");
// HEADER(loop, endloop, IMMEDIATE, "\004LOOP");
// HEADER(plusloop, loop, IMMEDIATE, "\005+LOOP");
// HEADER(leave, plusloop, IMMEDIATE, "\005LEAVE");
// HEADER(within, leave, 0, "\006WITHIN");
// HEADER(move, within, 0, "\004MOVE");
// HEADER(depth, move, 0, "\005DEPTH");
// HEADER(environmentq, depth, 0, "\014ENVIRONMENT?");
// HEADER(marker, environmentq, 0, "\006MARKER");

// /* for testing */
// HEADER(dothh, marker, 0, "\003.HH");
// HEADER(dothhhh, dothh, 0, "\005.HHHH");
// HEADER(dots, dothhhh, 0, "\002.S");
// HEADER(dump, dots, 0, "\004DUMP");
// HEADER(words, dump, 0, "\005WORDS");
// HEADER(cold, words, 0, "\004COLD");
