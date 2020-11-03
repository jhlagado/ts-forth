export type Bool = number;
export type Ptr = number;
export type Fn = (pfa: Ptr) => void;

export type Header = {
    cfa: Ptr /* pointer to high level def'n */;
    link: Ptr /* pointer to previous header */;
    flags: number /* immed flag and others */;
    nfa: string /* inline name string */;
};

export type Primitive = (pfa?: Ptr, restart?: boolean) => void | boolean;
export type CodeDict = { [key: string]: Primitive };
