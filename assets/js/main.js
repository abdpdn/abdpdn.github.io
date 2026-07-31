window.onload = function () {

    const button = document.getElementById("theme");

    // Theme toggle
    if (button) {
        button.addEventListener("click", function () {

            const dark = document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", dark ? "dark" : "light");

        });
    }

    // Hide selected navigation tabs
    ["/talks/", "news.html", "software.html", "contact.html"].forEach(function (page) {

        document.querySelectorAll('a[href="' + page + '"]').forEach(function (link) {
            link.style.display = "none";
        });

    });

};
