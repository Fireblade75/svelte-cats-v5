# Svelte Cats v5

This project is a demo project for the following technologies:
- Svelte 5
- Drizzle ORM
- Lucia 3

## Setting up the project

To set up the project we use [PnPM](https://pnpm.io/)

```bash
# To install the dependencies you use the following command
pnpm instal
```

The next step is to set up the database, We use a [SQLite](https://www.sqlite.org/) database.
If you just want an empty database with the tables in tables.sql you can use db.base.sqlite

```bash
# Copy db.base.sqlite to db.sqlite
cp db.base.sqlite db.sqlite
```
If you want to make changes to the table structure you need to create your own db.sqlite.
First make the changes to tables.sql, delete db.sqlite and run the following command to create a new database

```bash
sqlite3 db.sqlite
```

Now you can copy all the create tables staments from tables.sql.

## Installing sqlite3

You can install sqlite3 trough node, or use the package manager of your operating system.


```bash
# PnPM
pnpm add -g sqlite3

# NPM
npm install -g sqlite3

# Brew (Mac OS)
brew install sqlite3

# Fedora / CentOS / RHEL
sudo dnf install sqlite

# Ubuntu
sudo apt install sqlite3

# Windows (trough Choco)
choco install sqlite

```

## Developing

Once you've dowloaded all the required dependencies and created the tables you can run the project using the following command

```bash
pnpm run dev
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
