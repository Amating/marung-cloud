/**
 * Fast web-only build for deployment.
 * Runs `expo export --platform web` and outputs to static-build/web/.
 */
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "static-build", "web");

function getDeploymentDomain() {
  const raw =
    process.env.REPLIT_INTERNAL_APP_DOMAIN ||
    process.env.REPLIT_DEV_DOMAIN ||
    process.env.EXPO_PUBLIC_DOMAIN ||
    "";
  if (!raw) {
    console.error("ERROR: No deployment domain env var found.");
    process.exit(1);
  }
  let host = raw.trim().replace(/^https?:\/\//, "");
  return host;
}

function rewriteHtmlPaths(dir, basePath) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      rewriteHtmlPaths(full, basePath);
    } else if (entry.name.endsWith(".html")) {
      let html = fs.readFileSync(full, "utf-8");
      html = html.replace(/(src|href)="\/(favicon|_expo)\//g, `$1="${basePath}$2/`);
      fs.writeFileSync(full, html);
    }
  }
}

async function main() {
  console.log("Building Marung Cloud web export...");

  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const domain = getDeploymentDomain();
  const basePath = (process.env.BASE_PATH || "/").replace(/\/+$/, "") + "/";

  const env = {
    ...process.env,
    EXPO_PUBLIC_DOMAIN: domain,
    NODE_ENV: "production",
  };

  console.log(`Exporting web app to ${outDir}...`);

  await new Promise((resolve, reject) => {
    const proc = spawn(
      "pnpm",
      ["exec", "expo", "export", "--platform", "web", "--output-dir", outDir],
      { stdio: "inherit", cwd: projectRoot, env },
    );
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`expo export failed with exit code ${code}`));
    });
    proc.on("error", reject);
  });

  console.log("Rewriting asset paths for base URL:", basePath);
  rewriteHtmlPaths(outDir, basePath);

  console.log("Web export complete.");
  console.log(`Output: ${outDir}`);
}

main().catch((err) => {
  console.error("Build failed:", err.message);
  process.exit(1);
});
