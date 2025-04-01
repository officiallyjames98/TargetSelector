
function revealWinner() {
    document.getElementById("hiddenMessage").style.visibility = 'visible';
}

function solSelector() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d")
    const image = document.getElementById("panorama");
    


    //update image dependent on the sol selected.
    //draw new image
    ctx.drawImage(image, 10, 10)
}

function printMousePos(event) {
    let x = event.pageX
    let y = event.pageY

    let message = "x: " + x + " y: " + y;
    if (x < 1000 && x > 10){
        if (y <510 && y > 210){
            let message = "x: " + x + " y: " + y;
            document.getElementById("coord").innerHTML = message;
        }
        else {let message =  "x: , y: "
            document.getElementById("coord").innerHTML = message;}
    }        else {let message = "x: , y: "
        document.getElementById("coord").innerHTML = message;}
  }
function circleDraw(event) {

    let x = event.pageX
    let y = event.pageY
    let existingCircle = document.getElementById("click-circle");
    if (x < 1000 && x > 10){
        if (y <510 && y > 210){
            // Remove any existing circle

            if (existingCircle) {existingCircle.remove();}

            // Create a new circle
            let circle = document.createElement("div");
            circle.id = "click-circle";
            circle.style.position = "absolute";
            circle.style.width = "20px";
            circle.style.height = "20px";
            circle.style.backgroundColor = "red";
            circle.style.borderRadius = "50%";
            circle.style.top = `${event.clientY - 10}px`;
            circle.style.left = `${event.clientX - 10}px`;
            circle.style.opacity = "0.5";
            circle.style.pointerEvents = "none"; // Prevent interaction with the circle

            document.body.appendChild(circle);
        }
        else { if (existingCircle) {existingCircle.remove();}}
    }
    else {if (existingCircle) {existingCircle.remove();}}
}  

let targetCount = 0;
function targetDraw(x, y, targetCount) {

    
    if (x < 1000 && x > 10){
        if (y <510 && y > 210){
            // Remove any existing circle

            // Create a new circle
            let circle = document.createElement("div");
            circle.id = "target-circle"+targetCount;
            console.log(circle.id)
            circle.style.position = "absolute";
            circle.style.width = "20px";
            circle.style.height = "20px";
            circle.style.backgroundColor = "green";
            circle.style.borderRadius = "50%";
            circle.style.top = `${y - 10}px`;
            circle.style.left = `${x - 10}px`;
            circle.style.opacity = "0.5";
            document.body.appendChild(circle);
        }
    }
}


function toggleMenu() {
    const menu = document.querySelector('.dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

var sol = 0;
function changeSol(){
    var current_sol = document.getElementById('dropdown-button').innerText;
    var sol = current_sol.charAt(current_sol.length-1);

    if (sol == 1){
        document.getElementById("panorama").src = "mars1.jpg";
        sol_track = sol
    }
    else if (sol == 2){
        document.getElementById("panorama").src = "mars2.jpg";
        sol_track = sol
    } else {
        document.getElementById("panorama").src = "NotValid.png";
        sol_track = sol
    }

}

function selectOption(element) {
    document.querySelector('.dropdown-button').innerText = element.innerText;
    document.querySelector('.dropdown-menu').style.display = 'none';
    changeSol()
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        document.querySelector('.dropdown-menu').style.display = 'none';
    }
});


let reasons = [];
function setTarget(){
    if (confirm("Confirm Target?")) {
    let coord = document.getElementById("click-circle").getBoundingClientRect();
    var x_coord = coord.left + window.scrollX + 10;
    var y_coord = coord.top + window.scrollY + 10;
    let message = "x target: " + x_coord + " y target: " + y_coord;
    document.getElementById("target").innerHTML = message;
    targetDraw(x_coord, y_coord, targetCount);
    targetCount = targetCount+1
    var text = document.getElementById("Target Reasoning").value;
    reasons.push(text);
    let newmessage = "Please enter reasoning for this target";
    document.getElementById("Target Reasoning").value = newmessage;
    console.log(document.getElementById("Target Reasoning").value);
    }
    else {
        txt = "You pressed Cancel!";
      }
}

function clearSingleTarget(){
    const targetElement = document.getElementById("target-circle"+(targetCount-1));

    targetElement.remove();
    targetCount = targetCount - 1
}

function clearAllTarget(){
    for (let i = 0; i < targetCount; i++) {
        const targetElement = document.getElementById("target-circle"+i);
        targetElement.remove();
    }

}


document.addEventListener("click", printMousePos)
document.addEventListener("click", circleDraw)

//Hover event for the set targets
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("mouseover", function (event) {
        for (let i = 0; i < targetCount; i++) {


            const targetElement = document.getElementById("target-circle"+i);
            
            if (!targetElement) {
                console.warn("Target element not yet available.");
                return;
            }
            
            if (event.target === targetElement) {
                console.log("Mouseover event triggered on dynamically loaded target element");
                
                // Create a new element
                const newElement = document.createElement("div");
                text = reasons[i];
                newElement.textContent = text;
                newElement.style.position = "absolute";
                newElement.style.top = `${event.clientY + 10}px`;
                newElement.style.left = `${event.clientX + 10}px`;
                newElement.style.padding = "10px";
                newElement.style.backgroundColor = "lightblue";
                newElement.style.border = "1px solid blue";
                newElement.style.borderRadius = "5px";
                newElement.setAttribute("id", "hoverElement");
                
                console.log("New element created and styled", newElement);
                
                // Append it to the body
                document.body.appendChild(newElement);
                console.log("New element appended to body");
            }
        }
    });
        document.addEventListener("mouseout", function (event) {
            for (let i = 0; i < targetCount; i++) {
            const targetElement = document.getElementById("target-circle"+i);
            const hoverElement = document.getElementById("hoverElement");
            
            if (targetElement && hoverElement && event.target === targetElement) {
                console.log("Mouseout event triggered, removing hover element");
                hoverElement.remove();
            }
            }
    });
    
});