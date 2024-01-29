// Get the names of the files in the templates folder (used in routing)
const templates = [];
for await (const dirEntry of Deno.readDir("templates")) {
    templates.push(dirEntry.name);
}

// This is the main routing function that is called for each incoming request
async function handler(req) {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const filename = path.split("/").pop();
    const directory = path.slice(0, path.lastIndexOf("/") + 1);


    // Get information on the requested resource
    try {
        const fileInfo = await Deno.stat(`${Deno.cwd()}${path}`);
        //console.log(fileInfo);
    } catch (error) {
        console.error(`Error reading file info for ${path}:`, error);
    }


    // GET /
    if (method == "GET" && path == "/") {
        const htmlContent = await Deno.readTextFile("index.html");
        return new Response(htmlContent, {
            headers: {
                "content-type": "text/html; charset=utf-8",
            }
        });
    }

    // GET images/CV_photo.png
    if (method == "GET" && path == "/images/cv_photo.jpg") {
        const img = await Deno.readFile("images/cv_photo.jpg");
        return new Response(img, {
            headers: {
                "content-type": "image/jpeg",
            }
        });
    }

    // GET css/styles.css
    if (method == "GET" && path == "/styles.css") {
        const cssFile = await Deno.readTextFile("styles.css");
        return new Response(cssFile, {
            headers: {
                "content-type": "text/css",
            }
        });
    }

    // GET includeScript.js
    if (method == "GET" && path == "/includeScript.js") {
        const script = await Deno.readFile("includeScript.js");
        return new Response(script, {
            headers: {
                "content-type": "text/javascript",
            }
        });
    }

    // GET /templates/*
    if (method == "GET" && templates.includes(filename)) {
        const htmlContent = await Deno.readTextFile(`templates/${filename}`);
        return new Response(htmlContent, {
            headers: {
                "content-type": "text/html; charset=utf-8",
            }
        });
    }

    // GET favicon.ico
    if (method == "GET" && path == "/favicon.ico") {
        const icon = await Deno.readFile("favicon.ico");
        return new Response(icon, {
            headers: {
                "content-type": "image/vnd.microsoft.icon",
            }
        });
    }

}

const port = 8000
Deno.serve({ port: port }, handler);