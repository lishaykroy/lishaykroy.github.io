/* Toggle Icon Navbar */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('nav');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/* Scroll Section Active Link */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            });
        };
    });
};

/* Sticky Navbar */

let header = document.querySelector('header');
header.classList.toggle('sticky' , window.screenY > 100);

/* Remove Toggle Icon And Navbar */

menuIcon.classList.remove('fa-xmark');
navbar.classList.remove('active');

/* Disable Form Submit Button Untill All Filled , Form Buttons Style When Full With Text And Redirect To Thank You Page*/

document.addEventListener('DOMContentLoaded', function () {
const form = document.querySelector('#contactForm');
const inputs = form.querySelectorAll('input, textarea');
const submitButton = form.querySelector('.btn');

function showPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
        redirectToLoader();
    }, 1500);
}

function redirectToLoader() {
    window.location.href = 'HE_Thanks_Loader.html';
}

function checkForm() {
    let allFilled = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
        }
    });
    submitButton.disabled = !allFilled;
}

form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    showPopup(); 
    submitForm();
});

form.addEventListener('input', checkForm);
checkForm();

inputs.forEach(input => {
    input.addEventListener('input', function () {
        if (input.value.length > 0) {
            input.classList.add('not-empty');
        } else {
            input.classList.remove('not-empty');
        }
    });
});

