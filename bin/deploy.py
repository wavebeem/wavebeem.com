#!/usr/bin/env python3
"""
Usage:
$ ./bin/deploy.py
$ ./bin/deploy.py -p
"""

import re
import subprocess
from argparse import ArgumentParser


CF_DISTRO = 'E1ENR65WLK5LCW'
S3_DEV = 's3://dev.mockbrian.com'
S3_PROD = 's3://mockbrian.com'


def run(command):
    """Runs a command in the shell and checks its return code"""
    text = re.sub(r'[\r\n]', ' ', command.strip())
    subprocess.run(text, shell=True, check=True)


def make_favicon():
    """Build the favicon"""
    return run("""
        convert
        favicon-16.png
        favicon-32.png
        favicon.ico
    """)


def jekyll(*args):
    """Invoke jekyll build with optional args"""
    run('bundle exec jekyll build {}'.format(' '.join(args)))


def sync(bucket):
    """Sync to a specified S3 bucket"""
    run("""
        aws s3 sync
        --acl public-read
        _site/
        {}
    """.format(bucket))


def invalidate(distro):
    """Invalidate a given Cloudfront distribution"""
    run("""
        aws cloudfront create-invalidation
        --distribution-id {}
        --paths "/*"
    """.format(distro))


def main():
    """Just the main..."""
    parser = ArgumentParser(description='Deploys mockbrian.com')
    parser.add_argument(
        '-p', '--production',
        action='store_true',
        help='deploy to production'
    )
    args = parser.parse_args()
    if args.production:
        jekyll()
        sync(S3_PROD)
        invalidate(CF_DISTRO)
    else:
        jekyll('--drafts')
        sync(S3_DEV)


main()
