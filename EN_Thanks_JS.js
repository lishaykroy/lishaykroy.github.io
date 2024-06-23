/* Clear Storage On Refresh */

window.addEventListener('beforeunload', function() {

    localStorage.clear();

});

/* Cursor Changes */

const cursor = document.querySelector('.cursor');

var timeout;

document.addEventListener("mousemove", (e) => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        cursor.style.display = "none";
    }, 1000);
    
});

document.addEventListener("mouseout", () => {

    cursor.style.display = "none";

});

function handleMouseMove(e) {

    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";

}

function isLinkOrIconOrInputElement(element) {

    return element.tagName === 'A' || element.tagName === 'I' || element.tagName === 'LI' || element.tagName === 'BUTTON';

}

function handleMouseOver(e) {

    if (isLinkOrIconOrInputElement(e.target)) {
        cursor.style.display = "none";
    } else {
        cursor.style.display = "block";
    }

}

function handleMouseLeave() {

    cursor.style.display = "block";

}

if (window.innerWidth > 768) {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    document.querySelectorAll('a, i, li, button').forEach(element => {
        element.addEventListener("mouseover", () => {
            cursor.style.display = "none";
        });
        element.addEventListener("mouseleave", () => {
            cursor.style.display = "block";
        });
    });
} else {
    cursor.style.display = "none";
}

window.addEventListener('resize', () => {

    if (window.innerWidth > 768) {
        cursor.style.display = "block";
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);

        document.querySelectorAll('a, i, li, button').forEach(element => {
            element.addEventListener("mouseover", () => {
                cursor.style.display = "none";
            });
            element.addEventListener("mouseleave", () => {
                cursor.style.display = "block";
            });
        });
    } else {
        cursor.style.display = "none";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mouseleave", handleMouseLeave);
        
        document.querySelectorAll('a, i, li, button').forEach(element => {

            element.removeEventListener("mouseover", () => {

                cursor.style.display = "none";

            });

            element.removeEventListener("mouseleave", () => {

                cursor.style.display = "block";

            });

        });
    }

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

/* Info Button */

function toggleMessages() {

    var message1 = document.getElementById("message1");
    var message2 = document.getElementById("message2");
    message1.style.display = (message1.style.display === "none") ? "block" : "none";
    message2.style.display = (message2.style.display === "none") ? "block" : "none";
    
}

document.getElementById("infoBtn").addEventListener("click", function(event) {

    toggleMessages();
    badge.style.display = "none";
    event.stopPropagation();
    
});

function handleDocumentClick(event) {

    var message1 = document.getElementById("message1");
    var message2 = document.getElementById("message2");

    if (!event.target.closest("#message1") && !event.target.closest("#message2")) {

        message1.style.display = "none";
        message2.style.display = "none";

    }

}

document.addEventListener("click", handleDocumentClick);

document.addEventListener("DOMContentLoaded", function() {

    toggleMessages();
    
});

/* Dark & Light Mode */

const cssToggle = document.getElementById('css-toggle');
const stylesheet = document.getElementById('stylesheet');

cssToggle.addEventListener('click', toggleTheme);

function toggleTheme() {

    const currentHref = stylesheet.getAttribute('href');
    const newHref = currentHref === 'EN_Thanks_CSS.css' ? 'EN_Thanks_LightCSS.css' : 'EN_Thanks_CSS.css';
    stylesheet.setAttribute('href', newHref);

    if (newHref === 'EN_Thanks_CSS.css') {
        cssToggle.classList.remove('fa-sun');
        cssToggle.classList.add('fa-moon');
    } else {
        cssToggle.classList.remove('fa-moon');
        cssToggle.classList.add('fa-sun');
    }

}

/* Option Buttons */

document.querySelectorAll('.option').forEach(button => {

    button.addEventListener('click', () => {

        const action = button.getAttribute('data-action');
        if (action === 'toggleTheme') {
            toggleTheme();
        } else if (action === 'toggleLanguage') {
            document.querySelector('.language-switcher a').click();
        } 

    });

});

/* Plus Menu For Phones */

document.addEventListener('DOMContentLoaded', () => {

    let plusIcon = document.querySelector('#plus-icon');
    let actions = document.querySelector('.actions');
    let infoContainer = document.querySelector('#infoContainer');
    let modeSwitcher = document.querySelector('.mode-switcher');
    let languageSwitcher = document.querySelector('.language-switcher');

    /* Toggle Icon */

        plusIcon.onclick = () => {

                plusIcon.classList.toggle('fa-xmark');
                actions.classList.toggle('active');

            }

    /* Hide the menu and remove toggle icon when a menu item is clicked */

        [infoContainer, modeSwitcher, languageSwitcher].forEach(element => {

            element.addEventListener('click', () => {

                menuIcon.classList.remove('fa-xmark');
                actions.classList.remove('active');

            });

        });

});

/* Background Music Player */

function playMusic() {

    var audioPlayer = document.getElementById('audioPlayer');
    var playIcon = document.getElementById('playIcon');
    var tooltip = document.querySelector('.play .tooltip');

    if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    tooltip.textContent = 'Pause Music';
    toggleControlIcons(true);
    toggleTimeDisplay(true);
    } else {
    audioPlayer.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    tooltip.textContent = 'Play Music';
    toggleControlIcons(false);
    toggleTimeDisplay(false);
    }

}

