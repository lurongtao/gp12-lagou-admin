import userView from '../views/user.art'

let _url = ''

export default {
  render() {
    let html = userView({
      isSignin: false
    })

    $('.user-menu').html(html)
    this.bindEventToBtn()
  },

  bindEventToBtn() {
    $('.hidden-xs').on('click', function() {
      _url = $(this).attr('id') === 'btn-signin' ? '/api/signin' : '/api/signup'
    })

    $('#btn-submit').on('click', () => {
      let data = $('#user-form').serialize()
      $.ajax({
        url: _url,
        type: 'POST',
        data,
        success(result) {
          console.log(result)
        }
      })
    })
  }
}