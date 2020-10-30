import { Ptr } from './constants';
import { mem } from './vm';

const buffer: number[] = [];

export const getc = (): number => {
    if (buffer.length === 0) return -1;
    return buffer.pop() as number;
};

export const debug = (d: number): void => {
    console.log('DEBUG: ', d, String.fromCharCode(d));
};

export const key = (): number => {
    let c: string;
    while (c == null || c == '') {
        c = window.prompt('Enter character');
    }
    return c.charCodeAt(0);
};

export const accept = (ptr: Ptr, maxlength: number): number => {
    const input = (window.prompt('Enter text') || '').substr(0, maxlength);
    for (let i = 0; i < input.length; ++i) {
        mem.setInt8(ptr, input.charCodeAt(i));
    }
    console.log('ACCEPT', ptr, maxlength, input.length);
    return input.length;
};

export const read = (s: string): void => {
    const data = new TextEncoder().encode(s);
    for (let i = data.length - 1; i >= 0; --i) {
        buffer.push(data[i]);
    }
};

export const run = (s: string): void => {
    read(s);
    try {
        // return interpret();
    } catch (e) {
        // Exceptions thrown from the core means QUIT or ABORT is called, or an error
        // has occurred. Assume what has been done has been done, and ignore here.
    }
};
