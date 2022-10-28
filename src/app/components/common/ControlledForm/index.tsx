import React, { useMemo } from 'react';
import useControlledForm from './useControlledForm';
import {
  IControlledForm,
  EventHandler,
  IElementsMap,
} from './types';

// -- ReExport form elements and types
export { default as TextField } from './fields/TextField';
export { default as SelectField } from './fields/SelectField';
export { default as Button } from './Button';
export type { HandleSubmit } from './types';

export default function ControlledForm({ children, handleSubmit, className } : IControlledForm) {
  // 1. Getting needed controlled elements and initial data
  const elementsMap: IElementsMap = useMemo(() => {
    // If children is alone convert it to array
    !Array.isArray(children) && (children = [children]);

    return children.reduce((map, { type, props }, index) => {
      if (typeof type === 'function' && !props?.noControlled && props?.name) {
        // Remember controlled field index from children
        map.indexes.push(index);
        // Set default value data
        map.dataInit[props.name] = props.value ?? '';
        // Set validator rules and error state for fields
        if (props?.rules) {
          map.dataRulesMapInit[props.name] = props.rules;
          map.errorInit[props.name] = '';
        }
      }
      return map;
    }, {
      indexes: [],
      dataRulesMapInit: {},
      dataInit: {},
      errorInit: {},
      submitButton: null,
    } as IElementsMap);
  }, []);

  // 2. Initializating controlled fields data
  const {
    data,
    error,
    onChange,
    validate,
    setError,
    loading,
    setLoading,
  } = useControlledForm(elementsMap);

  // 3. Updating condrolled fields if exist
  elementsMap.indexes.length
  && Array.isArray(children)
  && (children = children.map((child, index) => {
    // Update fields
    elementsMap.indexes.includes(index) && (child = React.cloneElement(child, {
      ...child.props,
      value: data[child.props.name],
      onChange,
      error: error[child.props.name],
      rules: '',
      key: child.props?.name || ~~(Math.random() * 10e5),
    }));

    // Update submit button
    child?.props?.type === 'submit' && (child = React.cloneElement(child, {
      ...child.props,
      loading,
      key: ~~(Math.random() * 10e5),
    }));

    return child;
  }));

  const onSubmit : EventHandler = async (event) => {
    event.preventDefault();
    if (handleSubmit && !validate()) {
      setLoading(true);
      await handleSubmit(data, setError, event);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={className || ''}
    >
      {children}
    </form>
  );
}
