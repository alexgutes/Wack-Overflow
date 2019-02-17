import React from 'react';

export const myInput = props => (
  <input {...props.input} type={props.type} placeholder={props.placeholder} />
);
