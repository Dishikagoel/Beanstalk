class Header extends HTMLElement
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
                    grid-area: bs-header;
                    background: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-family: 'Roboto', sans-serif;
                    box-sizing: border-box;
                    border-bottom: 2px #63C866 solid;
                }
            
                #logo
                {
                    color: #EEEEEE;
                    font-size: 20px;
                    letter-spacing: 2px;
                    padding-left: 40px;
                }
                
                #links
                {
                    width: 35%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                #links .link
                {
                    color: #EEEEEE;
                    text-decoration: none;
                    letter-spacing: 2px;
                    transition: 0.3s ease-in;
                }

                #links .link:hover
                {
                    color: #63C866;
                }

                #register
                {
                    background: #63C866;
                    border: none;
                    outline: none;
                    padding: 10px;
                    font-size: 15px;
                    letter-spacing: 2px;
                    transition: 0.5s;
                }

                #register:hover
                {
                    color: #EEEEEE;
                }
            </style>
        `;

        this.shadowRoot.innerHTML += 
        `
            <h4 id="logo">
                BeanStock
            </h4>

            <div id="links">
                <a class="link" href="/">
                    Home
                </a>

                <a class="link" href="/product">
                    Product
                </a>

                <a class="link" href="/about">
                    About
                </a>

                <button id="register">
                    Sign in
                </button>
            </div>
        `;

        const links = this.shadowRoot.querySelectorAll('#links .link');

        for(
            const link of [... links]
        ) link.addEventListener(
            'click',
            event => {
                event.preventDefault();
                this.app.router.render(link.attributes.href.value);

                return;
            }
        );

        const button = this.shadowRoot.querySelector('#links #register');

        button.addEventListener(
            'click',
            () => {
                this.app.router.render('/sign-in');
                return;      
            }
        );
        
        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-header', Header);
export default Header;