import Layout from "../components/layout/Layout";
import Home from "../components/Home";

import axios from "axios";

export default function Index({ data }) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URL}/api/jobs/`);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
}
