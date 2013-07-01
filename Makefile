all: resume

resume: resume.tex
	pdflatex resume

clean:
	rm -f resume.pdf
