class footer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 
        `
        <div class="footer-content">
            <h3 class="team-tittle">Google SPS Team 32</h3>
            <a class="github-item" href="https://github.com/cindyxue/software-product-sprint-2022-team32" target="_blank">Github</a> 
        </div>
        `;
    }
}


window.customElements.define('footer-end', footer);