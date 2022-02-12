import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/exchanger';

$('form#exchange').submit(function(event) {
  event.preventDefault();
  let amount = $('#amount').val();
  let currency = $('#currency').val();
  console.log(amount);
  console.log(currency);
  let promise = Exchanger.getExchange(currency, amount);
  promise.then(function(response) {
    const result = JSON.parse(response);
    $('#conversion').text(`Conversion rate: 1 USD = ${result.conversion_rate}` + " " + currency);
    $('#value').text("Conversion Result: " + amount + " USD = " + `${result.conversion_result}` + " " + currency);
  }, function(result) {
    $('#error').text("There was an error processing your request: " + result["error-type"]);
    console.log(result);
  });
});