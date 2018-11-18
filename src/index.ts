import * as AColorPicker from "a-color-picker";
import css from "./desilu-main.css";
import html from "./desilu-main.html";
import {cssProperties, CSSStyle, VALUE_TYPE} from "./types/css-style";

const allElements = document.getElementsByTagName("*");

let currentPopup: HTMLDivElement;
let currentlySelectedProperty: string = "color";
let colorPicker: AColorPicker.ACPController;
const propertyNames = cssProperties.map((it) => it.name);
let currentlyVisiblePropertyNames = propertyNames.slice();

window.addEventListener("resize", (event) => {
    removeExistingPopups();
});

addCSS();
addRightClickListeners();

function addRightClickListeners() {
    for (const eachElement of allElements) {
        eachElement.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const element = event.target as HTMLSelectElement;
            addPopupBox(element);
            return false;
        }, false);
    }
}

function addPopupBox(targetElement: HTMLElement) {
    removeExistingPopups();
    const elementCoordinates = targetElement.getBoundingClientRect();
    currentPopup = document.createElement("div");
    currentPopup.className += " desilu-main-popup";
    currentPopup.innerHTML = getRenderedHTML();
    document.getElementsByTagName("body")[0].appendChild(currentPopup);
    enableSearch(targetElement);
    const closeButton = document.querySelector(".desilu-header-x") as HTMLElement;
    if (closeButton) {
        closeButton.onclick = () => removeExistingPopups();
    }
    addPropertyChoices(".desilu-property-choices", targetElement, currentlySelectedProperty);
    setPropertyListClickEvent(targetElement);
    updatePropertyListActiveStatuses();
    // coordinates must be calculated after width of popup is determined
    const bottom = Math.floor(elementCoordinates.bottom);
    const centerOfTarget = Math.floor(elementCoordinates.left) + elementCoordinates.width / 2;
    const left = centerOfTarget - currentPopup.clientWidth / 2;
    currentPopup.style.top = `${bottom + 16}px`;
    currentPopup.style.left = `${left}px`;
}

function removeExistingPopups() {
    if (currentPopup && currentPopup.parentElement) {
        currentPopup.parentElement.removeChild(currentPopup);
    }
}

function addCSS() {
    const desiluCSS = document.createElement("style");
    desiluCSS.type = "text/css";
    desiluCSS.innerHTML = css;
    document.body.appendChild(desiluCSS);
}

function getRenderedHTML() {
    return html.replace("${listItems}",
        getListItems(currentlyVisiblePropertyNames));
}

function getListItems(cssProperty: string[]) {
    let items = "";
    cssProperty.forEach((it, index) => {
        items += `<li class="desilu-list-item">${it}</li>`;
    });
    return items;
}

function removeCurrentColorPicker() {
    if (colorPicker && colorPicker.element) {
        colorPicker.element.remove();
    }
}

function addPropertyChoices(layout: string, targetElement: HTMLElement, targetElementProperty: string) {
    const property = cssProperties[propertyNames.indexOf(currentlySelectedProperty)];
    if (property.valueType === VALUE_TYPE.COLOR) {
        addColorPicker(layout, targetElement, targetElementProperty);
    } else if (property.valueType === VALUE_TYPE.DEFINED) {
        const choicesDiv = document.querySelector(layout);
        if (choicesDiv) {
            let choiceItems = "<ul>";
            property.values.forEach((it) => choiceItems += `<li class="desilu-choice-item">${it}</li>`);
            choicesDiv.innerHTML = choiceItems + "</ul>";

            document.querySelectorAll(".desilu-choice-item").forEach((it, index) => {
                const choice = it as HTMLElement;
                choice.className = "desilu-choice-item";
                if (index === 2) {
                    choice.className += " desilu-active-choice";
                } else {
                    choice.className += " desilu-inactive-choice";
                }
                choice.onclick = () => (targetElement.style as any)[targetElementProperty] = choice.innerHTML;
            });
        }
    }
}

function addColorPicker(layout: string, targetElement: HTMLElement, targetElementProperty: string) {
    if (!layout) {
        throw new Error("No 'desilu-property-choices' element to attach color picker to");
    }
    const choicesDiv = document.querySelector(layout);
    if (choicesDiv) {
        choicesDiv.innerHTML = "";
    }
    colorPicker = AColorPicker.createPicker({
        attachTo: layout,
        color: (getComputedStyle(targetElement) as any)[targetElementProperty],
        showAlpha: true,
    });
    colorPicker.onchange = (picker) => {
        (targetElement.style as any)[targetElementProperty] = picker.color.toString();
    };
    colorPicker.element.style.marginTop = "8px";
    colorPicker.element.style.marginRight = "8px";
}

function enableSearch(targetElement: HTMLElement) {
    const searchText = document.querySelector(".desilu-header-searchbox") as HTMLInputElement;
    if (searchText) {
        searchText.oninput = () => {
            currentlyVisiblePropertyNames = propertyNames;
            currentlyVisiblePropertyNames = currentlyVisiblePropertyNames.filter((it) => {
                return it.indexOf(searchText.value) !== -1;
            });
            const list = document.querySelector(".desilu-property-list") as HTMLElement;
            list.innerHTML = `<ul>${getListItems(currentlyVisiblePropertyNames)}</ul>`;
            setPropertyListClickEvent(targetElement);
            updatePropertyListActiveStatuses();
        };
    }
}

function setPropertyListClickEvent(targetElement: HTMLElement) {
    const allPropertyItems = document.querySelectorAll(".desilu-list-item");
    allPropertyItems.forEach((it) => {
        (it as HTMLElement).onclick = () => {
            currentlySelectedProperty = it.innerHTML;
            removeCurrentColorPicker();
            addPropertyChoices(".desilu-property-choices", targetElement, currentlySelectedProperty);
            updatePropertyListActiveStatuses();
        };
    });
}

function updatePropertyListActiveStatuses() {
    document.querySelectorAll(".desilu-list-item").forEach((it) => {
        const propertyItem = it as HTMLElement;
        let activeOrInactive;
        if (propertyItem.innerHTML === currentlySelectedProperty) {
            activeOrInactive = " desilu-active-property";
        } else {
            activeOrInactive = " desilu-inactive-property";
        }
        propertyItem.className = propertyItem.className
                                             .replace(" desilu-active-property", "")
                                             .replace(" desilu-inactive-property", "");
        propertyItem.className += activeOrInactive;
    });
}
