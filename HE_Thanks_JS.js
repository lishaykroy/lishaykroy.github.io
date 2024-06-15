/* Clear Storage On Refresh */

window.addEventListener('beforeunload', function() {
    localStorage.clear();
});

/* Cursor Changes */

const cursor = document.querySelector('.cursor');
var timeout;

document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    cursor.style.display = "block";

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        cursor.style.display = "none";
    }, 1000);

    if (e.target.tagName !== 'A' && e.target.tagName !== 'I') {
        cursor.style.display = "block";
    } else if (e.target.classList.contains('logo')) {
        cursor.style.display = "block";
    } else {
        cursor.style.display = "none";
    }
});

document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
});

/* Use Full Name Of Form Submitter */

document.addEventListener('DOMContentLoaded', function() {

    var fullName = localStorage.getItem('fullName');

    if (fullName) {
        document.getElementById('fullNameSpan').innerText = fullName;
    }
});

/* Context Menu */

window.addEventListener("contextmenu", function(event){
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.offsetY + "px";
    contextElement.style.left = event.offsetX + "px";
    contextElement.classList.add("active");
});

window.addEventListener("click", function(){
    var contextElement = document.getElementById("context-menu");
    contextElement.classList.remove("active");
});