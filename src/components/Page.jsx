import Head from "next/head";


export default function Page({ title, children }) {
  return (
    <>
      <Head>
        {title ? <title>{title}</title> : null}
      </Head>

      <div style={{ height: '100%' }}>
        {children}
      </div>
    </>
  );
};