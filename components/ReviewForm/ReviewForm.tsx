import cn from 'classnames';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, iReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<iReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          className={styles.title}
          placeholder='Заголовок отзыва'
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name={'rating'}
            rules={{ required: { value: true, message: 'Поставьте оценку' } }}
            render={({ field }) => (
              <Rating
                error={errors.rating}
                rating={field.value}
                isEditable
                setRating={field.onChange}
                ref={field.ref}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните отзыв' } })}
          className={styles.description}
          placeholder='Текст отзыва'
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div className={styles.successDescription}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon onClick={() => setIsSuccess(false)} className={styles.close} />
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)}>
          <span>Что-то пошло не так, попробуйте обновить страницу</span>
          {/* {error} */}
          <CloseIcon onClick={() => setError('')} className={styles.close} />
        </div>
      )}
    </form>
  );
};
