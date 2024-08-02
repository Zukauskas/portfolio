import TerminalPortfolio from '@/app/components/terminal/TerminalPortfolio';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zukauskas.dev Portfolio</title>
        <meta name="description" content="A terminal-style developer portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TerminalPortfolio />
      </main>
    </div>
  );
};

export default Home;

