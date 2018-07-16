export class Main {
    constructor () {
        // Elementos del DOM
        
        this.aMenu = document.querySelectorAll("nav.nav-menu a");
        this.aSections = document.querySelectorAll('section');
        this.oOffsets = [];
    }

    defineEventListeners() {
        window.addEventListener('scroll', this.offsetChangeStyle.bind(this));

        this.prepararNavegacion();
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
        } else {
            menuItem = 4;
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
}