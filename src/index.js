import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/exchanger';

$('form#exchange').submit(function(event) {
  event.preventDefault();
  let amount = $('#amount').val();
  let currency = $('#currency').val();
  checkFields(amount, currency);
  function checkFields(amount, currency) {
    if (amount === '' || currency === '') {
      return $('#userError').text("Please enter a valid currency code and an anount to convert.");
    } else {
      let promise = Exchanger.getExchange(currency, amount);
      promise.then(function(response) {
        const result = JSON.parse(response);
        $('#rate').text(parseFloat(result.conversion_rate).toFixed(2) + " " + currency);
        $('#value').text(amount + " USD = " + parseFloat(result.conversion_result).toFixed(2) + " " + currency);
      }, function(response) {
        const result = JSON.parse(response);
        $('#error').text(result["error-type"]);
      });
    }
  } 
});