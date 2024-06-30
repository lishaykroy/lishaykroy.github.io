/* Cursor Changes */

    const cursor = document.querySelector('.cursor');
    var timeout;

    document.addEventListener("mousemove", (e) => {
        
        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px";
        cursor.style.display = "block";

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            cursor.style.display = "none";
        }, 1000);
        
    });

    document.addEventListener("mouseout", () => {

        cursor.style.display = "none";

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

    document.getElementById("reload").addEventListener("click", function() {

        location.reload();

    });

    document.getElementById("back").addEventListener("click", function() {

        window.history.back();

    });

    document.getElementById("forward").addEventListener("click", function() {

        window.history.forward();

    });

    document.getElementById("exit").addEventListener("click", function() {

        if (confirm("Are you sure you want to exit ?")) {

            alert("I'm not gonna help you with this action , I want you to stay here .");

        }

    });

    document.getElementById("print").addEventListener("click", function() {

        window.print();

    });

    document.getElementById("save").addEventListener("click", function() {

        var link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.documentElement.outerHTML);
        link.download = 'Lishay Kroytoro Protfolio.html';
        link.click();
        
    });