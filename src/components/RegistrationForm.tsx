import { useForm, type FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

let RENDER_COUNT = 0;

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  social: {
    twitter: string;
    facebook: string;
  };
};

const RegistrationForm = () => {
  const { register, control, handleSubmit, watch, formState, trigger, reset } =
    useForm<FormValues>({
      defaultValues: {
        username: 'Test User',
        password: '',
        confirmPassword: '',
        email: '',
        social: {
          twitter: '',
          facebook: '',
        },
      },
      // mode: 'onTouched',
    });
  const { errors, isSubmitted, isSubmitting, isDirty } = formState;
  const passwordValue = watch('password');

  useEffect(() => {
    if (isSubmitted) {
      trigger('confirmPassword');
    }
  }, [passwordValue, isSubmitted, trigger]);

  RENDER_COUNT++;

  const onSubmit = (formValues: FormValues) => {
    console.log('Form is successfully submitted. formValues: ', formValues);
  };

  const onError = (formErrors: FieldErrors) => {
    console.log('Form validation failed. formErrors:', formErrors);
  };

  return (
    <div className='row mt-2'>
      <div className='col-sm-12'>
        <div className='card p-3 border-0 shadow-sm'>
          <div className='card-body'>
            <h2 className='text-center'>Registration Form {RENDER_COUNT / 2}</h2>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
                {errors?.username?.message && (
                  <p className='text-danger'>{errors.username?.message}</p>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email is invalid',
                    },
                    validate: {
                      // notAllowed: (fieldValue) => {
                      //   return (
                      //     fieldValue !== 'admin@email.com' || 'Enter another email address'
                      //   );
                      // },
                      alreadyRegistered: async (fieldValue) => {
                        const res = await fetch(
                          `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                        );
                        const data = await res.json();
                        return data?.length === 0 || 'User is already registered';
                      },
                    },
                  })}
                />
                {errors?.email?.message && (
                  <p className='text-danger'>{errors.email?.message}</p>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should be atleast 6 characters long',
                    },
                  })}
                />
                {errors?.password?.message && (
                  <p className='text-danger'>{errors.password?.message}</p>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='confirmPassword'
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (fieldValue) => {
                      return passwordValue === fieldValue || 'Passwords do not match';
                    },
                  })}
                />
                {errors?.confirmPassword?.message && (
                  <p className='text-danger'>{errors.confirmPassword?.message}</p>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='twitter'>Twitter</label>
                <input
                  type='text'
                  className='form-control'
                  id='twitter'
                  {...register('social.twitter', {
                    required: 'Twitter is required',
                    disabled: watch('email') === '',
                  })}
                />
                {errors?.social?.twitter?.message && (
                  <p className='text-danger'>{errors?.social?.twitter?.message}</p>
                )}
                <label htmlFor='facebook'>Facebook</label>
                <input
                  type='text'
                  className='form-control'
                  id='facebook'
                  {...register('social.facebook', {
                    required: 'Facebook is required',
                    disabled: watch('email') === '',
                  })}
                />
                {errors?.social?.facebook?.message && (
                  <p className='text-danger'>{errors?.social?.facebook?.message}</p>
                )}
              </div>
              <button
                type='submit'
                className='btn btn-primary mt-2'
                disabled={isSubmitting || !isDirty}>
                Submit
              </button>
              <button
                type='button'
                className='btn btn-secondary ms-1 mt-2'
                onClick={() => reset()}>
                Reset
              </button>
            </form>
            <DevTool control={control} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
