import { FormContact } from "./formcontact.js";
import { Navigation } from "./navigation.js";

export class Main {

    constructor(){
        
        //instancio clases desde modulos
        this.oFormContact = new FormContact();
        this.oNavigation = new Navigation();
        
        //establezco manejadores de eventos de las clases
        this.oFormContact.defineEventListeners();
        this.oNavigation.defineEventListeners();

    }

}