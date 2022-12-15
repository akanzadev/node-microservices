import { useEffect } from 'react';
import Router from 'next/router';
import { useRequest } from '../../hooks/use-request';

export default function Signout() {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <div>Signing you out...</div>;
}
