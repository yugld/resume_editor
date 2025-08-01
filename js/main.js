import html2pdf from "html2pdf.js";

// лучше переделать по ключу или id
// ToDo: add save bar content
function restoreContentByClass(elem) {
    const className = elem.className;
    const data = localStorage.getItem("resume_" + className);
    if (data !== null) {
        elem.innerHTML = data;
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

async function downloadPDF() {
    try {
        const pdf = await generatePDF();
        pdf.save("resume.pdf");
    } catch (error) {
        console.error("PDF:", error);
    }
}

async function generatePDF() {
    const resume = document.getElementById("resume");
    if (!resume) {
        return;
    }

    const clone = resume.cloneNode(true);
    //. html2pdf can be configured using an optional opt parameter:
    const opt = {
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
            scale: 2,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(clone).set(opt).save();
}

function init() {
    document.querySelectorAll("[contenteditable]").forEach((elem) => {
        restoreContentByClass(elem);
        handleInput(elem);
        elem.addEventListener("click", createWave);
    });
    document
        .getElementById("savePdfBtn")
        .addEventListener("click", downloadPDF);
}

document.addEventListener("DOMContentLoaded", init);
