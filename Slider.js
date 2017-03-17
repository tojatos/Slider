
'use strict';
$(function() {
 $(".slider-container").each(function() {
  var interv;
  var $slider = $(this);
  var imagesLocalization = $slider.data("images-localization");
  var numberOfImages = $slider.data("number-of-images");
  var imagesInterval = $slider.data("images-interval")!=undefined ? $slider.data("images-interval") : 3000;
  var stopOnMouseEnter = $slider.data("stop-on-mouse-enter")!=undefined ? $slider.data("stop-on-mouse-enter") : true;
  console.log($slider.data("stop-on-mouse-enter"));
  var activeSlide = Math.floor((Math.random() * numberOfImages) + 1);
  if (stopOnMouseEnter) $slider.find(".image-container > img").on('mouseenter', stopSlider).on('mouseleave', startSlider);
  $slider.find(".arrow").click(function() {
   if ($(this).data("id") == "left-arrow") lastSlide();
   else if ($(this).data("id") == "right-arrow") nextSlide();
  });
  $slider.find(".icon-circle-empty").click(function() {
   pickSlide($(this).data("id"));
  });
  changeSlide();
  /* FUNCTIONS */
  function getImageLocalization(number) {
   return imagesLocalization + 'slider' + number + '.jpg';
  }

  function resetSlider() {
   $slider.find(".image-container > img").stop(true, true);
   clearInterval(interv);
   interv = setInterval(nextSlide, imagesInterval);
  }

  function emptyCircles() {
   $slider.find(".icon-circle").attr("class", "icon-circle-empty");
  }

  function fillCircle(id) {
   $slider.find(".icon-circle-empty[data-id='" + id + "']").attr("class", "icon-circle");
  }

  function changeSlide() {
   resetSlider();
   $slider.find(".image-container > img").animate({
    opacity: '0'
   }, 250, function() {
    $slider.find(".image-container > img").attr("src", getImageLocalization(activeSlide));
   });
   emptyCircles();
   fillCircle(activeSlide);
   $slider.find(".image-container > img").animate({
    opacity: '1'
   }, 450);
  }

  function startSlider() {
   interv = setInterval(nextSlide, imagesInterval);
  }

  function stopSlider() {
   clearInterval(interv);
  }

  function nextSlide() {
   activeSlide++;
   if (activeSlide > numberOfImages) activeSlide = 1;
   changeSlide();
  }

  function lastSlide() {
   activeSlide--;
   if (activeSlide < 1) activeSlide = numberOfImages;
   changeSlide();
  }

  function pickSlide(newActiveSlide) {
   activeSlide = newActiveSlide;
   changeSlide();
  }

 });
});
