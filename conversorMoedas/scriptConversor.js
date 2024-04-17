


const valoresConversao = {
    real: {
        euro: 0.19,
        dolar: 0.20,
        simbolo: "R$"
    },
    dolar: {
        real: 4.99,
        euro: 0.92,
        simbolo: "US$"
    },
    euro: {
        real: 5.40,
        dolar: 1.08,
        simbolo: "EU"
    }

}

const botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

const botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

const botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);


const botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem")
botaoAceitaMensagem.addEventListener("click", aceitarMensagem);


console.log(localStorage.getItem("aceitouCookie"));


if(localStorage.getItem("aceitouCookie") == "1"){
    console.log("usuario ja aceitou os termos, não vou mais mostrar.")
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");
}

function aceitarMensagem(){
    alert("Usuário aceitou os termos! ");
    const divMensagemUsuario = document.getElementById ("mensagem-usuario")
    divMensagemUsuario.classList.add("oculto");
}


localStorage.setItem("aceitouCookie", "1");

let valorUsuario = document.getElementById("valorEntrada");
valorUsuario.addEventListener("keypress", function(event){

console.log(event);

if(event.ctrlKey == true && event.key == "L"){
    event.preventDefault();
    limpar();
}

if(event.ctrlKey == true && event.code == "KeyI"){
    inverter();

}

if(event.ctrlKey == true && event.code == "KeyL"){

    event.preventDefault();
    limpar();
}

if(event.key == "Enter"){
    event.preventDefault();
    converter();
}
});








function converter(){
    let historicoRecuperado = recuperaHistorico();


    let valorUsuario = document.getElementById("valorEntrada").value;




    if (valorUsuario <= 0 || valorUsuario == "")   {
        alert("Verificar valor! ");
        return;
    }

    if (valorUsuario == "") {
        alert("Por favor, preencha com um valor! ");
        return;
    }


    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    if (moeda1 == moeda2) {
        alert ("As moedas são iguais!!")
        return;
    }
    



    let simbolo = valoresConversao[moeda2]["simbolo"];
    //console.log(simbolo)
    

    let resultado = valorUsuario * valoresConversao[moeda1][moeda2];

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + "  " + resultado.toFixed(2);


    let objetoResultado = {
        valorDoUsuario: valorUsuario,
        valorMoeda1: moeda1,
        valorMoeda2: moeda2,
        valorResultado: resultado
    }
    
    console.log (objetoResultado);
    
    
    let objetoResultadoJSON = JSON.stringify(objetoResultado);
    //console.log(objetoResultadoJSON);
    
    salvarHistorico (objetoResultadoJSON);
    //localStorage.setItem("historico", objetoResultadoJSON);
    
    //localStorage.setItem("historico", objetoResultado);


}


function recuperaHistorico (){
    let historico = localStorage.getItem("historico");

    if(!historico){
        return[];
        
    }

    let historicoObjetvo = JSON.parse(historico);

    return historicoObjetvo;

    // vá até o localstorage e recupere (get) o valor da chave "historico"
    // localstorage salva STRING
    // quero retornar um OBJETO JAVASCRIPT
}

function salvarHistorico(conversao){
    let historico = recuperaHistorico();

    
    historico.push(conversao);
    historico = JSON.stringify(historico);
    localStorage.setItem("historico", historico);


}

function salvarResultadoNoLocalStorage(resultado){
    
}




function limpar(){

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = " ";

    let valorEntrada = document.getElementById("valorEntrada");
    valorEntrada.value = " ";

}





function inverter(){
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2;
    document.getElementById("moeda2").value = valorMoeda1;
}

