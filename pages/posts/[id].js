import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
    //* Think about what the function names actually are!!!
    //! requires a list of objects with params keys and nested object with id key
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
  };
}

export async function getStaticProps({ params }) {
    //* occurs at build time
    // Fetch necessary data for the blog post using params.id
    const postData = getPostData(params.id);
    return { 
        props: {
            postData,
        },
    };
}