'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

interface SectorEditFormProps {
  initialData: {
    idx: string;
    numberIdx: number;
    name: string;
    type: string;
    places: string[];
    available_lootboxes: string[];
    available_tokens: number;
    authority: {
      red: number;
      blue: number;
    };
    level: number;
    image?: string;
  };
}

const SectorEditForm: FC<SectorEditFormProps> = ({ initialData }) => {
  // Схема данных для формы
  const schema: RJSFSchema = {
    title: 'Редактирование сектора',
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Название сектора', minLength: 1 },
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
      authority: {
        type: 'object',
        title: 'Власти',
        properties: {
          red: { type: 'number', title: 'Red Authority' },
          blue: { type: 'number', title: 'Blue Authority' },
        },
      },
      level: { type: 'number', title: 'Уровень' },
      image: {
        type: 'string',
        format: 'data-url',
        title: 'Изображение (если нужно обновить)',
      },
    },
    required: ['name', 'type', 'authority', 'level'], // Обязательные поля
  };

  const uiSchema = {
    image: {
      'ui:widget': 'file', // Файлинпут
    },
  };

  const [formData, setFormData] = useState({
    name: initialData.name,
    type: initialData.type,
    authority: initialData.authority,
    level: initialData.level,
    image: undefined, // Не передаем текущее изображение, так как оно доступно только для обновления
  });

  const router = useRouter();

  const handleSubmit = async ({ formData }: { formData: any }) => {
    try {
      const data = new FormData();

      // Добавляем основные поля
      data.append('name', formData.name || '');
      data.append('type', formData.type || '');

      // Преобразуем authority в JSON-строку
      data.append(
        'authority',
        JSON.stringify({
          red: formData.authority.red || 0,
          blue: formData.authority.blue || 0,
        })
      );

      // Добавляем level
      data.append('level', String(formData.level || 0));

      // Обработка файла
      if (formData.image && typeof formData.image === 'object') {
        data.append('image', formData.image); // Если файл - передаём как есть
      } else if (formData.image && typeof formData.image === 'string') {
        // Преобразуем `data-url` обратно в файл
        const blob = dataURLToFile(formData.image, 'uploaded_image.jpg');
        data.append('image', blob);
      }

      // Отправляем запрос
      await axiosInstance
        .post(API.updateSector(initialData.idx), data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          // router.push(`/sector/${initialData.idx}`)
          router.back();
        });
    } catch (err) {
      console.error(err);
      alert('Ошибка при обновлении сектора.');
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
      onChange={(e) => setFormData(e.formData)} // Обновление состояния при изменении формы
      onSubmit={() => {
        handleSubmit({ formData });
      }} // Обработчик отправки
      onError={(errors) => {
        console.error('Ошибки валидации:', errors);
        alert('Пожалуйста, проверьте введенные данные.');
      }}
    />
  );
};

export default SectorEditForm;
