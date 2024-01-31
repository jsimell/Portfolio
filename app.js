// This is the main routing function that is called for each incoming request
async function handler(req) {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const filename = path.split("/").pop();
    const directory = path.slice(0, path.lastIndexOf("/") + 1);

    // Handling of GET requests
    if (method ==  "GET") {

        // Get information on the requested resource
        let fileInfo = {};
        try {
            fileInfo = await Deno.stat(`${Deno.cwd()}${path}`);
        } catch (error) {
            return new Response("404 Not Found", {
                headers: {
                    status: 404,
                }
            });
        }
 
        if (fileInfo.isDirectory) {

            // GET /
            if (path == "/") {
                const htmlContent = await Deno.readFile(`${Deno.cwd()}/index.html`);
                return new Response(htmlContent, {
                    headers: {
                        "content-type": "text/html; charset=utf-8",
                    }
                });
            }

        } else if (fileInfo.isFile) {

            // Read the requested file
            const file = await Deno.readFile(`${Deno.cwd()}${path}`);

            if (/\.html$/.test(filename)) {
                return new Response(file, {
                    headers: {
                        "content-type": "text/html",
                    }
                });
            } else if (/\.css$/.test(filename)) {
                return new Response(file, {
                    headers: {
                        "content-type": "text/css",
                    }
                });
            } else if (/\.js$/.test(filename)) {
                return new Response(file, {
                    headers: {
                        "content-type": "text/javascript",
                    }
                });
            } else if (/\.jpg$/.test(filename)) {
                return new Response(file, {
                    headers: {
                        "content-type": "image/jpg",
                    }
                });
            } else if (/\.png$/.test(filename)) {
                return new Response(file, {
                    headers: {
                        "content-type": "image/png",
                    }
                });
            } else if (/\.ico$/.test(filename)) {
                return new Response(file, {
                    headers: {
                        "content-type": "image/vnd.microsoft.icon",
                    }
                });
            }
        }
    }
}

const port = 8000
Deno.serve({ port: port }, handler);