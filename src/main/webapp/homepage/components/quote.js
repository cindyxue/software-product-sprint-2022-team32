class motiQuote extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 
        `
        <figure>
            <blockquote id="quote-box">
                <p id="quote">One day at a time.</p>
                <figcaption id="author">- Motus</figcaption>
            </blockquote>
        </figure>
        `;
    }
}


window.customElements.define('quote-dg', motiQuote);


const apiQ = "https://api.quotable.io/random";

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");

function getQuote() {
  fetch(apiQ)
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = `"${data.content}"`;
      author.innerHTML = `- ${data.author}`;
    });
}