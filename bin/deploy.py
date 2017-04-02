#!/usr/bin/env python3
"""
Usage:
$ ./bin/deploy.py
$ ./bin/deploy.py -p
"""


import subprocess
from argparse import ArgumentParser


CF_DISTRO = 'E1ENR65WLK5LCW'
S3_DEV = 's3://dev.mockbrian.com'
S3_PROD = 's3://mockbrian.com'


def run(*args, **kwargs):
    """Run a command using var args"""
    return subprocess.check_call(args, **kwargs)


def make_favicon():
    """Build the favicon"""
    return run(
        'convert',
        'favicon-16.png',
        'favicon-32.png',
        'favicon.ico'
    )


def jekyll(*args):
    """Invoke jekyll build with optional args"""
    run('bundle', 'exec', 'jekyll', 'build', *args)


def sync(bucket):
    """Sync to a specified S3 bucket"""
    run(
        'aws', 's3', 'sync',
        '--acl', 'public-read',
        '_site/',
        bucket
    )


def invalidate(distro):
    """Invalidate a given Cloudfront distribution"""
    run(
        'aws', 'cloudfront', 'create-invalidation',
        '--distribution-id', distro,
        '--paths', '/*'
    )


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
