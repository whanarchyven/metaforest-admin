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

const BalanceParamsForm: FC<ISocialParamsForm> = ({
  initialFormData,
  session,
}) => {
  const schema: RJSFSchema = {
    title: '',
    type: 'object',
    properties: {
      mfgt: {
        type: 'number',
        title: '$MFGT',
      },
      tonBalance: {
        type: 'number',
        title: 'TON',
      },
    },
  };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <Form
      schema={schema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={async () => {
        const { mfgt, tonBalance } = formData;

        const sessionTemp = { ...session };

        delete sessionTemp._id;

        const mutatedState = { ...sessionTemp, mfgt, tonBalance };

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

export default BalanceParamsForm;
