const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const dropup = document.getElementById("dropup");

sidebar.addEventListener("touchmove", (event) => {
    event.preventDefault();
});

function toggleAnimation(event) {
    const elem = event.target;
    if (elem.classList.contains("hiding")) {
        elem.classList.add("hidden");
        elem.classList.remove("hiding");
    }
    else if (elem.classList.contains("showing")) {
        elem.classList.remove("showing");
    }
}

sidebar.addEventListener("animationend", toggleAnimation);

overlay.addEventListener("click", () => {
    toggleSidebar();
});

dropup.addEventListener("animationend", toggleAnimation);

function toggleSidebar() {
    const toggleButton = document.querySelector("#toggle-sidebar > span");

    if (sidebar.classList.contains("hidden")) {
        sidebar.classList.remove("hidden");
        sidebar.classList.add("showing");

        toggleButton.classList.remove("fa-ellipsis-v");
        toggleButton.classList.add("fa-times");
    }
    else {
        sidebar.classList.remove("showing");
        sidebar.classList.add("hiding");

        toggleButton.classList.remove("fa-times");
        toggleButton.classList.add("fa-ellipsis-v");
    }
}

function toggleList() {
    const button = document.getElementById("toggleList");
    
    if (dropup.classList.contains("hidden")) {
        dropup.classList.remove("hidden");
        dropup.classList.add("showing");
        button.setAttribute("aria-expanded", "true");
    }
    else {
        dropup.classList.remove("showing");
        dropup.classList.add("hiding");
        button.setAttribute("aria-expanded", "false");
    }
}