import { awscdk } from 'projen';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.133.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-custom-resource',
  minNodeVersion: '20.0.0',
  projenrcTs: true,
  gitignore: [
    'cdk.context.json',
    '.idea',
    '.DS_Store',
    '.vscode',
  ],
});
project.synth();