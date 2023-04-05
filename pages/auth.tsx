import { type GetServerSideProps, type NextPage } from 'next';
import { dehydrate } from 'react-query';

import { Slider } from '@components';
import { Login, Signup } from 'client/sections/Auth';
import { queryClient } from '@requests';

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Auth: NextPage = () => (
    <section className="m-auto w-screen md:max-w-3xl py-14 md:py-24">
        <Slider>
            <Login />
            <Signup />
        </Slider>
    </section>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (req.cookies.access_token) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default Auth;
