import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { addShoes } from '~/API/shoes';
import { ISneakerData } from '~/store/interface';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { axiosInstance } from '~/API/axiosInstance';

const schema = yup
  .object({
    name: yup.string().required('Please input name of product'),
    price: yup.number().min(1).required('Price must be larger than 0'),
    description: yup.string().required('Please describe the product description'),
  })
  .required();

const Products: React.FC = () => {
  const [fileChosen, setFileChosen] = useState('');
  const [sneakerImage, setSneakerImage] = useState<any>('dfshoes.png');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISneakerData>({
    resolver: yupResolver(schema),
  });

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setFileChosen(URL.createObjectURL(img));
      setSneakerImage(img);
    }
  };

  const formSubmitHandler: SubmitHandler<ISneakerData> = (data: ISneakerData) => {
    if (sneakerImage) {
      const imageData = new FormData();
      const fileName = Date.now() + sneakerImage.name;
      imageData.append('name', fileName);
      imageData.append('file', sneakerImage);

      try {
        axios.post('http://localhost:8000/upload/', imageData);
      } catch (err) {
        console.log(err);
      }
      addShoes({
        name: data.name,
        price: data.price,
        image: fileName,
        description: data.description,
      });
    }
  };

  return (
    <section className='mb-5'>
      <div className='container-fluid h-custom'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-md-8 col-lg-6 col-xl-5 text-center'>
            <img src={fileChosen} className='img-fluid' width='300' alt='...' />
          </div>
          <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
            <form
              action=''
              onSubmit={handleSubmit(formSubmitHandler)}
              encType='multipart/form-data'
            >
              <div className='d-flex flex-row align-items-center justify-content-center'>
                <p className='lead fw-normal mb-0 me-3'>New Sneaker</p>
              </div>

              <div className='form-outline mb-4'>
                <input
                  type='text'
                  id='form3Example3'
                  className='form-control form-control-lg'
                  placeholder='Name'
                  {...register('name')}
                />
                <p className='text-danger'>loi~</p>
              </div>
              <div className='form-outline mb-3'>
                <input
                  type='number'
                  min={0}
                  id='form3Example4'
                  className='form-control form-control-lg'
                  placeholder='Price ($)'
                  //   defaultValue={sneakerInfo.price}
                  {...register('price')}
                />
              </div>
              <div className='form-outline mb-3'>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  id='form3Example4'
                  className='form-control form-control-lg'
                  placeholder='Image'
                  {...register('image')}
                  onChange={onImageChange}
                />
                <p className='text-danger'>{!sneakerImage && 'Please choose Image'}</p>
              </div>

              <div className='form-outline mb-3'>
                <input
                  type='text'
                  id='form3Example4'
                  className='form-control form-control-lg'
                  placeholder='Description'
                  {...register('description')}
                />
              </div>

              <button type='submit' className='btn btn-info btn-lg w-100'>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
