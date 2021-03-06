'use strict';



var imgArray = [];
var totalClicks;
var imgBoxes = document.getElementById('boxes');


// random image math function
function randomizedImages() {
  return Math.floor(Math.random() * imgArray.length);
}

///This Contructor function will enable me to push all images through here
function AdvertisedProducts(products, fileType) {
  this.products = products;
  this.fileType = fileType;
  this.survey = 0;
  this.views = 0;
  imgArray.push(this);
}

AdvertisedProducts.images = [
  document.getElementById('firstBox'),
  document.getElementById('secondBox'),
  document.getElementById('thirdBox')
];

AdvertisedProducts.resultsList = document.getElementById('resultsList');
totalClicks = 0;

AdvertisedProducts.justViewed = [];

new AdvertisedProducts('bag', 'img/bag.jpg');
new AdvertisedProducts('banana', 'img/banana.jpg');
new AdvertisedProducts('bathroom', 'img/bathroom.jpg');
new AdvertisedProducts('boots', 'img/boots.jpg');
new AdvertisedProducts('pet-sweep', 'img/pet-sweep.jpg');
new AdvertisedProducts('scissors', 'img/scissors.jpg');
new AdvertisedProducts('shark', 'img/shark.jpg');
new AdvertisedProducts('sweep', 'img/sweep.png');
new AdvertisedProducts('tauntaun', 'img/tauntaun.jpg');
new AdvertisedProducts('unicorn', 'img/unicorn.jpg');
new AdvertisedProducts('usb', 'img/usb.gif');
new AdvertisedProducts('water-can', 'img/water-can.jpg');
new AdvertisedProducts('wine-glass', 'img/wine-glass.jpg');
new AdvertisedProducts('breakfast', 'img/breakfast.jpg');
new AdvertisedProducts('bubblegum', 'img/bubblegum.jpg');
new AdvertisedProducts('chair', 'img/chair.jpg');
new AdvertisedProducts('cthulhu', 'img/chair.jpg');
new AdvertisedProducts('dog-duck', 'img/dog-duck.jpg');
new AdvertisedProducts('dragon', 'img/dragon.jpg');
new AdvertisedProducts('pen', 'img/pen.jpg');



//While function to ensure that no images are repeated.

//currentImage[0] indicates the first image.
function displayImage() {
  var currentImage = [];
  currentImage[0] = randomizedImages();
  while (AdvertisedProducts.justViewed.indexOf(currentImage[0]) !== -1) {
    currentImage[0] = randomizedImages();
  }

  //currentImage[1] indicates the second image.
  currentImage[1] = randomizedImages();
  while (currentImage[0] === currentImage[1] || AdvertisedProducts.justViewed.indexOf(currentImage[1]) !== -1) {
    currentImage[1] = randomizedImages();
  }
  
  //currentImage[3] indicates the third image.
  currentImage[2] = randomizedImages();
  while (currentImage[0] === currentImage[2] || currentImage[1] === currentImage[2] || AdvertisedProducts.justViewed.indexOf(currentImage[2]) !== -1) {

    currentImage[2] = randomizedImages();
  }


  //grabbing all images through the contructor function above.
  for (var i = 0; i < currentImage.length; i++) {
    AdvertisedProducts.images[i].src = imgArray[currentImage[i]].fileType;
    AdvertisedProducts.images[i].id = imgArray[currentImage[i]].products;
    //keeps track of how many times the image is viewed.
    imgArray[currentImage[i]].views += 1;
    AdvertisedProducts.justViewed[i] = currentImage[i];
  }
}


//All clicks by user tallied up.
function tallyUp() {
  for (var i = 0; i < imgArray.length; i++) {
    var resultsList = document.getElementById('resultsList');
    var liEl = document.createElement('li');
    liEl.textContent = imgArray[i].products + ' was chosen ' + imgArray[i].survey + ' times in ' + imgArray[i].views + ' views.';
    resultsList.appendChild(liEl);
  }
}


// Creating the chart that will show the result.
function chart() {
  var label = [];
  var data = [];
  for (var i = 0; i < imgArray.length; i++) {
    label[i] = imgArray[i].products;
    data[i] = imgArray[i].survey;
  }

// color indications for each one.
  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet' , 'aliceblue' , 'aqua' , 'burlywood' , 'cadetblue', 'chartreuse' , 'chocolate' , 'coral' , 'cornflowerblue' , 'cornsilk' , 'crimson' , 'cyan' , 'darkblue' , 'darkgoldenrod' , 'fuchsia'];


  var ctx = document.getElementById("chart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: 'show # of clicks!',
        data: data,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: 'blue',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}



function mouseClicks(event) {
  //Enables the user to surpass 25 views. shows results after.
  if (totalClicks === 25) {
    imgBoxes.removeEventListener('click', mouseClicks);
    tallyUp();
    localStorage.clear();
    chart();
  }
  
  var imgArrayData = JSON.stringify(imgArray);
  localStorage.setItem('imgArray' , imgArrayData);
  var clickTotal = JSON.stringify(totalClicks);
  localStorage.setItem('clicks' , clickTotal);

  //If the user clicks on the section(the border around the images), it will give you a message.
  if (event.target.id === 'boxes') {
    return alert('Please click on the image!!');
  }
  //Adds up the number of mouse clicks.
  totalClicks += 1;

  for (var i = 0; i < imgArray.length; i++) {
    if (event.target.id === imgArray[i].products) {
      imgArray[i].survey += 1;
    }
  }
  displayImage();
}


imgBoxes.addEventListener('click', mouseClicks);
displayImage();

