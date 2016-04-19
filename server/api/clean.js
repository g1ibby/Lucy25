import resource from 'resource-router-middleware';
var read = require('node-readability');

export default resource({

	index(req, res) {
		console.log(req.query.url);
		read(req.query.url, function(err, article) {
			// Main Article
			// console.log(article.content);
			// Title
			// console.log(article.title);

			res.json({
				content: article.content,
				title: article.title
			});

			// HTML Source Code
			// console.log(article.html);
			// DOM
			// console.log(article.document);

			// Response Object from Request Lib
			// console.log(meta);

			// Close article to clean up jsdom and prevent leaks
			article.close();
		});
	}
});
