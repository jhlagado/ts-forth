import { appendInputBuffer, outputBuffer, setOutputBuffer } from './io';

export const log = (message: string): void => {
    const wrapper = document.getElementById('wrapper');
    wrapper!.innerHTML += `<div class='log'><p>${message}</p></div>`;
};

const inputSource = document.getElementById('input_source')!;
inputSource.onblur = () => {
    inputSource.focus();
};

inputSource.addEventListener('keyup', (event: KeyboardEvent) => {
    event.preventDefault();
    if (!(event.keyCode === 13)) return;
    const text = (inputSource as any).value;
    (inputSource as any).value = '';
    appendInputBuffer(text);
    log(`> ${text}`);
});

const loop = () => {
    setTimeout(loop);
    if (outputBuffer.length > 0) {
        log(outputBuffer);
        setOutputBuffer('');
    }
};
loop();

setOutputBuffer('ts-forth');
