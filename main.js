let textarea = document.getElementById("myTextarea");
let word = document.getElementById("word");
let sentence = document.getElementById("sentence");
let paragraph = document.getElementById("paragraph");
let autosaveInput = document.getElementById("autosaveInput");

let previousText = JSON.parse(window.localStorage.getItem("text")) || "";
let autosave = JSON.parse(window.localStorage.getItem("autosave")) || false;
autosaveInput.checked = autosave;


textarea.value = previousText;

window.onload = () => {
    saveCounts(previousText);
}


autosaveInput.onchange = () => {
    console.log(autosaveInput.checked);
    if(!autosaveInput.checked){
        window.localStorage.removeItem("text");
        window.localStorage.removeItem("autosave");
    } else {
        console.log("ssetitem");
        window.localStorage.setItem("text", JSON.stringify(textarea.value));
        window.localStorage.setItem("autosave", true);
    } 

}

function getLocalInfo() {
    autosaveInput.checked = autosave;
}

textarea.oninput = (e) => {

    if(autosaveInput.checked){
        window.localStorage.setItem("text", JSON.stringify(e.target.value));
    }
  
  let value = JSON.parse(window.localStorage.getItem("text")) || e.target.value;

  saveCounts(value);

};

function saveCounts(value) {
    let wordCount = value.trim().split(/\s+/);
    let sentenceCount = value.trim().split(".");
    let paragraphCount = value.trim().split(".\n");
  
    word.textContent = value.length ? wordCount.length : 0;
    sentence.textContent = sentenceCount.length - 1;
    paragraph.textContent = value.length ? paragraphCount.length : 0;
}

function setFileName() {
  if (textarea.value) {
    let filename = prompt("Please, enter the name of file", "");
    if (filename === null) {
      alert("You didn't enter the file name!!!");
    } else {
      downloadFile(filename);
    }
  }
  else {
    alert("You haven't typed anything!");
  }
}

function downloadFile(name) {
  let text = textarea.value;
  let filename = `${name}.doc`;

  // Create a Blob object from the text
  let blob = new Blob(['<html><head><style>body{font-family: Arial, sans-serif;}</style></head><body>' + text + '</body></html>'], { type: "text/plain" });

  // Create a temporary URL for the Blob
  let url = URL.createObjectURL(blob);

  // Create a link element with the URL as the href attribute
  let link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);

  // Simulate a click on the link to trigger the download
  link.click();

  // Clean up the temporary URL and link element
  URL.revokeObjectURL(url);
  link.remove();
}


