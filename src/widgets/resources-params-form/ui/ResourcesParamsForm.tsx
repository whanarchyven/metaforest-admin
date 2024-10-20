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

const ResourcesParamsForm: FC<ISocialParamsForm> = ({
  initialFormData,
  session,
}) => {
  const schema: RJSFSchema = {
    title: '',
    type: 'object',
    properties: {
      resources: {
        type: 'object',
        title: '',
        properties: {
          carrots: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Carrots Balance' },
              limit: { type: 'number', title: 'Carrots Limit' },
            },
          },
          wood: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Wood Balance' },
              limit: { type: 'number', title: 'Wood Limit' },
            },
          },
          stone: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Stone Balance' },
              limit: { type: 'number', title: 'Stone Limit' },
            },
          },
          ether: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Ether Balance' },
              limit: { type: 'number', title: 'Ether Limit' },
            },
          },
          wheat: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Wheat Balance' },
              limit: { type: 'number', title: 'Wheat Limit' },
            },
          },
          timber: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Timber Balance' },
              limit: { type: 'number', title: 'Timber Limit' },
            },
          },
          iron: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Iron Balance' },
              limit: { type: 'number', title: 'Iron Limit' },
            },
          },
          cake: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Cake Balance' },
              limit: { type: 'number', title: 'Cake Limit' },
            },
          },
          beer: {
            type: 'object',
            properties: {
              balance: { type: 'number', title: 'Beer Balance' },
              limit: { type: 'number', title: 'Beer Limit' },
            },
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

        const mutatedState = { ...sessionTemp, ...temp };

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

export default ResourcesParamsForm;
