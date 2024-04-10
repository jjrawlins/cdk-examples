import { awscdk } from 'projen';

const cdkVersion = '2.133.0';
const minNodeVersion = '18.0.0';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  name: 'cdk-custom-resource',
  minNodeVersion: minNodeVersion,
  projenrcTs: true,
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,
  },
  gitignore: [
    'cdk.context.json',
    '.idea',
    '.DS_Store',
    '.vscode',
  ],
  deps: [
    'aws-lambda',
    '@types/node@^18',
    '@types/aws-lambda',
  ],
  devDeps: [
    'jest-cdk-snapshot',
  ],

});
project.synth();