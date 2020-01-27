async function start() {
  return await Promise.resolve("async is working!");
}

start().then(console.log);

class Utils {
  static greeting = "hello";
}

console.log("Utils greeting: ", Utils.greeting);

// dynamic imports
import("lodash").then(_ => {
  console.log("lodash " + _.random(0, 42, true));
});
