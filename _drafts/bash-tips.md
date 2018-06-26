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

## Double Quotes

TODO: Why you should always use double quotes with variables

## Naming Conventions

TODO: I think this probably avoids the most mistakes

- `FunctionLikeThis`
- `variables_like_this`

Both can be identified from even single letter variable names and stand out from
system commands or environment variables

## Use Local Variables

TODO

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
