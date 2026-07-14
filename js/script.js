const botao = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        botao.style.display = "block";

    } else {

        botao.style.display = "none";

    }

});

botao.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});