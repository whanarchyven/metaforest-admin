'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

interface BuildingCreateFormProps {
  placeIdx: string; // Идентификатор места, где создается здание
}

const BuildingCreateForm: FC<BuildingCreateFormProps> = ({ placeIdx }) => {
  // Схема данных для формы
  const schema: RJSFSchema = {
    title: 'Создание здания',
    type: 'object',
    properties: {
      type: {
        type: 'string',
        title: 'Тип здания',
        enum: [
          'townHall',
          'storehouse',
          'etherTower',
          'logging',
          'mine',
          'sawmill',
          'forge',
          'farm',
          'tavern',
          'magicCave',
          'home',
        ], // Значения выпадающего списка
      },
    },
    required: ['type'], // Обязательное поле
  };

  const [formData, setFormData] = useState({}); // Состояние данных формы
  const router = useRouter();

  const handleSubmit = async ({ formData }: { formData: any }) => {
    try {
      // Отправляем запрос на создание здания
      await axiosInstance
        .post(API.createBuilding(placeIdx), formData)
        .then((res) => {
          alert(res.data.message);
          router.back();
        });
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании здания.');
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

export default BuildingCreateForm;
