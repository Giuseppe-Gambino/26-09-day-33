const pexelsUrlGen = "https://api.pexels.com/v1/photos";
const pexelsKey = "fUgA2lPdyrnFwtQfi2EevzWTYWOwVtIvhD1SgSySCFXwedYI88E9QIt9";

const addressbarId = new URLSearchParams(location.search);

const imgId = addressbarId.get("imgId");
console.log(imgId);

const getSingleImg = function () {
  fetch(pexelsUrlGen + "/" + imgId, {
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
    .then((img) => {
      console.log("img", img);
      console.log(img.src.medium);

      const container = document.getElementById("container");
      const card = document.createElement("div");
      card.classList.add("card", "w-75");

      card.innerHTML = `
        <img src="${img.src.medium}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${img.alt}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${img.photographer}</li>
        </ul>
        <div class="card-body">
          <a href="${img.photographer_url}" class="card-link">photographer link</a>
          <a href="pexels-start.html" class="card-link">back to home</a>
        </div>
    `;

      container.appendChild(card);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getSingleImg();
