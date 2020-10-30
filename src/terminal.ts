export const log = (message: string) => {
    var wrapper = document.getElementById('wrapper');
    wrapper!.innerHTML += "<div class='log'><p>" + message + '</p></div>';
};

const inputSource = document.getElementById('input_source')!;
inputSource.onblur = () => {
    inputSource.focus();
};
inputSource.addEventListener('keyup', (event: KeyboardEvent) => {
    event.preventDefault();
    if (!(event.keyCode === 13)) return;
    var command = (inputSource as any).value;
    (inputSource as any).value = '';

    log('> ' + command);
});
