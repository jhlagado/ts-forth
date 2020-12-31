import 'regenerator-runtime/runtime';
import { appendInputBuffer, outputBuffer, putStr, setOutputBuffer } from './io';
import { getPrompt, interpReset, interpret } from './stable';

export const log = (message: string): void => {
    const output = document.getElementById('output');
    output!.innerHTML += `<div class='log'><p>${message}</p></div>`;
};

const inputSource = document.getElementById('input_source')!;
inputSource.onblur = () => {
    inputSource.focus();
};

inputSource.addEventListener('keyup', async (event: KeyboardEvent) => {
    event.preventDefault();
    if (!(event.keyCode === 13)) return;
    const text = (inputSource as any).value;
    (inputSource as any).value = '';
    appendInputBuffer(text);
    log(`${getPrompt()} > ${text}`);
    await interpret(text);
});

const loop = () => {
    setTimeout(loop);
    if (outputBuffer.length > 0) {
        log(outputBuffer);
        setOutputBuffer('');
    }
};
loop();

setOutputBuffer('');
putStr('STABLE');
interpReset();
