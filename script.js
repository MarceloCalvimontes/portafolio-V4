// ===============================
// INICIALIZACIÓN
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    configurarTema();
    configurarScrollProyectos();
    configurarEventosHabilidades();
    configurarDelegacionProyectos();
    iniciarAnimaciones();

    cargarProyectos();

});


// ===============================
// SCROLL A PROYECTOS
// ===============================

function configurarScrollProyectos() {
    const botonProyectos = document.getElementById("ver-proyectos");

    botonProyectos.addEventListener("click", () => {
        const proyectosSection = document.getElementById("proyectos");

        proyectosSection.scrollIntoView({
            behavior: "smooth"
        });
    });
}


// ===============================
// TEMA CLARO / OSCURO
// ===============================

function configurarTema() {

    const botonTema = document.getElementById("btn-tema");

    botonTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const temaActual = document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

        localStorage.setItem("tema", temaActual);
    });

    // cargar preferencia guardada
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "dark") {
        document.body.classList.add("dark-mode");
    }

}


// ===============================
// EVENTOS EN HABILIDADES
// ===============================

function configurarEventosHabilidades() {

    const todasLasHabilidades = document.querySelectorAll(".skill-category");
    console.log(todasLasHabilidades)

    todasLasHabilidades.forEach(skill => {

        skill.addEventListener("click", () => {

            const nombreHabilidad = skill.querySelector("li").innerText;

            alert("2 años de experiencia en " + nombreHabilidad);

        });

    });

}


// ===============================
// FETCH DE PROYECTOS DESDE GITHUB
// ===============================

async function cargarProyectos() {

    try {

        const response = await fetch("https://api.github.com/users/MarceloCalvimontes/repos");

        if (!response.ok) {
            throw new Error("Error al cargar los proyectos");
        }

        const proyectos = await response.json();

        const contenedor = document.getElementById("contenedor-proyectos");

        contenedor.innerHTML = "";

        proyectos.forEach(proyecto => {

            contenedor.innerHTML += `
                <div class="proyecto-card fade-in">
                    <h3>${proyecto.name}</h3>
                    <p>${proyecto.description || "Sin descripción"}</p>
                    <a href="${proyecto.html_url}" target="_blank">🔗Ver en GitHub</a>
                </div>
            `;

        });

        registrarAnimacionProyectos();

    } catch (error) {

        console.error("Error:", error);

    }

}


// ===============================
// DELEGACIÓN DE EVENTOS PROYECTOS
// ===============================

function configurarDelegacionProyectos() {

    const contenedor = document.getElementById("contenedor-proyectos");

    contenedor.addEventListener("click", (evento) => {

        const tarjeta = evento.target.closest(".proyecto-card");

        if (tarjeta) {

            alert(
                "Haz hecho clic en un proyecto: " +
                tarjeta.querySelector("h3").innerText
            );

        }

    });

}


// ===============================
// ANIMACIONES SCROLL
// ===============================

let observer;

function iniciarAnimaciones() {

    observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    });

    const elementos = document.querySelectorAll(
        ".skill-category, .study-item"
    );

    elementos.forEach(el => {
        el.classList.add("fade-in");
        observer.observe(el);
    });

}


// registrar animaciones para proyectos cargados por fetch
function registrarAnimacionProyectos() {

    const tarjetas = document.querySelectorAll(".proyecto-card");

    /*tarjetas.forEach(card => {
        observer.observe(card);
    });*/
    tarjetas.forEach((card, index) => {

        setTimeout(() => {
            observer.observe(card);
        }, index * 120);

    });

}