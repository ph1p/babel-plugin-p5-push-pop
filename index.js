module.exports = function ({ types: t }) {
  return {
    name: 'p5-push-pop',
    visitor: {
      FunctionDeclaration(path) {
        path.traverse({
          Identifier({ node }) {
            if (node.name === 'setup' || node.name === 'draw') {
              const declar = t.assignmentExpression(
                '=',
                t.memberExpression(
                  t.identifier('window'),
                  t.identifier(node.name),
                  false
                ),
                t.functionExpression(path.node.id, [], path.node.body)
              );
              path.replaceWith(declar);
            }
          },
        });
      },
      BlockStatement(path) {
        const found = path.find((path) => path.getStatementParent());

        if (!found.container.type) {
          path.insertBefore(t.expressionStatement(t.identifier('push()')));
          path.insertAfter(t.expressionStatement(t.identifier('pop()')));

          path.replaceWithMultiple(path.node.body);
        }
      },
    },
  };
};
