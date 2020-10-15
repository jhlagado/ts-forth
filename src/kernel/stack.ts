export class Stack {
    data: unknown[] = [];

    constructor(public name: string) {}

    pop(): unknown {
        if (this.data.length > 0) return this.data.pop();
        else {
            throw 'Stack empty: ' + name;
        }
    }

    push(element: unknown): void {
        this.data.push(element);
    }

    peek(offset: number): unknown {
        const index = this.data.length - (offset || 1);
        if (0 <= index && index < this.data.length) return this.data[index];
        else throw 'Attempted to peek at invalid stack index ' + index + ': ' + name;
    }

    roll(num: number): void {
        if (num === 0) return;

        const index = this.data.length - num - 1;
        if (0 <= index && index < this.data.length) {
            const newTop = this.data.splice(index, 1)[0];
            this.data.push(newTop);
        } else throw 'Attempted to roll more elements than in stack ' + num + ': ' + name;
    }

    length(): number {
        return this.data.length;
    }

    clear(): void {
        this.data.length = 0;
    }

    toString(): string {
        return this.data.toString();
    }
}
