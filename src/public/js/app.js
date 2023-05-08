document.addEventListener("DOMContentLoaded", (e) => {
  const $searchInput = document.getElementById("searchInput"),
    $searchResultCont = document.getElementById("searchResultCont");

  /*
   * Funcion para buscar una palabra o letra.
   * @param string Palabra o letra a bucar.
   * @param string Tecla presionada.
   */
  const searchProduct = async (wordToSearch, keyPress) => {
    const solic = await import("../js/components/actions/actionSearch.js");
    const result = await solic.actionSearch(wordToSearch, keyPress);
    let tmp = ``;
    result.forEach((ele) => {
      tmp += `<a href="/search/${ele.name}" class="search__result__link">${ele.name}</a>`;
    });
    $searchResultCont.innerHTML = tmp;
  };

  if ($searchInput) {
    $searchInput.addEventListener("focus", (e) => {
      if ($searchInput.value != "") searchProduct($searchInput.value, "");
    });

    $searchInput.addEventListener("input", (e) => {
      if ($searchInput.value == "") $searchResultCont.innerHTML = null;
      else searchProduct($searchInput.value, e.key);
    });

    $searchInput.addEventListener("keyup", (e) => {
      let evalKey = /[a-zA-ZñÑ]/g.test(e.key);
      if (e.key == "Enter") {
        searchProduct($searchInput.value, e.key);
      }
      if (evalKey && $searchInput.value != "") {
        searchProduct($searchInput.value, e.key);
      }
    });
  }

  document.addEventListener("mouseover", (e) => {
    const target = e.target;

    if (target.dataset.star === "star") {
      // console.log("mouseover");
      const $starsContainer = document.getElementById(
        `${target.parentElement.parentElement.id}`
      );

      const $stars = $starsContainer.querySelectorAll("img");

      if (target.dataset.starcount === 1) {
        target.src = "/img/svgIcons/star.svg";
      } else {
        for (let i = 0; i < target.dataset.starcount; i++) {
          $stars[i].src = "/img/svgIcons/star.svg";
        }
      }
    }
  });

  document.addEventListener("mouseout", (e) => {
    const target = e.target;

    if (target.dataset.star === "star") {
      const $starsContainer = document.getElementById(
        `${target.parentElement.parentElement.id}`
      );

      const $stars = $starsContainer.querySelectorAll("img");

      if ($starsContainer.dataset.starsstatus === "false") {
        if (target.dataset.starcount === 1) {
          target.src = "/img/svgIcons/starNone.svg";
        } else {
          for (let i = 0; i < $stars.length; i++) {
            $stars[i].src = "/img/svgIcons/starNone.svg";
          }
        }
      }
      $starsContainer.querySelectorAll("img").forEach((ele) => {
        ele.dataset.starstatus == "true"
          ? ""
          : (ele.src = "/img/svgIcons/starNone.svg");
      });
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.dataset.btn == "search") {
      searchProduct($searchInput.value, "Enter");
    }

    // Verify if $searchInput exists and if focus or active
    if ($searchInput && document.activeElement != $searchInput) {
      $searchResultCont.innerHTML = null;
    }

    // Show or hiden navbar
    if (target.dataset.btn == "hamburger") {
      document
        .getElementById("navbarItems")
        .classList.toggle("navbar__items--show");
    }

    if (target.dataset.star === "star") {
      const $starsContainer = document.getElementById(
        `${target.parentElement.parentElement.id}`
      );

      const $stars = $starsContainer.querySelectorAll("img");

      if (target.dataset.starcount === 1) {
        target.src = "/img/svgIcons/star.svg";
        target.dataset.starstatus = "true";
        $starsContainer.dataset.starsstatus = "true";

        $starsContainer.querySelectorAll("img").forEach((ele) => {
          ele.src = "/img/svgIcons/starNone.svg";
        });
      } else {
        $starsContainer.querySelectorAll("img").forEach((ele) => {
          ele.src = "/img/svgIcons/starNone.svg";
        });
        for (let i = 0; i < target.dataset.starcount; i++) {
          $stars[i].src = "/img/svgIcons/star.svg";
          $stars[i].dataset.starstatus = "true";
        }

        $starsContainer.dataset.starsstatus = "true";

        fetch("/api/stars", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            id: $starsContainer.dataset.post,
            data: parseInt(target.dataset.starcount),
          }),
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
      }
    }
  });
});
