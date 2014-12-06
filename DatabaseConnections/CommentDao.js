var mongoose = require('mongoose');
var offer = require('../DatabaseConnections/OfferDao');

//var db = mongoose.connect("mongodb://localhost:27017/nodetest2");

var CommentSchema = new mongoose.Schema({
	CommentId : Number,
	Comment : String,
	userId : Date
});

//var CommentModel = mongoose.model('Comment', CommentSchema);
var OfferModel = mongoose.model('Offer', offer.OfferSchema);

function CommentDao() {
}


CommentDao.prototype.postComment = function(callback, OfferId, comment, commentDate) {
	console.log('OfferId'+OfferId)
	OfferModel.find({
		OfferID : OfferId
	}, function(err, offers) {
		if (!err) {
			console.log('offer id exists');
//			CommentModel.find(function(err, offers) {
//			callback(err, offers);
//			});
			var commentId = uuid.v4();
			commentId = commentId.substr(commentId.length - 5);
			var comment = new CommentModel({
				CommentId: commentId,
				Comment : comment,
				CommentDate : commentDate,
			});
			
			comment.save(function(err, Offers) {
				if (!err) {
					console.log('comment created');
					callback(null, comment);
				} else {
					console.log(err);
					callback('comment not posted', null);
				}

			});
			callback(null, comment);
		} else {
			console.log(err);
			callback('offer id does not exist ', null);
		}
	});

};






CommentDao.prototype.getCommentHistory = function(callback, OfferId) {

	OfferModel.find({
		OfferId : OfferId
	}, function(err, offers) {
		if (!err) {
			console.log('offer id exists');
			CommentModel.find({
				OfferId : OfferId
			},function(err, comments) {
				callback(err, comments);
			});
		} else {
			console.log(err);
			callback('offer id does not exist ', null);
		}
	});

};




module.exports = CommentDao