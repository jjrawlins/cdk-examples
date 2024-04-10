import { CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { ExampleCustomResourceLambdaFunction } from '../lambdas/ExampleCustomResourceLambda-function';

interface CustomResourceExampleStackProps extends StackProps {

}

export class CustomResourceExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: CustomResourceExampleStackProps) {
    super(scope, id, props);

    const customResourceLambda = new ExampleCustomResourceLambdaFunction(this, 'CustomResourceLambda', {
      description: 'Example of a custom resource lambda',
      memorySize: 128,
      timeout: Duration.seconds(30),
    });

    const provider = new Provider(this, 'ResourceProvider', {
      onEventHandler: customResourceLambda,
    });

    const stackName = Stack.of(this).stackName;
    new CustomResource(this, 'CustomResource', {
      serviceToken: provider.serviceToken,
      properties: {
        PhysicalResourceId: `${stackName}-CustomResourceResource-version`,
        MyCustomProperty: 'MyCustomValue',
      },
    });
  }
}