export class Main {
    constructor () {
        // Elementos del DOM
        
        this.aMenu = document.querySelectorAll("nav.nav-menu a");
        this.aSections = document.querySelectorAll('section');
        this.oOffsets = [];
    }

    defineEventListeners() {
        
        this.prepararNavegacion();
        window.addEventListener('scroll', this.offsetChangeStyle.bind(this));

       document.querySelector('.link-to-h').addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScroll('home');
        });
        document.querySelector('.link-to-wai').addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScroll('who-am-i');
        });
        document.querySelector('.link-to-ab').addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScroll('academic-background');
        });
        document.querySelector('.link-to-je').addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScroll('job-experience');
        });
        document.querySelector('.link-to-am').addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScroll('about-me');
        });
        document.querySelector('.link-to-c').addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScroll('contact');
        });
        
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
                this.oOffsets['#'+item.id] = cumulative;
                console.log(cumulative);
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


}