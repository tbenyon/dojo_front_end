function getAutocompleteData(value)
{
    window.location = window.location.origin + "/merchandise?item=" + value;
}

function validateAndStore() {

    var product = document.getElementById('product').value;
    var size = document.getElementById('size').value;
    var colour = document.getElementById('colour').value;
    var quantity = document.getElementById('quantity').value;
    var details = document.getElementById('details').value;

    if (!(product)) {
        alert("You must enter a product");
        return;
    }

    var selection = {
        "product": product,
        "size": size,
        "colour": colour,
        "quantity": quantity,
        "details": details
    };

    // Cookies.remove('basket');

    if (!(Cookies.get('basket'))) {
        Cookies.set('basket', []);
    }

    var basket = Cookies.getJSON('basket');

    basket.push(selection);

    Cookies.set('basket', basket);


    alert(Cookies.get('basket'));

}