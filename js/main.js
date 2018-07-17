export class Main {
    constructor () {
        
        // objetos del menu de navegacion y array con las cordenadas "y" de cada section
        this.aMenu = document.querySelectorAll("nav.nav-menu a");
        this.aSections = document.querySelectorAll('section');
        this.oOffsets = [];

        // objetos de formulario
        this.oFormContact = document.querySelector('#form-contact');
        this.oInputName = document.querySelector('#name');
        this.oInputEmail = document.querySelector('#email');
        this.oSelectFuente = document.querySelector('#fuente');
        this.oLiOtros = document.querySelector('#li-otros');
        this.oInputOtros = document.querySelector('#otros');
        this.oInputTel = document.querySelector('#phone-number');
        this.oTextMessage = document.querySelector('#message');
        this.oMenuIcon = document.querySelector('#nav-icon');
        this.oNavMenu = document.querySelector('#nav-menu');
    }

    defineEventListeners() {
        
        // establece array oOffsets con los valores de las coordenadas "y" de cada section
        this.prepararNavegacion();
        
        // "scroll spy"
        window.addEventListener('scroll', this.offsetChangeStyle.bind(this));

        // "smooth scroll" para los pares enlaces menú /destinos section
        this.aMenu.forEach( item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                this.smoothScroll(e.currentTarget.getAttribute('data-link-to'));
            })
        });

        // eventos de formulario
        this.oSelectFuente.addEventListener('change', this.toggleOtros.bind(this));

        // desplegar nav-icon
        this.oMenuIcon.addEventListener('click', this.toggleMenu.bind(this));
    }

    offsetChangeStyle() {
        let pageOffset = window.pageYOffset;
        let menuItem = 0;
        if (pageOffset >=  this.oOffsets['#home'] && pageOffset < this.oOffsets['#who-am-i']) {
            menuItem = 0;
        } else if (pageOffset >= this.oOffsets['#who-am-i'] && pageOffset < this.oOffsets['#academic-background']) {
             menuItem = 1;
        } else if (pageOffset >= this.oOffsets['#academic-background'] && pageOffset < this.oOffsets['#job-experience']) {
            menuItem = 2;
        } else if (pageOffset >= this.oOffsets['#job-experience'] && pageOffset < this.oOffsets['#about-me']) {
            menuItem = 3;
        } else if (pageOffset >= this.oOffsets['#about-me'] && pageOffset < this.oOffsets['#contact']) {
            menuItem = 4;
        } else {
            menuItem = 5;
        }

        this.aMenu.forEach(
            (item) => item.classList.remove('active')
        )
        this.aMenu[menuItem].classList.add('active')
    }

    prepararNavegacion() {
        this.aSections.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.oOffsets['#'+item.id] = cumulative - 10;
            }
        )
    }

    cumulativeOffset (element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
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
        var stopY = this.elmYPosition(eID);
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
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    toggleOtros() {
        if (this.oSelectFuente.value == 'otros') {
            this.oLiOtros.classList.remove('hidden');
            this.oInputOtros.focus();
        }
        else {
            this.oLiOtros.classList.add('hidden');
        }
    }

    toggleMenu() {
        this.oNavMenu.classList.toggle('desplegado');
        this.oNavMenu.classList.toggle('nav-menu');
        this.oNavMenu.classList.toggle('box-shadow-2');
    }

}