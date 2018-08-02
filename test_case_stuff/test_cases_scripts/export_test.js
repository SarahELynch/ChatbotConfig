
const path = require('path');
const fs = require('fs');

const _test_cases_path = path.resolve(__dirname, '../test_cases');

const export_tests = (file_names, destination_file) => {
  let test_description = file_names.map(name => require(name).description);
  let test_cases = file_names.map(name => require(name).test);
  
  let out = test_cases.reduce((r, v, i) => r += `# ${file_names[i].split("/").pop()}\n\n## ${test_description[i]}\n\n` + v.reduce((i_r, i_v) => {
    let replaced_output = i_v.output.replace(/{PAUSE:(\+?\d+)}/g, "\n\n<pause $1 milliseconds...>\n\n"); 
    return `${i_r}*${i_v.input}*\n\n${replaced_output}\n\n`;
  }, '') + "\n\n", '');

  fs.writeFile(destination_file, out, function(err) {
    if(err) {
      return console.log(err);
    }
  }); 
};

if(process.argv.length == 2) {
  fs.readdir(_test_cases_path, function(err, items) {
    export_tests(items.map(item => _test_cases_path + '/' + item), 'docs/test_cases.md');
  });
} else {
  export_tests([_test_cases_path + '/' + process.argv[2]], 'docs/test_cases.md');
}

