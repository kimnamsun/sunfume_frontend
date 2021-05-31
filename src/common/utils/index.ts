import jwt_decode from 'jwt-decode';

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const getCurrentUserFromToken = (token: string) => {
  const { user }: { user: Request } = jwt_decode(token);
  return user;
};
