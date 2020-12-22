module.exports = function(eleventyConfig) {
    
    const markdownIt = require('markdown-it');
    const markdownItOptions = {
        html: true,
        linkify: true
    };
    
    const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'))
    .use(function(md) {
        // Recognize Mediawiki links ([[text]])
        md.linkify.add("[[", {
            validate: /^([\w\s/-]+)(.\w+)?\s?(\|\s?([\w\s/]+))?\]\]/,
            normalize: match => {
                const parts = match.raw.slice(2,-2).split("|");
                parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                match.text = (parts[1] || parts[0]).trim();
                match.url = `/notes/${parts[0].trim()}/`;
            }
        })
    })
    
    eleventyConfig.addFilter("markdownify", string => {
        return md.render(string)
    })

    eleventyConfig.setLibrary('md', md);
    
    eleventyConfig.addCollection("notes", function (collection) {
        const coll = collection.getFilteredByGlob(["notes/**/*.md", "00 Index.md"]);
      const a = coll.find(a => a.template.parsed.name === 'ESSAY - Acceleration vs navigation')
      console.log(a);

      return coll.map(a => {
        if (a.template.parsed.name === 'ESSAY - Acceleration vs navigation') {

          console.log(a.template.frontMatter);
          a.template.frontMatter.title = 'Hampus';
        }
        return a;
      });
    });!
    
    eleventyConfig.addPassthroughCopy('assets');

    return {
        useGitIgnore: false,
        dir: {
            input: "./",
            output: "_site",
            layouts: "layouts",
            includes: "includes",
            data: "_data"
        },
        passthroughFileCopy: true
    }
}
