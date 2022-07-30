{
  let createPost = function () {
    const postForm = $('#new-post-form');

    // whenever form is submitted below handler will execute.
    postForm.submit(function (e) {
      e.preventDefault();
      // ajax request is xhr i.e. xmlhttpRequest
      // serailize in the data in json format.
      const request = {};
      postForm.serializeArray().forEach(({ name, value }) => {
        request[name] = value;
      });
      $.ajax({
        // dataType: 'json',
        // contentType: 'application/json; charset=utf-8',
        type: 'post',
        url: '/posts/create',
        data: request,
        success: function (response) {
          const { name, _id: id, content } = response.data.post;
          const feedPost = $('.feed-post');
          feedPost.prepend(`<li>
          <div class="post-container">
  <div class="post-user">
    <div class="post-user-name"><small> ${name} </small></div>
    <div class="post-user-delete-action">
           <a href="/posts/delete/${id}">
             <i class="fa-solid fa-trash-alt"></i>
           </a>
         </div>
       </div>
  <div class="post-content">${content}</div>
  <div class="post-action">
  <div><i class="fa-solid fa-thumbs-up"></i></div>
  <div><i class="fa-solid fa-thumbs-down"></i></div>
  <div onclick="handleModal(${id})">
    <i class="fa-solid fa-comment"></i>
  </div>
</div>
</div></li>`);
          deletePost($(' .post-user-delete-action a', feedPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  createPost();

  let deletePost = function () {
    const deleteId = $('.post-user-delete-action a');
    deleteId.click(function (e) {
      e.preventDefault();
      const url = e.target.parentElement && e.target.parentElement.href;
      if (url) {
        $.ajax({
          type: 'get',
          url,
          success: function (response) {
            $(`#comment-${response.data.comment.id}`).remove();
            $('body').prepend(`            
            <div class="flash-msg-wrapper">  
              <div class="flash-msg-text green">
                ${response.message}
              </div>
              <hr class="hr green" />
              <i
                class="fa-solid fa-motorcycle icon txt-green"
              ></i>
            </div>`);
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      }
    });
  };
  deletePost();

  let createComment = () => {
    let commentForm = $('#comment-form');
    let comment = $('#comment');
    commentForm.submit((e) => {
      e.preventDefault();
      const request = {};
      commentForm.serializeArray().forEach(({ name, value }) => {
        request[name] = value;
      });

      $.ajax({
        type: 'post',
        url: '/comment/create',
        data: request,
        success: function (response) {
          const { _id: id, content, user } = response.data.comment;
          handleModal();
          const commentToAdd = $(`#${request.post}`);
          commentToAdd.prepend(`<li>
          <div class="post-container">
            <div class="post-user">
              <div class="post-user-name"><small>${user.name}</small></div>
              <div class="post-user-delete-action">
                <a href="/comment/delete/${id}">
                  <i class="fa-solid fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <div class="post-content" style="min-height: 20px">${content}</div>
            <div class="post-action">
              <div><i class="fa-solid fa-hand-point-up"></i></div>
              <div><i class="fa-solid fa-hand-point-down"></i></div>
              <div onclick="handleModal(${id})">
                <i class="fa-solid fa-reply"></i>
              </div>
            </div>
          </div>
        </li>`);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  createComment();
  // handle modal functionality below.
  // const modal = document.getElementById('comment-container');
  // const show_comment = document.getElementById('show_comment');

  const modal = $('#comment-container');

  function handleModal(postId) {
    event.preventDefault();

    if (modal.css('display') === 'block') {
      modal.css({
        display: 'none',
      });
    } else {
      modal.css({
        display: 'block',
      });
    }
    $(' input[name="post"]', modal).val(postId);
    // if (modal.style.display === 'block') {
    //   modal.style.display = 'none';
    // } else {
    //   modal.style.display = 'block';
    // }
    // modal.querySelector('input[name="post"]').value = postId;
    return;
  }

  function expandComment(id) {
    const targetEle = $(`#${id}`);
    const iconEle = $(' .fa-solid', event.target);
    // const targetEle = document.getElementById(id);
    // const iconEle = event.target.querySelector('.fa-solid');

    if (targetEle.css('display') === 'flex') {
      targetEle.css({
        display: 'none',
      });
      iconEle.css({
        transform: 'rotate(0deg)',
      });
    } else {
      targetEle.css({
        display: 'flex',
      });
      iconEle.css({
        transform: 'rotate(90deg)',
      });
    }
    // if (targetEle.style.display == 'flex') {
    //   targetEle.style.display = 'none';
    //   iconEle.style.transform = 'rotate(0deg)';
    // } else {
    //   targetEle.style.display = 'flex';
    //   iconEle.style.transform = 'rotate(90deg)';
    // }
  }
}
