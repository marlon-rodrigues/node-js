/*
 * A Node.js script that clones the Angular.js project from GitHub into
 * directory called 'wwt-rocks'.
 *
 * Author: Marlon Rodrigues
 * Email: marlon.gerodrigues@gmail.com
 */

    //required npms
var https  = require('https'),
    fs     = require('fs'),
    exec   = require('child_process').exec,
    path   = require('path'),
    util   = require('util'),
    rmdir  = require('rimraf');
    events = require('events');

    //path for clone directory
var clone_dir = '/users/marlongeraldorodriguesviana/wwt-rocks/';

    //url for Angular.js project on GitHub
var project_url = 'https://github.com/angular/angular.js';

/*
 * Checks if the clone directory exists. If it does, removes the the existing directory and
 * creates a new one, otherwise just creates a new directory
 * params: dir_path -> path to be checked 
 * author: Marlon Rodrigues
 */
var checkDir = function(dir_path){
    if(!fs.existsSync(dir_path)){    
            //creates directory
        mkdirSync(path.join(clone_dir));
    } else {
        rmdir(dir_path, function(error){
            if(error != null){
                console.log(error);
            } else {
                    //creates directory
                mkdirSync(path.join(clone_dir));
            }
        });
    }
}

/*
 * Creates the clone directory and executes command to clone from project url
 * params: dir_path -> path to directory that it will be created
 * author: Marlon Rodrigues
 */
var mkdirSync = function (dir_path) {
    try {
            //creates directory
        fs.mkdirSync(dir_path);
        console.log('Please wait, cloning repo into "' + clone_dir + '". It may take a few seconds...');
            //executes "clone" command
        exec(util.format('git clone %s %s', project_url, clone_dir), puts);
    } catch(e) {
        throw e;
    }
}

/*
 * Prints the result of the "clone" command
 * params: error -> receives the result of the clone command
 * author: Marlon Rodrigues
 */
function puts(error) {
  if (error) {
    console.log('Error:' + error);
  } else {
    console.log('Process succesfully completed.');
  }
}

    //call function to check if directory exists, which will start the whole process
checkDir(path.join(clone_dir));