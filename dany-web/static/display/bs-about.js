class About extends HTMLElement
{
    constructor()
    {
        super();

        this.app = new App();
        
        return;
    }

    connectedCallback()
    {        
        this.attachShadow(
            {
                mode: 'open'
            }
        );

        this.shadowRoot.innerHTML += 
        `
            <style>
                :host
                {
                    grid-area: bs-about;
                    background: #000000;
                }
            </style>
        `;

        this.shadowRoot.innerHTML += 
        `
        `;
        
        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-about', About);
export default About;