'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';
import { useRouter } from 'next/navigation';

interface BuildingTaskCreateFormProps {
  sectorPlaces: { label: string; value: string }[]; // Список секторов, передаваемый пропсом
}

const BuildingTaskCreateForm: FC<BuildingTaskCreateFormProps> = ({
  sectorPlaces,
}) => {
  const schema: RJSFSchema = {
    title: 'Создание строительной задачи',
    type: 'object',
    properties: {
      sector_place_idx: {
        type: 'string',
        title: 'Владение в секторе',
        oneOf: sectorPlaces.map((option) => ({
          const: option.value,
          title: option.label,
        })),
      },
      building_type: {
        type: 'string',
        title: 'Тип здания',
        enum: [
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
        ],
        default: 'logging',
      },
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
            amount: { type: 'number', title: 'Количество' },
          },
        },
      },
    },
    required: [
      'sector_place_idx',
      'building_type',
      'name',
      'description',
      'duration',
      'energy_cost',
      'exp_profit',
      'progress_per_player',
      'total_progress',
      'benefit_points_per_player',
    ],
  };

  const uiSchema = {
    sector_place_idx: {
      'ui:widget': 'select',
    },
  };

  const [formData, setFormData] = useState({
    building_type: 'farm',
  });

  const router = useRouter();

  const handleSubmit = async ({ formData }: { formData: any }) => {
    try {
      await axiosInstance.post(
        API.createBuildingTask(formData.sector_place_idx),
        {
          building_type: formData.building_type,
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          energy_cost: String(formData.energy_cost),
          exp_profit: String(formData.exp_profit),
          progress_per_player: String(formData.progress_per_player),
          total_progress: String(formData.total_progress),
          benefit_points_per_player: String(formData.benefit_points_per_player),
          requirements: JSON.stringify(formData.requirements || []),
          profits: JSON.stringify(formData.profits || []),
        }
      );

      alert('Задача успешно создана!');
      router.back();
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании задачи.');
    }
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={() => {
        handleSubmit({ formData });
      }}
      onError={(errors) => {
        console.error('Ошибки валидации:', errors);
        alert('Пожалуйста, проверьте введенные данные.');
      }}
    />
  );
};

export default BuildingTaskCreateForm;
