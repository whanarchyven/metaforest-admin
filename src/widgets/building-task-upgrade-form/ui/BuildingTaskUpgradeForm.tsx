'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

interface UpgradeTaskCreateFormProps {
  building_idx: string; // Идентификатор здания, передаваемый пропсом
}

const UpgradeTaskCreateForm: FC<UpgradeTaskCreateFormProps> = ({
  building_idx,
}) => {
  const schema: RJSFSchema = {
    title: 'Создание задачи на улучшение здания',
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Название задачи', minLength: 1 },
      description: { type: 'string', title: 'Описание задачи', minLength: 1 },
      duration: {
        type: 'string',
        title: 'Длительность (в ISO формате, например: PT1H для 1 часа)',
      },
      energy_cost: { type: 'number', title: 'Стоимость энергии' },
      exp_profit: { type: 'number', title: 'Прибыль опыта' },
      progress_per_player: { type: 'number', title: 'Прогресс на игрока' },
      total_progress: { type: 'number', title: 'Общий прогресс' },
      benefit_points_per_player: {
        type: 'number',
        title: 'Очки выгоды на игрока',
      },
      mfgt_profit: {
        type: 'number',
        title: 'MFGT прибыль',
      },
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
                'wood',
                'stone',
                'ether',
                'carrots',
                'timber',
                'iron',
                'cake',
                'beer',
                'wheat',
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
                'wood',
                'stone',
                'ether',
                'carrots',
                'timber',
                'iron',
                'cake',
                'beer',
                'wheat',
              ],
            },
            amount: { type: 'number', title: 'Количество' },
          },
        },
      },
    },
    required: [
      'name',
      'description',
      'duration',
      'energy_cost',
      'exp_profit',
      'progress_per_player',
      'total_progress',
      'benefit_points_per_player',
      'mfgt_profit',
    ],
  };

  const uiSchema = {};

  const [formData, setFormData] = useState({});

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const { formData } = data;
      await axiosInstance.post(API.upgradeBuildingTask(building_idx), {
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        energy_cost: String(formData.energy_cost),
        exp_profit: String(formData.exp_profit),
        progress_per_player: String(formData.progress_per_player),
        total_progress: String(formData.total_progress),
        benefit_points_per_player: String(formData.benefit_points_per_player),
        mfgt_profit: String(formData.mfgt_profit),
        requirements: JSON.stringify(formData.requirements || []),
        profits: JSON.stringify(formData.profits || []),
      });

      alert('Задача на улучшение успешно создана!');
      router.back();
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании задачи на улучшение.');
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

export default UpgradeTaskCreateForm;
