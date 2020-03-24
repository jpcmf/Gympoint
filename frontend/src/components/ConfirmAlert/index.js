import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdClose } from 'react-icons/md';

import { Card } from './styles';

import colors from '~/styles/colors';
import Button from '~/components/Button';

export default function ConfirmAlert({
  callback,
  onClose,
  title,
  message,
  onlyConfirmButton,
  confirmButtonText,
  cancelButtonText,
  showButtons,
  className,
}) {
  return (
    <Card onlyConfirmButton={onlyConfirmButton} className={className}>
      <h1>{title}</h1>
      {typeof message === 'object' ? message : <p>{message}</p>}

      {showButtons && (
        <div>
          {!onlyConfirmButton && (
            <Button
              type="button"
              onClick={onClose}
              icon={MdClose}
              text={cancelButtonText}
              color={colors.darkGrey}
            >
              <MdClose />
              NÃO
            </Button>
          )}

          <Button
            type="button"
            onClick={() => {
              if (callback) callback();

              onClose();
            }}
            icon={MdCheck}
            text={confirmButtonText}
          >
            <MdCheck />
            SIM
          </Button>
        </div>
      )}
    </Card>
  );
}

ConfirmAlert.propTypes = {
  callback: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onlyConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  showButtons: PropTypes.bool,
  className: PropTypes.string,
};

ConfirmAlert.defaultProps = {
  callback: null,
  title: 'Você está certo disso?',
  message: 'Você deseja confirmar esta ação?',
  onlyConfirmButton: false,
  confirmButtonText: 'SIM',
  cancelButtonText: 'NÃO',
  showButtons: true,
  className: 'modal-default',
};
