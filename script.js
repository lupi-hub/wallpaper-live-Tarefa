let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${tarefa.concluida ? 'concluida' : ''}">
                ${tarefa.texto}
            </span>

            <button onclick="alternar(${index})">
                ✓
            </button>

            <button onclick="remover(${index})">
                X
            </button>
        `;

        lista.appendChild(li);
    });
}

function adicionarTarefa() {
    const input = document.getElementById("tarefaInput");

    if (input.value.trim() === "") return;

    tarefas.push({
        texto: input.value,
        concluida: false
    });

    input.value = "";

    salvar();
    renderizar();
}

function alternar(index) {
    tarefas[index].concluida = !tarefas[index].concluida;

    salvar();
    renderizar();
}

function remover(index) {
    tarefas.splice(index, 1);

    salvar();
    renderizar();
}

renderizar();
console.log("script rodou");