var elementToClick = document.querySelector('.toggler'); //change names
var elementToDisplay = document.querySelector('.smileys');

document.addEventListener("click", function (e) {
  if (elementToClick !== e.target && !elementToClick.contains(e.target)) {    
    elementToDisplay.style.display = 'none';
  } else {
    elementToDisplay.style.display = 'block';
    elementToDisplay.style.top = event.clientY + 'px';
    elementToDisplay.style.left = event.clientX + 'px';
  }
});