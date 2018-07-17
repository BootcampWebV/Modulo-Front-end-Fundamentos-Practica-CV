export class FormContact {
    constructor() {
        this.oInputName = document.querySelector('#name');
        this.oInputEmail = document.querySelector('#email');
        this.oSelectFuente = document.querySelector('#fuente');
        this.oLiOtros = document.querySelector('#li-otros');
        this.oInputOtros = document.querySelector('#otros');
        this.oInputTel = document.querySelector('#phone-number');
        this.oTextMessage = document.querySelector('#message');
        this.oFormContact = document.querySelector('#form-contact');
        
        this.oFormData = {
            name: '',
            email: '',
            fuente: '',
            otros: '',
            phone: '',
            message: ''
        }

}

    defineEventListeners(){
        this.oFormContact.addEventListener('submit', this.validateContactForm.bind(this));
    }

    validateContactForm(oe) {
        oe.preventDefault();
        // Validar Nombre
        if (!this.oInputName.checkValidity()) {
            this.currentFocus = this.oInputName;
            return;
        }
        // Validar email
        if (!this.oInputEmail.checkValidity()) {
            this.currentFocus = this.oInputEmail;
            return;
        }
        // Validar Número
        if (!this.oInputTel.checkValidity()) {
            this.currentFocus = this.oInputTel;
            return;
        }
        // Validar número de palabras del mensaje
        const countedWords = this.oTextMessage.value.trim().split(' ').length;
        if (countedWords > 150 ) {
            this.oTextMessage.validity = false;
            this.oTextMessage.setCustomValidity('El mensaje no puede contener mas de 150 palabras');
            this.oTextMessage.checkValidity();

            this.currentFocus = this.oTextMessage
            return;
        }
        // El formulario es válido y se puede enviar
        alert('el formulario es valido');
        this.guardarDatos();
    }

    guardarDatos() {
        this.oFormData = {
            name: this.oInputName.value,
            email: this.oInputEmail.value,
            fuente: this.oSelectFuente.options[this.oSelectFuente.selectedIndex].value,
            otros: this.oInputOtros.value,
            phone: this.oInputTel.value,
            message: this.oTextMessage.value
        }
        console.dir(this.oFormData);
    }
}