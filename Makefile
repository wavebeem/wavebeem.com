resume:
	mkdir -p resume
	pandoc -s --template=template/resume.html resume.md > resume/index.html

deploy:
	./deploy.sh

.PHONY: deploy resume
