// eslint-disable-next-line import/no-extraneous-dependencies
import { CdkCustomResourceIsCompleteResponse, CloudFormationCustomResourceEvent, Context } from 'aws-lambda';
const region = process.env.AWS_REGION;

/**
  *   Pause for a specified number of minutes.
  *   @param {number} minutes - The number of minutes to pause.
  *   @return {Promise<void>} - A promise that resolves when the pause is complete.
 **/
function pauseForMinutes(minutes: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, minutes * 60000); // 1 minute = 60,000 milliseconds
  });
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
  context: Context,
): Promise<CdkCustomResourceIsCompleteResponse> => {

  console.log('Context is invoked with:' + JSON.stringify(context));
  console.log('Lambda is invoked with:' + JSON.stringify(event));
  console.log('Resource properties: ' + JSON.stringify(event.ResourceProperties));
  console.log('REGION: ' + region);
  // In theory, this is where you would check the state of whatever process you are waiting on.
  const response: CdkCustomResourceIsCompleteResponse = {
    IsComplete: true,
  };

  await pauseForMinutes(4);

  return response;
};

