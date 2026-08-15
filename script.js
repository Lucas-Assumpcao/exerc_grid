import { usuarios, todosUsuarios, contatos, mensagens } from "./contatos.js";


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