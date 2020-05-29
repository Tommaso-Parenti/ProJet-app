/**
 * COSTANTE MAIN
 * @param {string} name 
 */
const _MAIN_CPP_ = (name) => {
return `${name}/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * * * * * * This project was created with ProJet * * * * * *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

#include "general.hpp"
#include "header.hpp"

int main() {
    cout << "Hello world!" << endl;
    return 0;
}`;
}

/**
 * COSTANTE FUNCTIONS
 * @param {string} check_integer_number 
 * @param {string} getTime 
 */
const _FUNCTIONS_CPP_ = (check_integer_number, getTime) => {
	return `#include "general.hpp"
#include "header.hpp"

${getTime}${check_integer_number}`;
}

/**
 * COSTANTE GENERAL
 * @param {string} libs 
 */
const _GENERAL_HPP_ = (libs) => {
	return `#ifndef GENERAL_HPP_INCLUDED
#define GENERAL_HPP_INCLUDED

${libs}

using namespace std;

#endif // GENERAL_HPP_INCLUDED`;
}

/**
 * COSTANTE HEADER
 * @param {string} check_integer_numberHeader 
 * @param {string} getTimeHeader 
 */
const _HEADER_HPP_ = (check_integer_numberHeader, getTimeHeader) => {
	return `#ifndef HEADER_HPP_INCLUDED
#define HEADER_HPP_INCLUDED

${getTimeHeader}${check_integer_numberHeader}

#endif // HEADER_HPP_INCLUDED`;
}

/**
 * 
 * @param {string} title 
 */
const _PROJECT_CBP_ = (title) => `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<CodeBlocks_project_file>
	<FileVersion major="1" minor="6" />
	<Project>
		<Option title="${title}" />
		<Option pch_mode="2" />
		<Option compiler="gcc" />
		<Build>
			<Target title="Debug">
				<Option output="bin/Debug/${title}" prefix_auto="1" extension_auto="1" />
				<Option object_output="obj/Debug/" />
				<Option type="1" />
				<Option compiler="gcc" />
				<Compiler>
					<Add option="-g" />
				</Compiler>
			</Target>
			<Target title="Release">
				<Option output="bin/Release/${title}" prefix_auto="1" extension_auto="1" />
				<Option object_output="obj/Release/" />
				<Option type="1" />
				<Option compiler="gcc" />
				<Compiler>
					<Add option="-O2" />
				</Compiler>
				<Linker>
					<Add option="-s" />
				</Linker>
			</Target>
		</Build>
		<Compiler>
			<Add option="-Wall" />
			<Add option="-fexceptions" />
		</Compiler>
		<Unit filename="functions.cpp" />
		<Unit filename="general.hpp" />
		<Unit filename="header.hpp" />
		<Unit filename="main.cpp" />
		<Extensions>
			<code_completion />
			<envvars />
			<debugger />
		</Extensions>
	</Project>
</CodeBlocks_project_file>`

const _FUNCTIONS_CHECK_INTEGER_NUMBER_ = `bool check_integer_number(string input, int &value) {
    bool result = true;
    unsigned int i = 0;
    if (input.length() < 1)
        result = false;

    while (i < input.length() && result) {
        if (input.at(0) == '-' && i == 0) {
            if (input.length() - 1 >= i + 1)
                i++;
            else
                result = false;
        }

        if (!isdigit(input.at(i)))
            result = false;
        i++;
    }
    if (result == true)
        value = stoi(input);

    return result;
}`

const _FUNCTIONS_GET_TIME_ = `struct tm * getTime() {
    time_t now = time(nullptr);
    return localtime( & now);
}`

const _FUNCTIONS_CHECK_INTEGER_NUMBER_HEADER_ = `bool check_integer_number(string input, int &value);`
const _FUNCTIONS_GET_TIME_HEADER_ = `struct tm* getTime();`

module.exports = {
	_MAIN_CPP_,
	_FUNCTIONS_CPP_,
	_HEADER_HPP_,
	_GENERAL_HPP_,
	_PROJECT_CBP_,
	_FUNCTIONS_CHECK_INTEGER_NUMBER_,
	_FUNCTIONS_GET_TIME_,
	_FUNCTIONS_CHECK_INTEGER_NUMBER_HEADER_,
	_FUNCTIONS_GET_TIME_HEADER_,
}