function toggleControlIcons(show) {

    var controlIcons = document.getElementById('controlIcons');

    if (show) {
        controlIcons.classList.remove('hidden');
    } else {
        controlIcons.classList.add('hidden');
    }

}

function stopMusic() {

    var audioPlayer = document.getElementById('audioPlayer');
    var playIcon = document.getElementById('playIcon');
    var tooltip = document.querySelector('.play .tooltip');

    audioPlayer.pause();      
    audioPlayer.currentTime = 0; 

    if (playIcon.classList.contains('fa-pause')) {

        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        tooltip.textContent = 'Play Music';
        toggleControlIcons(false);

    } 
    
}

function muteMusic() {

    var audioPlayer = document.getElementById('audioPlayer');
    var muteIcon = document.getElementById('muteIcon');
    var tooltip = document.querySelector('.mute .tooltip');

    audioPlayer.muted = !audioPlayer.muted;

    if (audioPlayer.muted) {
        muteIcon.classList.remove('fa-volume-high');
        muteIcon.classList.add('fa-volume-xmark');
        tooltip.textContent = 'Umnute Music';
    } else {
        muteIcon.classList.remove('fa-volume-xmark');
        muteIcon.classList.add('fa-volume-high');
        tooltip.textContent = 'Mute Music';
    }

}

function backwardMusic() {

    var audio = document.getElementById('audioPlayer');
    var tooltip = document.querySelector('.backward .tooltip');

    if (audio.currentTime >= 10) {
        audio.currentTime -= 10; 
        tooltip.textContent = '10s Backward';
    } else {
        var backwardIcon = document.querySelector('.fa-backward');
        backwardIcon.style.backgroundColor = 'gray';
        backwardIcon.style.color = 'black';
        backwardIcon.style.cursor = 'none';
        tooltip.textContent = 'Not Enough Time';

        setTimeout(function() {
            backwardIcon.style.backgroundColor = ''; 
            backwardIcon.style.color = '';
            backwardIcon.style.cursor = 'pointer';
        }, 2000); 
    }

}

function forwardMusic() {

    var audio = document.getElementById('audioPlayer');
    var duration = audio.duration;
    var tooltip = document.querySelector('.forward .tooltip');


    if (duration - audio.currentTime >= 10) {
        audio.currentTime += 10; 
        tooltip.textContent = '10s Forward';
    } else {
        var forwardIcon = document.querySelector('.fa-forward');
        forwardIcon.style.backgroundColor = 'gray';
        forwardIcon.style.color = 'black';
        forwardIcon.style.cursor = 'default';
        tooltip.textContent = 'Not Enough Time';

        setTimeout(function() {
            forwardIcon.style.backgroundColor = ''; 
            forwardIcon.style.color = '';
            forwardIcon.style.cursor = 'pointer'; 
        }, 2000);
    }
}

function updateProgress() {

    var audio = document.getElementById('audioPlayer');
    var currentTime = document.getElementById('currentTime');
    var duration = document.getElementById('duration');
    var currentMinutes = Math.floor(audio.currentTime / 60);
    var currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = formatTime(currentMinutes) + ':' + formatTime(currentSeconds);
    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    duration.textContent = formatTime(durationMinutes) + ':' + formatTime(durationSeconds);
    var progress = (audio.currentTime / audio.duration) * 100;
    var progressFilled = document.querySelector('.music-line .progress-filled');
    progressFilled.style.width = progress + '%';

}

function formatTime(time) {

    return (time < 10 ? '0' : '') + time;

}

var audioPlayer = document.getElementById('audioPlayer');

audioPlayer.addEventListener('timeupdate', function() {

    updateProgress();

    if (document.querySelector('.time-display').classList.contains('hidden') && !audioPlayer.paused) {

        toggleTimeDisplay(true);

    }
});

function toggleTimeDisplay(show) {

    var timeDisplay = document.querySelector('.time-display');

    if (show) {
        timeDisplay.classList.remove('hidden');
    } else {
        timeDisplay.classList.add('hidden');
    }

}

window.addEventListener('load', function() {

    updateProgress();
    
});
