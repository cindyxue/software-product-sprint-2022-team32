class gridSquare extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 
        `
        <li class="grid-block"></li>
        `;
    }
}


window.customElements.define('grid-square', gridSquare);