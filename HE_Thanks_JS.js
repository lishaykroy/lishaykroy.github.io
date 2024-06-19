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

/* Use Full Name Of Form Submitter From The Main Page's Contact Form In Order To Use It In This Page */

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

/* Toast Notifications */

    let toastTimeouts = {};
    let toastStartTimes = {};
    var currentToastId = null;

    function showToast(toastId, nextToastId) {

        if (currentToastId) {
            
            hideToast(currentToastId);

        }

        var toast = document.getElementById(toastId);
        toast.className = "toast show";

        var progress = toast.querySelector('.countdown-progress');
        progress.style.width = '100%';
        toastStartTimes[toastId] = Date.now();

        toastTimeouts[toastId] = setTimeout(function() {
            hideToast(toastId);
        }, 10000); 

        currentToastId = toastId;

        animateProgressBar(progress, toastId);

    }

    function hideToast(toastId) {

        var toast = document.getElementById(toastId);
        toast.className = toast.className.replace("show", "hide");
        clearTimeout(toastTimeouts[toastId]);

    }

    function closeToast(toastId) {

        hideToast(toastId);
        
    }

    function animateProgressBar(progressElement, toastId) {

        var start = toastStartTimes[toastId];
        var toastDuration = 10000;

        function step() {

            var progress = Math.max(0, 100 - ((Date.now() - start) / toastDuration) * 100);
            progressElement.style.width = progress + '%';

            if (progress > 0) {

                requestAnimationFrame(step);

            }

        }

        requestAnimationFrame(step);

    }

    window.onload = function() {

        setTimeout(function() {
            showToast('toast');
        }, 5000);

    }