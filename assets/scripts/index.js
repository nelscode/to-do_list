// Capturando elementos
const inputNovaTarefa = document.querySelector(".input-nova-tarefa"); 
const btnAddTarefa = document.querySelector(".btn-add-tarefa"); 
const tarefas = document.querySelector(".tarefas");
const grupo = document.querySelector(".grupo-entrada");

// Criando li
const criarLi = () => {
    const li = document.createElement('li');
    return li;
}

// Botão que apaga os elementos
const criarBotaoApagar = (li) => {
    li.innerHTML += ' '; // espaço
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'btnApagar'); // adicionando classes
    botaoApagar.setAttribute('title', 'Apagar essa tarefa'); // adicionando titulo
    botaoApagar.innerHTML = 'X'; 
    li.appendChild(botaoApagar);
}

// Botão para marcar tarefas concluídas
const criarCheckbox = (span) => {
    const input = document.createElement('input');
    input.type = 'checkbox'
    input.setAttribute('class', 'marcar');
    input.setAttribute('title', 'Marcar como concluído');
    span.appendChild(input);
}

// Limpando input
const limparInput = () => {
    inputNovaTarefa.value = '';
    inputNovaTarefa.focus(); 
}

// criando tarefa
const criarTarefa = (valorInput) => {
    const li = criarLi();
    const span = document.createElement('span'); 
    span.setAttribute('class', 'span');

    criarCheckbox(span); 
    span.appendChild(document.createTextNode(` ${valorInput}`)); // adicionando espaço entre o input e o texto
    li.appendChild(span); 

    criarBotaoApagar(li);
    tarefas.appendChild(li);
    limparInput(); 
    salvarTarefas(); 
};

// evento que captura valor digitado no input
btnAddTarefa.addEventListener('click', () => { 
    if(!inputNovaTarefa.value) return; 
    criarTarefa(inputNovaTarefa.value);
})

// eventp qie captura o valor digitado no input a partir da tecla enter
inputNovaTarefa.addEventListener('keypress', (e) => { 
   if(e.keyCode === 13){
    criarTarefa(inputNovaTarefa.value);
   }
   
})

// Evento que remove o pai do elemento botaoApagar (junto com ele mesmo)
document.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('btnApagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
})

// Evento de clique que risca a tarefa feita
document.addEventListener('click', (e) => {
    const el = e.target;
    if(el.checked){
        el.parentElement.style.textDecoration = 'line-through';
    } else { // se não tiver marcado ele tira o riscado
        el.parentElement.style.textDecoration = 'none';
    }
})

const salvarTarefas = () => {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText; 
        tarefaTexto = tarefaTexto.replace('X', '').trim(); 
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); 
    localStorage.setItem('tarefas', tarefasJSON);
}

const adicionaTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criarTarefa(tarefa);
    }
}

adicionaTarefasSalvas();