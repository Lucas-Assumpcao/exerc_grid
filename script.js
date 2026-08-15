import { usuarios, todosUsuarios, contatos, mensagens } from "./contatos.js";
let usuarioAtivo = 0;   // índice do usuário logado (0 = Ricardo)
let contatoAtivo = 0;   // índice do contato/conversa aberta

const elemento = {
    form_send_message: document.querySelector("#form-send-msg"),
    input_send_message: document.querySelector("#input-send-msg"),
    grid_container: document.querySelector(".chat-messages"),
};

elemento.form_send_message.addEventListener("submit", (e) => {
    e.preventDefault();
    insertMessage(elemento.input_send_message.value);

});

function getHour(){
    const data = new Date().toLocaleString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return data;
}

function insertMessage(message) {
    const article = document.createElement("article");
    const paragrafo = document.createElement("p");
    const span = document.createElement("span");

   article.classList.add("message", "sent");

    paragrafo.innerText = message;
    span.classList.add("hour");
    span.innerText = `${getHour()}`;

    article.append(paragrafo,span);

    elemento.grid_container.append(article);
    elemento.grid_container.scrollTop = elemento.grid_container.scrollHeight;
    elemento.input_send_message.value = "";

    }

    function renderizarListaContatos() {
    const contatos = usuarios["whats-users"][usuarioAtivo].contacts;
    const chatList = document.querySelector(".chat-list");

    chatList.innerHTML = ""; // limpa antes de redesenhar

    contatos.forEach((contato, index) => {
        const ultimaMensagem = contato.messages[contato.messages.length - 1];

        const article = document.createElement("article");
        article.classList.add("chat-card");
        article.dataset.index = index; // vamos usar isso no Passo 5 (clique)

        article.innerHTML = `
            <img class="avatar" src="https://i.pravatar.cc/150?u=${contato.number}" alt="Contato ${contato.name}">
            <div class="chat-content">
                <div class="chat-header">
                    <h2>${contato.name}</h2>
                    <span>${ultimaMensagem.time}</span>
                </div>
                <div class="chat-footer">
                    <p>${ultimaMensagem.content}</p>
                </div>
            </div>
        `;

        chatList.append(article);
    });
}

    function renderizarConversa(indice) {
    const contato = usuarios["whats-users"][usuarioAtivo].contacts[indice];
    contatoAtivo = indice;

    // Atualiza o topo (.chat-topbar)
    const topbarAvatar = document.querySelector(".chat-topbar .avatar");
    const topbarNome = document.querySelector(".chat-topbar h2");
    const topbarStatus = document.querySelector(".chat-topbar p");

    topbarAvatar.src = `https://i.pravatar.cc/150?u=${contato.number}`;
    topbarAvatar.alt = contato.name;
    topbarNome.innerText = contato.name;
    topbarStatus.innerText = contato.description; // ex: "Frontend Developer"

    // Atualiza as mensagens (.chat-messages)
    const chatMessages = document.querySelector(".chat-messages");
    chatMessages.innerHTML = "";

    contato.messages.forEach((msg) => {
        const div = document.createElement("div");
        div.classList.add("message", msg.sender === "me" ? "sent" : "received");
        div.innerText = msg.content;
        chatMessages.append(div);
    });

    elemento.grid_container.scrollTop = elemento.grid_container.scrollHeight;
}

document.querySelector(".chat-list").addEventListener("click", (e) => {
    const card = e.target.closest(".chat-card");
    if (!card) return;

    renderizarConversa(Number(card.dataset.index));
});

const navAvatar = document.querySelector("#nav-avatar");
const secaoChat = document.querySelector(".chat-sidebar");   // lista de contatos
const secaoPerfil = document.querySelector(".perfil-screen");
const chatMain = document.querySelector(".chat-main");

function renderizarPerfil() {
    const usuario = usuarios["whats-users"][usuarioAtivo];

    document.querySelector("#perfil-avatar").src = `https://i.pravatar.cc/300?u=${usuario.number}`;
    document.querySelector("#perfil-nome").innerText = usuario.account;
    document.querySelector("#perfil-telefone").innerText = formatarTelefone(usuario.number);
}

navAvatar.addEventListener("click", () => {
    secaoChat.classList.toggle("hidden");
    chatMain.classList.toggle("hidden");
    secaoPerfil.classList.toggle("hidden");

    renderizarPerfil();
});

function formatarTelefone(numero) {
    // ex: "11987876567" -> "+55 11 98787-6567"
    const ddd = numero.slice(0, 2);
    const parte1 = numero.slice(2, 7);
    const parte2 = numero.slice(7);
    return `+55 ${ddd} ${parte1}-${parte2}`;
}

function renderizarTrocaPerfil() {
    const listaUsuarios = usuarios["whats-users"];
    const container = document.querySelector("#trocar-perfil-lista");

    container.innerHTML = "";

    listaUsuarios.forEach((usuario, index) => {
        const div = document.createElement("div");
        div.classList.add("trocar-perfil-item");
        div.dataset.index = index;

        div.innerHTML = `
            <img src="https://i.pravatar.cc/150?u=${usuario.number}" alt="${usuario.nickname}">
            <span>${usuario.nickname}</span>
        `;

        container.append(div);
    });
}

renderizarListaContatos();
renderizarConversa(contatoAtivo);
renderizarTrocaPerfil();

document.querySelector("#trocar-perfil-lista").addEventListener("click", (e) => {
    const item = e.target.closest(".trocar-perfil-item");
    if (!item) return;

    usuarioAtivo = Number(item.dataset.index);
    contatoAtivo = 0; // reseta pra primeira conversa do novo usuário

    renderizarPerfil();
    renderizarListaContatos();
    renderizarConversa(contatoAtivo);
});

const btnDarkMode = document.querySelector(".container-nav img[alt='WhatsApp Logo']"); // ver nota abaixo

btnDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});