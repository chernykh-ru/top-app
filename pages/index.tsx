import { Button, Htag, P, Tag } from '../components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Hello</Htag>
      <Button appearance='primary' arrow='right' onClick={() => alert('touched')}>
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
    </>
  );
}
