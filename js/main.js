import { FormContact } from "./formcontact.js";
import { Navigation } from "./navigation.js";

export class Main {

    constructor(){
        
        this.oFormContact = new FormContact().defineEventListeners();

        this.oNavigation = new Navigation().defineEventListeners();
        

    }

}