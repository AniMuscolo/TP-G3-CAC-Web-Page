// validacion del formulario de contacto

    const contacto=document.getElementById("contacto-form");
    const nombre=document.getElementById("nombre");
    const snombre=document.getElementById("snombre");
    const apellido=document.getElementById("apellido");
    const sapellido=document.getElementById("sapellido");
    const edad=document.getElementById("edad");
    const sedad=document.getElementById("sedad");
    const email=document.getElementById("email");
    const semail=document.getElementById("semail");
    const telefono=document.getElementById("telefono");
    const stelefono=document.getElementById("stelefono");
    const mensaje=document.getElementById("mensaje");
    const smensaje=document.getElementById("smensaje");
    const parrafo=document.getElementById("error");
    contacto.addEventListener("submit",e=>{
    e.preventDefault();
        let valor1=false;
        let valor2=false;
        let valor3=false;
        let valor4=false;
        let valor5=false;
        let valor6=false;
        parrafo.innerHTML="";
        let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
        if(nombre.value.length<3||typeof nombre.value!=="string"){
        
            valor1=true;
            snombre.classList.add("invalido");
        }
        if(apellido.value.length<3||typeof apellido.value!=="string"){
       
            valor2=true;
            sapellido.classList.add("invalido");
        }
        if(edad.value<18||edad.value>110){
           
            valor3=true;
            sedad.classList.add("invalido");
        }
            
        if(!regexEmail.test(email.value)){
          
            valor4=true;
            semail.classList.add("invalido");
        }
    
        if(!telefono.value.match(phoneno)){
            
            valor5=true;
            stelefono.classList.add("invalido");
        }
        if(mensaje.value.trim().length>600){
           
            valor5=true;
            smensaje.classList.add("invalido");
        }
        
        if(valor1||valor2||valor3||valor4||valor5||valor6){
            parrafo.innerHTML="Hay algún error";
        }else{
            parrafo.innerHTML="Enviado";
            contacto.reset();
        }
    })
    
    