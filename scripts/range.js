function rangeStart() {
    var elem = document.getElementById("range");
    console.log(elem);
    var rangeValue = function() {
        var newValue = elem.value;
        var target = document.querySelector('.value');
        target.innerHTML = newValue + "%";
    }

    elem.addEventListener("input", rangeValue);
}