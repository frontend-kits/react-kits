import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  IPopupProps,
  usePopupOverlayClose,
} from './Popup'

import { transformStyles } from '../utils/style'
import { cloneModalContent } from '../containers/ModalLayer'
import { useModalStatus, useModalClose } from '../logics/ModalLayerHooks'

const cx = transformStyles(styles)

type IModalProps = IPopupProps & {
  children: React.ReactElement
  uuid: string
  className?: string
  layerClose?: boolean
}


const TModal: React.FC<IModalProps> = (props) => {
  const { uuid, children, className, layerClose = true } = props
  const { shown } = useModalStatus(uuid)
  const [ onHide, onClose ] = useModalClose(uuid, 500)
  const onOverlayClose = usePopupOverlayClose(shown, onClose)

  return (
    <div
      className={cx('modal', className, { shown })}
      onClick={layerClose ? onHide : undefined}
      onTransitionEnd={onOverlayClose}
    >
      {cloneModalContent(children)}
    </div>
  )
}

export const Modal = enhancePopupComponent(TModal)
