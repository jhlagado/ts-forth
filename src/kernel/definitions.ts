import { Header, VM } from './vm';

export type Definitions = {};
export type Fnx = (...args: unknown[]) => unknown;

export const Definitions = (vm: VM): Definitions => {
    const compiling = vm.defvar('state', 0);

    vm.defjs(':', function colon() {
        const name = vm._readWord();
        vm.defheader(name, false, true);
        vm.compileEnter(name);
        vm.compiling(true);
    });

    vm.defjs(':noname', function noname() {
        defheader(null, false, true);
        vm.stack.push(vm.dataSpace.length);
        vm.compileEnter('_noname_');
        vm.compiling(true);
    });

    const exit = vm.defjs('exit', function exit() {
        vm.instructionPointer = vm.returnStack.pop();
    });

    vm.defjs(
        ';',
        function semicolon() {
            vm.dataSpace.push(exit);
            vm.dataSpace[latest()].hidden = false;
            vm.compiling(false);
        },
        true,
    ); // Immediate

    vm.defjs('find', function find() {
        const input = vm.stack.pop();
        let word = input;
        if (typeof input === 'number') {
            const startPosition = input;
            const length = vm._getAddress(startPosition);
            word = '';
            for (let i = 1; i <= length; i++) {
                word += String.fromCharCode(vm._getAddress(startPosition + i));
            }
        }
        const definition = vm.findDefinition(word);
        if (definition) {
            vm.stack.push(definition.executionToken);
            vm.stack.push(definition.immediate ? 1 : -1);
        } else {
            vm.stack.push(input);
            vm.stack.push(0);
        }
    });

    // Converts an execution token into the data field address
    vm.defjs('>body', function dataFieldAddress() {
        vm.stack.push(vm.stack.pop() + 1);
    });

    vm.defjs('create', function create() {
        defheader(vm._readWord());
        const dataFieldAddress = vm.dataSpace.length + 1;
        vm.dataSpace.push(function pushDataFieldAddress() {
            vm.stack.push(dataFieldAddress);
        });
    });

    vm.defjs('allot', function allot() {
        vm.dataSpace.length += vm.stack.pop();
    });

    vm.defjs(',', function comma() {
        vm.dataSpace.push(vm.stack.pop());
    });

    vm.defjs('compile,', function compileComma() {
        vm.dataSpace.push(vm.dataSpace[vm.stack.pop()]);
    });

    vm.defjs(
        '[',
        function lbrac() {
            vm.compiling(false); // Immediate
        },
        true,
    ); // Immediate

    vm.defjs(']', function rbrac() {
        vm.compiling(true); // Compile
    });

    vm.defjs('immediate', function immediate() {
        const wordDefinition = vm.dataSpace[latest()];
        wordDefinition.immediate = true;
    });

    vm.defjs('hidden', function hidden() {
        const wordDefinition = vm.dataSpace[vm.stack.pop()];
        wordDefinition.hidden = !wordDefinition.hidden;
    });

    vm.defjs("'", function tick() {
        vm.stack.push(vm.findDefinition(vm._readWord()).executionToken);
    });

    const _lit = vm.defjs('lit', function lit() {
        vm.stack.push(vm.dataSpace[vm.instructionPointer]);
        vm.instructionPointer++;
    });

    vm.defjs(
        "[']",
        function bracketTick() {
            vm.dataSpace.push(vm._lit);
            vm.dataSpace.push(vm.findDefinition(vm._readWord()).executionToken);
        },
        true,
    );

    vm.defjs('marker', function marker() {
        const savedLatest = latest();
        const savedLength = vm.dataSpace.length;

        defheader(vm._readWord());
        vm.dataSpace.push(function marker() {
            latest(savedLatest);
            vm.dataSpace.length = savedLength;
        });
    });

    vm._latest = latest;
    vm._lit = _lit;
    return vm;
};
