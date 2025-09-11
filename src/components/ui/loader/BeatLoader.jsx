import React from 'react'
import MainModal from '../../modals/MainModal'
import { BeatLoader } from 'react-spinners'

const BeatLoaders = ({modalOpen, setModalOpen}) => {
  return (
    <MainModal  modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <BeatLoader
          size={15}
          margin={2}
            color={"#22c55e"}
            loading={true}
        />
    </MainModal>
  )
}

export default BeatLoaders