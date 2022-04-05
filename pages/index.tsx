import type { GetStaticProps } from "next";
import Head from "next/head";
import QuoteBlock from "../components/QuoteBlock";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../components/context/LayoutContext";
import RandomButton from "../components/RandomButton";
import { useRouter } from "next/router";

type Props = {
  data: Quote;
};

type Quote = {
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
};

const Home = ({ data }: Props) => {
  const { loading, setLoading } = useContext(LayoutContext);
  const [quoteData, setQuoteData] = useState<Quote | null>(null);

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const generateRandomQuote = async () => {
    setLoading(true);
    const randomNumber = Math.floor(Math.random() * 7268);

    const req = await axios.get(
      "https://quote-garden.herokuapp.com/api/v3/quotes",
      { params: { limit: 1, page: randomNumber } }
    );

    const { quoteText, quoteAuthor, quoteGenre } = await req.data.data[0];

    const newQuote = {
      quoteText,
      quoteAuthor,
      quoteGenre,
    };

    setQuoteData(newQuote);
    setLoading(false);
  };

  const goToAuthorPage = () => {
    router.push(
      `${
        quoteData
          ? quoteData.quoteAuthor.toLowerCase()
          : data.quoteAuthor.toLowerCase()
      }`
    );
  };

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

      <main className="relative h-screen w-screen container flex flex-col justify-center items-center">
        <RandomButton handleClick={generateRandomQuote} />

        <QuoteBlock quote={quoteData ? quoteData.quoteText : data.quoteText} />

        <button
          onClick={goToAuthorPage}
          className="relative group w-full max-w-xl text-left px-4 lg:px-8 py-12 hover:bg-neutral-800 hover:text-white "
        >
          <h1 className="font-bold text-2xl">
            {quoteData ? quoteData.quoteAuthor : data.quoteAuthor}
          </h1>
          <h2 className="group-hover:text-gray-400">
            {quoteData ? quoteData.quoteGenre : data.quoteGenre}
          </h2>

          <span className="absolute right-0 top-2/4 -translate-y-2/4 pr-4 lg:pr-8 text-3xl ">
            &#8594;
          </span>
        </button>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const randomNumber = Math.floor(Math.random() * 7268);

  const req = await axios.get(
    "https://quote-garden.herokuapp.com/api/v3/quotes",
    { params: { limit: 1, page: randomNumber } }
  );

  const data: Props = await req.data.data[0];

  return {
    props: {
      data,
    },
  };
};
