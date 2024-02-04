// ===== Title transformation (works together with SCSS part) === //

const text = 'Mariia Paraketsova';

const createLetterArray = (string) => { // turn a string into an array
  return string.split('');
}

const createLetterLayers = (array) => {  // letter layers wrapped in span tags
  return array.map((letter) => {
    let layer = '';
    for (let i = 1; i <= 2; i++) {  //specify # of layers per letter
      if (letter === ' ') {           // if letter is a space
        layer += '<span class="space"></span>';
      } else {
        layer += '<span class="letter-'+i+'">'+letter+'</span>';
      }
    }
    return layer;
  });
}

const createLetterContainers = (array) => {  // this function wraps each letter in a parent container
  return array.map((item) => {
    let container = '';
    container += '<div class="wrapper">'+item+'</div>';
    return container;
  });
}

const displayLetters = () => {
  const outputLayers = new Promise(function(resolve) {  // use a promise to output text layers into DOM first
    document.getElementById('text').innerHTML = createLetterContainers(createLetterLayers(createLetterArray(text))).join('');
    resolve();
  });

  const spans = Array.prototype.slice.call(document.getElementsByTagName('span'));  // then adjust width and height of each letter
  outputLayers.then(() => {
      return spans.map((span) => {
        setTimeout(() => {
          span.parentElement.style.width = span.offsetWidth+'px';
          span.parentElement.style.height = span.offsetHeight+'px';
        }, 250);
      });  
  }).then(() => {
      let time = 250; // then slide letters into view one at a time
      return spans.map((span) => {
        time += 25;
        setTimeout(() => {
          span.parentElement.style.top = '0px';
        }, time);
      });
  });
}

document.addEventListener('DOMContentLoaded', displayLetters); // execute the function when the page is first loaded

window.addEventListener('resize', displayLetters); //execute function on page reload

// ========= CHANGE PHOTO BY CLICKING ====== //
document.addEventListener('DOMContentLoaded', () => {
  let photo = document.getElementById('photo');
  photo.addEventListener('click', function () {
    if (photo.src.includes('img/photo-MP.png')) {
      photo.src = "img/pon.jpeg";
      photo.alt = "Mariia's avatar";
    } else {
      photo.src = "img/photo-MP.png";
      photo.alt = "Mariia's photo"
    }
  })
})