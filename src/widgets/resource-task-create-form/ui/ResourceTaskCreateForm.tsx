'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

interface ResourceTaskCreateFormProps {
  sector_idx: string; // Идентификатор сектора, передаваемый пропсом
}

const ResourceTaskCreateForm: FC<ResourceTaskCreateFormProps> = ({
  sector_idx,
}) => {
  const schema: RJSFSchema = {
    title: 'Создание задачи на сбор ресурсов',
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Название задачи', minLength: 1 },
      description: { type: 'string', title: 'Описание задачи', minLength: 1 },
      duration_per_bp: {
        type: 'number',
        title: 'Длительность за очко выгоды (сек)',
      },
      exp_profit_per_bp: {
        type: 'number',
        title: 'Прибыль опыта за очко выгоды',
      },
      mfgt_per_bp: { type: 'number', title: 'MFGT за очко выгоды' },
      requirements: {
        type: 'array',
        title: 'Требования',
        items: {
          type: 'object',
          properties: {
            resource_type: {
              type: 'string',
              title: 'Тип ресурса',
              enum: [
                'carrots',
                'wood',
                'stone',
                'ether',
                'wheat',
                'timber',
                'iron',
                'cake',
                'beer',
              ],
            },
            total: { type: 'number', title: 'Общее количество' },
            bp_per_unit: { type: 'number', title: 'Очки выгоды за единицу' },
            current: { type: 'number', title: 'Текущее количество' },
          },
        },
      },
    },
    required: [
      'name',
      'description',
      'duration_per_bp',
      'exp_profit_per_bp',
      'mfgt_per_bp',
      'requirements',
    ],
  };

  const uiSchema = {};

  const [formData, setFormData] = useState({});

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const { formData } = data;
      await axiosInstance.post(API.createResourceTask(sector_idx), {
        name: formData.name,
        description: formData.description,
        duration_per_bp: String(formData.duration_per_bp),
        exp_profit_per_bp: String(formData.exp_profit_per_bp),
        mfgt_per_bp: String(formData.mfgt_per_bp),
        requirements: JSON.stringify(formData.requirements || []),
      });

      alert('Задача на сбор ресурсов успешно создана!');
      router.back();
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании задачи на сбор ресурсов.');
    }
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={handleSubmit}
      onError={(errors) => {
        console.error('Ошибки валидации:', errors);
        alert('Пожалуйста, проверьте введенные данные.');
      }}
    />
  );
};

export default ResourceTaskCreateForm;
