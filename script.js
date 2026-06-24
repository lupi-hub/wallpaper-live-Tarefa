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

function mover(posicao) {
    const container = document.querySelector(".container");

    container.style.transform = "translateY(-50%)";

    if (posicao === "left") {
        container.style.left = "2.5%";
    }

    if (posicao === "center") {
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
    }

    if (posicao === "right") {
        container.style.left = "65%";
    }
}
renderizar();
function atualizarProgresso() {
    const concluidas = tarefas.filter(t => t.concluida).length;
    const total = tarefas.length;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    document.getElementById("textoProgresso").textContent =
        porcentagem + "% concluído";
}