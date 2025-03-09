'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

const SectorCreateForm: FC = () => {
  // Схема данных для формы
  const schema: RJSFSchema = {
    title: 'Создание сектора',
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Название сектора', minLength: 1 },
      numberIdx: { type: 'number', title: 'Номер сектора', minimum: 0 },
      type: {
        type: 'string',
        title: 'Тип сектора',
        enum: [
          'mountains',
          'hills',
          'desert',
          'plains',
          'jungle',
          'swamp',
          'forest',
        ], // Значения выпадающего списка
      },
    },
    required: ['name', 'type', 'numberIdx'], // Обязательные поля
  };

  const [formData, setFormData] = useState({}); // Состояние данных формы
  const router = useRouter();
  const handleSubmit = async ({ formData }: { formData: any }) => {
    try {
      await axiosInstance.post(API.createSector, formData).then((res) => {
        alert(res.data.message);
        // router.push('/sector')
        router.back();
      });
    } catch (err) {
      console.error(err);
      alert('Ошибка отправки данных');
    }
  };

  return (
    <Form
      schema={schema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData)} // Обновление состояния при изменении формы
      onSubmit={() => {
        handleSubmit({ formData });
      }} // Обработчик отправки
      onError={(errors) => {
        console.error('Validation errors:', errors);
        alert('Пожалуйста, проверьте введенные данные.');
      }}
    />
  );
};

export default SectorCreateForm;
