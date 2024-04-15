document.addEventListener("DOMContentLoaded", function() {
    const minimizeButton = document.getElementById("minimizeButton");
    const sidebar = document.querySelector(".sidebar");

    minimizeButton.addEventListener("click", function() {
        sidebar.classList.toggle("collapsed");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const minimizeButton = document.getElementById("minimizeButton");
    const expandButton = document.getElementById("expandButton");
    const sidebar = document.querySelector(".sidebar");

    minimizeButton.addEventListener("click", function() {
        sidebar.classList.add("collapsed");
    });

    expandButton.addEventListener("click", function() {
        sidebar.classList.remove("collapsed");
    });
});
