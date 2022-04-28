module.exports = async function($) {
  await $.setups(['account', 'login-required'])

  return /* html */`
    <h1>Hello</h1>
    <p>You are ${$.account.name}, this is your app.</p>
    <p>Go to <a href="${$.link('todo/list')}">my todos.</a></p>
  `
}
