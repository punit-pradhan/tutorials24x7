# Drupal Recommended Project template
---

## Overview

This project template provides a starter kit for managing your site dependencies with [Composer](https://getcomposer.org/).


## Requirements

- Composer - You can download composer from [here](https://getcomposer.org/download/)
- Lando (v3.11) - You can follow the instructions for downloading lando from [here](https://docs.lando.dev/getting-started/installation.html).

## Usage

> Note: Currently this project is being dev state.

You can create the project with -

```
composer create-project innoraft/drupal-recommended-project:dev-master <project-name>
```

After creating the project you will need to change few things inside the `.lando.yml` file

- Change the project name

```
name: drupal-starter-project
```

- Change the `DRUSH_OPTIONS_URI` for the tooling options with drush.

```
drush:
    service: appserver
    cmd: vendor/drush/drush/drush
    env:
      DRUSH_OPTIONS_URI: "https://drupal-starter-project.lndo.site"
```

After changing the .lando.yml you can run - 

```
lando start
```

## What does the template do?

This project tempalte uses lando for setting up drupal site. 

- This project adds a few contrib modules that is being generally used in Innoraft
- With help of lando, xdebug is setup automatically for the sites. And various tooling options are being provided for enabling and disabling the xdebug.
- [innoraft/drupal-quality-checker](https://packagist.org/packages/innoraft/drupal-quality-checker) has been used for maintaing drupal coding standards. Also lando tooling has been provided for using phpcs & phpcbf.
- Various configuration files being used for nginx, mysql & vhosts has used according to Innoraft needs, located inside the `.lando` directory.


### Setup Xdebug & VScode with this project.

- This project is setup with the changes php.ini file & lando.yml file changes.
- Also lanunch.json has been updated inside .vscode directory.
- To enable xdebug with vscode you will need to add an extension [PHP Debug](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)


### Use of phpcs & phpcbf tools with VScode

- lando tooling has already being added so `lando phpcs` & `lando phpcbf` can be use for using phpcs & phpcbf tools.
- In order to integrate phpcs & phpcbf with vscode i.e. to use Format file on save or linting drupal coding standards you can use two extensions [phpcs](https://marketplace.visualstudio.com/items?itemName=shevaua.phpcs) & [phpcbf](https://marketplace.visualstudio.com/items?itemName=persoderlind.vscode-phpcbf). Settings for these extensions are being added in the project.



## Recommended modules

- [drupal/admin_audit_trail](https://www.drupal.org/project/admin_audit_trail) - This module track logs of specific events that you'd like to review. The events performed by the users (using the forms) are saved in the database and can be viewed on the page admin/reports/audit-trail.
