const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
email: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  password: String,
  old_passwords: [
    {
      type: String,
      default: [],
    },
  ],
  new_passwords: [
    {
      type: String,
      default: [],
    },
  ],
  token: Number,
  token_expiry: Date,
  is_suspended: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },

  is_deleted: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

AuthSchema.pre('save', function(next) {
    if ( !password ) return next();
    this.password = bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS, 10))
    return next();
})


module.exports = mongoose.model('Auth', AuthSchema);