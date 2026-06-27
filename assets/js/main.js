window.onload = function () {

    const button = document.getElementById("theme");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    // Toggle theme
    if (button) {
        button.onclick = function () {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }

        };
    }

    // Hide navigation tabs
    ["news.html", "software.html", "contact.html"].forEach(function(page) {

        document.querySelectorAll('a[href="' + page + '"]').forEach(function(link) {
            link.style.display = "none";
        });

    });

};
