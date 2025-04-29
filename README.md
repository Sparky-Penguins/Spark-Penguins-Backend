# Sparky Penguins Server

To build this project:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open a terminal and run:
<pre>npm install</pre>
This will install the required dependencies.

3. Then run:
<pre>node server.js</pre>
This will start the server on `localhost:3232`.

---

Next, go to [https://github.com/Sparky-Penguins/sparky-penguins.github.io](https://github.com/Sparky-Penguins/sparky-penguins.github.io) and download the main website code.

In the `index.html` file, replace the value of `const serverURL` with the server endpoint.

If you're running this locally, use:

```javascript
const serverURL = "http://localhost:3232";
