"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../src/extensions/string-extensions");
test("Text color should change", function () {
    document.body.innerHTML =
        "<div>\n      <span id=\"username\" style=\"color: #ff0000\" />\n      <button id=\"button\" />\n      <p>test</p>\n     </div>";
    var usernameSpan = document.getElementById("username");
    if (usernameSpan && usernameSpan.style.color) {
        expect(usernameSpan.style.color.toHex()).toBe("#ff0000");
        usernameSpan.style.color = "#00ff00";
        expect(usernameSpan.style.color.toHex()).toBe("#00ff00");
    }
});
