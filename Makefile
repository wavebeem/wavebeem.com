resume: resume.tex
	pdflatex resume

dist: resume
	./build.sh

clean:
	rm -f resume.pdf

.PHONY: dist
