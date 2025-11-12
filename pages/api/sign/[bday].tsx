import { GetServerSideProps } from "next";
import SignModel from "../../../models/Sign.model";
import Image from "next/image";
import Head from "next/head";
import signs from "../../../data/mockedData";

type SignSharePageProps = {
    sign: SignModel;
    absoluteUrl: string;
};

export const getServerSideProps: GetServerSideProps<SignSharePageProps> = async ({
    params,
    req,
}) => {
    const bday = Number(params?.bday);
    const sign =
        signs.find((s) => bday >= s.initialDate && bday <= s.finalDate) ?? null;

    console.log(sign)


    if (!sign) {
        return { notFound: true };
    }

    const proto = (req.headers["x-forwarded-proto"] as string) || "https";
    const host = req.headers.host || "localhost:3000";
    const absoluteUrl = `${proto}://${host}`;

    return {
        props: {
            sign,
            absoluteUrl,
        },
    };
};

/**
 * @see https://ogp.me/
 */
const SignSharePage = ({ sign, absoluteUrl }: SignSharePageProps) => {
    const pageUrl = `${absoluteUrl}/sign/${sign.id}`;
    const imageUrl = new URL(
        (sign.image as string) ?? "/vercel.svg",
        absoluteUrl
    ).toString();

    return (
        <>
            <Head>
                <title>{`${sign.title} - Horoscope`}</title>
                <meta name="description" content={sign.profile} />
                <meta
                    property="og:title"
                    content={`${sign.title} - Horoscope`}
                />
                <meta property="og:description" content={sign.profile} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <main className="flex flex-col items-center justify-center min-h-screen p-8">
                <h1 className="text-3xl font-bold">{sign.title}</h1>
                <p className="mt-4 text-center max-w-prose">{sign.profile}</p>
                <Image
                    src={imageUrl}
                    alt={sign.title}
                    className="max-w-xs mt-6 rounded-lg shadow-lg"
                />
            </main>
        </>
    );
};

export default SignSharePage;
