import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CustomResourceExampleStack } from '../src/stacks/CustomResourceExampleStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new CustomResourceExampleStack(app, 'test', {
    env: {
      account: '123456789012',
      region: 'eu-east-2',
    },
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});