'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';
import { updateGameSession } from '@/shared/api/updateGameSession';

interface IBaseParamsForm {
  initialFormData: any;
  session: IMetaforestGameEngine;
}

const BaseParamsForm: FC<IBaseParamsForm> = ({ initialFormData, session }) => {
  const schema: RJSFSchema = {
    title: '',
    type: 'object',
    properties: {
      baseParams: {
        type: 'object',
        title: 'Базовые параметры',
        properties: {
          str: { type: 'number', title: 'Strength' },
          int: { type: 'number', title: 'Intelligence' },
          dex: { type: 'number', title: 'Dexterity' },
          vit: { type: 'number', title: 'Vitality' },
          krm: { type: 'number', title: 'Karma' },
        },
      },
      energy: { type: 'number', title: 'Energy' },
      energyLimit: { type: 'number', title: 'Energy Limit' },
      exp: { type: 'number', title: 'Experience' },
      skillPoints: { type: 'number', title: 'Skill Points' },
      level: { type: 'number', title: 'Level' },
      talents: {
        type: 'array',
        title: 'Таланты',
        items: {
          type: 'object',
          properties: {
            talent: {
              type: 'object',
              title: '',
              properties: {
                aspect: {
                  type: 'string',
                  title: 'Тип таланта',
                  enum: [
                    'woodcraft',
                    'minecraft',
                    'farm',
                    'alchemy',
                    'metalsmith',
                    'sawmill',
                    'cooking',
                    'logistic',
                    'builder',
                  ],
                },
                type: {
                  type: 'string',
                  title: 'Влияние эффекта',
                  enum: ['positive', 'negative'],
                },
                effectValue: { type: 'number', title: 'Множитель эффекта' },
              },
            },
            isOpen: { type: 'boolean', title: 'Открыт' },
          },
        },
      },
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  return (
    <Form
      uiSchema={{
        baseParams: {
          'ui:options': {
            chakra: {
              h5: '1rem',
              color: 'blue.200',
              sx: {
                margin: '0 auto',
              },
            },
          },
        },
      }}
      schema={schema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={async () => {
        const temp = { ...formData };
        const energy = temp.energy;
        const energyLimit = temp.energyLimit;
        delete temp.energy;
        delete temp.energyLimit;
        delete temp._id;

        const sessionTemp = { ...session };
        delete sessionTemp._id;

        const mutatedState = {
          ...sessionTemp,
          energy,
          energyLimit,
          activeBunny: { ...temp },
        };

        console.log(mutatedState, 'BEFORE');
        const result = await updateGameSession(
          session.user.userInfo.id,
          mutatedState
        );
        console.log(result, 'MUTATED');
        alert('Saved');
        window.location.reload();
      }}
      onError={() => {
        alert('error');
      }}
    />
  );
};

export default BaseParamsForm;
