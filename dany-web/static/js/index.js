class Services
{
    constructor(
        services
    )
    {
        this.app = new App();
        this.services = services;

        this.container = document.createElement('div');
        this.container.id = 'services';

        document.body.appendChild(this.container);

        this.ready = this.start();

        return;
    }

    async start()
    {
        const uniques = [
            ... new Set(this.services)
        ];

        await Promise.all(
            uniques.map(
                unique => import(`/services/${unique}.js`)
            )
        );

        for(const service of this.services) this.container.appendChild(
            document.createElement(service)
        );
        
        return;
    }

    get(service)
    {
        return this.container.querySelector(service);
    }
}

class Router
{
    constructor(
        views
    )
    {
        this.app = new App();
        this.views = views;

        this.container = document.createElement('div');
        this.container.id = 'display';

        this.container.style.cssText =
        `
            position: absolute;
            display: grid;
            max-width: 100vw;
            max-height: 100vh;
            margin: -8px;
            overflow: hidden;
        `;

        document.body.appendChild(this.container);

        this.ready = this.start();

        return;
    }

    async start()
    {
        await this.app.services.ready;

        // Listen for history updates
        window.addEventListener(
            'popstate',
            () => this.render(location.pathname)
        );

        // Initial routing
        this.render(location.pathname);

        return;
    }

    async render(
        path
    )
    {
        // Start loading animation
        this.app.services
            .get('bs-loader')
            .start();

        // Change URL
        if(path !== location.pathname)
        {
            history.pushState(
                null,
                null,
                path
            );  
        }

        // Find the view
        const view = this.views.find(
            view => view.path.test(path)
        );
        
        // Update the title
        document.title = view.title || 'No Title';

        // Update the template
        this.container.style.gridTemplate = view.template;
        
        // Find unique components of the view and load
        const uniques = [
            ... new Set(view.elements)
        ];

        await Promise.all(
            uniques.map(
                unique => import(`/display/${unique}.js`)
            )
        );

        // Remove elements that do not appear in view
        const query = uniques.join(', ');
        const redundant = this.container.querySelectorAll(`:not(${query})`);

        for(const element of redundant) element.remove();
        
        for(const unqiue of uniques)
        {
            const current = this.container.querySelectorAll(unqiue);

            const objective = view.elements.filter(
                element => element === unqiue
            );
                
            const difference = current.length - objective.length;

            for(
                let i = 0;
                i < Math.abs(difference);
                i++
            )
            {
                if(difference < 0)
                {
                    this.container.appendChild(
                        document.createElement(unqiue)
                    );
                }
                else
                {
                    current[0].remove();
                }
            }
        }

        this.app.services
            .get('bs-loader')
            .stop();

        this.current = view;

        return;
    }
}

class App
{
    constructor(
        settings
    )
    {
        if(App.instance) return App.instance;
        App.instance = this;

        const
        {
            services,
            views
        } = settings;
        
        this.services = new Services(services);
        this.router = new Router(views);

        return;
    }
}

const app = new App(
    {
        services:
        [
            'bs-loader',
            'bs-messages'
        ],
        views:
        [
            {
                name: 'index',
                path: /^\/$/,
                title: 'BeanStock | Home',
                elements:
                [
                    'bs-header',
                    'bs-index',
                ],
                template:
                `
                    "bs-header" 8vh
                    "bs-index" 92vh
                    /
                    100vw
                `,
            },
            {
                name: 'product',
                path: /^\/product$/,
                title: 'BeanStock | Product',
                elements:
                [
                    'bs-header',
                    'bs-product',
                ],
                template:
                `
                    "bs-header" 8vh
                    "bs-product" 92vh
                    /
                    100vw
                `
            },
            {
                name: 'about',
                path: /^\/about$/,
                title: 'BeanStock | About',
                elements:
                [
                    'bs-header',
                    'bs-about',
                ],
                template:
                `
                    "bs-header" 8vh
                    "bs-about" 92vh
                    /
                    100vw
                `
            },
            {
                name: 'sign-in',
                path: /^\/sign-in$/,
                title: 'BeanStock | Sign In',
                elements: 
                [
                    'bs-header',
                    'bs-auth',
                ],
                template:
                `
                    "bs-header" 8vh
                    "bs-auth" 92vh
                    /
                    100vw
                `
            },
            {
                name: 'not-found',
                path: /(.*?)/,
                title: 'BeanStock | 404 Not Found',
                elements:
                [
                    'bs-header',
                    'bs-not-found'
                ],
                template:
                `
                    "bs-header" 8vh
                    "bs-not-found" 92vh
                    /
                    100vw
                `
            }
        ]
    }
);