class Messages extends HTMLElement
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
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 15vw;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }
                
                .message
                {
                    margin-top: 10px;
                    animation: translation 1s forwards;
                }
        
                @keyframes translation 
                {
                    0%
                    {
                        transform: translateY(110px);
                    }
                    100%
                    {
                        transform: translateY(0); 
                    }
                }
            </style>
        `;

        this.shadowRoot.innerHTML +=
        `
        `;

        this.current = [];
        this.queued = [];

        return;
    }

    disconnectedCallback()
    {
        return;
    }

    push(
        message
    )
    {
        const
        {
            text,
            type = 'error',
            duration = 5000
        } = message;

        if(this.shadowRoot.children.length >= 4)
        {
            this.queued.push(message);
            return;
        }

        const div = document.createElement('div');

        div.classList.add('message');
        div.classList.add(type);

        this.shadowRoot.appendChild(div);

        const button = document.createElement('button');

        div.appendChild(button);

        const p = document.createElement('p');
        p.innerHTML = text;

        div.appendChild(p);

        const record = {};
        record.element = div;
        record.button = button;
        record.handler = () => this.remove(record);

        button.addEventListener(
            'click',
            record.handler
        );

        if(duration !== Infinity) record.timeout = setTimeout(
            record.handler,
            duration
        );

        this.current.push(record);

        return;
    }

    remove(
        record
    )
    {
        const index = this.current.indexOf(record);

        record.element.remove();

        record.button.removeEventListener(
            'click',
            record.handler
        );

        clearTimeout(record.timeout);

        this.current.splice(
            index,
            1
        );

        return;
    }
}

customElements.define('bs-messages', Messages);
export default Messages;