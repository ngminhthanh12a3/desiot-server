const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: {
    type: String,
    required: true,
    default:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  },
  access: { type: String, required: true, default: 'user' },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
