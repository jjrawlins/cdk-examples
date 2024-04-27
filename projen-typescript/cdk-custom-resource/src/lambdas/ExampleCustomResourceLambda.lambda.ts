import {
  CdkCustomResourceResponse,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceUpdateEvent,
  Context,
} from 'aws-lambda';

const region = process.env.AWS_REGION;

export const handler = async (
  event: CloudFormationCustomResourceEvent,
  context: Context,
): Promise<CdkCustomResourceResponse> => {
  console.log('Lambda is invoked with:' + JSON.stringify(event));
  console.log('Context is invoked with:' + JSON.stringify(context));
  console.log('Lambda is invoked with:' + JSON.stringify(event));
  console.log('Region: ' + region);
  const physicalResourceId = event.ResourceProperties.PhysicalResourceId;

  let response: CdkCustomResourceResponse = {
    Status: 'SUCCESS',
    Reason: 'See the details in CloudWatch Log Stream: ' + context.logStreamName,
    PhysicalResourceId: physicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
  };

  switch (event.RequestType) {
    case 'Create':
      response = await onCreate(response, event, context);
      break;
    case 'Delete':
      response = await onDelete(response, event, context);
      break;
    case 'Update':
      response = await onUpdate(response, event, context);
      break;
    default:
      throw new Error('Unknown Request Type of CloudFormation');
  }
  console.log('Return value:', JSON.stringify(response));
  return response;
};

/**
 * Executes the create event for a CloudFormation custom resource.
 * @param {CdkCustomResourceResponse} response - The custom resource response object.
 * @param {CloudFormationCustomResourceCreateEvent} event - The create event object.
 * @param {Context} context - The AWS Lambda context object.
 * @return {Promise<CdkCustomResourceResponse>} - A promise that resolves to the custom resource response object.
 */
export async function onCreate(
  response: CdkCustomResourceResponse,
  event: CloudFormationCustomResourceCreateEvent,
  context: Context): Promise<CdkCustomResourceResponse> {
  try {
    console.log('We are in the Create Event');
    console.log('Event is invoked with:' + JSON.stringify(event));
    console.log('Context is invoked with:' + JSON.stringify(context));
  } catch (error) {
    if (error instanceof Error) {
      response.Reason = error.message;
    }
    response.Status = 'FAILED';
    response.Data = { Result: error };
    return response;
  }
  return response;
}

/**
 * Handles delete event for a cloud formation custom resource.
 *
 * @param {CdkCustomResourceResponse} response - The custom resource response object.
 * @param {CloudFormationCustomResourceDeleteEvent} event - The delete event object.
 * @param {Context} context - The AWS lambda context object.
 * @returns {Promise<CdkCustomResourceResponse>} - The updated custom resource response object.
 */
export async function onDelete(
  response: CdkCustomResourceResponse,
  event: CloudFormationCustomResourceDeleteEvent,
  context: Context): Promise<CdkCustomResourceResponse> {
  try {
    console.log('We are in the Delete Event');
    console.log('Context is invoked with:' + JSON.stringify(context));
    console.log('Event is invoked with:' + JSON.stringify(event));
    response.Status = 'SUCCESS';
  } catch (error) {
    if (error instanceof Error) {
      response.Reason = error.message;
    }
    response.Status = 'FAILED';
    response.Data = { Result: error };
    return response;
  }
  return response;
}

/**
 * Executes the onUpdate logic for a CloudFormation custom resource.
 *
 * @param {CdkCustomResourceResponse} response - The response object for the custom resource.
 * @param {CloudFormationCustomResourceUpdateEvent} event - The update event object from CloudFormation.
 * @param {Context} context - The execution context object.
 * @returns {Promise<CdkCustomResourceResponse>} A promise that resolves to the updated response object.
 */
export async function onUpdate(
  response: CdkCustomResourceResponse,
  event: CloudFormationCustomResourceUpdateEvent,
  context: Context): Promise<CdkCustomResourceResponse> {
  try {
    console.log('Resource properties: ' + JSON.stringify(event.ResourceProperties));
    console.log('Event is invoked with:' + JSON.stringify(event));
    console.log('Context is invoked with:' + JSON.stringify(context));
  } catch (error) {
    if (error instanceof Error) {
      response.Reason = error.message;
    }
    response.Status = 'FAILED';
    response.Data = { Result: error };
    return response;
  }
  return response;
}
