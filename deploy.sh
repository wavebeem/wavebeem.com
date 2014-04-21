#!/bin/bash
grunt &&
s3cmd sync --acl-public --no-progress build/ s3://mockbrian.com/
