posts = [];

function addpost(text){

  var newpost = {
    text: text,
    id: null,
    comments: [],
    addComment: function (comment, user) {

    var comment = {
      usercomment: comment,
      user: user
    };
    this.comments.push(comment);
  }
};
  if(posts.length === 0){
    newpost.id = 0;
  }else{
    var lastId = posts[posts.length-1].id;
    newpost.id = lastId + 1;
  }
   posts.push(newpost);
};

function updatePosts(){
  $('.posts').empty();
  for (var i = 0; i < posts.length; i++){
    var post = $('<p data-id="' + posts[i].id +'">' + posts[i].text + '</p>');
    $('.posts').append(post);

//Append comment
  if (posts[i].comments !== undefined)
    for(j = 0; j<posts[i].comments.length; j++){
    post.append(posts[i].comments[j].usercomment);
  };
//create comment
    var usercomment = $("<input class='comment' />");
    usercomment.data("postId", posts[i].id);
    usercomment.attr("placeholder", "Write a comment...");
    post.append("</br>");
    post.append(usercomment);

//create button
    var button = $("<button class = 'remove'></button>");
    button.data("removeId", posts[i].id);
    button.html("Remove");
    $(".posts p[data-id='" + posts[i].id + "']").append(button);
    removeButton();
    bindComment();
  }
};

function removeButton(){
  $('.remove').on('click', function(){
    var target = $(this).data("removeId");
  for (var i =0; i < posts.length; i++){
      if (posts[i].id == target){
        posts.splice(i, 1);
        updatePosts();
      }
    }
  });
};

function bindComment(){
$('.comment').keypress(function(event){
  if((event.keyCode || event.which) == 13){
    var target = $(this).data("postId"); //add comment to object
    posts[target].addComment($(this).val());
    updatePosts();
    }
  });
}

$('.add-post').on('click', function(event){
  var userText = $('#post-name').val();
  addpost(userText);
  updatePosts();
});
