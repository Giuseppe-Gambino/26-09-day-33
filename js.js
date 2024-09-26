const pexelsUrlGen = "https://api.pexels.com/v1/search?query=";
const pexelsUrlHamster = "https://api.pexels.com/v1/search?query=hamster";
const pexelsUrlTiger = "https://api.pexels.com/v1/search?query=tiger";

const pexelsKey = "fUgA2lPdyrnFwtQfi2EevzWTYWOwVtIvhD1SgSySCFXwedYI88E9QIt9";

const row = document.getElementById("row");

const getImg = function (type) {
  fetch(type, {
    headers: {
      Authorization: pexelsKey,
    },
  })
    .then((response) => {
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }
      return response.json();
    })
    .then((fotos) => {
      console.log("Dati ricevuti", fotos);

      const fotuzze = fotos.photos;

      console.log(fotuzze.url);

      fotuzze.forEach((fotuzze) => {
        const colCard = document.createElement("div");
        colCard.classList.add("col-md-4");

        colCard.innerHTML = `
      <div class="card mb-4 shadow-sm">
                <a href="details.html?imgId=${fotuzze.id}">
                <img src="${fotuzze.src.medium}" class="bd-placeholder-img card-img-top" />
                </a>
                <div class="card-body">
                  <h5 class="card-title">
                  <a href="details.html?imgId=${fotuzze.id}" class="link-offset-2 link-secondary link-underline link-underline-opacity-0">${fotuzze.alt}</a>
                  </h5>
                  <p class="card-text">
                  ${fotuzze.photographer}
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" id="hide" class="btn btn-sm btn-outline-secondary">Hide</button>
                    </div>
                    <small class="text-muted">${fotuzze.id}</small>
                  </div>
                </div>
              </div>
      `;

        row.appendChild(colCard);

        const hide = colCard.querySelector("#hide");
        hide.addEventListener("click", (e) => {
          colCard.remove();
        });
      });
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

const loadHamsters = document.getElementById("loadHamsters");

loadHamsters.addEventListener("click", (e) => {
  row.innerHTML = ``;
  getImg(pexelsUrlHamster);
});

const loadTigers = document.getElementById("loadTigers");

loadTigers.addEventListener("click", (e) => {
  row.innerHTML = ``;
  getImg(pexelsUrlTiger);
});

const formSearch = document.getElementById("formSearch");

formSearch.addEventListener("click", (e) => {
  row.innerHTML = ``;
  const inputText = document.getElementById("inputText").value;
  if (inputText) {
    getImg(`${pexelsUrlGen}${inputText}`);
  } else {
    getImg(`${pexelsUrlGen}random`);
  }
});
