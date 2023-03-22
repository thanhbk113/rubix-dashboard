import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('có hay  ko session', session);
    if (!session) {
      return;
    }

    // if (session?.error === ERROR_TOKEN) {
    //   signOut();
    // }
  }, [session]);
  return <>{children}</>;
};

export default Auth;
