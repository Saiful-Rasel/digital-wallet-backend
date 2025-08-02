export interface TerrorSources {
  path: string;
  message: string;
}
export interface TGenericErrorResponse {
  statusCode: number;
  message: string;
  errorSources?: TerrorSources[];
}

export const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `${match[1]} already exist`,
     errorSources: [],
  };
};
