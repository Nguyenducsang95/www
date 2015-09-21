var Metalsmith 		= require('metalsmith'),
	markdown 		= require('metalsmith-markdown-remarkable'),
	layouts 		= require('metalsmith-layouts'),
	sass 			= require('metalsmith-sass'),
	collections 	= require('metalsmith-collections'),
	permalinks 		= require('metalsmith-permalinks'),
	metadata		= require('metalsmith-metadata'),
	fingerprint		= require('metalsmith-fingerprint'),
	minify			= require('metalsmith-html-minifier'),
	gzip			= require('metalsmith-gzip');


Metalsmith(__dirname)

	// Process CSS
	.use(sass({
		outputStyle: 'compressed',
    	includePaths: ['bower_components/']
	}))
	.use(fingerprint({
		pattern: ['styles/style.css']
	}))
	.use(gzip({
		src: ['**/*.css'],
		overwrite: true
	}))

	// Process Metadata
	.use(metadata({
		endorsements: "content/endorsements.json"
	}))
	.use(collections({
		pages: {
			pattern: 'content/pages/*.md'
		}
	}))

	// Process Markdown
	.use(markdown({
		html: true,
      	typographer: true,
      	quotes: "«»‘’"
	}))
	.use(permalinks({
		pattern: ':menu'
	}))

	// Process Templates
	.use(layouts({
		engine: 'handlebars',
		default: 'default-layout.hbs',
		partials: 'partials',
		pattern: '*.html'
	}))
	.use(minify())
    .destination('./www')
    .build(err => { if (err) console.log(err) });