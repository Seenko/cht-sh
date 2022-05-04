
# cht-sh
A node based command line tool interface for cht.sh

# Install
    $ npm install --global cht-sh

# Usage
The tool can be ivoked using either `cht-sh`, `chtsh` or `cht`.

	$ cht-sh --help

		Usage: cht-sh [options] <topic> [subtopic...]

		A node based command line tool interface for cht.sh

		Arguments:
			topic                         The topic or language to search for
			subtopic                      The query to search for a the defined topic

		Options:
			-V, --version                 output the version number
			-q, --quiet                   Quiet mode, don't show github/twitter buttons
			-T, --text                    Text only, no ANSI sequences
			-s, --style <style>           Sets the color style
			-c, --comment-disabled        Do not comment text, do not shift code (QUERY+ only)
			-C, --comment-disabled-shift  Do not comment text, shift code (QUERY+ only)
			-Q, --code-only               Code only, don't show text (QUERY+ only)
			--debug                       Prints a debug message in case of an error
			-h, --help                    display help for command