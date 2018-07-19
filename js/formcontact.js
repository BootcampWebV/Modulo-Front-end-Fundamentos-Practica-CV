export class FormContact {

    constructor(){
        this.oFormContact = document.querySelector('#form-contact');
        this.oInputName = document.querySelector('#name');
        this.oInputEmail = document.querySelector('#email');
        this.oSelectFuente = document.querySelector('#fuente');
        this.oInputOtros = document.querySelector('#otros');
        this.oInputTel = document.querySelector('#phone-number');
        this.oTextMessage = document.querySelector('#message');

        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value ,
            fuente: this.oSelectFuente.options[this.oSelectFuente.selectedIndex].value,
            otros: this.oInputOtros.value,
            phone: this.oInputTel.value,
            message: this.oTextMessage.value
        }

        this.defineEventListeners();


        
    }

    defineEventListeners(){
        //establezco manejadores para cada cambio en los campos a validar para cada vez tecleamos en el campo
        this.oInputName.addEventListener('input', this.validaName.bind(this));
        this.oInputEmail.addEventListener('input', this.validaEmail.bind(this));
        this.oInputTel.addEventListener('input', this.validaTel.bind(this));
        this.oTextMessage.addEventListener('input', this.validaMessage.bind(this));
        
        this.oSelectFuente.addEventListener('change', this.muestraOtros.bind(this));
        
        //this.oFormContact.addEventListener('submit', this.leeFormContact.bind(this));
}

    leeFormContact(oe){
        oe.preventDefault();

        if (this.validaFormContact()) {
            this.guardarDatos();
        }
        
        console.log('el formulario no es valido');
        
    }

    guardarDatos(){
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value ,
            fuente: this.oSelectFuente.options[this.oSelectFuente.selectedIndex].value,
            otros: this.oInputOtros.value,
            phone: this.oInputTel.value,
            message: this.oTextMessage.value
        }

        this.oFormContact.submit();
    
    }

    validaName(){
        let invalidMsg = '';

        this.oInputName.setCustomValidity('');
        if (!this.oInputName.checkValidity()){
            invalidMsg = 'El nombre es obligatorio';
        }
        this.oInputName.setCustomValidity(invalidMsg);
        
    }

    validaEmail(){
        let invalidMsg = '';
        
        this.oInputEmail.setCustomValidity(invalidMsg);
        if (!this.oInputEmail.checkValidity()){
            invalidMsg = 'El formato de Email no es vallido';
        }
        this.oInputEmail.setCustomValidity(invalidMsg);
    }

    validaTel(){
        let invalidMsg = '';
        
        this.oInputTel.setCustomValidity(invalidMsg);
        if (!this.oInputTel.checkValidity()){
            invalidMsg = 'El formato de número de teléfono no es correcto';

        this.oInputTel.setCustomValidity(invalidMsg);
        }
    }

    validaMessage(){
        let invalidMsg = '';
        
        this.oTextMessage.setCustomValidity(invalidMsg);
        
        if (this.oTextMessage.value.trim().split(' ').length  > 150 ){
            invalidMsg = 'El mensaje no puede contener mas de 150 palabras';

        this.oTextMessage.setCustomValidity(invalidMsg);
        }
    }

    muestraOtros(){
        if (this.oSelectFuente.options[this.oSelectFuente.selectedIndex].value == 'otros') {
            this.oInputOtros.parentElement.classList.remove('hidden');
        } else {
            this.oInputOtros.parentElement.classList.add('hidden');
        }
    }
}

