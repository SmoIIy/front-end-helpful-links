import {
    createRecipe,
    getRecipes,
    deleteRecipe,
    updateRecipe,
  } from "./modules/data.js";
  
  import { setupCountries } from "./modules/setup.js";

  async function showRecipes() {
    const response = await getRecipes();
    console.table(response);
   const el = document.querySelector("template").content;
    const parent = document.querySelector(".cards");
    parent.innerHTML = "";
    response.forEach((rec) => {
        const clone = el.cloneNode(true);
        clone.querySelector(".card-title").textContent = rec.name;
        clone.querySelector(".card-description").textContent = rec.description;
        clone.querySelector(".card-link").href = rec.link;



    // clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
    // clone
    //   .querySelector("button[data-action='delete']")
    //   .addEventListener("click", async () => {
    //     await deleteRecipe(rec.id);
    //     await showRecipes();
    //   });


    parent.appendChild(clone);
  });
}
showRecipes();

function handleSubmit() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
      console.log(e);
      //stop refresh
      e.preventDefault();
      const formData = new FormData(form);
      //console.log(formData.get("ingredients").split("\n"));
  
      await createRecipe({
        name: formData.get("name"),
        description: formData.get("description"),
        link: formData.get("link"),
      });
      showRecipes();
    });

  }
  handleSubmit();
  