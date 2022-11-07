slider({
  container: ".slider",
  field: ".slides",
  prevArrow: ".slider-prev",
  nextArrow: ".slider-next",
  slideItems: ".slide",
  wrapper: ".wrapper",
});

function slider({
  container,
  field,
  prevArrow,
  nextArrow,
  slideItems,
  wrapper,
}) {
  let offset = 0,
    index = 1,
    shift = 0,
    allowShifting = true;

  const slider = document.querySelector(container),
    slidesField = document.querySelector(field),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    slidesWrapper = document.querySelector(wrapper),
    slides = slidesField.querySelectorAll(slideItems),
    slideSize = slider.offsetWidth,
    slidesLength = slides.length,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true);

  slidesField.appendChild(cloneFirst);
  slidesField.insertBefore(cloneLast, firstSlide);

  slidesField.style.width = slideSize * (slidesLength + 2) + "px";
  slidesField.style.display = "flex";
  slidesField.style.transform = `translate3D(-${slideSize}px, 0, 0)`;
  slidesWrapper.style.overflow = "hidden";
  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];

  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function dotsOpacityChange() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[index - 1].style.opacity = 1;
  }

  slidesField
    .querySelectorAll(".slide")
    .forEach((slide) => (slide.style.width = slideSize + "px"));

  prev.addEventListener("click", function () {
    shiftSlide(-1);
  });

  next.addEventListener("click", function () {
    shiftSlide(+1);
  });

  function shiftSlide(direction) {
    if (!allowShifting) {
      return;
    } else {
      allowShifting = false;

      offset = +window.getComputedStyle(slidesField).transform.split(", ")[4];

      if (direction == +1) {
        const intervalID = setInterval(() => {
          if (shift >= slideSize) {
            clearInterval(intervalID);
            slidesField.style.transform = `translate3D(${
              offset - slideSize
            }px, 0, 0)`;
            index++;
            shift = 0;
            checkIndex();
            dotsOpacityChange();
          } else {
            slidesField.style.transform = `translate3D(${
              offset - shift
            }px, 0, 0)`;
            shift += slideSize / 60;
          }
        }, 16);
      } else if (direction == -1) {
        const intervalID = setInterval(() => {
          if (shift >= slideSize) {
            clearInterval(intervalID);
            slidesField.style.transform = `translate3D(${
              offset + slideSize
            }px, 0, 0)`;
            index--;
            shift = 0;
            checkIndex();
            dotsOpacityChange();
          } else {
            slidesField.style.transform = `translate3D(${
              offset + shift
            }px, 0, 0)`;
            shift += slideSize / 60;
          }
        }, 16);
      }
    }
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = +e.target.getAttribute("data-slide-to");
      if (index === slideTo || !allowShifting) {
        return;
      }

      allowShifting = false;
      index = slideTo;
      offset = slideSize * slideTo;

      const initial = +window
          .getComputedStyle(slidesField)
          .transform.split(", ")[4],
        path = (offset + initial) / 60;
      shift = -initial;

      if (offset > shift) {
        const intervalID = setInterval(() => {
          if (shift >= offset) {
            clearInterval(intervalID);
            slidesField.style.transform = `translate3D(-${offset}px, 0, 0)`;
            allowShifting = true;
            shift = 0;
            checkIndex();
            dotsOpacityChange();
          } else {
            slidesField.style.transform = `translate3D(-${shift}px, 0, 0)`;
            shift += path;
          }
        }, 16);
      } else if (offset < shift) {
        const intervalID = setInterval(() => {
          if (shift <= offset) {
            clearInterval(intervalID);
            slidesField.style.transform = `translate3D(-${offset}px, 0, 0)`;
            allowShifting = true;
            shift = 0;
            checkIndex();
            dotsOpacityChange();
          } else {
            slidesField.style.transform = `translate3D(-${shift}px, 0, 0)`;
            shift += path;
          }
        }, 16);
      }
    });
  });

  function checkIndex() {
    if (index === 0) {
      slidesField.style.transform = `translate3D(-${
        slidesLength * slideSize
      }px, 0, 0)`;
      index = slidesLength;
    }

    if (index === slidesLength + 1) {
      slidesField.style.transform = `translate3D(-${slideSize}px, 0, 0)`;
      index = 1;
    }

    allowShifting = true;
  }
}
