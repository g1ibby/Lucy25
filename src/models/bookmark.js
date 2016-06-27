import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// Create Schema
let BookmarkSchema = new mongoose.Schema({
  user: {type: Schema.ObjectId, ref: 'Users'},
  url: {type: String, default: '', trim: true},
  title: {type: String, default: '', trim: true},
  subtitle: {type: String, default: '', trim: true},
  body: {type: String, default: '', trim: true},
  image: {type: String, default: 'http://placehold.it/400x250/000/fff'},
  tag: {type: Schema.ObjectId, ref: 'Tag'},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date}
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
    virtuals: true
  }
});

BookmarkSchema.virtual('createdAtT').get(function() {
  return String(this.createdAt.getTime());
});

BookmarkSchema.virtual('updatedAtT').get(function() {
  return (this.updatedAt) ? String(this.updatedAt.getTime()) : '';
});

BookmarkSchema.pre('update', function() {
  this.update({}, {$set: {updatedAt: new Date()}});
});

// Validations
BookmarkSchema.path('url').required(true, 'News url cannot be blank');
BookmarkSchema.path('title').required(true, 'News title cannot be blank');
BookmarkSchema.path('subtitle').required(true, 'News subtitle cannot be blank');

mongoose.model('Bookmark', BookmarkSchema);
