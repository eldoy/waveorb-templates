module.exports = async function($, data) {
  return {
    format: 'markdown',
    content: `
      ${data.content}
      ${(function() {
        if ($.account) {
          return `
            account: ${$.account?.name || 'no name'} (${$.account?.email || 'no email'})
          `
        }
        return ''
      })()}
    `
  }
}
