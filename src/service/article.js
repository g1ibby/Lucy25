import mongoose from 'mongoose';

function*byId(id) {
  const ArticleModel = mongoose.model('Article');
  let article = yield ArticleModel.findOne({_id: id})
    .populate('tags', 'name')
    .exec();
  ++article.views;
  yield article.save();
  return article;
}

function*list(options) {
  const ArticleModel = mongoose.model('Article');
  let article = yield ArticleModel.find()
    .select('-body')
    .sort({'createdAt': -1})
    .limit(options.perPage)
    .skip(options.perPage * options.page)
    .populate('tags', 'name')
    .exec();
  let count = yield ArticleModel.count().exec();
  return {
    items: article,
    pages: Math.ceil(count / options.perPage)
  };
}

function*create(data, user) {
  const ArticleModel = mongoose.model('Article');
  let article = new ArticleModel(data);
  article.user = user._id;
  article = yield article.save();
  return {
    _id: article._id
  };
}

function*update(id, data, user) {
  const ArticleModel = mongoose.model('Article');
  data.user = user._id;
  yield ArticleModel.update({_id: id}, data).exec();
  let article = yield ArticleModel.findOne().exec({_id: id});
  return {
    _id: article._id
  };
}

export {byId, list, create, update};
