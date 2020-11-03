# forth async in JS

-   need a tick function which resumes execution from last time it was yielded
-   yielding happens on blocking, blocking only happens on buffered input but might happen on buffered output, there might be more than one channel of i/o
-   tick is a function which can return a value indicating the cause of block i.e. waiting for input
-   this reason is fed back to the next tick to allow continuation
    example:
-   tick needs input, returns reason
-   JS calls timeout to allow processing events etc.
-   tick is called again with reason,
-   tick returns again if blocking still needed else input is put on pstack
-   by putting a tick in function that can be restarted, it can iterate synchronously for non-blocking, does not use sophisticated async features so can be used in wasm (avoid promises, generators etc)
