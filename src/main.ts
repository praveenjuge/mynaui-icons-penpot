import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});

// Search for icons
const search = document.getElementById("search");
const icons = document.querySelectorAll("button");

search?.addEventListener("input", (e) => {
  for (const icon of icons) {
    if (
      icon.ariaLabel
        ?.toLowerCase()
        .includes((e.target as HTMLInputElement).value.toLowerCase())
    ) {
      icon.style.display = "";
    } else {
      icon.style.display = "none";
    }
  }
});

// Click on an icon to insert it into the canvas
document.querySelectorAll("#iconsGrid button").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log((button as HTMLButtonElement).title);
    parent.postMessage(
      {
        type: "insert-icon",
        content: {
          name: (button as HTMLButtonElement).title,
          svg: (button as HTMLButtonElement).innerHTML,
        },
      },
      "*"
    );
  });
});
