'use server';
import React from 'react';
import { generateMockBlogs, generateMockComments } from '@/data/index';
import { IBlog } from '@/types/global';
import RecommendCard from '../_components/card/RecommendCard';
import Link from 'next/link';
import Divider from '@/shared/ui/hr/Divider';
import { Date as DateIcon } from '@/assets/icons';
import ScrollToTop from '@/shared/ui/scroller/Scroller';
import Image from 'next/image';
import getBlurDataURL from '@/lib/base64ph';
import Comment from '@/components/comment/Comment';
import ReadProgressBar from '@/shared/ui/progress/ReadProgress';
import { H1, H2, H3 } from '@/shared/ui/headings';
import CommentCount from '@/shared/ui/comment-count/CommentCount';
import LatestBlogCard from '@/shared/ui/cards/latest-blog/LatestBlogCard';
import Sort from '@/components/sort/Sort';
import styles from './Page.module.css';

const mockBlogs = generateMockBlogs(5);
const mockComments = generateMockComments(5);

// TODO: Figcaption
// Fallback public img cover.
// Sadece object olarak prop girecek.

const Page: React.FC = async () => {
  const blurUrl = await getBlurDataURL('https://picsum.photos/1920/1080');

  return (
    <React.Fragment>
      <ReadProgressBar />
      <section>
        <div className='container'>
          <div className={styles.blogBox}>
            <figure>
              <picture>
                <Image
                  src={'https://picsum.photos/1920/1080'}
                  alt={'Awesome Blog Image'}
                  fill={true}
                  objectFit={'cover'}
                  className={styles.img}
                  objectPosition={'center'}
                  quality={90}
                  placeholder={'blur'}
                  blurDataURL={blurUrl}
                />
              </picture>
            </figure>

            <H1 className={styles.title}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, esse.
            </H1>

            <div className={styles.infoBox}>
              <Link href={`user/${1}`} className={styles.userBox}>
                <picture>
                  <Image
                    src={'https://picsum.photos/128/128'}
                    alt={'Awesome Blog Image'}
                    fill={true}
                    objectFit={'cover'}
                    className={styles.img}
                    objectPosition={'center'}
                    quality={90}
                    placeholder={'blur'}
                    blurDataURL={blurUrl}
                  />
                </picture>
              </Link>
              <div className={styles.detailBox}>
                <Link href={`/user/${99}`}>@coolusername</Link>
                <p className={styles.innerBox}>
                  <span>{13} minutes read time</span>
                  <span>
                    <DateIcon width={20} height={20} color={'#FFFFFF'} opacity={0.8} />
                    {'22 April 2024'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={`${styles.contentWrapper} container`}>
          <article className={styles.blogBody}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vel eum tenetur iure
              dolorum repellat ratione facilis qui pariatur quia, architecto, eligendi, ullam
              facere. Sit exercitationem iure dolor repudiandae nesciunt. Blanditiis molestiae iste
              ipsum! Possimus, voluptatem nulla laborum totam temporibus voluptates quam. Illo
              consequatur tempore corporis facilis corrupti nihil eveniet beatae? At temporibus
              aspernatur eius iure, unde voluptates, voluptatem harum amet ipsam quis rem voluptate
              rerum dolore itaque laboriosam necessitatibus suscipit error, velit saepe facere
              accusantium exercitationem molestias veritatis. Similique illum aliquid, sit vel rem
              magni magnam quam deserunt temporibus tempore culpa at, reprehenderit tenetur saepe
              amet natus facilis voluptatum soluta quisquam cumque, ut repellendus consequuntur
              omnis ea. Labore corrupti optio reiciendis obcaecati iste error delectus numquam, fuga
              qui voluptas recusandae odio saepe in incidunt aut ipsam quos officia tempora officiis
              blanditiis ex nostrum voluptate? Ex maiores nostrum assumenda aut nulla ducimus, eaque
              consequatur! Officiis hic sequi ullam voluptatibus accusantium magni quo, perspiciatis
              possimus aliquam delectus accusamus excepturi laboriosam harum unde, et esse ad libero
              corporis. Molestias hic doloribus magni excepturi quaerat recusandae odio porro
              officia. Architecto ea expedita suscipit. Laboriosam nam accusantium alias amet
              asperiores, obcaecati dicta quis ab laudantium quae ipsum sequi inventore id, debitis
              natus magnam corporis modi. Dolore quia sint sed, rerum quod, voluptatem architecto
              saepe sit quaerat dolorum cum. Minima error, illum numquam vel modi distinctio
              provident a quo pariatur rerum. Natus enim, et, qui repellendus est harum magnam
              dolore minus ipsum fuga nisi quis placeat quas aut! Nesciunt dolor maiores esse
              dolore, aut laudantium tenetur tempore nam autem possimus? Necessitatibus quis
              voluptates, atque numquam asperiores, magni vero consequatur nemo, quae commodi odit
              fuga quasi? Excepturi nostrum libero inventore reprehenderit blanditiis? Distinctio
              praesentium libero soluta sunt explicabo molestias excepturi nihil quaerat iure quae
              repellendus sapiente tenetur inventore, asperiores, facilis esse cupiditate in dolore
              aspernatur ea ad est optio. Autem cupiditate sequi quia non cumque veniam neque odit
              corporis nesciunt, animi vel vero culpa, velit labore consectetur nisi magni incidunt
              delectus nemo esse? Totam ipsa temporibus consequatur dolore dolorem quaerat veritatis
              eligendi adipisci sunt maiores rerum molestiae quidem nostrum ex nesciunt, illo
              voluptatum mollitia sapiente inventore! Aspernatur dignissimos eius tenetur nam
              repudiandae, eligendi excepturi id ipsam. Consectetur exercitationem vel consequuntur
              debitis quae facilis nesciunt eaque voluptatem, voluptas nemo veritatis? Ipsum sed
              quaerat modi saepe, quos accusantium necessitatibus voluptas asperiores reprehenderit
              ipsam tenetur officia totam nulla dolorem iusto vero inventore in quae obcaecati porro
              expedita laborum quis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ducimus quae voluptatem similique modi quis expedita, repellendus voluptatibus
              ratione, quia iure nobis dignissimos nulla fuga commodi voluptates nam a aliquid quasi
              hic eveniet. Cum et, perspiciatis quaerat numquam ullam dolores fuga deleniti nisi
              exercitationem doloribus rerum distinctio eum! Vero, fugiat officia, saepe fugit sunt
              eligendi obcaecati optio minima nemo officiis quia error natus consequuntur iusto
              iste. Vitae corrupti aut, fugit enim dolorem quibusdam ratione atque quas veritatis
              voluptatibus nulla placeat in ipsam sint illo ut, vel ex tenetur ipsum fuga quis
              tempora! Blanditiis fuga, quia adipisci, repellendus sequi ipsam laudantium
              doloremque, error sint asperiores quae fugiat perferendis id ex nobis! Alias ullam
              accusamus sint fuga dolorem impedit nostrum placeat quisquam vitae odio. Nam nihil est
              cum distinctio vitae commodi optio natus laborum tenetur adipisci voluptatibus harum
              asperiores atque impedit qui maiores, aut dolorem? Ducimus ea quod architecto aliquam
              voluptatum. Possimus officia ab magni, aspernatur beatae repellendus aperiam cum nulla
              iusto nobis quibusdam amet quaerat harum doloribus fugiat obcaecati ratione tempore
              dicta cupiditate ad numquam molestiae quo facere eaque. Cupiditate, alias suscipit
              sint sit accusantium repellat? Quae voluptatum delectus, est quia fugiat voluptatibus
              quas alias ullam obcaecati at dolores repellat, neque dolor vitae numquam blanditiis
              eum rem modi quod natus magnam deserunt. Autem cumque quis sequi, odit accusamus
              dolores rerum quae laboriosam qui, eaque, dolor tempore eius nulla inventore iste
              deleniti in suscipit vitae! Nihil quasi veritatis possimus blanditiis animi? Nobis
              adipisci expedita, labore suscipit nulla praesentium ut distinctio vel necessitatibus.
              Culpa assumenda neque, cumque vero rerum, velit sed eligendi harum numquam laborum
              ducimus, animi nostrum fuga. Laborum rerum dolores ipsam labore magnam, fugit illum
              aspernatur perspiciatis nulla temporibus dolorem eum ea aliquid totam assumenda
              reiciendis! Commodi dolorem beatae necessitatibus totam consequuntur sunt repudiandae
              aut quam eum corporis, sequi laudantium odio, natus perspiciatis ab repellendus,
              soluta incidunt hic distinctio temporibus accusamus voluptatum impedit nostrum.
              Soluta, dolorum eius facere atque tempore incidunt ab, fugit ex quisquam eaque non eos
              nihil. Quia similique iste facere temporibus recusandae voluptates vel, hic dolorum
              praesentium neque quidem maiores dolorem, alias sapiente? Aliquid quo a obcaecati
              repellat dignissimos natus unde odit neque. Nesciunt quibusdam veniam modi delectus
              aut tempora molestiae corporis molestias libero debitis, voluptas omnis officiis
              fugiat obcaecati voluptate nulla illum rerum doloremque exercitationem consequuntur
              tenetur, sint incidunt. Dolores ex, amet perspiciatis adipisci dolore et non neque
              aliquid, delectus ducimus unde nisi dicta voluptas dolor. Harum, voluptatem?
            </p>
          </article>

          <div className={styles.recommendContainer}>
            <H3 style={{ margin: 0 }}>You may interest</H3>
            {mockBlogs.map((blog: Partial<IBlog>, index: number) => (
              <RecommendCard
                key={index}
                title={blog.title || 'Default Title'}
                date={blog.date || new Date()}
                img_url={blog.img_url || 'default-image-url.jpg'}
                slug={blog.slug || 'Test'}
                _id={blog._id || 'Test'}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='container'></div>
      </section>

      {/* TODO: no need so much props only blog object.*/}
      {/* --- Blog Recommendation for web --- */}
      <div className='container'>
        <div className={styles.latestBlogContainer}>
          <H2>
            People also <span className={'highlight-text'}>read </span>
            related blogs
          </H2>
          {mockBlogs.map((item: Partial<IBlog>, index: number) => (
            <LatestBlogCard
              key={item._id || index}
              _id={item._id ?? ''}
              title={item.title ?? ''}
              snippet={item.snippet ?? ''}
              date={item.date ?? new Date()}
              img_url={item.img_url ?? ''}
              author={item.author ?? ''}
              slug={item.slug ?? ''}
              label={{
                title: item.label?.title ?? '',
                color: item.label?.color ?? '',
              }}
              comments={item?.comments || []}
            />
          ))}
        </div>
      </div>

      <Divider text={'Comments'} className={'container'} style={{ margin: '0 auto' }} />
      {/* --- Comment Section --- */}

      {/* TODO: Functionality. */}
      <section>
        <div className='container'>
          <div className={styles.commentsHeaderBox}>
            <CommentCount count={32} />
            <Sort />
          </div>
          <div className={styles.commentContainer}>
            {mockComments.map((item, index) => (
              <Comment
                key={index}
                _id={item._id}
                text={item.text}
                date={item.date}
                username={item.username}
                avatar_url={item.avatar_url}
                upVote={item.upvote}
                downVote={item.downvote}
              />
            ))}
          </div>
        </div>
      </section>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Page;
