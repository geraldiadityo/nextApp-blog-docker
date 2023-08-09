import Head from 'next/head'
import { CardPublik, CategoriePublic } from '@/widgets';
import PublicLayout from '@/components/publik/PublicLayout';
import { postServices } from '@/services/post.services';
import prisma from '@/lib/prisma';
import { useState, useEffect } from 'react';
export const getServerSideProps = async() => {
  const AllArticle = await postServices.getAllPost();
  const newArticle = await prisma.post.findFirst({
    where:{
      published: true
    },
    orderBy: {
      publishAt: 'desc'
    },
    include: {
      author: true,
      categorie: true,
    }
  });

  return {
    props: {
      allArticle: AllArticle.data,
      newArticle: JSON.parse(JSON.stringify(newArticle)),
    }
  }
};
export default function Home({ allArticle, newArticle}) {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    setArticles(allArticle);
  },[allArticle, newArticle]);


  return (
    <>
      <header className="py-5 bg-light border-bottom mb-4">
        <div className="container">
          <div className="text-center my-5">
            <h1 className="fw-bolder">Welcome to Geraldi Media</h1>
            <p className="lead mb-0">News and Media Geraldi Adityo LTD</p>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {newArticle &&
              <CardPublik data={newArticle} />
            }
            {!newArticle &&
              <div>No data to Display</div>
            }
            <div className='row'>
              <div className="col-lg-12">
                <div className='row'>
                  {articles && articles.map((data, index) => {
                    return (
                      <div className='col-lg-6' key={index}>
                        <CardPublik data={data} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <CategoriePublic/>
          </div>
        </div>
      </div>
    </>
  )
}

Home.Layout = PublicLayout;
