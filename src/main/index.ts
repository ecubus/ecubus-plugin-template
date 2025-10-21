import { registerService, emitEvent } from '@ecubus-pro/main-plugin-sdk'













registerService("hellow", (a: unknown, b: unknown, c: unknown) => {
    console.log(a, b, c)
    return [a, b, c]
})



setInterval(() => {
    emitEvent("hello", "world")
}, 1000)