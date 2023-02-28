export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
       input.parentElement.classList.remove("input-container--invalid");
       input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacío."
    },
    email: {
        valueMissing: "El campo Email no puede estar vacío.",
        typeMismatch: "El formato de la dirección de correo no es válido."
    },
    password: {
        valueMissing: "El campo Contraseña no puede estar vacío.",
        patternMismatch: "Entre 6 y 12 caracteres, al menos 1 minúscula y 1 mayúscula. Sin caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo Fecha de Nacimiento no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero: {
        valueMissing: "El número telefónico no puede estar vacío.",
        patternMismatch: "El número telefónico debe ser de 10 dígitos."
    },
    direccion: {
        valueMissing: "El campo Dirección no puede estar vacío.",
        patternMismatch: "La dirección debe contener entre 2 y 40 caracteres."
    },
    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacío.",
        patternMismatch: "El nombre de la ciudad debe contener entre 2 y 40 caracteres."
    },
    provincia: {
        valueMissing: "El campo Provincia no puede estar vacío.",
        patternMismatch: "El nombre de la provincia debe contener entre 2 y 40 caracteres."
    }

};

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })


    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad.";
    }
    

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    
    return diferenciaFechas <= fechaActual;
}