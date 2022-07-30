{
  // const modal = document.getElementById('comment-container');
  const modal = $('#comment-container');

  function handleModal(name, email) {
    if (modal.css('display') == 'none') {
      modal.css({ display: 'flex' });
    } else {
      modal.css({ display: 'none' });
    }
    const form = document.createElement('div');
    form.innerHTML = ``;

    $('.modal-body').append(`<div>
    <div class="field-wrapper">
  <div>
    <label htmlFor="name">Name: </label>
  </div>
  <div>
    <input
      type="text"
      name="name"
      placeholder="Enter your Full Name"
      value='${name}'
      required
    />
  </div>
</div>
<div class="field-wrapper">
  <div>
    <label htmlFor="email">Email: </label>
  </div>
  <div>
    <input
      type="email"
      name="email"
      placeholder="Enter your Email Id"
      value='${email}'
      required
    />
  </div>
  <div class="field-wrapper">
  <div>
    <label htmlFor="avatar">Upload profile image: </label>
  </div>
  <div>
    <input
      type="file"
      name="avatar"
      value='upload'
    />
  </div></div>
    `);
  }
}
