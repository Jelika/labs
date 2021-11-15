const NAVIGATION = document.querySelector(".navigation");
NAVIGATION.addEventListener("click", (event) => {
  NAVIGATION.querySelectorAll(".navigation__item").forEach((element) =>
    element.classList.remove("active")
  );
  event.target.classList.add("active");
});
document.addEventListener("scroll", onscroll);

function onscroll(event) {
  const curPosition = window.scrollY;
  const containers = document.querySelectorAll("section");
  const links = document.querySelectorAll(".navigation a");

  containers.forEach((el) => {
    if (
      el.offsetTop <= curPosition &&
      el.offsetTop + el.offsetHeight > curPosition
    ) {
      links.forEach((a) => {
        a.classList.remove("active");
        if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
          a.classList.add("active");
        }
      });
    }
  });
}

const BUTTON = document.getElementById("makeSubmit");
const CLOSE_BUTTON = document.getElementById("closeSubmit");

BUTTON.addEventListener("click", () => {
  let requiredFields = [...document.querySelectorAll("[required]")];
  let isValid = (node) => node.checkValidity();
  if (requiredFields.every(isValid)) {
    event.preventDefault();
    const subject = document.getElementById("subject").value;
    const describe = document.getElementById("describe").value;
    document.getElementById("subjectResult").innerText = !subject
      ? "Without subject"
      : "Subject:" + subject;
    document.getElementById("describeResult").innerText = !describe
      ? "Without description"
      : "Description:" + describe;
    document.getElementById("messageBlock").classList.toggle("hidden");
  }
});

CLOSE_BUTTON.addEventListener("click", () => {
  document.getElementById("subjectResult").innerText = "";
  document.getElementById("describeResult").innerText = "";
  document.getElementById("messageBlock").classList.toggle("hidden");
  document.querySelectorAll(".form-input input").forEach((input) => {
    input.value = "";
  });
  document.getElementById("describe").value = "";
});

const SCREEN = document.querySelector(".slider-phone-img");

SCREEN.addEventListener("click", (event) => {
  if (event.target.classList.contains("img-phone")) {
    event.target.style.zIndex = "0";
  }
  if (event.target.classList.contains("black-screen")) {
    event.target.previousElementSibling.style.zIndex = "1";
  }
});

const PICTURE = document.querySelector(".project-wrapper");

PICTURE.addEventListener("click", (event) => {
  if (event.target.closest(".box").classList.contains("border")) {
    event.target.closest(".box").classList.remove("border");
  } else {
    PICTURE.querySelectorAll(".box").forEach((element) =>
      element.classList.remove("border")
    );
    event.target.closest(".box").classList.add("border");
  }
});

const TAGS = document.querySelector(".portfolio-tags");
const IMGES = document.querySelector(".container-imgs");

TAGS.addEventListener("click", (event) => {
  let pictures = Array.from(IMGES.querySelectorAll(".box"));
  pictures.unshift(pictures.pop());
  IMGES.append(...pictures);

  if (event.target.classList.contains("active2")) {
    event.target.classList.remove("active2");
  } else {
    TAGS.querySelectorAll(".tag").forEach((element) =>
      element.classList.remove("active2")
    );
    event.target.classList.add("active2");
  }
});

const slides = [...document.querySelectorAll(".slide")];
const directionToClassMap = new Map([
  ["left", "right-gone"],
  ["right", "left-gone"],
]);

function getNextElementIndex(index, array) {
  return (index + array.length) % array.length;
}

function afterAnimationCBFactory(...classes) {
  const cb = function () {
    this.classList.remove(...classes);
    this.removeEventListener("animationend", cb);
  };
  return cb;
}

function hideSlide(oldIndex, direction) {
  slides[oldIndex].addEventListener(
    "animationend",
    afterAnimationCBFactory("active3", direction)
  );
  slides[oldIndex].classList.add(direction);
  slides[oldIndex].classList.add("next");
}

function showSlide(currentIndex, direction) {
  slides[currentIndex].addEventListener(
    "animationend",
    afterAnimationCBFactory(direction)
  );
  slides[currentIndex].classList.remove("next");
  slides[currentIndex].classList.add("active3", direction);
}

function moveSlide(direction) {
  const currentSlideIndex = slides.findIndex((slide) => {
    return slide.classList.contains("active3");
  });
  const newActiveSlideIndex =
    direction === "left"
      ? getNextElementIndex(currentSlideIndex + 1, slides)
      : getNextElementIndex(currentSlideIndex - 1, slides);
  hideSlide(currentSlideIndex, directionToClassMap.get(direction));
  showSlide(newActiveSlideIndex, direction);
}

document
  .querySelector(".arrow-right")
  .addEventListener("click", () => moveSlide("left"));

document
  .querySelector(".arrow-left")
  .addEventListener("click", () => moveSlide("right"));

const BURGERIMG = document.querySelector(".burger-img");
const MODAL_MENU = document.querySelector(".burger-menu-wrapper");
const MODAL_WINDOW = document.querySelector(".modal-window");
const LOGO = document.querySelector(".burger-img");
const SINGOLO = document.querySelector(".header-logo h1");

