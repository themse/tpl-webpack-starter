async function start () {
    return await Promise.resolve('async is working!');
}

start().then(console.log);

class Utils {
    static greeting = 'hello';
}

console.log('Utils greeting: ', Utils.greeting);
