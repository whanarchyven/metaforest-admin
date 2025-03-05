'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

interface TaskEditFormProps {
  initialData: {
    idx: string;
    type: string;
    energy_cost: number;
    exp_profit: number;
    duration: string;
    name: string;
    description: string;
    requirements: Array<{ resource_type: string; amount: number }>;
    profits: Array<{ resource_type: string; amount_coef: number }>;
    bunny_workers_limit: number;
    mfgt_profit?: number;
    image?: string;
  };
}

const TaskEditForm: FC<TaskEditFormProps> = ({ initialData }) => {
  // Схема данных для формы
  const schema: RJSFSchema = {
    title: 'Обновление задачи',
    type: 'object',
    properties: {
      type: { type: 'string', title: 'Тип задачи', readOnly: true },
      energy_cost: { type: 'number', title: 'Стоимость энергии' },
      exp_profit: { type: 'number', title: 'Прибыль опыта' },
      duration: { type: 'string', title: 'Длительность (в ISO формате)' },
      name: { type: 'string', title: 'Название задачи', minLength: 1 },
      description: { type: 'string', title: 'Описание задачи', minLength: 1 },
      mfgt_profit: { type: 'number', title: 'MFGT прибыль' },
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
            amount: { type: 'number', title: 'Количество' },
          },
        },
      },
      profits: {
        type: 'array',
        title: 'Награды',
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
            amount_coef: { type: 'number', title: 'Коэффициент количества' },
          },
        },
      },
      bunny_workers_limit: { type: 'number', title: 'Лимит зайцев-рабочих' },
      image: {
        type: 'string',
        format: 'data-url',
        title: 'Изображение (если нужно загрузить)',
      },
    },
    required: [
      'energy_cost',
      'exp_profit',
      'duration',
      'name',
      'description',
      'bunny_workers_limit',
      'mfgt_profit',
    ],
  };

  const uiSchema = {
    image: {
      'ui:widget': 'file', // Файлинпут
    },
  };

  const [formData, setFormData] = useState({
    ...initialData,
    image: undefined, // Не передаем текущее изображение, так как оно доступно только для обновления
  });

  const router = useRouter();

  const handleSubmit = async ({ formData }: { formData: any }) => {
    try {
      const data = new FormData();

      data.append('energy_cost', String(formData.energy_cost || 0));
      data.append('exp_profit', String(formData.exp_profit || 0));
      data.append('duration', formData.duration || '');
      data.append('name', formData.name || '');
      data.append('description', formData.description || '');
      data.append(
        'bunny_workers_limit',
        String(formData.bunny_workers_limit || 0)
      );
      data.append('mfgt_profit', String(formData.mfgt_profit || 0));

      // Преобразуем массивы в JSON
      data.append('requirements', JSON.stringify(formData.requirements || []));
      data.append('profits', JSON.stringify(formData.profits || []));

      // Обработка файла
      if (formData.image && typeof formData.image === 'object') {
        data.append('image', formData.image); // Если файл - передаём как есть
      } else if (formData.image && typeof formData.image === 'string') {
        const blob = dataURLToFile(formData.image, 'uploaded_image.jpg');
        data.append('image', blob);
      }

      // Отправляем запрос
      await axiosInstance
        .post(API.updateTask(initialData.idx), data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          router.back();
          // router.push(`/task/${initialData.idx}`);
        });
    } catch (err) {
      console.error(err);
      alert('Ошибка при обновлении задачи.');
    }
  };

  // Функция для преобразования data-url в объект File
  const dataURLToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={() => handleSubmit({ formData })}
      onError={(errors) => {
        console.error('Ошибки валидации:', errors);
        alert('Пожалуйста, проверьте введенные данные.');
      }}
    />
  );
};

export default TaskEditForm;
