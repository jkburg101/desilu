import * as AColorPicker from "a-color-picker";
import html from "./desilu-main.html";

const allElements = document.getElementsByTagName("*");

let currentPopup: HTMLDivElement;

console.log(html);

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
    currentPopup.appendChild(getSearchBox());
    // addColorPicker(currentPopup, targetElement);
    currentPopup.appendChild(getCloseIcon());
    currentPopup.appendChild(getAttributeList());
    // coordinates must be calculated after width of popup is determined
    const bottom = Math.floor(elementCoordinates.bottom);
    const centerOfTarget = Math.floor(elementCoordinates.left) + elementCoordinates.width / 2;
    const left = centerOfTarget - currentPopup.clientWidth / 2;
    currentPopup.style.top = `${bottom + 16}px`;
    currentPopup.style.left = `${left}px`;
}

function setBasePopupStyle(popup: HTMLDivElement) {
    popup.style.background = "white";
    popup.style.position = "absolute";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,.4)";
    popup.style.padding = "8px";
    popup.style.borderRadius = "16px";
    popup.style.display = "flex";
}

function removeExistingPopups() {
    if (currentPopup && currentPopup.parentElement) {
        currentPopup.parentElement.removeChild(currentPopup);
    }
}

function getCloseIcon() {
    const closeIcon = document.createElement("p");
    closeIcon.innerText = "x";
    closeIcon.style.cursor = "pointer";
    closeIcon.style.padding = "8px";
    closeIcon.style.color = "gray";
    closeIcon.onclick = () => { removeExistingPopups(); };
    return closeIcon;
}

function getSearchBox() {
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.className += " desilu-input";
    searchBox.placeholder = "Search";

    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `
    .desilu-input {
        background-color: #f2f2f2;
        border-radius: 16px;
        outline: none;
        border: 0;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;
        color: #888888;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #aaaaaa;
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #aaaaaa;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #aaaaaa;
    }`;
    document.body.appendChild(css);

    return searchBox;
}

function getAttributeList() {
    const attributeList = document.createElement("ul");
    attributeList.innerHTML = `
    <li>testing</li>
    <li>again</li>
    <li>testing</li>
    <li>again</li>
    `;
    return attributeList;
}

function addColorPicker(layout: HTMLDivElement, targetElement: HTMLElement) {
    AColorPicker.createPicker({
        attachTo: currentPopup,
        color: getComputedStyle(targetElement).color,
        showAlpha: true,
    }).onchange = (picker) => {
        targetElement.style.color = picker.color.toString();
    };
}
