import $ from 'jquery';
import './index.css';

window.jQuery = $;
require('jq-console');

const jqconsole = $('#console').jqconsole('WAForth\n', '');
$('#console').hide();
$('.jqconsole-header').html("<span><a target='_blank' href='https://github.com/remko/waforth'>WAForth</a>\n</span>");

let outputBuffer: number[] = [];

forth.onEmit = (c) => {
    outputBuffer.push(String.fromCharCode(c));
};

function prompt() {
    jqconsole.Prompt(false, (input: string) => {
        jqconsole.Write(' ');

        const $el = $('.jqconsole-old-prompt span').last();
        $el.html($el.html().replace(/\n$/, ''));

        // forth.run(input);
        let output = outputBuffer.join('');
        if (output.length === 0) {
            output = '\n';
        }
        jqconsole.Write(output, 'jqconsole-output');
        outputBuffer = [];
        prompt();
    });
}

$('#message').text('Loading...');
forth.start().then(
    () => {
        // forth.run(sieve);
        outputBuffer = [];
        $('#message').hide();
        $('#console').show();
        prompt();
    },
    () => {
        $('#message').addClass('error').text('Error');
    },
);
