import mongoose from 'mongoose';

function*byId(id) {
  const BookmarkModel = mongoose.model('Bookmark');
  let bookmark = yield BookmarkModel.findOne({_id: id})
    .exec();
  ++bookmark.views;
  yield bookmark.save();
  return bookmark;
}

function*list(options) {
  const BookmarkModel = mongoose.model('Bookmark');
  let bookmark = yield BookmarkModel.find(options)
    .select('-body')
    .sort({'createdAt': -1})
    .populate('tag')
    .exec();
  return {
    items: bookmark
  };
}

function*create(data, user) {
  const BookmarkModel = mongoose.model('Bookmark');
  let bookmark = new BookmarkModel(data);
  bookmark.user = user._id;
  bookmark = yield bookmark.save();
  return {
    _id: bookmark._id
  };
}

function*update(id, data, user) {
  const BookmarkModel = mongoose.model('Bookmark');
  data.user = user._id;
  yield BookmarkModel.update({_id: id}, data).exec();
  let bookmark = yield BookmarkModel.findOne().exec({_id: id});
  return {
    _id: bookmark._id
  };
}

export {byId, list, create, update};
