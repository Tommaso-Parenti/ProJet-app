const fs = require('fs');
const fsPromise  = fs.promises;
const { dialog } = require('electron').remote;
const cs = require('./js/scripts/costants');

function get_libs() {
  let libs = [];
  $('#option-libs input[type=checkbox]:checked').each(function () {
    libs.push($(this).parents('li').find('label').text().trim());
  });
  return libs;
}

/**
 * Funzione che permette di creare un progetto
 * @param {string} dir 
 * Directory dove il file verra salvato
 * @param {string} projectName
 * Nome del progetto
 * @param {string} name 
 * Nome del programmatore / Studente 
 * @param {bool} check_integer_number 
 * Booleano che attiva la funzione del check_integer_number
 * @param {bool} getTime 
 * Booleano che attiva la funzione del getTime
 * @param {Array} libs 
 * Array di stringhe che contiene tutte le libs
 */
async function createProject(dir, projectName, projectAuthor, check_integer_number, getTime, libs) {
  let complete_dir = `${dir}\\${projectName}`;
  console.log(complete_dir);
  if (!fs.existsSync(complete_dir)) {
    fsPromise.mkdir(complete_dir, recursive = true);
  }

  await Promise.all([
    fsPromise.writeFile(`${complete_dir}\\main.cpp`, cs._MAIN_CPP_((projectAuthor != null && projectAuthor.length != 0) ? '// '+projectAuthor+'\n' : '')),
    fsPromise.writeFile(`${complete_dir}\\functions.cpp`, cs._FUNCTIONS_CPP_((check_integer_number) ? cs._FUNCTIONS_CHECK_INTEGER_NUMBER_ + '\n' : '', (getTime) ? cs._FUNCTIONS_GET_TIME_ + '\n' : '')),
    fsPromise.writeFile(`${complete_dir}\\header.hpp`, cs._HEADER_HPP_((check_integer_number) ? cs._FUNCTIONS_CHECK_INTEGER_NUMBER_HEADER_ + '\n' : '', ((getTime) ? cs._FUNCTIONS_GET_TIME_HEADER_ + '\n' : ''))),
    fsPromise.writeFile(`${complete_dir}\\general.hpp`, cs._GENERAL_HPP_(libs.join('\n'))),
    fsPromise.writeFile(`${complete_dir}\\${projectName}.cbp`, cs._PROJECT_CBP_(projectName)),
  ]);
}

async function createProject_init() {
  try {
      let dirs = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
      if (dirs != undefined) {
        await createProject(dirs[0], $('#project-name').val().trim(), $('#project-author').val().trim(), $('#box-2').is(':checked'), $('#box-3').is(':checked'), get_libs());
        $('#single-page-success').show();
      }
    } catch (error) {
      $('#single-page-error').show();
    }
}