function submitForm() {
    const formData = new FormData(form);
    fetch(form.getAttribute('action'), {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(() => {
        redirectToLoader();
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
}
});

/* Redirect To Another Page On Refresh */

if (sessionStorage.getItem('manuallyRefreshed')) {
    window.location.href = "HE_Main_Loading.html";
    sessionStorage.removeItem('manuallyRefreshed');
}

window.onbeforeunload = function () {
    sessionStorage.setItem('manuallyRefreshed', 'true');
};

/* Text Typing Animation */

const roles = [
    "דאטה אנליסט",
    "מהנדס תעשייה וניהול",
    "מעצב חוויית משתמש",
    "ישראלי גאה"
];

let roleIndex = 0;
let textIndex = 0;
const typingSpeed = 100; 

function typeText() {
    const role = roles[roleIndex];
    const roleSpan = document.getElementById('role');
    if (textIndex < role.length) {
        roleSpan.textContent += role[textIndex];
        textIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(deleteText, 1000); 
    }
}

function deleteText() {
    const roleSpan = document.getElementById('role');
    if (textIndex >= 0) {
        roleSpan.textContent = roles[roleIndex].substring(0, textIndex);
        textIndex--;
        setTimeout(deleteText, typingSpeed);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        textIndex = 0; 
        setTimeout(typeText, 1000); 
    }
}

window.onload = function () {
    typeText();
};

/* Image Changes */

const homeImg = document.querySelector('.home-img img');

const images = [
    "Images/Data Analyst.jpeg",
    "Images/I&M Engineer.jpeg",
    "Images/UIUX Designer.jpeg",
    "Images/Proud Israeli.jpeg"
];

let currentImageIndex = 0;

function changeImage() {
    homeImg.src = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

changeImage();

setInterval(changeImage, 4800);

/* Paragraph Changes */

document.addEventListener("DOMContentLoaded", function() {

    const texts = ["מנתח נתונים מקצועי בעל ניסיון מעשי של למעלה מחמש שנים בתחומי הטכנו-לוגיסטיקה בצבא ההגנה לישראל",
     "בבעלותי תואר ראשון בהנדסת תעשייה וניהול ותואר שני במנהל עסקים , שניהם עם התמחות במערכות מידע", 
     "כמעצב חויית משתמש , אני מתמחה ביצירת חוויה מרהיבה באמצעות מיומנויות ושילוב של טכנולוגיות מתקדמות , יצירת תוכן מובחר וניהול צבעים וגרפיקה ברמה הגבוהה ביותר", 
     "נולדתי בישראל , אני גר כאן מאז ומתמיד , התרבות והיופי של ישראל זה כל מה שאני מכיר , אני עדיין מתרגש מכל רגע שאני חולם על זה , אני לא אשכח אותה ולעולם לא אעזוב"];
    let currentIndex = 0;
    const textElement = document.getElementById("changingText");

    function changeText() {
      textElement.textContent = texts[currentIndex];
      currentIndex = (currentIndex + 1) % texts.length;
    }

    changeText();

    setInterval(changeText, 4800);
  });

/* Cursor Changes */

const cursor = document.querySelector('.cursor');

document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});

function isLinkOrIconOrInputElement(element) {
    return element.tagName === 'A' || element.tagName === 'I' || element.tagName === 'LI' || element.tagName === 'BUTTON';
}

document.addEventListener("mouseover", (e) => {
    if (isLinkOrIconOrInputElement(e.target)) {
        cursor.style.display = "none";
    } else {
        cursor.style.display = "block";
    }
});

document.addEventListener("mouseleave", () => {
    cursor.style.display = "block";
});

document.querySelectorAll('a, i, li, button').forEach(element => {
    element.addEventListener("mouseover", () => {
        cursor.style.display = "none";
    });
    element.addEventListener("mouseleave", () => {
        cursor.style.display = "block";
    });
});

/* Show And Hide End Icon On Header Based On Active Section */

function setActiveSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

function toggleEndIcon() {
    let currentSection = document.querySelector('section.active');
    let endIcon = document.querySelector('.end-icon');

    if (currentSection && ['home', 'about', 'skills'].includes(currentSection.id)) {
        endIcon.style.display = 'inline-flex'; 
    } else {
        endIcon.style.display = 'none';
    }
}

setActiveSection();
toggleEndIcon();
window.addEventListener('scroll', () => {
    setActiveSection();
    toggleEndIcon();
});

/* Progress Bar */

$(window).scroll(function(){
    var scroll = $(window).scrollTop(),
    dh = $(document).height(),
    wh = $(window).height();
    scrollPercent = ( scroll / (dh-wh)) * 100;
    $('#progressbar').css('height', scrollPercent + '%');
})

/* Timeline */

$(".step").click( function() {
    $(this).addClass("active").prevAll().addClass("active");
    $(this).nextAll().removeClass("active");
});

$(".step01").click( function() {
    $("#line-progress").css("width", "3%");
    $(".discovery").addClass("active").siblings().removeClass("active");
});

$(".step02").click( function() {
    $("#line-progress").css("width", "25%");
    $(".strategy").addClass("active").siblings().removeClass("active");
});

$(".step03").click( function() {
    $("#line-progress").css("width", "50%");
    $(".creative").addClass("active").siblings().removeClass("active");
});

$(".step04").click( function() {
    $("#line-progress").css("width", "75%");
    $(".production").addClass("active").siblings().removeClass("active");
});

$(".step05").click( function() {
    $("#line-progress").css("width", "100%");
    $(".analysis").addClass("active").siblings().removeClass("active");
});


/* Info Button */

function toggleMessages() {
    var message1 = document.getElementById("message1");
    var message2 = document.getElementById("message2");
    message1.style.display = (message1.style.display === "none") ? "block" : "none";
    message2.style.display = (message2.style.display === "none") ? "block" : "none";
}

document.getElementById("infoBtn").addEventListener("click", function(event) {
    console.log("Button clicked");
    toggleMessages();
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

/* Skills Swiper */   

var swipers = document.querySelectorAll(".mySwiper");

swipers.forEach(swiper => {
    new Swiper(swiper, {
        slidesPerView: 5,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
        nextEl: swiper.querySelector(".swiper-button-next"),
        prevEl: swiper.querySelector(".swiper-button-prev"),
        }
    });
});

/* Filter Skills By Rating */

document.addEventListener("DOMContentLoaded", function() {

function updateRatingCounts() {
    const counts = {};
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const rating = card.dataset.rating;
        if (counts[rating]) {
            counts[rating]++;
        } else {
            counts[rating] = 1;
        }
    });

    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        const rating = button.dataset.rating;
        if (rating === 'all') {
            button.textContent = `All (${cards.length})`;
        } else {
            button.textContent = `${rating} Stars (${counts[rating] || 0})`;
        }
    });
}

