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

renderizarListaContatos();
renderizarConversa(contatoAtivo); // abre a Ana (índice 0) por padrão

const navAvatar = document.querySelector("#nav-avatar");
const secaoChat = document.querySelector(".chat-sidebar");   // lista de contatos
const secaoPerfil = document.querySelector(".perfil-screen");
const chatMain = document.querySelector(".chat-main");

navAvatar.addEventListener("click", () => {
    secaoChat.classList.toggle("hidden");
    chatMain.classList.toggle("hidden");
    secaoPerfil.classList.toggle("hidden");
});