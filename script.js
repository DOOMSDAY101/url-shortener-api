"use strict";
let hamburger = document.querySelector(".hamburger");
let overlay = document.querySelector(".overlay");
let navBar = document.querySelector(".nav-menu");
let inPutLink = document.querySelector(".url-value");
let submitBtn = document.querySelector(".shorten");
let text = document.querySelector(".text");
let textLink = document.querySelector(".url-text-h3");
let shortLink = document.querySelector(".new-link-p");

let linkParentBox = document.querySelector(".shortened-links");
text.innerText = "";

hamburger.addEventListener("click", function () {
  navBar.classList.toggle("activated");
  overlay.classList.remove("hidden");
});
overlay.addEventListener("click", function () {
  navBar.classList.toggle("activated");
  overlay.classList.add("hidden");
});
class Shortener {
  constructor(textLink, shortLink) {
    this.textLink = textLink;
    this.shortLink = shortLink;
  }
  appendValues(textLink, shortLink) {
    let div = document.createElement("div");
    div.classList.add("shortened-links-box");
    let url = `https://api.shrtco.de/v2/shorten?url=${inPutLink.value}`;

    fetch(url).then(res => res.json()).then(data => {
      console.log(data);
      if (data.error_code === 2) {
        text.innerText = "This is not a valid url.";
        return;
      } else if (data.error_code === 10) {
        text.innerText = "The link you entered is a disallowed link";
        return;
      } else {
        div.innerHTML = ` 
      <div class="url-text"> 
          <h3 class="url-text-h3">${data.result.original_link} </h3>  
      </div>
      <div class="new-link">
          <p class="new-link-p">${data.result.short_link2}</p>
          <button type="button" class="copyBtn">Copy!</button>
      </div>`;
        linkParentBox.prepend(div);
        let copyBtn = document.querySelectorAll(".copyBtn");
        copyBtn.forEach(button => {
          button.addEventListener("click", this.copyLinks);
        });
      }
      let oldlink = document.querySelectorAll(".url-text-h3");
      let newlink = document.querySelectorAll(".new-link-p");

      let linksArr = [];
      oldlink.forEach(function (value, index) {
        let valueOfOldlink = localStorage.setItem(`oldlink${index}`, value.innerText);
        linksArr.push(valueOfOldlink);
      });
      newlink.forEach(function (value, index) {
        let valueOfNewlink = localStorage.setItem(`newlink${index}`, value.innerText);
        linksArr.push(valueOfNewlink);
      });
      console.log(linksArr);
    });
  }
  copyLinks() {
    this.innerHTML = "Copied!";
    this.style.backgroundColor = "hsl(257, 27%, 26%)";
    let clip = document.querySelector(".new-link-p").innerText;
    const copyToClipboard = text => navigator.clipboard
      ?.writeText && navigator.clipboard.writeText(text);

    copyToClipboard(clip);
    localStorage.removeItem();
    setTimeout(() => {
      this.innerHTML = "Copy!";
      this.style.backgroundColor = "hsl(180, 66%, 49%)";
    }, 3000);
  }
}
const shortener = new Shortener(textLink, shortLink);

submitBtn.addEventListener("click", function () {
  if (inPutLink.value === "") {
    text.innerText = "please add a link";
    inPutLink.classList.add("invalid");
    return;
  } else {
    inPutLink.classList.remove("invalid");
    text.innerHTML = "";
    shortener.appendValues(textLink, shortLink);
    inPutLink.value = "";
  }
});
