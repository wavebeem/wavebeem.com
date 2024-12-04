---
title: "7 tips for better bash"
description: "You'll be writing better bash code after following these 7 tips."
date: "2018-07-04"
---

## Who is this post for?

So, you're writing a bash script. You use bash in the terminal, but you're kinda
fumbling your way through using bash to write more complicated programs. Well,
keep reading. It can be hard to use bash effectively because it works so
differently from most other programming languages, but it is not impossible to
get better at it.

This post assumes you have familiarity with using bash interactively ("in the
terminal") and want to get better at writing scripts ("programs") to automate
your work.

If you're impatient, scroll to the bottom for a bash boilerplate with minimal
explanation to get you started.

## Shebang and bash vs sh

Make sure the first line of your file is this:

```bash
#!/usr/bin/env bash
```

Now you have two choices:

1.  Name the file `my-file`, run `chmod +x my-file`, and then use `./my-file` to
    run your script

2.  Save your file as `my-file.sh` and run your script using `bash my-file.sh`

Do not write `#!/bin/bash` or `#!/bin/sh` in your files, and do not run you're
scripts using `sh my-file`. The commands `bash` and `sh` effectively refer to
separate programs on many Linux computers, so you can have problems there.
Additionally, bash is not always installed in `/bin`. Remember that bash is a
more powerful language than sh and has more features due to it being over a
decade newer.

## Double quotes

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
`"$@"` then it would expand to _three_ words and printf would fail by trying to
print `love` as a floating point number.

```bash
sentences=(
  "bash can be kind of tough"
  "but it's useful to know how to use it"
  "so please keep reading"
)

for sentence in "${sentences[@]}"; do
  echo "$sentence"
done
# echo "bash can be kind of tough"
# echo "but it's useful to know how to use it"
# echo "so please keep reading"
```

Oddly enough this is the correct way to iterate over a bash array! If you forget
the quotes then bash will split up each word from the sentence and iterate over
that separately, giving you every word on a separate line:

```
bash
can
be
kind
of
tough
but
it's
useful
to
know
how
to
use
it
so
please
keep
reading
```

Finally, don't forget to also use quotes around command interpolation also:

```bash
mkdir $(echo "hello world")
```

This basically expands to the following after bash runs `$()` and splits the
result on whitespace:

```bash
mkdir hello world
```

Which makes two directories: one named "hello", and the other named "world".

Don't forget to use double quotes whenever you use `$`. It looks weird, but it's
actually ok to have `"` inside of `"` when you have `$()`! The correct version
looks like this:

```bash
mkdir "$(echo "hello world")"
# correctly makes one directory named "hello world"
```

## Naming conventions

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

## Use local variables

When you're inside a function, you should always make new variables using
`local` like this:

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

For more information, read up on dynamic variable scoping, which is fairly
unique to bash.

## set -e

This is the secret sauce. Without `set -e`, code quickly becomes littered with
lines like this:

```bash
npm run build:js &&
  cp build/bundle.js dist &&
  npm run build:css &&
  cp build/bundle.css dist || exit 1
```

or:

```bash
npm run build:js || exit 1
cp build/bundle.js dist || exit 1
npm run build:css || exit 1
cp build/bundle.css dist || exit 1
```

Most other languages would allow you to omit the error handling logic there and
automatically crash the script when a `cp` or `mv` command fails. But bash is
designed to be used interactively. Can you imagine if making a typo in your `cp`
command closed your terminal? That would be sad.

But you can opt-in to this behavior by putting `set -e` at the top of your
script. The full details from the bash man page are:

> Exit immediately if a simple command (see SHELL GRAMMAR above) exits with a
> non-zero status. The shell does not exit if the command that fails is part of
> the command list immediately following a while or until keyword, part of the
> test in an if statement, part of a && or || list, or if the command's return
> value is being inverted via !. A trap on ERR, if set, is executed before the
> shell exits.

Which roughly means that any standalone command will crash your script if it
exits with a nonzero code. So if your failing command is part of a pipeline or
an `if` condition it's not a problem and will still work great.

If you want to force a command to not crash your script you can append `|| true`
to the command and then it will always succeed:

```bash
mkdir /tmp || true
# Make directory /tmp or silently fail if
# permission denied or it exists already
```

## set -u

In most programming languages, referencing a variable that has not been declared
causes your program to crash. In bash, it gives you an empty string. This makes
it hard to detect typos or other missing data.

Luckily, `set -u` is an opt-in behavior to get error messages for using
undeclared variables.

```bash
set -u
message="hello there"
echo "$mesaage"
# bash: mesaage: unbound variable
```

This is also helpful if you forget to pass arguments to a bash function:

```bash
set -u

Greet() {
  local greeting="$1"
  local name="$2"
  echo "$greeting, $name."
}

Greet "Good morning"
# bash: $2: unbound variable
```

Luckily if you need to supply a default value for a variable in bash there is a
way to do it which will get around this error message:

```bash
set -u
echo "${undefined_variable:-my fallback value}"
# my fallback value
```

You can put any string you want after the `:-` and inside `${}`, even another
variable like this:

```bash
set -u
fallback="default value"
value="${my_var:-$fallback}"
echo "$value"
```

Or even multiple levels:

```bash
set -u
echo "${a:-${b:-c}}"
# echo "c"
```

In a lot of cases it's actually ok to get an empty string back, which is totally
possible here by putting _nothing_ after the `:-`:

```bash
set -u
echo "${value:-}"
# echo ""
```

Admittedly this syntax is pretty cryptic, but here's how I remember it: the
`:-}` is a little friend with a mustache saying "I hope you defined that
variable, but if not, I'm gonna give you an empty string!".

## set -x

`set -x` enables a debugging mode that prints out every command before bash runs
it.

```bash
set -x
echo "hello world"
date
# + echo 'hello world'
# hello world
# + date
# Wed Jun 27 22:30:10 PDT 2018
```

If you want to debug your whole script you can just put it right at the top, but
you can actually turn this _off_ by using `set +x` (yeah, it seems backwards to
me too).

```bash
FunctionOne
set -x
FunctionTwo
set +x
FunctionThree
FunctionFour
```

And boom, you're now debugging just one function.

## Conclusion

This might be a lot to take in. You can review this script which follows best
practices:

```bash
#!/usr/bin/env bash
set -eu

environment="${NODE_ENV:-production}"

files=(
  dist/*
  index.html
  "legal document.pdf"
)

Clean() {
  rm -rf dist
  mkdir dist
}

Build() {
  webpack --env "$environment"
  less main.less > dist/style.css
}

Deploy() {
  aws s3 sync dist/ s3://my-bucket/assets/
}

Clean
Build
Deploy
```

## Further reading

There is a lot to know with bash! So once you think you've mastered these tips,
you might want to check out the following links to learn more about programming
in bash.

The article [Use the Unofficial Bash Strict Mode (Unless You Looove
Debugging)][1] is the inspiration for this blog post. I don't agree with it
100%, but it's still a fun read, and goes into some things not mentioned here.

If you need to write an `if` statement in your script [you should use \[\[][2]
because it offers many useful features over the classic `[` conditional
expression.

The [dynamic variable scoping][3] in bash is different from almost every other
language.

[getopts][4] is the standard way to accept command line arguments.

Cleanup at the end of your script can be done via [trap][5].

Some scripts benefit from assuming they [run in the directory where they
live][6], instead of your current working directory.

It may seem like bash is entirely based around strings, but you can also have
[arrays of strings][7]!

[1]: http://redsymbol.net/articles/unofficial-bash-strict-mode/
[2]: https://stackoverflow.com/a/3427931
[3]: https://gist.github.com/jonpryor/b44439f7f01ad2af73c0
[4]: https://stackoverflow.com/a/16496491
[5]: http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html
[6]: https://stackoverflow.com/a/3355423
[7]: http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_10_02.html
