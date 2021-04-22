class Auth extends HTMLElement
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
                    grid-area: bs-auth;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(#0185A3, #63C866);
                }

                #form
                {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 300px;
                    height: 300px;
                    padding: 50px;
                    font-family: 'Roboto', sans-serif;
                    border-radius: 15px;
                    backdrop-filter: blur(5px);
                    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                #form .input
                {
                    outline: none;
                    border: none;
                    background: transparent;
                    border-bottom: 2px #000000 solid;
                    padding: 0px;
                    height: 50px;
                }

                #form .input:focus
                {
                    border-bottom: 2px #63C5C8 solid;
                }

                #form .input::placeholder
                {
                    color: #000000;
                }

                #form #submit
                {
                    outline: none;
                    border: none;
                    height: 50px;
                    background: #000000;
                    font-size: 18px;
                    color: #FFFFFF;
                }

                #form #submit:hover
                {
                    background: #63C866;
                    color: #000000;
                }  

                .square
                {
                    position: absolute;
                    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.1);
                    animation: translate 10s linear infinite;
                }
                
                .square:nth-child(1)
                {
                    top: 20%;
                    right: 30%;
                    width: 100px;
                    height: 100px;
                    border-radius: 15px;
                }
                
                .square:nth-child(2)
                {
                    top: 40%;
                    left: 27%;
                    width: 120px;
                    height: 120px;
                    border-radius: 15px;
                }
                
                .square:nth-child(3)
                {
                    bottom: 30%;
                    right: 30%;
                    width: 80px;
                    height: 80px;
                    border-radius: 15px;                
                }
                
                .square:nth-child(3)
                {   
                    bottom: 30%;
                    right: 30%;
                    width: 80px;
                    height: 80px;
                    border-radius: 15px;                    
                }
                
                .square:nth-child(4)
                {
                    bottom: 7%;
                    left: 40%;
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                }
                
                .square:nth-child(5)
                {
                    top: 15%;
                    left: 45%;
                    width: 60px;
                    height: 60px;
                    border-radius: 10px;
                }

                @keyframes translate
                {
                    0%, 100%
                    {
                        transform: translateY(-40px);
                    }
                    50%
                    {
                        transform: translateY(40px);
                    }
                }          
            </style>
        `;

        this.shadowRoot.innerHTML += 
        `
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>

            <div id="form">
                <input class="input" placeholder="Username">
                <input class="input" placeholder="Password" type="password">
                <input id="submit" value="Login" type="submit">
            </div>
        `;

        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-auth', Auth);
export default Auth;