function filterCards() {
    const cards = document.querySelectorAll('.card');
    const activeButtons = document.querySelectorAll('.filter-buttons button.active');

    cards.forEach(card => {
        const rating = card.dataset.rating;
        if (activeButtons.length === 0 || activeButtons[0].dataset.rating === 'all' || [...activeButtons].some(btn => btn.dataset.rating === rating)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const filterButtons = document.querySelectorAll('.filter-buttons button');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.dataset.rating === 'all') {
            const allIsActive = this.classList.contains('active');
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', !allIsActive);
            });
        } else {
            const allButton = document.querySelector('.filter-buttons button[data-rating="all"]');
            if (allButton.classList.contains('active')) {
                allButton.classList.remove('active');
            }
            this.classList.toggle('active');
        }
        filterCards();
        updateRatingCounts();
    });
});

updateRatingCounts();
});

/* Skill Search Box X Button */

document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById('searchBox');
    const clearSearchButton = document.getElementById('clearSearch');
    const noResultsMessage = document.querySelector('.no-results');

    searchBox.addEventListener('input', function() {
        if (searchBox.value.trim().length > 0) {
            clearSearchButton.style.display = 'inline-block';
        } else {
            clearSearchButton.style.display = 'none'; 
        }

        filterCards(); 
    });

    clearSearchButton.addEventListener('click', function() {
        searchBox.value = ''; 
        clearSearchButton.style.display = 'none'; 
        filterCards(); 
    });

    function filterCards() {
        const searchValue = searchBox.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.card');
        let hasResults = false;

        cards.forEach(card => {
            const cardName = card.querySelector('.name span').textContent.toLowerCase();
            const cardCategory = card.querySelector('button').textContent.toLowerCase();
            const cardRating = card.getAttribute('data-rating').toLowerCase();

            if (cardName.includes(searchValue) || cardCategory.includes(searchValue) || cardRating.includes(searchValue)) {
                card.style.display = 'block'; 
                hasResults = true;
            } else {
                card.style.display = 'none'; 
            }
        });

        if (hasResults) {
            noResultsMessage.style.display = 'none'; 
        } else {
            noResultsMessage.style.display = 'block'; 
        }
    }
});

/* Skill Search Box Function */

document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById('searchBox');
    const noResultsMessage = document.querySelector('.no-results');
    const cards = document.querySelectorAll('.card');
    const clearSearchButton = document.getElementById('clearSearch');

    searchBox.addEventListener('input', filterCards);
    clearSearchButton.addEventListener('click', showAllCards);

    function filterCards() {
        const searchValue = searchBox.value.trim().toLowerCase();
        let foundMatch = false;

        cards.forEach((card, index) => {
            const cardNameElement = card.querySelector('.name');
            const cardButtonElement = card.querySelector('button');

            console.log(`Card ${index + 1}:`);
            console.log('Name Element:', cardNameElement);
            console.log('Button Element:', cardButtonElement);

            if (cardNameElement !== null && cardButtonElement !== null) {
                const cardName = cardNameElement.textContent.toLowerCase();
                const cardField = cardButtonElement.textContent.toLowerCase();
                const cardRating = card.getAttribute('data-rating');

                if (cardName.includes(searchValue) || cardField.includes(searchValue) || cardRating === searchValue || searchValue === 'all') {
                    card.style.display = '';
                    foundMatch = true;
                } else {
                    card.style.display = 'none';
                }
            } else {
                console.error(`Card ${index + 1}: One or more elements not found`);
            }
        });

        if (foundMatch || searchValue === '') { 
            noResultsMessage.style.display = 'none'; 
        } else {
            noResultsMessage.style.display = 'block'; 
        }
    }

    function showAllCards() {
        searchBox.value = '';
        cards.forEach(card => {
            card.style.display = '';
        });
        noResultsMessage.style.display = 'none';
    }
});

