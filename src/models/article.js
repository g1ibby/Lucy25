import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// Create Schema
let ArticleSchema = new mongoose.Schema({
  user: {type: Schema.ObjectId, ref: 'Users'},
  title: {type: String, default: '', trim: true},
  subtitle: {type: String, default: '', trim: true},
  body: {type: String, default: '', trim: true},
  tags: [{type: Schema.ObjectId, ref: 'Tag'}],
  views: {type: Number, default: 0},
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

ArticleSchema.virtual('createdAtT').get(function() {
  return String(this.createdAt.getTime());
});

ArticleSchema.virtual('updatedAtT').get(function() {
  return (this.updatedAt) ? String(this.updatedAt.getTime()) : '';
});

ArticleSchema.pre('update', function() {
  this.update({}, {$set: {updatedAt: new Date()}});
});

// Validations
ArticleSchema.path('title').required(true, 'News title cannot be blank');
ArticleSchema.path('body').required(true, 'News body cannot be blank');

mongoose.model('Article', ArticleSchema);
