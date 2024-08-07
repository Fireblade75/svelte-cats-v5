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
You need top open db.sqlite as a database and execute the content of tables.sql to prepare all tables.

```bash
sqlite3 db.sqlite
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
