const inputTarefa = document.querySelector("#tarefa");
const botaoAdicionar = document.querySelector(".botaoAdicionar");
const listaTarefas = document.querySelector(".listaTarefas");

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

botaoAdicionar.addEventListener("click", function () {
    const novaTarefa = {
        texto: inputTarefa.value,
        concluida: false
    };

    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    mostrarTarefaNaTela(novaTarefa);
    inputTarefa.value = '';
});

window.onload = function () {
    if (tarefas) {
        tarefas.forEach(tarefa => {
            // 1. Mostra a tarefa na tela
            mostrarTarefaNaTela(tarefa);

            // 2. Encontra o último <li> que foi adicionado na lista
            const ultimoItemDaLista = listaTarefas.lastElementChild;

            // 3. Verifica se a tarefa está concluída
            if (tarefa.concluida) {
                // Se estiver, adiciona a classe CSS
                ultimoItemDaLista.classList.add("tarefa-concluida");
            }
        });
    }
};


// A função completa, com a lógica de exclusão
function mostrarTarefaNaTela(tarefa) {
    const novoItem = document.createElement("li");
    novoItem.innerHTML = tarefa.texto; // Ajustamos aqui para usar o objeto

    // Adiciona o "ouvinte" de clique para marcar como concluída
    novoItem.addEventListener("click", function () {
        novoItem.classList.toggle("tarefa-concluida"); // Adiciona ou remove a classe

        // Atualiza o status de concluído no nosso array
        tarefa.concluida = !tarefa.concluida;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });

    // Cria o botão de exclusão 
    const botaoExcluir = document.createElement("button");
    botaoExcluir.innerHTML = "X";
    botaoExcluir.classList.add("botao-excluir");

    // Adiciona o "ouvinte" de clique ao botão
    botaoExcluir.addEventListener("click", function () {
        // Encontra a posição da tarefa no nosso array "tarefas"
        const index = tarefas.indexOf(tarefa);

        // Remove a tarefa do array
        if (index > -1) {
            tarefas.splice(index, 1);
        }

        // Atualiza o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Remove o elemento <li> da tela
        novoItem.remove();
    });


    novoItem.appendChild(botaoExcluir);
    listaTarefas.appendChild(novoItem);
}