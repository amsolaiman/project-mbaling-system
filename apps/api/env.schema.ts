import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const envSchema = Yup.object({
  // HOST
  HOST_URL: Yup.string()
    // .url('Must be a valid URL')
    .required('HOST_URL is required'),

  // JWT TOKEN
  JWT_SECRET_ACCESS_KEY: Yup.string().required(
    'JWT_SECRET_ACCESS_KEY is required'
  ),
  JWT_SECRET_REFRESH_KEY: Yup.string().required(
    'JWT_SECRET_REFRESH_KEY is required'
  ),
  JWT_ACCESS_EXPIRATION: Yup.string()
    .matches(
      /^\d+[smhd]$/,
      'JWT_ACCESS_EXPIRATION must be a number followed by s, m, h, or d'
    )
    .required('JWT_ACCESS_EXPIRATION is required'),
  JWT_REFRESH_EXPIRATION: Yup.string()
    .matches(
      /^\d+[smhd]$/,
      'JWT_REFRESH_EXPIRATION must be a number followed by s, m, h, or d'
    )
    .required('JWT_REFRESH_EXPIRATION is required'),

  // CORS
  CORS_ORIGIN: Yup.string().required('CORS_ORIGIN is required'),
  CORS_METHODS: Yup.string()
    .matches(
      /^(GET|POST|PUT|DELETE|OPTIONS)(,\s*(GET|POST|PUT|DELETE|OPTIONS))*$/,
      'CORS_METHODS must be a comma-separated list of valid HTTP methods'
    )
    .required('CORS_METHODS is required'),
  CORS_HEADERS: Yup.string()
    .matches(
      /^[\w-]+(,\s*[\w-]+)*$/,
      'CORS_HEADERS must be a comma-separated list of valid headers'
    )
    .required('CORS_HEADERS is required'),
});

export const envClientSchema = Yup.object({
  // HOST
  NEXT_PUBLIC_HOST_URL: Yup.string()
    // .url('Must be a valid URL')
    .required('NEXT_PUBLIC_HOST_URL is required'),

  // JWT TOKEN
  NEXT_PUBLIC_JWT_SECRET_ACCESS_KEY: Yup.string().required(
    'NEXT_PUBLIC_JWT_SECRET_ACCESS_KEY is required'
  ),
  NEXT_PUBLIC_JWT_SECRET_REFRESH_KEY: Yup.string().required(
    'NEXT_PUBLIC_JWT_SECRET_REFRESH_KEY is required'
  ),
  NEXT_PUBLIC_JWT_ACCESS_EXPIRATION: Yup.string()
    .matches(
      /^\d+[smhd]$/,
      'NEXT_PUBLIC_JWT_ACCESS_EXPIRATION must be a number followed by s, m, h, or d'
    )
    .required('NEXT_PUBLIC_JWT_ACCESS_EXPIRATION is required'),
  NEXT_PUBLIC_JWT_REFRESH_EXPIRATION: Yup.string()
    .matches(
      /^\d+[smhd]$/,
      'NEXT_PUBLIC_JWT_REFRESH_EXPIRATION must be a number followed by s, m, h, or d'
    )
    .required('NEXT_PUBLIC_JWT_REFRESH_EXPIRATION is required'),

  // CORS
  NEXT_PUBLIC_CORS_ORIGIN: Yup.string().required(
    'NEXT_PUBLIC_CORS_ORIGIN is required'
  ),
  NEXT_PUBLIC_CORS_METHODS: Yup.string()
    .matches(
      /^(GET|POST|PUT|DELETE|OPTIONS)(,\s*(GET|POST|PUT|DELETE|OPTIONS))*$/,
      'NEXT_PUBLIC_CORS_METHODS must be a comma-separated list of valid HTTP methods'
    )
    .required('NEXT_PUBLIC_CORS_METHODS is required'),
  NEXT_PUBLIC_CORS_HEADERS: Yup.string()
    .matches(
      /^[\w-]+(,\s*[\w-]+)*$/,
      'NEXT_PUBLIC_CORS_HEADERS must be a comma-separated list of valid headers'
    )
    .required('NEXT_PUBLIC_CORS_HEADERS is required'),
});

export type EnvSchemaType = Yup.InferType<typeof envSchema>;

export type EnvClientSchemaType = Yup.InferType<typeof envClientSchema>;

// ----------------------------------------------------------------------

export const validateEnv = (): EnvSchemaType => {
  try {
    return envSchema.validateSync(process.env, {
      abortEarly: false,
    }) as EnvSchemaType;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(
        `Environment variable validation failed: ${error.errors.join(', ')}`
      );
    }
    throw error;
  }
};

export const validateEnvClient = (
  env: Record<string, string>
): EnvClientSchemaType => {
  return envClientSchema.validateSync(env, { abortEarly: false });
};

export const env = validateEnv();

// ----------------------------------------------------------------------

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvClientSchemaType {}
  }
}
