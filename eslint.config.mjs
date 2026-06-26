import { defineConfig } from "eslint";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: __dirname });

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
]);
