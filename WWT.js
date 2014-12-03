var fs    = require('fs');
var path  = require('path');
var rmdir = require('rimraf');
var url = require('url');
var http = require('http');

var https = require('https'),
    exec = require('child_process').exec,
    path = require('path'),
    util = require('util'),
    events = require('events');

var dir_to_create = '/users/marlongeraldorodriguesviana/wwt-rocks/';
var file_url = 'https://github.com/angular/angular.js';

var mkdirSync = function (path) {
    if(!fs.existsSync(path)){    
        try {
          fs.mkdirSync(path);
          //download_file_httpget(file_url);
          exec(util.format('git clone %s %s', file_url, dir_to_create), puts);
        } catch(e) {
          if ( e.code != 'EEXIST' ) throw e;
        }
    } else {
        rmdir(path, function(error){
            if(error != null){
                console.log(error);
            } else {
                try {
                   fs.mkdirSync(path);
                   //download_file_httpget(file_url);
                   exec(util.format('git clone %s %s', file_url, dir_to_create), puts);
                } catch(e) {
                   if ( e.code != 'EEXIST' ) throw e;
                }
            }
        });
    }
}

mkdirSync(path.join(dir_to_create));

// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(dir_to_create + file_name);

http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded to ' + dir_to_create);
        });
    });
};

// Used by exec to print the result of executing a subprocess.
function puts(error, stdout, stderr) {
  if (error) {
    console.log('error:' + error);
  } else {
    console.log('info: ' + stdout.trim());
    if (stderr) {
      console.log('action: ' + stderr.trim());
    }
  }
}