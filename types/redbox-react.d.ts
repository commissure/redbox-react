import * as React from 'react'

export interface RedBoxProps extends React.Props<RedBoxError> {
  error: Error

  filename?: string
  editorScheme?: string
  useLines?: boolean
  useColumns?: boolean
  style?: {
    redbox?: React.CSSProperties;
    message?: React.CSSProperties;
    stack?: React.CSSProperties;
    frame?: React.CSSProperties;
    file?: React.CSSProperties;
    linkToFile?: React.CSSProperties;
  };
  className?: string
}

export class RedBoxError extends React.Component<RedBoxProps, {}> {}
export default class RedBox extends React.Component<RedBoxProps, {}> {}
