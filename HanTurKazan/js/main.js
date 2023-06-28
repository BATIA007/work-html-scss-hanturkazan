document.addEventListener("DOMContentLoaded", () => {
  const phones = document.querySelectorAll(".header__button");
  const order = document.querySelector(".button-order");
  const modal = document.querySelectorAll(".modal");
  const modal1 = document.querySelector(".modal-main");
  const modal2 = document.querySelector(".modal-order");
  const close = document.querySelectorAll(".modal__close");
  const order2 = document.querySelector(".nav__order");

  for (let i = 0; i < modal.length; i++) {
    document.addEventListener("click", (e) => {
      if (
        modal[i].classList.contains("modal-active") &&
        !e.target.closest(".modal__wrapper") &&
        !e.target.classList.contains("trigger")
      ) {
        closeModal(modal[i]);
      }
    });

    close[i].addEventListener("click", (e) => {
      closeModal(modal[i]);
    });

    document.addEventListener("keydown", (e) => {
      e.key === "Escape" ? closeModal(modal[i]) : null;
    });
  }

  for (let phone of phones) {
    phone.addEventListener("click", (e) => openModal(modal1));
  }

  if (modal2) {
    order.addEventListener("click", (e) => openModal(modal2));
    order2.addEventListener("click", (e) => openModal(modal2));

    const numbers = document.querySelectorAll(".order__numbers");

    for (let number of numbers) {
      const minus = number.querySelector(".order__minus");
      const plus = number.querySelector(".order__plus");
      const count = number.querySelector(".order__quantity");

      minus.addEventListener("click", () =>
        count.value - 1 < 0 ? null : count.value--
      );

      plus.addEventListener("click", () => count.value++);
    }
  }


  const closeModal = (elem) => {
    elem.classList.remove("modal-active");
    document.body.style.overflowY = "auto";
  };

  const openModal = (elem) => {
    elem.classList.add("modal-active");
    document.body.style.overflowY = "hidden";
  };

  const navMenu = document.querySelector(".nav__menu");
  const navClose = document.querySelector(".menu__close");

  navMenu.addEventListener("click", () => {
    const modalNav = document.querySelector(".menu");
    modalNav.classList.toggle("menu-active");
    navMenu.classList.toggle("nav__menu-active");

    if (modalNav.classList.contains("menu-active")) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  });

  navClose.addEventListener("click", () => {
    const modalNav = document.querySelector(".menu");
    modalNav.classList.remove("menu-active");
    navMenu.classList.remove("nav__menu-active");
    document.body.style.overflowY = "auto";
  });

  const arrow = document.querySelector(".nav__scroll");
  document.addEventListener("scroll", (e) => {
    if (window.pageYOffset > window.innerHeight) {
      arrow.classList.add("nav__scroll-active");
    } else {
      arrow.classList.remove("nav__scroll-active");
    }
  });

  arrow.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  const burger = document.querySelector(".burger__trigger");

  burger.addEventListener("click", () => {
    const list = document.querySelector(".burger__list");
    handleOpen(list, 2);
    burger.classList.toggle("burger-active");
  });

  const select = document.querySelector(".excursion__mobile");

  if (select) {
    window.innerWidth < 1000
      ? (select.nextElementSibling.style.height = "0px")
      : null;
    select.addEventListener("click", () => {
      handleOpen(select.nextElementSibling);
      select.classList.toggle("excursion__mobile-active");
    });
  }

  if (document.querySelector(".links")) {
    const links = document.querySelectorAll(".links__link");
    const active = document.querySelector(".links__link-active");

    for (let i = 0; i < links.length - 1; i++) {
      if (links[i] == active) {
        i > 1 ? links[i - 2].classList.remove("links__hide") : null;
        i > 0 ? links[i - 1].classList.remove("links__hide") : null;
        links[i].classList.remove("links__hide");
        i + 1 < links.length
          ? links[i + 1].classList.remove("links__hide")
          : null;
        i + 2 < links.length
          ? links[i + 2].classList.remove("links__hide")
          : null;

        if (i > 3) {
          links[i - 2].insertAdjacentHTML(
            "beforebegin",
            `<li class="links__margin">...</li>`
          );
        }

        if (i + 2 < links.length) {
          links[i + 2].insertAdjacentHTML(
            "afterend",
            `<li class="links__margin">...</li>`
          );
        }

        break;
      }
    }
  }

  const elem = document.getElementById("picker");

  if (elem) {
    const datepicker = new Datepicker(elem, {
      language: "ru",
      prevArrow: "",
      nextArrow: "",
      autohide: modal2 ? true : false,
      minDate: new Date(),
      maxDate: new Date().setMonth(new Date().getMonth() + 2),
    });
  }

  if (document.querySelector('.date')) {
    elem.addEventListener('changeDate', () => {
      handleOpen(elem.children[0]);
    })
  }

  const selectInput = document.querySelector(".select");
  if (selectInput) {
    const input = selectInput.querySelector(".order__input");
    const trigger = selectInput.querySelector(".select__button");
    const list = selectInput.querySelector(".select__list");
    let links = list.children;

    trigger.addEventListener("click", (e) => {
      selectInput.classList.toggle("select-active");
    });

    for (let link of links) {
      const picker = document.getElementById('picker');
      picker.addEventListener('changeDate', (e) => {

        const hour = Number(link.textContent.split(':')[0]);
        const min = Number(link.textContent.split(':')[1]);
        let isCurrent;
        const val = picker.value;
        const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        const dt = new Date(val.replace(pattern, '$3-$2-$1'));
        isCurrent = dt.getTime() >= new Date().getTime() - 86400000;
        const isDay = Number(val.split('.')[0]) === new Date().getDate() && Number(val.split('.')[1]) === new Date().getMonth() + 1 && Number(val.split('.')[2]) === new Date().getFullYear();

        if (isDay && new Date().getHours() > hour && isCurrent) {
          link.style.display = 'none';
        } else if (isDay && new Date().getHours() === hour && new Date().getMinutes() > min && isCurrent) {
          link.style.display = 'none';
        } else if (isCurrent) {
          link.style.display = 'block';
        } else {
          link.style.display = 'none';
        }
      });
    }

    for (let link of links) {
      link.addEventListener("click", (e) => {
        for (let li of links) {
          li.classList.remove("select__link-active");
        }
        link.classList.add("select__link-active");
        selectInput.classList.remove("select-active");
        input.value = link.textContent;
      });
    }
  }

  const dateBut = document.querySelector(".date__button-wrapper");

  if (dateBut) {
    const picker = document.querySelector(".datepicker");
    picker.style.height = "0px";
    dateBut.addEventListener("click", () => handleOpen(elem.children[0]));
  }

  const handleOpen = (elBlock, x = 1) => {
    if (elBlock.style.height === "0px") {
      elBlock.style.height = `${x * elBlock.scrollHeight}px`;
    } else {
      elBlock.style.height = `${elBlock.scrollHeight}px`;
      window.getComputedStyle(elBlock, null).getPropertyValue("height");
      elBlock.style.height = "0";
    }

    elBlock.addEventListener("transitionend", () => {
      if (elBlock.style.height !== "0px") {
        elBlock.style.height = "auto";
      }
    });
  };

  const rates = document.querySelectorAll(".star-rate");
  if (rates) {
    for (let rate of rates) {
      const stars = rate.querySelector(".stars").children;
      const num = Number(rate.querySelector(".star-num").textContent);
      for (let i = 0; i < Math.floor(num); i++) {
        stars[i].style.fill = "#FFE600";
      }

      const id = makeid();

      rate.insertAdjacentHTML(
        "afterbegin",
        `<svg width="0" height="0" viewBox="0 0 12 13">
          <defs>
            <linearGradient id="${id}">
            <stop offset="${Math.round(
          (num % Math.floor(num)) * 100
        )}%" stop-color="#FFE600" />
            <stop offset="${Math.round(
          (num % Math.floor(num)) * 100
        )}%" stop-color="grey" />
            </linearGradient>
          </defs>
        </svg>`
      );
      stars[Math.floor(num)].style.fill = `url(#${id})`;
    }
  }

  const formRate = document.querySelector(".form__stars");
  if (formRate) {
    const stars = formRate.children;
    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener("mouseenter", (e) => {
        for (let i = 0; i < e.target.dataset.value; i++) {
          stars[i].style.fill = "#FFE600";
        }
      });

      stars[i].addEventListener("mouseleave", (e) => {
        for (let i = 0; i < stars.length; i++) {
          stars[i].style.fill = "";
        }
      });

      stars[i].addEventListener("click", (e) => {
        const num = e.target.closest("svg").dataset.value;
        for (let i = 0; i < stars.length; i++) {
          num > i
            ? stars[i].classList.add("star-active")
            : stars[i].classList.remove("star-active");
        }
      });
    }
  }

  function makeid() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  if (window.innerWidth < 1000) {
    [].forEach.call(document.querySelectorAll("input"), function (input) {
      if (!input.readOnly) {
        input.addEventListener("focus", (e) => {
          modal2.style.overflowY = "hidden";
        });

        input.addEventListener("blur", (e) => {
          modal2.style.overflowY = "auto";
        });
      }
    });
  }

  [].forEach.call(
    document.querySelectorAll('input[type="tel"]'),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});
