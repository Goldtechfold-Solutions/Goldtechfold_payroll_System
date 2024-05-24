$(function () {

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr('data-url'),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-head").modal("show");
      },
      success: function ({html_form}) {
        $("#modal-head .modal-content").html(html_form);
      }
    });
  }

  var saveForm = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr('method'),
      dataType: 'json',
      success: function ({form_is_valid, html_form, html_heads_list}) {
        if (form_is_valid) {
          $("#head-table tbody").html(html_heads_list);
          $("#modal-head").modal("hide");
        } else {
          $('#modal-head .modal-content').html(html_form);
        }
      }
    });
    return false
  }

  $('.js-create-head').click(loadForm);
  $("#modal-head").on("submit", ".js-head-create-form", saveForm);

  $("#head-table").on("click", ".js-update-head", loadForm);
  $("#modal-head").on("submit", ".js-head-update-form", saveForm);

  $("#head-table").on("click", ".js-delete-head", loadForm);
  $("#modal-head").on("submit", ".js-head-delete-form", saveForm);
})
