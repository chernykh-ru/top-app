import cn from 'classnames';
import { useState, KeyboardEvent } from 'react';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: { q: search },
    });
    setSearch('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }
    goToSearch();
  };

  return (
    <form className={cn(styles.search, className)} {...props} role='search'>
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button appearance='primary' className={styles.button} onClick={goToSearch} aria-label='Искать по сайту'>
        <GlassIcon />
      </Button>
    </form>
  );
};
