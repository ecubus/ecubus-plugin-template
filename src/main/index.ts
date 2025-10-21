import {registerService} from '@ecubus-pro/main-plugin-sdk'













registerService("hellow",(a:unknown,b:unknown,c:unknown)=>{
    console.log(a,b,c)
    return "hello"
})