BURGERIMG.addEventListener("click", burgerMenuClick);

function burgerMenuClick() {
  const isOpen = MODAL_MENU.parentElement.classList.contains("open");
  const animationClass = isOpen ? "left-gone" : "left";
  LOGO.style.transform = `rotate(${isOpen ? 0 : 90}deg)`;
  SINGOLO.classList.toggle("i-died-for-that-one");
  MODAL_MENU.addEventListener(
    "animationend",
    afterAnimationCBFactory(animationClass)
  );
  if (!isOpen) {
    MODAL_MENU.parentElement.classList.add("open");
  } else {
    const cb = function () {
      MODAL_MENU.parentElement.classList.remove("open");
      this.removeEventListener("animationend", cb);
    };
    MODAL_MENU.addEventListener("animationend", cb);
  }
  MODAL_MENU.classList.add(animationClass);
}
MODAL_WINDOW.addEventListener("click", () => {
  LOGO.style.transform = `rotate(0deg)`;
  SINGOLO.classList.remove("i-died-for-that-one");
  const cb = function () {
    MODAL_WINDOW.classList.remove("open");
    this.classList.remove("left-gone");
    this.removeEventListener("animationend", cb);
  };
  MODAL_MENU.addEventListener("animationend", cb);
  MODAL_MENU.classList.add("left-gone");
});

function changeColor() {
  const seltheme = document.getElementById("selcolor").value;
  const tableNode = document.querySelector("table");

  switch (seltheme) {
    case "Green":
      tableNode.style.color = "green";
      break;
    case "Blue":
      tableNode.style.color = "blue";
      break;
    case "Red":
      tableNode.style.color = "red";
      break;
    case "Purple":
      tableNode.style.color = "#767e9e";
      break;
    default:
      tableNode.style.color = "#767e9e";
      break;
  }
}

/*лаба ТИБ по кукисам*/
function imageTimer() {
  document.querySelector(".cookies-image").classList.add("active");

  let imgs = [
    "assets/img/Project1.png",
    "assets/img/Project2.png",
    "assets/img/Project3.png",
    "assets/img/Project4.png",
    "assets/img/Project5.png",
  ];
  let imgsFromCookies = [];
  let counter = 0;
  let jsonStr = JSON.stringify(imgs);
  setCookie("mycookie", jsonStr);
  let jsonStrFromCookies = getCookie("mycookie");
  imgsFromCookies = JSON.parse(jsonStrFromCookies);

  setInterval(function () {
    document.querySelector(".cookies-image").src = imgsFromCookies[counter];
    counter++;
    if (counter === 4) {
      counter = 0;
    }
  }, 2000);

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "");
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    console.log("===", document.cookie);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
}
/*лаба ТИБ по кукисам*/
const selfInfo = "Smirnova Anzhelika, study in BSUIR."; // string with personal information
const birthYear = 2001; // number of birth year

const monthsRuList = document.querySelector(".radio-btn_ru-list");
const monthsEnList = document.querySelector(".radio-btn_en-list");

let promptResult = "Anzhelika Smirnova";
let confirmResult = "";



function confirmCall() {
  confirmResult = confirm("Make chose: yes/no");
}
const monthsRu = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const monthsEn = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let promptResult = "";

function promptCall() {
  promptResult = prompt(
    "Whats your name? (enter your data instead of the default data)",
    promptResult
  );
}

function alertCall() {
  alert(`Lorem Ipsum is simply dummy text of th
  e printing and typesetting industry. Lorem Ipsum has been the industry's 
  standard dummy text ever since the 1500s, when an unknown printer took a galley of typ
  e and scrambled it to make a type specimen book. It has survived not only five 
  centuries, but also the leap into electronic typesetting, remaining essentially un
  changed. It was popularised in the 1960s with the release of Letraset sheets 
  containing Lorem Ipsum passages, and more recently with desktop publishing software li
  ke Aldus PageMaker including versions of Lorem Ipsum.`);
}

monthsRu.forEach((el) => {
  const listItem = document.createElement("li");
  listItem.innerText = el;
  monthsRuList.append(listItem);
});

monthsEn.forEach((el) => {
  const listItem = document.createElement("li");
  listItem.innerText = el;
  monthsEnList.append(listItem);
});


document.querySelectorAll(".track-order-change").forEach((node) => {
  node.addEventListener("click", (e) => {
    document.querySelectorAll(".radio-btn").forEach((elem) => {
      elem.closest("div").querySelector("ul").style.display = "none";
    });

    e.target.closest("div").querySelector("ul").style.display = e.target
      .closest("div")
      .querySelector("input").checked
      ? "none"
      : "block";
  });
});

let option; 

// функция расчёта
function calculator() {
  // переменная для результата
  let result;
  // получаем первое и второе число
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);
  // смотрим, что было в переменной с действием, и действуем исходя из этого
  switch (option) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
    case '++':
      result = num1+1;
      break;
    case '--':
      result = num1-1;
      break;
  }
  document.getElementById("result").innerHTML = result
}
