const dropcss = require('../../dist/dropcss.cjs.js');
const assert = require('assert');

/* e.g.

.x .y + a:not(.y)
.foo > bar:not([foo*=z])

*/

describe('Context-aware, multi selector', () => {
	describe(':first-of-type', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img></div>',
				css:	'.foo:first-of-type {a:b;}',
			});
			assert.equal(out, '.foo:first-of-type{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="bar"></span><img><span class="foo"></span><img></div>',
				css:	'.foo:first-of-type {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':last-of-type', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="bar"></span><span class="foo"></span><img></div>',
				css:	'.foo:last-of-type {a:b;}',
			});
			assert.equal(out, '.foo:last-of-type{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img><span class="bar"></span><img></div>',
				css:	'.foo:last-of-type {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':only-of-type', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img></div>',
				css:	'.foo:only-of-type {a:b;}',
			});
			assert.equal(out, '.foo:only-of-type{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img><span class="foo"></span><img></div>',
				css:	'.foo:only-of-type {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe('', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img></div>',
				css:	'.foo:only-of-type {a:b;}',
			});
			assert.equal(out, '.foo:only-of-type{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img><span class="foo"></span><img></div>',
				css:	'.foo:only-of-type {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':nth-of-type()', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="bar"></span><img><span class="foo"></span><img></div>',
				css:	'.foo:nth-of-type(2) {a:b;}',
			});
			assert.equal(out, '.foo:nth-of-type(2){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img><span class="bar"></span><img></div>',
				css:	'.foo:nth-of-type(2) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':nth-last-of-type()', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="bar"></span><img><span class="foo"></span><img></div>',
				css:	'.foo:nth-last-of-type(1) {a:b;}',
			});
			assert.equal(out, '.foo:nth-last-of-type(1){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><img><span class="foo"></span><img><span class="bar"></span><img></div>',
				css:	'.foo:nth-last-of-type(1) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe('<tag> <tag>:not([a]):not([b])', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<body><input></body>',
				css:	"body input:not([type='color']):not([type='checkbox']) {a:b;}",
			});
			assert.equal(out, "body input:not([type='color']):not([type='checkbox']){a:b;}");
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<body><input type="color"></body>',
				css:	"body input:not([type='color']):not([type='checkbox']) {a:b;}",
			});
			assert.equal(out, '');
		});
	});
});