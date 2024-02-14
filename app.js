// This is the main routing function that is called for each incoming request
async function handler(req) {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const filename = path.split("/").pop();
    const directory = path.slice(0, path.lastIndexOf("/") + 1);

    if (method !== "GET") {
        return new Response(`Method '${method}' not allowed`, { status: 405 })
    }

    const contentTypeMap = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".ico": "image/vnd.microsoft.icon",
    };

    let file;
    try {
        if (path === "/") {
            file = await Deno.readFile(`${Deno.cwd()}/index.html`);
            return new Response(htmlContent, { headers: { "content-type": "text/html; charset=utf-8" }});
        } else {
            file = await Deno.readFile(`${Deno.cwd()}${path}`);
            /* The following extracts the file extension from the filename and chooses the correct header 
               content from the contenTypeMap based on the file extension, or defaults to text/plain */
            const contentType = contentTypeMap[filename.slice(filename.lastIndexOf("."))] || "text/plain";
            return new Response(file, { headers: { "content-type": contentType } });
        }
    } catch (error) {
        return new Response("404 Not Found", { status: 404 });
    }

}

const port = 8000
Deno.serve({ port: port }, handler);