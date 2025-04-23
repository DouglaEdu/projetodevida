const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {

        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }

        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    }
}

const contadores = document.querySelectorAll(".contador");
const tempoObjetivo1 = new Date("2666-66-66T66:66:66");
const tempoObjetivo2 = new Date("2666-66-66T66:66:66");
const tempoObjetivo3 = new Date("2666-66-66T66:66:66");
const tempoObjetivo4 = new Date("2666-66-66T66:66:66");

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];


function calculaTempo(tempoObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    if (tempoFinal > 0) {
        return [dias, horas, minutos, segundos];
    } else {
        return [125,20, 47, 67];
    }
}

function atualizaCronometro() {
    for (let i = 0; i < contadores.length; i++) {
        document.getElementById("dias" + i).textContent = calculaTempo(tempos[i])[0];
        document.getElementById("horas" + i).textContent = calculaTempo(tempos[i])[1];
        document.getElementById("min" + i).textContent = calculaTempo(tempos[i])[2];
        document.getElementById("seg" + i).textContent = calculaTempo(tempos[i])[3];
    }
}

function comecaCronometro() {
    atualizaCronometro();
    setInterval(atualizaCronometro, 1000);
}

comecaCronometro();


//Seleção dos botões
const btnLigar = document.querySelector('#btnLigar');
const btnPausar = document.querySelector('#btnPausar');
const btnResetar = document.querySelector('#btnResetar');

//Seleção do parágrafo de exibição do cronômetro
const cronometro = document.querySelector('#cronometro');

//Variáveis de controle
let decSeg = 0;
let contando;   //Variável de controle de contagem

//Variável de id
let idContagem;

//Funções de cronômetro
function mostraCronometro() {
    decSeg++;                           //incrementa cada décimo de segundo

    let ms = decSeg % 10;               //calcula os décimos de segundo
    let seg = Math.floor(decSeg / 10);  //calcula os segundos
    let min = Math.floor(seg / 60);     //calcula os minutos
    let hora = Math.floor(min / 60);    //calcula as horas

    //Formatação de exibição
    let strDecSeg = ms;
    let strHora = (hora < 10) ? '0' + hora : hora;
    let strMin = (min < 10) ? '0' + min : min;
    let strSeg = (seg < 10) ? '0' + seg : seg;

    //Exibição
    cronometro.innerHTML = `${strHora}:${strMin}:${strSeg}.${strDecSeg}`;
}

//Funções de evento
btnLigar.addEventListener('click', () => {
    if(contando===true){return;}    //Se o cronômetro já estiver contando, não faz nada
    idContagem = setInterval(mostraCronometro, 100);
    btnPausar.innerText = 'Pausar Cronômetro';
    contando = true;
});

btnPausar.addEventListener('click', () => {
    if(contando===true){
        clearInterval(idContagem);                          //Pausa o cronômetro
        btnPausar.innerText = 'Retomar Cronômetro';         //Altera o texto do botão
        contando = false;                                   //Altera a variável de controle
    }else if(contando===false){
        idContagem = setInterval(mostraCronometro, 100);    //Retoma o cronômetro
        btnPausar.innerText = 'Pausar Cronômetro';          //Altera o texto do botão
        contando = true;                                    //Altera a variável de controle
    }else{
        return;
    }
});

btnResetar.addEventListener('click', () => {
    clearInterval(idContagem);                  //Pausa o cronômetro
    cronometro.innerHTML = '00:00:00.0';        //Reseta o cronômetro
    decSeg = 0;                                 //Reseta a variável de controle
    contando = false;                           //Altera a variável de controle
});