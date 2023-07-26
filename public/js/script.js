function moveDivisor(event) {
    var slider = event.target;
    var divisor = slider.parentElement.querySelector(".divisor");
    divisor.style.width = slider.value + "%";
}