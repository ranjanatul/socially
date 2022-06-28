const modal = document.getElementById('comment-container');
const show_comment = document.getElementById('show_comment');

function handleModal(postId) {
  event.preventDefault();
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
  modal.querySelector('input[name="post"]').value = postId;
  return;
}

function expandComment(id) {
  const targetEle = document.getElementById(id);
  const iconEle = event.target.querySelector('.fa-solid');
  if (targetEle.style.display == 'flex') {
    targetEle.style.display = 'none';
    iconEle.style.transform = 'rotate(0deg)';
  } else {
    targetEle.style.display = 'flex';
    iconEle.style.transform = 'rotate(90deg)';
  }
}
