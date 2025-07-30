import "../css/style.css";

// лучше переделать по ключу или id
// ToDo: add save bar content
function restoreContentByClass(elem) {
    const className = elem.className;
    const data = localStorage.getItem("resume_" + className);
    if (data !== null) {
        elem.innerHtml = data;
    }
}

function saveContentByClass(elem) {
    const className = elem.className;
    localStorage.setItem("resume_" + className, elem.innerText);
}

function handleInput(elem) {
    elem.addEventListener("input", () => {
        saveContentByClass(elem);
    });
}

function createWave(event) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const wave = document.createElement("span");
    wave.className = "wave";
    wave.style.width = `${size}px`;
    wave.style.height = `${size}px`;
    wave.style.left = `${event.clientX - rect.left - size / 2}px`;
    wave.style.top = `${event.clientY - rect.top - size / 2}px`;

    target.appendChild(wave);
    setTimeout(() => wave.remove(), 500);
}

function init() {
    document.querySelectorAll("[contenteditable]").forEach((elem) => {
        restoreContentByClass(elem);
        handleInput(elem);
        elem.addEventListener("click", createWave);
    });
}

init();
