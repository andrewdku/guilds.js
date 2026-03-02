<div align="center">
  <img
    alt="guilds.js Logo"
    width="85"
    src="https://j7oyzrlowjq7eyu0.public.blob.vercel-storage.com/guildsjs-logo-round.png"
  />
</div>

<div align="center">
  <a href="https://guilds.js.org/">Docs</a> | 
  <a href="https://github.com/andrewdku/guilds.js/">GitHub</a> | 
  <a href="https://npmjs.com/package/guilds.js/">npm</a>
</div>
<h1 align="center">guilds.js</h1>

guilds.js is a Node.js library for using the [Discord API](https://discord.com/developers/docs/intro).

## Repository Structure

This monorepo houses both the documentation site and the npm library for guilds.js.

- **`docs/`**: This is where you'll find the source code and pages for the [documentation site](https://guilds.js.org). It's powered by Astro Starlight and is written in Markdown and MDX. Everything under `src/content/docs/api/` is automatically generated documentation for the guilds.js library.

- **`package/`**: This is where the main source code of the guilds.js library. It's written in TypeScript and is organized under the `src/` directory, including types, classes, utilities, functions, variables, and more. You can view it on npm [here](https://npmjs.com/package/guilds.js).

## Contributing

Pull requests are welcome. For major changes, make sure to open an issue first to discuss what you'd like to change. This project uses [pnpm](https://pnpm.io) for packages and scripts, and [Turborepo](https://turborepo.dev/) for the monorepo handling.

## License

Licensed under the [Apache License 2.0](LICENSE).
