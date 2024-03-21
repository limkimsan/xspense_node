$(document).ready(function() {
  if ($("#transaction_type_selector").val() == 1)
    $("#income_category").hide();
  else
    $("#expense_category").hide();

  $('#transaction_type_selector').change(() => {
    const transactionType = $('#transaction_type_selector').val();
    if (transactionType == 1) {
      $('#expense_category').show();
      $('#income_category').hide();
      $('#transaction_category').val($('#expense_category').val());
    }
    else {
      $('#expense_category').hide();
      $('#income_category').show();
      $('#transaction_category').val($('#income_category').val());
    }
  });

  $('#expense_category').change(() => {
    $("#transaction_category").val($("#expense_category").val());
  });

  $('#income_category').change(() => {
    $("#transaction_category").val($("#income_category").val());
  });
});