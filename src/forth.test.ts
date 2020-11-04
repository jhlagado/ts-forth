import { pdepth, ppop } from './stacks';
import { appendInputBuffer, setInputBuffer } from './io';
import { getPrimitives, THREAD } from './utils';
import { interpreter } from './forth';

const { bye, dup, lit, key, $exit } = getPrimitives();

it('should dup literal 2', async () => {
    const t = THREAD('enter', lit, 2, dup, bye);
    await interpreter(t);
    expect(pdepth()).toBe(2);
    expect(ppop()).toBe(2);
    expect(ppop()).toBe(2);
    expect(pdepth()).toBe(0);
});

it('should call a thread from another thread', async () => {
    const t = THREAD('enter', lit, 5, $exit);
    const t1 = THREAD('enter', t, bye);
    await interpreter(t1);
    expect(pdepth()).toBe(1);
    expect(ppop()).toBe(5);
});

it('should read a char', async () => {
    setTimeout(() => {
        appendInputBuffer('abc');
    }, 100);
    setInputBuffer('');
    const t = THREAD('enter', key, bye);
    await interpreter(t);
    expect(pdepth()).toBe(1);
    expect(ppop()).toBe(97);
});

it('should read a char from a thread', async () => {
    setTimeout(() => {
        appendInputBuffer('abc');
    }, 100);
    setInputBuffer('');
    const t = THREAD('enter', key, $exit);
    const t1 = THREAD('enter', t, bye);
    await interpreter(t1);
    expect(pdepth()).toBe(1);
    expect(ppop()).toBe(97);
});
