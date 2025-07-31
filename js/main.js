// import "../css/style.css";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

// Download PDF
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
    const clone = resume.cloneNode(true);
    clone.style.width = "160";
    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
        scale: 2,
        width: 160 * 3.78,
        windowWidth: 160 * 3.78,
        scrollX: 0,
        scrollY: 0,
    });

    document.body.removeChild(clone);

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight =
        (canvas.height * pdf.internal.pageSize.getWidth()) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    return pdf;
}

document.getElementById("savePdfBtn").addEventListener("click", downloadPDF);

function init() {
    document.querySelectorAll("[contenteditable]").forEach((elem) => {
        restoreContentByClass(elem);
        handleInput(elem);
        elem.addEventListener("click", createWave);
    });
}

init();
