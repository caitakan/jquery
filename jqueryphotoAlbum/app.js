$(document).ready(function() {


////////ADDING PHOTOS TO HOMEPAGE////////

//Adding photos dynamically on homepage using albumCoverTemplate
var albumCoverPhotos = function (albumPhotoData) {
  var albumCoverTemplate = _.template($('#displayAlbumTemplate').html());
  var albumCoverArr = "";
  albums.forEach (function (albumCover){
  albumCoverArr += albumCoverTemplate(albumCover);
});
  $('.home-wrapper').children('ul').append(albumCoverArr);
};
albumCoverPhotos(albums);

////////SELECTING PHOTOS ON HOMEPAGE////////

var selectedPhotoAlbums = "";
$('.home-wrapper').children('ul').find('div').on('click', function (event) {
  event.preventDefault();
  $ ('.album-page').removeClass('inactive');
  $ ('.home-page').addClass('inactive');
  selectedPhotoAlbums = ($(this).attr('id'));
  showPhotoAlbums(selectedPhotoAlbums);
});

//Pulls Album Photos --> using filter to create an array of images that have albumRel
//matching the ID# (i.e. selectedPhotoAlbums)

var grabPhotos = function (album_choice) {
  var emptyArr = albums.filter (function (item) {
    return item.albumRel === album_choice;
  });
  return emptyArr[0].photos;
};

////////DISPLAYS ALBUM PHOTOS////////

  var showPhotoAlbums = function(albumPagePhotos) {
  var showAlbumTemplate = _.template($('#displayAlbumCoverTemplate').html());
  var displayPhotosArr = "";
  _.each(grabPhotos(selectedPhotoAlbums), function (el) {
    displayPhotosArr += showAlbumTemplate (el);
  });
  $('.album-wrapper').children('ul').append(displayPhotosArr);
};

////////NAVIGATION LINKS ON PHOTO ALBUMS' PAGES////////

//1. Add Links to NAVIGATION
var navigationLinks = function (albumTitleData) {
  var navTemplate = _.template($('#addNavigationTemplate').html());
  var albumTitleArr = "";
  albums.forEach (function(el){
    albumTitleArr += "<li id = '" + el.albumRel + "'>";
    albumTitleArr += "<div class = 'navigation-link-container' id ='" + el.albumRel + "'>";
    albumTitleArr += "<h4>";
    albumTitleArr += el.albumTitle;
    albumTitleArr += "</h4>";
    albumTitleArr += "</div>";
    albumTitleArr += "</li>";
  });
  $ ('.navigation').append(albumTitleArr);
};
navigationLinks(albums);

//2. Displays New Album that is chosen

selectedPhotoAlbums = "";
$('.navigation').children('li').on('click', function (event) {
  console.log ("Navigation is being clicked");
  event.preventDefault();
  selectedPhotoAlbums = ($(this).attr('id'));
  $('.album-wrapper').not(this).find('li').hide();
  showPhotoAlbums(selectedPhotoAlbums);
});

//LIGHTBOX
//1. Toggle to Lightbox Section

$('.album-wrapper').on("click", "img", function (event) {
event.preventDefault();
console.log("Photo click is working!");
$ ('.lightbox-page').removeClass('inactive');
$ ('.album-page').addClass('inactive');
var selectedPhotos = $(this).attr('src');
setPhotoFull(selectedPhotos);
});
//2.
var setPhotoFull = function (photofullget) {
  var photoFull = "";
    photoFull += "<div class ='lightbox-image-container'>";
    photoFull += "<img class= 'lightboxPhoto' src='" + photofullget + "'alt=''/>";
    photoFull += "</div>";
    console.log(photoFull);
    $('.lightbox-page').append(photoFull);
};


////////BACK TO ALBUM////////
$(".back-to-album-button").on("click", function(el) {
  el.preventDefault();
  $ ('.album-page').removeClass('inactive');
  $ ('.lightbox-page').addClass('inactive');
  $ ('.lightbox-image-container').addClass('inactive');
});

});//end of doc ready
