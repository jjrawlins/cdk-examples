import { App } from 'aws-cdk-lib';
import { CustomResourceExampleStack } from './stacks/CustomResourceExampleStack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new CustomResourceExampleStack(app, 'cdk-custom-resource-is-complete-dev', { env: devEnv });
// new MyStack(app, 'cdk-custom-resource-prod', { env: prodEnv });

app.synth();
