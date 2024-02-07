import React from "react"
import Button from "../ui/Button"
import Modal from "../ui/Modal"
import { useHistoryStore } from "../../store/history"
import { useGetHistoryEvent } from "../../hooks/useGetHistoryEvent"
import { createUniqueId } from "../../helpers/createUniqueId"

type Props = {
    onClose: () => void
    isVisible: boolean
}

const HistoryModal = (props: Props) => {
    const history = useHistoryStore((state) => state.history)

    const historyData = useGetHistoryEvent(history)

    return (
        <Modal isVisible={props.isVisible} onClose={props.onClose} modalName="История" className='lg:min-w-[531px] lg:max-w-[531px] lg:min-h-[431px]'>
            <div className="flex flex-col justify-between h-full mt-[40px]">
                <div className="flex flex-col font-semibold text-sm gap-y-[10px] min-h-[350px] max-h-[350px] overflow-y-scroll">
                    {historyData.length ? historyData.map((history, idx) => {
                        return <div key={createUniqueId()}>
                            <span>{idx + 1}) {history}</span>
                        </div>
                    }) : <div>История пуста</div>}
                </div>
                <div className="mt-[20px]">
                    <Button onClick={props.onClose} className="text-white">
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default HistoryModal;