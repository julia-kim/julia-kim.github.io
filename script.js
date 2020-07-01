var toggle = document.querySelector('input[name=theme]');

toggle.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

document.getElementById('defaultOpen').click();

function openProject(evt, project) {
  var i, content, links;
  content = document.getElementsByClassName('tab-content');
  for (i = 0; i < content.length; i++) {
    content[i].style.display = 'none';
  }
  links = document.getElementsByClassName('tab-link');
  for (i = 0; i < links.length; i++) {
    links[i].className = links[i].className.replace(' active', '');
  }
  document.getElementById(project).style.display = 'block';
  evt.currentTarget.className += ' active';
}

function getColor() {
  const colors = [
    '#00f5bc',
    '#f8cf48',
    '#fcaae6',
    '#b000e6',
    '#db76fa',
    '#5d82f9',
    '#7546f8'
  ];
  var rand = Math.floor(Math.random() * colors.length);
  var col = colors[rand];
  return col;
}

var color = getColor();

window.addEventListener('mousedown', function() {
  window.onmousemove = function() {
    var circle = document.createElement('div');
    circle.setAttribute('class', 'pointer');
    document.body.appendChild(circle);
    circle.style.top = event.clientY + 'px';
    circle.style.left = event.clientX + 'px';
    circle.style.backgroundColor = color;
    setTimeout(function() {
      document.body.removeChild(circle);
    }, 1000);
  };
});
window.addEventListener('mouseup', function() {
  window.onmousemove = null;
});