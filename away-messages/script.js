var elementToClick = document.querySelector('.toggler');
var elementToDisplay = document.querySelector('.smileys');

document.addEventListener('click', function(e) {
  if (elementToClick !== e.target && !elementToClick.contains(e.target)) {
    elementToDisplay.style.display = 'none';
  } else {
    elementToDisplay.style.display = 'block';
    elementToDisplay.style.top = event.clientY + 'px';
    elementToDisplay.style.left = event.clientX + 'px';
  }
});

document
  .getElementsByClassName('text-color')[0]
  .addEventListener('click', function() {
    document.getElementById('colorPicker').focus();
    document.getElementById('colorPicker').value = '#b1ff1e';
    document.getElementById('colorPicker').click();
  });

document
  .getElementsByClassName('bg-color')[0]
  .addEventListener('click', function() {
    document.getElementById('bgColorPicker').focus();
    document.getElementById('bgColorPicker').value = '#f4c4d3';
    document.getElementById('bgColorPicker').click();
  });

function getColor() {
  var color = document.getElementById('colorPicker').value;
  document.getElementById('colorful').style.color = color;
}

function getBackgroundColor() {
  var color = document.getElementById('bgColorPicker').value;
  document.getElementById('colorful').style.backgroundColor = color;
}

function getSmiley(img) {
  var smiley = img.src;
  document.getElementsByClassName('text-field')[0].innerHTML +=
    '<img src="' + smiley + '">';
}

function link() {
  var linkURL = prompt('Enter URL:', 'http://');
  document.execCommand('CreateLink', false, linkURL);
}

function saveSelection() {
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      var ranges = [];
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        ranges.push(sel.getRangeAt(i));
      }
      return ranges;
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
}

function restoreSelection(savedSel) {
  if (savedSel) {
    if (window.getSelection) {
      sel = window.getSelection();
      sel.removeAllRanges();
      for (var i = 0, len = savedSel.length; i < len; ++i) {
        sel.addRange(savedSel[i]);
      }
    } else if (document.selection && savedSel.select) {
      savedSel.select();
    }
  }
}
