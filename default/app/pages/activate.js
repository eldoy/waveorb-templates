module.exports = async function($) {
  $.page.title = $.t('pages.activate.title')

  async function handleActivate(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await stripe.createToken(card)
    if (!result.error) {
      var amount = serialize(q('form')).amount
      var data = { token: result.token.id, site_id: site._id, amount }
      var payment = await api.action('createPayment', { data })
      if (payment.error) {
        flash(payment.error.message)
        button.disabled = false
      } else {
        cookie('flash', $.t('pages.activate.result'))
        location = $.link('sites')
      }
    } else {
      button.disabled = false
    }
  }

  async function initPayment() {
    var _id = location.search.split('=')[1]
    site = await api.action('getSite', { data: { _id } })
    var style = {
      base: {
        fontFamily: 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {}
      },
      invalid: {
        color: 'red',
        iconColor: 'red'
      }
    }
    stripe = Stripe($.env('app.config.payment.public_key'))
    var elements = stripe.elements()
    card = elements.create('card', { style })
    card.mount('#card-element')
    card.addEventListener('change', function(event) {
      text('.errors', event.error ? event.error.message : '')
    })
  }

  return /* html */`
    <style>
      .card-form {
        margin: 1rem 0 1.5rem;
      }
      #card-element {
        max-width: 500px;
      }
      .wait {
        color: #999;
      }
    </style>

    <h1>${ $.t('pages.activate.header') }</h1>
    <div class="payment-form">
      <form onsubmit="handleActivate(this);return false">
        <div>
          <input id="amount_799" type="radio" name="amount" value="799" checked>
          <label for="amount_799">${ $.t('pages.activate.form.option1') }</label>
        </div>
        <div>
          <input id="amount_499" type="radio" name="amount" value="499">
          <label for="amount_499">${ $.t('pages.activate.form.option2') }</label>
        </div>
        <div>
          <input id="amount_299" type="radio" name="amount" value="299">
          <label for="amount_299">${ $.t('pages.activate.form.option3') }</label>
        </div>
        <div class="card-form">
          <div id="card-element"></div>
          <div class="errors"></div>
        </div>
        <p>
          <button>
            <span>${ $.t('pages.activate.form.button') }</span>
            <img src="/img/spinner.svg">
          </button>
        </p>
      </form>
      <p>
        <a href="${ $.link('sites') }">${ $.t('pages.activate.back') }</a>
      </p>
    </div>
    <script src="https://js.stripe.com/v3"></script>
    <script>
      ${initPayment};
      ${handleActivate};
      var stripe, card, site
      initPayment()
    </script>
  `
}
