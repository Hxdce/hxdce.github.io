function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}


function loadSectionForBody(url) {
    var request = makeHttpObject();
    request.open("GET", url, true);
    request.send(null);
    request.onreadystatechange = function() {
    if (request.readyState == 4)
        var contents = request.responseText;
        var a = document.getElementById("mainBody");
        a.innerHTML = contents;
    };
}


function setActiveNavButton(buttonID) {
    // Remove the navActive class from the current active nav button.
    let navButtons = document.getElementsByClassName("navButton");
    for (let i of navButtons) {
        if (i.classList.contains("navActive")) {
            i.classList.remove("navActive");
        }
    }
    // Replace it with the newly selected one.
    document.getElementById(buttonID).classList.add("navActive");
}


function loadSection(url, buttonID) {
    loadSectionForBody(url);
    setActiveNavButton(buttonID);
}


function testClick() {
    var request = makeHttpObject();
    request.open("GET", "./html/test.html", true);
    request.send(null);
    request.onreadystatechange = function() {
    if (request.readyState == 4)
        var contents = request.responseText;
        var a = document.getElementById("mainBody");
        a.innerHTML = contents;
    };
}


function workSectionAdvanceImageSlide(direction) {
    let images = document.getElementById("workProjectCurrImage");
    let newIndex = 0;
    let imageCt = images.children.length;

    for (let i = 0; i < imageCt; i++) {
        let curr = images.children[i];
        if (curr.className === 'workProjectImageActive') {
            if (direction) {
                newIndex = (i >= imageCt - 1) ? 0 : i + 1;
            }
            else {
                newIndex = (i < 1) ? imageCt - 1 : i - 1;
            }
            curr.className = 'workProjectImageInactive';
        }
    }
    images.children[newIndex].className = 'workProjectImageActive';
    workSectionSetActiveImageDot(newIndex);
}


function workSectionSetActiveImageDot(index) {
    let dots = document.getElementById("workProjectImageDotArray");
    if ((index < 0) || (index >= dots.children.length)) {
        console.warn("Invalid dot index for work section image dots!");
        return;
    }
    let s = 'workProjectImageDotActive';
    for (let i of dots.children) {
        if (i.id == s) {
            i.id = '';
        }
    }
    dots.children[index].id = s;
}