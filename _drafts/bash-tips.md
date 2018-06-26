---
title: "Bash Tips"
description: "A few tips for writing less buggy bash scripts"
layout: post
tab: blog
---

## What

TODO: Mention that I'll be citing pieces of the bash man page and giving advice
on writing bash scripts with hopefully less bugs

## Shebang and bash vs sh

TODO: Use `#!/usr/bin/env bash` and don't run `sh my-file.sh`

Make sure the first line of your file is this:

```bash
#!/usr/bin/env bash
```

And then you can run `chmod +x my-file` and `./my-file` and it should launch the
latest version of bash. Some people write `#!/bin/bash`, but bash is not always
installed in `/bin`, so it's best to let the env command find the right version
of bash for you.

Alternatively, you can avoid `chmod +x` entirely and use `bash my-file` to
launch the script using the latest version of bash no matter what.

Note that you don't want to write `#!/bin/sh` or use `sh my-file` because on
some Linux and FreeBSD computers `/bin/sh` is actually a program called dash
which is not 100% compatible with bash.

## Double Quotes

Quick rule: 99% of the time when you use a `$variable`, you probably actually
want `"$variable"`. The difference is that in most contexts when you write
`$variable`, bash examines the contents and splits it up into multiple words.
Words are kind of like parameters or arguments from other languages. For
example:

```bash
name="hello world"

# This makes two folders:
# - hello/
# - world/
mkdir $name

# This makes one folder:
# - hello world/
mkdir "$name"
```

Note that if you use `$@` which is the special bash syntax for "all the
arguments" you actually _do_ want to keep it in quotes even though this seems
backwards. Bash considers arrays different from strings in its behavior with
double quotes.

```bash
Main() {
  printf "%s %.5f" "$@"
}

Main "I love" 3.14159
```

This will correctly print `I love 3.14159` whereas if you used `$@` instead of
`"$@"` then it would expand two _three_ words and printf would fail by trying to
print `love` as a floating point number.

## Naming Conventions

My advice is to make functions in PascalCase like `F` or `MyFunction` or
`CreateGzipBackup` because most commands that come from bash or are installed on
your computer are all lowercase like `grep` or `ssh-agent`, and the capital
letters help your functions stand out. I think it's ok to put dashes in your
function names (like `Create-Gzip-Backup`) if you think it's easier to read them
that way. But keep the Upper-Case-Letters so they look distinct.

For variables, I like using snake_case like `$i` or `$directory` or
`$file_length` because environment variables are typically written in
SCREAMING_SNAKE_CASE like `$HOME` or `$SSH_AUTH_SOCK` with all capital letters,
so it helps you know which variables are for your bash script and which ones are
coming from the environment.

## Use Local Variables

When you're inside a function, you should always make new variables using `local` like this:

```bash
Greet() {
  local name="$1"
  echo "Hello, $name"
}

Greet "Blaise"
# => Hello, Blaise
```

If you don't use `local` then `$name` will be available outside of `Greet` after
you call it, which can mess things up if you end up using two variables with the
same name.

## set -e

> Exit immediately if a simple command (see SHELL GRAMMAR above) exits with a
> non-zero status. The shell does not exit if the command that fails is part of
> the command list immediately following a while or until keyword, part of the
> test in an if statement, part of a && or || list, or if the command's return
> value is being inverted via !. A trap on ERR, if set, is executed before the
> shell exits.

## set -u

> Treat unset variables as an error when performing parameter expansion. If
> expansion is attempted on an unset variable, the shell prints an error
> message, and, if not interactive, exits with a non-zero status.

## set -x

> After expanding each simple command, for command, case command, select
> command, or arithmetic for command, display the expanded value of PS4,
> followed by the command and its expanded arguments or associated word list.

TODO: Explain how to turn this on and off to debug particular sections of bash

## Conclusion

TODO

Further reading: `getopts`
