class Index extends HTMLElement
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
                    grid-area: bs-index;
                    background: #000000;
                }

                #chart-container
                {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    animation: fade 6s forwards;
                }

                #chart-container #chart-line
                {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: url("./img/chart-line.png") no-repeat;
                    background-size: 100% 100%;
                }

                #chart-container #chart-cover
                {
                    position: absolute;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background: black;
                    animation: shrink 3s forwards;
                }

                @keyframes shrink
                {
                    0%
                    {
                        width: 100%;
                    }
                    100%
                    {
                        width: 0;
                    }
                }

                @keyframes fade
                {
                    0%
                    {
                        opacity: 1;
                    }
                    100%
                    {
                        opacity: 0;
                    }
                }
            </style>    
        `;
        
        this.shadowRoot.innerHTML +=
        `
            <div id="chart-container">
                <div id="chart-line"></div>
                <div id="chart-cover"></div>
            </div>
        `;

        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-index', Index);
export default Index;