import { log } from './terminal';

log('ts-forth');

const buffer:string[] = [];
function x() {
    setTimeout(x, 1000);
    if (buffer.length) {
        log(buffer.join(''));
        buffer.length = 0;
    }
}
x();
buffer.push('b');