/* Filter Skills By Field */

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.fields-buttons button');
    const cards = document.querySelectorAll('.card');

    function updateButtonCounts() {
        const counts = {
            all: cards.length,
        };

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (counts[category]) {
                counts[category]++;
            } else {
                counts[category] = 1;
            }
        });

        buttons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            button.textContent = `${button.textContent} (${counts[filter] || 0})`;
        });
    }

    function filterCards(selectedFilters) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (selectedFilters.includes(category) || selectedFilters.includes('all')) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            if (filter === 'all') {

                const isActive = !this.classList.contains('active');
                this.classList.toggle('active', isActive);

                buttons.forEach(btn => {
                    if (btn !== this) {
                        btn.classList.toggle('active', isActive);
                    }
                });
            } else {

                this.classList.toggle('active');

                const allButton = document.querySelector('.fields-buttons button[data-filter="all"]');
                if (!allButton.classList.contains('active') && this.classList.contains('active')) {
                    buttons.forEach(btn => {
                        if (btn !== this && btn !== allButton) {
                            btn.classList.remove('active');
                        }
                    });
                }
            }

            const activeFilters = Array.from(buttons)
                .filter(btn => btn.classList.contains('active'))
                .map(btn => btn.getAttribute('data-filter'));

            filterCards(activeFilters);

            if (typeof Swiper !== 'undefined') {
                swiper.update();
            }
        });
    });

    updateButtonCounts();
});


/* Save Full Name Of Form Submitter */

document.addEventListener('DOMContentLoaded', function() {

    function saveFullName() {
        var fullName = document.getElementById('fullName').value;
        console.log('Full name captured:', fullName);
        localStorage.setItem('fullName', fullName);
    }

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        saveFullName();
    });
});

/* Skills Sources Pop Up Window */

function openPopup(id) {
    var popup = document.getElementById(id);
    if (popup) {
        popup.style.display = 'block';

        var centerX = window.innerWidth / 2;
        var centerY = window.innerHeight / 2 + 80;

        popup.style.top = centerY + 'px';
        popup.style.left = centerX + 'px';
    }
}

function closePopup(id) {
    var popup = document.getElementById(id);
    if (popup) {
        popup.style.display = 'none';
    }
}

document.querySelectorAll('.card-content button').forEach(button => {
    button.addEventListener('click', function() {
        const popupId = this.getAttribute('onclick').split("'")[1];
        openPopup(popupId);
    });
});

window.addEventListener('click', function(event) {
    document.querySelectorAll('.pop-up').forEach(popup => {
        if (popup.style.display === 'block' && !popup.contains(event.target) && !event.target.closest('.card-content button')) {
            closePopup(popup.id);
        }
    });
});

function closePopupOnScroll() {
    window.addEventListener('scroll', function() {

        document.querySelectorAll('.pop-up').forEach(popup => {
            if (popup.style.display === 'block') {

                popup.style.display = 'none';
            }
        });
    });
}

closePopupOnScroll();

/* Dark & Light Mode */

const cssToggle = document.getElementById('css-toggle');
const stylesheet = document.getElementById('stylesheet');

cssToggle.addEventListener('click', () => {
    const currentHref = stylesheet.getAttribute('href');
    const newHref = currentHref === 'HE_DarkStyle.css' ? 'HE_LightStyle.css' : 'HE_DarkStyle.css';
    stylesheet.setAttribute('href', newHref);

    if (newHref === 'HE_DarkStyle.css') {
        cssToggle.classList.remove('fa-sun');
        cssToggle.classList.add('fa-moon');
    } else {
        cssToggle.classList.remove('fa-moon');
        cssToggle.classList.add('fa-sun');
    }
});