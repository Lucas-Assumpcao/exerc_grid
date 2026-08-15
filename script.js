import { usuarios, todosUsuarios, contatos, mensagens } from "./contatos.js";

todosUsuarios()
contatos()
mensagens()

const elemento = {
    form_send_message: document.querySelector("#form-send-msg"),
    input_send_message: document.querySelector("#input-send-msg"),
    grid_container: document.querySelector(".grid-msg"),
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
