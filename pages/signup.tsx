import { NextPage } from 'next';

import { SignUp } from '@features/auth';
import { PageLayout as Layout } from '@layouts';

/**
 * SignUp: The SignUp page of the web app
 * @return {JSX.Element} The JSX Code for the SignUp Page
 */

const SignUpPage: NextPage = () => (
    <Layout>
        <SignUp />
    </Layout>
);

export default SignUpPage;
