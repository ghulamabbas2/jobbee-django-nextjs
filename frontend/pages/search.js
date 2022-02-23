import Layout from "../components/layout/Layout";
import Search from "../components/layout/Search";

export default function Index({ data }) {
  return (
    <Layout title="Search your jobs">
      <Search />
    </Layout>
  );
}
