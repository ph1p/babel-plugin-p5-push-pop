const pluginTester = require('babel-plugin-tester').default;
const plugin = require('../');

pluginTester({
  plugin,
  tests: {
    'setup/draw': {
      code: `function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {}

window.draw = function () {}`,
      output: `window.setup = function setup() {
  createCanvas(600, 600);
  background(0);
};

window.draw = function draw() {};

window.draw = function () {};`,
    },
    'comments': {
      code: `{ // this is push();
        console.log('console1');
      } //this is pop();`,
      output: `push();
// this is push();
console.log("console1"); //this is pop();

pop();`,
    },
    'all': {
      code: `{
        console.log('console1');

  {
    console.log('log');
    console.log('log');
    console.log('log');
    console.log('log');
  }

  const testMethod = () => {
    console.log('function1');
  }


  function f() {
    console.log('function2');
  }

  for(let i; i<10; i++) {
    console.log(i);

    {
      console.log('in for')
    }
  }

  while(true) {
    console.log('while');
  }
  }

  function setup() {
  createCanvas(600, 600);
  background(0);

  {
    console.log('in setup');
  }
}`,
      output: `push();
console.log("console1");
push();
console.log("log");
console.log("log");
console.log("log");
console.log("log");
pop();

const testMethod = () => {
  console.log("function1");
};

function f() {
  console.log("function2");
}

for (let i; i < 10; i++) {
  console.log(i);
  push();
  console.log("in for");
  pop();
}

while (true) {
  console.log("while");
}

pop();

window.setup = function setup() {
  createCanvas(600, 600);
  background(0);
  push();
  console.log("in setup");
  pop();
};`,
    },
  },
});
