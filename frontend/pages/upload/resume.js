import Layout from "../../components/layout/Layout";
import UploadResume from "../../components/user/UploadResume";

import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function UploadResumePage({ access_token }) {
  return (
    <Layout title="Upload Your Resume">
      <UploadResume access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access;

  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      access_token,
    },
  };
}
