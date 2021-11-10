const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const colors = document.querySelectorAll(".jsColor");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;
ctx.strokeStyle = "black";


let painting = false;
let filling = false;

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleBrushSize(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleColors(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeBtn() {
    if(filling === true) {
        filling = false;
        mode.innerText = `Fill`;
    } else {
        filling = true;
        mode.innerText = `Draw`;
    }
}

function handleFillingCanvas() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);}
}

function handleSaveBtn() {
    const img = canvas.toDataURL("img/jpeg");
    const link = document.createElement("a");
    link.href = img;
    link.download = "[EXPORT]";
    link.click();
}

function handleRightClick(event) {
    event.preventDefault();
}

if(canvas) {
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleFillingCanvas)
canvas.addEventListener("contextmenu", handleRightClick)
}

if(range) {
range.addEventListener("input", handleBrushSize)
}

if(colors) {
    colors.forEach(() =>addEventListener("click", handleColors))
}

if(mode) {
    mode.addEventListener("click", handleModeBtn)
}

if(save) {
    save.addEventListener("click", handleSaveBtn)
}