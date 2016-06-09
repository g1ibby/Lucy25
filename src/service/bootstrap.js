import mongoose from 'mongoose';

function*byId(id) {
  const TagModel = mongoose.model('Tag');
  let tag = yield TagModel.findOne({_id: id}).exec();
  yield tag.save();
  return tag;
}

function*list(options) {
  let criteria = options.criteria || {};
  const TagModel = mongoose.model('Tag');
  let tags = yield TagModel.find(criteria)
    .sort({'createdAt': -1})
    .exec();
  return {
    items: tags
  };
}

function*create(data, user) {
  const TagModel = mongoose.model('Tag');
  let tag = new TagModel(data);
  tag.user = user._id;
  tag = yield tag.save();
  return {
    _id: tag._id
  };
}

function*update(id, data, user) {
  const TagModel = mongoose.model('Tag');
  data.user = user._id;
  yield TagModel.update({_id: id}, data).exec();
  let tag = yield TagModel.findOne().exec({_id: id});
  return {
    _id: tag._id
  };
}

export {byId, list, create, update};
