/* Hamburger Menu Icon */

    document.addEventListener('DOMContentLoaded', () => {

        let menuIcon = document.querySelector('#menu-icon');
        let navbar = document.querySelector('nav');
        let menuLinks = navbar.querySelectorAll('a');

    /* Toggle Icon Navbar */

        menuIcon.onclick = () => {

            menuIcon.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');

        }

    /* Hide the navigation menu and remove toggle icon when a menu item is clicked */

        menuLinks.forEach(link => {

            link.addEventListener('click', () => {

                menuIcon.classList.remove('fa-xmark');
                navbar.classList.remove('active');

            });

        });

    /* Sticky Navbar */
    
        let header = document.querySelector('header');

        window.addEventListener('scroll', () => {

            header.classList.toggle('sticky', window.scrollY > 100);

        });

    });

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
        var message3 = document.getElementById("message3");
        message1.style.display = (message1.style.display === "none") ? "block" : "none";
        message2.style.display = (message2.style.display === "none") ? "block" : "none";
        message3.style.display = (message3.style.display === "none") ? "block" : "none";
        
    }

    document.getElementById("infoBtn").addEventListener("click", function(event) {

        console.log("Button clicked");
        toggleMessages();
        var badge = document.getElementById("badge");
        
        if (message3.style.visibility !== "hidden") {
            badge.textContent = "3";
        } else {
            badge.textContent = "2";
        }
        
        badge.style.display = "none";
        event.stopPropagation();
    });

    function handleDocumentClick(event) {

        var message1 = document.getElementById("message1");
        var message2 = document.getElementById("message2");
        var message3 = document.getElementById("message3");

        if (!event.target.closest("#message1") && !event.target.closest("#message2") && !event.target.closest("#message3")) {

            message1.style.display = "none";
            message2.style.display = "none";
            message3.style.display = "none";

        }

    }

    document.addEventListener("click", handleDocumentClick);

    document.addEventListener("DOMContentLoaded", function() {

        toggleMessages();
        var badge = document.getElementById("badge");
        var message3 = document.getElementById("message3");
        
        if (window.innerWidth <= 1200) {
            badge.textContent = "2";
        }
        
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
                    button.textContent = `הכל (${cards.length})`;
                } else {
                    button.textContent = `${rating} כוכבים (${counts[rating] || 0})`;
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

/* Save Full Name Of Form Submitter From Thhis Page's Contact Form In Order To Use It In The Next Page */

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

    cssToggle.addEventListener('click', toggleTheme);

    function toggleTheme() {

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

    }

/* Option Buttons */

    document.querySelectorAll('.option').forEach(button => {

        button.addEventListener('click', () => {

            const action = button.getAttribute('data-action');
            if (action === 'toggleTheme') {
                toggleTheme();
            } else if (action === 'toggleLanguage') {
                document.querySelector('.language-switcher a').click();
            } else if (action === 'contactSection') {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
            
        });

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

/* Contact Form X Buttons */

    document.addEventListener("DOMContentLoaded", function() {

        const pairs = [
            { inputId: 'phoneNumber', buttonId: 'clear-btn1' },
            { inputId: 'fullName', buttonId: 'clear-btn2' },
            { inputId: 'subject', buttonId: 'clear-btn3' },
            { inputId: 'emailAddress', buttonId: 'clear-btn4' },
            { inputId: 'messageContent', buttonId: 'clear-btn5' }
        ];

        pairs.forEach(pair => {

            const searchBox = document.getElementById(pair.inputId);
            const clearButton = document.getElementById(pair.buttonId);

            if (searchBox && clearButton) {

                searchBox.addEventListener('input', function() {

                    if (searchBox.value.trim().length > 0) {
                        clearButton.style.display = 'inline-block';
                    } else {
                        clearButton.style.display = 'none';
                    }

                });

                clearButton.addEventListener('click', function() {

                    searchBox.value = '';
                    clearButton.style.display = 'none';
                    
                });

            }

        });

    });
    
/* Toast Notifications + Text Typing Animation */

    document.addEventListener("DOMContentLoaded", function() {

        let toastTimeouts = {};
        let toastStartTimes = {};

        function showToast(toastId, nextToastId) {

            var toast = document.getElementById(toastId);
            toast.className = "toast show";

            var progress = toast.querySelector('.countdown-progress');
            progress.style.width = '100%';
            toastStartTimes[toastId] = Date.now();

            clearTimeout(toastTimeouts[toastId]);

            if (toastId === 'toast1') {

                var currentHour = new Date().getHours();
                var greeting;
    
                if (currentHour >= 6 && currentHour < 12) {
                    greeting = "בוקר טוב !";
                } else if (currentHour >= 12 && currentHour < 16) {
                    greeting = "צהריים טובים !";
                } else if (currentHour >= 16 && currentHour < 19) {
                    greeting = "אחר הצהריים טובים !";
                } else if (currentHour >= 19 && currentHour < 22) {
                    greeting = "ערב טוב !";
                } else {
                    greeting = "לילה טוב !";
                }
    
                var h2Element = toast.querySelector('h2');
                h2Element.textContent = greeting;
    
            }

            toastTimeouts[toastId] = setTimeout(function() {
                hideToast(toastId);
                if (nextToastId) {
                    setTimeout(function() {
                        showToast(nextToastId, getNextToastId(nextToastId));
                    }, 10000);
                }
            }, 10000); 

            animateProgressBar(progress, toastId);

        }

        function hideToast(toastId) {

            var toast = document.getElementById(toastId);
            toast.className = toast.className.replace("show", "hide");
            clearTimeout(toastTimeouts[toastId]);

        }

        function closeToast(toastId) {

            hideToast(toastId);
            var nextToastId = getNextToastId(toastId);

            if (nextToastId) {
                setTimeout(function() {
                    showToast(nextToastId, getNextToastId(nextToastId));
                }, 10000);
            }

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

        function getNextToastId(currentToastId) {

            switch(currentToastId) {

                case 'toast1': return 'toast2';
                case 'toast2': return 'toast3';
                case 'toast3': return 'toast4';
                case 'toast4': return 'toast5';
                case 'toast5': return 'toast6';
                case 'toast6': return 'toast7';
                case 'toast7': return 'toast8';
                default: return null;

            }

        }

        function initToasts() {
            
            document.querySelectorAll('.toast .close-btn').forEach(function(closeBtn) {
                closeBtn.addEventListener('click', function() {
                    var toastId = this.closest('.toast').id;
                    closeToast(toastId);
                });
            });
    
            setTimeout(function() {
                showToast('toast1', 'toast2');
            }, 5000);

        }

        const homeImg = document.querySelector('.home-img img');
        const images = [
            "Images/Data Analyst.jpeg",
            "Images/I&M Engineer.jpeg",
            "Images/UIUX Designer.jpeg",
            "Images/Proud Israeli.jpeg"
        ];

        const texts = ["מנתח ואנליסט נתונים מקצועי בעל ניסיון פרקטי ומעשי של למעלה מחמש שנים בתחומים הטכנו-לוגיסטיים בצבא ההגנה לישראל בכלל ובזרוע הים בפרט",
            "בבעלותי תואר ראשון בהנדסת תעשייה וניהול עם התמחות במערכות מידע ותואר שני במנהל עסקים עם התמחות בניהול מערכות מידע ומדעי הנתונים", 
            "כמעצב חויית משתמש , אני מתמחה ביצירת חוויה מרהיבה באמצעות מיומנויות ושילוב של טכנולוגיות מתקדמות , יצירת תוכן מובחר וניהול צבעים וגרפיקה ברמה הגבוהה ביותר", 
            "נולדתי בישראל , אני גר כאן מאז ומתמיד , התרבות והיופי של ישראל זה כל מה שאני מכיר , אני עדיין מתרגש מכל רגע שאני חולם על זה , אני לא אשכח אותה ולעולם לא אעזוב"
        ];

        const roles = [
            "דאטה אנליסט",
            "מהנדס תעשייה וניהול",
            "מעצב חוויית משתמש",
            "ישראלי גאה"
        ];

let currentRoleIndex = 0;
        let textCharIndex = 0;
        let currentImageIndex = 0;
        let currentTextIndex = 0;
        const typingTime = 1500;
        const deletingTime = 1500; 
        const pauseTime = 1000; 
        let typingSpeed; 
        let deletingSpeed; 
    
        function changeImage() {

            homeImg.src = images[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % images.length;

        }
    
        function changeText() {

            const textElement = document.getElementById("changingText");
            textElement.textContent = texts[currentTextIndex];
            currentTextIndex = (currentTextIndex + 1) % texts.length;

        }

        function calculateSpeeds() {

            const totalCharacters = roles[currentRoleIndex].length;
            typingSpeed = typingTime / totalCharacters;
            deletingSpeed = deletingTime / totalCharacters;

        }
    
        function typeText() {

            const roleSpan = document.getElementById('role');

            if (textCharIndex < roles[currentRoleIndex].length) {
                roleSpan.textContent += roles[currentRoleIndex][textCharIndex];
                textCharIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                setTimeout(deleteText, pauseTime);
            }

        }
    
        function deleteText() {

            const roleSpan = document.getElementById('role');

            if (textCharIndex > 0) {
                roleSpan.textContent = roles[currentRoleIndex].substring(0, textCharIndex - 1);
                textCharIndex--;
                setTimeout(deleteText, deletingSpeed);
            } else {
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                textCharIndex = 0; 
                setTimeout(startTypingNextRole, pauseTime); 
            }

        }
    
        function startTypingNextRole() {

            calculateSpeeds(); 
            typeText(); 
            changeImage(); 
            changeText(); 
            
        }


        window.onload = function() {

            initToasts();
            calculateSpeeds(); 
            typeText(); 
            changeImage(); 
            changeText(); 
        };

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
    var visualizer = document.querySelector('.visualizer');

    if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    tooltip.textContent = 'Pause Music';
    visualizer.classList.add('playing');
    toggleControlIcons(true);
    toggleTimeDisplay(true);
    } else {
    audioPlayer.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    tooltip.textContent = 'Play Music';
    visualizer.classList.remove('playing');
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
    var visualizer = document.querySelector('.visualizer');

    audioPlayer.pause();      
    audioPlayer.currentTime = 0; 

    if (playIcon.classList.contains('fa-pause')) {

        playIcon.classList.remove('fa-pause');
        visualizer.classList.remove('playing');
        playIcon.classList.add('fa-play');
        tooltip.textContent = 'Play Music';
        toggleControlIcons(false);
        toggleTimeDisplay(false);

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
            tooltip.textContent = 'בטל השתקה';
        } else {
            muteIcon.classList.remove('fa-volume-xmark');
            muteIcon.classList.add('fa-volume-high');
            tooltip.textContent = 'השתק מוזיקה';
        }

    }

    function backwardMusic() {

        var audio = document.getElementById('audioPlayer');
        var tooltip = document.querySelector('.backward .tooltip');

        if (audio.currentTime >= 10) {
            audio.currentTime -= 10; 
            tooltip.textContent = 'אחורה 10 ש';
        } else {
            var backwardIcon = document.querySelector('.fa-forward');
            backwardIcon.style.backgroundColor = 'gray';
            backwardIcon.style.color = 'black';
            backwardIcon.style.cursor = 'none';
            tooltip.textContent = 'לא עבר מספיק';

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
            tooltip.textContent = 'קדימה 10 ש';
        } else {
            var forwardIcon = document.querySelector('.fa-backward');
            forwardIcon.style.backgroundColor = 'gray';
            forwardIcon.style.color = 'black';
            forwardIcon.style.cursor = 'default';
            tooltip.textContent = 'לא עבר מספיק';

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

/* Chat Bot */

    const chatboxContainer = document.getElementById('chatboxContainer');
    const chatbox = document.getElementById('chatbox');
    const messagesContainer = document.getElementById('messages');
    const chatbotButton = document.getElementById('chatbotButton');
    const exclamationMark = document.getElementById('exclamationMark');
    let welcomeShown = false;
    let lastUserMessage = "";

    const responses = {

    "היי , מה שלומך ?": "שלום ותודה ששאלת לשלומי . למרות שאני סתם בוט , הכל בסדר גמור איתי . מה איתך ?",
    "ספר לי על תוכן אתר זה": "באתר זה ניתן למצוא פרטים רבים ומידע מגוון אודות הבוס האדיר שלי - לישי קרויטור",
    "מה הן הדרכים ליצירת קשר עם לישי ?": "באתר קיימים קישורים לפלטפורמות המדיה החברתית שלו וכן גם ניתן לשלוח טופס אישי ישירות למייל שלו .",
    "כיצד הוא יצר אותך ?": "שימוש פשוט בשפות התכנות המוכרות לפיתוח אתרים ( HTML , CSS , Javascript ) . אהבת ?",
    "תודה רבה !": "בשמחה . אני אחכה כאן במידה וצריך אותי שוב .",
    "נקה היסטוריית שיחה": "",
    "סיים שיחה": "מקווה שנהנית ממני כפי שאני נהניתי ממך . להתראות !"
    
    };

    const questions = Object.keys(responses);

    questions.forEach(question => {

    const button = document.createElement('button');
    button.textContent = question;
    button.className = 'question-button';
    button.addEventListener('click', () => handleQuestionClick(question));
    document.getElementById('questionButtons').appendChild(button);

    });

    function showExclamationMark() {
        exclamationMark.style.display = 'block';
    }
    
    setTimeout(showExclamationMark, 15000);

    chatbotButton.addEventListener('click', () => {

        const chatboxDisplayStyle = window.getComputedStyle(chatboxContainer).display;

        if (chatboxDisplayStyle === 'none') {
        chatboxContainer.style.display = 'block';
        chatbox.scrollTop = chatbox.scrollHeight;
        if (!welcomeShown) {
            addMessage("בוט", "במה אפשר לעזור לך ? האם יש משהו שתרצה לדעת עלי או על לישי ?");
            welcomeShown = true;
        }
        exclamationMark.style.display = 'none';
        } else {
        chatboxContainer.style.display = 'none';
        }

    });

    function handleQuestionClick(question) {

        const noMessagesElement = document.querySelector('.no-messages');

        if (noMessagesElement) {

            noMessagesElement.remove();

        }
    
        if (lastUserMessage === question) {

            return;

        }

        addMessage("אתה", question, true);
        lastUserMessage = question;
        const response = responses[question] || "סליחה , לא הבנתי .";
        addMessage("בוט", response, false); 

        if (question === "נקה היסטוריית שיחה") {
            clearAllMessages();
        } else if (question === "סיים שיחה") {
        setTimeout(() => {
            closeChatbox();
        }, 2500);
        }

    }
    
    function addMessage(sender, text, isUserMessage) {

        const noMessagesElement = document.querySelector('.no-messages');

        if (noMessagesElement) {

            noMessagesElement.remove();
            
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUserMessage ? 'user-message' : 'bot-message');
        const iconClass = isUserMessage ? 'user-icon' : 'bot-icon';
        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', iconClass, 'icon');
        iconElement.classList.add(isUserMessage ? 'fa-user' : 'fa-robot');
        messageElement.appendChild(iconElement);
        const senderElement = document.createElement('strong');
        senderElement.textContent = `${sender} : `;
        messageElement.appendChild(senderElement);
        const textNode = document.createTextNode(text);
        messageElement.appendChild(textNode);
        messagesContainer.appendChild(messageElement);
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

      }

    function closeChatbox() {

        chatboxContainer.style.display = 'none';

    }

    function clearAllMessages() {

        const messages = document.querySelectorAll('.message');
    
        messages.forEach(message => {

            message.remove();

        });
    
        const noMessagesElement = document.createElement('div');
        noMessagesElement.classList.add('message', 'bot-message', 'no-messages');
        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', 'bot-icon', 'icon', 'fa-robot');
        noMessagesElement.appendChild(iconElement);
        const senderElement = document.createElement('strong');
        senderElement.textContent = "בוט : ";
        noMessagesElement.appendChild(senderElement);
        const textNode = document.createTextNode("אין הודעות חדשות !");
        noMessagesElement.appendChild(textNode);
        messagesContainer.appendChild(noMessagesElement);
        chatbox.scrollTop = chatbox.scrollHeight;
        lastUserMessage = "";

    }