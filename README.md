# babel-plugin-p5-push-pop

This babel plugin provides you a way to organize your P5 code.
It replaces no labeled block statements with `push` and `pop`.

Yes, all scopes of the block statements are not considered because they are replaced. But I think it is bearable, because this spelling is rather less used.

The advantage is less writing work and now you can fold and indent these blocks
automatically within your IDE.

you can now write this:

```javascript
function setup() {
  ellipse(0, 50, 33, 33);

  {
    strokeWeight(10);
    fill(204, 153, 0);
    ellipse(33, 50, 33, 33);

    {
      stroke(0, 102, 153);
      ellipse(66, 50, 33, 33);
    }
  }

  ellipse(100, 50, 33, 33);
}
```

instead of:

```javascript
function setup() {
  ellipse(0, 50, 33, 33);

  push();
  strokeWeight(10);
  fill(204, 153, 0);
  ellipse(33, 50, 33, 33);

  push();
  stroke(0, 102, 153);
  ellipse(66, 50, 33, 33);
  pop();
  pop();

  ellipse(100, 50, 33, 33);
}
```

## How to use

```bash
yarn add -D babel-plugin-p5-push-pop
# or
npm install -D babel-plugin-p5-push-pop
```

**.babelrc**

```json
{
  "presets": ["@babel/env"],
  "plugins": ["p5-push-pop"]
}
```

## Example

You can find a fully working example inside `./example`.
Just run `npm install` and `npm start` or `npm build`.