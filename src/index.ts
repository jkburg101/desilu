import * as AColorPicker from "a-color-picker";

const allElements = document.getElementsByTagName("*");

let currentPopup: HTMLDivElement;

window.addEventListener("resize", (event) => {
    removeExistingPopups();
});

for (const eachElement of allElements) {
    eachElement.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const element = event.target as HTMLSelectElement;
        addPopupBox(element);
        return false;
    }, false);
}

function addPopupBox(targetElement: HTMLElement) {
    removeExistingPopups();
    const elementCoordinates = targetElement.getBoundingClientRect();
    currentPopup = document.createElement("div");
    setBasePopupStyle(currentPopup);
    document.getElementsByTagName("body")[0].appendChild(currentPopup);
    AColorPicker.createPicker({
        attachTo: currentPopup,
        color: getComputedStyle(targetElement).color,
        showAlpha: true,
    }).onchange = (picker) => {
        targetElement.style.color = picker.color.toString();
    };
    // coordinates must be calculated after width of popup is determined
    const bottom = Math.floor(elementCoordinates.bottom);
    const centerOfTarget = Math.floor(elementCoordinates.left) + elementCoordinates.width / 2;
    const left = centerOfTarget - currentPopup.clientWidth / 2;
    currentPopup.style.top = `${bottom + 16}px`;
    currentPopup.style.left = `${left}px`;

}

function setBasePopupStyle(popup: HTMLDivElement) {
    popup.style.background = "white";
    popup.style.color = "red";
    popup.style.position = "absolute";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,.4)";
    popup.style.padding = "8px";
    popup.style.borderRadius = "16px";
}

function removeExistingPopups() {
    if (currentPopup && currentPopup.parentElement) {
        currentPopup.parentElement.removeChild(currentPopup);
    }

}
