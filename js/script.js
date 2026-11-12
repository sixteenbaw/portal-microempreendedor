/* NEXO DIGITAL — interações da página */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".site-navbar");
  const form = document.getElementById("formContato");
  const successMessage = document.getElementById("mensagemSucesso");
  const nameConfirmation = document.getElementById("nomeConfirmacao");
  const yearElement = document.getElementById("anoAtual");
  const menu = document.getElementById("menuPrincipal");

  // Atualiza o ano automaticamente no rodapé.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Adiciona uma sombra discreta à navbar depois que a página rola.
  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 24);
    }
  }
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Fecha o menu mobile depois que um link interno é selecionado.
  if (menu && window.bootstrap) {
    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (menu.classList.contains("show")) {
          const collapse = bootstrap.Collapse.getOrCreateInstance(menu);
          collapse.hide();
        }
      });
    });
  }

  // Validação demonstrativa: não há envio para servidor.
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        successMessage.classList.add("d-none");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const name = document.getElementById("nome").value.trim();
      nameConfirmation.textContent = name;
      successMessage.classList.remove("d-none");
      successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Limpa os campos após a confirmação, mantendo a mensagem visível.
      form.reset();
      form.classList.remove("was-validated");
    });
  }
});
