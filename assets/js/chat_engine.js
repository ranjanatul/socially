class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect('http://localhost:5000');

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    const self = this; // to be used inside callback function
    this.socket.on('connect', function () {
      console.log('New Connection has been made using socket..');

      // sending message is 'emit'. receiving is 'on'
      self.socket.emit('join_room', {
        chatroom: 'socially',
        userEmail: self.userEmail,
      });

      self.socket.on('user_joined', function (data) {
        console.log('a user joined', data);
      });
    });

    $('#message-form').submit(() => {
      event.preventDefault();

      let msg = $('#message-input').val();

      if (msg !== '') {
        self.socket.emit('send_message', {
          message: msg,
          userEmail: this.userEmail,
          chatroom: 'socially',
        });
        $('#message-input').val('');
      }
    });

    self.socket.on('receive_message', function (data) {
      const { chatroom, message, userEmail } = data;
      $('#chatroom_name').html(chatroom);
      const chatbox = $('#chatbox');
      chatbox.append(`
      <li class= ${userEmail == self.userEmail ? 'self' : 'other'}>
        <span>${message}</span>
      </li>
      `);
    });
  }
}
