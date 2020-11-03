export let inputBuffer = '';

export const setInputBuffer = (value: string) => {
    inputBuffer = value;
};

export const getquery = (): boolean => inputBuffer.length > 0 && Math.random() < 0.5;

export const getch = (): number => {
    if (inputBuffer.length === 0) return 0;
    const ch = inputBuffer[0];
    inputBuffer = inputBuffer.slice(1);
    return ch.codePointAt(0)!;
};

export const putch = (value: number): void => {};
