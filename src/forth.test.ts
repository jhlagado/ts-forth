import { bye, dup, interpreter, key, lit } from './forth';
import { pdepth, ppop } from './stacks';
import { THREAD } from './code';
import { setInputBuffer } from './io';

it('should dup literal 2', async () => {
    const cold = THREAD('enter', lit, 2, dup, bye);
    await interpreter(cold);
    expect(pdepth()).toBe(2);
    expect(ppop()).toBe(2);
    expect(ppop()).toBe(2);
    expect(pdepth()).toBe(0);
});

it('should ', async () => {
    setInputBuffer('abc');
    const cold = THREAD('enter', key, dup, bye);
    await interpreter(cold);
    expect(pdepth()).toBe(2);
    expect(ppop()).toBe(97);
    expect(ppop()).toBe(97);
    expect(pdepth()).toBe(0);
});
