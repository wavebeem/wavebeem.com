all: resume

dist:
	./build.sh

resume: resume.tex
	pdflatex resume

clean:
	rm -f resume.pdf

.PHONY: dist
