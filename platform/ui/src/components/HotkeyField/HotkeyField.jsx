import React from 'react';
import PropTypes from 'prop-types';

import { hotkeys } from '@ohif/core';
import { Input } from '@ohif/ui';

import { getKeys, formatKeysForInput } from './utils';

/**
 * HotkeyField
 * Renders a hotkey input that records keys
 *
 * @param {object} props component props
 * @param {Array[]} props.keys keys to be controlled by this field
 * @param {function} props.onChange callback with changed values
 * @param {string} props.className input classes
 * @param {Array[]} props.modifierKeys
 */
const HotkeyField = ({ keys, onChange, className, modifierKeys }) => {
  const inputValue = formatKeysForInput(keys);

  const onInputKeyDown = event => {
    event.stopPropagation();
    event.preventDefault();

    hotkeys.record(sequence => {
      const keys = getKeys({ sequence, modifierKeys });
      hotkeys.unpause();
      onChange(keys);
    });
  };

  const onFocus = () => {
    hotkeys.pause();
    hotkeys.startRecording();
  };

  return (
    <Input
      readOnly
      value={inputValue}
      onKeyDown={onInputKeyDown}
      onFocus={onFocus}
      className={className}
    />
  );
};

HotkeyField.propTypes = {
  keys: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  modifierKeys: PropTypes.array,
};

export default HotkeyField;
