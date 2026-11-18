
let tamanhoSim = 1;
let cliquesNao = 0;

// Número que receberá a mensagem no WhatsApp
const numeroWhatsApp = "5543999612169";


// BOTÃO NÃO
function recusar() {

    cliquesNao++;

    tamanhoSim += 0.25;

    document.getElementById("botaoSim").style.transform =
        `scale(${tamanhoSim})`;

    // Explode depois de 4 cliques
    if (cliquesNao >= 4) {

        const botaoNao = document.getElementById("botaoNao");

        botaoNao.classList.add("explodir");

        setTimeout(() => {
            botaoNao.style.display = "none";
        }, 500);
    }
}


// BOTÃO SIM
function aceitar() {

    document.getElementById("telaInicial").classList.add("escondida");

    document.getElementById("telaCalendario").classList.remove("escondida");
}


// ATIVA OU DESATIVA O CAMPO DE OUTRA IDEIA
document.querySelectorAll('input[name="ideias"]').forEach(opcao => {

    opcao.addEventListener("change", () => {

        const outraOpcao = document.getElementById("outraOpcao");
        const campo = document.getElementById("ideiaPersonalizada");

        if (outraOpcao.checked) {

            campo.disabled = false;
            campo.focus();

        } else {

            campo.disabled = true;
            campo.value = "";

        }

    });

});


// CONFIRMAR DATA E OPÇÃO
function confirmarData() {

    const data = document.getElementById("dataEscolhida").value;

    if (!data) {
        alert("Escolha uma data primeiro! ❤️");
        return;
    }

    // Pega somente a opção selecionada
    const opcaoSelecionada = document.querySelector(
        'input[name="ideias"]:checked'
    );

    if (!opcaoSelecionada) {
        alert("Escolha uma opção de date! 💗");
        return;
    }

    let ideiaEscolhida = opcaoSelecionada.value;

    // Verifica se escolheu outra ideia
    if (opcaoSelecionada.id === "outraOpcao") {

        const personalizada = document
            .getElementById("ideiaPersonalizada")
            .value.trim();

        if (!personalizada) {
            alert("Escreva qual seria sua outra ideia! ❤️");
            return;
        }

        ideiaEscolhida = personalizada + " ❤️";
    }

    // Formata a data
    const dataFormatada = new Date(data + "T12:00:00")
        .toLocaleDateString("pt-BR");

    // Exibe a tela final
    document.getElementById("telaCalendario").classList.add("escondida");

    document.getElementById("telaFinal").classList.remove("escondida");

    document.getElementById("dataFinal").textContent = dataFormatada;

    document.getElementById("ideiasFinais").textContent = ideiaEscolhida;

    // Cria a mensagem do WhatsApp
    const mensagem =
        `Oi! ❤️ Escolhi a data ${dataFormatada} para nosso date!\n\n` +
        `A ideia que escolhi foi: ${ideiaEscolhida}.\n\n` +
        `Estou ansiosa(o) para esse encontro! 🥰`;

    const link =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    document.getElementById("linkWhatsApp").href = link;

    // Abre o WhatsApp
    window.open(link, "_blank");

}
