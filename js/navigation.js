export class Navigation {
    constructor() {

        this.aNavLinks = document.querySelectorAll('#nav-menu a');
        this.aSections = document.querySelectorAll('section');
        this.oNavIcon = document.querySelector('#nav-icon');
        this.oNavMenu = document.querySelector('#nav-menu');

        this.offsets = [];

        //obtengo offsets "Y" de los Sections
        this.getSectionsOffset();

        //establezco posicion inicial para scroll spy
        this.changeActiveMenuItem();
    }

    defineEventListeners() {

        //smooth scroll
        this.aNavLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.smoothScroll(event.currentTarget.getAttribute('data-link-to'));
            })
        });

        //scroll spy
        window.addEventListener('scroll', this.changeActiveMenuItem.bind(this));

        //desplegar nav-icon
        this.oNavIcon.addEventListener('click', this.desplegaMenu.bind(this));
    }

    currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }

    elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }

    smoothScroll(eID) {
        var startY = this.currentYPosition();
        var stopY = this.elmYPosition(eID) - 30;
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    getSectionsOffset() {
        this.aSections.forEach(
            (item) => {
                let cumulative = this.cumulativeOffset(item);
                this.offsets['#' + item.id] = cumulative;
            }
        )
    }

    cumulativeOffset(element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while (element);
        return top;
    };

    changeActiveMenuItem () {
        // Calcular en qué sección está el scroll
        let desplazamiento = 10
        let pageOffset = window.pageYOffset + Math.max(100, window.innerHeight / desplazamiento)
        let menuItem = 0
        if (pageOffset >=  this.offsets['#home'] && pageOffset < this.offsets['#who-am-i']) {
            menuItem = 0
        } else if (pageOffset >= this.offsets['#who-am-i'] && pageOffset < this.offsets['#academic-background']) {
             menuItem = 1
        } else if (pageOffset >= this.offsets['#academic-background'] && pageOffset < this.offsets['#job-experience']) {
            menuItem = 2
        } else if (pageOffset >= this.offsets['#job-experience'] && pageOffset < this.offsets['#about-me']) {
            menuItem = 3
        } else if (pageOffset >= this.offsets['#about-me'] && pageOffset < this.offsets['#contact']) {
            menuItem = 4
        } else {
            menuItem = 5
        }
        // Desactivar todas las secciones del menú y activar sólo en la que está el scroll
        this.aNavLinks.forEach(
            (item) => item.classList.remove('active')
        )
        this.aNavLinks[menuItem].classList.add('active')
    }

    desplegaMenu(){
        this.oNavMenu.classList.toggle('desplegado');
    }
}