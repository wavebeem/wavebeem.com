#!/bin/bash
grunt &&
s3cmd sync --acl-public --no-progress dist/ s3://mockbrian.com/
