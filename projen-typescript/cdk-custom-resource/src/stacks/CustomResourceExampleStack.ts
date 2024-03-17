import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface CustomResourceExampleStackProps extends StackProps {

}

export class CustomResourceExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: CustomResourceExampleStackProps) {
    super(scope, id, props);

    // define resources here...
  }
}