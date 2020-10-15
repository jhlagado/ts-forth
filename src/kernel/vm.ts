import { Stack } from './stack';

export class Header {
    constructor(
        public link: number,
        public name: string,
        public immediate = false,
        public hidden = false,
        public executionToken: number,
    ) {}
}

export type Fn = () => void;
export type VarFn = (value?: unknown) => unknown;

export class VM {
    instructionPointer = 0;
    dataSpace: unknown[] = [];
    returnStack = new Stack('Return Stack');
    stack = new Stack('Stack');

    latest = this.defvar('latest', this.dataSpace.length); // Replace existing function definition

    defheader(name: string, immediate?: boolean, hidden?: boolean): void {
        const header = new Header(this.latest() as number, name, immediate, hidden, this.dataSpace.length + 1);
        this.dataSpace.push(header);
        this.latest(this.dataSpace.length - 1);
    }

    defjs(name: string, fn: Fn, immediate = false, displayName?: string): Fn {
        this.defheader(displayName || name, immediate);
        this.dataSpace.push(fn);
        return fn;
    }

    defvar(name: string, initial: unknown): VarFn {
        this.defheader(name);
        const varAddress = this.dataSpace.length + 1;
        this.dataSpace.push(() => {
            this.stack.push(varAddress);
        });
        this.dataSpace.push(initial);
        return (value: unknown) => {
            if (value != null) {
                this.dataSpace[varAddress] = value;
            } else {
                return this.dataSpace[varAddress];
            }
        };
    }

    compileEnter(name: string): void {
        const instruction = this.dataSpace.length + 1;

        let enter;
        try {
            enter = eval(`(
                function ${name}() {
                    f.returnStack.push(f.instructionPointer);
                    f.instructionPointer = instruction;
                })
            `);
        } catch (e) {
            // Failback for names that are invalid identifiers
            enter = () => {
                this.returnStack.push(this.instructionPointer);
                this.instructionPointer = instruction;
            };
        }

        this.dataSpace.push(enter);
        return enter;
    }

    findDefinition(word: string): number | Header {
        let current = this.latest() as number;
        while (current !== null) {
            const wordDefinition = this.dataSpace[current] as Header;
            // Case insensitive
            if (wordDefinition.name?.toLowerCase() == word.toLowerCase() && !wordDefinition.hidden) {
                return wordDefinition;
            }
            current = wordDefinition.link;
        }
        return current;
    }
}
