function moveToSelected(element) {

  let selected;
  if (element === "next") {
    selected = $(".selected").next();
  } else if (element === "prev") {
    selected = $(".selected").prev();
  } else {
    selected = element;
  }

  const next = $(selected).next();
  const prev = $(selected).prev();
  const prevSecond = $(prev).prev();
  const nextSecond = $(next).next();

  $(selected).removeClass().addClass("selected");

  $(prev).removeClass().addClass("prev");
  $(next).removeClass().addClass("next");

  $(nextSecond).removeClass().addClass("nextRightSecond");
  $(prevSecond).removeClass().addClass("prevLeftSecond");

  $(nextSecond).nextAll().removeClass().addClass('hideRight');
  $(prevSecond).prevAll().removeClass().addClass('hideLeft');

}

// Eventos teclado
$(document).keydown(function(e) {
  switch(e.which) {
    case 37: // left
      moveToSelected('prev');
      break;

    case 39: // right
      moveToSelected('next');
      break;

    default: return;
  }
  e.preventDefault();
});
