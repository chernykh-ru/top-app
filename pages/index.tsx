import { useState } from 'react';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { Button, Htag, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);

  return (
    <>
      <Htag tag='h1'>Hello</Htag>
      <Button appearance='primary' arrow='right'>
        Push me
      </Button>
      <Button appearance='ghost' arrow='right'>
        Push me
      </Button>
      <P size='sm'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt excepturi expedita commodi! Molestias, vitae
        ipsum!
      </P>
      <P>
        Eos, voluptatum molestiae impedit sequi culpa unde, nostrum, beatae delectus mollitia hic et reprehenderit
        ducimus?
      </P>
      <P size='lg'>Sunt excepturi expedita commodi! Molestias, vitae ipsum!</P>
      <Tag size='sm' color='primary'>
        Работа в Photoshop
      </Tag>
      <Tag size='sm' color='green'>
        -10 000 &#8381;
      </Tag>
      <Tag size='md' color='grey'>
        10
      </Tag>
      <Tag size='md' color='red' href='https://www.hh.ru'>
        hh.ru
      </Tag>
      <Tag size='sm' color='ghost'>
        Дизайн
      </Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <Rating rating={3} />
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
