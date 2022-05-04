
# cht-sh
A Node cheat.sh CLI

# Install
    $ npm install --global cht-sh

# Usage
    $ cht-sh --help

	    Usage:
		    $ cht-sh <language>  <subtopic?>
		    $ cht-sh <language> hello			hello world + how to start the program
		    $ cht-sh <language> :learn			big cheat sheet for learning language from scratch
		    $ cht-sh <language> :list			list of subtopics
		    $ cht-sh <language> :random			fetches a random cheat sheet belonging to the topic

		    $ cht-sh :list						list all cheat sheets
		    $ cht-sh :post						how to post new cheat sheet
		    $ cht-sh :styles					list of color styles
		    $ cht-sh :styles-demo				show color styles usage examples
		    $ cht-sh :random					fetches a random cheat sheet

	    Options:
		    --help, -h							Shows this help message
		    --quiet, -q							Quiet mode, don't show github/twitter buttons
		    --text, -T							Text only, no ANSI sequences
		    --style, -s <style>					Sets  the  color  style
		    --no-comment,  -c					Do  not  comment  text,  do  not  shift  code (QUERY+  only)
		    --no-comment-shift,  -C				Do  not  comment  text,  shift  code (QUERY+  only)
		    --code-only,  -Q					Code  only, don't  show  text (QUERY+  only)

	    Examples:
		    $ cht-sh javascript generate random number
		    $ cht-sh golang generics