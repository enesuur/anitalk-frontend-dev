import React from 'react';
import styles from './Page.module.css';
import { generateMockBlogs, generateMockComments } from '../_helpers/index';
import { IBlog } from '../_types';
import RecommendCard from '../_components/card/RecommendCard';
import Link from 'next/link';
import Divider from '@/shared/ui/hr/Divider';
import { Date as DateIcon } from '@/assets/icons';
import ScrollToTop from '@/shared/ui/scroller/Scroller';
import Image from 'next/image';
import getBlurDataURL from '@/libs/base64ph';
import EmblaCarousel from '@/shared/ui/swiper/Swiper';
import Comment from '@/components/comment/Comment';

const mockBlogs = generateMockBlogs(5);
const mockComments = generateMockComments(5);

// TODO: Figcaption
// Fallback public img cover.
// .

const Page: React.FC = async () => {
  const blurUrl = await getBlurDataURL('https://picsum.photos/1920/1080');
  return (
    <>
      <section style={{ margin: 0 }}>
        <div className={`${styles.boxContainer} container`}>
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

            <h1 className={styles.title}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, esse.
            </h1>

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
                <div className={styles.innerBox}>
                  <span>{13} minutes read time</span>
                  <span>
                    <DateIcon width={20} height={20} color={'#FFFFFF'} opacity={0.8} />
                    {'22 April 2024'}
                  </span>
                </div>
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
              expedita laborum quis.
            </p>
          </article>

          <div className={styles.recommendContainer}>
            <h3>You may interest</h3>
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

      {/* Test */}
      <div className='container'>
        <EmblaCarousel count={5} options={{ loop: true }} />
      </div>

      <div className='container'>
        <Divider text={'Comments'} />
      </div>

      <section>
        <div className={`${styles.commentContainer} container`}>
          <Comment
            key={1333}
            _id={'test'}
            text={`
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa repellat voluptate reiciendis dignissimos nobis veritatis doloribus dolore provident, sequi quo unde dolorum culpa soluta minima vitae perferendis rem alias blanditiis eum assumenda molestias ipsum! Modi adipisci corrupti aperiam officia quisquam, soluta maiores esse quibusdam quas, nesciunt veritatis sed mollitia voluptatum, sapiente amet magnam necessitatibus illo odio minima! Dolorem harum aperiam, tenetur enim adipisci molestiae dolore fuga saepe. Libero et accusamus quod nulla ex ipsum aspernatur ut quos consectetur expedita ipsam fugiat, vero iste, quisquam maxime eligendi quas consequuntur vitae, tempore officia soluta vel nostrum? Aut commodi ea inventore suscipit ut dolore.
                
                Autem quibusdam praesentium illum? Illum ipsam molestiae perspiciatis aspernatur est non nisi delectus consectetur optio quidem eius rem vero tempora reprehenderit ducimus sapiente tempore, quod maxime sed eaque fugit. Animi eligendi deserunt adipisci ea est accusamus? Minus laboriosam quidem suscipit beatae illo doloremque labore tenetur harum voluptates? Explicabo quos ipsam autem nihil tempora inventore culpa iure, cum reprehenderit commodi, nulla perferendis eligendi laboriosam cupiditate fuga adipisci, debitis excepturi obcaecati maiores odio alias vel deserunt? Ex ad quae id.

                  Autem quibusdam praesentium illum? Illum ipsam molestiae perspiciatis aspernatur est non nisi delectus consectetur optio quidem eius rem vero tempora reprehenderit ducimus sapiente tempore, quod maxime sed eaque fugit. Animi eligendi deserunt adipisci ea est accusamus? Minus laboriosam quidem suscipit beatae illo doloremque labore tenetur harum voluptates? Explicabo quos ipsam autem nihil tempora inventore culpa iure, cum reprehenderit commodi, nulla perferendis eligendi laboriosam cupiditate fuga adipisci, debitis excepturi obcaecati maiores odio alias vel deserunt? Ex ad quae id.  Autem quibusdam praesentium illum? Illum ipsam molestiae perspiciatis aspernatur est non nisi delectus consectetur optio quidem eius rem vero tempora reprehenderit ducimus sapiente tempore, quod maxime sed eaque fugit. Animi eligendi deserunt adipisci ea est accusamus? Minus laboriosam quidem suscipit beatae illo doloremque labore tenetur harum voluptates? Explicabo quos ipsam autem nihil tempora inventore culpa iure, cum reprehenderit commodi, nulla perferendis eligendi laboriosam cupiditate fuga adipisci, debitis excepturi obcaecati maiores odio alias vel deserunt? Ex ad quae id.
              `}
            date={new Date()}
            username={'res'}
            avatar_url={null}
            upVote={32}
            downVote={42}
          />
          {mockComments.map((item, index) => (
            <Comment
              key={index}
              _id={item._id}
              text={item.text}
              date={item.date}
              username={item.username}
              avatar_url={item.avatar_url}
              upVote={item.upVote}
              downVote={item.downVote}
            />
          ))}
        </div>
      </section>
      <ScrollToTop />
    </>
  );
};

export default Page;
