import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// Create Schema
let TagSchema = new mongoose.Schema({
  user: {type: Schema.ObjectId, ref: 'Users'},
  name: {type: String, default: '', trim: true},
  label: {type: String, default: '', trim: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date}
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

TagSchema.pre('update', function() {
  this.update({}, {$set: {updatedAt: new Date()}});
});

// Validations
TagSchema.path('name').required(true, 'Tag name cannot be blank');
TagSchema.path('label').required(true, 'Tag label cannot be blank');

mongoose.model('Tag', TagSchema);
