import { CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { ExampleCheckCustomResourceLambdaFunction } from '../lambdas/ExampleCheckCustomResourceLambda-function';
import { ExampleCustomResourceLambdaFunction } from '../lambdas/ExampleCustomResourceLambda-function';


interface CustomResourceExampleStackProps extends StackProps {

}

export class CustomResourceExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: CustomResourceExampleStackProps) {
    super(scope, id, props);

    const customResourceLambda = new ExampleCustomResourceLambdaFunction(this, 'CustomResourceLambda', {
      description: 'Example of a custom resource lambda',
      memorySize: 128,
      timeout: Duration.seconds(120),
    });

    const isCompleteLambda = new ExampleCheckCustomResourceLambdaFunction(this, 'CheckCustomResourceLambda', {
      description: 'Example of a custom resource lambda to check if a resource is complete',
      memorySize: 128,
      timeout: Duration.seconds(600),
    });

    const provider = new Provider(this, 'ResourceProvider', {
      onEventHandler: customResourceLambda,
      isCompleteHandler: isCompleteLambda,
      totalTimeout: Duration.minutes(600),
      queryInterval: Duration.minutes(1),
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
