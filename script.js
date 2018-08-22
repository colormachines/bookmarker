
document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){
  var websiteName = document.getElementById("website-name").value;
  var websiteURL = document.getElementById("website-url").value;
 if(!formValidation(websiteName,websiteURL)){
   return false;
 }
  var bookmark={
    name: websiteName,
    url: websiteURL
  }

  if(localStorage.getItem('bookmarksStorage')===null){
    var bookmarksArray =[];
    bookmarksArray.push(bookmark);
    localStorage.setItem('bookmarksStorage',JSON.stringify(bookmarksArray));
  }
  else{
   var bookmarksArray = JSON.parse(localStorage.getItem('bookmarksStorage'));

   bookmarksArray.push(bookmark);
   localStorage.setItem('bookmarksStorage',JSON.stringify(bookmarksArray));
  }
  document.getElementById("myForm").reset();
   fetchBookmarks();
  e.preventDefault();
}
function deleteBookmark(url){
  var bookmarksArray = JSON.parse(localStorage.getItem('bookmarksStorage'));
  for(var i=0;i<bookmarksArray.length;i++){
    if(bookmarksArray[i].url === url){
      bookmarksArray.splice(i,1);
    }
  }
   localStorage.setItem('bookmarksStorage',JSON.stringify(bookmarksArray));
   fetchBookmarks();
}
function fetchBookmarks(){
  var bookmarksArray = JSON.parse(localStorage.getItem('bookmarksStorage'));
  var addedBookmarks = document.getElementById('addedBookmarks');
  addedBookmarks.innerHTML = '';
  for(var i=0;i<bookmarksArray.length;i++){
   var name = bookmarksArray[i].name;
   var url = bookmarksArray[i].url;
   addedBookmarks.innerHTML+= '<div id ="cards" class="card card-body bg-light">'+
                              '<h3>'+name+
                              '<a class="spacing btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
                              '<a onclick ="deleteBookmark(\''+url+'\')" class="spacing btn btn-danger" href="#">Remove</a>'+
                              '</h3>'+
                              '</div>';
  }
}
function formValidation(websiteName,websiteURL){
if((!websiteName) & (!websiteURL)){
  alert("Please fill form");
  return false;
}
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
if(!(websiteURL.match(regex))){
  alert("Enter a valid URL");
  return false;
}
return true;
}
