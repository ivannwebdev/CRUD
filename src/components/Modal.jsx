import { Modal } from "antd";
import React from "react";

const ModalWindow = (props) => {
    return <Modal 
        visible= {props.visible}
        onOk= {props.onOk}
        onCancel= {props.onCancel}
        title= {props.title}
    >
        
    </Modal>
}
export default ModalWindow