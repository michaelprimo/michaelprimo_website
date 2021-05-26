let productName;

function genera()
{
    productName = document.getElementById("word").value.replace(/\s+/g, '').toLowerCase();
    if(productName.length > 35) productName = productName.substring(0,35).toLowerCase().replace(/\s+/g, '');
    document.querySelector("#URL").innerHTML = productName;
}
