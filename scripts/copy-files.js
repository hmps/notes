const path = require('path');
const fs = require('fs');

const notesDir = path.join(__dirname, '../notes');
const notes = fs.readdirSync(notesDir);

const mdFiles = notes.filter(name => /^.*\.md$/.test(name))
console.log(mdFiles);
mdFiles.forEach(file => {
  fs.unlinkSync(`${notesDir}/${file}`);
});

const directoryPath = path.join(__dirname, '../Bear_export');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    const filesToCopy = files.filter(function (file) {
      const data = fs.readFileSync(`${directoryPath}/${file}`);
      const content = data.toString();

      return !content.includes('#crm') && !content.includes('#transient') && !content.includes('#draft') && !content.includes('#journal');
    });

  console.log(filesToCopy);

  filesToCopy.forEach(file => {
    fs.copyFileSync(`${directoryPath}/${file}`, `${notesDir}/${file}`);
  });
});
