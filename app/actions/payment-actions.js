/** Payment routes */
module.exports = {
  createPayment: {
    filters: ['authenticate'],
    validate: {
      data: {
        token: {
          is: '$string'
        },
        site_id: {
          is: '$id'
        },
        amount: {
          is: '$string'
        }
      }
    },
    main: async function($) {
      const { token, site_id, amount } = $.params.data
      const charge = await $.app.payment.charges.create({
        amount,
        currency: 'usd',
        description: $.t('actions.payment.description'),
        source: token
      })

      const timestamp = String(parseInt(new Date().getTime()))
      const key = await $.app.crypto.encrypt(timestamp)

      return await $.app.db('site').update({ _id: site_id, user_id: $.user._id }, { key, amount, charge })
    }
  }
}
