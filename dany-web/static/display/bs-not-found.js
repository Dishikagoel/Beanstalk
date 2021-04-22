class NotFound extends HTMLElement
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
                    grid-area: bs-not-found;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000000;
                }

                #error
                {
                    font-family: 'Roboto', sans-serif;
                    font-size: 50px;
                    color: #63C866;
                }

                #text
                {
                    font-family: 'Roboto', sans-serif;
                    font-size: 40px;
                    color: #FFFFFF;
                }
            </style>
        `;

        this.shadowRoot.innerHTML +=
        `
            <h1>
                <span id="error">
                    404
                </span>
                <span id="text">
                    This page was not found
                </span>
            </h1>
        `;
        
        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-not-found', NotFound);
export default NotFound;