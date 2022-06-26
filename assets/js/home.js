const modal = document.getElementById('comment-container');
const show_comment = document.getElementById('show_comment');

function handleModal(postId, comments) {
  event.preventDefault();
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
  modal.querySelector('input[name="post"]').value = postId;
  const ul = modal.querySelector('ul');
  ul.innerHTML = '';
  JSON.parse(comments).map(({ content, user: { name } }) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="post-container">
    <div class="post-user">
      <div class="post-user-name"><small>${name}</small></div>
      <div class="post-user-delete-action">
        <i class="fa-solid fa-trash-alt"></i>
      </div>
    </div>
    <div class="post-content" style="min-height: 20px;">${content}</div>
    <div class="post-action">
      <div><i class="fa-solid fa-thumbs-up"></i></div>
      <div><i class="fa-solid fa-thumbs-down"></i></div>
      <div onclick="handleModal('<%= id %>')">
        <i class="fa-solid fa-comment"></i>
      </div>
    </div>
  </div>`;
    ul.appendChild(li);
  });
  return;
}
