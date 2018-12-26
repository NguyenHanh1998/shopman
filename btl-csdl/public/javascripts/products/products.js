
  $('#lp-button-next-offset').click(function () {
    let has_more = $('#lp-div-change-page').attr('has-more')
    if (has_more == 'false') {
      alert('No more products')
    }
    else {
      let current_offset = Number($('#lp-div-change-page').attr('current-offset'))
      let url = `/products?offset=${current_offset + 1}`
      window.location.href = url
    }
  })

  $('#lp-button-previous-offset').click(function () {
    let current_offset = Number($('#lp-div-change-page').attr('current-offset'))
    if (current_offset == 0) {
      alert('No more products')
    }
    else {
      let url = `/products${current_offset - 1 == 0 ? '' : `?offset=${current_offset - 1}`}`
      window.location.href = url
    }
  })

  $('button[name=lp-button-search]').click(function () {
    let name = $('input[name=lp-input-search]').val()
    let condition = Object.assign({}, { name })
    let query = []
    Object.keys(condition).map(key => {
      if (condition[key] != '') {
        query.push(`${key}=${condition[key]}`)
      }
    })
    query = query.join('&')
    if (query.length == 0) query = ''
    url = `/products${query != '' ? `/search?${query}` : ''}`
    window.location.href = url
  })

  $('button[name=lp-button-add]').click(function () {
    let product = {}
    let product_id = "SP063"
    swal({
      title: 'New Product',
      html:
        '<input type="text" name="lp-add-name" class="form-control" placeholder="Name">' + '<br>' +
        '<input type="text" name="lp-add-category" class="form-control" placeholder="Category">' + '<br>' +
        '<input type="number" name="lp-add-price" class="form-control" placeholder="Price" min="0" step="0.01">' + '<br>' +
        '<input type="number" name="lp-add-instock" class="form-control" placeholder="Instock" min="1" step="1">',
      showCancelButton: true,
      confirmButtonText: 'Create now',
      focusConfirm: true,
      showLoaderOnConfirm: true,
    }).then(res => {
      let [name, category, price_per_unit, instock] = [
        $('input[name=lp-add-name]').val(),
        $('input[name=lp-add-category]').val(),
        Number($('input[name=lp-add-price]').val()),
        Number($('input[name=lp-add-instock]').val()),
      ]
      if (!name) {
        swal(
          'Creating failed!',
          'Name field is required, please try again!',
          'error'
        )
      }
      if (!category) {
        swal(
          'Creating failed!',
          'Category field is required, please try again!',
          'error'
        )
      }
      if (!price_per_unit) {
        swal(
          'Creating failed!',
          'Price field is required, please try again!',
          'error'
        )
      }
      product = Object.assign({}, { product_id, name, category, price_per_unit, instock })
      $.ajax({
        url: `/ajax/products`,
        type: 'POST',
        data: product,
        success: res => {
          swal(
            'Success!',
            'A new product is success fully created.',
            'success'
          ).then(
            ok => window.location.reload(),
            dismiss => window.location.reload()
          )
        },
        error: err => {
          swal(
            'Creating failed!',
            'A small problem occured, please try again!',
            'error'
          )
        }
      })
    })
  })

