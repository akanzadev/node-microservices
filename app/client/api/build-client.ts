import axios from 'axios';

export const buildClient = ({ req: { headers } }: any) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      /* headers, */
      headers: {
        Host: 'ticketing.dev',
        cookie: headers?.cookie,
      },
      timeout: 5000,
    });
  } else {
    return axios.create({
      baseURL: 'https://ticketing.dev',
    });
  }
};
