import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

const functions = ["generate-meme", "get-memes"];
const outputDir = "./output";

function buildConfig() {
  return functions.map((func) => ({
    input: `${func}.ts`,
    external: ["@hubspot/api-client", "axios", "form-data", "soap"],
    output: {
      dir: outputDir,
      format: "cjs",
      generatedCode: {
        preset: "es5",
      },
    },
    plugins: [json(), typescript()],
  }));
}

export default buildConfig();