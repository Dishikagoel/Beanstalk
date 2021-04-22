class Loader extends HTMLElement
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
                    display: flex;
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                    align-items: center;
                    justify-content: center;
                    background: #000000;
                    z-index: 999;
                    visibility: hidden;
                }

                #loader
                {
                    border: 16px solid #f3f3f3;
                    border-top: 16px solid #63C866;
                    border-radius: 50%;
                    width: 120px;
                    height: 120px;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin 
                {
                    0%
                    {
                        transform: rotate(0deg);
                    }
                    100%
                    {
                        transform: rotate(360deg); 
                    }
                }
            </style>
        `;

        this.shadowRoot.innerHTML +=
        `
            <div id="loader"></div>
        `;

        return;
    }

    disconnectedCallback()
    {
        return;
    }

    start()
    {
        this.style.visibility = 'visible';
        return;
    }

    stop()
    {
        this.style.visibility = 'hidden';
        return;
    }
}

customElements.define('bs-loader', Loader);
export default Loader;