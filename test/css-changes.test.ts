import "../src/extensions/string-extensions";

test("Text color should change", () => {
    document.body.innerHTML =
    `<div>
      <span id="username" style="color: #ff0000" />
      <button id="button" />
      <p>test</p>
     </div>`;
    const usernameSpan = document.getElementById("username");
    if (usernameSpan && usernameSpan.style.color) {
      expect(usernameSpan.style.color.toHex()).toBe("#ff0000");
      usernameSpan.style.color = "#00ff00";
      expect(usernameSpan.style.color.toHex()).toBe("#00ff00");
    }
});
