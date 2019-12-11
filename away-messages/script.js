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

function getSmiley(img) {
  var smiley = img.src;
  document.getElementById('text-field').innerHTML +=
    '<img src="' + smiley + '">';
}

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
  document.getElementById('text-field').style.color = color;
}

function getBackgroundColor() {
  var color = document.getElementById('bgColorPicker').value;
  document.getElementById('text-field').style.backgroundColor = color;
}

var minSize = 0.5;
var maxSize = 5;

function resizeText(multiplier) {
  var elem = document.getElementById('text-field');
  var currentSize = elem.style.fontSize || 1;
  var newSize = parseFloat(currentSize) + multiplier * 0.2;
  if (newSize < minSize) newSize = minSize;
  if (newSize > maxSize) newSize = maxSize;
  elem.style.fontSize = newSize + 'em';
}

// https://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
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

function getLinksInSelection() {
  var selectedLinks = [];
  var range, containerEl, links, linkRange;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      linkRange = document.createRange();
      for (var r = 0; r < sel.rangeCount; ++r) {
        range = sel.getRangeAt(r);
        containerEl = range.commonAncestorContainer;
        if (containerEl.nodeType != 1) {
          containerEl = containerEl.parentNode;
        }
        if (containerEl.nodeName.toLowerCase() == 'a') {
          selectedLinks.push(containerEl);
        } else {
          links = containerEl.getElementsByTagName('a');
          for (var i = 0; i < links.length; ++i) {
            linkRange.selectNodeContents(links[i]);
            if (
              linkRange.compareBoundaryPoints(range.END_TO_START, range) < 1 &&
              linkRange.compareBoundaryPoints(range.START_TO_END, range) > -1
            ) {
              selectedLinks.push(links[i]);
            }
          }
        }
      }
      linkRange.detach();
    }
  } else if (document.selection && document.selection.type != 'Control') {
    range = document.selection.createRange();
    containerEl = range.parentElement();
    if (containerEl.nodeName.toLowerCase() == 'a') {
      selectedLinks.push(containerEl);
    } else {
      links = containerEl.getElementsByTagName('a');
      linkRange = document.body.createTextRange();
      for (var i = 0; i < links.length; ++i) {
        linkRange.moveToElementText(links[i]);
        if (
          linkRange.compareEndPoints('StartToEnd', range) > -1 &&
          linkRange.compareEndPoints('EndToStart', range) < 1
        ) {
          selectedLinks.push(links[i]);
        }
      }
    }
  }
  return selectedLinks;
}

function link(type) {
  var savedSel = saveSelection();
  var url = prompt('Enter URL:', 'http://');
  restoreSelection(savedSel);
  document.execCommand('CreateLink', false, url);
  var links = getLinksInSelection();
  for (var i = 0; i < links.length; ++i) {
    links[i].setAttribute('target', '_blank');
  }
}