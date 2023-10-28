
export enum EnvNames {
  PROD = 'production',
  DEV = 'development',
}
type EnvName = EnvNames.PROD | EnvNames.DEV;

export interface EnvConfig {
  apiURL: string;
  env: EnvName;
}

const ENV_CONFIGS: Record<EnvName, EnvConfig> = {
    production: {
      apiURL: process.env.API_URL || 'http://localhost:5000',
      env: EnvNames.PROD,
    },
    development: {
      apiURL: process.env.API_URL || 'http://localhost:5000',
      env: EnvNames.DEV,
    },
  };

export function getEnvConfig(): EnvConfig {
  const nodeEnv = process.env.NODE_ENV as EnvName;
  return ENV_CONFIGS[nodeEnv];
}
