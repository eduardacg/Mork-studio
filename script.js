/*
  MØRK STUDIO
  PARA EDITAR OS PROJETOS:
  Altere os textos, categorias, anos, imagens e descrições
  na lista abaixo.
*/

const projects = [
  {
    title: "Mørk Identity",
    category: "Identidade",
    year: "2026",
    cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
    description: "Estudo de identidade visual e direção de arte para o universo MØRK Studio."
  },
  {
    title: "Black Ritual",
    category: "Audiovisual",
    year: "2026",
    cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",
    description: "Pesquisa visual de atmosfera, luz, sombra e composição cinematográfica."
  },
  {
    title: "Ink Stories",
    category: "Fotografia",
    year: "2026",
    cover: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=900&q=85",
    description: "Uma coleção visual dedicada a detalhes, texturas e expressão artística."
  },
  {
    title: "Dark Matter",
    category: "Direção de arte",
    year: "2026",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=85",
    description: "Exploração visual de formas orgânicas, contrastes e atmosferas obscuras."
  }
];

const gallery = document.getElementById("gallery");
const filters = document.getElementById("filters");
const counter = document.getElementById("counter");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

function renderProjects(category = "Todos") {
  const visibleProjects = projects.filter(project =>
    category === "Todos" || project.category === category
  );

  gallery.innerHTML = "";
  counter.textContent =
    String(visibleProjects.length).padStart(2, "0") + " WORKS";

  visibleProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Ver projeto " + project.title);

    const imageBox = document.createElement("div");
    imageBox.className = "project-image";

    const image = document.createElement("img");
    image.src = project.cover;
    image.alt = project.title;
    image.loading = "lazy";

    const number = document.createElement("span");
    number.className = "project-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const open = document.createElement("span");
    open.className = "project-open";
    open.textContent = "+";
    open.setAttribute("aria-hidden", "true");

    imageBox.append(image, number, open);

    const info = document.createElement("div");
    info.className = "project-info";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.textContent = project.category + " / " + project.year;

    info.append(title, meta);
    card.append(imageBox, info);

    card.addEventListener("click", () => openProject(project));

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(project);
      }
    });

    gallery.appendChild(card);
  });
}

function openProject(project) {
  document.getElementById("modalImage").src = project.cover;
  document.getElementById("modalImage").alt = project.title;
  document.getElementById("modalTitle").textContent = project.title;

  document.getElementById("modalMeta").textContent =
    project.category + " / " + project.year;

  document.getElementById("modalDescription").textContent =
    project.description;

  modal.classList.add("open");
  document.body.classList.add("modal-open");
  closeModal.focus();
}

function hideModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  filters.querySelectorAll(".filter").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProjects(button.dataset.filter);
});

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", event => {
  if (event.target === modal) hideModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideModal();
});

renderProjects();
