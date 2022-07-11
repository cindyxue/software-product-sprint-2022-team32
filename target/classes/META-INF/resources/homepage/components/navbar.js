class navbar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 
        `
            <header>
                <a class="logo" href="homepage.html"><img id="logo-img" src="images/motusredo-removebg.png" alt="logoplaceholder"></a>
                <nav>
                    <ul class="nav-links">
                        <li class="nav-option"><a href="homepage.html">Home</a></li>
                        <li class="nav-option"><a href="grid.html">Grid</a></li>
                        <li class="nav-option"><a href="">Panic</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}


window.customElements.define('nav-bar', navbar);