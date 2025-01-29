// Capturando elementos
const inputNovaTarefa = document.querySelector(".input-nova-tarefa"); 
const btnAddTarefa = document.querySelector(".btn-add-tarefa"); 
const tarefas = document.querySelector(".tarefas");

// Criando li
const criarLi = () => {
    const li = document.createElement('li');
    return li;
}

// Criando o botão de apagar
const criarBotaoApagar = (li) => {
    li.innerHTML += ' '; // espaço
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'btnApagar'); // adicionando classes
    botaoApagar.setAttribute('title', 'Apagar essa tarefa'); // adicionando titulo
    botaoApagar.innerHTML = 'X'; 
    li.appendChild(botaoApagar);
}

// Criando o checkbox
const criarCheckbox = (span) => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('class', 'marcar');
    input.setAttribute('title', 'Marcar como concluído');
    span.appendChild(input);
}

// Limpando input
const limparInput = () => {
    inputNovaTarefa.value = '';
    inputNovaTarefa.focus(); 
}

// Criando tarefa
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

// Evento que captura valor digitado no input
btnAddTarefa.addEventListener('click', () => { 
    if(!inputNovaTarefa.value) return; 
    criarTarefa(inputNovaTarefa.value);
})

// Evento que captura valor digitado no input a partir da tecla enter
inputNovaTarefa.addEventListener('keypress', (e) => { 
   if(e.keyCode === 13){
    if(!inputNovaTarefa.value) return;
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

// Evento de clique que risca ou remove o risco do texto ao marcar/desmarcar
document.addEventListener('click', (e) => {
    const el = e.target;

    // Verifica se o clique foi em um checkbox
    if(el.type === 'checkbox') {
        const span = el.parentElement; // Pega o span (o texto da tarefa)

        // Verifica se o checkbox foi marcado ou desmarcado
        if(el.checked) {
            span.style.textDecoration = 'line-through'; // Risca o texto
        } else {
            span.style.textDecoration = 'none'; // Remove o risco
        }

        salvarTarefasConcluidas(); // Salva as tarefas concluídas no localStorage
    }
});

// Função para salvar tarefas no localStorage
const salvarTarefas = () => {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    liTarefas.forEach(tarefa => {
        const texto = tarefa.querySelector('.span').textContent.trim(); // Pega o texto da tarefa
        const checkbox = tarefa.querySelector('.marcar'); // Pega o checkbox

        listaDeTarefas.push({
            texto: texto,
            concluida: checkbox.checked // Salva o estado do checkbox
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
};

// Função para restaurar tarefas salvas
const adicionaTarefasSalvas = () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasSalvas.forEach(tarefa => {
        criarTarefa(tarefa.texto); // Cria a tarefa
        const li = tarefas.querySelector('li:last-child'); // Pega o último elemento li

        // Marca o checkbox se a tarefa for concluída
        const checkbox = li.querySelector('.marcar');
        if(tarefa.concluida) {
            checkbox.checked = true;
            li.querySelector('.span').style.textDecoration = 'line-through'; // Aplica o risco no texto
        }
    });
};

// Função para salvar as tarefas concluídas
const salvarTarefasConcluidas = () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const tarefasConcluidas = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            tarefasConcluidas.push(index); // Armazena o índice das tarefas concluídas
        }
    });

    localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefasConcluidas)); // Salva no localStorage
};

// Função para restaurar as tarefas concluídas
const restaurarTarefasConcluidas = () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const tarefasConcluidas = JSON.parse(localStorage.getItem('tarefasConcluidas') || '[]');

    tarefasConcluidas.forEach(index => {
        const checkbox = checkboxes[index];
        if(checkbox) {
            checkbox.checked = true; // Marca o checkbox
            checkbox.parentElement.style.textDecoration = 'line-through'; // Risca o texto
        }
    });
};

// Chama a função para restaurar tarefas concluídas assim que a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    adicionaTarefasSalvas();
    restaurarTarefasConcluidas(); // Restaura as tarefas concluídas
});
