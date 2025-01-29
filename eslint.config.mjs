import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Downgrade TypeScript no-unused-vars to warning
      '@typescript-eslint/no-unused-vars': 'warn',
      
      // Downgrade React Hooks exhaustive-deps to warning
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];

export default eslintConfig;