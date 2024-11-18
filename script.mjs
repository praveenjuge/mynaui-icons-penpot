import { readFileSync, writeFileSync } from "fs";

function writeFile() {
  let uiHtml = readFileSync("./index.html", "utf8");
  let generatedSVGs = "";

  // Generate SVGs
  Object.entries(metaJson).forEach(([icon, value]) => {
    const svg = `<button data-appearance="secondary" title="${icon}" aria-label="${value.tags}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor">${value.regular}</svg></button><button data-appearance="secondary" title="${icon}-solid" aria-label="${value.tags}"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${value.solid}</svg></button>`;
    generatedSVGs += svg;
  });

  // Search for the #iconsGrid div by ID
  const match = uiHtml.match(/<div id="iconsGrid">[\s\S]*?<\/div>/);

  if (match) {
    // Replace the existing #iconsGrid div
    uiHtml = uiHtml.replace(
      match[0],
      `<div id="iconsGrid">${generatedSVGs}</div>`
    );
  } else {
    // If #iconsGrid doesn't exist, add it to the end of the document
    uiHtml += `<div id="iconsGrid">${generatedSVGs}</div>`;
  }

  // Write the updated content back to index.html
  writeFileSync("./index.html", uiHtml, "utf8");
}

let metaJson = "";

async function fetchIcons() {
  await fetch("https://unpkg.com/@mynaui/icons/meta.json", { verbose: true })
    .then((response) => response.json())
    .then((data) => {
      metaJson = data;
    });

  writeFile();
  console.log("Done!");
}
fetchIcons();
