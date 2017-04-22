import marked from 'marked';
import highlight from 'highlight.js/lib/highlight';

highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
highlight.registerLanguage('python', require('highlight.js/lib/languages/python'));
highlight.registerLanguage('go', require('highlight.js/lib/languages/go'));
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'));
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'));
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
highlight.registerLanguage('swift', require('highlight.js/lib/languages/swift'));
highlight.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export default marked;
