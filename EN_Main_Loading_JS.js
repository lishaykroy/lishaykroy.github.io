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
