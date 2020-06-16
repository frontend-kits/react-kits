import * as React from 'react'
import { useInitModalContext } from '../logics/ModalLayerContext'

export const ModalContext = React.createContext<any>({})

export const ModalLayer: React.FC<any> = (props) => {
  const { children } = props
  const context = useInitModalContext()
  const { modals } = context

  return (
    <ModalContext.Provider value={context}>
      {children}
      {Object.keys(modals).map((key) => {
        const modal = modals[key]
        return React.cloneElement(modal(key), { key }) 
      })}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  console.log(React.useContext<any>(ModalContext))
  return React.useContext<any>(ModalContext)
}

export function cloneModalContent(children: any) {
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      const onChildClick = children.props.onClick
      if (onChildClick) {
        onChildClick()
      }
    },
  })
}