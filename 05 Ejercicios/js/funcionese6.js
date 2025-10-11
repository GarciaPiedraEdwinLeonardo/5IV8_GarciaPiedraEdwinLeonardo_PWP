function calcularEdad(){

    var fechaNacimientoInput = document.getElementById("fecha");
    var fechaNacimiento = new Date(fechaNacimientoInput.value);
    var hoy = new Date();

    if(!fechaNacimientoInput.value){
        alert("Ingrese una fecha");
        return;
    }

    if(fechaNacimiento > hoy){
        alert("No puede ingresar una fecha futura, intente de nuevo");
        return;
    }

    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var mes = hoy.getMonth() - fechaNacimiento.getMonth();
    var dia = hoy.getDate() - fechaNacimiento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    document.getElementById("edad").value = edad + " años de edad";

}

function clean(){
    document.getElementById("fecha").value="";
    document.getElementById("edad").value="";
}