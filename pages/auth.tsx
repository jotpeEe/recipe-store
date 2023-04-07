import { type GetServerSideProps, type NextPage } from 'next';
import { dehydrate } from 'react-query';

import { Slider } from '@components';
import { queryClient } from '@requests';
import { Login, Signup } from '@sections';

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Auth: NextPage = () => (
    <section className="m-auto w-screen py-14 md:max-w-3xl md:py-24">
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
