import React, { useContext, useEffect } from "react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import QuoteBlock from "../components/QuoteBlock";
import RandomButton from "../components/RandomButton";
import { LayoutContext } from "../components/context/LayoutContext";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import Page404 from "../components/Page404";
import Router, { useRouter } from "next/router";

const quotes: string[] = ["sdkfgugfd", "lsdfip", "sdfugsadf"];

type Props = {
  data: Quote[];
  notFound: boolean;
};

type Quote = {
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
};

const Person = ({ data, notFound }: Props) => {
  const { setLoading } = useContext(LayoutContext);
  const router = useRouter();
  useEffect(() => {
    console.log(data, notFound);
  }, []);

  const getRandom = () => {
    setLoading(true);
    router.replace("/");
  };

  if (notFound) {
    return <Page404 />;
  }

  return (
    <>
      <Head>
        <title>Quotes</title>
        <meta
          name="description"
          content="A simple quote generator challenge by devchallenges.io"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen h-full w-screen container flex flex-col items-center">
        <RandomButton handleClick={getRandom} />

        <div className="w-full max-w-2xl text-left">
          <h1 className="mt-32 mb-24 lg:pl-20 text-3xl font-bold">
            {data[0].quoteAuthor}
          </h1>
        </div>

        {data.map((quote, index) => (
          <QuoteBlock key={index} quote={quote.quoteText} />
        ))}
      </main>
    </>
  );
};

export default Person;

interface IParams extends ParsedUrlQuery {
  quoteAuthor: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { quoteAuthor } = params as IParams;

  const res = await axios.get(
    "https://quote-garden.herokuapp.com/api/v3/quotes",
    { params: { author: quoteAuthor } }
  );

  const notFound: boolean = res.data.totalQuotes === 0;

  const data: Props = await res.data.data;

  return {
    props: {
      notFound,
      data,
    },
  };
};
