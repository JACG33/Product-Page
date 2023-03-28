document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("click", (e) => {
    let target = e.target;

    if (target.dataset.btn == "search") {
      import("../js/components/actions/actionSearch.js").then((res) =>
        res.actionSearch(searchInput.value)
      );
    }
  });

  const $searchInput = document.getElementById("searchInput");
  if ($searchInput) {
    $searchInput.addEventListener("keypress", (e) => {
      if (e.key == "Enter")
        import("../js/components/actions/actionSearch.js").then((res) =>
          res.actionSearch(searchInput.value)
        );
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
      // console.log("mouseout");
      const $starsContainer = document.getElementById(
        `${target.parentElement.parentElement.id}`
      );

      const $stars = $starsContainer.querySelectorAll("img");

      // console.log($starsContainer.dataset.starsstatus);

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
            id: parseInt($starsContainer.dataset.post),
            data: parseInt(target.dataset.starcount),
          }),
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
      }
    }
  });
});
