'use client';
import { FC, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';
import { updateGameSession } from '@/shared/api/updateGameSession';

interface ISocialParamsForm {
  initialFormData: any;
  session: IMetaforestGameEngine;
}

const SocialParamsForm: FC<ISocialParamsForm> = ({
  initialFormData,
  session,
}) => {
  const schema: RJSFSchema = {
    title: '',
    type: 'object',
    properties: {
      socialParams: {
        type: 'object',
        title: 'Социальные параметры',
        properties: {
          satiety: { type: 'number', title: 'Сытость' },
          cleanness: { type: 'number', title: 'Частота' },
          happiness: { type: 'number', title: 'Счастье (наигранность)' },
          communication: {
            type: 'number',
            title: 'Достаток общения (наговорённость)',
          },
          emotionality: {
            type: 'number',
            title: 'Эмоциональная привязанность',
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

        const sessionTemp = { ...session };

        delete sessionTemp._id;

        const mutatedState = { ...sessionTemp, activeBunny: { ...temp } };

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

export default SocialParamsForm;
